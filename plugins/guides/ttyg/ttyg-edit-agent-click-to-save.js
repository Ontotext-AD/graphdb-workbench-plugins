const TTYG_EDIT_AGENT_DEFAULT_TITLE = 'guide.step-action.edit-ttyg-agent';
const SAVE_AGENT = 'guide.step_plugin.edit-ttyg-agent.save-agent-settings';

/**
 * @name ttyg-edit-agent-click-to-save
 * @memberof module:Interactive Guide
 *
 * @description
 * This step guides the user to click the save button after editing a TTYG agent.
 *
 * Click on save to save the edited agent<br>
 * <img src="resources/guides/ttyg/ttyg-edit-agent-click-to-save.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "ttyg-edit-agent-click-to-save",
 * }
 * ```
 */
const step = {
  guideBlockName: 'ttyg-edit-agent-click-to-save',
  getSteps: function(options, pluginService) {
    const GuideUtils = pluginService.GuideUtils;
    const translate = pluginService.translate;

    return [
      {
        guideBlockName: 'clickable-element',
        options: {
          content: translate(this.translationBundle, SAVE_AGENT),
          ...(options.title ?? {title: translate(this.translationBundle, TTYG_EDIT_AGENT_DEFAULT_TITLE)}),
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
      [TTYG_EDIT_AGENT_DEFAULT_TITLE]: 'Edit an agent',
      [SAVE_AGENT]: 'Click to save the agent settings.'
    },

    fr: {
      [TTYG_EDIT_AGENT_DEFAULT_TITLE]: 'Modifier un agent',
      [SAVE_AGENT]: 'Cliquez sur pour enregistrer les paramètres de l\'agent.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
