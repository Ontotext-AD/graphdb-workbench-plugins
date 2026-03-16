const VISUAL_GRAPH_PROPERTIES_TITLE = 'guide.step_plugin.visual-graph-properties.title';
const VISUAL_GRAPH_PROPERTIES_CONTENT = 'guide.step_plugin.visual-graph-properties.content';
const VISUAL_GRAPH_PROPERTIES_SIDE_PANEL_TITLE = 'guide.step_plugin.visual-graph-properties-side-panel.title';
const VISUAL_GRAPH_PROPERTIES_SIDE_PANEL_CONTENT = 'guide.step_plugin.visual-graph-properties-side-panel.content';
const VISUAL_GRAPH_PROPERTIES_FOCUS_PROPERTY_TITLE_TYPES = 'guide.step_plugin.visual-graph-properties-focus-types.title';
const VISUAL_GRAPH_PROPERTIES_FOCUS_PROPERTY_CONTENT_TYPES = 'guide.step_plugin.visual-graph-properties-focus-types.content';
const VISUAL_GRAPH_PROPERTIES_FOCUS_PROPERTY_TITLE = 'guide.step_plugin.visual-graph-properties-focus-property.title';
const VISUAL_GRAPH_PROPERTIES_FOCUS_PROPERTY_CONTENT = 'guide.step_plugin.visual-graph-properties-focus-property.content';
const VISUAL_GRAPH_PROPERTIES_SIDE_PANEL_CLOSE_TITLE = 'guide.step_plugin.visual-graph-properties-side-panel-close.title';
const VISUAL_GRAPH_PROPERTIES_SIDE_PANEL_CLOSE_CONTENT = 'guide.step_plugin.visual-graph-properties-side-panel-close.content';

/**
 * @name visual-graph-properties
 * @memberof module:Interactive Guide
 *
 * @description
 * The `visual-graph-properties` guide demonstrates how to open and read node properties in the Visual Graph.
 *
 * The guide consists of the following steps:
 * 1. Click a node to open the properties side panel.<br>
 * <img src="resources/guides/visual-graph/visual-graph-click-to-show-properties.png" style="height:200px; border: solid; border-width:1px"/>
 * 2. Read the properties in the side panel.<br>
 * <img src="resources/guides/visual-graph/visual-graph-side-panel-properties.png" style="height:200px; border: solid; border-width:1px"/>
 * 3. Focus specific property sections (e.g. types or a particular property).<br>
 * <img src="resources/guides/visual-graph/visual-graph-properties-in-panel.png" style="height:200px; border: solid; border-width:1px"/>
 * 4. Close the side panel.<br>
 * <img src="resources/guides/visual-graph/visual-graph-x-to-close.png" style="height:200px; border: solid; border-width:1px"/>
 *
 * This guide can be configured using the common options defined in [Options](#.Options).
 *
 * Common / additional options used by the contained steps:
 * @property {string} [options.iri] - The IRI used to target nodes in the visual graph.
 * @property {string} [options.iriLabel] - The label of the IRI shown in the dialogs.
 * @property {Array}  [options.focusProperties] - Array describing focus properties displayed in properties steps.
 *
 * @example
 * ```JSON
 * {
 *   "guideBlockName": "visual-graph-properties",
 *   "options": {
 *     "iri": "http://example.org/resource",
 *     "iriLabel": "Example resource",
 *     "focusProperties": ["ontl:roleStartDate"]
 *   }
 * }
 * ```
 */
