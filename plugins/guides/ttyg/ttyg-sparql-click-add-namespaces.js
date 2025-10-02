const TTYG_SPARQL_SEARCH_METHOD_DEFAULT_TITLE = 'guide.step-action.sparql-search-method';
const ADD_MISSING_NAMESPACES = 'guide.step_plugin.sparql-search-method.add-missing-namespaces';
/**
 * @name ttyg-sparql-click-add-namespaces
 * @memberof module:Interactive Guide
 *
 * @description
 * This step is used to guide users to enable the "Add missing namespaces" option in the TTYG agent SPARQL query settings.
 * It is a toggle step, which means that the user can enable the switch, but disabling will not be allowed.
 *
 * TTYG SPARQL add missing namespaces option<br>
 * <img src="resources/guides/ttyg/ttyg-sparql-click-add-namespaces.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * @example
 * ```JSON
 * {
 *   guideBlockName: 'ttyg-sparql-click-add-namespaces',
 * }
 * ```
 */
const step = {
  guideBlockName: 'ttyg-sparql-click-add-namespaces',
  getSteps: function(options, pluginService) {
    const GuideUtils = pluginService.GuideUtils;
    const translate = pluginService.translate;
    const title = options.title ? options.title : translate(this.translationBundle, TTYG_SPARQL_SEARCH_METHOD_DEFAULT_TITLE);
    const namespacesCheckbox = GuideUtils.getGuideElementSelector('add-missing-namespaces-input');

    return [
      {
        guideBlockName: 'toggle-element',
        options: {
          title,
          content: translate(this.translationBundle, ADD_MISSING_NAMESPACES),
          class: 'enable-sparql-query',
          ...options,
          url: 'ttyg',
          elementSelector: GuideUtils.getGuideElementSelector('add-missing-namespaces-option'),
          toggleableElementSelector: namespacesCheckbox,
          onNextValidate: () => Promise.resolve(GuideUtils.isChecked(namespacesCheckbox))
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [TTYG_SPARQL_SEARCH_METHOD_DEFAULT_TITLE]: 'SPARQL search query method',
      [ADD_MISSING_NAMESPACES]: 'Check to automatically add missing namespaces.'
    },
    fr: {
      [TTYG_SPARQL_SEARCH_METHOD_DEFAULT_TITLE]: 'Méthode de recherche SPARQL',
      [ADD_MISSING_NAMESPACES]: 'Cochez pour ajouter automatiquement les espaces de noms manquants.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
