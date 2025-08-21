import * as Utils from '../utils.js';

const step = {
  guideBlockName: 'sparql-editor-run-button',
  getSteps: (options, services) => {
    const GuideUtils = services.GuideUtils;
    const YasguiComponentDirectiveUtil = services.YasguiComponentDirectiveUtil;
    return [
      {
        guideBlockName: 'clickable-element',
        options: {
          // If mainAction is set the title will be set automatically
          ...(options.mainAction ? {} : {title: Utils.SPARQL_EDITOR_DEFAULT_TITLE}),
          content: 'guide.step_plugin.execute-sparql-query.run-sparql-query.content',
          url: 'sparql',
          elementSelector: GuideUtils.CSS_SELECTORS.SPARQL_RUN_BUTTON_SELECTOR,
          class: 'yasgui-run-button',
          onNextClick: (guide) => YasguiComponentDirectiveUtil.getOntotextYasguiElementAsync(Utils.SPARQL_DIRECTIVE_SELECTOR)
            .then((yasgui) => {
              yasgui.query();
              guide.next();
            }),
          scrollToHandler: GuideUtils.scrollToTop,
          ...options
        }
      }
    ];
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
