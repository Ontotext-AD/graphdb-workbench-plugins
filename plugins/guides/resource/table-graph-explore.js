const TABLE_GRAPH_INTRO = 'guide.step-intro.table-graph';
const TABLE_GRAPH_OVERVIEW = 'guide.step_plugin.table-graph-overview';
const TABLE_GRAPH_LINK = 'guide.step_plugin.table-graph-link';
const TABLE_GRAPH_ROLE_SUBJECT_CONTENT = 'guide.step_plugin.table-graph-role.subject.content';
const TABLE_GRAPH_ROLE_PREDICATE_CONTENT = 'guide.step_plugin.table-graph-role.predicate.content';
const TABLE_GRAPH_ROLE_OBJECT_CONTENT = 'guide.step_plugin.table-graph-role.object.content';
const TABLE_GRAPH_ROLE_CONTEXT_CONTENT = 'guide.step_plugin.table-graph-role.context.content';
const TABLE_GRAPH_ROLE_ALL_CONTENT = 'guide.step_plugin.table-graph-role.all.content';
const TABLE_GRAPH_VISUAL = 'guide.step_plugin.table-graph-visual';

/**
 * @name table-graph-explore
 * @memberof module:Interactive Guide
 *
 * @description
 * The `table-graph-explore` guide combines a sequence of steps to explore RDF data
 * in tabular form and optionally switch to the Visual Graph view.
 * It can show how to navigate to IRIs, change roles, and open the Visual Graph for the selected resource.
 *
 * <img src="resources/guides/resource/resource-explore-tabular.png" style="height:200px;
 * border: solid; border-width:1px"/>
 *
 * <img src="resources/guides/resource/resource-table-configure.png" style="height:200px;
 * border: solid; border-width:1px"/>
 *
 * <img src="resources/guides/resource/resource-click-any-iri.png" style="height:200px;
 * border: solid; border-width:1px"/>
 *
 * <img src="resources/guides/resource/resource-configure-object.png" style="height:200px;
 * border: solid; border-width:1px"/>
 *
 * <img src="resources/guides/resource/resource-explore-visual.png" style="height:200px;
 * border: solid; border-width:1px"/>
 *
 * Common guide options apply.
 * Additionally, the following options are used:
 * @property {string} [options.iri] - The IRI to explore.
 * @property {string} [options.iriLabel] - Display label for the IRI.
 *
 *
 * @example
 * ```json
 * {
 *   "guideBlockName": "table-graph-explore",
 *   "options": {
 *     "iri": "http://example.com/employees/Employee1",
 *     "iriLabel": "Employee1",
 *     "subSteps": [
 *           {"type": "link", "iri": "http://example.com/employees/Employee1", "iriLabel": "empl:Employee1"},
 *           {"type": "role", "role": "all"},
 *           {"type": "visual", "extraContentVisualIntro": "<p>You can pan and zoom the graph.</p>"}
 *         ]
 *   }
 * }
 * ```
 * */
