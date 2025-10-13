const LUCENE_CONNECTOR_NAME = 'Lucene';
const LUCENE_DEFAULT_TITLE = 'guide.step_plugin.connectors-lucene.title';
const SKIP_INITIAL_INDEXING = 'guide.step_plugin.connectors-lucene-skip-initial-indexing-intro.content';

/**
 * @name connectors-lucene-skip-initial-indexing-intro
 * @memberof module:Interactive Guide
 *
 * @description
 * This step is an introductory step for the "skipInitialIndexing" parameter of the Lucene connector in GraphDB.
 * It explains the purpose and usage of the "skipInitialIndexing" parameter in controlling the initial indexing behavior.
 *
 * Lucene connector skipInitialIndexing introduction<br>
 * <img src="resources/guides/connectors/lucene/connectors-lucene-skip-initial-indexing-intro.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "connectors-lucene-skip-initial-indexing-intro",
 * }
 * ```
 */
const step = {
  guideBlockName: 'connectors-lucene-skip-initial-indexing-intro',
  /**
   * Options:
   * - <b>instanceName</b>: string (required) – the specific instance name of the Lucene connector.
   */
  getSteps: function(options, pluginService) {
    const translate = pluginService.translate;

    return [{
      guideBlockName: 'connectors-parameter-intro',
      options: {
        content: translate(this.translationBundle, SKIP_INITIAL_INDEXING),
        ...(options.title ?? {title: translate(this.translationBundle, LUCENE_DEFAULT_TITLE)}),
        ...options,
        class: 'connectors-lucene-skip-initial-indexing-intro',
        connectorName: LUCENE_CONNECTOR_NAME,
        parameterName: 'skipInitialIndexing'
      }
    }];
  },
  translationBundle: {
    en: {
      [LUCENE_DEFAULT_TITLE]: 'Lucene connector',
      [SKIP_INITIAL_INDEXING]: 'The <b>skipInitialIndexing</b> parameter, when enabled, skips the initial indexing but allows incremental updates to be processed normally.'
    },
    fr: {
      [LUCENE_DEFAULT_TITLE]: 'Connecteur Lucene',
      [SKIP_INITIAL_INDEXING]: 'Le paramètre <b>skipInitialIndexing</b>, lorsqu’il est activé, ignore l’indexation initiale mais permet aux mises à jour incrémentales d’être traitées normalement.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
