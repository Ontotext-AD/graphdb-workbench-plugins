const LUCENE_CONNECTOR_NAME = 'Lucene';
const LUCENE_DEFAULT_TITLE = 'guide.step_plugin.connectors-lucene.title';
const LUCENE_EXPAND_CONTENT = 'guide.step_plugin.connectors-lucene-expand.content';

/**
 * @name connectors-expand-lucene
 * @memberof module:Interactive Guide
 *
 * @description
 * This step guides the user to expand a specific Lucene connector instance in GraphDB to view its configuration.
 * It prompts the user to click on the connector's name to access its settings.
 *
 * Expand Lucene connector<br>
 * <img src="resources/guides/connectors/lucene/connectors-expand-lucene.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options). It requires `options.instanceName`.
 *
 * @property {string} options.instanceName - The specific instance name of the Lucene connector. This option is required.
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "connectors-expand-lucene",
 *  "options": {
 *    "instanceName": "MyLuceneConnector"
 *   }
 * }
 * ```
 */
const step = {
  guideBlockName: 'connectors-expand-lucene',
  /**
   * Options:
   * - <b>instanceName</b>: string (required) – the specific instance name of the Lucene connector.
   */
  getSteps: function(options, pluginService) {
    const translate = pluginService.translate;

    return [{
      guideBlockName: 'connectors-expand-connector',
      options: {
        content: translate(this.translationBundle, LUCENE_EXPAND_CONTENT, {instanceName: options.instanceName}),
        ...(options.title ?? {title: translate(this.translationBundle, LUCENE_DEFAULT_TITLE)}),
        ...options,
        connectorName: LUCENE_CONNECTOR_NAME,
        class: 'connectors-lucene-expand'
      }
    }];
  },
  translationBundle: {
    en: {
      [LUCENE_DEFAULT_TITLE]: 'Lucene connector',
      [LUCENE_EXPAND_CONTENT]: 'Click on <b>{{instanceName}}</b> to view its configuration.'
    },
    fr: {
      [LUCENE_DEFAULT_TITLE]: 'Connecteur Lucene',
      [LUCENE_EXPAND_CONTENT]: 'Cliquez sur <b>{{instanceName}}</b> pour afficher sa configuration.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
