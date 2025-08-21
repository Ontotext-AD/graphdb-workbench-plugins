import {CONVERSATION_WITH_AGENT_DEFAULT_TITLE} from '../utils.js';

const step = {
  guideBlockName: 'ttyg-click-to-create-new-chat',
  getSteps: (options, services) => {
    const GuideUtils = services.GuideUtils;
    const createChatBtnSelector = GuideUtils.getGuideElementSelector('create-chat-btn');
    return [
      {
        guideBlockName: 'clickable-element',
        options: {
          content: 'guide.step_plugin.conversation-with-ttyg-agent.start-conversation',
          // If mainAction is set the title will be set automatically
          ...(options.mainAction ? {} : {title: CONVERSATION_WITH_AGENT_DEFAULT_TITLE}),
          class: 'start-conversation',
          disableNextFlow: true,
          ...options,
          url: 'ttyg',
          elementSelector: createChatBtnSelector
        }
      }
    ];
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
