/**
 * @name Options
 * @memberof module:Interactive Guide
 *
 * @description
 *
 * Common options for configuring a guide step. These options control the behavior
 * and appearance of steps within a guide and applied to all steps.
 *
 * Individual steps can define additional options on top of these common ones as needed.
 *
 * The options object contains settings, parameters, and configurations passed from
 * the guide definition, and they are used by the step to determine its behavior,
 * content, and placement.
 *
 *
 * @property {string} translatedGuideName - The translated name of the interactive guide to which this step belongs.
 * Represents the localized name of the guide currently in progress.
 * @property {string} translatedGuideDescription - The translated description of the interactive guide to which this step belongs.
 * Represents the localized description of the guide currently in progress.
 * @property {string} title - A string that will be displayed as the step title in the dialog header.
 * @property {string} content - The main content displayed in the dialog body.
 * @property {string} extraContent - A string displayed as additional content below the main content in the dialog body.
 * @property {string} [elementSelector] - A CSS selector for the element that should be highlighted when this step is active.
 * @property {string} [placement='bottom'] - A string that defines where the step dialog should be placed
 * relative to the highlighted element:
 *   - auto | auto-start | auto-end
 *   - top | top-start | top-end
 *   - bottom | bottom-start | bottom-end
 *   - right | right-start | right-end
 *   - left | left-start | left-end
 * @property {string} [url] - A string that defines the URL where the step should be active.
 * If the current URL does not match the step URL, the guide will navigate to the step URL
 * before activating the step.
 * @property {number} [maxWaitTime=3] - The maximum time (in seconds) to wait for the element to appear on the screen.
 * @property {boolean} [disablePreviousFlow=true] - A boolean that defines whether the user can go back to the previous step.
 * @property {boolean} [skipPoint=false] - A boolean that defines whether this step can be used as a skip point. When true, a "Skip" button will appear
 * in the dialog, allowing the user to skip the guide from this point. When clicked, the guide will continue at
 * the next step marked as a skip point. If no further skip points are defined, the guide will be finished.
 * @property {string} [className] - A string that defines additional CSS classes to be added to the step dialog.
 */
export class Options {
  translatedGuideName = '';
  translatedGuideDescription = '';
  title = '';
  content = '';
  extraContent = '';
  elementSelector = undefined;
  placement = 'bottom';
  url = undefined;
  maxWaitTime = 3;
  disablePreviousFlow = true;
  skipPoint = false;
  class = '';
}
