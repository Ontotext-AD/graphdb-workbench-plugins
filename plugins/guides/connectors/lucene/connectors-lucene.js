const LUCENE_CONNECTOR_NAME = 'Lucene';
const LUCENE_DEFAULT_TITLE = 'guide.step_plugin.connectors-lucene.title';
const LUCENE_CONTENT = 'guide.step_plugin.connectors-lucene.content';

/**
 * @name connectors-lucene
 * @memberof module:Interactive Guide
 *
 * @description
 * This step provides an overview of a specific Lucene connector instance in GraphDB.
 * It highlights the connector's name and offers options to manage it, such as copying, restarting, or deleting.
 *
 * Lucene connector overview<br>
 * <img src="resources/guides/connectors/lucene/connectors-lucene.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options). It requires `options.instanceName`.
 *
 * @property {string} options.instanceName - The specific instance name of the Lucene connector. This option is required.
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "connectors-lucene",
 *  "options": {
 *    "instanceName": "MyLuceneConnector"
 *   }
 * }
 * ```
 */
const step = {
  guideBlockName: 'connectors-lucene',
  /**
   * Options:
   * - <b>instanceName</b>: string (required) – the specific instance name of the Lucene connector.
   */
  getSteps: function(options, pluginService) {
    const translate = pluginService.translate;

    return [{
      guideBlockName: 'connectors-connector-intro',
      options: {
        content: translate(this.translationBundle, LUCENE_CONTENT, {instanceName: options.instanceName}),
        ...(options.title ?? {title: translate(this.translationBundle, LUCENE_DEFAULT_TITLE)}),
        ...options,
        connectorName: LUCENE_CONNECTOR_NAME,
        class: 'connectors-lucene'
      }
    }];
  },
  translationBundle: {
    en: {
      [LUCENE_DEFAULT_TITLE]: 'Lucene connector',
      [LUCENE_CONTENT]: 'This is the <b>Lucene connector</b> named <b>{{instanceName}}</b>. You can copy, restart, or delete it using the icons on the right.'
    },
    fr: {
      [LUCENE_DEFAULT_TITLE]: 'Connecteur Lucene',
      [LUCENE_CONTENT]: 'Ceci est le <b>connecteur Lucene</b> nommé <b>{{instanceName}}</b>. Vous pouvez le copier, le redémarrer ou le supprimer à l’aide des icônes à droite.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
