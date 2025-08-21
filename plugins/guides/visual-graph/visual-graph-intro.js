import {VISUAL_GRAPH_DEFAULT_TITLE} from '../utils.js';

const step = {
  guideBlockName: 'visual-graph-intro',
  getSteps: (options) => {
    return [
      {
        guideBlockName: 'read-only-element',
        options: {
          // If mainAction is set the title will be set automatically
          ...(options.mainAction ? {} : {title: VISUAL_GRAPH_DEFAULT_TITLE}),
          content: 'guide.step_plugin.visual_graph_intro.content',
          url: 'graphs-visualizations',
          elementSelector: '.graph-visualization',
          placement: 'left',
          canBePaused: false,
          ...options
        }
      }
    ];
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
