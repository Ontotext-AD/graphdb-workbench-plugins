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
        options: angular.extend({}, {
          elementSelectorToShow: GuideUtils.getElementSelector('.agent-settings-modal'),
          timeToWait: 10
        }, options)
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
