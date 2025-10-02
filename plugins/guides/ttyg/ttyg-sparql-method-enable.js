const TTYG_SPARQL_SEARCH_METHOD_DEFAULT_TITLE = 'guide.step-action.sparql-search-method';
const ENABLE_TOGGLE = 'guide.step_plugin.sparql-search-method.enable-toggle';

/**
 * @name ttyg-sparql-method-enable
 * @memberof module:Interactive Guide
 *
 * @description
 * This step is used to enable the SPARQL search method in the TTYG plugin.
 * It is a toggle step, which means that the user can enable the switch, but disabling will not be allowed.
 *
 * Enable SPARQL query search method<br>
 * <img src="resources/guides/ttyg/ttyg-sparql-method-enable.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * @example
 * ```JSON
 * {
 *   guideBlockName: 'ttyg-sparql-method-enable',
 * }
 * ```
 */
const step = {
  guideBlockName: 'ttyg-sparql-method-enable',
  getSteps: function(options, pluginService) {
    const GuideUtils = pluginService.GuideUtils;
    const translate = pluginService.translate;
    const title = options.title ? options.title : translate(this.translationBundle, TTYG_SPARQL_SEARCH_METHOD_DEFAULT_TITLE);
    const toggleSelector = GuideUtils.getGuideElementSelector('query-method-sparql_search-input');
    return [
      {
        guideBlockName: 'toggleable-element',
        options: {
          title,
          content: translate(this.translationBundle, ENABLE_TOGGLE),
          class: 'toggle-sparql-search',
          ...options,
          url: 'ttyg',
          elementSelector: GuideUtils.getGuideElementSelector('query-method-sparql_search'),
          toggleableElementSelector: toggleSelector,
          onNextValidate: () => Promise.resolve(GuideUtils.isChecked(toggleSelector))
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [TTYG_SPARQL_SEARCH_METHOD_DEFAULT_TITLE]: 'SPARQL search query method',
      [ENABLE_TOGGLE]: 'Click on the toggle to enable SPARQL search query method.'
    },
    fr: {
      [TTYG_SPARQL_SEARCH_METHOD_DEFAULT_TITLE]: 'Méthode de recherche SPARQL',
      [ENABLE_TOGGLE]: 'Cliquez sur le bouton pour activer la méthode de recherche SPARQL.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
