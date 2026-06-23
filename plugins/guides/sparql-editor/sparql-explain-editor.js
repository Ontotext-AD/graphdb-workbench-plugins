import * as Utils from '../utils.js';

const SPARQL_EDITOR_TITLE = 'view.sparql-editor.title';
const UNEXPECTED_ERROR = 'guide.unexpected.error.message';

/**
 * @name sparql-explain-editor
 * @memberof module:Interactive Guide
 *
 * @description
 * This step provides an additional explanation for the SPARQL query editor.
 *
 * Additional explanation<br>
 * <img src="resources/guides/sparql-editor/sparql-explain-editor.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options). Additionally, it requires:
 * @property {string} extraContent - The additional content to display in the editor.
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "sparql-explain-editor",
 *  "options": {
 *    "extraContent": "This is an additional explanation for the SPARQL editor."
 *   }
 * }
 * ```
 */
const step = {
  guideBlockName: 'sparql-explain-editor',
  getSteps: function(options, services) {
    const translate = services.translate;
    const GuideUtils = services.GuideUtils;
    return [
      {
        guideBlockName: 'input-element',
        options: {
          ...(options.title ?? {title: translate(this.translationBundle, SPARQL_EDITOR_TITLE)}),
          url: 'sparql',
          elementSelector: GuideUtils.CSS_SELECTORS.SPARQL_EDITOR_SELECTOR,
          class: 'sparql-explain-editor',
          beforeShowPromise: () => services.YasguiComponentUtil.getOntotextYasguiElementAsync(Utils.SPARQL_DIRECTIVE_SELECTOR)
            .then(() => GuideUtils.waitFor(GuideUtils.CSS_SELECTORS.SPARQL_EDITOR_SELECTOR, 3))
            .then(() => GuideUtils.deferredShow(500)())
            .catch((error) => {
              services.toastr.error(translate(this.translationBundle, UNEXPECTED_ERROR));
              throw error;
            }),
          scrollToHandler: GuideUtils.scrollToTop,
          extraContent: options.extraContent,
          ...options
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [SPARQL_EDITOR_TITLE]: 'SPARQL Query & Update',
      [UNEXPECTED_ERROR]: 'The guide was cancelled due to an unexpected error. Please run the guide again and if the problem persists contact the support.'
    },
    fr: {
      [SPARQL_EDITOR_TITLE]: 'Requête et mise à jour SPARQL',
      [UNEXPECTED_ERROR]: 'Le guide a été annulé en raison d\'une erreur inattendue. Veuillez exécuter à nouveau le guide et si le problème persiste, contactez le support.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
