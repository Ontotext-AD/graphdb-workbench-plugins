import {disableAllVisualGraphNodes, enableAllVisualGraphNodes} from '../utils.js';

const VISUAL_GRAPH_LINK_FOCUS_TITLE = 'guide.step_plugin.visual-graph-link-focus.title';
const VISUAL_GRAPH_LINK_FOCUS_CONTENT = 'guide.step_plugin.visual-graph-link-focus.content';

/**
 * @name visual-graph-link-focus
 * @memberof module:Interactive Guide
 *
 * @description
 * The `visual-graph-link-focus` guide step explains the link between two nodes in the Visual Graph.<br>
 * <img src="resources/guides/visual-graph/visual-graph-link-focus.png" style="height:200px; border: solid; border-width:1px"/>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 * Additionally, the following specific options are available:
 *
 * @property {string} [options.fromIri] - The source IRI.
 * @property {string} [options.toIri] - The target IRI.
 * @property {string} [options.iriLabel] - Label for predicate.
 */
const step = {
  guideBlockName: 'visual-graph-link-focus',
  getSteps: function(options, services) {
    const GuideUtils = services.GuideUtils;
    const $rootScope = services.$rootScope;
    const translate = services.translate;
    const elementSelector = `.link-wrapper[id^="${options.fromIri}>${options.toIri}"]`;
    return [
      {
        guideBlockName: 'read-only-element',
        options: {
          ...(options.title ?? {title: translate(this.translationBundle, VISUAL_GRAPH_LINK_FOCUS_TITLE)}),
          content: translate(this.translationBundle, VISUAL_GRAPH_LINK_FOCUS_CONTENT, {
            fromIriLabel: options.fromIri,
            iriLabel: options.iriLabel,
            toIriLabel: options.toIri
          }),
          url: 'graphs-visualizations',
          canBePaused: false,
          class: 'visual-graph-link-focus',
          elementSelector,
          show: disableAllVisualGraphNodes,
          hide: enableAllVisualGraphNodes,
          beforeShowPromise: GuideUtils.awaitAlphaDropD3(elementSelector, $rootScope),
          ...options
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [VISUAL_GRAPH_LINK_FOCUS_TITLE]: 'Visual graph links',
      [VISUAL_GRAPH_LINK_FOCUS_CONTENT]: 'An arrow with a label represents one or more links between nodes. In this case, the arrow shows the relation <b>{{fromIriLabel}} &rarr; {{iriLabel}} &rarr; {{toIriLabel}}</b>.'
    },
    fr: {
      [VISUAL_GRAPH_LINK_FOCUS_TITLE]: 'Liens de graphique visuel',
      [VISUAL_GRAPH_LINK_FOCUS_CONTENT]: 'Une flèche avec une étiquette représente un ou plusieurs liens entre les nœuds. Dans ce cas, la flèche montre la relation <b>{{fromIriLabel}} &rarr; {{iriLabel}} &rarr; {{toIriLabel}}</b>.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
