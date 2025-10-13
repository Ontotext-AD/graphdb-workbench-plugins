const TTYG_SPARQL_SEARCH_METHOD_DEFAULT_TITLE = 'guide.step-action.sparql-search-method';
const ENABLE_SPARQL_QUERY = 'guide.step_plugin.sparql-search-method.enable-sparql-query';

/**
 * @name ttyg-sparql-method-sparql-query-select
 * @memberof module:Interactive Guide
 *
 * @description
 * This step guides the user to enable providing a SPARQL CONSTRUCT query that fetches the ontology for the SPARQL search method in the TTYG interface.
 * It highlights the checkbox element and provides instructions on how to proceed.
 *
 * Click on the toggle to enable providing a SPARQL CONSTRUCT query that fetches the ontology.<br>
 * <img src="resources/guides/ttyg/ttyg-sparql-method-sparql-query-select.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "ttyg-sparql-method-sparql-query-select",
 * }
 * ```
 */
const step = {
  guideBlockName: 'ttyg-sparql-method-sparql-query-select',
  getSteps: function(options, services) {
    const GuideUtils = services.GuideUtils;
    const translate = services.translate;

    return [
      {
        guideBlockName: 'clickable-element',
        options: {
          content: translate(this.translationBundle, ENABLE_SPARQL_QUERY),
          ...(options.title ?? {title: translate(this.translationBundle, TTYG_SPARQL_SEARCH_METHOD_DEFAULT_TITLE)}),
          class: 'enable-sparql-query',
          url: 'ttyg',
          elementSelector: GuideUtils.getGuideElementSelector('sparql-query-option'),
          clickableElementSelector: GuideUtils.getGuideElementSelector('sparql-query-option-input'),
          onNextValidate: () => Promise.resolve(GuideUtils.isChecked(GuideUtils.getGuideElementSelector('sparql-query-option-input'))),
          ...options
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [TTYG_SPARQL_SEARCH_METHOD_DEFAULT_TITLE]: 'SPARQL search query method',
      [ENABLE_SPARQL_QUERY]: 'Click on the toggle to enable to providing a SPARQL CONSTRUCT query that fetches the ontology.'
    },
    fr: {
      [TTYG_SPARQL_SEARCH_METHOD_DEFAULT_TITLE]: 'Méthode de recherche SPARQL',
      [ENABLE_SPARQL_QUERY]: 'Cliquez sur le bouton bascule pour activer la fourniture d\'une requête SPARQL CONSTRUCT qui récupère l\'ontologie.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
