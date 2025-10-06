const TTYG_SELECT_AGENT_DEFAULT_TITLE = 'guide.step-action.select-ttyg-agent';
const MISSING_REPOSITORY = 'guide.step_plugin.select-ttyg-agent.missing-repository';

/**
 * @name ttyg-select-agent-check-for-missing-repository-cancel
 * @memberof module:Interactive Guide
 *
 * @description
 * This step displays, that a repository is missing for the selected agent
 *
 * Missing repository for selected agent<br>
 * <img src="resources/guides/ttyg/ttyg-select-agent-check-for-missing-repository-cancel.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "ttyg-select-agent-check-for-missing-repository-cancel",
 * }
 * ```
 */
const step = {
  guideBlockName: 'ttyg-select-agent-check-for-missing-repository-cancel',
  getSteps: function(options, pluginService) {
    const GuideUtils = pluginService.GuideUtils;
    const translate = pluginService.translate;

    return [
      {
        // If missing repository modal is visible go to next step, otherwise skip it
        guideBlockName: 'info-message',
        options: {
          beforeShowPromise: (guide, currentStep) => {
            return GuideUtils.getOrWaitFor(GuideUtils.getElementSelector('.confirm-dialog .cancel-btn'), 1)
              .then(() => {
                // Using a timeout because the library executes logic to show the step in a then clause which causes current and next steps to show
                setTimeout(() => guide.next());
              })
              .catch(() => {
                const stepId = currentStep.id;
                // Using a timeout because the library executes logic to show the step in a then clause which causes current and next steps to show
                setTimeout(() => guide.show(stepId + 2));
              });
          },
          ...options
        }
      },
      {
        guideBlockName: 'clickable-element',
        options: {
          content: translate(this.translationBundle, MISSING_REPOSITORY),
          ...(options.title ?? {title: translate(this.translationBundle, TTYG_SELECT_AGENT_DEFAULT_TITLE)}),
          ...options,
          elementSelector: GuideUtils.getElementSelector('.confirm-dialog .cancel-btn'),
          showOn: () => GuideUtils.isVisible('.confirm-dialog .cancel-btn'),
          onNextClick: () => {
            // Close the modal by clicking on the cancel button
            GuideUtils.clickOnElement('.confirm-dialog .cancel-btn')();
          },
          show: (guide, currentStep) => () => {
            const currentStepId = currentStep.id;
            // Add a "click" listener to the element.
            // Upon clicking the element, the guide is set back 3 steps to "open dropdown" step
            $(currentStep.elementSelector).on('click', () => {
              guide.show(currentStepId - 3);
            });
          },
          hide: (guide, currentStep) => () => {
            // Remove the "click" listener of the element. It is important when the step is hidden.
            $(currentStep.elementSelector).off('click');
          }
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [TTYG_SELECT_AGENT_DEFAULT_TITLE]: 'Select an agent',
      [MISSING_REPOSITORY]: 'The agent you selected has no repository. Please select an agent configured with current repository.'
    },

    fr: {
      [TTYG_SELECT_AGENT_DEFAULT_TITLE]: 'Sélectionner un agent',
      [MISSING_REPOSITORY]: 'L\'agent que vous avez sélectionné n\'a pas de référentiel. Veuillez sélectionner un agent configuré avec le référentiel actuel.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
