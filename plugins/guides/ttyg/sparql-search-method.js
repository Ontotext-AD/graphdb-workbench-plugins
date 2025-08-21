import * as Utils from '../utils.js';

const step = {
  guideBlockName: 'sparql-search-method',
  getSteps: (options, _services) => {
    options.mainAction = 'sparql-search-method';

    const shouldToggleOff = options.disable;

    let configurationOption;
    if (options.ontologyGraph) {
      configurationOption = Utils.CONFIGURATION_OPTION_ONTOLOGY_GRAPH;
    } else if (options.sparqlQuery) {
      configurationOption = Utils.CONFIGURATION_OPTION_SPARQL_QUERY;
    }

    if (shouldToggleOff) {
      return [{
        guideBlockName: 'ttyg-sparql-method-disable', options: {...options}
      }];
    }

    const steps = [
      {
        guideBlockName: 'ttyg-enabling-sparql-info-message', options: {...options}
      },
      {
        guideBlockName: 'ttyg-sparql-method-enable', options: {...options}
      }
    ];

    if (configurationOption === Utils.CONFIGURATION_OPTION_ONTOLOGY_GRAPH) {
      steps.push({
        guideBlockName: 'sparql-search-method-enable-ontology-graph',
        options: {...options}
      });
    } else if (configurationOption === Utils.CONFIGURATION_OPTION_SPARQL_QUERY) {
      steps.push({
        guideBlockName: 'sparql-search-method-enable-sparql-query',
        options: {...options}
      });
    }

    return steps;
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
