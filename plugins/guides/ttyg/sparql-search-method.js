/**
 * @name sparql-search-method
 * @memberof module:Interactive Guide
 *
 * @description
 * This is a complex step that guides the user through enabling or disabling the SPARQL search query method in the TTYG interface.
 * It includes steps to provide information about the SPARQL search method, enable it if it's disabled, or disable it if it's enabled.
 * If enabling, it can also include an optional step to set the ontology source, either via a named graph or a SPARQL CONSTRUCT query.
 *
 * Disable SPARQL search method<br>
 * <img src="resources/guides/ttyg/ttyg-sparql-method-disable.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * Enable SPARQL info message<br>
 * <img src="resources/guides/ttyg/ttyg-enabling-sparql-info-message.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * Enable SPARQL search method<br>
 * <img src="resources/guides/ttyg/ttyg-sparql-method-enable.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * The `sparql-search-method-enable-ontology-graph` step is a configurable complex step. See [sparql-search-method-enable-ontology-graph](#.sparql-search-method-enable-ontology-graph) for more details.
 * The `sparql-search-method-enable-sparql-query` step is a configurable complex step, See [sparql-search-method-enable-sparql-query](#.sparql-search-method-enable-sparql-query) for more details.
 *
 * This step can be configured using the common options defined in [Options](#.Options). Additionally, it supports:
 *
 * @property {boolean} [options.disable] - If true, the step will guide the user to disable the SPARQL search method. If false or not provided, it will guide to enable it.
 * @property {string} [options.ontologyGraph] - If provided and enabling the SPARQL search method, an additional step will be included to set the ontology source via a named graph with this value.
 * @property {string} [options.sparqlQuery] - If provided and enabling the SPARQL search method, an additional step will be included to set the ontology source via a SPARQL CONSTRUCT query with this value.
 *
 * Note: Only one of `ontologyGraph` or `sparqlQuery` should be provided. If both are provided, `ontologyGraph` will take precedence.
 *
 * @example
 * ```JSON
 * {
 *   "guideBlockName": "sparql-search-method",
 *   "options": {
 *     "disable": false,
 *     "ontologyGraph": "http://example.org/graph/ontology"
 *   }
 * }
 * ```
 *
 * ```JSON
 * {
 *   "guideBlockName": "sparql-search-method",
 *   "options": {
 *     "disable": false,
 *     "sparqlQuery": "CONSTRUCT { ?s ?p ?o } WHERE { ?s ?p ?o } LIMIT 100"
 *   }
 * }
 * ```
 */
const step = {
  guideBlockName: 'sparql-search-method',
  getSteps: (options, _services) => {
    options.mainAction = 'sparql-search-method';

    const shouldToggleOff = options.disable;

    if (shouldToggleOff) {
      return [{
        guideBlockName: 'ttyg-sparql-method-disable', options: {...options}
      }];
    }

    const steps = [
      {
        guideBlockName: 'ttyg-enabling-sparql-info-message', options: {...options}
      },
      {
        guideBlockName: 'ttyg-sparql-method-enable', options: {...options}
      }
    ];

    if (options.ontologyGraph) {
      steps.push({
        guideBlockName: 'sparql-search-method-enable-ontology-graph',
        options: {...options}
      });
    } else if (options.sparqlQuery) {
      steps.push({
        guideBlockName: 'sparql-search-method-enable-sparql-query',
        options: {...options}
      });
    }

    return steps;
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
