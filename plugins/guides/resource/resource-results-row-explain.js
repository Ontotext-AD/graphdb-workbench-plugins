import * as Utils from '../utils.js';

const RESOURCE_RESULTS_ROW_EXPLAIN_TITLE = 'view.resource.title';
const RESOURCE_RESULTS_ROW_EXPLAIN_CONTENT = 'guide.step_plugin.resource-results-row-explain.content';

/**
 * @name resource-results-row-explain
 * @memberof module:Interactive Guide
 *
 * @description
 * The `resource-results-row-explain` guide step that explains a row in the resource results table,
 * highlighting that each row represents an RDF triple consisting of a subject, predicate, and object.
 *
 * <img src="resources/guides/resource/resource-results-row-explain.png"
 * style="height:200px; border: solid; border-width:1px"/>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 * Additionally, the following specific options are available:
 *
 * Options:
 * @property {string|number} options.row - The row identifier used to build the element selector for the row to explain.
 *
 * @example
 * ```json
 * {
 *   "guideBlockName": "resource-results-row-explain",
 *   "options": {
 *     "row": "1"
 *   }
 * }
 * ```
 */
const step = {
  guideBlockName: 'resource-results-row-explain',
  getSteps: function(options, services) {
    const GuideUtils = services.GuideUtils;
    const translate = services.translate;
    return [
      {
        guideBlockName: 'read-only-element',
        options: {
          title: translate(this.translationBundle, RESOURCE_RESULTS_ROW_EXPLAIN_TITLE),
          content: translate(this.translationBundle, RESOURCE_RESULTS_ROW_EXPLAIN_CONTENT),
          ...options,
          ...(options.skipUrl ? {} : {url: Utils.getResourceURL(options)}),
          class: 'visual_graph-row',
          elementSelector: GuideUtils.getSparqlResultsSelectorForRow(options.row)
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [RESOURCE_RESULTS_ROW_EXPLAIN_TITLE]: 'Resource',
      [RESOURCE_RESULTS_ROW_EXPLAIN_CONTENT]: 'Each row in this table represents an RDF triple, consisting of a subject, predicate, and object. These triples describe relationships between resources in the graph.'
    },
    fr: {
      [RESOURCE_RESULTS_ROW_EXPLAIN_TITLE]: 'Ressource',
      [RESOURCE_RESULTS_ROW_EXPLAIN_CONTENT]: 'Chaque ligne de ce tableau représente un triplet RDF, composé d’un sujet, d’un prédicat et d’un objet. Ces triplets décrivent les relations entre les ressources dans le graphe.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
