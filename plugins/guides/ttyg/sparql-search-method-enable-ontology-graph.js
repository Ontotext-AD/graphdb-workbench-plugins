const step = {
  guideBlockName: 'sparql-search-method-enable-ontology-graph',
  getSteps: (options, _services) => {
    const steps = [
      {
        guideBlockName: 'ttyg-sparql-method-ontology-select', options: {...options}
      },
      {
        guideBlockName: 'sparql-search-method-type-graph-name', options: {...options}
      }
    ];

    if (options.addMissingNamespaces) {
      steps.push({
        guideBlockName: 'ttyg-sparql-click-add-namespaces', options: {...options}
      });
    }

    return steps;
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
