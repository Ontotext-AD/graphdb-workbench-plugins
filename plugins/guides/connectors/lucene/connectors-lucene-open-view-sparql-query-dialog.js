const LUCENE_CONNECTOR_NAME = 'Lucene';
const LUCENE_DEFAULT_TITLE = 'guide.step_plugin.connectors-lucene.title';
const OPEN_SPARQL = 'guide.step_plugin.connectors-lucene-open-view-sparql-query-dialog.content';

/**
 * @name connectors-lucene-open-view-sparql-query-dialog
 * @memberof module:Interactive Guide
 *
 * @description
 * This step guides the user to open the SPARQL query dialog for a specific Lucene connector instance in GraphDB.
 * It prompts the user to click on "View SPARQL Query" to see the query used to create the Lucene connector.
 *
 * Open Lucene connector SPARQL query dialog<br>
 * <img src="resources/guides/connectors/lucene/connectors-lucene-open-view-sparql-query-dialog.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "connectors-lucene-open-view-sparql-query-dialog",
 * }
 * ```
 */
const step = {
  guideBlockName: 'connectors-lucene-open-view-sparql-query-dialog',
  /**
   * Options:
   * - <b>instanceName</b>: string (required) – the specific instance name of the Lucene connector.
   */
  getSteps: function(options, pluginService) {
    const translate = pluginService.translate;

    return [{
      guideBlockName: 'connectors-open-view-sparql-query-dialog',
      options: {
        content: translate(this.translationBundle, OPEN_SPARQL),
        ...(options.title ?? {title: translate(this.translationBundle, LUCENE_DEFAULT_TITLE)}),
        ...options,
        class: 'connectors-lucene-open-view-sparql-query-dialog',
        connectorName: LUCENE_CONNECTOR_NAME,
        parameterName: 'analyzer'
      }
    }];
  },
  translationBundle: {
    en: {
      [LUCENE_DEFAULT_TITLE]: 'Lucene connector',
      [OPEN_SPARQL]: 'Click on <b>View SPARQL Query</b> to view the Lucene connector creation query.'
    },
    fr: {
      [LUCENE_DEFAULT_TITLE]: 'Connecteur Lucene',
      [OPEN_SPARQL]: 'Cliquez sur <b>Voir la requête SPARQL</b> pour afficher la requête de création du connecteur Lucene.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
