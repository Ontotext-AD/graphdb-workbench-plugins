const LUCENE_CONNECTOR_NAME = 'Lucene';
const LUCENE_DEFAULT_TITLE = 'guide.step_plugin.connectors-lucene.title';
const DATATYPE_INTRO = 'guide.step_plugin.connectors-lucene-fields-datatype-intro.content';

/**
 * @name connectors-lucene-fields-datatype-intro
 * @memberof module:Interactive Guide
 *
 * @description
 * This step is an introductory step for the "Datatype" sub-parameter within the fields configuration of the Lucene connector in GraphDB.
 * It explains the purpose and usage of the "Datatype" in mapping data between GraphDB and Lucene.
 *
 * Lucene connector datatype introduction<br>
 * <img src="resources/guides/connectors/lucene/connectors-lucene-fields-datatype-intro.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "connectors-lucene-fields-datatype-intro",
 * }
 * ```
 */
const step = {
  guideBlockName: 'connectors-lucene-fields-datatype-intro',
  /**
   * Options:
   * - <b>instanceName</b>: string (required) – the specific instance name of the Lucene connector.
   */
  getSteps: function(options, pluginService) {
    const translate = pluginService.translate;

    return [{
      guideBlockName: 'connectors-array-subparameter-intro',
      options: {
        content: translate(this.translationBundle, DATATYPE_INTRO),
        ...(options.title ?? {title: translate(this.translationBundle, LUCENE_DEFAULT_TITLE)}),
        ...options,
        class: 'connectors-lucene-fields-datatype-intro',
        connectorName: LUCENE_CONNECTOR_NAME,
        parameterName: 'fields',
        subparameterName: 'datatype'
      }
    }];
  },
  translationBundle: {
    en: {
      [LUCENE_DEFAULT_TITLE]: 'Lucene connector',
      [DATATYPE_INTRO]: 'The <b>Datatype</b> defines how literal values are mapped to Lucene types. By default, this is inferred from the datatype, but it can be overridden per field using the datatype parameter with any supported xsd: type.'
    },
    fr: {
      [LUCENE_DEFAULT_TITLE]: 'Connecteur Lucene',
      [DATATYPE_INTRO]: 'Le <b>datatype</b> définit comment les valeurs littérales sont mappées aux types Lucene. Par défaut, cela est déduit du datatype, mais cela peut être remplacé par champ en utilisant le paramètre datatype avec tout type xsd: pris en charge.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
