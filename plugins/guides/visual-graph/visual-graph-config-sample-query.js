const VISUAL_GRAPH_EXPLORE_TITLE = 'guide.step-action.visual-graph';
const VISUAL_GRAPH_CONFIG_SAMPLE_QUERY_CONTENT = 'guide.step-action.visual-graph-config-sample-query';
const TAB_1 = 'guide.step-visual-graph-config-tab.1';
const TAB_2 = 'guide.step-visual-graph-config-tab.2';
const TAB_3 = 'guide.step-visual-graph-config-tab.3';
const TAB_4 = 'guide.step-visual-graph-config-tab.4';
const TAB_5 = 'guide.step-visual-graph-config-tab.5';

const TAB_CONFIG = {
  startingPoint: {index: 1, translationKey: TAB_1},
  graphExpansion: {index: 2, translationKey: TAB_2},
  nodeBasics: {index: 3, translationKey: TAB_3},
  edgeBasics: {index: 4, translationKey: TAB_4},
  nodeExtra: {index: 5, translationKey: TAB_5}
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
    const tabConfig = TAB_CONFIG[options.tabName];

    return [
      {
        guideBlockName: 'read-only-element',
        options: {
          content: translate(this.translationBundle, VISUAL_GRAPH_CONFIG_SAMPLE_QUERY_CONTENT),
          ...(options.title ?? {title: translate(this.translationBundle, VISUAL_GRAPH_EXPLORE_TITLE)}),
          url: 'graphs-visualizations/config/save',
          elementSelector: GuideUtils.getGuideElementSelector(`sample-queries-${tabConfig.index}`),
          ...options
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [VISUAL_GRAPH_EXPLORE_TITLE]: 'Visual graph explore',
      [VISUAL_GRAPH_CONFIG_SAMPLE_QUERY_CONTENT]: 'These are sample queries that can be used as a reference when configuring this section.',
      [TAB_1]: 'Starting point',
      [TAB_2]: 'Graph expansion',
      [TAB_3]: 'Node basics',
      [TAB_4]: 'Edge basics',
      [TAB_5]: 'Node extra'
    },
    fr: {
      [VISUAL_GRAPH_EXPLORE_TITLE]: 'Explorer le graphique visuel',
      [VISUAL_GRAPH_CONFIG_SAMPLE_QUERY_CONTENT]: 'Ce sont des exemples de requêtes qui peuvent être utilisés comme référence lors de la configuration de cette section.',
      [TAB_1]: 'Point de départ',
      [TAB_2]: 'Expansion du graphique',
      [TAB_3]: 'Bases des nœuds',
      [TAB_4]: 'Bases des arêtes',
      [TAB_5]: 'Extra des nœuds'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}

