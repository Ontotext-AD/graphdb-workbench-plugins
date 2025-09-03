import {CONNECTORS_DEFAULT_TITLE} from '../utils.js';

const step = {
  guideBlockName: 'connectors-intro',
  getSteps: (options) => {
    return [{
      guideBlockName: 'info-message',
      options: {
        // If mainAction is set the title will be set automatically
        ...(options.mainAction ? {} : {title: CONNECTORS_DEFAULT_TITLE}),
        placement: 'top',
        class: 'connectors-connectors-intro',
        content: 'guide.step_plugin.connectors-connectors-intro.content',
        ...options,
        url: 'connectors'
      }
    }];
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
