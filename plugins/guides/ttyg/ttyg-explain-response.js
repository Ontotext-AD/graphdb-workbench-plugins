import * as Utils from '../utils.js';

const step = {
  guideBlockName: 'ttyg-explain-response',
  getSteps: (options, services) => {
    const GuideUtils = services.GuideUtils;
    const explainBtnSelector = GuideUtils.getLastGuideElementSelector('explain-response-btn');
    const elementSelector = GuideUtils.getLastGuideElementSelector('chat-item', explainBtnSelector);
    return [
      {
        // If button is not visible for some reason, skip the whole step
        guideBlockName: 'info-message',
        options: angular.extend({}, {
          url: 'ttyg',
          beforeShowPromise: (guide, currentStep) => GuideUtils.waitFor(elementSelector, 1)
            .then(() => {
              // Using a timeout because the library executes logic to show the step in a then clause which causes current and next steps to show
              setTimeout(() => guide.next());
            })
            .catch(() => {
              const stepId = currentStep.id;
              // Using a timeout because the library executes logic to show the step in a then clause which causes current and next steps to show
              setTimeout(() => guide.show(stepId + 3));
            })
        }, options)
      },
      {
        guideBlockName: 'clickable-element',
        options: {
          content: 'guide.step_plugin.ask-ttyg-agent.explain-answer',
          // If mainAction is set the title will be set automatically
          ...(options.mainAction ? {} : {title: Utils.TTYG_ASK_DEFAULT_TITLE}),
          class: 'explain-answer',
          disableNextFlow: true,
          ...options,
          url: 'ttyg',
          elementSelector
        }
      },
      Utils.getWaitForAnswerStep(GuideUtils, options)
    ];
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
