/**
 * @name similarity-search-method
 * @memberof module:Interactive Guide
 *
 * @description
 * This is a complex step that guides the user through enabling or disabling the Similarity search query method in the TTYG interface.
 * It includes steps to provide information about the Similarity search method, enable it if it's disabled, or disable it if it's enabled.
 * If disabled, it will show only the step to disable it. If not disabled, it will show the steps to enable it and select the index to use.
 *
 * Disable Similarity search method<br>
 * <img src="resources/guides/ttyg/ttyg-similarity-toggle-off.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * Show information about Similarity search method<br>
 * <img src="resources/guides/ttyg/ttyg-similarity-info-message.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * Enable Similarity search method<br>
 * <img src="resources/guides/ttyg/ttyg-similarity-toggle-on.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * Select index for Similarity search method<br>
 * <img src="resources/guides/ttyg/ttyg-similarity-select-index.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options). Additionally, it supports the following specific options:
 *
 * @property {boolean} [options.disable] - If true, the step will guide the user to disable the Similarity search method. If false or not provided, it will guide to enable it.
 *
 * @example
 * ```JSON
 * {
 *   "guideBlockName": "similarity-search-method",
 *   "options": {
 *     "disable": false
 *   }
 * }
 * ```
 */
const step = {
  guideBlockName: 'similarity-search-method',
  getSteps: (options, _services) => {
    options.mainAction = 'similarity-search-method';

    const shouldToggleOff = options.disable;

    if (shouldToggleOff) {
      return [{
        guideBlockName: 'ttyg-similarity-toggle-off', options: {...options}
      }];
    }

    return [
      {
        guideBlockName: 'ttyg-similarity-info-message', options: {...options}
      },
      {
        guideBlockName: 'ttyg-similarity-toggle-on', options: {...options}
      },
      {
        guideBlockName: 'ttyg-similarity-select-index', options: {...options}
      }
    ];
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
