const LUCENE_CONNECTOR_NAME = 'Lucene';
const LUCENE_DEFAULT_TITLE = 'guide.step_plugin.connectors-lucene.title';
const TYPES_INTRO = 'guide.step_plugin.connectors-lucene-types-intro.content';

/**
 * @name connectors-lucene-types-intro
 * @memberof module:Interactive Guide
 *
 * @description
 * This step is an introductory step for the "Types" parameter within the Lucene connector configuration in GraphDB.
 * It explains the purpose and usage of the "Types" option in specifying RDF types of entities to synchronize.
 *
 * Lucene connector types introduction<br>
 * <img src="resources/guides/connectors/lucene/connectors-lucene-types-intro.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "connectors-lucene-types-intro",
 * }
 * ```
 */
const step = {
  guideBlockName: 'connectors-lucene-types-intro',
  /**
   * Options:
   * - <b>instanceName</b>: string (required) – the specific instance name of the Lucene connector.
   */
  getSteps: function(options, pluginService) {
    const translate = pluginService.translate;

    return [{
      guideBlockName: 'connectors-parameter-intro',
      options: {
        content: translate(this.translationBundle, TYPES_INTRO),
        title: translate(this.translationBundle, LUCENE_DEFAULT_TITLE),
        ...options,
        class: 'connectors-lucene-types-intro',
        connectorName: LUCENE_CONNECTOR_NAME,
        parameterName: 'types'
      }
    }];
  },
  translationBundle: {
    en: {
      [LUCENE_DEFAULT_TITLE]: 'Lucene connector',
      [TYPES_INTRO]: 'The <b>Types</b> option specifies RDF types of entities to synchronize, given as a list of IRIs (at least one required).<ul>Special values: <li><b>$any</b>: sync entities with at least one RDF type.</li><li><b>$untyped</b>: sync entities even if they have no RDF type.</li></ul>'
    },
    fr: {
      [LUCENE_DEFAULT_TITLE]: 'Connecteur Lucene',
      [TYPES_INTRO]: 'L’option <b>Types</b> spécifie les types RDF des entités à synchroniser, sous forme de liste d’IRI (au moins un requis).<ul>Valeurs spéciales : <li><b>$any</b> : synchronise les entités ayant au moins un type RDF.</li><li><b>$untyped</b> : synchronise les entités même si elles n’ont pas de type RDF.</li></ul>'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
