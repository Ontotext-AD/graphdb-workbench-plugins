const TTYG_SPARQL_SEARCH_METHOD_DEFAULT_TITLE = 'guide.step-action.sparql-search-method';
const ENABLE_ONTOLOGY_FROM_GRAPH = 'guide.step_plugin.sparql-search-method.enable-ontology-from-graph';

/**
 * @name ttyg-sparql-method-ontology-select
 * @memberof module:Interactive Guide
 *
 * @description
 * This step guides the user to enable providing an ontology in a named graph for the SPARQL search method in the TTYG interface.
 * It highlights the checkbox element and provides instructions on how to proceed.
 *
 * Click on the toggle to enable providing an ontology in a named graph.<br>
 * <img src="resources/guides/ttyg/ttyg-sparql-method-ontology-select.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "ttyg-sparql-method-ontology-select",
 * }
 * ```
 */
const step = {
  guideBlockName: 'ttyg-sparql-method-ontology-select',
  getSteps: function(options, pluginService) {
    const GuideUtils = pluginService.GuideUtils;
    const translate = pluginService.translate;

    return [
      {
        guideBlockName: 'clickable-element',
        options: {
          content: translate(this.translationBundle, ENABLE_ONTOLOGY_FROM_GRAPH),
          class: 'enable-ontology-from-graph',
          // If mainAction is set the title will be set automatically
          title: translate(this.translationBundle, TTYG_SPARQL_SEARCH_METHOD_DEFAULT_TITLE),
          ...options,
          url: 'ttyg',
          elementSelector: GuideUtils.getGuideElementSelector('sparql-ontology-graph-option'),
          clickableElementSelector: GuideUtils.getGuideElementSelector('sparql-ontology-graph-option-input'),
          onNextValidate: () => Promise.resolve(GuideUtils.isChecked(GuideUtils.getGuideElementSelector('sparql-ontology-graph-option-input')))
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [TTYG_SPARQL_SEARCH_METHOD_DEFAULT_TITLE]: 'SPARQL search query method',
      [ENABLE_ONTOLOGY_FROM_GRAPH]: 'Click on the toggle to enable providing an ontology in a named graph.'
    },
    fr: {
      [TTYG_SPARQL_SEARCH_METHOD_DEFAULT_TITLE]: 'Méthode de recherche SPARQL',
      [ENABLE_ONTOLOGY_FROM_GRAPH]: 'Cliquez sur la case à cocher pour activer la fourniture d\'une ontologie dans un graphe nommé.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
