const LUCENE_CONNECTOR_NAME = 'Lucene';
const LUCENE_DEFAULT_TITLE = 'guide.step_plugin.connectors-lucene.title';
const INDEXED_INTRO = 'guide.step_plugin.connectors-lucene-fields-indexed-intro.content';

/**
 * @name connectors-lucene-fields-indexed-intro
 * @memberof module:Interactive Guide
 *
 * @description
 * This step is an introductory step for the "Indexed" sub-parameter within the fields configuration of the Lucene connector in GraphDB.
 * It explains the purpose and usage of the "Indexed" option in determining whether a field is searchable with Lucene queries.
 *
 * Lucene connector indexed introduction<br>
 * <img src="resources/guides/connectors/lucene/connectors-lucene-fields-indexed-intro.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "connectors-lucene-fields-indexed-intro",
 * }
 * ```
 */
const step = {
  guideBlockName: 'connectors-lucene-fields-indexed-intro',
  /**
   * Options:
   * - <b>instanceName</b>: string (required) – the specific instance name of the Lucene connector.
   */
  getSteps: function(options, pluginService) {
    const translate = pluginService.translate;

    return [{
      guideBlockName: 'connectors-array-subparameter-intro',
      options: {
        content: translate(this.translationBundle, INDEXED_INTRO),
        ...(options.title ?? {title: translate(this.translationBundle, LUCENE_DEFAULT_TITLE)}),
        ...options,
        class: 'connectors-lucene-fields-indexed-intro',
        connectorName: LUCENE_CONNECTOR_NAME,
        parameterName: 'fields',
        subparameterName: 'indexed'
      }
    }];
  },
  translationBundle: {
    en: {
      [LUCENE_DEFAULT_TITLE]: 'Lucene connector',
      [INDEXED_INTRO]: 'The <b>Indexed</b> option determines whether the field is searchable with Lucene queries. By default, indexing is enabled.'
    },
    fr: {
      [LUCENE_DEFAULT_TITLE]: 'Connecteur Lucene',
      [INDEXED_INTRO]: 'L’option <b>Indexé</b> détermine si le champ est interrogeable avec les requêtes Lucene. Par défaut, l’indexation est activée.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
