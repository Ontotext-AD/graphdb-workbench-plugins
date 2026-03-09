const VISUAL_GRAPH_EXPLORE_TITLE = 'guide.step-action.visual-graph';
const VISUAL_GRAPH_CONFIG_SAMPLE_QUERY_CONTENT = 'guide.step-action.visual-graph-config-sample-query';

const TAB_NAME_TO_INDEX = {
  startingPoint: 1,
  graphExpansion: 2,
  nodeBasics: 3,
  edgeBasics: 4,
  nodeExtra: 5
};

/**
 * @name visual-graph-config-sample-query
 * @memberof module:Interactive Guide
 *
 * @description
 * This step highlights the sample queries section for a specific tab in the Visual Graph configuration page.<br>
 *
 * Sample queries step<br>
 * <img src="resources/guides/visual-graph/visual-graph-config-sample-query.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 * Additionally, the following specific option is required:
 *
 * @property {string} options.tabName - The name of the tab whose sample queries to highlight. Must be one of `startingPoint`, `graphExpansion`, `nodeBasics`, `edgeBasics`, or `nodeExtra`.
 *
 * @example
 * ```JSON
 * {
 *   "guideBlockName": "visual-graph-config-sample-query",
 *   "options": {
 *     "tabName": "startingPoint"
 *   }
 * }
 * ```
 */
const step = {
  guideBlockName: 'visual-graph-config-sample-query',
  getSteps: function(options, pluginServices) {
    const translate = pluginServices.translate;
    const GuideUtils = pluginServices.GuideUtils;
    const tabIndex = TAB_NAME_TO_INDEX[options.tabName];

    return [
      {
        guideBlockName: 'read-only-element',
        options: {
          content: translate(this.translationBundle, VISUAL_GRAPH_CONFIG_SAMPLE_QUERY_CONTENT),
          ...(options.title ?? {title: translate(this.translationBundle, VISUAL_GRAPH_EXPLORE_TITLE)}),
          url: 'graphs-visualizations/config/save',
          elementSelector: GuideUtils.getGuideElementSelector(`sample-queries-${tabIndex}`),
          ...options
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [VISUAL_GRAPH_EXPLORE_TITLE]: 'Visual graph explore',
      [VISUAL_GRAPH_CONFIG_SAMPLE_QUERY_CONTENT]: 'These are sample queries that can be used as a reference when configuring this section.'
    },
    fr: {
      [VISUAL_GRAPH_EXPLORE_TITLE]: 'Explorer le graphique visuel',
      [VISUAL_GRAPH_CONFIG_SAMPLE_QUERY_CONTENT]: 'Ce sont des exemples de requêtes qui peuvent être utilisés comme référence lors de la configuration de cette section.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}

