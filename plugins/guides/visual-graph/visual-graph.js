const step = {
  guideBlockName: 'visual-graph',
  getSteps: (options, services) => {
    const GuideUtils = services.GuideUtils;
    const RoutingUtil = services.RoutingUtil;
    options.mainAction = 'visual-graph';
    return [
      {
        guideBlockName: 'click-main-menu',
        options: {
          menu: 'visual-graph',
          showIntro: true,
          ...options
        }
      }, {
        guideBlockName: 'visual-graph-search-rdf-resources-input',
        options: {...options}
      }, {
        guideBlockName: 'visual-graph-search-rdf-resources-input-autocomplete-item',
        options: {...options}
      }, {
        guideBlockName: 'visual-graph-intro',
        options: {
          onPreviousClick: () => {
            RoutingUtil.navigate('/graphs-visualizations');
            const searchInputSelector = GuideUtils.getGuideElementSelector('graphVisualisationSearchInputNotConfigured', ' input');
            return GuideUtils.waitFor(searchInputSelector, 3)
              .then(() => {
                GuideUtils.validateTextInput(searchInputSelector, options.easyGraphInputText);
              });
          },
          initPreviousStep: () => {
            const url = '/graphs-visualizations?uri=' + options.iri;
            if (url !== decodeURIComponent(RoutingUtil.getCurrentRoute())) {
              const URL = '/graphs-visualizations?uri=' + options.iri;
              RoutingUtil.navigate(URL);
              return GuideUtils.waitFor(`.node-wrapper[id^="${options.iri}"] circle`, 3);
            }
            return Promise.resolve();
          },
          canBePaused: false,
          forceReload: true,
          ...options
        }
      }
    ];
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
