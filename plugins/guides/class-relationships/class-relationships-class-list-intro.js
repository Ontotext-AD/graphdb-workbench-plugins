import * as Utils from '../utils.js';

const step = {
  guideBlockName: 'class-relationships-class-list-intro',
  getSteps: (options, services) => {
    const GuideUtils = services.GuideUtils;
    return [
      {
        guideBlockName: 'read-only-element',
        options: {
          url: 'relationships',
          elementSelector: GuideUtils.getGuideElementSelector('class-list-wrapper'),
          placement: 'right',
          class: 'class-relationships-class-list-intro',
          content: 'guide.step_plugin.class-relationships-class-list-intro.content',
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
