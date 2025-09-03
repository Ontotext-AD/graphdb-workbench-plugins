import {CONNECTORS_DEFAULT_TITLE} from '../utils.js';

const step = {
  guideBlockName: 'connectors-view-sparql-dialog-intro',
  getSteps: (options, services) => {
    const GuideUtils = services.GuideUtils;
    return [{
      guideBlockName: 'scroll-only-element',
      options: {
        // If mainAction is set the title will be set automatically
        ...(options.mainAction ? {} : {title: CONNECTORS_DEFAULT_TITLE}),
        placement: 'left',
        class: 'connectors-view-sparql-dialog-intro',
        content: 'guide.step_plugin.connectors-view-sparql-dialog-intro.content',
        ...options,
        elementSelectorToWait: GuideUtils.getGuideElementSelector('view-query-body'),
        elementSelector: GuideUtils.getGuideElementSelector('view-query-body'),
        url: 'connectors'
      }
    }];
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
