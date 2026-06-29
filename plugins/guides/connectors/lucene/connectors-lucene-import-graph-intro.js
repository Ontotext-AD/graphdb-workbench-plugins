const LUCENE_CONNECTOR_NAME = 'Lucene';
const LUCENE_DEFAULT_TITLE = 'guide.step_plugin.connectors-lucene.title';
const IMPORT_GRAPH = 'guide.step_plugin.connectors-lucene-import-graph-intro.content';

/**
 * @name connectors-lucene-import-graph-intro
 * @memberof module:Interactive Guide
 *
 * @description
 * This step is an introductory step for the "importGraph" parameter of the Lucene connector in GraphDB.
 * It explains the purpose and usage of the "importGraph" parameter in creating a connector from RDF data inserted into a special virtual graph.
 *
 * Lucene connector importGraph introduction<br>
 * <img src="resources/guides/connectors/lucene/connectors-lucene-import-graph-intro.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "connectors-lucene-import-graph-intro",
 * }
 * ```
 */
const step = {
  guideBlockName: 'connectors-lucene-import-graph-intro',
  /**
   * Options:
   * - <b>instanceName</b>: string (required) – the specific instance name of the Lucene connector.
   */
  getSteps: function(options, pluginService) {
    const translate = pluginService.translate;

    return [{
      guideBlockName: 'connectors-parameter-intro',
      options: {
        content: translate(this.translationBundle, IMPORT_GRAPH),
        title: translate(this.translationBundle, LUCENE_DEFAULT_TITLE),
        ...options,
        class: 'connectors-lucene-import-graph-intro',
        connectorName: LUCENE_CONNECTOR_NAME,
        parameterName: 'importGraph'
      }
    }];
  },
  translationBundle: {
    en: {
      [LUCENE_DEFAULT_TITLE]: 'Lucene connector',
      [IMPORT_GRAPH]: 'The <b>importGraph</b> parameter creates the connector from RDF data inserted into a special virtual graph. Requires <b>readonly</b> mode, and insertion plus creation must occur in the same transaction.'
    },
    fr: {
      [LUCENE_DEFAULT_TITLE]: 'Connecteur Lucene',
      [IMPORT_GRAPH]: 'Le paramètre <b>importGraph</b> crée le connecteur à partir de données RDF insérées dans un graphe virtuel spécial. Nécessite le mode <b>lecture seule</b>, et l’insertion plus la création doivent avoir lieu dans la même transaction.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
