const LUCENE_CONNECTOR_NAME = 'Lucene';
const LUCENE_DEFAULT_TITLE = 'guide.step_plugin.connectors-lucene.title';
const STRIP_MARKUP = 'guide.step_plugin.connectors-lucene-strip-markup-intro.content';

/**
 * @name connectors-lucene-strip-markup-intro
 * @memberof module:Interactive Guide
 *
 * @description
 * This step is an introductory step for the "stripMarkup" parameter of the Lucene connector in GraphDB.
 * It explains the purpose and usage of the "stripMarkup" parameter in mapping data between GraphDB and Lucene.
 *
 * Lucene connector stripMarkup introduction<br>
 * <img src="resources/guides/connectors/lucene/connectors-lucene-strip-markup-intro.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "connectors-lucene-strip-markup-intro",
 * }
 * ```
 */
const step = {
  guideBlockName: 'connectors-lucene-strip-markup-intro',
  /**
   * Options:
   * - <b>instanceName</b>: string (required) – the specific instance name of the Lucene connector.
   */
  getSteps: function(options, pluginService) {
    const translate = pluginService.translate;

    return [{
      guideBlockName: 'connectors-parameter-intro',
      options: {
        content: translate(this.translationBundle, STRIP_MARKUP),
        ...(options.title ?? {title: translate(this.translationBundle, LUCENE_DEFAULT_TITLE)}),
        ...options,
        class: 'connectors-lucene-strip-markup-intro',
        connectorName: LUCENE_CONNECTOR_NAME,
        parameterName: 'stripMarkup'
      }
    }];
  },
  translationBundle: {
    en: {
      [LUCENE_DEFAULT_TITLE]: 'Lucene connector',
      [STRIP_MARKUP]: 'The <b>stripMarkup</b> parameter specifies whether HTML or XML tags should be removed from literal values.'
    },
    fr: {
      [LUCENE_DEFAULT_TITLE]: 'Connecteur Lucene',
      [STRIP_MARKUP]: 'Le paramètre <b>stripMarkup</b> spécifie si les balises HTML ou XML doivent être supprimées des valeurs littérales.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
