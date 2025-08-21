import {VISUAL_GRAPH_DEFAULT_TITLE} from '../utils.js';

const step = {
  guideBlockName: 'visual-graph-search-rdf-resources-input-autocomplete-item',
  getSteps: (options, services) => {
    const GuideUtils = services.GuideUtils;
    return [
      {
        guideBlockName: 'clickable-element',
        options: {
          // If mainAction is set the title will be set automatically
          ...(options.mainAction ? {} : {title: VISUAL_GRAPH_DEFAULT_TITLE}),
          content: 'guide.step_plugin.visual_graph_show_autocomplete.content',
          url: 'graphs-visualizations',
          elementSelector: GuideUtils.getGuideElementSelector(`autocomplete-${options.iri}`),
          class: 'visual-graph-show-autocomplete',
          onNextClick: (guide, step) => GuideUtils.waitFor(step.elementSelector, 3).then(() => $(step.elementSelector).trigger('click')),
          canBePaused: false,
          forceReload: true,
          ...options
        }
      }
    ];
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
