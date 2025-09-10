import * as Utils from '../utils.js';
import {BASIC_STEP} from '../config.js';

const step = {
  guideBlockName: 'hold-and-wait-until-hidden',
  getStep: (options, services) => {
    return angular.extend({}, BASIC_STEP, {
      initPreviousStep: services.GuideUtils.defaultInitPreviousStep,
      onNextValidate: () => Promise.resolve(!services.GuideUtils.isVisible(options.elementSelectorToWait)),
      show: () => Utils.allowEvents(Utils.SCROLL_EVENTS, options.elementSelector, services),
      hide: () => Utils.allowAll(options.elementSelector, services)
    }, options);
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
