import {BASIC_STEP} from '../config.js';
import * as Utils from '../utils.js';

const step = {
  guideBlockName: 'scroll-only-element',
  getStep: (options, services) => {
    const stepDescription = {
      ...BASIC_STEP,
      initPreviousStep: services.GuideUtils.defaultInitPreviousStep,
      show: () => Utils.allowEvents(Utils.SCROLL_EVENTS, options.elementSelector, services),
      hide: () => Utils.allowAll(options.elementSelector, services),
      ...options
    };
    if (!stepDescription.beforeShowPromise) {
      stepDescription.beforeShowPromise = Utils.beforeShowPromise(services, stepDescription.elementSelector, stepDescription.maxWaitTime);
    }
    return stepDescription;
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
