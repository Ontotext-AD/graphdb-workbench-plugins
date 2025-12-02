import {BASIC_STEP} from '../config.js';

/**
 * @name info-message
 * @memberof module:Interactive Guide
 *
 * @description
 * Displays a read-only informational message to the user. Interaction is not required to proceed unless configured
 * via common options.
 *
 * Info message example<br>
 * <img src="resources/guides/core/info-message.png" style="height:200px; border: solid; border-width:1px"/><br></br>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```JSON
 * {
 *   "guideBlockName": "info-message",
 *   "options": {
 *     "title": "Heads up",
 *     "content": "Please read this information."
 *   }
 * }
 * ```
 */
const step = {
  guideBlockName: 'info-message',
  getStep: (options, services) => {
    const notOverridable = {
      type: 'readonly'
    };
    return {
      ...BASIC_STEP,
      initPreviousStep: services.GuideUtils.defaultInitPreviousStep,
      ...options,
      ...notOverridable
    };
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
