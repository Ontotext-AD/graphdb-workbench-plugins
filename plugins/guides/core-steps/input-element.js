import * as Utils from '../utils.js';
import {BASIC_STEP} from '../config.js';

/**
 * @name input-element
 * @memberof module:Interactive Guide
 *
 * @description
 * Focuses a specific input element and allows the user to type into it.
 *
 * Input element example<br>
 * <img src="resources/guides/core/input-element.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```JSON
 * {
 *   "guideBlockName": "input-element",
 *   "options": {
 *     "elementSelector": "#query-input",
 *     "content": "Type your query here."
 *   }
 * }
 * ```
 */
const step = {
  guideBlockName: 'input-element',
  getStep: (options, services) => {
    const notOverridable = {
      type: 'input'
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
