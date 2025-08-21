import * as Utils from '../utils.js';

const step = {
  guideBlockName: 'similarity-click-link',
  getSteps: (options, services) => {
    const GuideUtils = services.GuideUtils;
    return [
      {
        guideBlockName: 'clickable-element',
        options: {
          content: 'guide.step_plugin.create-similarity-index.create-similarity-index',
          // If mainAction is set the title will be set automatically
          ...(options.mainAction ? {} : {title: Utils.CREATE_SIMILARITY_INDEX_DEFAULT}),
          class: 'similarity-index',
          disableNextFlow: true,
          ...options,
          url: 'similarity',
          elementSelector: GuideUtils.getGuideElementSelector('create-similarity-index'),
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
