const LUCENE_CONNECTOR_NAME = 'Lucene';
const LUCENE_DEFAULT_TITLE = 'guide.step_plugin.connectors-lucene.title';
const DOCUMENT_FILTER = 'guide.step_plugin.connectors-lucene-document-filter-intro.content';

/**
 * @name connectors-lucene-document-filter-intro
 * @memberof module:Interactive Guide
 *
 * @description
 * This step is an introductory step for the "Document filter" parameter of the Lucene connector in GraphDB.
 * It explains the purpose and usage of the "Document filter" in defining a top-level document filter for documents.
 *
 * Lucene connector document filter introduction<br>
 * <img src="resources/guides/connectors/lucene/connectors-lucene-document-filter-intro.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "connectors-lucene-document-filter-intro",
 * }
 * ```
 */
const step = {
  guideBlockName: 'connectors-lucene-document-filter-intro',
  /**
   * Options:
   * - <b>instanceName</b>: string (required) – the specific instance name of the Lucene connector.
   */
  getSteps: function(options, pluginService) {
    const translate = pluginService.translate;

    return [{
      guideBlockName: 'connectors-parameter-intro',
      options: {
        content: translate(this.translationBundle, DOCUMENT_FILTER),
        ...(options.title ?? {title: translate(this.translationBundle, LUCENE_DEFAULT_TITLE)}),
        ...options,
        class: 'connectors-lucene-document-filter-intro',
        connectorName: LUCENE_CONNECTOR_NAME,
        parameterName: 'documentFilter'
      }
    }];
  },
  translationBundle: {
    en: {
      [LUCENE_DEFAULT_TITLE]: 'Lucene connector',
      [DOCUMENT_FILTER]: 'The <b>Document filter</b> is an optional string defining a top-level document filter for the document.'
    },
    fr: {
      [LUCENE_DEFAULT_TITLE]: 'Connecteur Lucene',
      [DOCUMENT_FILTER]: 'Le <b>filtre de document</b> est une chaîne optionnelle définissant un filtre de document au niveau supérieur.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
