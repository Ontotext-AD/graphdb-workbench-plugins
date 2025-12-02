import {BASIC_STEP} from '../config.js';

/**
 * @name wait-for-element-to-hide
 * @memberof module:Interactive Guide
 *
 * @description
 * Waits for a specific element to become hidden and then immediately advances to the next step.
 *
 * This step can be configured using the common options defined in [Options](#.Options). Additionally, it supports:
 *
 * @property {string} options.elementSelectorToHide - CSS selector of the element that must become hidden before advancing.
 * @property {number} [options.timeToWait=2] - Max seconds to wait before aborting the guide.
 *
 * @example
 * ```JSON
 * {
 *   "guideBlockName": "wait-for-element-to-hide",
 *   "options": {
 *     "elementSelectorToHide": "#loading",
 *     "timeToWait": 5
 *   }
 * }
 * ```
 */
const step = {
  guideBlockName: 'wait-for-element-to-hide',
  getStep: (options, services) => {
    return {
      ...BASIC_STEP,
      initPreviousStep: services.GuideUtils.defaultInitPreviousStep,
      beforeShowPromise: (guide) => services.GuideUtils.waitUntilHidden(options.elementSelectorToHide, options.timeToWait || 2)
        .catch(() => {
          services.ShepherdService._abortGuide(guide);
        }),
      show: (guide) => () => {
        // Using a timeout because the library executes async logic
        setTimeout(() => guide.next());
      },
      ...options
    };
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
