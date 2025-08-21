import * as Utils from '../utils.js';

const step = {
  guideBlockName: 'sparql-editor',
  getSteps: (options, services) => {
    const $translate = services.$translate;
    const GuideUtils = services.GuideUtils;
    const YasguiComponentDirectiveUtil = services.YasguiComponentDirectiveUtil;

    const code = document.createElement('code');
    const copy = document.createElement('button');
    const copyToEditorButtonClass = 'guide-copy-to-editor-query-button';
    copy.className = `btn btn-sm btn-secondary ${copyToEditorButtonClass}`;
    copy.innerText = $translate.instant('guide.step_plugin.execute-sparql-query.copy-to-editor.button');
    const query = options.query;
    const copyToEditorListener = Utils.createCopyToEditorListener(YasguiComponentDirectiveUtil, Utils.SPARQL_DIRECTIVE_SELECTOR, query);
    code.innerText = query;

    let stepHTMLElement;

    return [
      {
        guideBlockName: 'input-element',
        options: {
          // If mainAction is set the title will be set automatically
          ...(options.mainAction ? {} : {title: Utils.SPARQL_EDITOR_DEFAULT_TITLE}),
          content: 'guide.step_plugin.execute-sparql-query.query-editor.content',
          url: 'sparql',
          elementSelector: GuideUtils.CSS_SELECTORS.SPARQL_EDITOR_SELECTOR,
          class: 'yasgui-query-editor',
          queryAsHtmlCodeElement: '<div class="shepherd-code">' + code.outerHTML + copy.outerHTML + '</div>',
          beforeShowPromise: () => YasguiComponentDirectiveUtil.getOntotextYasguiElementAsync(Utils.SPARQL_DIRECTIVE_SELECTOR)
            .then(() => GuideUtils.waitFor(GuideUtils.CSS_SELECTORS.SPARQL_EDITOR_SELECTOR, 3))
            .then(() => GuideUtils.deferredShow(500)())
            .catch((error) => {
              services.toastr.error(services.$translate.instant('guide.unexpected.error.message'));
              throw error;
            }),
          onNextValidate: () => YasguiComponentDirectiveUtil.getOntotextYasguiElementAsync(Utils.SPARQL_DIRECTIVE_SELECTOR)
            .then((yasgui) => yasgui.getQuery().then((query) => ({yasgui, queryFromEditor: query})))
            .then(({yasgui, _queryFromEditor}) => {
              yasgui.setQuery(query);
              return true;
            }),
          scrollToHandler: GuideUtils.scrollToTop,
          extraContent: options.queryExtraContent,
          show: (_guide) => () => {
            stepHTMLElement = _guide.currentStep.el.querySelector(`.${copyToEditorButtonClass}`);
            stepHTMLElement.addEventListener('click', copyToEditorListener);
          },
          hide: () => () => {
            if (stepHTMLElement) {
              stepHTMLElement.removeEventListener('click', copyToEditorListener);
            }
          },
          ...options
        }
      }
    ];
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
