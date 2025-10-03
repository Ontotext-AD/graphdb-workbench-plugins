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
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "toggle-element",
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

    const toggleListener = (event) => {
      if (!event.target.checked) {
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
