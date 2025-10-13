const LUCENE_CONNECTOR_NAME = 'Lucene';
const LUCENE_DEFAULT_TITLE = 'guide.step_plugin.connectors-lucene.title';
const READONLY_INTRO = 'guide.step_plugin.connectors-lucene-readonly-intro.content';

/**
 * @name connectors-lucene-readonly-intro
 * @memberof module:Interactive Guide
 *
 * @description
 * This step is an introductory step for the "Readonly" parameter of the Lucene connector in GraphDB.
 * It explains the purpose and usage of the "Readonly" option in setting the connector to read-only mode.
 *
 * Lucene connector readonly introduction<br>
 * <img src="resources/guides/connectors/lucene/connectors-lucene-readonly-intro.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "connectors-lucene-readonly-intro",
 * }
 * ```
 */
const step = {
  guideBlockName: 'connectors-lucene-readonly-intro',
  /**
   * Options:
   * - <b>instanceName</b>: string (required) – the specific instance name of the Lucene connector.
   */
  getSteps: function(options, pluginService) {
    const translate = pluginService.translate;

    return [{
      guideBlockName: 'connectors-parameter-intro',
      options: {
        content: translate(this.translationBundle, READONLY_INTRO),
        ...(options.title ?? {title: translate(this.translationBundle, LUCENE_DEFAULT_TITLE)}),
        ...options,
        class: 'connectors-lucene-readonly-intro',
        connectorName: LUCENE_CONNECTOR_NAME,
        parameterName: 'readonly'
      }
    }];
  },
  translationBundle: {
    en: {
      [LUCENE_DEFAULT_TITLE]: 'Lucene connector',
      [READONLY_INTRO]: 'The <b>Readonly</b> option puts the connector in read-only mode. In this mode, the connector indexes data only at creation time and does not respond to updates. Reindexing requires repair or recreation.'
    },
    fr: {
      [LUCENE_DEFAULT_TITLE]: 'Connecteur Lucene',
      [READONLY_INTRO]: 'L’option <b>Lecture seule</b> met le connecteur en mode lecture seule. Dans ce mode, le connecteur indexe les données uniquement lors de la création et ne répond pas aux mises à jour. Le réindexage nécessite une réparation ou une recréation.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
