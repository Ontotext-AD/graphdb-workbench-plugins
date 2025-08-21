import {TTYG_SELECT_AGENT_DEFAULT_TITLE} from '../utils.js';

const step = {
  guideBlockName: 'ttyg-select-agent-check-for-missing-repository-cancel',
  getSteps: (options, services) => {
    const GuideUtils = services.GuideUtils;

    return [
      {
        // If missing repository modal is visible go to next step, otherwise skip it
        guideBlockName: 'info-message',
        options: angular.extend({}, {
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
          }
        }, options)
      },
      {
        guideBlockName: 'clickable-element',
        options: {
          content: 'guide.step_plugin.select-ttyg-agent.missing-repository',
          // If mainAction is set the title will be set automatically
          ...(options.mainAction ? {} : {title: TTYG_SELECT_AGENT_DEFAULT_TITLE}),
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
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
