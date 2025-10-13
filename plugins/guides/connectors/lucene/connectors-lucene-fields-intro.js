const LUCENE_CONNECTOR_NAME = 'Lucene';
const LUCENE_DEFAULT_TITLE = 'guide.step_plugin.connectors-lucene.title';
const FIELD_INTRO_CONTENT = 'guide.step_plugin.connectors-lucene-fields-intro.content';

/**
 * @name connectors-lucene-fields-intro
 * @memberof module:Interactive Guide
 *
 * @description
 * This step is an introductory step for the fields configuration of the Lucene connector in GraphDB.
 * It provides an overview of how fields define the synchronization units between GraphDB and Lucene.
 *
 * Lucene connector fields introduction<br>
 * <img src="resources/guides/connectors/lucene/connectors-lucene-fields-intro.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "connectors-lucene-fields-intro",
 * }
 * ```
 */
const step = {
  guideBlockName: 'connectors-lucene-fields-intro',
  /**
   * Options:
   * - <b>instanceName</b>: string (required) – the specific instance name of the Lucene connector.
   */
  getSteps: function(options, pluginService) {
    const translate = pluginService.translate;
    return [{
      guideBlockName: 'connectors-parameter-intro',
      options: {
        content: translate(this.translationBundle, FIELD_INTRO_CONTENT),
        ...(options.title ?? {title: translate(this.translationBundle, LUCENE_DEFAULT_TITLE)}),
        ...options,
        class: 'connectors-lucene-fields-intro',
        connectorName: LUCENE_CONNECTOR_NAME,
        parameterName: 'fields'
      }
    }];
  },
  translationBundle: {
    en: {
      [LUCENE_DEFAULT_TITLE]: 'Lucene connector',
      [FIELD_INTRO_CONTENT]: 'The fields define exactly what parts of each entity will be synchronized as well as the specific details on the connector side. The field is the smallest synchronization unit, and it maps a property chain from GraphDB to a field in Lucene. The fields are specified as a list of field objects. At least one field object is required.'
    },
    fr: {
      [LUCENE_DEFAULT_TITLE]: 'Connecteur Lucene',
      [FIELD_INTRO_CONTENT]: 'Les champs définissent exactement quelles parties de chaque entité seront synchronisées ainsi que les détails spécifiques du côté du connecteur. Le champ est la plus petite unité de synchronisation et il mappe une chaîne de propriétés de GraphDB vers un champ dans Lucene. Les champs sont spécifiés sous forme de liste d’objets champ. Au moins un objet champ est requis.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
