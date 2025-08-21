import {FTS_METHOD_DEFAULT_TITLE} from '../utils.js';

const step = {
  guideBlockName: 'ttyg-fts-method-info',
  getSteps: (options) => {
    return [
      {
        guideBlockName: 'info-message',
        options: {
          content: 'guide.step_plugin.fts-search-method.content',
          // If mainAction is set the title will be set automatically
          ...(options.mainAction ? {} : {title: FTS_METHOD_DEFAULT_TITLE}),
          class: 'info-fts-search',
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
