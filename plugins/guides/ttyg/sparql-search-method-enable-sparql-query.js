const step = {
  guideBlockName: 'sparql-search-method-enable-sparql-query',
  getSteps: (options, _services) => {
    return [
      {
        guideBlockName: 'ttyg-sparql-method-sparql-query-select', options: {...options}
      },
      {
        guideBlockName: 'ttyg-sparql-copy-query-text', options: {...options}
      },
      {
        guideBlockName: 'ttyg-sparql-click-add-namespaces', options: {...options}
      }
    ];
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
