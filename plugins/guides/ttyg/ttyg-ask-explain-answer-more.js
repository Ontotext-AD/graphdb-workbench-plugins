import * as Utils from '../utils.js';

const step = {
  guideBlockName: 'ttyg-ask-explain-answer-more',
  getSteps: (options, services) => {
    const GuideUtils = services.GuideUtils;
    const explainMoreBtnSelector = GuideUtils.getLastGuideElementSelector('how-derive-answer-btn');
    const elementSelector = GuideUtils.getLastGuideElementSelector('chat-item', explainMoreBtnSelector);
    return [
      {
        // If button is not visible for some reason, skip the whole step
        guideBlockName: 'info-message',
        options: angular.extend({}, {
          url: 'ttyg',
          beforeShowPromise: (guide, currentStep) => {
            return GuideUtils.waitFor(elementSelector, 1)
              .then(() => {
                // Using a timeout because the library executes logic to show the step in a then clause which causes current and next steps to show
                setTimeout(() => guide.next());
              })
              .catch(() => {
                const stepId = currentStep.id;
                // Using a timeout because the library executes logic to show the step in a then clause which causes current and next steps to show
                setTimeout(() => guide.show(stepId + 3));
              });
          }
        }, options)
      },
      {
        guideBlockName: 'clickable-element',
        options: {
          content: 'guide.step_plugin.ask-ttyg-agent.explain-answer-more',
          class: 'input-agent-name',
          // If mainAction is set the title will be set automatically
          ...(options.mainAction ? {} : {title: Utils.TTYG_ASK_DEFAULT_TITLE}),
          disableNextFlow: true,
          ...options,
          url: 'ttyg',
          elementSelector,
          show: (guide) => () => {
            // Add "click" listener to the element. Upon clicking the element is hidden and this breaks the default flow of the guide.
            // Adding a handler to proceed to next step
            $(elementSelector).on('click', () => {
              guide.next();
            });
          },
          hide: () => () => {
            // Remove the "click" listener of element. It is important when step is hidden.
            $(elementSelector).off('click');
          }
        }
      },
      Utils.getWaitForAnswerStep(GuideUtils, options)
    ];
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
