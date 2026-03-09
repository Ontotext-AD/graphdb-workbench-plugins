const VISUAL_GRAPH_EXPLORE_TITLE = 'guide.step-action.visual-graph';
const VISUAL_GRAPH_CONFIG_PROPERTIES_NAME = 'guide.step-action.visual-graph-config-name';

/**
 * @name visual-graph-config-name
 * @memberof module:Interactive Guide
 *
 * @description
 * The `visual-graph-config-name` guide step prompts the user to enter a name for their visual graph configuration.
 *
 * Configure graph name<br>
 * <img src="resources/guides/visual-graph/visual-graph-config-name.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```json
 * {
 *   "guideBlockName": "visual-graph-config-name"
 * }
 * ```
 */
const step = {
  guideBlockName: 'visual-graph-config-name',
  getSteps: function(options, pluginServices) {
    const translate = pluginServices.translate;
    const GuideUtils = pluginServices.GuideUtils;
    const elementSelector = GuideUtils.getGuideElementSelector('graph-config-name');

    return [
      {
        guideBlockName: 'input-element',
        options: {
          content: translate(this.translationBundle, VISUAL_GRAPH_CONFIG_PROPERTIES_NAME),
          ...(options.title ?? {title: translate(this.translationBundle, VISUAL_GRAPH_EXPLORE_TITLE)}),
          url: 'graphs-visualizations/config/save',
          scrollToHandler: GuideUtils.scrollToTop,
          ...options,
          elementSelector,
          onNextValidate: () => Promise.resolve(GuideUtils.validateTextInputNotEmpty(elementSelector))
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [VISUAL_GRAPH_EXPLORE_TITLE]: 'Visual graph explore',
      [VISUAL_GRAPH_CONFIG_PROPERTIES_NAME]: 'Enter a name for your visual graph configuration.'
    },
    fr: {
      [VISUAL_GRAPH_EXPLORE_TITLE]: 'Explorer le graphique visuel',
      [VISUAL_GRAPH_CONFIG_PROPERTIES_NAME]: 'Saisissez un nom pour votre configuration de graphique visuel.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
