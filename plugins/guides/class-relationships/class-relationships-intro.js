import * as Utils from '../utils.js';

const step = {
  guideBlockName: 'class-relationships-intro',
  getSteps: (options) => {
    return [
      {
        guideBlockName: 'info-message',
        options: {
          content: 'guide.step_plugin.class-relationships-intro.content',
          url: 'relationships',
          class: 'clas-hierarchy-intro',
          placement: 'left',
          // If mainAction is set the title will be set automatically
          title: options.mainAction ?? Utils.CLASS_RELATIONSHIPS_DEFAULT_TITLE,
          ...options
        }
      }
    ];
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
