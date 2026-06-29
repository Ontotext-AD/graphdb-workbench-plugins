const FTS_METHOD_DEFAULT_TITLE = 'guide.step-action.fts-search-method';
const ENABLE_TOGGLE = 'guide.step_plugin.fts-search-method.enable-toggle';

/**
 * @name ttyg-fts-method-enable
 * @memberof module:Interactive Guide
 *
 * @description
 * This step guides the user to enable the FTS search query method in the TTYG interface.
 * It highlights the toggle element and provides instructions on how to proceed.
 *
 * Click on the toggle to enable FTS search query method<br>
 * <img src="resources/guides/ttyg/ttyg-fts-method-enable.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "ttyg-fts-method-enable",
 * }
 * ```
 */
const step = {
  guideBlockName: 'ttyg-fts-method-enable',
  getSteps: function(options, pluginService) {
    const GuideUtils = pluginService.GuideUtils;
    const toggleSelector = GuideUtils.getGuideElementSelector('query-method-fts_search-input');
    const translate = pluginService.translate;

    return [
      {
        guideBlockName: 'toggle-element',
        options: {
          content: translate(this.translationBundle, ENABLE_TOGGLE),
          title: translate(this.translationBundle, FTS_METHOD_DEFAULT_TITLE),
          class: 'toggle-fts-search',
          ...options,
          url: 'ttyg',
          elementSelector: GuideUtils.getGuideElementSelector('query-method-fts_search'),
          toggleableElementSelector: toggleSelector,
          onNextValidate: () => Promise.resolve(GuideUtils.isChecked(toggleSelector))
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [FTS_METHOD_DEFAULT_TITLE]: 'FTS search query method',
      [ENABLE_TOGGLE]: 'Click on the toggle to enable FTS search query method.'
    },
    fr: {
      [FTS_METHOD_DEFAULT_TITLE]: 'Méthode de recherche FTS',
      [ENABLE_TOGGLE]: 'Cliquez sur le bouton pour activer la méthode de recherche FTS.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
