const LUCENE_CONNECTOR_NAME = 'Lucene';
const LUCENE_DEFAULT_TITLE = 'guide.step_plugin.connectors-lucene.title';
const REMAINING_FIELDS_INTRO = 'guide.step_plugin.connectors-lucene-fields-remaining-fields-intro.content';

/**
 * @name connectors-lucene-fields-remaining-fields-intro
 * @memberof module:Interactive Guide
 *
 * @description
 * This step showcases the remaining fields of a Lucene connector instance.
 * We might have more than one field mapping for a Lucene connector instance.
 *
 * Lucene connector remaining fields<br>
 * <img src="resources/guides/connectors/lucene/connectors-lucene-fields-remaining-fields-intro.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "connectors-lucene-fields-remaining-fields-intro",
 * }
 * ```
 */
const step = {
  guideBlockName: 'connectors-lucene-fields-remaining-fields-intro',
  /**
   * Options:
   * - <b>instanceName</b>: string (required) – the specific instance name of the Lucene connector.
   */
  getSteps: function(options, pluginService) {
    const translate = pluginService.translate;
    return [{
      guideBlockName: 'connectors-parameter-fields-remaining-fields-intro',
      options: {
        content: translate(step.translationBundle, REMAINING_FIELDS_INTRO),
        title: translate(this.translationBundle, LUCENE_DEFAULT_TITLE),
        ...options,
        class: 'connectors-lucene-fields-remaining-fields-intro',
        parameterName: 'fields',
        connectorName: LUCENE_CONNECTOR_NAME
      }
    }];
  },
  translationBundle: {
    en: {
      [LUCENE_DEFAULT_TITLE]: 'Lucene connector',
      [REMAINING_FIELDS_INTRO]: 'This lucene connector configuration contains multiple field mappings. They determine which values are searchable, filterable, or retrievable during query execution.'
    },
    fr: {
      [LUCENE_DEFAULT_TITLE]: 'Connecteur Lucene',
      [REMAINING_FIELDS_INTRO]: 'Cette configuration du connecteur Lucene contient plusieurs mappages de champs. Ils déterminent quelles valeurs sont recherchables, filtrables ou récupérables lors de l\'exécution de la requête.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
