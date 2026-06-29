const CONNECTORS_DEFAULT_TITLE = 'menu.connectors.label';
const VIEW_SPARQL_DIALOG = 'guide.step_plugin.connectors-view-sparql-dialog-intro.content';

/**
 * @name connectors-view-sparql-dialog-intro
 * @memberof module:Interactive Guide
 *
 * @description
 * This step is an introductory step for the "View SPARQL Query" dialog of the connectors section of the GraphDB Workbench.
 * It explains the purpose of the dialog and how users can utilize the SPARQL query displayed within it.
 *
 * Connectors "View SPARQL Query" dialog introduction<br>
 * <img src="resources/guides/connectors/connectors-view-sparql-dialog-intro.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "connectors-view-sparql-dialog-intro",
 * }
 * ```
 */
const step = {
  guideBlockName: 'connectors-view-sparql-dialog-intro',
  getSteps: function(options, services) {
    const translate = services.translate;
    const GuideUtils = services.GuideUtils;
    return [{
      guideBlockName: 'scroll-only-element',
      options: {
        title: translate(this.translationBundle, CONNECTORS_DEFAULT_TITLE),
        placement: 'left',
        class: 'connectors-view-sparql-dialog-intro',
        content: translate(this.translationBundle, VIEW_SPARQL_DIALOG),
        ...options,
        elementSelectorToWait: GuideUtils.getGuideElementSelector('view-query-body'),
        elementSelector: GuideUtils.getGuideElementSelector('view-query-body'),
        url: 'connectors'
      }
    }];
  },
  translationBundle: {
    en: {
      [CONNECTORS_DEFAULT_TITLE]: 'Connectors',
      [VIEW_SPARQL_DIALOG]: 'The dialog displays the SPARQL query used to create the connector. You can copy it to execute manually or integrate it into automation scripts.'
    },
    fr: {
      [CONNECTORS_DEFAULT_TITLE]: 'Connecteurs',
      [VIEW_SPARQL_DIALOG]: 'La boîte de dialogue affiche la requête SPARQL utilisée pour créer le connecteur. Vous pouvez la copier pour l\'exécuter manuellement ou l\'intégrer dans des scripts d\'automatisation.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
