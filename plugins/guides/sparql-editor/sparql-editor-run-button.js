import * as Utils from '../utils.js';

const SPARQL_EDITOR_TITLE = 'view.sparql-editor.title';
const RUN_QUERY = 'guide.step_plugin.execute-sparql-query.run-sparql-query.content';

/**
 * @name sparql-editor-run-button
 * @memberof module:Interactive Guide
 *
 * @description
 * This prompts the user to click on the SPARQL run button to execute the query.
 *
 * Clicking on the button<br>
 * <img src="resources/guides/sparql-editor/sparql-editor-run-button.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "sparql-editor-run-button"
 * }
 * ```
 */
const step = {
  guideBlockName: 'sparql-editor-run-button',
  getSteps: function(options, services) {
    const translate = services.translate;
    const GuideUtils = services.GuideUtils;
    const YasguiComponentDirectiveUtil = services.YasguiComponentDirectiveUtil;
    return [
      {
        guideBlockName: 'clickable-element',
        options: {
          ...(options.title ?? {title: translate(this.translationBundle, SPARQL_EDITOR_TITLE)}),
          content: translate(this.translationBundle, RUN_QUERY),
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
  },
  translationBundle: {
    en: {
      [SPARQL_EDITOR_TITLE]: 'SPARQL Query & Update',
      [RUN_QUERY]: 'Click on the <b>Run</b> button.'
    },
    fr: {
      [SPARQL_EDITOR_TITLE]: 'Requête et mise à jour SPARQL',
      [RUN_QUERY]: 'Cliquez sur le bouton <b>Exécuter</b>.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
