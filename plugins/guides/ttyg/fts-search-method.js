const step = {
  guideBlockName: 'fts-search-method',
  getSteps: (options) => {
    options.mainAction = 'fts-search-method';
    const shouldToggleOff = options.disable;

    if (shouldToggleOff) {
      return [{
        guideBlockName: 'ttyg-fts-method-disable', options: {...options}
      }];
    }

    const steps = [
      {
        guideBlockName: 'ttyg-fts-method-info', options: {...options}
      },
      {
        guideBlockName: 'ttyg-fts-method-enable', options: {...options}
      }
    ];

    if (options.maxTriplesPerCall) {
      steps.push({
        guideBlockName: 'set-max-triples-per-call',
        options: {...options}
      });
    }

    return steps;
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
