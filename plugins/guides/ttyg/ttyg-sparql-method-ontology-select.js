import * as Utils from '../utils.js';

const step = {
  guideBlockName: 'ttyg-sparql-method-ontology-select',
  getSteps: (options, services) => {
    const GuideUtils = services.GuideUtils;

    return [
      {
        guideBlockName: 'clickable-element',
        options: {
          content: 'guide.step_plugin.sparql-search-method.enable-ontology-from-graph',
          class: 'enable-ontology-from-graph',
          // If mainAction is set the title will be set automatically
          ...(options.mainAction ? {} : {title: Utils.TTYG_SPARQL_SEARCH_METHOD_DEFAULT_TITLE}),
          ...options,
          url: 'ttyg',
          elementSelector: GuideUtils.getGuideElementSelector('sparql-ontology-graph-option'),
          clickableElementSelector: GuideUtils.getGuideElementSelector('sparql-ontology-graph-option-input'),
          onNextValidate: () => Promise.resolve(GuideUtils.isChecked(GuideUtils.getGuideElementSelector('sparql-ontology-graph-option-input')))
        }
      }
    ];
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
