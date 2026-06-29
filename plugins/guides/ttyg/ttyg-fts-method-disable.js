const FTS_METHOD_DEFAULT_TITLE = 'guide.step-action.fts-search-method';
const DISABLE_TOGGLE = 'guide.step_plugin.fts-search-method.disable-toggle';

/**
 * @name ttyg-fts-method-disable
 * @memberof module:Interactive Guide
 *
 * @description
 * This step guides the user to disable the FTS search query method in the TTYG interface.
 * It highlights the toggle element and provides instructions on how to proceed.
 *
 * Click on the toggle to disable FTS search query method<br>
 * <img src="resources/guides/ttyg/ttyg-fts-method-disable.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "ttyg-fts-method-disable",
 * }
 * ```
 */
const step = {
  guideBlockName: 'ttyg-fts-method-disable',
  getSteps: function(options, pluginService) {
    const GuideUtils = pluginService.GuideUtils;
    const toggleSelector = GuideUtils.getGuideElementSelector('query-method-fts_search-input');
    const translate = pluginService.translate;

    return [
      {
        guideBlockName: 'toggle-element',
        options: {
          content: translate(this.translationBundle, DISABLE_TOGGLE),
          title: translate(this.translationBundle, FTS_METHOD_DEFAULT_TITLE),
          class: 'toggle-fts-search',
          ...options,
          disable: true,
          url: 'ttyg',
          elementSelector: GuideUtils.getGuideElementSelector('query-method-fts_search'),
          toggleableElementSelector: toggleSelector,
          onNextValidate: () => Promise.resolve(!GuideUtils.isChecked(toggleSelector))
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [FTS_METHOD_DEFAULT_TITLE]: 'FTS search query method',
      [DISABLE_TOGGLE]: 'Click on the toggle to disable FTS search query method.'
    },
    fr: {
      [FTS_METHOD_DEFAULT_TITLE]: 'Méthode de recherche FTS',
      [DISABLE_TOGGLE]: 'Cliquez sur le bouton pour désactiver la méthode de recherche FTS.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
