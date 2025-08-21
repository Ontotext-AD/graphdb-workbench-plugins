const step = {
  guideBlockName: 'select-ttyg-agent',
  getSteps: (options) => {
    options.mainAction = 'select-ttyg-agent';

    return [
      {
        guideBlockName: 'ttyg-select-agent-info-message',
        options: {...options}
      },
      {
        guideBlockName: 'ttyg-select-agent-dropdown-open',
        options: {...options}
      },
      {
        guideBlockName: 'ttyg-select-agent-from-dropdown',
        options: {...options}
      },
      {
        guideBlockName: 'ttyg-select-agent-check-for-missing-repository-cancel',
        options: {...options}
      }
    ];
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
