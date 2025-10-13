const LUCENE_CONNECTOR_NAME = 'Lucene';
const LUCENE_DEFAULT_TITLE = 'guide.step_plugin.connectors-lucene.title';
const FIELD_NAME_INTRO_CONTENT = 'guide.step_plugin.connectors-lucene-fields-field-name-intro.content';

/**
 * @name connectors-lucene-fields-field-name-intro
 * @memberof module:Interactive Guide
 *
 * @description
 * This step is an introductory step for the "Field name" sub-parameter within the fields configuration of the Lucene connector in GraphDB.
 * It explains the purpose and usage of the "Field name" in mapping data between GraphDB and Lucene.
 *
 * Lucene connector field name introduction<br>
 * <img src="resources/guides/connectors/lucene/connectors-lucene-fields-field-name-intro.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "connectors-lucene-fields-field-name-intro",
 * }
 * ```
 */
const step = {
  guideBlockName: 'connectors-lucene-fields-field-name-intro',
  /**
   * Options:
   * - <b>instanceName</b>: string (required) – the specific instance name of the Lucene connector.
   */
  getSteps: function(options, pluginService) {
    const translate = pluginService.translate;

    return [{
      guideBlockName: 'connectors-array-subparameter-intro',
      options: {
        content: translate(this.translationBundle, FIELD_NAME_INTRO_CONTENT),
        ...(options.title ? {} : {title: translate(this.translationBundle, LUCENE_DEFAULT_TITLE)}),
        ...options,
        class: 'connectors-lucene-fields-field-name-intro',
        connectorName: LUCENE_CONNECTOR_NAME,
        parameterName: 'fields',
        subparameterName: 'fieldName'
      }
    }];
  },
  translationBundle: {
    en: {
      [LUCENE_DEFAULT_TITLE]: 'Lucene connector',
      [FIELD_NAME_INTRO_CONTENT]: 'The <b>Field name</b> defines the mapping on the connector side and is specified as a string. It is also used at query time to reference the field.'
    },
    fr: {
      [LUCENE_DEFAULT_TITLE]: 'Connecteur Lucene',
      [FIELD_NAME_INTRO_CONTENT]: 'Le <b>nom du champ</b> définit le mappage du côté du connecteur et est spécifié sous forme de chaîne. Il est également utilisé lors des requêtes pour référencer le champ.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
