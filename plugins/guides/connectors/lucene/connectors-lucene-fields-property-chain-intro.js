const LUCENE_CONNECTOR_NAME = 'Lucene';
const LUCENE_DEFAULT_TITLE = 'guide.step_plugin.connectors-lucene.title';
const PROPERTY_CHAIN_INTRO_CONTENT = 'guide.step_plugin.connectors-lucene-fields-property-chain-intro.content';

/**
 * @name connectors-lucene-fields-property-chain-intro
 * @memberof module:Interactive Guide
 *
 * @description
 * This step is an introductory step for the "Property chain" sub-parameter within the fields configuration of the Lucene connector in GraphDB.
 * It explains the purpose and usage of the "Property chain" in mapping data between GraphDB and Lucene.
 *
 * Lucene connector property chain introduction<br>
 * <img src="resources/guides/connectors/lucene/connectors-lucene-fields-property-chain-intro.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "connectors-lucene-fields-property-chain-intro",
 * }
 * ```
 */
const step = {
  guideBlockName: 'connectors-lucene-fields-property-chain-intro',
  /**
   * Options:
   * - <b>instanceName</b>: string (required) – the specific instance name of the Lucene connector.
   */
  getSteps: function(options, pluginService) {
    const translate = pluginService.translate;

    return [{
      guideBlockName: 'connectors-array-subparameter-intro',
      options: {
        content: translate(this.translationBundle, PROPERTY_CHAIN_INTRO_CONTENT),
        ...(options.title ?? {title: translate(this.translationBundle, LUCENE_DEFAULT_TITLE)}),
        ...options,
        class: 'connectors-lucene-fields-property-chain-intro',
        connectorName: LUCENE_CONNECTOR_NAME,
        parameterName: 'fields',
        subparameterName: 'propertyChain'
      }
    }];
  },
  translationBundle: {
    en: {
      [LUCENE_DEFAULT_TITLE]: 'Lucene connector',
      [PROPERTY_CHAIN_INTRO_CONTENT]: 'The <b>Property chain</b> defines the mapping on the GraphDB side. A property chain is a sequence of triples where the entity IRI is the subject of the first triple, its object is the subject of the next triple, and so on. A single-element property chain corresponds to a direct property. Property chains are specified as a list of IRIs, with at least one required.'
    },
    fr: {
      [LUCENE_DEFAULT_TITLE]: 'Connecteur Lucene',
      [PROPERTY_CHAIN_INTRO_CONTENT]: 'La <b>chaîne de propriétés</b> définit le mappage du côté GraphDB. Une chaîne de propriétés est une séquence de triplets où l’IRI de l’entité est le sujet du premier triplet, son objet est le sujet du suivant, et ainsi de suite. Une chaîne à un seul élément correspond à une propriété directe. Les chaînes de propriétés sont spécifiées comme une liste d’IRI, avec au moins un requis.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
