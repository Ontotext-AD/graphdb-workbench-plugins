import {SIMILARITY_SEARCH_METHOD_DEFAULT_TITLE} from '../utils.js';

const step = {
  guideBlockName: 'ttyg-similarity-select-index',
  getSteps: (options, services) => {
    const GuideUtils = services.GuideUtils;
    return [
      {
        guideBlockName: 'clickable-element',
        options: {
          content: 'guide.step_plugin.similarity-search-method.select-index',
          class: 'select-similarity-index',
          // If mainAction is set the title will be set automatically
          ...(options.mainAction ? {} : {title: SIMILARITY_SEARCH_METHOD_DEFAULT_TITLE}),
          ...options,
          elementSelector: GuideUtils.getGuideElementSelector('similarity-index-select')
        }
      }
    ];
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
