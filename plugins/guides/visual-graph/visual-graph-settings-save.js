const VISUAL_GRAPH_EXPLORE_TITLE = 'guide.step-action.visual-graph';
const VISUAL_GRAPH_SETTINGS_SAVE_CONTENT = 'guide.step-action.visual-graph-settings-save-content';

/**
 * @name visual-graph-settings-save
 * @memberof module:Interactive Guide
 *
 * @description
 * This step guides the user to click the save button to save the graph settings.<br>
 *
 * Save graph settings step<br>
 * <img src="resources/guides/visual-graph/visual-graph-settings-save.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```JSON
 * {
 *   "guideBlockName": "visual-graph-settings-save",
 * }
 * ```
 */
const step = {
  guideBlockName: 'visual-graph-settings-save',
  getSteps: function(options, pluginServices) {
    const translate = pluginServices.translate;
    const GuideUtils = pluginServices.GuideUtils;
    const elementSelector = GuideUtils.getGuideElementSelector('graph-settings-save-button');

    return [
      {
        guideBlockName: 'clickable-element',
        options: {
          content: translate(this.translationBundle, VISUAL_GRAPH_SETTINGS_SAVE_CONTENT),
          title: translate(this.translationBundle, VISUAL_GRAPH_EXPLORE_TITLE),
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
      [VISUAL_GRAPH_SETTINGS_SAVE_CONTENT]: 'Click to save the graph settings.'
    },
    fr: {
      [VISUAL_GRAPH_EXPLORE_TITLE]: 'Explorer le graphique visuel',
      [VISUAL_GRAPH_SETTINGS_SAVE_CONTENT]: 'Cliquez pour enregistrer les paramètres du graphique.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}

