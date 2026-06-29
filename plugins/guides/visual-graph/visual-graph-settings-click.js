const VISUAL_GRAPH_EXPLORE_TITLE = 'guide.step-action.visual-graph';
const VISUAL_GRAPH_SETTINGS_CLICK_CONTENT = 'guide.step-action.visual-graph-settings-click-content';

/**
 * @name visual-graph-settings-click
 * @memberof module:Interactive Guide
 *
 * @description
 * This step guides the user to click on the graph settings button to open the visual graph settings.<br>
 *
 * Click on graph settings button step<br>
 * <img src="resources/guides/visual-graph/visual-graph-settings-click.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```JSON
 * {
 *   "guideBlockName": "visual-graph-settings-click",
 * }
 * ```
 */
const step = {
  guideBlockName: 'visual-graph-settings-click',
  getSteps: function(options, pluginServices) {
    const translate = pluginServices.translate;
    const GuideUtils = pluginServices.GuideUtils;
    const elementSelector = GuideUtils.getGuideElementSelector('graph-settings-button');

    return [
      {
        guideBlockName: 'clickable-element',
        options: {
          content: translate(this.translationBundle, VISUAL_GRAPH_SETTINGS_CLICK_CONTENT),
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
      [VISUAL_GRAPH_SETTINGS_CLICK_CONTENT]: 'Click on <b>Graph settings</b>.'
    },
    fr: {
      [VISUAL_GRAPH_EXPLORE_TITLE]: 'Explorer le graphique visuel',
      [VISUAL_GRAPH_SETTINGS_CLICK_CONTENT]: 'Cliquez sur <b>Paramètres du graphique</b>.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}

