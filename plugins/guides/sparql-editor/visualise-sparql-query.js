/**
 * @name visualise-sparql-query
 * @memberof module:Interactive Guide
 *
 * @description
 * Composite step that guides the user through visualizing the results of a SPARQL query.
 * Included steps are:
 *
 * Copy SPARQL query to the editor<br>
 * <img src="resources/guides/sparql-editor/sparql-editor.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * Run the query<br>
 * <img src="resources/guides/sparql-editor/sparql-editor-run-button.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * Press the "Visual" button to visualize the results<br>
 * <img src="resources/guides/sparql-editor/sparql-results-visual-button.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options). Additionally, it requires:
 * @property {string} query - The SPARQL query to be visualized.
 * @property {string | object} [queryExtraContent] - If this option is present, an additional dialog will be displayed as the last step with the passed content, localized by language.
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "visualise-sparql-query",
 *  "options": {
 *   "query": "SELECT ?s ?p ?o WHERE {?s ?p ?o} LIMIT 10",
 *   "queryExtraContent": {
 *     "en": "The query selects RDF statements whose <i>subject</i> is the movie <b>Pirates of the Caribbean At World's End</b> (identified by the IRI <b>imdb:title/PiratesoftheCaribbeanAtWorldsEnd</b>). Note that we need to escape the / in the shortened IRI."
 *   }
 *  }
 * }
 * ```
 */
const step = {
  guideBlockName: 'visualise-sparql-query',
  getSteps: (options) => {
    const steps = [];
    if (options.useMainMenuNavigation) {
      steps.push({
        guideBlockName: 'click-main-menu',
        options: {
          menu: 'sparql',
          mainAction: 'execute-sparql-query',
          showIntro: true,
          ...options
        }
      });
    }

    steps.push({
      guideBlockName: 'sparql-editor',
      options: {
        query: options.query,
        queryExtraContent: options.queryExtraContent,
        ...options
      }
    }, {
      guideBlockName: 'sparql-editor-run-button',
      options: {...options}
    }, {
      guideBlockName: 'sparql-results-visual-button',
      options: {...options}
    });

    return steps;
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
