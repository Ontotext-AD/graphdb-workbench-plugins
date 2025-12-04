import * as Utils from '../utils.js';

const RESOURCE_RESULTS_CLICK_IRI_TITLE = 'view.resource.title';
const RESOURCE_RESULTS_CLICK_IRI_CONTENT = 'guide.step_plugin.resource-results-click-on-iri.content';

/**
 * @name resource-results-click-on-iri
 * @memberof module:Interactive Guide
 *
 * @description
 * The `resource-results-click-on-iri` guide step guides the user to click on an IRI in the resource results table
 * to explore the data using the Visual Graph view.
 *
 * <img src="resources/guides/resource/resource-results-click-on-iri.png" style="height:200px;
 * border: solid; border-width:1px"/>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 * Additionally, the following specific options are available:
 *
 * Options:
 * @property {string} options.iri - The IRI used to build the element selector for the clickable element.
 *
 * @example
 * ```json
 * {
 *   "guideBlockName": "resource-results-click-on-iri",
 *   "options": {
 *     "iri": "http://example.org/resource",
 *     "skipUrl": false
 *   }
 * }
 * ```
 */
const step = {
  guideBlockName: 'resource-results-click-on-iri',
  getSteps: function(options, services) {
    const GuideUtils = services.GuideUtils;
    const translate = services.translate;
    return [
      {
        guideBlockName: 'clickable-element',
        options: {
          title: translate(this.translationBundle, RESOURCE_RESULTS_CLICK_IRI_TITLE),
          content: translate(this.translationBundle, RESOURCE_RESULTS_CLICK_IRI_CONTENT),
          ...options,
          elementSelector: GuideUtils.getSparqlResultsSelectorForIri(options.iri),
          ...(options.skipUrl ? {} : {url: Utils.getResourceURL(options)}),
          class: 'resource-results-click-on-iri',
          onNextClick: (guide, step) => {
            GuideUtils.waitFor(step.elementSelector, 3)
              .then(() => document.querySelector(step.elementSelector).click());
          }
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [RESOURCE_RESULTS_CLICK_IRI_TITLE]: 'Resource',
      [RESOURCE_RESULTS_CLICK_IRI_CONTENT]: 'You can always explore the same data using the <b>Visual graph</b> view. Click on the Visual graph button to try it now.'
    },
    fr: {
      [RESOURCE_RESULTS_CLICK_IRI_TITLE]: 'Ressource',
      [RESOURCE_RESULTS_CLICK_IRI_CONTENT]: 'Vous pouvez toujours explorer les mêmes données en utilisant la vue <b>Graphique visuel</b>. Cliquez sur le bouton Graphique visuel pour l’essayer dès maintenant.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
