const LUCENE_CONNECTOR_NAME = 'Lucene';
const LUCENE_DEFAULT_TITLE = 'guide.step_plugin.connectors-lucene.title';
const INVALID_VALUES_INTRO = 'guide.step_plugin.connectors-lucene-fields-ignore-invalid-values-intro.content';

/**
 * @name connectors-lucene-fields-ignore-invalid-values-intro
 * @memberof module:Interactive Guide
 *
 * @description
 * This step is an introductory step for the "Ignore Invalid Values" sub-parameter within the fields configuration of the Lucene connector in GraphDB.
 * It explains the purpose and usage of the "Ignore Invalid Values" option in handling data type conversion issues.
 *
 * Lucene connector ignore invalid values introduction<br>
 * <img src="resources/guides/connectors/lucene/connectors-lucene-fields-ignore-invalid-values-intro.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "connectors-lucene-fields-ignore-invalid-values-intro",
 * }
 * ```
 */
const step = {
  guideBlockName: 'connectors-lucene-fields-ignore-invalid-values-intro',
  /**
   * Options:
   * - <b>instanceName</b>: string (required) – the specific instance name of the Lucene connector.
   */
  getSteps: function(options, pluginService) {
    const translate = pluginService.translate;

    return [{
      guideBlockName: 'connectors-array-subparameter-intro',
      options: {
        content: translate(this.translationBundle, INVALID_VALUES_INTRO),
        title: translate(this.translationBundle, LUCENE_DEFAULT_TITLE),
        ...options,
        class: 'connectors-lucene-fields-ignore-invalid-values-intro',
        connectorName: LUCENE_CONNECTOR_NAME,
        parameterName: 'fields',
        subparameterName: 'ignoreInvalidValues'
      }
    }];
  },
  translationBundle: {
    en: {
      [LUCENE_DEFAULT_TITLE]: 'Lucene connector',
      [INVALID_VALUES_INTRO]: 'The <b>Ignore invalid values</b> option controls behavior when a value cannot be converted to the expected type. False by default.'
    },
    fr: {
      [LUCENE_DEFAULT_TITLE]: 'Connecteur Lucene',
      [INVALID_VALUES_INTRO]: 'L’option <b>Ignorer les valeurs invalides</b> contrôle le comportement lorsqu’une valeur ne peut pas être convertie vers le type attendu. False par défaut.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
