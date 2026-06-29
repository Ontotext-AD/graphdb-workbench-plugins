const TTYG_DEFAULT_TITLE = 'menu.ttyg.label';
const CONFIGURE_USER_INSTRUCTIONS = 'guide.step_plugin.configure-agent.user-instructions-input';

/**
 * @name configure-agent-additional-instructions
 * @memberof module:Interactive Guide
 *
 * @description
 * This step focuses on guiding the user to add additional instructions for the TTYG agent.
 * It highlights the input area where the user can type their instructions and provides a text to copy
 *
 * * Add additional instructions<br>
 * <img src="resources/guides/ttyg/configure-agent-additional-instructions.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options). Additionally it supports:
 * @property {string} [userInstructions] - The additional instructions to be passed to the agent. This will be displayed in the instructions.
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "configure-agent-additional-instructions",
 *  "options": {
 *    "userInstructions": "When writing SPARQL queries, please do not bind inside the query select clause. Also add all prefix definitions when writing the query"
 *   }
 * }
 * ```
 */
const step = {
  guideBlockName: 'configure-agent-additional-instructions',
  getSteps: function(options, pluginService) {
    const GuideUtils = pluginService.GuideUtils;
    const translate = pluginService.translate;

    return [
      {
        guideBlockName: 'copy-text-element',
        options: {
          extraContent: translate(this.translationBundle, CONFIGURE_USER_INSTRUCTIONS),
          title: translate(this.translationBundle, TTYG_DEFAULT_TITLE),
          class: 'input-user-instructions',
          disablePreviousFlow: false,
          text: options.userInstructions,
          ...options,
          url: 'ttyg',
          elementSelector: GuideUtils.getGuideElementSelector('user-instructions'),
          onNextValidate: () => Promise.resolve(GuideUtils.validateTextInput(GuideUtils.getGuideElementSelector('user-instructions'), options.userInstructions, false))
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [TTYG_DEFAULT_TITLE]: 'Talk to Your Graph',
      [CONFIGURE_USER_INSTRUCTIONS]: 'Those are additional instructions which will be passed to the agent.'
    },
    fr: {
      [TTYG_DEFAULT_TITLE]: 'Parlez à votre graphe',
      [CONFIGURE_USER_INSTRUCTIONS]: 'Ce sont des instructions supplémentaires qui seront transmises à l\'agent.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
