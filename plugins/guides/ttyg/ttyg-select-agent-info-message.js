import {SKIP_SECTION, TTYG_SELECT_AGENT_DEFAULT_TITLE} from '../utils.js';

const step = {
  guideBlockName: 'ttyg-select-agent-info-message',
  getSteps: (options, _services) => {
    return [
      {
        guideBlockName: 'info-message',
        options: {
          content: 'guide.step_plugin.select-ttyg-agent.info.content',
          // If mainAction is set the title will be set automatically
          ...(options.mainAction ? {} : {title: TTYG_SELECT_AGENT_DEFAULT_TITLE}),
          class: 'select-ttyg-agent',
          skipPoint: true,
          skipButtonLabel: SKIP_SECTION,
          disablePreviousFlow: true,
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
