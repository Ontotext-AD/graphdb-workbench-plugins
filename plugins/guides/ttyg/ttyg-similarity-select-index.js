const SIMILARITY_SEARCH_METHOD_DEFAULT_TITLE = 'guide.step-action.similarity-search-method';
const SELECT_INDEX = 'guide.step_plugin.similarity-search-method.select-index';

/**
 * @name ttyg-similarity-select-index
 * @memberof module:Interactive Guide
 *
 * @description
 * This step guides the user to select the index to use for Similarity search in the TTYG interface.
 * It highlights the dropdown element and provides instructions on how to proceed.
 *
 * Select the index to use for Similarity search<br>
 * <img src="resources/guides/ttyg/ttyg-similarity-select-index.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "ttyg-similarity-select-index",
 * }
 * ```
 */
const step = {
  guideBlockName: 'ttyg-similarity-select-index',
  getSteps: function(options, pluginService) {
    const GuideUtils = pluginService.GuideUtils;
    const translate = pluginService.translate;

    return [
      {
        guideBlockName: 'clickable-element',
        options: {
          content: translate(this.translationBundle, SELECT_INDEX),
          class: 'select-similarity-index',
          ...(options.title ?? {title: translate(this.translationBundle, SIMILARITY_SEARCH_METHOD_DEFAULT_TITLE)}),
          ...options,
          elementSelector: GuideUtils.getGuideElementSelector('similarity-index-select')
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [SIMILARITY_SEARCH_METHOD_DEFAULT_TITLE]: 'FTS search query method',
      [SELECT_INDEX]: 'Select the index to use for Similarity search.'
    },
    fr: {
      [SIMILARITY_SEARCH_METHOD_DEFAULT_TITLE]: 'Méthode de recherche FTS',
      [SELECT_INDEX]: 'Sélectionner l\'index à utiliser pour la recherche de similarité.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
