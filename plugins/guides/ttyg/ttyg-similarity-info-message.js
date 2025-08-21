import {SIMILARITY_SEARCH_METHOD_DEFAULT_TITLE} from '../utils.js';

const step = {
  guideBlockName: 'ttyg-similarity-info-message',
  getSteps: (options, _services) => {
    return [
      {
        guideBlockName: 'info-message',
        options: {
          content: 'guide.step_plugin.similarity-search-method.content',
          class: 'info-similarity-search',
          // If mainAction is set the title will be set automatically
          ...(options.mainAction ? {} : {title: SIMILARITY_SEARCH_METHOD_DEFAULT_TITLE}),
          ...options,
          url: 'ttyg'
        }
      }
    ];
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
