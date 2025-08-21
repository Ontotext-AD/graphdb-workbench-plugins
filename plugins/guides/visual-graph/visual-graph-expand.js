const step = {
  guideBlockName: 'visual-graph-expand',
  getSteps: (options, services) => {
    const GuideUtils = services.GuideUtils;
    const $rootScope = services.$rootScope;
    const $route = services.$route;
    const elementSelector = `.node-wrapper[id^="${options.iri}"] circle`;

    // Expands visual graph when a node is double-clicked.
    const dblClickFunction = (guide) => () => {
      GuideUtils.graphVizExpandNode(elementSelector);
      guide.getCurrentStep().hide();
      GuideUtils.awaitAlphaDropD3(null, $rootScope)()
        .then(() => {
          guide.next();
        });
    };

    return [
      {
        guideBlockName: 'clickable-element',
        options: {
          title: 'guide.step_plugin.visual-graph-expand.title',
          content: 'guide.step_plugin.visual-graph-expand.content',
          url: 'graphs-visualizations',
          canBePaused: false,
          class: 'visual-graph-expand-node',
          elementSelector,
          // Disable default behavior of service when element is clicked.
          advanceOn: undefined,
          onNextClick: (guide) => {
            GuideUtils.graphVizExpandNode(elementSelector);
            guide.getCurrentStep().hide();
            GuideUtils.awaitAlphaDropD3(null, $rootScope)()
              .then(() => {
                guide.next();
              });
          },
          show: (guide) => () => {
            // Add "dblclick" listener to the element. Processing of double-click event is disabled for the visual graph when guide is started.
            // So we have expanded the graph manually when a selected node is double-clicked.
            $(elementSelector).on('dblclick.onNodeDbClicked', dblClickFunction(guide));
          },
          hide: () => () => {
            // Remove the "dblclick" listener of element. It is important when step is hided.
            $(elementSelector).off('dblclick.onNodeDbClicked');
          },
          beforeShowPromise: () => {
            $route.reload();
            return GuideUtils.deferredShow(50)()
              .then(() => {
                return GuideUtils.awaitAlphaDropD3(elementSelector, $rootScope)();
              });
          },
          initPreviousStep: (services, stepId) => {
            const previousStep = services.ShepherdService.getPreviousStepFromHistory(stepId);
            return previousStep.options.initPreviousStep(services, previousStep.id)
              .then(() => {
                const currentStepId = services.ShepherdService.getCurrentStepId();
                // Skip expanding of node if last step is "visual-graph-expand"
                if (currentStepId === stepId) {
                  return Promise.resolve;
                }

                GuideUtils.graphVizExpandNode(elementSelector);
                return GuideUtils.deferredShow(50)()
                  .then(() => {
                    return GuideUtils.awaitAlphaDropD3(null, $rootScope)();
                  });
              });
          },
          ...options
        }
      }
    ];
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
