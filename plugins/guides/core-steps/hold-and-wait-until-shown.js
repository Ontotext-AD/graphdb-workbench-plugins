import {BASIC_STEP} from '../config.js';

/**
 * @name hold-and-wait-until-shown
 * @memberof module:Interactive Guide
 *
 * @description
 * Holds the current step and waits until a specific element becomes visible before allowing the user to proceed.
 *
 * Hold and wait until shown example<br>
 * <img src="resources/guides/core/hold-and-wait-until-shown.png" style="height:200px; border: solid; border-width:1px"/><br></br>
 *
 * This step can be configured using the common options defined in [Options](#.Options). Additionally, it supports:
 *
 * @property {string} options.elementSelectorToWait - CSS selector of the element whose visibility is being monitored to become visible.
 *
 * @example
 * ```JSON
 * {
 *   "guideBlockName": "hold-and-wait-until-shown",
 *   "options": {
 *     "elementSelectorToWait": "#loaded-panel"
 *   }
 * }
 * ```
 */
const step = {
  guideBlockName: 'hold-and-wait-until-shown',
  getStep: (options, services) => {
    const notOverridable = {
      type: 'readonly'
    };
    return {
      ...BASIC_STEP,
      initPreviousStep: services.GuideUtils.defaultInitPreviousStep,
      onNextValidate: () => Promise.resolve(services.GuideUtils.isVisible(options.elementSelectorToWait)),
      ...options,
      ...notOverridable
    };
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
