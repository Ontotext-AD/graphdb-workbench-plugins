import {BASIC_STEP} from '../config.js';
import * as Utils from '../utils.js';

/**
 * @name toggle-element
 * @memberof module:Interactive Guide
 *
 * @description
 * The Toggleable Element step is used to guide users to enable a specific toggleable element (like a switch or checkbox)
 * on the interface. The step ensures that a user cannot go back to this step and deselect the toggleable element.
 *
 * Toggleable element example<br>
 * <img src="resources/guides/core/toggle-element.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options). Additionally it supports:
 *
 * @property {boolean} options.disable - Set to true to guide the user to disable the element, or false(or missing) to enable it.
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "toggle-element",
 *  "options": {
 *    "disable": true, // or false to enable
 *  }
 * }
 * ```
 */
const step = {
  // An element, which can be toggled via click
  guideBlockName: 'toggle-element',
  getStep: (options, pluginService) => {
    const notOverridable = {
      type: 'toggleable'
    };

    let stepHTMLElement;
    const selector = options.toggleableElementSelector || options.elementSelector;
    // By default, allow only enabling of the element, unless disable is explicitly set to true. In that case
    // only disabling will be allowed
    const shouldDisable = options.disable ?? false;

    const toggleListener = (event) => {
      if (event.target.checked === shouldDisable) {
        event.preventDefault();
        event.stopPropagation();
      }
    };
    const stepDescription = {
      ...BASIC_STEP,
      advanceOn: {
        selector,
        event: 'click'
      },

      initPreviousStep: pluginService.GuideUtils.defaultInitPreviousStep,
      ...options,
      show: () => () => {
        stepHTMLElement = document.querySelector(selector);
        stepHTMLElement.addEventListener('click', toggleListener, true);
      },
      hide: () => () => {
        if (stepHTMLElement) {
          stepHTMLElement.removeEventListener('click', toggleListener);
        }
      },
      ...notOverridable
    };

    if (!stepDescription.beforeShowPromise) {
      stepDescription.beforeShowPromise = Utils.beforeShowPromise(pluginService, stepDescription.elementSelector, stepDescription.maxWaitTime);
    }
    return stepDescription;
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
