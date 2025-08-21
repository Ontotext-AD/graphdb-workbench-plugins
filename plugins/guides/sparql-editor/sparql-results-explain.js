import * as Utils from '../utils.js';

const step = {
  guideBlockName: 'sparql-results-explain',
  getSteps: (options, services) => {
    const GuideUtils = services.GuideUtils;
    return [
      {
        guideBlockName: 'read-only-element',
        options: {
          // If mainAction is set the title will be set automatically
          ...(options.mainAction ? {} : {title: Utils.SPARQL_EDITOR_DEFAULT_TITLE}),
          content: 'guide.step_plugin.sparql-results-explain.content',
          url: 'sparql',
          placement: 'top',
          elementSelector: GuideUtils.CSS_SELECTORS.SPARQL_RESULTS_SELECTOR,
          class: 'yasgui-query-results',
          fileName: options.fileName,
          scrollToHandler: GuideUtils.scrollToTop,
          extraContent: options.resultExtraContent,
          canBePaused: false,
          ...options
        }
      }
    ];
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
