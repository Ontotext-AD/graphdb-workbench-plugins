const LUCENE_CONNECTOR_NAME = 'Lucene';
const LUCENE_DEFAULT_TITLE = 'guide.step_plugin.connectors-lucene.title';
const DEFAULT_VALUE_INTRO = 'guide.step_plugin.connectors-lucene-fields-default-value-intro.content';

/**
 * @name connectors-lucene-fields-default-value-intro
 * @memberof module:Interactive Guide
 *
 * @description
 * This step is an introductory step for the "Default value" sub-parameter within the fields configuration of the Lucene connector in GraphDB.
 * It explains the purpose and usage of the "Default value" in mapping data between GraphDB and Lucene.
 *
 * Lucene connector default value introduction<br>
 * <img src="resources/guides/connectors/lucene/connectors-lucene-fields-default-value-intro.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "connectors-lucene-fields-default-value-intro",
 * }
 * ```
 */
const step = {
  guideBlockName: 'connectors-lucene-fields-default-value-intro',
  /**
   * Options:
   * - <b>instanceName</b>: string (required) – the specific instance name of the Lucene connector.
   */
  getSteps: function(options, pluginService) {
    const translate = pluginService.translate;

    return [{
      guideBlockName: 'connectors-array-subparameter-intro',
      options: {
        content: translate(this.translationBundle, DEFAULT_VALUE_INTRO),
        title: translate(this.translationBundle, LUCENE_DEFAULT_TITLE),
        ...options,
        class: 'connectors-lucene-fields-default-value-intro',
        connectorName: LUCENE_CONNECTOR_NAME,
        parameterName: 'fields',
        subparameterName: 'defaultValue'
      }
    }];
  },
  translationBundle: {
    en: {
      [LUCENE_DEFAULT_TITLE]: 'Lucene connector',
      [DEFAULT_VALUE_INTRO]: 'The <b>Default value</b> specifies the value to use for the field when the property chain has no matching values in GraphDB. It can be a plain literal, a literal with a datatype (xsd: prefix supported), a literal with a language tag, or an IRI. If not set, there is no default value.'
    },
    fr: {
      [LUCENE_DEFAULT_TITLE]: 'Connecteur Lucene',
      [DEFAULT_VALUE_INTRO]: 'La <b>valeur par défaut</b> définit la valeur à utiliser pour le champ lorsque la chaîne de propriétés n’a pas de valeurs correspondantes dans GraphDB. Elle peut être un littéral simple, un littéral avec datatype (préfixe xsd: pris en charge), un littéral avec balise de langue ou un IRI. Si elle n’est pas définie, il n’y a pas de valeur par défaut.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
