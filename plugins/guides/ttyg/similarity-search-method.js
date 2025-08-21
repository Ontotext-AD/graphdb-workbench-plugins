const step = {
  guideBlockName: 'similarity-search-method',
  getSteps: (options, _services) => {
    options.mainAction = 'similarity-search-method';

    const shouldToggleOff = options.disable;

    if (shouldToggleOff) {
      return [{
        guideBlockName: 'ttyg-similarity-toggle-off', options: {...options}
      }];
    }

    return [
      {
        guideBlockName: 'ttyg-similarity-info-message', options: {...options}
      },
      {
        guideBlockName: 'ttyg-similarity-toggle-on', options: {...options}
      },
      {
        guideBlockName: 'ttyg-similarity-select-index', options: {...options}
      }
    ];
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
