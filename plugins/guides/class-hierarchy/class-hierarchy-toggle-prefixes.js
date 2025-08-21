import * as Utils from '../utils.js';

const step = {
  guideBlockName: 'class-hierarchy-toggle-prefixes',
  getSteps: (options, services) => {
    const GuideUtils = services.GuideUtils;
    return [
      {
        guideBlockName: 'clickable-element',
        options: {
          // If mainAction is set the title will be set automatically
          ...(options.mainAction ? {} : {title: Utils.CLASS_HIERARCHY_DEFAULT_TITLE}),
          content: 'guide.step_plugin.class-hierarchy-toggle-prefixes.content',
          url: 'hierarchy',
          elementSelector: '.prefix-toggle-btn',
          class: 'class-hierarchy-toggle-prefixes',
          scrollToHandler: GuideUtils.scrollToTop,
          onNextClick: (_guide) => {
            GuideUtils.clickOnElement('.prefix-toggle-btn')();
          },
          ...options
        }
      }
    ];
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
