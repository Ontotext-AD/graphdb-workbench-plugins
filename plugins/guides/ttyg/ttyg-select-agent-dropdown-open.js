import {TTYG_SELECT_AGENT_DEFAULT_TITLE} from '../utils.js';

const step = {
  guideBlockName: 'ttyg-select-agent-dropdown-open',
  getSteps: (options, services) => {
    const GuideUtils = services.GuideUtils;

    return [
      {
        guideBlockName: 'clickable-element',
        options: {
          content: 'guide.step_plugin.select-ttyg-agent.open-agent-dropdown',
          // If mainAction is set the title will be set automatically
          ...(options.mainAction ? {} : {title: TTYG_SELECT_AGENT_DEFAULT_TITLE}),
          class: 'open-agent-dropdown',
          disableNextFlow: true,
          ...options,
          url: 'ttyg',
          elementSelector: GuideUtils.getGuideElementSelector('select-agent-dropdown')
        }
      }
    ];
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
