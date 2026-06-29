const RESOURCE_SEARCH_RDF_TITLE = 'guide.step-action.resource-search-rdf';
const RESOURCE_SEARCH_RDF_CONTENT = 'guide.step-action.resource-search-rdf-content';

/**
 * @name resource-search-rdf
 * @memberof module:Interactive Guide
 *
 * @description
 * The `resource-search-rdf` guide step prompts the user to enter node search term in the search field.
 * This is a reusable step that can be used everywhere a rdf-search input is present
 *
 * Resource search input example:<br>
 * <img src="resources/guides/resource/resource-search-rdf.png" style="height:200px; border: solid; border-width:1px"/>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 * Additionally, the following specific option is required:
 *
 * @property {string} [options.searchTerm] - The search term to be entered by the user.
 *
 * @example
 * ```json
 * {
 *   "guideBlockName": "resource-search-rdf",
 *   "options": {
 *     "searchTerm": "http://example.org/resource"
 *   }
 * }
 * ```
 */
const step = {
  guideBlockName: 'resource-search-rdf',
  getSteps: function(options, pluginServices) {
    const translate = pluginServices.translate;
    const GuideUtils = pluginServices.GuideUtils;
    const elementSelector = GuideUtils.getGuideElementSelector('search-resource-input');
    const searchTerm = options.searchTerm || '';

    return [
      {
        guideBlockName: 'input-element',
        options: {
          content: translate(this.translationBundle, RESOURCE_SEARCH_RDF_CONTENT, {searchTerm}),
          title: translate(this.translationBundle, RESOURCE_SEARCH_RDF_TITLE),
          ...options,
          elementSelector,
          onNextValidate: () => Promise.resolve(GuideUtils.validateTextInput(elementSelector, searchTerm))
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [RESOURCE_SEARCH_RDF_TITLE]: 'Resource search',
      [RESOURCE_SEARCH_RDF_CONTENT]: 'Enter the following text: <b>{{searchTerm}}</b>'
    },
    fr: {
      [RESOURCE_SEARCH_RDF_TITLE]: 'Recherche de ressource',
      [RESOURCE_SEARCH_RDF_CONTENT]: 'Entrez le texte suivant : <b>{{searchTerm}}</b>'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}

