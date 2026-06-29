const SPARQL_EDITOR_TITLE = 'view.sparql-editor.title';
const EXPLAIN_CONTENT = 'guide.step_plugin.sparql-results-explain.content';

/**
 * @name sparql-results-explain
 * @memberof module:Interactive Guide
 *
 * @description
 * This step focuses on the table that shows the results of a SPARQL query.
 *
 * Visualize results table<br>
 * <img src="resources/guides/sparql-editor/sparql-results-explain.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "sparql-results-explain"
 * }
 * ```
 */
const step = {
  guideBlockName: 'sparql-results-explain',
  getSteps: function(options, services) {
    const translate = services.translate;
    return [
      {
        guideBlockName: 'read-only-element',
        options: {
          title: translate(this.translationBundle, SPARQL_EDITOR_TITLE),
          content: translate(this.translationBundle, EXPLAIN_CONTENT),
          url: 'sparql',
          placement: 'top',
          elementSelector: services.GuideUtils.CSS_SELECTORS.SPARQL_RESULTS_SELECTOR,
          class: 'yasgui-query-results',
          fileName: options.fileName,
          scrollToHandler: services.GuideUtils.scrollToTop,
          extraContent: options.resultExtraContent,
          canBePaused: false,
          ...options
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [SPARQL_EDITOR_TITLE]: 'SPARQL Query & Update',
      [EXPLAIN_CONTENT]: 'The table shows the results from executing the query.'
    },
    fr: {
      [SPARQL_EDITOR_TITLE]: 'Requête et mise à jour SPARQL',
      [EXPLAIN_CONTENT]: 'Le tableau montre les résultats de l\'exécution de la requête.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
