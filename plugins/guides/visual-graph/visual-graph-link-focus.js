import {disableAllVisualGraphNodes, enableAllVisualGraphNodes} from '../utils.js';

const step = {
  guideBlockName: 'visual-graph-link-focus',
  getSteps: (options, services) => {
    const GuideUtils = services.GuideUtils;
    const $rootScope = services.$rootScope;
    const elementSelector = `.link-wrapper[id^="${options.fromIri}>${options.toIri}"]`;
    return [
      {
        guideBlockName: 'read-only-element',
        options: {
          title: 'guide.step_plugin.visual-graph-link-focus.title',
          content: 'guide.step_plugin.visual-graph-link-focus.content',
          url: 'graphs-visualizations',
          canBePaused: false,
          class: 'visual-graph-link-focus',
          elementSelector,
          show: disableAllVisualGraphNodes,
          hide: enableAllVisualGraphNodes,
          beforeShowPromise: GuideUtils.awaitAlphaDropD3(elementSelector, $rootScope),
          ...options
        }
      }
    ];
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
