/**
 * @name configure-agent
 * @memberof module:Interactive Guide
 *
 * @description
 * Complex guide step, which takes the user through the process of configuring a TTYG agent.
 * It includes steps to edit the agent name, model, extraction methods, temperature, top-p,
 *
 * Configure agent name<br>
 * <img src="resources/guides/ttyg/configure-agent-type-agent-name.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * Configure temperature<br>
 * <img src="resources/guides/ttyg/configure-temperature.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * Configure top-p<br>
 * <img src="resources/guides/ttyg/configure-top-p.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * Configure model name<br>
 * <img src="resources/guides/ttyg/configure-agent-type-model-name.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * Configure iri discovery search<br>
 * <img src="resources/guides/ttyg/configure-iri-discovery-search.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * Configure additional instructions<br>
 * <img src="resources/guides/ttyg/configure-agent-additional-instructions.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * @property {boolean} [editName] - Whether to include steps to edit the agent name.
 * @property {string} [model] - The model name to set for the agent. If provided, steps to configure the model will be included.
 * @property {Array} [methods] - An array of method objects to configure. Each object should contain a `guideBlockName` and optional `options`.
 * @property {number} [temperature] - The temperature value to set for the agent. If provided, steps to configure temperature will be included.
 * @property {number} [topP] - The top-p value to set for the agent. If provided, steps to configure top-p will be included.
 * @property {Object} [iriDiscoverySearch] - Configuration for IRI discovery search. If provided, steps to configure it will be included.
 * @property {boolean} [iriDiscoverySearch.disable] - Whether to disable IRI discovery search.
 * @property {string} [userInstructions] - Additional user instructions to set for the agent. If
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "configure-agent",
 *  "options": {
 *    "editName": true,
 *    "model": "gpt-4o-mini",
 *    "methods": [
 *      {
 *        "guideBlockName": "fts-search-method",
 *        "options": {
 *          "disable": true
 *        }
 *      },
 *      {
 *        "guideBlockName": "similarity-search-method"
 *      }
 *    ],
 *    "temperature": 0.7,
 *    "topP": 0.9,
 *    "iriDiscoverySearch": {
 *      "disable": false
 *    },
 *    "userInstructions": "Please provide concise answers."
 *   }
 * }
 * ```
 */
const step = {
  guideBlockName: 'configure-agent',
  getSteps: (options, services) => {
    const GuideUtils = services.GuideUtils;

    const configureExtractionMethods = (services, options) => {
      const methods = options.methods || [];

      return methods.map((method) => {
        return {
          guideBlockName: method.guideBlockName,
          options: {
            disablePreviousFlow: false,
            ...method.options
          }
        };
      });
    };

    const shouldEditName = options.editName;
    const hasModelName = options.model;
    const hasUserInstructions = options.userInstructions;
    const shouldConfigureExtractionMethods = !!options.methods?.length;
    const shouldConfigureTopP = options.topP !== undefined;
    const shouldConfigureTemperature = options.temperature !== undefined;
    const shouldConfigureIriDiscoverySearch = !!options.iriDiscoverySearch;

    const steps = [
      {
        guideBlockName: 'wait-for-element-to-show',
        options: {
          elementSelectorToShow: GuideUtils.getElementSelector('.agent-settings-modal'),
          timeToWait: 10,
          ...options
        }
      }
    ];

    if (shouldEditName) {
      steps.push({
        guideBlockName: 'configure-agent-type-agent-name', options: {...options}
      });
    }

    if (shouldConfigureTemperature) {
      steps.push({
        guideBlockName: 'configure-temperature',
        options: {...options}
      });
    }

    if (shouldConfigureTopP) {
      steps.push({
        guideBlockName: 'configure-top-p',
        options: {...options}
      });
    }

    if (hasModelName) {
      steps.push({
        guideBlockName: 'configure-agent-type-model-name', options: {...options}
      });
    }

    if (shouldConfigureExtractionMethods) {
      steps.push(...configureExtractionMethods(services, options));
    }

    if (shouldConfigureIriDiscoverySearch) {
      steps.push({
        guideBlockName: 'configure-iri-discovery-search',
        options: {
          disable: options.iriDiscoverySearch.disable,
          ...options
        }
      });
    }

    if (hasUserInstructions) {
      steps.push({
        guideBlockName: 'configure-agent-additional-instructions', options: {...options}
      });
    }
    // Removes the "Previous" button from the first method control step, because there is no previous step in the form.
    steps[1].options.disablePreviousFlow = true;
    return steps;
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
