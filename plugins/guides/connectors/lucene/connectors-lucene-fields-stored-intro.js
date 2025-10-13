const LUCENE_CONNECTOR_NAME = 'Lucene';
const LUCENE_DEFAULT_TITLE = 'guide.step_plugin.connectors-lucene.title';
const STORED_INTRO = 'guide.step_plugin.connectors-lucene-fields-stored-intro.content';

/**
 * @name connectors-lucene-fields-stored-intro
 * @memberof module:Interactive Guide
 *
 * @description
 * This step is an introductory step for the "Stored" sub-parameter within the fields configuration of the Lucene connector in GraphDB.
 * It explains the purpose and usage of the "Stored" option in determining whether a field's values are stored in Lucene.
 *
 * Lucene connector stored introduction<br>
 * <img src="resources/guides/connectors/lucene/connectors-lucene-fields-stored-intro.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "connectors-lucene-fields-stored-intro",
 * }
 * ```
 */
const step = {
  guideBlockName: 'connectors-lucene-fields-stored-intro',
  /**
   * Options:
   * - <b>instanceName</b>: string (required) – the specific instance name of the Lucene connector.
   */
  getSteps: function(options, pluginService) {
    const translate = pluginService.translate;

    return [{
      guideBlockName: 'connectors-array-subparameter-intro',
      options: {
        content: translate(this.translationBundle, STORED_INTRO),
        ...(options.title ?? {title: translate(this.translationBundle, LUCENE_DEFAULT_TITLE)}),
        ...options,
        class: 'connectors-lucene-fields-stored-intro',
        connectorName: LUCENE_CONNECTOR_NAME,
        parameterName: 'fields',
        subparameterName: 'stored'
      }
    }];
  },
  translationBundle: {
    en: {
      [LUCENE_DEFAULT_TITLE]: 'Lucene connector',
      [STORED_INTRO]: 'The <b>Stored</b> option determines whether the field’s values are stored in Lucene. By default, fields are stored (true).'
    },
    fr: {
      [LUCENE_DEFAULT_TITLE]: 'Connecteur Lucene',
      [STORED_INTRO]: 'L’option <b>Stocké</b> détermine si les valeurs du champ sont stockées dans Lucene. Par défaut, les champs sont stockés (true).'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
