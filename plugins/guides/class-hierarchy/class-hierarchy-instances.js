import * as Utils from '../utils.js';

const QUERY_CONTENT = 'guide.step_plugin.class-hierarchy-instances-query.content';
const RESULTS_CONTENT = 'guide.step_plugin.class-hierarchy-instances-results.content';
const RESULTS_EXTRA_CONTENT = 'guide.step_plugin.class-hierarchy-instances-results.extraContent';
const RDF_INSTANCES_TITLE = 'guide.step_plugin.class-hierarchy-instances.title';
const SKIP_SECTION = 'skip.section';

/**
 * @name class-hierarchy-instances
 * @memberof module:Interactive Guide
 *
 * @description
 * This step is a complex step that includes several sub-steps to guide the user through viewing and understanding
 * RDF instances of a class in the class hierarchy.
 *
 * Open RDF instances side panel<br>
 * <img src="resources/guides/class-hierarchy/class-hierarchy-open-rdf-instances-side-panel.png" style="height:200px; border: solid;"><br>
 *
 * Side panel introduction<br>
 * <img src="resources/guides/class-hierarchy/class-hierarchy-rdf-instances-side-panel-intro.png" style="height:200px; border: solid"><br>
 *
 * Explain RDF instance<br>
 * <img src="resources/guides/class-hierarchy/class-hierarchy-explain-rdf-instance.png" style="height:200px; border: solid"><br>
 *
 * Open all instances in SPARQL<br>
 * <img src="resources/guides/class-hierarchy/class-hierarchy-rdf-instances-side-panel-open-all-instances-in-sparql.png" style="height:200px; border: solid"><br>
 *
 * SPARQL editor explanation<br>
 * <img src="resources/guides/class-hierarchy/sparql-explain-editor.png" style="height:200px; border: solid"><br>
 *
 * SPARQL results explanation<br>
 * <img src="resources/guides/class-hierarchy/sparql-results-explain.png" style="height:200px; border: solid"><br>
 *
 * Close RDF instances side panel<br>
 * <img src="resources/guides/class-hierarchy/class-hierarchy-close-rdf-instances-side-panel.png" style="height:200px; border: solid"><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options). It requires `options.iri`
 *
 * @property {string} options.iri - The IRI of the class whose instances are to be viewed. This option is required.
 * @property {Array.<string|Object>} [options.focusInstances] - An array of instances to focus on. Each entry can be a string (the instance IRI)
 * @property {boolean} [options.followCountLink] - Whether to follow the count link when the RDF instance count is clicked.
 *
 * @example
 * ```JSON
 * {
 *   "guideBlockName": "class-hierarchy-instances",
 *   "options": {
 *     "iri": "imdb:ColorMovie",
 *     "focusInstances": [
 *       "imdb:title/Superman",
 *       "imdb:title/Mulan"
 *     ],
 *     "followCountLink": true
 *   }
 * },
 * ```
 */
