const step = {
  guideBlockName: 'ttyg-sparql-method-sparql-query-select',
  getSteps: (options, services) => {
    const GuideUtils = services.GuideUtils;

    return [
      {
        guideBlockName: 'clickable-element',
        options: angular.extend({}, {
          content: 'guide.step_plugin.sparql-search-method.enable-sparql-query',
          class: 'enable-sparql-query',
          url: 'ttyg',
          elementSelector: GuideUtils.getGuideElementSelector('sparql-query-option'),
          clickableElementSelector: GuideUtils.getGuideElementSelector('sparql-query-option-input'),
          onNextValidate: () => Promise.resolve(GuideUtils.isChecked(GuideUtils.getGuideElementSelector('sparql-query-option-input')))
        }, options)
      }
    ];
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
