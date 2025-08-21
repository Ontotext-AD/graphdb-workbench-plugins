import * as Utils from '../utils.js';
import {BASIC_STEP} from '../config.js';

const step = {
  // An element which is expected to be clicked. If onNextClick is not defined, it will automatically click on the element on next button press
  guideBlockName: 'clickable-element',
  getStep: (options, services) => {
    const notOverridable = {
      type: 'clickable'
    };

    const stepDescription = angular.extend({}, BASIC_STEP, {
      advanceOn: {
        selector: options.clickableElementSelector || options.elementSelector,
        event: 'click'
      },
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
