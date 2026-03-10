const VISUAL_GRAPH_EXPLORE_TITLE = 'guide.step-action.visual-graph';
const VISUAL_GRAPH_CONFIG_SELECT_CONTENT = 'guide.step-action.visual-graph-config-select-content';

/**
 * @name visual-graph-config-select
 * @memberof module:Interactive Guide
 *
 * @description
 * This step guides the user to click on the newly created visual graph configuration to open and explore it.<br>
 *
 * Select visual graph config step<br>
 * <img src="resources/guides/visual-graph/visual-graph-config-select.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 * Additionally, the following specific option is required:
 *
 * @property {string} [options.configName] - The name of the visual graph configuration to select.
 *
 * @example
 * ```JSON
 * {
 *   "guideBlockName": "visual-graph-config-select",
 *   "options": {
 *     "configName": "my-config"
 *   }
 * }
 * ```
 */
const step = {
  guideBlockName: 'visual-graph-config-select',
  getSteps: function(options, pluginServices) {
    const translate = pluginServices.translate;
    const GuideUtils = pluginServices.GuideUtils;
    const elementSelector = GuideUtils.getGuideElementSelector(`graph-config-${options.configName}`);

    return [
      {
        guideBlockName: 'clickable-element',
        options: {
          content: translate(this.translationBundle, VISUAL_GRAPH_CONFIG_SELECT_CONTENT),
          ...(options.title ?? {title: translate(this.translationBundle, VISUAL_GRAPH_EXPLORE_TITLE)}),
          url: 'graphs-visualizations',
          elementSelector,
          maxWaitTime: 10,
          onNextClick: GuideUtils.clickOnElement(elementSelector),
          ...options
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [VISUAL_GRAPH_EXPLORE_TITLE]: 'Visual graph explore',
      [VISUAL_GRAPH_CONFIG_SELECT_CONTENT]: 'Click the visual graph you just created to open and explore it.'
    },
    fr: {
      [VISUAL_GRAPH_EXPLORE_TITLE]: 'Explorer le graphique visuel',
      [VISUAL_GRAPH_CONFIG_SELECT_CONTENT]: 'Cliquez sur le graphique visuel que vous venez de créer pour l\'ouvrir et l\'explorer.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}

