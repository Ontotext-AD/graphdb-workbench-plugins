const step = {
  guideBlockName: 'enable-autocomplete',
  getSteps: (options) => {
    options.mainAction = 'enable-autocomplete';

    return [
      {
        guideBlockName: 'click-main-menu',
        options: angular.extend({}, {
          menu: 'autocomplete',
          showIntro: true
        }, options)
      },
      {
        guideBlockName: 'autocomplete-enable-checkbox',
        options: {...options}
      },
      {
        guideBlockName: 'autocomplete-focus-on-indexing-status',
        options: {...options}
      }
    ];
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
