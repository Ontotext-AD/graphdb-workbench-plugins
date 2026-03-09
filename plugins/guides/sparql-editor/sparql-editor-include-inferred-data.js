const SPARQL_EDITOR_TITLE = 'view.sparql-editor.title';
const INCLUDE_INFERRED_CONTENT = 'guide.step_plugin.sparql-editor-include-inferred-data.content';

/**
 * @name sparql-editor-include-inferred-data
 * @memberof module:Interactive Guide
 *
 * @description
 * This step focuses on the "Include inferred data in results" toggle in the SPARQL editor.<br>
 *
 * Include inferred data toggle<br>
 * <img src="resources/guides/sparql-editor/sparql-editor-include-inferred-data.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```JSON
 * {
 *   "guideBlockName": "sparql-editor-include-inferred-data"
 * }
 * ```
 */
const step = {
  guideBlockName: 'sparql-editor-include-inferred-data',
  getSteps: function(options, services) {
    const translate = services.translate;
    return [
      {
        guideBlockName: 'read-only-element',
        options: {
          ...(options.title ?? {title: translate(this.translationBundle, SPARQL_EDITOR_TITLE)}),
          content: translate(this.translationBundle, INCLUDE_INFERRED_CONTENT),
          url: 'sparql',
          elementSelector: '.yasqe_inferStatementsButton',
          ...options
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [SPARQL_EDITOR_TITLE]: 'SPARQL Query & Update',
      [INCLUDE_INFERRED_CONTENT]: '<b>Include inferred data in results</b> is enabled by default and includes inferred statements produced by reasoning in the query results. Clicking the toggle disables this behavior.'
    },
    fr: {
      [SPARQL_EDITOR_TITLE]: 'Requête et mise à jour SPARQL',
      [INCLUDE_INFERRED_CONTENT]: '<b>Inclure les données inférées dans les résultats</b> est activé par défaut et inclut les déclarations inférées produites par le raisonnement dans les résultats de la requête. Cliquer sur le bouton désactive ce comportement.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}

