const LUCENE_CONNECTOR_NAME = 'Lucene';
const LUCENE_DEFAULT_TITLE = 'guide.step_plugin.connectors-lucene.title';
const MULTIVALUED_INTRO = 'guide.step_plugin.connectors-lucene-fields-multivalued-intro.content';

/**
 * @name connectors-lucene-fields-multivalued-intro
 * @memberof module:Interactive Guide
 *
 * @description
 * This step is an introductory step for the "Multivalued" sub-parameter within the fields configuration of the Lucene connector in GraphDB.
 * It explains the purpose and usage of the "Multivalued" option in determining whether multiple values for RDF properties are synchronized to Lucene.
 *
 * Lucene connector multivalued introduction<br>
 * <img src="resources/guides/connectors/lucene/connectors-lucene-fields-multivalued-intro.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "connectors-lucene-fields-multivalued-intro",
 * }
 * ```
 */
const step = {
  guideBlockName: 'connectors-lucene-fields-multivalued-intro',
  /**
   * Options:
   * - <b>instanceName</b>: string (required) – the specific instance name of the Lucene connector.
   */
  getSteps: function(options, pluginService) {
    const translate = pluginService.translate;

    return [{
      guideBlockName: 'connectors-array-subparameter-intro',
      options: {
        content: translate(this.translationBundle, MULTIVALUED_INTRO),
        title: translate(this.translationBundle, LUCENE_DEFAULT_TITLE),
        ...options,
        class: 'connectors-lucene-fields-multivalued-intro',
        connectorName: LUCENE_CONNECTOR_NAME,
        parameterName: 'fields',
        subparameterName: 'multivalued'
      }
    }];
  },
  translationBundle: {
    en: {
      [LUCENE_DEFAULT_TITLE]: 'Lucene connector',
      [MULTIVALUED_INTRO]: 'The <b>Multivalued</b> option specifies whether multiple values for RDF properties are synchronized to Lucene. True by default; if false, only a single value is synchronized.'
    },
    fr: {
      [LUCENE_DEFAULT_TITLE]: 'Connecteur Lucene',
      [MULTIVALUED_INTRO]: 'L’option <b>Multi-valeur</b> spécifie si plusieurs valeurs pour les propriétés RDF sont synchronisées avec Lucene. True par défaut ; si false, une seule valeur est synchronisée.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
