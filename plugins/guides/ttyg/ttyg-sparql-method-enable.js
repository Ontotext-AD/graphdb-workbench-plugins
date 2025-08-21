import * as Utils from '../utils.js';

const step = {
  guideBlockName: 'ttyg-sparql-method-enable',
  getSteps: (options, services) => {
    const GuideUtils = services.GuideUtils;
    const toggleSelector = GuideUtils.getGuideElementSelector('query-method-sparql_search-input');
    return [
      {
        guideBlockName: 'clickable-element',
        options: {
          content: 'guide.step_plugin.sparql-search-method.enable-toggle',
          // If mainAction is set the title will be set automatically
          ...(options.mainAction ? {} : {title: Utils.TTYG_SPARQL_SEARCH_METHOD_DEFAULT_TITLE}),
          class: 'toggle-sparql-search',
          ...options,
          url: 'ttyg',
          elementSelector: GuideUtils.getGuideElementSelector('query-method-sparql_search'),
          clickableElementSelector: toggleSelector,
          onNextValidate: () => Promise.resolve(GuideUtils.isChecked(toggleSelector))
        }
      }
    ];
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
