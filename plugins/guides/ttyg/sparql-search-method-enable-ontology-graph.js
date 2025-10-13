/**
 * @name sparql-search-method-enable-ontology-graph
 * @memberof module:Interactive Guide
 *
 * @description
 * This is a complex step that guides the user through enabling the option to provide an ontology in a named graph for the SPARQL search method in the TTYG interface.
 * It includes steps to enable the option and type the name of the named graph that contains the ontology.
 *
 * Ontology select<br>
 * <img src="resources/guides/ttyg/ttyg-sparql-method-ontology-select.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * Type graph name<br>
 * <img src="resources/guides/ttyg/sparql-search-method-type-graph-name.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * Add missing namespaces<br>
 * <img src="resources/guides/ttyg/ttyg-sparql-click-add-namespaces.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options). Additionally, it supports:
 * @property {boolean} [options.addMissingNamespaces] - If true, an additional step will be included to click on the "Add missing namespaces" after typing the graph name.
 *
 * @example
 * ```JSON
 * {
 *   "guideBlockName": "sparql-search-method-enable-ontology-graph",
 *   "options": {
 *     "addMissingNamespaces": true
 *   }
 * }
 * ```
 */
const step = {
  guideBlockName: 'sparql-search-method-enable-ontology-graph',
  getSteps: (options, _services) => {
    const steps = [
      {
        guideBlockName: 'ttyg-sparql-method-ontology-select', options: {...options}
      },
      {
        guideBlockName: 'sparql-search-method-type-graph-name', options: {...options}
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
