const LUCENE_CONNECTOR_NAME = 'Lucene';
const LUCENE_DEFAULT_TITLE = 'guide.step_plugin.connectors-lucene.title';
const VALUE_FILTER_INTRO = 'guide.step_plugin.connectors-lucene-value-filter-intro.content';

/**
 * @name connectors-lucene-value-filter-intro
 * @memberof module:Interactive Guide
 *
 * @description
 * This step is an introductory step for the "Value filter" parameter of the Lucene connector in GraphDB.
 * It explains the purpose and usage of the "Value filter" in defining a top-level value filter for documents.
 *
 * Lucene connector value filter introduction<br>
 * <img src="resources/guides/connectors/lucene/connectors-lucene-value-filter-intro.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "connectors-lucene-value-filter-intro",
 * }
 * ```
 */
const step = {
  guideBlockName: 'connectors-lucene-value-filter-intro',
  /**
   * Options:
   * - <b>instanceName</b>: string (required) – the specific instance name of the Lucene connector.
   */
  getSteps: function(options, pluginService) {
    const translate = pluginService.translate;

    return [{
      guideBlockName: 'connectors-parameter-intro',
      options: {
        content: translate(this.translationBundle, VALUE_FILTER_INTRO),
        ...(options.title ?? {title: translate(this.translationBundle, LUCENE_DEFAULT_TITLE)}),
        ...options,
        class: 'connectors-lucene-value-filter-intro',
        connectorName: LUCENE_CONNECTOR_NAME,
        parameterName: 'valueFilter'
      }
    }];
  },
  translationBundle: {
    en: {
      [LUCENE_DEFAULT_TITLE]: 'Lucene connector',
      [VALUE_FILTER_INTRO]: 'The <b>Value filter</b> is an optional string defining a top-level value filter for the document.'
    },
    fr: {
      [LUCENE_DEFAULT_TITLE]: 'Connecteur Lucene',
      [VALUE_FILTER_INTRO]: 'Le <b>filtre de valeurs</b> est une chaîne optionnelle définissant un filtre de valeurs au niveau du document.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
