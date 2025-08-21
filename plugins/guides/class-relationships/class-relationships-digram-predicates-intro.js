import * as Utils from '../utils.js';

const step = {
  guideBlockName: 'class-relationships-digram-predicates-intro',
  getSteps: (options, services) => {
    const GuideUtils = services.GuideUtils;
    return [
      {
        guideBlockName: 'focus-element',
        options: {
          url: 'relationships',
          elementSelector: GuideUtils.getGuideElementSelector('relationships-diagram'),
          placement: 'left',
          class: 'class-relationships-digram-predicates-intro',
          content: 'guide.step_plugin.class-relationships-digram-predicates-intro.content',
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
