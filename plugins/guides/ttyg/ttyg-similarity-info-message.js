const SIMILARITY_SEARCH_METHOD_DEFAULT_TITLE = 'guide.step-action.similarity-search-method';
const SIMILARITY_CONTENT = 'guide.step_plugin.similarity-search-method.content';

/**
 * @name ttyg-similarity-info-message
 * @memberof module:Interactive Guide
 *
 * @description
 * This step provides an informational message about the Similarity search query method in the TTYG interface.
 * It explains the benefits and use cases of enabling Similarity search.
 *
 * Similarity info message<br>
 * <img src="resources/guides/ttyg/ttyg-similarity-info-message.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "ttyg-similarity-info-message",
 * }
 * ```
 */
const step = {
  guideBlockName: 'ttyg-similarity-info-message',
  getSteps: function(options, pluginService) {
    const translate = pluginService.translate;

    return [
      {
        guideBlockName: 'info-message',
        options: {
          content: translate(this.translationBundle, SIMILARITY_CONTENT),
          class: 'info-similarity-search',
          title: translate(this.translationBundle, SIMILARITY_SEARCH_METHOD_DEFAULT_TITLE),
          ...options,
          url: 'ttyg'
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [SIMILARITY_SEARCH_METHOD_DEFAULT_TITLE]: 'FTS search query method',
      [SIMILARITY_CONTENT]: 'Enabling Similarity search allows the agent to answer questions by using Similarity search. Performs well on open-ended questions but not so well on providing aggregations.'
    },
    fr: {
      [SIMILARITY_SEARCH_METHOD_DEFAULT_TITLE]: 'Méthode de recherche FTS',
      [SIMILARITY_CONTENT]: 'L\'activation de la recherche par similarité permet à l\'agent de répondre aux questions en utilisant la recherche par similarité. Les résultats sont bons pour les questions ouvertes, mais moins bons pour les agrégations.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
