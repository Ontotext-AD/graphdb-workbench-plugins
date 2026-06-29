const SIMILARITY_SEARCH_METHOD_DEFAULT_TITLE = 'guide.step-action.similarity-search-method';
const ENABLE_TOGGLE = 'guide.step_plugin.similarity-search-method.enable-toggle';

/**
 * @name ttyg-similarity-toggle-on
 * @memberof module:Interactive Guide
 *
 * @description
 * This step guides the user to enable the Similarity search query method in the TTYG interface.
 * It highlights the toggle element and provides instructions on how to proceed.
 *
 * Click on the toggle to enable Similarity search query method<br>
 * <img src="resources/guides/ttyg/ttyg-similarity-toggle-on.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "ttyg-similarity-toggle-on",
 * }
 * ```
 */
const step = {
  guideBlockName: 'ttyg-similarity-toggle-on',
  getSteps: function(options, pluginService) {
    const GuideUtils = pluginService.GuideUtils;
    const toggleSelector = GuideUtils.getGuideElementSelector('query-method-similarity_search-input');
    const translate = pluginService.translate;

    return [
      {
        guideBlockName: 'toggle-element',
        options: {
          content: translate(this.translationBundle, ENABLE_TOGGLE),
          class: 'toggle-similarity-search',
          title: translate(this.translationBundle, SIMILARITY_SEARCH_METHOD_DEFAULT_TITLE),
          ...options,
          url: 'ttyg',
          elementSelector: GuideUtils.getGuideElementSelector('query-method-similarity_search'),
          toggleableElementSelector: toggleSelector,
          onNextValidate: () => Promise.resolve(GuideUtils.isChecked(toggleSelector))
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [SIMILARITY_SEARCH_METHOD_DEFAULT_TITLE]: 'FTS search query method',
      [ENABLE_TOGGLE]: 'Click on the toggle to enable Similarity search query method.'
    },
    fr: {
      [SIMILARITY_SEARCH_METHOD_DEFAULT_TITLE]: 'Méthode de recherche FTS',
      [ENABLE_TOGGLE]: 'Cliquez sur la case à cocher pour activer la méthode de recherche par similarité.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
