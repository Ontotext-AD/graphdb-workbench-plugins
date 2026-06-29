const SPARQL_EDITOR_TITLE = 'view.sparql-editor.title';
const EXPAND_RESULTS_CONTENT = 'guide.step_plugin.sparql-editor-expand-results-over-owl.content';

/**
 * @name sparql-editor-expand-results-over-owl
 * @memberof module:Interactive Guide
 *
 * @description
 * This step focuses on the "Expand results over owl:sameAs" toggle in the SPARQL editor.<br>
 *
 * Expand results over owl:sameAs toggle<br>
 * <img src="resources/guides/sparql-editor/sparql-editor-expand-results-over-owl.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```JSON
 * {
 *   "guideBlockName": "sparql-editor-expand-results-over-owl"
 * }
 * ```
 */
const step = {
  guideBlockName: 'sparql-editor-expand-results-over-owl',
  getSteps: function(options, services) {
    const translate = services.translate;
    return [
      {
        guideBlockName: 'read-only-element',
        options: {
          title: translate(this.translationBundle, SPARQL_EDITOR_TITLE),
          content: translate(this.translationBundle, EXPAND_RESULTS_CONTENT),
          url: 'sparql',
          elementSelector: '.yasqe_expandResultsButton',
          ...options
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [SPARQL_EDITOR_TITLE]: 'SPARQL Query & Update',
      [EXPAND_RESULTS_CONTENT]: '<b>Expand results over owl sameAs</b> includes equivalent resources connected with owl:sameAs in the query results. Clicking the toggle disables this behavior.'
    },
    fr: {
      [SPARQL_EDITOR_TITLE]: 'Requête et mise à jour SPARQL',
      [EXPAND_RESULTS_CONTENT]: '<b>Étendre les résultats via owl sameAs</b> inclut les ressources équivalentes connectées avec owl:sameAs dans les résultats de la requête. Cliquer sur le bouton désactive ce comportement.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}

