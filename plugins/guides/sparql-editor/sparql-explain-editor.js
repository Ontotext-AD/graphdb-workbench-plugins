import * as Utils from '../utils.js';

const step = {
  guideBlockName: 'sparql-explain-editor',
  getSteps: (options, services) => {
    const GuideUtils = services.GuideUtils;
    const YasguiComponentDirectiveUtil = services.YasguiComponentDirectiveUtil;
    return [
      {
        guideBlockName: 'input-element',
        options: {
          // If mainAction is set the title will be set automatically
          ...(options.mainAction ? {} : {title: Utils.SPARQL_EDITOR_DEFAULT_TITLE}),
          url: 'sparql',
          elementSelector: GuideUtils.CSS_SELECTORS.SPARQL_EDITOR_SELECTOR,
          class: 'sparql-explain-editor',
          beforeShowPromise: () => YasguiComponentDirectiveUtil.getOntotextYasguiElementAsync(Utils.SPARQL_DIRECTIVE_SELECTOR)
            .then(() => GuideUtils.waitFor(GuideUtils.CSS_SELECTORS.SPARQL_EDITOR_SELECTOR, 3))
            .then(() => GuideUtils.deferredShow(500)())
            .catch((error) => {
              services.toastr.error(services.$translate.instant('guide.unexpected.error.message'));
              throw error;
            }),
          scrollToHandler: GuideUtils.scrollToTop,
          extraContent: options.extraContent,
          ...options
        }
      }
    ];
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
