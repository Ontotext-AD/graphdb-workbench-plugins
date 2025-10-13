/**
 * @name sparql-search-method-enable-sparql-query
 * @memberof module:Interactive Guide
 *
 * @description
 * This is a complex step that guides the user through enabling the option to provide a SPARQL CONSTRUCT query that fetches the ontology for the SPARQL search method in the TTYG interface.
 * It includes steps to enable the option, select the SPARQL query option, copy the example query text, and optionally add missing namespaces.
 *
 * SPARQL query select<br>
 * <img src="resources/guides/ttyg/ttyg-sparql-method-sparql-query-select.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * Copy query text<br>
 * <img src="resources/guides/ttyg/ttyg-sparql-copy-query-text.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * Add missing namespaces<br>
 * <img src="resources/guides/ttyg/ttyg-sparql-click-add-namespaces.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options). Additionally, it supports:
 * @property {boolean} [options.addMissingNamespaces] - If true, an additional step will be included to click on the "Add missing namespaces" after copying the query text.
 *
 * @example
 * ```JSON
 * {
 *   "guideBlockName": "sparql-search-method-enable-sparql-query",
 *   "options": {
 *     "addMissingNamespaces": true
 *   }
 * }
 * ```
 */
const step = {
  guideBlockName: 'sparql-search-method-enable-sparql-query',
  getSteps: (options, _services) => {
    const steps = [
      {
        guideBlockName: 'ttyg-sparql-method-sparql-query-select', options: {...options}
      },
      {
        guideBlockName: 'ttyg-sparql-copy-query-text', options: {...options}
      }
    ];

    if (options.addMissingNamespaces) {
      steps.push({
        guideBlockName: 'ttyg-sparql-click-add-namespaces', options: {...options}
      });
    }

    return steps;
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
