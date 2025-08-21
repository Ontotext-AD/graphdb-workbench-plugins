import * as Utils from '../utils.js';

const step = {
  guideBlockName: 'class-hierarchy-intro',
  getSteps: (options) => {
    return [
      {
        guideBlockName: 'read-only-element',
        options: {
          content: 'guide.step_plugin.class-hierarchy-intro.content',
          url: 'hierarchy',
          elementSelector: '#classChart',
          placement: 'left',
          class: 'clas-hierarchy-intro',
          // If mainAction is set the title will be set automatically
          ...(options.mainAction ? {} : {title: Utils.CLASS_HIERARCHY_DEFAULT_TITLE}),
          ...options
        }
      }
    ];
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
