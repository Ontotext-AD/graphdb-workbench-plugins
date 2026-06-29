const VISUAL_GRAPH_EXPLORE_TITLE = 'guide.step-action.visual-graph';
const VISUAL_GRAPH_CONFIG_CREATE_CLICK_CONTENT = 'guide.step-action.visual-graph-config-create-click-content';

/**
 * @name visual-graph-config-create-click
 * @memberof module:Interactive Guide
 *
 * @description
 * This step guides the user to click on the create graph config button in the Visual Graph explore page to create a graph config.<br>
 *
 * Click on the create graph config button step<br>
 * <img src="resources/guides/visual-graph/visual-graph-config-create-click.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```JSON
 * {
 *   "guideBlockName": "visual-graph-config-create-click",
 * }
 * ```
 */
const step = {
  guideBlockName: 'visual-graph-config-create-click',
  getSteps: function(options, pluginServices) {
    const translate = pluginServices.translate;
    const GuideUtils = pluginServices.GuideUtils;

    return [
      {
        guideBlockName: 'clickable-element',
        options: {
          content: translate(this.translationBundle, VISUAL_GRAPH_CONFIG_CREATE_CLICK_CONTENT),
          title: translate(this.translationBundle, VISUAL_GRAPH_EXPLORE_TITLE),
          url: 'graphs-visualizations',
          elementSelector: GuideUtils.getGuideElementSelector('create-graph-config-btn'),
          placement: 'left',
          ...options
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [VISUAL_GRAPH_EXPLORE_TITLE]: 'Visual graph explore',
      [VISUAL_GRAPH_CONFIG_CREATE_CLICK_CONTENT]: 'Click on the create config button to Create graph config.'
    },
    fr: {
      [VISUAL_GRAPH_EXPLORE_TITLE]: 'Explorer le graphique visuel',
      [VISUAL_GRAPH_CONFIG_CREATE_CLICK_CONTENT]: 'Cliquez sur le bouton de création de config pour créer une configuration de graphique.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}

