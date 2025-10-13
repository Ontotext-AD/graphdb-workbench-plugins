const LUCENE_CONNECTOR_NAME = 'Lucene';
const LUCENE_DEFAULT_TITLE = 'guide.step_plugin.connectors-lucene.title';
const LUCENE_TYPE_INTRO = 'guide.step_plugin.connectors-lucene-type-intro.content';

/**
 * @name connectors-lucene-type-intro
 * @memberof module:Interactive Guide
 *
 * @description
 * This step is an introductory step for the Lucene connector in GraphDB.
 * It provides an overview of the connector's capabilities and its integration with the repository data.
 *
 * Lucene connector introduction<br>
 * <img src="resources/guides/connectors/lucene/connectors-lucene-type-intro.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "connectors-lucene-type-intro",
 * }
 * ```
 */
const step = {
  guideBlockName: 'connectors-lucene-type-intro',
  getSteps: function(options, pluginService) {
    const translate = pluginService.translate;

    return [{
      guideBlockName: 'connectors-type-intro',
      options: {
        content: translate(this.translationBundle, LUCENE_TYPE_INTRO),
        ...(options.title ?? {title: translate(this.translationBundle, LUCENE_DEFAULT_TITLE)}),
        ...options,
        connectorName: LUCENE_CONNECTOR_NAME,
        class: 'connectors-lucene-type-intro'
      }
    }];
  },
  translationBundle: {
    en: {
      [LUCENE_DEFAULT_TITLE]: 'Lucene connector',
      [LUCENE_TYPE_INTRO]: 'The Lucene Connector in GraphDB enables extremely fast keyword and faceted (aggregation) searches. Unlike traditional setups where indexing is handled externally, this connector stays automatically synchronized with your repository data, ensuring accurate and up-to-date search results at all times.'
    },
    fr: {
      [LUCENE_DEFAULT_TITLE]: 'Connecteur Lucene',
      [LUCENE_TYPE_INTRO]: 'Le connecteur Lucene dans GraphDB permet des recherches par mots-clés et par facettes (agrégation) extrêmement rapides. Contrairement aux configurations traditionnelles où l’indexation est gérée de manière externe, ce connecteur reste automatiquement synchronisé avec les données de votre référentiel, garantissant des résultats de recherche précis et à jour en permanence.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
