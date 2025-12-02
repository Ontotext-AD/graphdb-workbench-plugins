import * as Utils from '../utils.js';
import {BASIC_STEP} from '../config.js';

/**
 * @name read-only-element
 * @memberof module:Interactive Guide
 *
 * @description
 * The Read-Only Element step is used to guide users to see a specific element on the interface, but not interact with it.
 *
 * Read-only element example<br>
 * <img src="resources/guides/core/read-only-element.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options). Additionally, it supports:
 *
 * @property {function} [options.beforeShowPromise] - A promise that has to resolve, before the step is shown. If not provided, the step will be shown immediately.
 *
 * @example
 * ```JSON
 * {
 *   "guideBlockName": "read-only-element",
 *   "options": {
 *     "elementSelector": "#important-info",
 *     "content": "Please take a look at this important information, but do not interact with it."
 *   }
 * }
 * ```
 */
const step = {
  // An element which is expected to be focused, but interactions are disabled.
  guideBlockName: 'read-only-element',
  getStep: (options, services) => {
    const notOverridable = {
      type: 'readonly'
    };
    const stepDescription = {
      ...BASIC_STEP,
      initPreviousStep: services.GuideUtils.defaultInitPreviousStep,
      ...options,
      ...notOverridable
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
