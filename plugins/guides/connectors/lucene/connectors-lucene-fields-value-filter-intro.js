const LUCENE_CONNECTOR_NAME = 'Lucene';
const LUCENE_DEFAULT_TITLE = 'guide.step_plugin.connectors-lucene.title';
const VALUE_FILTER_INTRO = 'guide.step_plugin.connectors-lucene-fields-value-filter-intro.content';

/**
 * @name connectors-lucene-fields-value-filter-intro
 * @memberof module:Interactive Guide
 *
 * @description
 * This step is an introductory step for the "Value Filter" sub-parameter within the fields configuration of the Lucene connector in GraphDB.
 * It explains the purpose and usage of the "Value Filter" in mapping data between GraphDB and Lucene.
 *
 * Lucene connector value filter introduction<br>
 * <img src="resources/guides/connectors/lucene/connectors-lucene-fields-value-filter-intro.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "connectors-lucene-fields-value-filter-intro",
 * }
 * ```
 */
const step = {
  guideBlockName: 'connectors-lucene-fields-value-filter-intro',
  /**
   * Options:
   * - <b>instanceName</b>: string (required) – the specific instance name of the Lucene connector.
   */
  getSteps: function(options, pluginService) {
    const translate = pluginService.translate;

    return [{
      guideBlockName: 'connectors-array-subparameter-intro',
      options: {
        content: translate(this.translationBundle, VALUE_FILTER_INTRO),
        title: translate(this.translationBundle, LUCENE_DEFAULT_TITLE),
        ...options,
        class: 'connectors-lucene-fields-value-filter-intro',
        connectorName: LUCENE_CONNECTOR_NAME,
        parameterName: 'fields',
        subparameterName: 'valueFilter'
      }
    }];
  },
  translationBundle: {
    en: {
      [LUCENE_DEFAULT_TITLE]: 'Lucene connector',
      [VALUE_FILTER_INTRO]: 'The <b>Value filter</b> specifies the filter applied to values for this field.'
    },
    fr: {
      [LUCENE_DEFAULT_TITLE]: 'Connecteur Lucene',
      [VALUE_FILTER_INTRO]: 'Le <b>filtre de valeurs</b> spécifie le filtre appliqué aux valeurs de ce champ.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
