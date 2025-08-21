import * as Utils from '../utils.js';

const step = {
  guideBlockName: 'sparql-search-method-type-graph-name',
  getSteps: (options, services) => {
    const GuideUtils = services.GuideUtils;

    return [
      {
        guideBlockName: 'input-element',
        options: {
          content: 'guide.step_plugin.sparql-search-method.type-ontology-graph-name',
          // If mainAction is set the title will be set automatically
          ...(options.mainAction ? {} : {title: Utils.TTYG_SPARQL_SEARCH_METHOD_DEFAULT_TITLE}),
          class: 'input-ontology-graph-name',
          ...options,
          url: 'ttyg',
          elementSelector: GuideUtils.getGuideElementSelector('sparql-ontology-graph-input'),
          onNextValidate: () => Promise.resolve(GuideUtils.validateTextInput(GuideUtils.getGuideElementSelector('sparql-ontology-graph-input'), options.ontologyGraph, false))
        }
      }
    ];
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
