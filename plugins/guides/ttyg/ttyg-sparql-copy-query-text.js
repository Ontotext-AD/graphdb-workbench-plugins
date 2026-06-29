const TTYG_SPARQL_SEARCH_METHOD_DEFAULT_TITLE = 'guide.step-action.sparql-search-method';

/**
 * @name ttyg-sparql-copy-query-text
 * @memberof module:Interactive Guide
 *
 * @description
 * This step guides the user to copy a provided SPARQL query into the SPARQL query input field in the TTYG interface.
 * It highlights the input field and provides instructions on how to proceed.
 *
 * Copy the following SPARQL query into the input field:<br>
 * <img src="resources/guides/ttyg/ttyg-sparql-copy-query-text.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options). Additionally, the following specific option is available:
 *
 * @property {string} [options.sparqlQuery] - The SPARQL query to be copied into the input field.
 *
 * @example
 * ```JSON
 * {
 *   "guideBlockName": "ttyg-sparql-copy-query-text",
 *   "options": {
 *     "sparqlQuery": "CONSTRUCT { ?s ?p ?o } WHERE { ?s ?p ?o } LIMIT 100"
 *   }
 * }
 * ```
 */
const step = {
  guideBlockName: 'ttyg-sparql-copy-query-text',
  getSteps: function(options, services) {
    const GuideUtils = services.GuideUtils;
    const translate = services.translate;

    return [
      {
        guideBlockName: 'copy-text-element',
        options: {
          title: translate(this.translationBundle, TTYG_SPARQL_SEARCH_METHOD_DEFAULT_TITLE),
          elementSelector: GuideUtils.getGuideElementSelector('sparql-query-input'),
          text: options.sparqlQuery,
          ...options,
          onNextValidate: () => Promise.resolve(GuideUtils.validateTextInput(GuideUtils.getGuideElementSelector('sparql-query-input'), options.sparqlQuery, false))
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [TTYG_SPARQL_SEARCH_METHOD_DEFAULT_TITLE]: 'SPARQL search query method'
    },
    fr: {
      [TTYG_SPARQL_SEARCH_METHOD_DEFAULT_TITLE]: 'Méthode de recherche SPARQL'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
