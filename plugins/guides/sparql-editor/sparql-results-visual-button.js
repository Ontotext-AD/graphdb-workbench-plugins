import * as Utils from '../utils.js';

const step = {
  guideBlockName: 'sparql-results-visual-button',
  getSteps: (options, services) => {
    const GuideUtils = services.GuideUtils;
    return [
      {
        guideBlockName: 'clickable-element',
        options: {
          content: 'guide.step_plugin.execute-sparql-query.visual-sparql-results.content',
          // If mainAction is set the title will be set automatically
          ...(options.mainAction ? {} : {title: Utils.SPARQL_EDITOR_DEFAULT_TITLE}),
          url: 'sparql',
          elementSelector: GuideUtils.CSS_SELECTORS.SPARQL_VISUAL_BUTTON_SELECTOR,
          class: 'visual-sparql-results-button',
          scrollToHandler: GuideUtils.scrollToTop,
          onNextClick: () => GuideUtils.clickOnElement(GuideUtils.CSS_SELECTORS.SPARQL_VISUAL_BUTTON_SELECTOR)(),
          ...options
        }
      }
    ];
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
