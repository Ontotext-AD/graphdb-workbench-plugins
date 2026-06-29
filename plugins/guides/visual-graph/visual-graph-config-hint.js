const VISUAL_GRAPH_EXPLORE_TITLE = 'guide.step-action.visual-graph';
const VISUAL_GRAPH_CONFIG_PROPERTIES_HINT = 'guide.step-action.visual-graph-config-hint';

/**
 * @name visual-graph-config-hint
 * @memberof module:Interactive Guide
 *
 * @description
 * The `visual-graph-config-hint` guide step prompts the user to type a hint for their visual graph configuration.
 *
 * Configure graph hint<br>
 * <img src="resources/guides/visual-graph/visual-graph-config-hint.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 * Additionally, the following specific option is required:
 *
 * @property {string} [options.configHint] - The hint of the visual graph configuration to be entered by the user.
 *
 * @example
 * ```json
 * {
 *   "guideBlockName": "visual-graph-config-hint",
 *   "options": {
 *     "configHint": "http://example.org/resource"
 *   }
 * }
 * ```
 */
const step = {
  guideBlockName: 'visual-graph-config-hint',
  getSteps: function(options, pluginServices) {
    const translate = pluginServices.translate;
    const GuideUtils = pluginServices.GuideUtils;
    const elementSelector = GuideUtils.getGuideElementSelector('graph-config-hint');
    const configHint = options.configHint || '';

    return [
      {
        guideBlockName: 'input-element',
        options: {
          content: translate(this.translationBundle, VISUAL_GRAPH_CONFIG_PROPERTIES_HINT, {configHint}),
          title: translate(this.translationBundle, VISUAL_GRAPH_EXPLORE_TITLE),
          url: 'graphs-visualizations/config/save',
          ...options,
          elementSelector,
          onNextValidate: () => Promise.resolve(GuideUtils.validateTextInput(elementSelector, configHint))
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [VISUAL_GRAPH_EXPLORE_TITLE]: 'Visual graph explore',
      [VISUAL_GRAPH_CONFIG_PROPERTIES_HINT]: 'Copy and use the following IRI as the starting point for the visual graph: <b>{{configHint}}</b>'
    },
    fr: {
      [VISUAL_GRAPH_EXPLORE_TITLE]: 'Explorer le graphique visuel',
      [VISUAL_GRAPH_CONFIG_PROPERTIES_HINT]: 'Copiez et utilisez l\'IRI suivant comme point de départ pour le graphique visuel : <b>{{configHint}}</b>'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}

