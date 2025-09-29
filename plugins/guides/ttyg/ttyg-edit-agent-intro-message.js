import * as Utils from '../utils.js';
import {SKIP_SECTION} from '../utils.js';

const step = {
  guideBlockName: 'ttyg-edit-agent-intro-message',
  getSteps: (options, _services) => {
    return [
      {
        guideBlockName: 'info-message',
        options: {
          content: 'guide.step_plugin.edit-ttyg-agent.intro',
          // If mainAction is set the title will be set automatically
          ...(options.mainAction ? {} : {title: Utils.TTYG_EDIT_AGENT_DEFAULT_TITLE}),
          skipPoint: true,
          skipButtonLabel: SKIP_SECTION,
          ...options
        }
      }
    ];
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
