import {CONVERSATION_WITH_AGENT_DEFAULT_TITLE} from '../utils.js';

const step = {
  guideBlockName: 'ttyg-conversation-info-message',
  getSteps: (options, _services) => {
    return [
      {
        guideBlockName: 'info-message',
        options: {
          skipPoint: true,
          class: 'conversation-info',
          // If mainAction is set the title will be set automatically
          ...(options.mainAction ? {} : {title: CONVERSATION_WITH_AGENT_DEFAULT_TITLE}),
          content: 'guide.step_plugin.conversation-with-ttyg-agent.info',
          ...options,
          url: 'ttyg'
        }
      }
    ];
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
