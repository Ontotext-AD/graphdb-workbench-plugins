const TTYG_EDIT_AGENT_DEFAULT_TITLE = 'guide.step-action.edit-ttyg-agent';
const EDIT_TTYG_AGENT = 'guide.step_plugin.edit-ttyg-agent.edit-agent';

/**
 * @name ttyg-click-to-edit-selected-agent
 * @memberof module:Interactive Guide
 *
 * @description
 * This step guides the user to click on the edit button to modify the configuration of the selected TTYG agent.
 *
 * Click on edit agent button<br>
 * <img src="resources/guides/ttyg/ttyg-click-to-edit-selected-agent.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "ttyg-click-to-edit-selected-agent",
 * }
 * ```
 */
const step = {
  guideBlockName: 'ttyg-click-to-edit-selected-agent',
  getSteps: function(options, pluginService) {
    const GuideUtils = pluginService.GuideUtils;
    const translate = pluginService.translate;

    return [
      {
        guideBlockName: 'clickable-element',
        options: {
          content: translate(this.translationBundle, EDIT_TTYG_AGENT),
          title: translate(this.translationBundle, TTYG_EDIT_AGENT_DEFAULT_TITLE),
          class: 'edit-agent-btn',
          disableNextFlow: true,
          ...options,
          url: 'ttyg',
          elementSelector: GuideUtils.getGuideElementSelector('edit-current-agent')
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [TTYG_EDIT_AGENT_DEFAULT_TITLE]: 'Edit an agent',
      [EDIT_TTYG_AGENT]: 'Click on the edit agent button to edit the configuration of the selected agent.'
    },

    fr: {
      [TTYG_EDIT_AGENT_DEFAULT_TITLE]: 'Modifier un agent',
      [EDIT_TTYG_AGENT]: 'Cliquez sur le bouton « Modifier l\'agent » pour modifier la configuration de l\'agent sélectionné.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
