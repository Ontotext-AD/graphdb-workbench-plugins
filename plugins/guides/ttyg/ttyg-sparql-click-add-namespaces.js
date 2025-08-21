import * as Utils from '../utils.js';

const step = {
  guideBlockName: 'ttyg-sparql-click-add-namespaces',
  getSteps: (options, services) => {
    const GuideUtils = services.GuideUtils;

    return [
      {
        guideBlockName: 'clickable-element',
        options: {
          content: 'guide.step_plugin.sparql-search-method.add-missing-namespaces',
          // If mainAction is set the title will be set automatically
          ...(options.mainAction ? {} : {title: Utils.TTYG_SPARQL_SEARCH_METHOD_DEFAULT_TITLE}),
          class: 'enable-sparql-query',
          ...options,
          url: 'ttyg',
          elementSelector: GuideUtils.getGuideElementSelector('add-missing-namespaces-option'),
          onNextValidate: () => Promise.resolve(GuideUtils.isChecked(GuideUtils.getGuideElementSelector('add-missing-namespaces-input')))
        }
      }
    ];
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
