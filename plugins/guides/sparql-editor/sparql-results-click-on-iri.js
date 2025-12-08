const SPARQL_EDITOR_TITLE = 'view.sparql-editor.title';
const CLICK_ON_IRI = 'guide.step_plugin.sparql-results-click-on-iri.content';

/**
 * @name sparql-results-click-on-iri
 * @memberof module:Interactive Guide
 *
 * @description
 * This step prompts the user to click on an IRI in the SPARQL results table to explore it.
 *
 * Clicking on the IRI<br>
 * <img src="resources/guides/sparql-editor/sparql-results-click-on-iri.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options). Additionally, it requires:
 * @property {string} iri - The IRI to click on.
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "sparql-results-click-on-iri",
 *  "options": {
 *    "iri": "http://example.org/resource/Item1"
 *   }
 * }
 * ```
 */
const step = {
  guideBlockName: 'sparql-results-click-on-iri',
  getSteps: function(options, services) {
    const translate = services.translate;
    const GuideUtils = services.GuideUtils;
    return [
      {
        guideBlockName: 'clickable-element',
        options: {
          content: translate(this.translationBundle, CLICK_ON_IRI, {iriLabel: options.iri}),
          placement: 'top',
          ...(options.title ?? {title: translate(this.translationBundle, SPARQL_EDITOR_TITLE)}),
          ...options,
          scrollToHandler: GuideUtils.scrollToTop,
          elementSelector: GuideUtils.getSparqlResultsSelectorForIri(options.iri),
          class: 'table-graph-instance',
          url: '/sparql',
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
      [SPARQL_EDITOR_TITLE]: 'SPARQL Query & Update',
      [CLICK_ON_IRI]: 'Click on the <b>{{iriLabel}}</b> IRI to explore it.'
    },
    fr: {
      [SPARQL_EDITOR_TITLE]: 'Requête et mise à jour SPARQL',
      [CLICK_ON_IRI]: 'Cliquez sur l’IRI <b>{{iriLabel}}</b> pour l’explorer.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
