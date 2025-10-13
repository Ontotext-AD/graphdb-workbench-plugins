const LUCENE_CONNECTOR_NAME = 'Lucene';
const LUCENE_DEFAULT_TITLE = 'guide.step_plugin.connectors-lucene.title';
const FACET_INTRO = 'guide.step_plugin.connectors-lucene-fields-facet-intro.content';

/**
 * @name connectors-lucene-fields-facet-intro
 * @memberof module:Interactive Guide
 *
 * @description
 * This step is an introductory step for the "Facet" sub-parameter within the fields configuration of the Lucene connector in GraphDB.
 * It explains the purpose and usage of the "Facet" option in determining whether a field is available for faceted searches in Lucene.
 *
 * Lucene connector facet introduction<br>
 * <img src="resources/guides/connectors/lucene/connectors-lucene-fields-facet-intro.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "connectors-lucene-fields-facet-intro",
 * }
 * ```
 */
const step = {
  guideBlockName: 'connectors-lucene-fields-facet-intro',
  /**
   * Options:
   * - <b>instanceName</b>: string (required) – the specific instance name of the Lucene connector.
   */
  getSteps: function(options, pluginService) {
    const translate = pluginService.translate;

    return [{
      guideBlockName: 'connectors-array-subparameter-intro',
      options: {
        content: translate(this.translationBundle, FACET_INTRO),
        ...(options.title ?? {title: translate(this.translationBundle, LUCENE_DEFAULT_TITLE)}),
        ...options,
        class: 'connectors-lucene-fields-facet-intro',
        connectorName: LUCENE_CONNECTOR_NAME,
        parameterName: 'fields',
        subparameterName: 'facet'
      }
    }];
  },
  translationBundle: {
    en: {
      [LUCENE_DEFAULT_TITLE]: 'Lucene connector',
      [FACET_INTRO]: 'The <b>Facet</b> option specifies whether the field is available for faceted searches in Lucene. Managed by the facet option (boolean, true by default).'
    },
    fr: {
      [LUCENE_DEFAULT_TITLE]: 'Connecteur Lucene',
      [FACET_INTRO]: 'L’option <b>Facette</b> spécifie si le champ est disponible pour les recherches à facettes dans Lucene. Géré par l’option facet (booléen, true par défaut).'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
