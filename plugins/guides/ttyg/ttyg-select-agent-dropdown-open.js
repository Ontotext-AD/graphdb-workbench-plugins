const TTYG_SELECT_AGENT_DEFAULT_TITLE = 'guide.step-action.select-ttyg-agent';
const OPEN_AGENT_DROPDOWN = 'guide.step_plugin.select-ttyg-agent.open-agent-dropdown';

/**
 * @name ttyg-select-agent-dropdown-open
 * @memberof module:Interactive Guide
 *
 * @description
 * This step guides the user to open the agent selection dropdown in the TTYG interface.
 * It highlights the dropdown element and provides instructions on how to proceed.
 *
 * Click on the agents dropdown<br>
 * <img src="resources/guides/ttyg/ttyg-select-agent-dropdown-open.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "ttyg-select-agent-dropdown-open",
 * }
 * ```
 */
const step = {
  guideBlockName: 'ttyg-select-agent-dropdown-open',
  getSteps: function(options, services) {
    const GuideUtils = services.GuideUtils;
    const translate = services.translate;

    return [
      {
        guideBlockName: 'clickable-element',
        options: {
          content: translate(this.translationBundle, OPEN_AGENT_DROPDOWN),
          // If mainAction is set the title will be set automatically
          title: translate(this.translationBundle, TTYG_SELECT_AGENT_DEFAULT_TITLE),
          class: 'open-agent-dropdown',
          disableNextFlow: true,
          ...options,
          url: 'ttyg',
          elementSelector: GuideUtils.getGuideElementSelector('select-agent-dropdown')
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [TTYG_SELECT_AGENT_DEFAULT_TITLE]: 'Select an agent',
      [OPEN_AGENT_DROPDOWN]: 'Click on the agents dropdown to see available agents'
    },

    fr: {
      [TTYG_SELECT_AGENT_DEFAULT_TITLE]: 'Sélectionner un agent',
      [OPEN_AGENT_DROPDOWN]: 'Cliquez sur le menu déroulant des agents pour voir les agents disponibles'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
