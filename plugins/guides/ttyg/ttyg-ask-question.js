import * as Utils from '../utils.js';

const step = {
  guideBlockName: 'ttyg-ask-question',
  getSteps: (options, services) => {
    const GuideUtils = services.GuideUtils;
    return [
      {
        guideBlockName: 'input-element',
        options: {
          content: 'guide.step_plugin.ask-ttyg-agent.input-question',
          // If mainAction is set the title will be set automatically
          ...(options.mainAction ? {} : {title: Utils.TTYG_ASK_DEFAULT_TITLE}),
          class: 'input-question',
          disableNextFlow: true,
          ...options,
          url: 'ttyg',
          elementSelector: GuideUtils.getGuideElementSelector('question-input'),
          show: (guide) => () => {
            const elementSelector = GuideUtils.getGuideElementSelector('contenteditable');

            // Add "keydown" listener to the element.
            // The question-input directive listens for "Enter" keypress to trigger question asking.
            // When enter is pressed, proceed with next step.
            // Using 'keydown' to trigger before the directive 'keypress', which clears the value.
            $(elementSelector).on('keydown', (event) => {
              const value = $(elementSelector).text();

              if (value && event.key === 'Enter' && !event.shiftKey && !event.ctrlKey) {
                guide.next();
              }
            });
          },
          hide: () => () => {
            const elementSelector = GuideUtils.getGuideElementSelector('contenteditable');
            // Remove the "keydown" listener of the element. It is important when the step is hidden.
            $(elementSelector).off('keydown');
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
