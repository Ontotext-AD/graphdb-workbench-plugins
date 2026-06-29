import * as Utils from '../utils.js';

const SPARQL_EDITOR_TITLE = 'view.sparql-editor.title';
const COPY_TO_EDITOR = 'guide.step_plugin.execute-sparql-query.copy-to-editor.button';
const QUERY_EDITOR_CONTENT = 'guide.step_plugin.execute-sparql-query.query-editor.content';
const UNEXPECTED_ERROR = 'guide.unexpected.error.message';

/**
 * @name sparql-editor
 * @memberof module:Interactive Guide
 *
 * @description
 * This step prompts the user to copy a SPARQL query to the SPARQL editor.
 *
 * Copy to editor<br>
 * <img src="resources/guides/sparql-editor/sparql-editor.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options). Additionally, it requires:
 * @property {string} query - The SPARQL query to be copied to the editor.
 * @property {string | Object} queryExtraContent - Additional content to display in the editor.
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "sparql-editor",
 *  "options": {
 *    "query": "SELECT ?s WHERE { ?s ?p ?o } LIMIT 10",
 *    "queryExtraContent": {
 *       "en": "The query selects RDF statements whose <i>subject</i> is the movie <b>Pirates of the Caribbean At World's End</b> (identified by the IRI <b>imdb:title/PiratesoftheCaribbeanAtWorldsEnd</b>). Note that we need to escape the / in the shortened IRI."
 *     }
 *   }
 * }
 * ```
 */
const step = {
  guideBlockName: 'sparql-editor',
  getSteps: function(options, services) {
    const translate = services.translate;

    const code = document.createElement('code');
    const copy = document.createElement('button');
    const copyToEditorButtonClass = 'guide-copy-to-editor-query-button';
    copy.className = `btn btn-sm btn-secondary ${copyToEditorButtonClass}`;
    copy.innerText = translate(this.translationBundle, COPY_TO_EDITOR);
    const query = options.query;
    const copyToEditorListener = Utils.createCopyToEditorListener(() => services.YasguiComponentUtil, Utils.SPARQL_DIRECTIVE_SELECTOR, query);
    code.innerText = query;
    const queryAsHtmlCodeElement = '<div class="shepherd-code">' + code.outerHTML + copy.outerHTML + '</div>';

    let stepHTMLElement;

    return [
      {
        guideBlockName: 'input-element',
        options: {
          title: translate(this.translationBundle, SPARQL_EDITOR_TITLE),
          content: translate(this.translationBundle, QUERY_EDITOR_CONTENT, {queryAsHtmlCodeElement}),
          url: 'sparql',
          elementSelector: services.GuideUtils.CSS_SELECTORS.SPARQL_EDITOR_SELECTOR,
          class: 'yasgui-query-editor',
          beforeShowPromise: () => services.YasguiComponentUtil.getOntotextYasguiElementAsync(Utils.SPARQL_DIRECTIVE_SELECTOR)
            .then(() => services.GuideUtils.waitFor(services.GuideUtils.CSS_SELECTORS.SPARQL_EDITOR_SELECTOR, 3))
            .then(() => services.GuideUtils.deferredShow(500)())
            .catch((error) => {
              services.toastr.error(translate(this.translationBundle, UNEXPECTED_ERROR));
              throw error;
            }),
          onNextValidate: () => services.YasguiComponentUtil.getOntotextYasguiElementAsync(Utils.SPARQL_DIRECTIVE_SELECTOR)
            .then((yasgui) => yasgui.getQuery().then((query) => ({yasgui, queryFromEditor: query})))
            .then(({yasgui, _queryFromEditor}) => {
              yasgui.setQuery(query);
              return true;
            }),
          scrollToHandler: services.GuideUtils.scrollToTop,
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
  },
  translationBundle: {
    en: {
      [SPARQL_EDITOR_TITLE]: 'SPARQL Query & Update',
      [COPY_TO_EDITOR]: 'Copy to editor',
      [QUERY_EDITOR_CONTENT]: 'Enter the following SPARQL query: {{queryAsHtmlCodeElement}}',
      [UNEXPECTED_ERROR]: 'The guide was cancelled due to an unexpected error. Please run the guide again and if the problem persists contact the support.'
    },
    fr: {
      [SPARQL_EDITOR_TITLE]: 'Requête et mise à jour SPARQL',
      [COPY_TO_EDITOR]: 'Copier dans l\'éditeur',
      [QUERY_EDITOR_CONTENT]: 'Entrez la requête SPARQL suivante: {{queryAsHtmlCodeElement}}',
      [UNEXPECTED_ERROR]: 'Le guide a été annulé en raison d\'une erreur inattendue. Veuillez exécuter à nouveau le guide et si le problème persiste, contactez le support.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
