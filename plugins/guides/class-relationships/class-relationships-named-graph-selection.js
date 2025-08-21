import * as Utils from '../utils.js';

const step = {
  guideBlockName: 'class-relationships-named-graph-selection',
  getSteps: (options, services) => {
    const GuideUtils = services.GuideUtils;
    return [
      {
        guideBlockName: 'read-only-element',
        options: {
          url: 'relationships',
          elementSelector: GuideUtils.getGuideElementSelector('graph-select-dropdown'),
          placement: 'left',
          class: 'class-relationships-named-graph-selection',
          content: 'guide.step_plugin.class-relationships-named-graph-selection.content',
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
