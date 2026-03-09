const VISUAL_GRAPH_EXPLORE_TITLE = 'guide.step-action.visual-graph';
const VISUAL_GRAPH_CONFIG_SAVE_CONTENT = 'guide.step-action.visual-graph-config-save-content';

/**
 * @name visual-graph-config-save
 * @memberof module:Interactive Guide
 *
 * @description
 * This step guides the user to click the save button to save the visual graph configuration.
 *
 * Save visual graph config step<br>
 * <img src="resources/guides/visual-graph/visual-graph-config-save.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```JSON
 * {
 *   "guideBlockName": "visual-graph-config-save",
 * }
 * ```
 */
const step = {
  guideBlockName: 'visual-graph-config-save',
  getSteps: function(options, pluginServices) {
    const translate = pluginServices.translate;
    const GuideUtils = pluginServices.GuideUtils;
    const elementSelector = GuideUtils.getGuideElementSelector('save-graph-config');

    return [
      {
        guideBlockName: 'clickable-element',
        options: {
          content: translate(this.translationBundle, VISUAL_GRAPH_CONFIG_SAVE_CONTENT),
          ...(options.title ?? {title: translate(this.translationBundle, VISUAL_GRAPH_EXPLORE_TITLE)}),
          url: 'graphs-visualizations/config/save',
          elementSelector,
          onNextClick: GuideUtils.clickOnElement(elementSelector),
          ...options
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [VISUAL_GRAPH_EXPLORE_TITLE]: 'Visual graph explore',
      [VISUAL_GRAPH_CONFIG_SAVE_CONTENT]: 'Click to save the visual graph configuration.'
    },
    fr: {
      [VISUAL_GRAPH_EXPLORE_TITLE]: 'Explorer le graphique visuel',
      [VISUAL_GRAPH_CONFIG_SAVE_CONTENT]: 'Cliquez pour enregistrer la configuration du graphique visuel.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}

