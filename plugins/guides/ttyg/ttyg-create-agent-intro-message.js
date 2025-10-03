const TTYG_CREATE_AGENT_DEFAULT_TITLE = 'guide.step-action.create-ttyg-agent';
const TTYG_INTRO_MESSAGE = 'guide.step_plugin.create-ttyg-agent.intro';

/**
 * @name ttyg-create-agent-intro-message
 * @memberof module:Interactive Guide
 *
 * @description
 * This step provides an introductory message about creating an agent in the Talk to Your Graph (TTYG) plugin.
 * It explains what an agent is and why it is necessary to configure one before using TTYG.
 *
 * Create an agent<br>
 * <img src="resources/guides/ttyg/ttyg-create-agent-intro-message.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "ttyg-create-agent-intro-message",
 * }
 * ```
 */
const step = {
  guideBlockName: 'ttyg-create-agent-intro-message',
  getSteps: function(options, pluginService) {
    const translate = pluginService.translate;
    const title = options.title ? options.title : translate(this.translationBundle, TTYG_CREATE_AGENT_DEFAULT_TITLE);
    return [
      {
        guideBlockName: 'info-message',
        options: {
          title,
          content: translate(this.translationBundle, TTYG_INTRO_MESSAGE),
          ...options
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [TTYG_CREATE_AGENT_DEFAULT_TITLE]: 'Create an agent',
      [TTYG_INTRO_MESSAGE]: 'An agent is a helpful assistant that can answer your queries. You need to configure an agent in order to ask anything of Talk to Your Graph.'
    },

    fr: {
      [TTYG_CREATE_AGENT_DEFAULT_TITLE]: 'Créer un agent',
      [TTYG_INTRO_MESSAGE]: 'Un agent est un assistant utile qui peut répondre à vos questions. Vous devez configurer un agent pour pouvoir demander quoi que ce soit à Talk to Your Graph.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
