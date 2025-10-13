const LUCENE_CONNECTOR_NAME = 'Lucene';
const LUCENE_DEFAULT_TITLE = 'guide.step_plugin.connectors-lucene.title';
const TRANSFORM_INTRO_CONTENT = 'guide.step_plugin.connectors-lucene-fields-field-name-transform-intro.content';

/**
 * @name connectors-lucene-fields-field-name-transform-intro
 * @memberof module:Interactive Guide
 *
 * @description
 * This step is an introductory step for the "Field name transform" sub-parameter within the fields configuration of the Lucene connector in GraphDB.
 * It explains the purpose and usage of the "Field name transform" in mapping data between GraphDB and Lucene.
 *
 * Lucene connector field name transform introduction<br>
 * <img src="resources/guides/connectors/lucene/connectors-lucene-fields-field-name-transform-intro.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "connectors-lucene-fields-field-name-transform-intro",
 * }
 * ```
 */
const step = {
  guideBlockName: 'connectors-lucene-fields-field-name-transform-intro',
  /**
   * Options:
   * - <b>instanceName</b>: string (required) – the specific instance name of the Lucene connector.
   */
  getSteps: function(options, pluginService) {
    const translate = pluginService.translate;

    return [{
      guideBlockName: 'connectors-array-subparameter-intro',
      options: {
        content: translate(this.translationBundle, TRANSFORM_INTRO_CONTENT),
        ...(options.title ?? {title: translate(this.translationBundle, LUCENE_DEFAULT_TITLE)}),
        ...options,
        class: 'connectors-lucene-fields-field-name-transform-intro',
        connectorName: LUCENE_CONNECTOR_NAME,
        parameterName: 'fields',
        subparameterName: 'fieldNameTransform'
      }
    }];
  },
  translationBundle: {
    en: {
      [LUCENE_DEFAULT_TITLE]: 'Lucene connector',
      [TRANSFORM_INTRO_CONTENT]: 'The <b>Field name transform</b> defines an optional transformation of the field name.<ul><li><b>none</b>: The field name is supplied via the fieldName option.</li><li><b>predicate</b>: The field name is equal to the full IRI of the last predicate of the chain. For example, if the last predicate was http://www.w3.org/2000/01/rdf-schema#label, the field name will also be http://www.w3.org/2000/01/rdf-schema#label.</li><li><b>predicate.localName</b>: The field name is derived from the local name of the IRI of the last predicate of the chain. For example, if the last predicate was http://www.w3.org/2000/01/rdf-schema#comment, the field name will be comment.</li></ul>'
    },
    fr: {
      [LUCENE_DEFAULT_TITLE]: 'Connecteur Lucene',
      [TRANSFORM_INTRO_CONTENT]: 'La <b>transformation du nom du champ</b> définit une transformation optionnelle du nom du champ.<ul><li><b>none</b> : le nom du champ est fourni via l’option fieldName.</li><li><b>predicate</b> : le nom du champ est égal à l’IRI complet du dernier prédicat de la chaîne. Par exemple, si le dernier prédicat est http://www.w3.org/2000/01/rdf-schema#label, le nom du champ sera également http://www.w3.org/2000/01/rdf-schema#label.</li><li><b>predicate.localName</b> : le nom du champ est dérivé du nom local de l’IRI du dernier prédicat de la chaîne. Par exemple, si le dernier prédicat est http://www.w3.org/2000/01/rdf-schema#comment, le nom du champ sera comment.</li></ul>'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
