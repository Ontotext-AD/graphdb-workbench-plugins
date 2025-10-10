import {SIMILARITY_SEARCH_METHOD_DEFAULT_TITLE} from '../utils.js';

const step = {
  guideBlockName: 'ttyg-similarity-toggle-on',
  getSteps: (options, services) => {
    const GuideUtils = services.GuideUtils;
    const toggleSelector = GuideUtils.getGuideElementSelector('query-method-similarity_search-input');

    return [
      {
        guideBlockName: 'toggle-element',
        options: {
          content: 'guide.step_plugin.similarity-search-method.enable-toggle',
          class: 'toggle-similarity-search',
          // If mainAction is set the title will be set automatically
          ...(options.mainAction ? {} : {title: SIMILARITY_SEARCH_METHOD_DEFAULT_TITLE}),
          ...options,
          url: 'ttyg',
          elementSelector: GuideUtils.getGuideElementSelector('query-method-similarity_search'),
          toggleableElementSelector: toggleSelector,
          onNextValidate: () => Promise.resolve(GuideUtils.isChecked(toggleSelector))
        }
      }
    ];
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
