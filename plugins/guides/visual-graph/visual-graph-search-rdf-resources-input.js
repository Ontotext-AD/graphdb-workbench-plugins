import {VISUAL_GRAPH_DEFAULT_TITLE} from '../utils.js';

const step = {
  guideBlockName: 'visual-graph-search-rdf-resources-input',
  getSteps: (options, services) => {
    const GuideUtils = services.GuideUtils;
    return [
      {
        guideBlockName: 'input-element',
        options: {
          // If mainAction is set the title will be set automatically
          ...(options.mainAction ? {} : {title: VISUAL_GRAPH_DEFAULT_TITLE}),
          content: 'guide.step_plugin.visual_graph_input_IRI.content',
          forceReload: true,
          url: 'graphs-visualizations',
          elementSelector: GuideUtils.getGuideElementSelector('graphVisualisationSearchInputNotConfigured', ' input'),
          class: 'visual-graph-input-iri',
          onNextValidate: (step) => Promise.resolve(GuideUtils.validateTextInput(step.elementSelector, step.easyGraphInputText)),
          ...options
        }
      }
    ];
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
