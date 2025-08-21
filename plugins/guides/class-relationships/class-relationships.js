const step = {
  guideBlockName: 'class-relationships',
  getSteps: (options) => {
    options.mainAction = 'class-relationships';

    const steps = [
      {
        guideBlockName: 'click-main-menu',
        options: angular.extend({}, {
          menu: 'class-relationships',
          showIntro: true
        }, options)
      }, {
        guideBlockName: 'class-relationships-intro',
        options: {...options}
      }
    ];

    if (options.introExtraContent) {
      steps.push({
        guideBlockName: 'class-relationships-diagram-intro',
        options: {
          content: options.introExtraContent,
          ...options
        }
      });
    }

    return steps;
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
