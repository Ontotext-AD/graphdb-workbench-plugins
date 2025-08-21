import {disableAllVisualGraphNodes, enableAllVisualGraphNodes} from '../utils.js';

const step = {
  guideBlockName: 'visual-graph-node-focus',
  getSteps: (options, services) => {
    const GuideUtils = services.GuideUtils;
    const $rootScope = services.$rootScope;
    const elementSelector = `.node-wrapper[id^="${options.iri}"] circle`;
    return [
      {
        guideBlockName: 'read-only-element',
        options: {
          title: 'guide.step_plugin.visual-graph-node-focus.title',
          content: 'guide.step_plugin.visual-graph-node-focus.content',
          url: 'graphs-visualizations',
          canBePaused: false,
          elementSelector,
          class: 'visual-graph-node-focus',
          show: disableAllVisualGraphNodes,
          hide: enableAllVisualGraphNodes,
          beforeShowPromise: GuideUtils.awaitAlphaDropD3(elementSelector, $rootScope),
          initPreviousStep: (services, stepId) => {
            if (GuideUtils.isVisible(elementSelector)) {
              return Promise.resolve();
            }

            const previousStep = services.ShepherdService.getPreviousStepFromHistory(stepId);
            return previousStep.options.initPreviousStep(services, previousStep.id);
          },
          ...options
        }
      }
    ];
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
