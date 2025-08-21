import {BASIC_STEP} from '../config.js';

const step = {
  guideBlockName: 'wait-for-element-to-hide',
  getStep: (options, services) => {
    return angular.extend({}, BASIC_STEP, {
      initPreviousStep: services.GuideUtils.defaultInitPreviousStep,
      beforeShowPromise: (guide) => services.GuideUtils.waitUntilHidden(options.elementSelectorToHide, options.timeToWait || 2)
        .catch(() => {
          services.ShepherdService._abortGuide(guide);
        }),
      show: (guide) => () => {
        // Using a timeout because the library executes async logic
        setTimeout(() => guide.next());
      }
    }, options);
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
