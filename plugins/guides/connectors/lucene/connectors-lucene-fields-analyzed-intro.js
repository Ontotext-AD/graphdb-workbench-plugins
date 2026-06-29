const LUCENE_CONNECTOR_NAME = 'Lucene';
const LUCENE_DEFAULT_TITLE = 'guide.step_plugin.connectors-lucene.title';
const ANALYZED_INTRO_CONTENT = 'guide.step_plugin.connectors-lucene-fields-analyzed-intro.content';

/**
 * @name connectors-lucene-fields-analyzed-intro
 * @memberof module:Interactive Guide
 *
 * @description
 * This step is an introductory step for the "Analyzed" sub-parameter within the fields configuration of the Lucene connector in GraphDB.
 * It explains the purpose and usage of the "Analyzed" option in determining whether literal fields are processed by the analyzer when indexed.
 *
 * Lucene connector analyzed introduction<br>
 * <img src="resources/guides/connectors/lucene/connectors-lucene-fields-analyzed-intro.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "connectors-lucene-fields-analyzed-intro",
 * }
 * ```
 */
const step = {
  guideBlockName: 'connectors-lucene-fields-analyzed-intro',
  /**
   * Options:
   * - <b>instanceName</b>: string (required) – the specific instance name of the Lucene connector.
   */
  getSteps: function(options, pluginService) {
    const translate = pluginService.translate;

    return [{
      guideBlockName: 'connectors-array-subparameter-intro',
      options: {
        content: translate(this.translationBundle, ANALYZED_INTRO_CONTENT),
        title: translate(this.translationBundle, LUCENE_DEFAULT_TITLE),
        ...options,
        class: 'connectors-lucene-fields-analyzed-intro',
        connectorName: LUCENE_CONNECTOR_NAME,
        parameterName: 'fields',
        subparameterName: 'analyzed'
      }
    }];
  },
  translationBundle: {
    en: {
      [LUCENE_DEFAULT_TITLE]: 'Lucene connector',
      [ANALYZED_INTRO_CONTENT]: 'The <b>Analyzed</b> option determines whether literal fields are processed by the analyzer when indexed. IRIs are never analyzed. By default, fields are analyzed (true).'
    },
    fr: {
      [LUCENE_DEFAULT_TITLE]: 'Connecteur Lucene',
      [ANALYZED_INTRO_CONTENT]: 'L’option <b>Analysé</b> détermine si les champs littéraux sont traités par l’analyseur lors de l’indexation. Les IRI ne sont jamais analysés. Par défaut, les champs sont analysés (true).'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
