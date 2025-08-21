import * as Utils from '../utils.js';

const step = {
  guideBlockName: 'similarity-click-to-create',
  getSteps: (options, services) => {
    const GuideUtils = services.GuideUtils;
    return [
      {
        guideBlockName: 'clickable-element',
        options: {
          content: 'guide.step_plugin.create-similarity-index.create-index',
          // If mainAction is set the title will be set automatically
          ...(options.mainAction ? {} : {title: Utils.CREATE_SIMILARITY_INDEX_DEFAULT}),
          class: 'create-similarity-index',
          disablePreviousFlow: false,
          disableNextFlow: true,
          ...options,
          url: 'similarity/index/create',
          elementSelector: GuideUtils.getGuideElementSelector('create-similarity-index-btn'),
          onNextClick: () => {
          }
        }
      }
    ];
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
