const LUCENE_CONNECTOR_NAME = 'Lucene';
const LUCENE_DEFAULT_TITLE = 'guide.step_plugin.connectors-lucene.title';
const ANALYZER_INTRO = 'guide.step_plugin.connectors-lucene-analyzer-intro.content';

/**
 * @name connectors-lucene-analyzer-intro
 * @memberof module:Interactive Guide
 *
 * @description
 * This step is an introductory step for the "Analyzer" parameter of the Lucene connector in GraphDB.
 * It explains the purpose and usage of the "Analyzer" parameter in defining a custom Lucene Analyzer.
 *
 * Lucene connector analyzer introduction<br>
 * <img src="resources/guides/connectors/lucene/connectors-lucene-analyzer-intro.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "connectors-lucene-analyzer-intro",
 * }
 * ```
 */
const step = {
  guideBlockName: 'connectors-lucene-analyzer-intro',
  /**
   * Options:
   * - <b>instanceName</b>: string (required) – the specific instance name of the Lucene connector.
   */
  getSteps: function(options, pluginService) {
    const translate = pluginService.translate;

    return [{
      guideBlockName: 'connectors-parameter-intro',
      options: {
        content: translate(this.translationBundle, ANALYZER_INTRO),
        title: translate(this.translationBundle, LUCENE_DEFAULT_TITLE),
        ...options,
        class: 'connectors-lucene-analyzer-intro',
        connectorName: LUCENE_CONNECTOR_NAME,
        parameterName: 'analyzer'
      }
    }];
  },
  translationBundle: {
    en: {
      [LUCENE_DEFAULT_TITLE]: 'Lucene connector',
      [ANALYZER_INTRO]: 'The <b>analyzer</b> parameter specifies a custom Lucene Analyzer. The value must be the fully qualified name of a class extending org.apache.lucene.analysis.Analyzer with either a default constructor or a constructor accepting a org.apache.lucene.util.Version parameter.'
    },
    fr: {
      [LUCENE_DEFAULT_TITLE]: 'Connecteur Lucene',
      [ANALYZER_INTRO]: 'Le paramètre <b>analyzer</b> spécifie un analyseur Lucene personnalisé. La valeur doit être le nom complet d’une classe étendant org.apache.lucene.analysis.Analyzer avec soit un constructeur par défaut, soit un constructeur acceptant un paramètre org.apache.lucene.util.Version.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
