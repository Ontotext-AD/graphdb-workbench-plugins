const VISUAL_GRAPH_EXPLORE_TITLE = 'guide.step-action.visual-graph';
const VISUAL_GRAPH_CONFIG_PROPERTIES_DESCRIPTION = 'guide.step-action.visual-graph-config-description';

/**
 * @name visual-graph-config-description
 * @memberof module:Interactive Guide
 *
 * @description
 * The `visual-graph-config-description` guide step prompts the user to type a description for their visual graph configuration.
 *
 * Configure graph description<br>
 * <img src="resources/guides/visual-graph/visual-graph-config-description.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 * Additionally, the following specific option is required:
 *
 * @property {string} [options.configDescription] - The description of the visual graph configuration to be entered by the user.
 *
 * @example
 * ```json
 * {
 *   "guideBlockName": "visual-graph-config-description",
 *   "options": {
 *     "configDescription": "my-config-description"
 *   }
 * }
 * ```
 */
const step = {
  guideBlockName: 'visual-graph-config-description',
  getSteps: function(options, pluginServices) {
    const translate = pluginServices.translate;
    const GuideUtils = pluginServices.GuideUtils;
    const elementSelector = GuideUtils.getGuideElementSelector('graph-config-description');
    const configDescription = options.configDescription || '';

    return [
      {
        guideBlockName: 'input-element',
        options: {
          content: translate(this.translationBundle, VISUAL_GRAPH_CONFIG_PROPERTIES_DESCRIPTION, {configDescription}),
          title: translate(this.translationBundle, VISUAL_GRAPH_EXPLORE_TITLE),
          url: 'graphs-visualizations/config/save',
          ...options,
          elementSelector,
          onNextValidate: () => Promise.resolve(GuideUtils.validateTextInput(elementSelector, configDescription))
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [VISUAL_GRAPH_EXPLORE_TITLE]: 'Visual graph explore',
      [VISUAL_GRAPH_CONFIG_PROPERTIES_DESCRIPTION]: 'Enter a description: <b>{{configDescription}}</b>'
    },
    fr: {
      [VISUAL_GRAPH_EXPLORE_TITLE]: 'Explorer le graphique visuel',
      [VISUAL_GRAPH_CONFIG_PROPERTIES_DESCRIPTION]: 'Entrez une description : <b>{{configDescription}}</b>'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}

