import * as Utils from '../utils.js';

const step = {
  guideBlockName: 'ttyg-enabling-sparql-info-message',
  getSteps: (options, _services) => {
    return [
      {
        guideBlockName: 'info-message',
        options: {
          content: 'guide.step_plugin.sparql-search-method.content',
          // If mainAction is set the title will be set automatically
          ...(options.mainAction ? {} : {title: Utils.TTYG_SPARQL_SEARCH_METHOD_DEFAULT_TITLE}),
          class: 'info-sparql-search',
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
