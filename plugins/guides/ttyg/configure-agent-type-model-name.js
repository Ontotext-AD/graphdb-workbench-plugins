const TTYG_DEFAULT_TITLE = 'menu.ttyg.label';
const CONFIGURE_AGENT_MODEL = 'guide.step_plugin.configure-agent.model-input';

/**
 * @name configure-agent-type-model-name
 * @memberof module:Interactive Guide
 *
 * @description
 * This step guides the user to input the name of the OpenAI model to be used for the agent in the TTYG interface.
 * It highlights the input field and provides instructions on how to proceed.
 *
 * Type the name of the OpenAI model to be used<br>
 * <img src="resources/guides/ttyg/configure-agent-type-model-name.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options). Additionally it supports:
 *
 * @property {string} options.model - The name of the OpenAI model to be used (e.g., "gpt-4o-mini" ).
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "configure-agent-type-model-name",
 *  "options": {
 *    "model": "gpt-4o-mini"
 *  }
 * }
 * ```
 */
const step = {
  guideBlockName: 'configure-agent-type-model-name',
  getSteps: function(options, pluginService) {
    const GuideUtils = pluginService.GuideUtils;
    const translate = pluginService.translate;

    return [
      {
        guideBlockName: 'input-element',
        options: {
          content: translate(this.translationBundle, CONFIGURE_AGENT_MODEL, {model: options.model}),
          title: translate(this.translationBundle, TTYG_DEFAULT_TITLE),
          class: 'input-model',
          disablePreviousFlow: false,
          ...options,
          url: 'ttyg',
          elementSelector: GuideUtils.getGuideElementSelector('model'),
          onNextValidate: () => Promise.resolve(GuideUtils.validateTextInput(GuideUtils.getGuideElementSelector('model'), options.model, false))
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [TTYG_DEFAULT_TITLE]: 'Talk to Your Graph',
      [CONFIGURE_AGENT_MODEL]: 'Here you can type the name of the OpenAI model to be used.<br>Type: "<b>{{model}}</b>" to configure the agent to use this model'
    },
    fr: {
      [TTYG_DEFAULT_TITLE]: 'Parlez à votre graphe',
      [CONFIGURE_AGENT_MODEL]: 'Vous pouvez saisir ici le nom du modèle OpenAI à utiliser.<br>Type: "<b>{{model}}</b>" pour configurer l\'agent afin qu\'il utilise ce modèle.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
