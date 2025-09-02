const step = {
  guideBlockName: 'sparql-search-method-enable-sparql-query',
  getSteps: (options, _services) => {
    const steps = [
      {
        guideBlockName: 'ttyg-sparql-method-sparql-query-select', options: {...options}
      },
      {
        guideBlockName: 'ttyg-sparql-copy-query-text', options: {...options}
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
