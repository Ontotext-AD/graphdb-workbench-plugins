import * as Utils from '../utils.js';

const step = {
  guideBlockName: 'class-hierarchy-instances',
  getSteps: (options, services) => {
    const GuideUtils = services.GuideUtils;
    const RoutingUtil = services.RoutingUtil;
    // If mainAction is set the title will be set automatically
    options.title = Utils.CLASS_HIERARCHY_RDF_INSTANCES_DEFAULT_TITLE;
    const closeButtonSelector = GuideUtils.getGuideElementSelector('close-info-panel');
    const clasInstanceSelector = GuideUtils.getGuideElementSelector('class-' + options.iri);
    const instanceCountSelector = GuideUtils.getGuideElementSelector('instances-count');
    const steps = [
      {
        guideBlockName: 'class-hierarchy-open-rdf-instances-side-panel',
        options: {
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
          skipPoint: true,
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

    if (angular.isArray(options.focusInstances)) {
      options.focusInstances.forEach((focusInstance) => {
        if (!GuideUtils.isObject(focusInstance)) {
          focusInstance = {
            instance: focusInstance
          };
        }
        steps.push({
          guideBlockName: 'class-hierarchy-explain-rdf-instance',
          options: {
            instance: focusInstance.instance,
            extraContent: focusInstance.message,
            ...options
          }
        });
      });
    }

    if (options.followCountLink) {
      steps.push({
        guideBlockName: 'class-hierarchy-rdf-instances-side-panel-open-all-instances-in-sparql',
        options: {...options}
      });

      steps.push({
        guideBlockName: 'sparql-explain-editor',
        options: {
          content: 'guide.step_plugin.class-hierarchy-instances-query.content',
          ...options
        }
      });
      steps.push({
        guideBlockName: 'sparql-results-explain',
        options: angular.extend({}, {
          content: 'guide.step_plugin.class-hierarchy-instances-results.content',
          extraContent: options.showExtraCommentSparql !== false ? 'guide.step_plugin.class-hierarchy-instances-results.extraContent' : null,
          onNextClick: (guide) => {
            window.history.back();
            guide.next();
          },
          initPreviousStep: () => Promise.resolve()
        }, options)
      });
    }

    steps.push({
      guideBlockName: 'class-hierarchy-close-rdf-instances-side-panel',
      options: {
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
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
