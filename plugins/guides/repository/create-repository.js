const step = {
  guideBlockName: 'create-repository',
  getSteps: (options) => {
    options.mainAction = 'create-repository';

    const steps = [
      {
        guideBlockName: 'click-main-menu',
        options: {
          menu: 'repositories',
          showIntro: true,
          ...options
        }
      },
      {guideBlockName: 'repositories-create-repository', options: {...options}},
      {guideBlockName: 'repositories-create-graphdb', options: {...options}},
      {guideBlockName: 'repositories-id-input', options: {...options}}
    ];

    if (options.rulesetName) {
      steps.push({guideBlockName: 'repositories-ruleset-dropdown', options: {...options}});
    }
    if (options.fts) {
      steps.push({guideBlockName: 'repositories-enable-fts', options: {...options}});
    }

    steps.push({guideBlockName: 'repositories-save', options: {...options}});

    return steps;
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
