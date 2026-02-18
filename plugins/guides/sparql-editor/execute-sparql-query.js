import * as Utils from '../utils.js';

const QUERY_NOT_SAME_ERROR = 'guide.step_plugin.execute-sparql-query.query-not-same.error';
const UNEXPECTED_ERROR = 'guide.unexpected.error.message';
const SPARQL_EDITOR_TITLE = 'view.sparql-editor.title';

/**
 * @name execute-sparql-query
 * @memberof module:Interactive Guide
 *
 * @description
 * Composite step that executes a SPARQL query and displays the results.
 * Included steps are:
 *
 * Copy to editor<br>
 * <img src="resources/guides/sparql-editor/sparql-editor.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * Click run button<br>
 * <img src="resources/guides/sparql-editor/sparql-editor-run-button.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * Explain results<br>
 * <img src="resources/guides/sparql-editor/sparql-results-explain.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options). Additionally, it requires:
 * @property {Array} queries - An array of objects containing the query and the additional content to display in the results.
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "execute-sparql-query",
 *  "options": {
 *    "queries": [
 *      {
 *        "query": "SELECT ?s WHERE { ?s ?p ?o } LIMIT 10",
 *        "queryExtraContent": {
 *          "en": "This is the first query extra content."
 *        },
 *        "resultExtraContent": {
 *          "en": "This is the first result extra content."
 *        }
 *      },
 *      {
 *        "query": "SELECT ?o WHERE { <http://example.org/subject> ?p ?o } LIMIT 5",
 *        "queryExtraContent": {
 *          "en": "This is the second query extra content."
 *        },
 *        "resultExtraContent": {
 *          "en": "This is the second result extra content."
 *        }
 *      }
 *    ]
 *   }
 * }
 * ```
 */
const step = {
  guideBlockName: 'execute-sparql-query',
  getSteps: function(options, services) {
    const translate = services.translate;
    const GuideUtils = services.GuideUtils;
    const YasguiComponentDirectiveUtil = services.YasguiComponentDirectiveUtil;
    const toastr = services.toastr;
    const $translate = services.$translate;
    const $interpolate = services.$interpolate;
    const RoutingUtil = services.RoutingUtil;
    options.mainAction = 'execute-sparql-query';
    options.title = options.title ?? translate(this.translationBundle, SPARQL_EDITOR_TITLE);

    const steps = [
      {
        guideBlockName: 'click-main-menu',
        options: {
          menu: 'sparql',
          showIntro: true,
          ...options
        }
      }
    ];

    const defaultQuery = 'select * where { \n\t?s ?p ?o .\n} limit 100 \n';
    const queries = {};
    queries[-1] = 'PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\nselect * where { \n\t?s ?p ?o .\n?o rdf:type ""\n} limit 100 ';

    let overwriteQuery = false;
    (options.queries ?? []).forEach((queryDef, index) => {
      const query = queryDef.query;
      queries[index] = query;

      steps.push({
        guideBlockName: 'sparql-editor',
        options: {
          query,
          queryExtraContent: queryDef.queryExtraContent,
          beforeShowPromise: () => YasguiComponentDirectiveUtil.getOntotextYasguiElementAsync(Utils.SPARQL_DIRECTIVE_SELECTOR)
            .then(() => GuideUtils.waitFor(GuideUtils.CSS_SELECTORS.SPARQL_EDITOR_SELECTOR, 3))
            .then(() => GuideUtils.deferredShow(500)())
            .catch((error) => {
              services.toastr.error(translate(this.translationBundle, UNEXPECTED_ERROR));
              throw error;
            }),
          onNextValidate: () => YasguiComponentDirectiveUtil.getOntotextYasguiElementAsync(Utils.SPARQL_DIRECTIVE_SELECTOR)
            .then((yasgui) => yasgui.getQuery().then((query) => ({yasgui, queryFromEditor: query})))
            .then(({yasgui, queryFromEditor}) => {
              const editorQuery = GuideUtils.removeWhiteSpaces(queryFromEditor);
              const stepQuery = GuideUtils.removeWhiteSpaces(query);
              if (editorQuery !== stepQuery) {
                if (editorQuery === 'select*where{?s?p?o.}limit100' || overwriteQuery) {
                  // The query is the default query OR we previously overwrote it => we can overwrite it
                  yasgui.setQuery(query);
                } else {
                  GuideUtils.noNextErrorToast(toastr, $translate, $interpolate,
                    QUERY_NOT_SAME_ERROR, options);
                  return false;
                }
              }
              overwriteQuery = true;
              return true;
            }),
          initPreviousStep: () => {
            if (index === 0) {
              return YasguiComponentDirectiveUtil.setQuery(Utils.SPARQL_DIRECTIVE_SELECTOR, defaultQuery);
            }

            const haveToReload = 'sparql' !== RoutingUtil.getCurrentRoute();

            if (haveToReload) {
              RoutingUtil.navigate('/sparql');
            }

            return GuideUtils.waitFor(GuideUtils.CSS_SELECTORS.SPARQL_EDITOR_SELECTOR)
              .then(() => YasguiComponentDirectiveUtil.executeSparqlQuery('#query-editor', query));
          },
          ...options
        }
      });
      steps.push({
        guideBlockName: 'sparql-editor-run-button',
        options: {
          initPreviousStep: (services, stepId) => {
            const previousStep = services.ShepherdService.getPreviousStepFromHistory(stepId);
            return previousStep.options.initPreviousStep(services, previousStep.options.id)
              .then(() => {
                const currentStepId = services.ShepherdService.getCurrentStepId();
                // Skip expanding of node if last step is "visual-graph-expand"
                if (currentStepId === stepId) {
                  return Promise.resolve();
                }

                return YasguiComponentDirectiveUtil.executeSparqlQuery('#query-editor', query);
              });
          },
          ...options
        }
      });
      steps.push({
        guideBlockName: 'sparql-results-explain',
        options: {
          extraContent: queryDef.resultExtraContent,
          initPreviousStep: (services, stepId) => {
            if ('sparql' !== RoutingUtil.getCurrentRoute()) {
              RoutingUtil.navigate('/sparql');
              return GuideUtils.waitFor(GuideUtils.CSS_SELECTORS.SPARQL_EDITOR_SELECTOR)
                .then(() => GuideUtils.deferredShow(500)())
                .then(() => YasguiComponentDirectiveUtil.executeSparqlQuery('#query-editor', query));
            }

            const previousStep = services.ShepherdService.getPreviousStepFromHistory(stepId);
            return previousStep.options.initPreviousStep(services, previousStep.options.id)
              .then(() => YasguiComponentDirectiveUtil.setQuery(Utils.SPARQL_DIRECTIVE_SELECTOR, query));
          },
          ...options
        }
      });
    });

    return steps;
  },
  translationBundle: {
    en: {
      [SPARQL_EDITOR_TITLE]: 'Execute SPARQL query',
      [UNEXPECTED_ERROR]: 'The guide was cancelled due to an unexpected error. Please run the guide again and if the problem persists contact the support.'
    },
    fr: {
      [SPARQL_EDITOR_TITLE]: 'Exécuter une requête SPARQL',
      [UNEXPECTED_ERROR]: 'Le guide a été annulé en raison d\'une erreur inattendue. Veuillez exécuter à nouveau le guide et si le problème persiste, contactez le support.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
