const VISUAL_GRAPH_EXPLORE_TITLE = 'guide.step-action.visual-graph';
const VISUAL_GRAPH_CONFIG_CLICK_TAB_CONTENT = 'guide.step-action.visual-graph-config-click-tab';
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
 * @name visual-graph-config-click-tab
 * @memberof module:Interactive Guide
 *
 * @description
 * This step guides the user to click on a specific tab in the Visual Graph configuration page.
 * The step will be skipped if the tab is already active.<br>
 *
 * Click on a config tab step<br>
 * <img src="resources/guides/visual-graph/visual-graph-config-click-tab.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 * Additionally, the following specific option is required:
 *
 * @property {string} options.tabName - The name of the tab to click. Must be one of `startingPoint`, `graphExpansion`, `nodeBasics`, `edgeBasics`, or `nodeExtra`.
 *
 * @example
 * ```JSON
 * {
 *   "guideBlockName": "visual-graph-config-click-tab",
 *   "options": {
 *     "tabName": "startingPoint"
 *   }
 * }
 * ```
 */
const step = {
  guideBlockName: 'visual-graph-config-click-tab',
  getSteps: function(options, pluginServices) {
    const translate = pluginServices.translate;
    const GuideUtils = pluginServices.GuideUtils;
    const tabConfig = TAB_CONFIG[options.tabName];
    const tab = translate(this.translationBundle, tabConfig.translationKey);
    const elementSelector = GuideUtils.getGuideElementSelector(`graph-config-tab-${tabConfig.index}`);

    return [
      {
        guideBlockName: 'clickable-element',
        options: {
          content: translate(this.translationBundle, VISUAL_GRAPH_CONFIG_CLICK_TAB_CONTENT, {tab}),
          ...(options.title ?? {title: translate(this.translationBundle, VISUAL_GRAPH_EXPLORE_TITLE)}),
          url: 'graphs-visualizations/config/save',
          elementSelector: GuideUtils.getGuideElementSelector(`graph-config-tab-${tabConfig.index}`),
          ...options,
          onNextClick: () => {
            document.querySelector(elementSelector)?.click();
          },
          showOn: () => {
            const element = document.querySelector(elementSelector);
            return !element?.classList?.contains('active');
          }
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [VISUAL_GRAPH_EXPLORE_TITLE]: 'Visual graph explore',
      [VISUAL_GRAPH_CONFIG_CLICK_TAB_CONTENT]: 'Click on the <b>{{tab}}</b> tab',
      [TAB_1]: 'Starting point',
      [TAB_2]: 'Graph expansion',
      [TAB_3]: 'Node basics',
      [TAB_4]: 'Edge basics',
      [TAB_5]: 'Node extra'
    },
    fr: {
      [VISUAL_GRAPH_EXPLORE_TITLE]: 'Explorer le graphique visuel',
      [VISUAL_GRAPH_CONFIG_CLICK_TAB_CONTENT]: 'Cliquez sur l\'onglet <b>{{tab}}</b>',
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

