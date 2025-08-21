import * as Utils from '../utils.js';

const step = {
  guideBlockName: 'execute-sparql-query',
  getSteps: (options, services) => {
    const GuideUtils = services.GuideUtils;
    const YasguiComponentDirectiveUtil = services.YasguiComponentDirectiveUtil;
    const toastr = services.toastr;
    const $translate = services.$translate;
    const $interpolate = services.$interpolate;
    const RoutingUtil = services.RoutingUtil;
    options.mainAction = 'execute-sparql-query';

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
    options.queries.forEach((queryDef, index) => {
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
              services.toastr.error(services.$translate.instant('guide.unexpected.error.message'));
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
                    'guide.step_plugin.execute-sparql-query.query-not-same.error', options);
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
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
