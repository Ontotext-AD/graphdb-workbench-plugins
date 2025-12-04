import * as Utils from '../utils.js';

const RESOURCE_RESULTS_TITLE = 'view.resource.title';
const RESOURCE_RESULTS_EXPLAIN_CONTENT = 'guide.step_plugin.resource-results-explain.content';
/**
 * @name resource-results-explain
 * @memberof module:Interactive Guide
 *
 * @description
 * The `resource-results-explain` guide step that explains the resource results table,
 * providing an easy way to view triples in which a given IRI is the subject, predicate, or object.
 *
 * <img src="resources/guides/resource/resource-results-explain.png" style="height:200px;
 * border: solid; border-width:1px"/>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 * Additionally, the following specific option is available:
 *
 * Options:
 * @property {string} [options.iri] - The IRI of the resource, used to build the URL if not skipped.
 *
 * @example
 * ```json
 * {
 *   "guideBlockName": "resource-results-explain",
 *   "options": {
 *     "iri": "http://example.org/resource"
 *   }
 * }
 * ```
 */
const step = {
  guideBlockName: 'resource-results-explain',
  getSteps: function(options, services) {
    const translate = services.translate;
    return [
      {
        guideBlockName: 'sparql-results-explain',
        options: {
          title: translate(this.translationBundle, RESOURCE_RESULTS_TITLE),
          content: translate(this.translationBundle, RESOURCE_RESULTS_EXPLAIN_CONTENT),
          ...options,
          ...(options.skipUrl ? {} : {url: Utils.getResourceURL(options)}),
          class: 'resource-results-explain'
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [RESOURCE_RESULTS_TITLE]: 'Resource',
      [RESOURCE_RESULTS_EXPLAIN_CONTENT]: 'The table provides an easy way to view triples in which a given IRI is the subject, predicate, or object.'
    },
    fr: {
      [RESOURCE_RESULTS_TITLE]: 'Ressource',
      [RESOURCE_RESULTS_EXPLAIN_CONTENT]: 'Le tableau permet de visualiser facilement les triplets dans lesquels un IRI donné est le sujet, le prédicat ou l’objet.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
