import * as Utils from '../utils.js';

const step = {
  guideBlockName: 'rdf-rank-compute-fill',
  getSteps: (options, services) => {
    const GuideUtils = services.GuideUtils;
    const computeRDFRankButtonSelector = GuideUtils.getGuideElementSelector('compute-rdf-rank-btn');
    return [
      {
        guideBlockName: 'clickable-element',
        options: {
          url: 'rdfrank',
          content: 'guide.step_plugin.rdf-rank-compute-fill.content',
          elementSelector: computeRDFRankButtonSelector,
          // If mainAction is set the title will be set automatically
          ...(options.mainAction ? {} : {title: Utils.RDF_RANK_DEFAULT_TITLE}),
          onNextClick: computeRDFRankButtonSelector,
          ...options
        }
      }
    ];
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
