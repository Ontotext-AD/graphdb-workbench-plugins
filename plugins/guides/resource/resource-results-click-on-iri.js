import * as Utils from '../utils.js';

const step = {
  guideBlockName: 'resource-results-click-on-iri',
  getSteps: (options, services) => {
    const GuideUtils = services.GuideUtils;
    return [
      {
        guideBlockName: 'clickable-element',
        options: {
          content: 'guide.step_plugin.resource-results-click-on-iri.content',
          // If mainAction is set the title will be set automatically
          ...(options.mainAction ? {} : {title: Utils.RESOURCE_DEFAULT_TITLE}),
          ...options,
          elementSelector: GuideUtils.getSparqlResultsSelectorForIri(options.iri),
          ...(options.skipUrl ? {} : {url: Utils.getResourceURL(options)}),
          class: 'resource-results-click-on-iri',
          onNextClick: (guide, step) => {
            GuideUtils.waitFor(step.elementSelector, 3)
              .then(() => document.querySelector(step.elementSelector).click());
          }
        }
      }
    ];
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
