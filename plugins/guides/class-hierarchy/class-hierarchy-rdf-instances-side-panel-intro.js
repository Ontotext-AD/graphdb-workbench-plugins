import * as Utils from '../utils.js';

const step = {
  guideBlockName: 'class-hierarchy-rdf-instances-side-panel-intro',
  getSteps: (options) => {
    return [
      {
        guideBlockName: 'read-only-element',
        options: {
          content: 'guide.step_plugin.class-hierarchy-rdf-instances-side-panel-intro.content',
          url: 'hierarchy',
          elementSelector: '.rdf-info-side-panel div',
          class: 'class-hierarchy-rdf-instances-side-panel-intro',
          canBePaused: false,
          placement: 'left',
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
