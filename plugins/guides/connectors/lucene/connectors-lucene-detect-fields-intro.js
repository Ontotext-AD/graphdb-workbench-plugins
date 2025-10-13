const LUCENE_CONNECTOR_NAME = 'Lucene';
const LUCENE_DEFAULT_TITLE = 'guide.step_plugin.connectors-lucene.title';
const DETECT_FIELDS = 'guide.step_plugin.connectors-lucene-detect-fields-intro.content';

/**
 * @name connectors-lucene-detect-fields-intro
 * @memberof module:Interactive Guide
 *
 * @description
 * This step is an introductory step for the "detectFields" parameter of the Lucene connector in GraphDB.
 * It explains the purpose and usage of the "detectFields" parameter in enabling automatic field detection.
 *
 * Lucene connector detect fields introduction<br>
 * <img src="resources/guides/connectors/lucene/connectors-lucene-detect-fields-intro.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "connectors-lucene-detect-fields-intro",
 * }
 * ```
 */
const step = {
  guideBlockName: 'connectors-lucene-detect-fields-intro',
  /**
   * Options:
   * - <b>instanceName</b>: string (required) – the specific instance name of the Lucene connector.
   */
  getSteps: function(options, pluginService) {
    const translate = pluginService.translate;

    return [{
      guideBlockName: 'connectors-parameter-intro',
      options: {
        content: translate(this.translationBundle, DETECT_FIELDS),
        ...(options.title ?? {title: translate(this.translationBundle, LUCENE_DEFAULT_TITLE)}),
        ...options,
        class: 'connectors-lucene-detect-fields-intro',
        connectorName: LUCENE_CONNECTOR_NAME,
        parameterName: 'detectFields'
      }
    }];
  },
  translationBundle: {
    en: {
      [LUCENE_DEFAULT_TITLE]: 'Lucene connector',
      [DETECT_FIELDS]: 'The <b>detectFields</b> parameter enables automatic field detection. When true, each predicate becomes a field and specifying fields in JSON is optional. Types are optional; all types are indexed if omitted. Requires <b>importGraph</b> or <b>importFile</b>.'
    },
    fr: {
      [LUCENE_DEFAULT_TITLE]: 'Connecteur Lucene',
      [DETECT_FIELDS]: 'Le paramètre <b>detectFields</b> active la détection automatique des champs. Quand il est à true, chaque prédicat devient un champ et la spécification des champs en JSON est facultative. Les types sont optionnels ; tous les types sont indexés s’ils sont omis. Nécessite <b>importGraph</b> ou <b>importFile</b>.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
