const CONVERSATION_WITH_AGENT_DEFAULT_TITLE = 'guide.step-action.conversation-with-ttyg-agent';
const START_CONVERSATION = 'guide.step_plugin.conversation-with-ttyg-agent.start-conversation';

/**
 * @name ttyg-click-to-create-new-chat
 * @memberof module:Interactive Guide
 *
 * @description
 * This step focuses on guiding the user to click on the "Create Chat" button in the Talk to Your Graph.
 * It highlights the button and provides instructions on how to start a new conversation with the agent.
 *
 * Create a new chat<br>
 * <img src="resources/guides/ttyg/ttyg-click-to-create-new-chat.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "ttyg-click-to-create-new-chat",
 * }
 * ```
 */
const step = {
  guideBlockName: 'ttyg-click-to-create-new-chat',
  getSteps: function(options, pluginService) {
    const GuideUtils = pluginService.GuideUtils;
    const createChatBtnSelector = GuideUtils.getGuideElementSelector('create-chat-btn');
    const translate = pluginService.translate;
    const title = options.title ? options.title : translate(this.translationBundle, CONVERSATION_WITH_AGENT_DEFAULT_TITLE);
    return [
      {
        guideBlockName: 'clickable-element',
        options: {
          title,
          content: translate(this.translationBundle, START_CONVERSATION),
          class: 'start-conversation',
          disableNextFlow: true,
          ...options,
          url: 'ttyg',
          elementSelector: createChatBtnSelector
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [CONVERSATION_WITH_AGENT_DEFAULT_TITLE]: 'Conversation with the agent',
      [START_CONVERSATION]: 'Click the button to create a new chat'
    },
    fr: {
      [CONVERSATION_WITH_AGENT_DEFAULT_TITLE]: 'Conversation avec l\'agent',
      [START_CONVERSATION]: 'Cliquez sur le bouton pour créer un nouveau chat'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
