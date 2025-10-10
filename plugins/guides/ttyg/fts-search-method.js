/**
 * @name fts-search-method
 * @memberof module:Interactive Guide
 *
 * @description
 * This is a complex step that guides the user through enabling or disabling the FTS search query method in the TTYG interface.
 * It includes steps to provide information about the FTS search method, enable it if it's disabled, or disable it if it's enabled.
 * If enabling, it can also include an optional step to set the maximum number of triples per call.
 *
 * Disable FTS search method<br>
 * <img src="resources/guides/ttyg/ttyg-fts-method-disable.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * Enable FTS search method<br>
 * <img src="resources/guides/ttyg/ttyg-fts-method-enable.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * Set max triples per call<br>
 * <img src="resources/guides/ttyg/set-max-triples-per-call.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options). Additionally, it supports the following specific options:
 *
 * @property {boolean} [options.disable] - If true, the step will guide the user to disable the FTS search method. If false or not provided, it will guide to enable it.
 * @property {number} [options.maxTriplesPerCall] - If provided and enabling the FTS search method, an additional step will be included to set the maximum number of triples per call to this value.
 *
 * @example
 * ```JSON
 * {
 *   "guideBlockName": "fts-search-method",
 *   "options": {
 *     "disable": false,
 *     "maxTriplesPerCall": 1000
 *   }
 * }
 * ```
 */
const step = {
  guideBlockName: 'fts-search-method',
  getSteps: (options) => {
    options.mainAction = 'fts-search-method';
    const shouldToggleOff = options.disable;

    if (shouldToggleOff) {
      return [{
        guideBlockName: 'ttyg-fts-method-disable', options: {...options}
      }];
    }

    const steps = [
      {
        guideBlockName: 'ttyg-fts-method-info', options: {...options}
      },
      {
        guideBlockName: 'ttyg-fts-method-enable', options: {...options}
      }
    ];

    if (options.maxTriplesPerCall) {
      steps.push({
        guideBlockName: 'set-max-triples-per-call',
        options: {...options}
      });
    }

    return steps;
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
