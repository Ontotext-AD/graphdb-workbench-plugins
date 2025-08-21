import {TTYG_CREATE_AGENT_DEFAULT_TITLE} from '../utils.js';

const step = {
  guideBlockName: 'ttyg-create-agent-click',
  getSteps: (options, services) => {
    const GuideUtils = services.GuideUtils;
    return [
      {
        guideBlockName: 'clickable-element',
        options: {
          content: 'guide.step_plugin.create-ttyg-agent.create-agent',
          // If mainAction is set the title will be set automatically
          ...(options.mainAction ? {} : {title: TTYG_CREATE_AGENT_DEFAULT_TITLE}),
          class: 'create-agent-btn',
          maxWaitTime: 10,
          disableNextFlow: true,
          ...options,
          url: 'ttyg',
          elementSelector: GuideUtils.getGuideElementSelector('create-agent-btn')
        }
      }
    ];
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