const step = {
  guideBlockName: 'class-hierarchy-instances',
  /**
   *
   * @param {Options} options - Options object containing settings and parameters for the step.
   * @param {PluginServiceInterface} pluginService - The plugin service used to interact with the application (e.g., translations).
   */
  getSteps: function(options, pluginService) {
    const GuideUtils = pluginService.GuideUtils;
    const RoutingUtil = pluginService.RoutingUtil;
    const translate = pluginService.translate;
    const title = options.title ? options.title : translate(this.translationBundle, RDF_INSTANCES_TITLE);
    const closeButtonSelector = GuideUtils.getGuideElementSelector('close-info-panel');
    const clasInstanceSelector = GuideUtils.getGuideElementSelector('class-' + options.iri);
    const instanceCountSelector = GuideUtils.getGuideElementSelector('instances-count');
    const steps = [
      {
        guideBlockName: 'class-hierarchy-open-rdf-instances-side-panel',
        options: {
          title,
          initPreviousStep: () => {
            if (!GuideUtils.isVisible(closeButtonSelector)) {
              return Utils.reloadAndOpenInfoPanel({RoutingUtil, GuideUtils}, clasInstanceSelector);
            }

            return Promise.resolve();
          },
          ...options
        }
      },
      {
        guideBlockName: 'class-hierarchy-rdf-instances-side-panel-intro',
        options: {
          title,
          skipPoint: true,
          skipButtonLabel: translate(this.translationBundle, SKIP_SECTION),
          beforeShowPromise: GuideUtils.deferredShow(800),
          onPreviousClick: () => new Promise(function(resolve) {
            GuideUtils.waitFor(closeButtonSelector, 1)
              .then(() => document.querySelector(closeButtonSelector).click());
            resolve();
          }),
          ...options
        }
      }
    ];

    if (Array.isArray(options.focusInstances)) {
      options.focusInstances.forEach((focusInstance) => {
        if (!GuideUtils.isObject(focusInstance)) {
          focusInstance = {
            instance: focusInstance
          };
        }
        steps.push({
          guideBlockName: 'class-hierarchy-explain-rdf-instance',
          options: {
            title,
            instance: focusInstance.instance,
            extraContent: focusInstance.message,
            ...options
          }
        });
      });
    }

    let urlBeforeFollowCountLink = null;

    if (options.followCountLink) {
      steps.push({
        guideBlockName: 'class-hierarchy-rdf-instances-side-panel-open-all-instances-in-sparql',
        options: {
          title,
          show: () => () => {
            urlBeforeFollowCountLink = window.location.href;
          },
          ...options
        }
      });

      steps.push({
        guideBlockName: 'sparql-explain-editor',
        options: {
          title,
          content: pluginService.translate(this.translationBundle, QUERY_CONTENT, {iri: options.iri}),
          ...options
        }
      });

      const extraContent = options.showExtraCommentSparql !== false ? pluginService.translate(this.translationBundle, RESULTS_EXTRA_CONTENT) : null;
      steps.push({
        guideBlockName: 'sparql-results-explain',
        options: {
          title,
          extraContent,
          content: pluginService.translate(this.translationBundle, RESULTS_CONTENT),
          onNextClick: (guide) => {
            RoutingUtil.navigate(urlBeforeFollowCountLink);
            guide.next();
          },
          initPreviousStep: () => Promise.resolve(),
          ...options
        }
      });
    }

    steps.push({
      guideBlockName: 'class-hierarchy-close-rdf-instances-side-panel',
      options: {
        title,
        // If we followed the count link we come back here from another view
        // and the side panel needs time to open
        beforeShowPromise: options.followCountLink ? GuideUtils.deferredShow(1500) : Promise.resolve(),
        initPreviousStep: (services, stepId) => {
          const currentStepId = services.ShepherdService.getCurrentStepId();
          // If method is called from same step just click count link
          if (currentStepId === stepId && options.followCountLink) {
            return GuideUtils.waitFor(instanceCountSelector, 3)
              .then(() => {
                document.querySelector(instanceCountSelector).click();
                return GuideUtils.waitFor(GuideUtils.CSS_SELECTORS.SPARQL_RESULTS_SELECTOR, 3)
                  .then(() => GuideUtils.deferredShow(50)());
              });
          }
          // If is called from other step we have to reload and open the info panel.
          return Utils.reloadAndOpenInfoPanel({RoutingUtil, GuideUtils}, clasInstanceSelector);
        },
        ...options
      }
    });

    return steps;
  },
  translationBundle: {
    en: {
      [QUERY_CONTENT]: 'This SPARQL query selects all instances of the class <b>{{iri}}</b>. The query was entered automatically when you clicked on the view instances link.',
      [RESULTS_CONTENT]: 'The table shows the results. Note that in this particular case, the query was executed automatically.',
      [RESULTS_EXTRA_CONTENT]: 'Do not worry &mdash; there will be a dedicated section on the SPARQL editor later in the guide.',
      [RDF_INSTANCES_TITLE]: 'Class hierarchy instances',
      [SKIP_SECTION]: 'Skip section'
    },

    fr: {
      [QUERY_CONTENT]: 'Cette requête SPARQL sélectionne toutes les instances de la classe <b>{{iri}}</b>. La requête a été saisie automatiquement lorsque vous avez cliqué sur la vue lien d\'instances.',
      [RESULTS_CONTENT]: 'Le tableau montre les résultats. Notez que dans ce cas particulier, la requête a été exécutée automatiquement.',
      [RESULTS_EXTRA_CONTENT]: 'Ne vous inquiétez pas &mdash; il y aura une section dédiée à l\'éditeur SPARQL plus tard dans le guide.',
      [RDF_INSTANCES_TITLE]: 'Instances de hiérarchie de classes',
      [SKIP_SECTION]: 'Sauter la section'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
