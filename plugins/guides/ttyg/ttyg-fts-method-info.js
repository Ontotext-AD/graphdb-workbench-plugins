const FTS_METHOD_DEFAULT_TITLE = 'guide.step-action.fts-search-method';
const FTS_SEARCH_CONTENT = 'guide.step_plugin.fts-search-method.content';

/**
 * @name ttyg-fts-method-info
 * @memberof module:Interactive Guide
 *
 * @description
 * This step provides information about the FTS search query method in the TTYG interface.
 * It highlights an info message block and provides details about the FTS search functionality.
 *
 * FTS search query method<br>
 * <img src="resources/guides/ttyg/ttyg-fts-method-info.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "ttyg-fts-method-info",
 * }
 * ```
 */
const step = {
  guideBlockName: 'ttyg-fts-method-info',
  getSteps: function(options, pluginService) {
    const translate = pluginService.translate;

    return [
      {
        guideBlockName: 'info-message',
        options: {
          content: translate(this.translationBundle, FTS_SEARCH_CONTENT),
          // If mainAction is set the title will be set automatically
          ...(options.title ?? {title: translate(this.translationBundle, FTS_METHOD_DEFAULT_TITLE)}),
          class: 'info-fts-search',
          ...options,
          url: 'ttyg'
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [FTS_METHOD_DEFAULT_TITLE]: 'FTS search query method',
      [FTS_SEARCH_CONTENT]: 'Enabling FTS search allows the agent to answer questions by using full-text search in literals and IRIs. Performs well on open-ended questions but not so well on providing aggregations.'
    },
    fr: {
      [FTS_METHOD_DEFAULT_TITLE]: 'Méthode de recherche FTS',
      [FTS_SEARCH_CONTENT]: 'L\'activation de la recherche FTS permet à l\'agent de répondre aux questions en utilisant la recherche plein texte dans les littéraux et les IRI. Les résultats sont bons pour les questions ouvertes, mais moins bons pour la fourniture d\'agrégations..'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
