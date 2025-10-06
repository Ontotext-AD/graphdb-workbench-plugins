const TTYG_EDIT_AGENT_DEFAULT_TITLE = 'guide.step-action.edit-ttyg-agent';
const EDIT_TTYG_AGENT = 'guide.step_plugin.edit-ttyg-agent.intro';
const SKIP_SECTION = 'btn.skip-section';

/**
 * @name ttyg-edit-agent-intro-message
 * @memberof module:Interactive Guide
 *
 * @description
 * This step provides an introductory message when editing a TTYG agent.
 * It informs the user that an agent's configuration can be reconfigured at any time.
 *
 * Edit agent intro message<br>
 * <img src="resources/guides/ttyg/ttyg-edit-agent-intro-message.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "ttyg-edit-agent-intro-message",
 * }
 * ```
 */
const step = {
  guideBlockName: 'ttyg-edit-agent-intro-message',
  getSteps: function(options, pluginService) {
    const translate = pluginService.translate;
    return [
      {
        guideBlockName: 'info-message',
        options: {
          content: translate(this.translationBundle, EDIT_TTYG_AGENT),
          ...(options.title ?? {title: translate(this.translationBundle, TTYG_EDIT_AGENT_DEFAULT_TITLE)}),
          skipPoint: true,
          skipButtonLabel: translate(this.translationBundle, SKIP_SECTION),
          ...options
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [TTYG_EDIT_AGENT_DEFAULT_TITLE]: 'Edit an agent',
      [EDIT_TTYG_AGENT]: 'An agent\'s configuration such as the extraction methods can be reconfigured at any time',
      [SKIP_SECTION]: 'Skip section'
    },

    fr: {
      [TTYG_EDIT_AGENT_DEFAULT_TITLE]: 'Modifier un agent',
      [EDIT_TTYG_AGENT]: 'La configuration d\'un agent, comme les méthodes d\'extraction, peut être reconfigurée à tout moment.',
      [SKIP_SECTION]: 'Sauter la section'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
