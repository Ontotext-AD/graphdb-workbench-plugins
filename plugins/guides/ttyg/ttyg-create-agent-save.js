const TTYG_CREATE_AGENT_DEFAULT_TITLE = 'guide.step-action.create-ttyg-agent';
const SAVE_AGENT_SETTINGS = 'guide.step_plugin.create-ttyg-agent.save-agent-settings';

/**
 * @name ttyg-create-agent-save
 * @memberof module:Interactive Guide
 *
 * @description
 * This step focuses on guiding the user to click on the "Save" button after configuring an agent in the Talk to Your Graph (TTYG) plugin.
 * It highlights the button and provides instructions on how to save the agent settings.
 *
 * Click on save button<br>
 * <img src="resources/guides/ttyg/ttyg-create-agent-save.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "ttyg-create-agent-save",
 * }
 * ```
 */
const step = {
  guideBlockName: 'ttyg-create-agent-save',
  getSteps: function(options, pluginService) {
    const GuideUtils = pluginService.GuideUtils;
    const translate = pluginService.translate;
    const title = options.title ? options.title : translate(this.translationBundle, TTYG_CREATE_AGENT_DEFAULT_TITLE);

    return [
      {
        guideBlockName: 'clickable-element',
        options: {
          title,
          content: translate(this.translationBundle, SAVE_AGENT_SETTINGS),
          class: 'save-agent',
          disablePreviousFlow: false,
          disableNextFlow: true,
          ...options,
          url: 'ttyg',
          elementSelector: GuideUtils.getGuideElementSelector('save-agent-settings')
        }
      }
    ];
  },

  translationBundle: {
    en: {
      [TTYG_CREATE_AGENT_DEFAULT_TITLE]: 'Create an agent',
      [SAVE_AGENT_SETTINGS]: 'Click to save the agent settings.'
    },
    fr: {
      [TTYG_CREATE_AGENT_DEFAULT_TITLE]: 'Créer un agent',
      [SAVE_AGENT_SETTINGS]: 'Cliquez sur pour enregistrer les paramètres de l\'agent.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
