const step = {
  guideBlockName: 'ttyg-sparql-copy-query-text',
  getSteps: (options, services) => {
    const GuideUtils = services.GuideUtils;

    return [
      {
        guideBlockName: 'copy-text-element',
        options: {
          elementSelector: GuideUtils.getGuideElementSelector('sparql-query-input'),
          text: options.sparqlQuery,
          ...options,
          onNextValidate: () => Promise.resolve(GuideUtils.validateTextInput(GuideUtils.getGuideElementSelector('sparql-query-input'), options.sparqlQuery, false))
        }
      }
    ];
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
