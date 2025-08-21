const step = {
  guideBlockName: 'sparql-search-method-enable-ontology-graph',
  getSteps: (options, _services) => {
    return [
      {
        guideBlockName: 'ttyg-sparql-method-ontology-select', options: {...options}
      },
      {
        guideBlockName: 'sparql-search-method-type-graph-name', options: {...options}
      }
    ];
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
