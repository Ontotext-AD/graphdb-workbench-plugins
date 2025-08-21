import * as Utils from '../utils.js';

const step = {
  guideBlockName: 'sparql-results-click-on-iri',
  getSteps: (options, services) => {
    const GuideUtils = services.GuideUtils;
    return [
      {
        guideBlockName: 'clickable-element',
        options: {
          content: 'guide.step_plugin.sparql-results-click-on-iri.content',
          placement: 'top',
          // If mainAction is set the title will be set automatically
          ...(options.mainAction ? {} : {title: Utils.SPARQL_EDITOR_DEFAULT_TITLE}),
          ...options,
          scrollToHandler: GuideUtils.scrollToTop,
          elementSelector: GuideUtils.getSparqlResultsSelectorForIri(options.iri),
          class: 'table-graph-instance',
          url: '/sparql',
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
