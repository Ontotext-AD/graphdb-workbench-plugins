const TTYG_SELECT_AGENT_DEFAULT_TITLE = 'guide.step-action.select-ttyg-agent';
const SELECT_AGENT_INFO = 'guide.step_plugin.select-ttyg-agent.info.content';
const SKIP_SECTION = 'btn.skip-section';

/**
 * @name ttyg-select-agent-info-message
 * @memberof module:Interactive Guide
 *
 * @description
 * This step provides an informational message when selecting a TTYG agent.
 * It informs the user that they need to select an agent before interacting with their graph.
 *
 * Select an agent to edit<br>
 * <img src="resources/guides/ttyg/ttyg-select-agent-info-message.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "ttyg-select-agent-info-message",
 * }
 * ```
 */
const step = {
  guideBlockName: 'ttyg-select-agent-info-message',
  getSteps: function(options, pluginService) {
    const translate = pluginService.translate;
    return [
      {
        guideBlockName: 'info-message',
        options: {
          content: translate(this.translationBundle, SELECT_AGENT_INFO),
          ...(options.title ?? {title: translate(this.translationBundle, TTYG_SELECT_AGENT_DEFAULT_TITLE)}),
          class: 'select-ttyg-agent',
          skipPoint: true,
          skipButtonLabel: translate(this.translationBundle, SKIP_SECTION),
          disablePreviousFlow: true,
          ...options,
          url: 'ttyg'
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [TTYG_SELECT_AGENT_DEFAULT_TITLE]: 'Select an agent',
      [SELECT_AGENT_INFO]: 'To talk to your graph, you need to select an agent first',
      [SKIP_SECTION]: 'Skip section'
    },

    fr: {
      [TTYG_SELECT_AGENT_DEFAULT_TITLE]: 'Sélectionner un agent',
      [SELECT_AGENT_INFO]: 'Pour parler à votre graphique, vous devez d\'abord choisir un agent',
      [SKIP_SECTION]: 'Sauter la section'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
