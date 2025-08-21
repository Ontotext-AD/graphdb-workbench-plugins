import {TTYG_CREATE_AGENT_DEFAULT_TITLE} from '../utils.js';

const step = {
  guideBlockName: 'ttyg-create-agent-intro-message',
  getSteps: (options, _services) => {
    return [
      {
        guideBlockName: 'info-message',
        options: {
          content: 'guide.step_plugin.create-ttyg-agent.intro',
          // If mainAction is set the title will be set automatically
          ...(options.mainAction ? {} : {title: TTYG_CREATE_AGENT_DEFAULT_TITLE}),
          ...options
        }
      }
    ];
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
