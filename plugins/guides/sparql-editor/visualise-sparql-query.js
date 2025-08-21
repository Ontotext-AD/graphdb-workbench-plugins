const step = {
  guideBlockName: 'visualise-sparql-query',
  getSteps: (options) => {
    const steps = [];
    if (options.useMainMenuNavigation) {
      steps.push({
        guideBlockName: 'click-main-menu',
        options: {
          menu: 'sparql',
          mainAction: 'execute-sparql-query',
          showIntro: true,
          ...options
        }
      });
    }

    steps.push({
      guideBlockName: 'sparql-editor',
      options: {
        query: options.query,
        queryExtraContent: options.queryExtraContent,
        ...options
      }
    }, {
      guideBlockName: 'sparql-editor-run-button',
      options: {...options}
    }, {
      guideBlockName: 'sparql-results-visual-button',
      options: {...options}
    });

    return steps;
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
