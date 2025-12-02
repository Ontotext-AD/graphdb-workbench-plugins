import * as Utils from '../utils.js';
import {BASIC_STEP} from '../config.js';

/**
 * @name focus-element
 * @memberof module:Interactive Guide
 *
 * @description
 * The Focus Element step is used to guide users to see a specific element on the interface.
 *
 * Focus element example<br>
 * <img src="resources/guides/core/focus-element.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options). Additionally, it supports:
 *
 * @property {function} [options.beforeShowPromise] - A promise that has to resolve, before the step is shown. If not provided, the step will be shown immediately.
 *
 * @example
 * ```JSON
 * {
 *   "guideBlockName": "focus-element",
 *   "options": {
 *     "elementSelector": "#important-info",
 *     "content": "Please take a look at this important information."
 *   }
 * }
 * ```
 */
const step = {
  // An element which is expected to be focused. It allows user interaction.
  guideBlockName: 'focus-element',
  getStep: (options, services) => {
    const stepDescription = {
      ...BASIC_STEP,
      initPreviousStep: services.GuideUtils.defaultInitPreviousStep,
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
