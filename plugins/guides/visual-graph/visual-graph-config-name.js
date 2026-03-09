const VISUAL_GRAPH_EXPLORE_TITLE = 'guide.step-action.visual-graph';
const VISUAL_GRAPH_CONFIG_PROPERTIES_NAME = 'guide.step-action.visual-graph-config-name';

/**
 * @name visual-graph-config-name
 * @memberof module:Interactive Guide
 *
 * @description
 * The `visual-graph-config-name` guide step prompts the user to type a name for their visual graph configuration.
 *
 * Configure graph name<br>
 * <img src="resources/guides/visual-graph/visual-graph-config-name.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 * Additionally, the following specific option is required:
 *
 * @property {string} [options.configName] - The name of the visual graph configuration to be entered by the user.
 *
 * @example
 * ```json
 * {
 *   "guideBlockName": "visual-graph-config-name",
 *   "options": {
 *     "configName": "my-config"
 *   }
 * }
 * ```
 */
const step = {
  guideBlockName: 'visual-graph-config-name',
  getSteps: function(options, pluginServices) {
    const translate = pluginServices.translate;
    const GuideUtils = pluginServices.GuideUtils;
    const elementSelector = GuideUtils.getGuideElementSelector('graph-config-name');
    const configName = options.configName || '';

    return [
      {
        guideBlockName: 'input-element',
        options: {
          content: translate(this.translationBundle, VISUAL_GRAPH_CONFIG_PROPERTIES_NAME, {configName}),
          ...(options.title ?? {title: translate(this.translationBundle, VISUAL_GRAPH_EXPLORE_TITLE)}),
          url: 'graphs-visualizations/config/save',
          scrollToHandler: GuideUtils.scrollToTop,
          ...options,
          elementSelector,
          onNextValidate: () => Promise.resolve(GuideUtils.validateTextInput(elementSelector, configName, false))
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [VISUAL_GRAPH_EXPLORE_TITLE]: 'Visual graph explore',
      [VISUAL_GRAPH_CONFIG_PROPERTIES_NAME]: 'Type <b>{{configName}}</b> as the name of your visual graph configuration. You will refer to it later'
    },
    fr: {
      [VISUAL_GRAPH_EXPLORE_TITLE]: 'Explorer le graphique visuel',
      [VISUAL_GRAPH_CONFIG_PROPERTIES_NAME]: 'Tapez <b>{{configName}}</b> comme nom de votre configuration de graphique visuel. Vous y ferez référence plus tard'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
