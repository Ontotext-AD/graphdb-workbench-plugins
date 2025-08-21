import * as Utils from '../utils.js';
import {BASIC_STEP} from '../config.js';

const step = {
  // An element which is expected to be focused. It allows user interaction.
  guideBlockName: 'focus-element',
  getStep: (options, services) => {
    const stepDescription = angular.extend({}, BASIC_STEP, {
      initPreviousStep: services.GuideUtils.defaultInitPreviousStep
    }, options);

    if (!stepDescription.beforeShowPromise) {
      stepDescription.beforeShowPromise = Utils.beforeShowPromise(services, stepDescription.elementSelector, stepDescription.maxWaitTime);
    }
    return stepDescription;
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
