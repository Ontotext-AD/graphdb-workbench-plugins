const LUCENE_DEFAULT_TITLE = 'guide.step_plugin.connectors-lucene.title';
const VIEW_SPARQL_DIALOG = 'guide.step_plugin.connectors-lucene-view-sparql-dialog-intro.content';

/**
 * @name connectors-lucene-view-sparql-dialog-intro
 * @memberof module:Interactive Guide
 *
 * @description
 * This step is an introductory step for the "View SPARQL Query" dialog of the Lucene connector in GraphDB.
 * It explains the purpose of the dialog and how users can utilize the SPARQL query displayed within it.
 *
 * Lucene connector View SPARQL Query dialog introduction<br>
 * <img src="resources/guides/connectors/lucene/connectors-lucene-view-sparql-dialog-intro.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "connectors-lucene-view-sparql-dialog-intro",
 * }
 * ```
 */
const step = {
  guideBlockName: 'connectors-lucene-view-sparql-dialog-intro',
  getSteps: function(options, pluginService) {
    const translate = pluginService.translate;

    return [{
      guideBlockName: 'connectors-view-sparql-dialog-intro',
      options: {
        content: translate(this.translationBundle, VIEW_SPARQL_DIALOG),
        ...(options.title ?? {title: translate(this.translationBundle, LUCENE_DEFAULT_TITLE)}),
        ...options,
        class: 'connectors-lucene-view-sparql-dialog-intro'
      }
    }];
  },
  translationBundle: {
    en: {
      [LUCENE_DEFAULT_TITLE]: 'Lucene connector',
      [VIEW_SPARQL_DIALOG]: 'The dialog displays the SPARQL query used to create the Lucene connector. You can copy it to execute manually or integrate it into automation scripts.'
    },
    fr: {
      [LUCENE_DEFAULT_TITLE]: 'Connecteur Lucene',
      [VIEW_SPARQL_DIALOG]: 'La boîte de dialogue affiche la requête SPARQL utilisée pour créer le connecteur Lucene. Vous pouvez la copier pour l’exécuter manuellement ou l’intégrer dans des scripts d’automatisation.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
