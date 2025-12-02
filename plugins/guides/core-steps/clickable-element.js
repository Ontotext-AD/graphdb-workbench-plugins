import * as Utils from '../utils.js';
import {BASIC_STEP} from '../config.js';

/**
 * @name clickable-element
 * @memberof module:Interactive Guide
 *
 * @description
 * The Clickable Element step is used to guide users to click on a specific element on the interface. Clicking on the
 * element will automatically advance to the next step.
 *
 * Clickable element example<br>
 * <img src="resources/guides/core/clickable-element.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options). Additionally, it supports:
 *
 * @property {string} [options.clickableElementSelector] - The CSS selector of the element to be clicked. If not provided, `options.elementSelector` will be used.
 * @property {string} [options.elementSelector] - The CSS selector of the element to be highlighted. If not provided, the first clickable element will be highlighted.
 * @property {function} [options.beforeShowPromise] - A promise that has to resolve, before the step is shown. If not provided, the step will be shown immediately.
 *
 * @example
 * ```JSON
 * {
 *   "guideBlockName": "clickable-element",
 *   "options": {
 *     "clickableElementSelector": "#submit-button",
 *     "content": "Please click the Submit button to proceed."
 *   }
 * }
 * ```
 */
const step = {
  // An element which is expected to be clicked. If onNextClick is not defined, it will automatically click on the element on next button press
  guideBlockName: 'clickable-element',
  getStep: (options, services) => {
    const notOverridable = {
      type: 'clickable'
    };

    const stepDescription = {
      ...BASIC_STEP,
      advanceOn: {
        selector: options.clickableElementSelector || options.elementSelector,
        event: 'click'
      },
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
