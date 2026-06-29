const TTYG_SPARQL_SEARCH_METHOD_DEFAULT_TITLE = 'guide.step-action.sparql-search-method';
const DISABLE_TOGGLE = 'guide.step_plugin.sparql-search-method.disable-toggle';

/**
 * @name ttyg-sparql-method-disable
 * @memberof module:Interactive Guide
 *
 * @description
 * This step is used to disable the SPARQL search method in the TTYG plugin.
 * It is a clickable step, which means that the user can disable the switch, but enabling will not be allowed.
 *
 * Disable SPARQL query search method<br>
 * <img src="resources/guides/ttyg/ttyg-sparql-method-disable.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```JSON
 * {
 *   guideBlockName: 'ttyg-sparql-method-disable',
 * }
 * ```
 */
const step = {
  guideBlockName: 'ttyg-sparql-method-disable',
  getSteps: function(options, pluginService) {
    const GuideUtils = pluginService.GuideUtils;
    const toggleSelector = GuideUtils.getGuideElementSelector('query-method-sparql_search-input');
    const translate = pluginService.translate;

    return [
      {
        guideBlockName: 'toggle-element',
        options: {
          content: translate(this.translationBundle, DISABLE_TOGGLE),
          title: translate(this.translationBundle, TTYG_SPARQL_SEARCH_METHOD_DEFAULT_TITLE),
          class: 'toggle-sparql-search',
          ...options,
          url: 'ttyg',
          elementSelector: GuideUtils.getGuideElementSelector('query-method-sparql_search'),
          toggleableElementSelector: toggleSelector,
          onNextValidate: () => Promise.resolve(!GuideUtils.isChecked(toggleSelector))
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [TTYG_SPARQL_SEARCH_METHOD_DEFAULT_TITLE]: 'SPARQL search query method',
      [DISABLE_TOGGLE]: 'Click on the toggle to disable SPARQL search query method.'
    },
    fr: {
      [TTYG_SPARQL_SEARCH_METHOD_DEFAULT_TITLE]: 'Méthode de recherche SPARQL',
      [DISABLE_TOGGLE]: 'Cliquez sur le bouton pour désactiver la méthode de recherche SPARQL..'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
