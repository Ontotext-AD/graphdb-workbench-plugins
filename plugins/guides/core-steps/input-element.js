import * as Utils from '../utils.js';
import {BASIC_STEP} from '../config.js';

const step = {
  guideBlockName: 'input-element',
  getStep: (options, services) => {
    const notOverridable = {
      type: 'input'
    };
    const stepDescription = angular.extend({}, BASIC_STEP, {
      initPreviousStep: services.GuideUtils.defaultInitPreviousStep
    }, options, notOverridable);
    if (!stepDescription.beforeShowPromise) {
      stepDescription.beforeShowPromise = Utils.beforeShowPromise(services, stepDescription.elementSelector, stepDescription.maxWaitTime);
    }
    return stepDescription;
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
