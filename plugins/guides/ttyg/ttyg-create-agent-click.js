const TTYG_CREATE_AGENT_DEFAULT_TITLE = 'guide.step-action.create-ttyg-agent';
const CREATE_AGENT = 'guide.step_plugin.create-ttyg-agent.create-agent';

/**
 * @name ttyg-create-agent-click
 * @memberof module:Interactive Guide
 *
 * @description
 * This step focuses on guiding the user to click on the "Create Agent" button in the Talk to Your Graph (TTYG) plugin.
 * It highlights the button and provides instructions on how to proceed with creating a new agent.
 *
 * Click on create agent button<br>
 * <img src="resources/guides/ttyg/ttyg-create-agent-click.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "ttyg-create-agent-click",
 * }
 * ```
 */
const step = {
  guideBlockName: 'ttyg-create-agent-click',
  getSteps: function(options, pluginService) {
    const GuideUtils = pluginService.GuideUtils;
    const translate = pluginService.translate;
    const title = options.title ? options.title : translate(this.translationBundle, TTYG_CREATE_AGENT_DEFAULT_TITLE);
    return [
      {
        guideBlockName: 'clickable-element',
        options: {
          title,
          content: translate(this.translationBundle, CREATE_AGENT),
          class: 'create-agent-btn',
          maxWaitTime: 10,
          disableNextFlow: true,
          ...options,
          url: 'ttyg',
          elementSelector: GuideUtils.getGuideElementSelector('create-agent-btn')
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [TTYG_CREATE_AGENT_DEFAULT_TITLE]: 'Create an agent',
      [CREATE_AGENT]: 'Click on the create agent button to create a new agent.'
    },

    fr: {
      [TTYG_CREATE_AGENT_DEFAULT_TITLE]: 'Créer un agent',
      [CREATE_AGENT]: 'Cliquez sur le bouton Créer un agent pour créer un nouvel agent.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
