const step = {
  guideBlockName: 'visual-graph-properties',
  getSteps: (options, services) => {
    const GuideUtils = services.GuideUtils;
    const $rootScope = services.$rootScope;
    const elementSelector = `.node-wrapper[id^="${options.iri}"] circle`;

    let mouseClickTimeStamp;
    let mouseEventTimer;

    // Expands Node info sidebar panel when a node is clicked.
    const onClick = (services, guide) => (event) => {
      if (mouseEventTimer) {
        // Cancels expansion of the sidebar panel if user double-clicked.
        if (event.timeStamp - mouseClickTimeStamp < 400) {
          services.$timeout.cancel(mouseEventTimer);
          mouseEventTimer = null;
        }
      } else {
        mouseClickTimeStamp = event.timeStamp;
        mouseEventTimer = services.$timeout(function() {
          GuideUtils.graphVizShowNodeInfo(elementSelector);
          mouseEventTimer = null;
          guide.next();
        }, 500);
      }
    };

    const steps = [
      {
        guideBlockName: 'clickable-element',
        options: {
          title: 'guide.step_plugin.visual-graph-properties.title',
          content: 'guide.step_plugin.visual-graph-properties.content',
          url: 'graphs-visualizations',
          class: 'visual-graph-show-properties-intro',
          elementSelector,
          canBePaused: false,
          // Disable default behavior of service when element is clicked.
          advanceOn: undefined,
          show: (guide) => () => {
            // Add "click" listener to the element. Processing of click event is disabled for the visual graph when guide is started.
            // So we have to open side panel info manually when a selected node is clicked.
            $(elementSelector).on('click.onNodeClicked', onClick(services, guide));
          },
          hide: () => () => {
            // Remove the "click" listener of element. It is important when step is hided.
            $(elementSelector).off('click.onNodeClicked');
          },
          onNextClick: (guide, step) => {
            GuideUtils.graphVizShowNodeInfo(step.elementSelector);
            guide.next();
          },
          beforeShowPromise: GuideUtils.awaitAlphaDropD3(elementSelector, $rootScope),
          ...options
        }
      },
      {
        guideBlockName: 'read-only-element',
        options: {
          title: 'guide.step_plugin.visual-graph-properties-side-panel.title',
          content: 'guide.step_plugin.visual-graph-properties-side-panel.content',
          url: 'graphs-visualizations',
          elementSelector: '.rdf-side-panel-content',
          class: 'visual-graph-side-panel-content',
          canBePaused: false,
          placement: 'left',
          beforeShowPromise: GuideUtils.deferredShow(500),
          onPreviousClick: () => new Promise(function(resolve) {
            GuideUtils.waitFor(closeButtonSelector, 3)
              .then(() => {
                $(closeButtonSelector).trigger('click');
                resolve();
              }).catch(() => resolve());
          }),
          ...options
        }
      }
    ];

    if (Array.isArray(options.focusProperties)) {
      options.focusProperties.forEach((focusProperty) => {
        if (!GuideUtils.isObject(focusProperty)) {
          focusProperty = {
            property: focusProperty
          };
        }
        const translationIdSuffix = focusProperty.property === 'types' ? '-types' : '-property';
        const content = focusProperty.skipGenericMessage && focusProperty.message ?
          null : 'guide.step_plugin.visual-graph-properties-focus' + translationIdSuffix + '.content';
        steps.push({
          guideBlockName: 'read-only-element',
          options: {
            title: 'guide.step_plugin.visual-graph-properties-focus' + translationIdSuffix + '.title',
            content: content,
            url: 'graphs-visualizations',
            class: 'visual-graph-properties-focus',
            canBePaused: false,
            placement: 'left',
            elementSelector: GuideUtils.getGuideElementSelector('graph-visualization-node-info-' + focusProperty.property),
            focusProperty: focusProperty.property,
            extraContent: focusProperty.message,
            ...options
          }
        });
      });
    }

    const closeButtonSelector = GuideUtils.getGuideElementSelector('close-info-panel');
    steps.push({
      guideBlockName: 'clickable-element',
      options: {
        title: 'guide.step_plugin.visual-graph-properties-side-panel-close.title',
        content: 'guide.step_plugin.visual-graph-properties-side-panel-close.content',
        url: 'graphs-visualizations',
        canBePaused: false,
        placement: 'left',
        class: 'visual-graph-properties-side-panel-close',
        elementSelector: closeButtonSelector,
        advanceOn: {
          selector: closeButtonSelector,
          event: 'click'
        },
        beforeShowPromise: () => {
          // We have to be sure that node info sidebar is open. It is needed when this step is loaded when next step "Previous"
          // button is clicked.
          GuideUtils.graphVizShowNodeInfo(elementSelector);
          return GuideUtils.deferredShow(500)();
        },
        onNextClick: () => GuideUtils.waitFor(closeButtonSelector, 3).then(() => $(closeButtonSelector).trigger('click')),
        ...options
      }
    });

    return steps;
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
