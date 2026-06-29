const LUCENE_CONNECTOR_NAME = 'Lucene';
const LUCENE_DEFAULT_TITLE = 'guide.step_plugin.connectors-lucene.title';
const LANGUAGES_INTRO = 'guide.step_plugin.connectors-lucene-languages-intro.content';

/**
 * @name connectors-lucene-languages-intro
 * @memberof module:Interactive Guide
 *
 * @description
 * This step is an introductory step for the "Languages" parameter within the Lucene connector configuration in GraphDB.
 * It explains the purpose and usage of the "Languages" option in mapping RDF literal languages to the connector.
 *
 * Lucene connector languages introduction<br>
 * <img src="resources/guides/connectors/lucene/connectors-lucene-languages-intro.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "connectors-lucene-languages-intro",
 * }
 * ```
 */
const step = {
  guideBlockName: 'connectors-lucene-languages-intro',
  /**
   * Options:
   * - <b>instanceName</b>: string (required) – the specific instance name of the Lucene connector.
   */
  getSteps: function(options, pluginService) {
    const translate = pluginService.translate;

    return [{
      guideBlockName: 'connectors-parameter-intro',
      options: {
        content: translate(this.translationBundle, LANGUAGES_INTRO),
        title: translate(this.translationBundle, LUCENE_DEFAULT_TITLE),
        ...options,
        class: 'connectors-lucene-languages-intro',
        connectorName: LUCENE_CONNECTOR_NAME,
        parameterName: 'languages'
      }
    }];
  },
  translationBundle: {
    en: {
      [LUCENE_DEFAULT_TITLE]: 'Lucene connector',
      [LANGUAGES_INTRO]: 'The <b>Languages</b> option defines which RDF literal languages are mapped to the connector. You can provide a list of language ranges to include specific languages, or an empty range to include literals without a language tag.'
    },
    fr: {
      [LUCENE_DEFAULT_TITLE]: 'Connecteur Lucene',
      [LANGUAGES_INTRO]: 'L’option <b>Langues</b> définit quelles langues de littéraux RDF sont mappées vers le connecteur. Vous pouvez fournir une liste de plages de langues pour inclure des langues spécifiques, ou une plage vide pour inclure les littéraux sans balise de langue.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