const step = {
  guideBlockName: 'visual-graph-properties',
  getSteps: function(options, services) {
    const GuideUtils = services.GuideUtils;
    const $rootScope = services.$rootScope;
    const translate = services.translate;
    const elementSelector = `.node-wrapper[id^="${options.iri}"] circle`;

    let mouseClickTimeStamp;
    let mouseEventTimer;

    // Expands Node info sidebar panel when a node is clicked.
    const onClick = (services, guide) => (event) => {
      if (mouseEventTimer) {
        // Cancels expansion of the sidebar panel if user double-clicked.
        if (event.timeStamp - mouseClickTimeStamp < 400) {
          clearTimeout(mouseEventTimer);
          mouseEventTimer = null;
        }
      } else {
        mouseClickTimeStamp = event.timeStamp;
        mouseEventTimer = setTimeout(function() {
          mouseEventTimer = null;
          guide.next();
        }, 500);
      }
    };

    const steps = [
      {
        guideBlockName: 'clickable-element',
        options: {
          title: translate(this.translationBundle, VISUAL_GRAPH_PROPERTIES_TITLE),
          content: translate(this.translationBundle, VISUAL_GRAPH_PROPERTIES_CONTENT, {iriLabel: options.iriLabel}),
          url: 'graphs-visualizations',
          class: 'visual-graph-show-properties-intro',
          elementSelector,
          canBePaused: false,
          // Disable default behavior of service when element is clicked.
          advanceOn: undefined,
          show: (guide) => () => {
            // Add "click" listener to the element. Processing of click event is disabled for the visual graph when guide is started.
            // So we have to open side panel info manually when a selected node is clicked.
            const element = document.querySelector(elementSelector);
            if (element) {
              element._onNodeClicked = onClick(services, guide);
              element.addEventListener('click', element._onNodeClicked);
            }
          },
          hide: () => () => {
            // Remove the "click" listener of element. It is important when step is hided.
            const element = document.querySelector(elementSelector);
            if (element && element._onNodeClicked) {
              element.removeEventListener('click', element._onNodeClicked);
              delete element._onNodeClicked;
            }
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
          title: translate(this.translationBundle, VISUAL_GRAPH_PROPERTIES_SIDE_PANEL_TITLE),
          content: translate(this.translationBundle, VISUAL_GRAPH_PROPERTIES_SIDE_PANEL_CONTENT, {iriLabel: options.iriLabel}),
          url: 'graphs-visualizations',
          elementSelector: '.rdf-side-panel-content',
          class: 'visual-graph-side-panel-content',
          canBePaused: false,
          placement: 'left',
          beforeShowPromise: GuideUtils.deferredShow(500),
          onPreviousClick: () => new Promise(function(resolve) {
            GuideUtils.waitFor(closeButtonSelector, 3)
              .then(() => {
                document.querySelector(closeButtonSelector).click();
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
        const titleKey = 'guide.step_plugin.visual-graph-properties-focus' + translationIdSuffix + '.title';
        const contentKey = focusProperty.skipGenericMessage && focusProperty.message ?
          null : 'guide.step_plugin.visual-graph-properties-focus' + translationIdSuffix + '.content';

        const params = (focusProperty.property === 'types') ?
          {iriLabel: options.iriLabel} :
          {focusProperty: focusProperty.property};

        steps.push({
          guideBlockName: 'read-only-element',
          options: {
            title: translate(this.translationBundle, titleKey),
            content: contentKey ? translate(this.translationBundle, contentKey, params) : null,
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
        title: translate(this.translationBundle, VISUAL_GRAPH_PROPERTIES_SIDE_PANEL_CLOSE_TITLE),
        content: translate(this.translationBundle, VISUAL_GRAPH_PROPERTIES_SIDE_PANEL_CLOSE_CONTENT),
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
        onNextClick: () => GuideUtils.waitFor(closeButtonSelector, 3).then(() => document.querySelector(closeButtonSelector).click()),
        ...options
      }
    });

    return steps;
  },
  translationBundle: {
    en: {
      [VISUAL_GRAPH_PROPERTIES_TITLE]: 'Visual graph properties',
      [VISUAL_GRAPH_PROPERTIES_CONTENT]: 'Click on <b>{{iriLabel}}</b> to show its properties.',
      [VISUAL_GRAPH_PROPERTIES_SIDE_PANEL_TITLE]: 'Visual graph properties',
      [VISUAL_GRAPH_PROPERTIES_SIDE_PANEL_CONTENT]: 'The side panel shows the properties of the clicked node, <b>{{iriLabel}}</b>.',
      [VISUAL_GRAPH_PROPERTIES_FOCUS_PROPERTY_TITLE_TYPES]: 'Visual graph properties',
      [VISUAL_GRAPH_PROPERTIES_FOCUS_PROPERTY_CONTENT_TYPES]: '<b>Types</b> shows all the RDF types for <b>{{iriLabel}}</b>.',
      [VISUAL_GRAPH_PROPERTIES_FOCUS_PROPERTY_TITLE]: 'Visual graph properties',
      [VISUAL_GRAPH_PROPERTIES_FOCUS_PROPERTY_CONTENT]: 'The values for generic properties like <b>{{focusProperty}}</b> are listed in dedicated sections.',
      [VISUAL_GRAPH_PROPERTIES_SIDE_PANEL_CLOSE_TITLE]: 'Visual graph properties',
      [VISUAL_GRAPH_PROPERTIES_SIDE_PANEL_CLOSE_CONTENT]: 'You can close the panel by clicking on the X icon.'
    },
    fr: {
      [VISUAL_GRAPH_PROPERTIES_TITLE]: 'Propriétés du graphe visuel',
      [VISUAL_GRAPH_PROPERTIES_CONTENT]: 'Cliquez sur <b>{{iriLabel}}</b> pour afficher ses propriétés.',
      [VISUAL_GRAPH_PROPERTIES_SIDE_PANEL_TITLE]: 'Propriétés du graphique visuel',
      [VISUAL_GRAPH_PROPERTIES_SIDE_PANEL_CONTENT]: 'Le panneau latéral affiche les propriétés du nœud cliqué, <b>{{iriLabel}}</b>.',
      [VISUAL_GRAPH_PROPERTIES_FOCUS_PROPERTY_TITLE_TYPES]: 'Propriétés du graphique visuel',
      [VISUAL_GRAPH_PROPERTIES_FOCUS_PROPERTY_CONTENT_TYPES]: '<b>Les types</b> affiche tous les types RDF pour <b>{{iriLabel}}</b>.',
      [VISUAL_GRAPH_PROPERTIES_FOCUS_PROPERTY_TITLE]: 'Propriétés du graphique visuel',
      [VISUAL_GRAPH_PROPERTIES_FOCUS_PROPERTY_CONTENT]: 'Les valeurs des propriétés génériques telles que <b>{{focusProperty}}</b> sont répertoriées dans des sections dédiées.',
      [VISUAL_GRAPH_PROPERTIES_SIDE_PANEL_CLOSE_TITLE]: 'Propriétés du graphique visuel',
      [VISUAL_GRAPH_PROPERTIES_SIDE_PANEL_CLOSE_CONTENT]: 'Vous pouvez fermer le panneau en cliquant sur l\'icône X.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
