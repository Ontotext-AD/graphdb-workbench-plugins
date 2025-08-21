const step = {
  guideBlockName: 'similarity-hold-and-wait-until-shown',
  getSteps: (options, services) => {
    const GuideUtils = services.GuideUtils;
    return [
      {
        options: {
          content: 'guide.step_plugin.create-similarity-index.wait',
          class: 'wait-for-index',
          ...options,
          elementSelectorToWait: GuideUtils.getGuideElementSelector('similarity-indexes-table')
        }
      }
    ];
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
