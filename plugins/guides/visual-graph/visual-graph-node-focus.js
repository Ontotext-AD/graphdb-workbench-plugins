import {disableAllVisualGraphNodes, enableAllVisualGraphNodes} from '../utils.js';

const VISUAL_GRAPH_NODE_FOCUS_DEFAULT_TITLE = 'guide.step_plugin.visual-graph-node-focus.title';
const VISUAL_GRAPH_NODE_FOCUS_CONTENT = 'guide.step_plugin.visual-graph-node-focus.content';

/**
 * @name visual-graph-node-focus
 * @memberof module:Interactive Guide
 *
 * @description
 * The `visual-graph-node-focus` guide step explains RDF resources in the Visual Graph.<br>
 * <img src="resources/guides/visual-graph/visual-graph-node-focus.png" style="height:200px; border: solid; border-width:1px"/>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 * Additionally, the following specific option is available:
 *
 * @property {string} [options.iri] - The IRI used in this step.
 * @property {string} [options.iriLabel] - Label for predicate.
 *
 * @example
 * ```json
 * {
 *   "guideBlockName": "visual-graph-node-focus",
 *   "options": {
 *     "iri": "http://example.org/resource",
 *     "iriLabel": "my resource"
 *   }
 * }
 * ```
 */
const step = {
  guideBlockName: 'visual-graph-node-focus',
  getSteps: function(options, services) {
    const GuideUtils = services.GuideUtils;
    const $rootScope = services.$rootScope;
    const translate = services.translate;
    const elementSelector = `.node-wrapper[id^="${options.iri}"] circle`;

    return [
      {
        guideBlockName: 'read-only-element',
        options: {
          ...(options.title ?? {title: translate(this.translationBundle, VISUAL_GRAPH_NODE_FOCUS_DEFAULT_TITLE)}),
          content: translate(this.translationBundle, VISUAL_GRAPH_NODE_FOCUS_CONTENT, {iriLabel: options.iriLabel}),
          url: 'graphs-visualizations',
          canBePaused: false,
          elementSelector,
          class: 'visual-graph-node-focus',
          show: disableAllVisualGraphNodes,
          hide: enableAllVisualGraphNodes,
          beforeShowPromise: GuideUtils.awaitAlphaDropD3(elementSelector, $rootScope),
          initPreviousStep: (services, stepId) => {
            if (GuideUtils.isVisible(elementSelector)) {
              return Promise.resolve();
            }

            const previousStep = services.ShepherdService.getPreviousStepFromHistory(stepId);
            return previousStep.options.initPreviousStep(services, previousStep.id);
          },
          ...options
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [VISUAL_GRAPH_NODE_FOCUS_DEFAULT_TITLE]: 'Visual graph nodes',
      [VISUAL_GRAPH_NODE_FOCUS_CONTENT]: 'A circle represents an RDF resource. In this case, <b>{{iriLabel}}</b>.'
    },
    fr: {
      [VISUAL_GRAPH_NODE_FOCUS_DEFAULT_TITLE]: 'Nœuds de graphique visuel',
      [VISUAL_GRAPH_NODE_FOCUS_CONTENT]: 'Un cercle représente une ressource RDF. Dans ce cas, <b>{{iriLabel}}</b>.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
