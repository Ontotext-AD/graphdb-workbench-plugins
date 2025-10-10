const SIMILARITY_SEARCH_METHOD_DEFAULT_TITLE = 'guide.step-action.similarity-search-method';
const DISABLE_TOGGLE = 'guide.step_plugin.similarity-search-method.disable-toggle';

/**
 * @name ttyg-similarity-toggle-off
 * @memberof module:Interactive Guide
 *
 * @description
 * This step guides the user to disable the Similarity search query method in the TTYG interface.
 * It highlights the toggle element and provides instructions on how to proceed.
 *
 * Click on the toggle to disable Similarity search query method<br>
 * <img src="resources/guides/ttyg/ttyg-similarity-toggle-off.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "ttyg-similarity-toggle-off",
 * }
 * ```
 */
const step = {
  guideBlockName: 'ttyg-similarity-toggle-off',
  getSteps: function(options, pluginService) {
    const GuideUtils = pluginService.GuideUtils;
    const toggleSelector = GuideUtils.getGuideElementSelector('query-method-similarity_search-input');
    const translate = pluginService.translate;

    return [
      {
        guideBlockName: 'toggle-element',
        options: {
          content: translate(this.translationBundle, DISABLE_TOGGLE),
          class: 'toggle-similarity-search',
          ...(options.title ?? {title: translate(this.translationBundle, SIMILARITY_SEARCH_METHOD_DEFAULT_TITLE)}),
          ...options,
          disable: true,
          url: 'ttyg',
          elementSelector: GuideUtils.getGuideElementSelector('query-method-similarity_search'),
          toggleableElementSelector: toggleSelector,
          onNextValidate: () => Promise.resolve(!GuideUtils.isChecked(toggleSelector))
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [SIMILARITY_SEARCH_METHOD_DEFAULT_TITLE]: 'FTS search query method',
      [DISABLE_TOGGLE]: 'Click on the toggle to disable Similarity search query method.'
    },
    fr: {
      [SIMILARITY_SEARCH_METHOD_DEFAULT_TITLE]: 'Méthode de recherche FTS',
      [DISABLE_TOGGLE]: 'Cliquez sur le bouton pour désactiver la méthode de recherche par similarité.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
