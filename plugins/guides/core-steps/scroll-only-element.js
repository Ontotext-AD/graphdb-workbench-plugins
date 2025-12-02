import {BASIC_STEP} from '../config.js';
import * as Utils from '../utils.js';

/**
 * @name scroll-only-element
 * @memberof module:Interactive Guide
 *
 * @description
 * Focuses a specific element while allowing only scroll-related interactions on it. Other interactions are disabled
 * for the duration of the step. Useful when users need to scroll within a container to find content without clicking
 * or typing.
 *
 * Scroll only element example<br>
 * <img src="resources/guides/core/scroll-only-element.png" style="height:200px; border: solid; border-width:1px"/><br></br>
 *
 * This step can be configured using the common options defined in [Options](#.Options). Additionally, it supports:
 *
 * @property {string} options.elementSelector - CSS selector of the scrollable element to focus.
 *
 * @example
 * ```JSON
 * {
 *   "guideBlockName": "scroll-only-element",
 *   "options": {
 *     "elementSelector": "#results-pane"
 *   }
 * }
 * ```
 */
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
