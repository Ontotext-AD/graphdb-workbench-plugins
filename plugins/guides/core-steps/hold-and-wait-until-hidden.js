import * as Utils from '../utils.js';
import {BASIC_STEP} from '../config.js';

/**
 * @name hold-and-wait-until-hidden
 * @memberof module:Interactive Guide
 *
 * @description
 * Holds the current step and waits until a specific element becomes hidden before allowing the user to proceed.
 * While waiting, scroll events are allowed on the targeted element.
 *
 * Hold and wait until hidden example<br>
 * <img src="resources/guides/core/hold-and-wait-until-hidden.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options). Additionally, it supports:
 *
 * @property {string} options.elementSelectorToWait - CSS selector of the element whose visibility is being monitored to become hidden.
 * @property {string} [options.elementSelector] - CSS selector of the element on which scroll events are allowed while waiting.
 *
 * @example
 * ```JSON
 * {
 *   "guideBlockName": "hold-and-wait-until-hidden",
 *   "options": {
 *     "elementSelectorToWait": "#loading",
 *     "elementSelector": "#scrollable"
 *   }
 * }
 * ```
 */
const step = {
  guideBlockName: 'hold-and-wait-until-hidden',
  getStep: (options, services) => {
    return {
      ...BASIC_STEP,
      initPreviousStep: services.GuideUtils.defaultInitPreviousStep,
      onNextValidate: () => Promise.resolve(!services.GuideUtils.isVisible(options.elementSelectorToWait)),
      show: () => Utils.allowEvents(Utils.SCROLL_EVENTS, options.elementSelector, services),
      hide: () => Utils.allowAll(options.elementSelector, services),
      ...options
    };
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
