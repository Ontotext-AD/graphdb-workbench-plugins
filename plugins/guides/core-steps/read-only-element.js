import * as Utils from '../utils.js';
import {BASIC_STEP} from '../config.js';

const step = {
  // An element which is expected to be focused, but interactions are disabled.
  guideBlockName: 'read-only-element',
  getStep: (options, services) => {
    const notOverridable = {
      type: 'readonly'
    };
    const stepDescription = angular.extend({}, BASIC_STEP, {
      initPreviousStep: services.GuideUtils.defaultInitPreviousStep
    },
    options, notOverridable);
    if (!stepDescription.beforeShowPromise) {
      stepDescription.beforeShowPromise = Utils.beforeShowPromise(services, stepDescription.elementSelector, stepDescription.maxWaitTime);
    }
    return stepDescription;
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
