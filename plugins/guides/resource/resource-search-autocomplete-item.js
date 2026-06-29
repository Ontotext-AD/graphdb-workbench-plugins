const RESOURCE_SEARCH_AUTOCOMPLETE_ITEM_TITLE = 'guide.step-action.resource-search-autocomplete-item';
const RESOURCE_SEARCH_AUTOCOMPLETE_ITEM_CONTENT = 'guide.step-action.resource-search-autocomplete-item-content';

/**
 * @name resource-search-autocomplete-item
 * @memberof module:Interactive Guide
 *
 * @description
 * The `resource-search-autocomplete-item` step selects the autocomplete item for a discovered RDF resource in the search input.
 * This is a reusable step that can be used everywhere an autocomplete dropdown with RDF resources is present.
 *
 * <img src="resources/guides/resource/resource-search-autocomplete-item.png" style="height:200px; border: solid; border-width:1px"/>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 * Additionally, the following specific option is required:
 *
 * @property {string} [options.iri] - The IRI displayed in the autocomplete item.
 *
 * @example
 * ```json
 * {
 *   "guideBlockName": "resource-search-autocomplete-item",
 *   "options": {
 *     "iri": "http://example.org/resource"
 *   }
 * }
 * ```
 */
const step = {
  guideBlockName: 'resource-search-autocomplete-item',
  getSteps: function(options, services) {
    const GuideUtils = services.GuideUtils;
    const translate = services.translate;

    return [
      {
        guideBlockName: 'clickable-element',
        options: {
          title: translate(this.translationBundle, RESOURCE_SEARCH_AUTOCOMPLETE_ITEM_TITLE),
          content: translate(this.translationBundle, RESOURCE_SEARCH_AUTOCOMPLETE_ITEM_CONTENT, {iri: options.iri}),
          elementSelector: GuideUtils.getGuideElementSelector(`autocomplete-${options.iri}`),
          onNextClick: (guide, step) => GuideUtils.waitFor(step.elementSelector, 3).then(() => $(step.elementSelector).trigger('click')),
          ...options
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [RESOURCE_SEARCH_AUTOCOMPLETE_ITEM_TITLE]: 'Resource search',
      [RESOURCE_SEARCH_AUTOCOMPLETE_ITEM_CONTENT]: 'Click on <b>{{iri}}</b>.'
    },
    fr: {
      [RESOURCE_SEARCH_AUTOCOMPLETE_ITEM_TITLE]: 'Recherche de ressource',
      [RESOURCE_SEARCH_AUTOCOMPLETE_ITEM_CONTENT]: 'Cliquez sur <b>{{iri}}</b>.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}

