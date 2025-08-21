const step = {
  guideBlockName: 'create-similarity-index',
  getSteps: (options, services) => {
    const GuideUtils = services.GuideUtils;
    options.mainAction = 'create-similarity-index';

    return [
      {
        guideBlockName: 'click-main-menu',
        options: angular.extend({}, {
          menu: 'similarity',
          showIntro: true
        }, options)
      },
      {
        guideBlockName: 'similarity-click-link', options: {...options}
      },
      {
        guideBlockName: 'similarity-type-index-name', options: {...options}
      },
      {
        guideBlockName: 'similarity-click-to-create', options: {...options}
      },
      {
        // check if error block is shown and go back 2 steps or proceed
        guideBlockName: 'info-message',
        options: angular.extend({}, {
          beforeShowPromise: (guide, currentStep) => GuideUtils.getOrWaitFor(GuideUtils.getGuideElementSelector('error'), 1)
            .then(() => {
              const stepId = currentStep.id;
              // Using a timeout
              // because the library executes logic
              // to show the step in a then clause
              // which causes current and next steps to show
              setTimeout(() => guide.show(stepId - 2));
            })
            .catch(() => {
              // Using a timeout
              // because the library executes logic
              // to show the step in a then clause
              // which causes current and next steps to show
              setTimeout(() => guide.next());
            })
        }, options)
      },
      {
        guideBlockName: 'similarity-hold-and-wait-until-shown', options: {...options}
      }
    ];
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
