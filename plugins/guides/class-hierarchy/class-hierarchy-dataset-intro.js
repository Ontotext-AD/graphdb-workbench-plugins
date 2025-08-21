import * as Utils from '../utils.js';

const step = {
  guideBlockName: 'class-hierarchy-dataset-intro',
  getSteps: (options) => {
    return [
      {
        guideBlockName: 'read-only-element',
        options: {
          url: 'hierarchy',
          elementSelector: '#classChart #main-group',
          placement: 'left',
          class: 'class-hierarchy-dataset-intro',
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
