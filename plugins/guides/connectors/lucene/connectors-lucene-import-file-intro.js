const LUCENE_CONNECTOR_NAME = 'Lucene';
const LUCENE_DEFAULT_TITLE = 'guide.step_plugin.connectors-lucene.title';
const IMPORT_FILE = 'guide.step_plugin.connectors-lucene-import-file-intro.content';

/**
 * @name connectors-lucene-import-file-intro
 * @memberof module:Interactive Guide
 *
 * @description
 * This step is an introductory step for the "importFile" parameter of the Lucene connector in GraphDB.
 * It explains the purpose and usage of the "importFile" parameter, which allows creating a connector from an RDF file.
 *
 * Lucene connector importFile introduction<br>
 * <img src="resources/guides/connectors/lucene/connectors-lucene-import-file-intro.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "connectors-lucene-import-file-intro",
 * }
 * ```
 */
const step = {
  guideBlockName: 'connectors-lucene-import-file-intro',
  /**
   * Options:
   * - <b>instanceName</b>: string (required) – the specific instance name of the Lucene connector.
   */
  getSteps: function(options, pluginService) {
    const translate = pluginService.translate;

    return [{
      guideBlockName: 'connectors-parameter-intro',
      options: {
        content: translate(this.translationBundle, IMPORT_FILE),
        ...(options.title ?? {title: translate(this.translationBundle, LUCENE_DEFAULT_TITLE)}),
        ...options,
        class: 'connectors-lucene-import-file-intro',
        connectorName: LUCENE_CONNECTOR_NAME,
        parameterName: 'importFile'
      }
    }];
  },
  translationBundle: {
    en: {
      [LUCENE_DEFAULT_TITLE]: 'Lucene connector',
      [IMPORT_FILE]: 'The <b>importFile</b> parameter creates the connector from an RDF file. Requires <b>readonly</b> mode; the value must be the full path to the RDF file.'
    },
    fr: {
      [LUCENE_DEFAULT_TITLE]: 'Connecteur Lucene',
      [IMPORT_FILE]: 'Le paramètre <b>importFile</b> crée le connecteur à partir d’un fichier RDF. Nécessite le mode <b>lecture seule</b> ; la valeur doit être le chemin complet vers le fichier RDF.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
