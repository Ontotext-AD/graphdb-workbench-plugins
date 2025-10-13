const TTYG_SPARQL_SEARCH_METHOD_DEFAULT_TITLE = 'guide.step-action.sparql-search-method';
const TYPE_ONTLOGY_GRAPH = 'guide.step_plugin.sparql-search-method.type-ontology-graph-name';

/**
 * @name sparql-search-method-type-graph-name
 * @memberof module:Interactive Guide
 *
 * @description
 * This step guides the user to type the name of the named graph that contains the ontology for the SPARQL search method in the TTYG interface.
 * It highlights the input element and provides instructions on how to proceed.
 *
 * Type the name of the named graph that contains the ontology<br>
 * <img src="resources/guides/ttyg/sparql-search-method-type-graph-name.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options). Additionally, the following specific option is available:
 *
 * @property {string} [options.ontologyGraph] - The name of the named graph that contains the ontology. Default is 'http://example.org/ontology'.
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "sparql-search-method-type-graph-name",
 *  "options": {
 *    "ontologyGraph": "http://example.org/ontology"
 *  }
 * }
 * ```
 */
const step = {
  guideBlockName: 'sparql-search-method-type-graph-name',
  getSteps: function(options, services) {
    const GuideUtils = services.GuideUtils;
    const translate = services.translate;

    return [
      {
        guideBlockName: 'input-element',
        options: {
          content: translate(this.translationBundle, TYPE_ONTLOGY_GRAPH, {ontologyGraph: options.ontologyGraph}),
          ...(options.title ?? {title: translate(this.translationBundle, TTYG_SPARQL_SEARCH_METHOD_DEFAULT_TITLE)}),
          class: 'input-ontology-graph-name',
          ...options,
          url: 'ttyg',
          elementSelector: GuideUtils.getGuideElementSelector('sparql-ontology-graph-input'),
          onNextValidate: () => Promise.resolve(GuideUtils.validateTextInput(GuideUtils.getGuideElementSelector('sparql-ontology-graph-input'), options.ontologyGraph, false))
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [TTYG_SPARQL_SEARCH_METHOD_DEFAULT_TITLE]: 'SPARQL search query method',
      [TYPE_ONTLOGY_GRAPH]: 'Type <b>{{ontologyGraph}}</b> as the named graph which contains the ontology.'
    },
    fr: {
      [TTYG_SPARQL_SEARCH_METHOD_DEFAULT_TITLE]: 'Méthode de recherche SPARQL',
      [TYPE_ONTLOGY_GRAPH]: 'Type <b>{{ontologyGraph}}</b> en tant que graphe nommé contenant l\'ontologie.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
