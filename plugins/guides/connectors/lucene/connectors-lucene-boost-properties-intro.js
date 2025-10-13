const LUCENE_CONNECTOR_NAME = 'Lucene';
const LUCENE_DEFAULT_TITLE = 'guide.step_plugin.connectors-lucene.title';
const BOOST_PROPERTIES = 'guide.step_plugin.connectors-lucene-boost-properties-intro.content';

/**
 * @name connectors-lucene-boost-properties-intro
 * @memberof module:Interactive Guide
 *
 * @description
 * This step is an introductory step for the "boostProperties" parameter of the Lucene connector in GraphDB.
 * It explains the purpose and usage of the "boostProperties" in specifying document-specific boost properties.
 *
 * Lucene connector boost properties introduction<br>
 * <img src="resources/guides/connectors/lucene/connectors-lucene-boost-properties-intro.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "connectors-lucene-boost-properties-intro",
 * }
 * ```
 */
const step = {
  guideBlockName: 'connectors-lucene-boost-properties-intro',
  /**
   * Options:
   * - <b>instanceName</b>: string (required) – the specific instance name of the Lucene connector.
   */
  getSteps: function(options, pluginService) {
    const translate = pluginService.translate;

    return [{
      guideBlockName: 'connectors-parameter-intro',
      options: {
        content: translate(this.translationBundle, BOOST_PROPERTIES),
        ...(options.title ?? {title: translate(this.translationBundle, LUCENE_DEFAULT_TITLE)}),
        ...options,
        class: 'connectors-lucene-boost-properties-intro',
        connectorName: LUCENE_CONNECTOR_NAME,
        parameterName: 'boostProperties'
      }
    }];
  },
  translationBundle: {
    en: {
      [LUCENE_DEFAULT_TITLE]: 'Lucene connector',
      [BOOST_PROPERTIES]: 'The <b>boostProperties</b> parameter specifies a comma-delimited list of properties whose values will be used for document-specific boost.'
    },
    fr: {
      [LUCENE_DEFAULT_TITLE]: 'Connecteur Lucene',
      [BOOST_PROPERTIES]: 'Le paramètre <b>boostProperties</b> spécifie une liste de propriétés séparées par des virgules dont les valeurs seront utilisées pour un boost spécifique au document.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
