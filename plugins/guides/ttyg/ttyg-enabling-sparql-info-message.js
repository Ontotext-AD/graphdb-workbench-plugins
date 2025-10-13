const TTYG_SPARQL_SEARCH_METHOD_DEFAULT_TITLE = 'guide.step-action.sparql-search-method';
const SEARCH_METHOD_CONTENT = 'guide.step_plugin.sparql-search-method.content';

/**
 * @name ttyg-enabling-sparql-info-message
 * @memberof module:Interactive Guide
 *
 * @description
 * This step provides an informational message about enabling the SPARQL search query method in the TTYG interface.
 * It explains the benefits of using SPARQL search for datasets with good ontologies and closed-ended questions.
 *
 * Enabling SPARQL in info message<br>
 * <img src="resources/guides/ttyg/ttyg-enabling-sparql-info-message.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```JSON
 * {
 *   "guideBlockName": "ttyg-enabling-sparql-info-message",
 * }
 * ```
 */
const step = {
  guideBlockName: 'ttyg-enabling-sparql-info-message',
  getSteps: function(options, services) {
    const translate = services.translate;
    return [
      {
        guideBlockName: 'info-message',
        options: {
          content: translate(this.translationBundle, SEARCH_METHOD_CONTENT),
          ...(options.title ?? {title: translate(this.translationBundle, TTYG_SPARQL_SEARCH_METHOD_DEFAULT_TITLE)}),
          class: 'info-sparql-search',
          ...options,
          url: 'ttyg'
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [TTYG_SPARQL_SEARCH_METHOD_DEFAULT_TITLE]: 'SPARQL search query method',
      [SEARCH_METHOD_CONTENT]: 'Enabling SPARQL search allows the agent to answers questions by performing a SPARQL query. This works well for datasets with good ontologies and performs well on closed-ended questions, including aggregations.'
    },
    fr: {
      [TTYG_SPARQL_SEARCH_METHOD_DEFAULT_TITLE]: 'Méthode de recherche SPARQL',
      [SEARCH_METHOD_CONTENT]: 'L\'activation de la recherche SPARQL permet à l\'agent de répondre aux questions en effectuant une requête SPARQL. Cette méthode fonctionne bien pour les ensembles de données dotés d\'une bonne ontologie et donne de bons résultats pour les questions fermées, y compris les agrégations.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
