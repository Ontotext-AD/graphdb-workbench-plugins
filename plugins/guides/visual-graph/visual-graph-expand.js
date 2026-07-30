const VISUAL_GRAPH_EXPAND_TITLE = 'guide.step_plugin.visual-graph-expand.title';
const VISUAL_GRAPH_EXPAND_CONTENT = 'guide.step_plugin.visual-graph-expand.content';

/**
 * @name visual-graph-expand
 * @memberof module:Interactive Guide
 *
 * @description
 * The `visual-graph-expand` guide step that explains how to expand a node in the Visual Graph by double-clicking it.
 *
 * <img src="resources/guides/visual-graph/visual-graph-expand.png" style="height:200px; border: solid; border-width:1px"/>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 * Additionally, the following specific option is available:
 *
 * Options:
 * @property {string} [options.iri] - The IRI used to build the element selector for the node and in the translations.
 *
 * @example
 * ```json
 * {
 *   "guideBlockName": "visual-graph-expand",
 *   "options": {
 *     "iri": "http://example.org/resource",
 *     "iriLabel": "my resource"
 *   }
 * }
 * ```
 */
const step = {
  guideBlockName: 'visual-graph-expand',
  getSteps: function(options, services) {
    const GuideUtils = services.GuideUtils;
    const $rootScope = services.$rootScope;
    const $route = services.$route;
    const translate = services.translate;
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
          title: translate(this.translationBundle, VISUAL_GRAPH_EXPAND_TITLE),
          content: translate(this.translationBundle, VISUAL_GRAPH_EXPAND_CONTENT, {iriLabel: options.iriLabel}),
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
            // in some cases reloading starts after the defer and alpha drop. In such cases the step is shown, the page is
            // reloaded and shepherd detaches from the element. We do two deferred shows to ensure the reload has started and then wait for the d3 alpha to drop, so we ensure the correct order
            return GuideUtils.deferredShow()()
              .then(GuideUtils.deferredShow(50))
              .then(GuideUtils.awaitAlphaDropD3(elementSelector, $rootScope));
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
  },
  translationBundle: {
    en: {
      [VISUAL_GRAPH_EXPAND_TITLE]: 'Visual graph: expand node',
      [VISUAL_GRAPH_EXPAND_CONTENT]: 'Double click on <b>{{iriLabel}}</b> to expand the graph.'
    },
    fr: {
      [VISUAL_GRAPH_EXPAND_TITLE]: 'Graphe visuel : développer un nœud',
      [VISUAL_GRAPH_EXPAND_CONTENT]: 'Double-cliquez sur <b>{{iriLabel}}</b> pour développer le graphique.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