const step = {
  guideBlockName: 'table-graph-explore',
  getSteps: function(options, services) {
    const GuideUtils = services.GuideUtils;
    const RoutingUtil = services.RoutingUtil;
    const translate = services.translate;
    options.mainAction = 'table-graph';

    const steps = [
      {
        guideBlockName: 'sparql-results-click-on-iri',
        options: {
          content: translate(this.translationBundle, TABLE_GRAPH_INTRO, {iriLabel: options.iriLabel ?? options.iri}),
          initPreviousStep: (services, stepId) => {
            const currentStepId = services.ShepherdService.getCurrentStepId();
            if (currentStepId === stepId) {
              return Promise.resolve();
            }
            const previousStep = services.ShepherdService.getPreviousStepFromHistory(stepId);
            return previousStep.options.initPreviousStep(services, previousStep.options.id);
          },
          ...options
        }
      },
      {
        guideBlockName: 'resource-results-explain',
        options: {
          content: translate(this.translationBundle, TABLE_GRAPH_OVERVIEW, {iriLabel: options.iriLabel ?? options.iri}),
          skipUrl: true,
          beforeShowPromise: () => GuideUtils.waitFor(`.resource-info a.source-link[href="${options.iri}"]`, 3)
            .then(() => GuideUtils.waitFor(GuideUtils.CSS_SELECTORS.SPARQL_RESULTS_ROWS_SELECTOR, 3)),
          initPreviousStep: (services, stepId) => {
            const currentStepId = services.ShepherdService.getCurrentStepId();
            if (currentStepId === stepId) {
              return GuideUtils.defaultInitPreviousStep(services, stepId);
            }
            const url = `resource?uri=${options.iri}&role=subject`;
            if (url !== decodeURIComponent(RoutingUtil.getCurrentRoute())) {
              RoutingUtil.navigate(`resource?uri=${options.iri}&role=subject`);
              return GuideUtils.waitFor(`.resource-info a.source-link[href="${options.iri}"]`, 3);
            }
            return Promise.resolve();
          },
          ...options
        }
      }
    ];

    if (angular.isArray(options.subSteps)) {
      options.subSteps.forEach((subStep) => {
        switch (subStep.type) {
        case 'link':
          steps.push({
            guideBlockName: 'resource-results-click-on-iri',
            options: {
              content: translate(this.translationBundle, TABLE_GRAPH_LINK, {iriLabel: subStep.iriLabel ?? subStep.iri}),
              skipUrl: true,
              initPreviousStep: (services, stepId) => {
                const linkUrl = `/resource?uri=${subStep.iri}&role=subject`;
                const tableGraphLinkUrl = `/resource?uri=${options.iri}&role=subject`;
                const url = decodeURIComponent(RoutingUtil.getCurrentRoute());

                const currentStepId = services.ShepherdService.getCurrentStepId();
                if (currentStepId === stepId && tableGraphLinkUrl === url) {
                  // this case is first link in the sequence before click the link, so we have to resolve it.
                  return Promise.resolve();
                }

                if (linkUrl === url) {
                  // this case is first link in the sequence after click the link, so we have to call previous step.
                  return GuideUtils.defaultInitPreviousStep(services, stepId);
                }

                RoutingUtil.navigate(linkUrl);
                return GuideUtils.waitFor(GuideUtils.CSS_SELECTORS.SPARQL_RESULTS_ROWS_SELECTOR);
              },
              ...options,
              ...subStep
            }
          });
          break;
        case 'role':
        {const ROLE_KEY_BY_TYPE = {
          subject: TABLE_GRAPH_ROLE_SUBJECT_CONTENT,
          predicate: TABLE_GRAPH_ROLE_PREDICATE_CONTENT,
          object: TABLE_GRAPH_ROLE_OBJECT_CONTENT,
          context: TABLE_GRAPH_ROLE_CONTEXT_CONTENT,
          all: TABLE_GRAPH_ROLE_ALL_CONTENT
        };
        steps.push({
          guideBlockName: 'resource-click-on-role',
          options: {
            content: translate(this.translationBundle, ROLE_KEY_BY_TYPE[subStep.role]),
            skipUrl: true,
            showRole: subStep.role,
            initPreviousStep: (services, stepId) => {
              const currentStepId = services.ShepherdService.getCurrentStepId();
              if (currentStepId === stepId) {
                return Promise.resolve();
              }

              const previousStep = services.ShepherdService.getPreviousStepFromHistory(stepId);
              return previousStep.options.initPreviousStep(services, previousStep.options.id)
                .then(() => {
                  let url = RoutingUtil.getCurrentRoute();
                  url = url.substring(0, url.indexOf('role=') + 5);
                  url += subStep.role;
                  RoutingUtil.navigate(url);
                  return GuideUtils.waitFor(GuideUtils.CSS_SELECTORS.SPARQL_RESULTS_ROWS_SELECTOR);
                });
            },
            ...options,
            ...subStep
          }
        });
        break;}
        case 'visual':
          steps.push({
            guideBlockName: 'resource-click-on-visual-graph-button',
            options: {
              content: translate(this.translationBundle, TABLE_GRAPH_VISUAL),
              skipUrl: true,
              initPreviousStep: (services, stepId) => {
                const currentStepId = services.ShepherdService.getCurrentStepId();
                if (currentStepId === stepId) {
                  return Promise.resolve();
                }

                return GuideUtils.defaultInitPreviousStep(services, stepId);
              },
              ...options,
              ...subStep
            }
          });
          steps.push({
            guideBlockName: 'visual-graph-intro',
            options: {
              extraContent: subStep.extraContentVisualIntro,
              forceReload: true,
              onNextClick: (guide) => {
                window.history.back();
                guide.next();
              },
              ...options,
              ...subStep
            }
          });
          break;
        case 'row':
          steps.push({
            guideBlockName: 'resource-results-row-explain',
            options: {
              content: translate(this.translationBundle, TABLE_GRAPH_LINK, {iriLabel: subStep.iriLabel ?? subStep.iri ?? options.iriLabel ?? options.iri}),
              skipUrl: true,
              ...options,
              ...subStep
            }
          });
          break;
        case 'table':
          steps.push({
            guideBlockName: 'resource-results-explain',
            options: {
              elementSelector: GuideUtils.CSS_SELECTORS.SPARQL_RESULTS_ROWS_SELECTOR,
              class: 'visual_graph-table',
              skipUrl: true,
              placement: 'top',
              ...options,
              ...subStep
            }
          });
          break;
        }
      });
    }

    return steps;
  },
  translationBundle: {
    en: {
      [TABLE_GRAPH_INTRO]: 'The following steps show how to explore RDF data in tabular form without writing SPARQL queries. Click on the <b>{{iriLabel}}</b> IRI to explore it.',
      [TABLE_GRAPH_OVERVIEW]: 'The table shows RDF statements where the subject is the selected IRI, <b>{{iriLabel}}</b>. The view can be configured to show statements where the IRI is the <i>subject</i>, <i>predicate</i>, <i>object</i>, <i>context</i> or in any position.',
      [TABLE_GRAPH_LINK]: 'You can click on any IRI in the table to navigate to it. Click on <b>{{iriLabel}}</b>.',
      [TABLE_GRAPH_ROLE_SUBJECT_CONTENT]: 'You can configure the view to show RDF statements where the current IRI is the <i>subject</i>, <i>predicate</i>, <i>object</i>, <i>context</i> or in any position. Click on the <b>subject</b> tab.',
      [TABLE_GRAPH_ROLE_PREDICATE_CONTENT]: 'You can configure the view to show RDF statements where the current IRI is the <i>subject</i>, <i>predicate</i>, <i>object</i>, <i>context</i> or in any position. Click on the <b>predicate</b> tab.',
      [TABLE_GRAPH_ROLE_OBJECT_CONTENT]: 'You can configure the view to show RDF statements where the current IRI is the <i>subject</i>, <i>predicate</i>, <i>object</i>, <i>context</i> or in any position. Click on the <b>object</b> tab.',
      [TABLE_GRAPH_ROLE_CONTEXT_CONTENT]: 'You can configure the view to show RDF statements where the current IRI is the <i>subject</i>, <i>predicate</i>, <i>object</i>, <i>context</i> or in any position. Click on the <b>context</b> tab.',
      [TABLE_GRAPH_ROLE_ALL_CONTENT]: 'You can configure the view to show RDF statements where the current IRI is the <i>subject</i>, <i>predicate</i>, <i>object</i>, <i>context</i> or in any position. Click on the <b>all</b> tab.',
      [TABLE_GRAPH_VISUAL]: 'You can always explore the same data using the <b>Visual graph</b> view. Click on the Visual graph button to try it now.'
    },
    fr: {
      [TABLE_GRAPH_INTRO]: 'Les étapes suivantes montrent comment explorer les données RDF sous forme de tableau sans écrire de requêtes SPARQL. Cliquez sur l\'IRI <b>{{iriLabel}}</b> pour l\'explorer.',
      [TABLE_GRAPH_OVERVIEW]: 'Le tableau affiche les déclarations RDF où le sujet est l\'IRI sélectionné, <b>{{iriLabel}}</b>. La vue peut être configurée pour afficher les déclarations où l\'IRI est le <i>sujet</i>, le <i>prédicat</i>, l\'<i>objet</i>, le <i>contexte</i> ou dans n\'importe quelle position.',
      [TABLE_GRAPH_LINK]: 'Vous pouvez cliquer sur n\'importe quel IRI du tableau pour y accéder. Cliquez sur <b>{{iriLabel}}</b>.',
      [TABLE_GRAPH_ROLE_SUBJECT_CONTENT]: 'Vous pouvez configurer la vue pour afficher les déclarations RDF où l\'IRI actuel est le <i>sujet</i>, le <i>prédicat</i>, l\'<i>objet</i>, le <i>contexte</i> ou dans n\'importe quelle position. Cliquez sur l\'onglet <b>sujet</b>.',
      [TABLE_GRAPH_ROLE_PREDICATE_CONTENT]: 'Vous pouvez configurer la vue pour afficher les déclarations RDF où l\'IRI actuel est le <i>sujet</i>, le <i>prédicat</i>, l\'<i>objet</i>, le <i>contexte</i> ou dans n\'importe quelle position. Cliquez sur l\'onglet <b>prédicat</b>.',
      [TABLE_GRAPH_ROLE_OBJECT_CONTENT]: 'Vous pouvez configurer la vue pour afficher les déclarations RDF où l\'IRI actuel est l\'<i>objet</i>, le <i>sujet</i>, le <i>prédicat</i>, le <i>contexte</i> ou dans n\'importe quelle position. Cliquez sur l\'onglet <b>objet</b>.',
      [TABLE_GRAPH_ROLE_CONTEXT_CONTENT]: 'Vous pouvez configurer la vue pour afficher les déclarations RDF où l\'IRI actuel est le <i>contexte</i>, le <i>sujet</i>, le <i>prédicat</i>, l\'<i>objet</i> ou dans n\'importe quelle position. Cliquez sur l\'onglet <b>contexte</b>.',
      [TABLE_GRAPH_ROLE_ALL_CONTENT]: 'Vous pouvez configurer la vue pour afficher les déclarations RDF où l\'IRI actuel est le <i>sujet</i>, le <i>prédicat</i>, l\'<i>objet</i>, le <i>contexte</i> ou dans n\'importe quelle position. Cliquez sur l\'onglet <b>tous</b>.',
      [TABLE_GRAPH_VISUAL]: 'Vous pouvez toujours explorer les mêmes données en utilisant la vue <b>Graphique visuel</b>. Cliquez sur le Graphique visuel pour l\'essayer maintenant.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
