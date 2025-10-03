import * as Utils from '../utils.js';

const TTYG_ASK_DEFAULT_TITLE = 'guide.step-action.ask-ttyg-agent';
const EXPLAIN_ANSWER_MORE = 'guide.step_plugin.ask-ttyg-agent.explain-answer-more';

/**
 * @name ttyg-ask-explain-answer-more
 * @memberof module:Interactive Guide
 *
 * @description
 * This step focuses on guiding the user to ask for more explanation about the response received from the TTYG agent.
 *
 * Click on explain more button<br>
 * <img src="resources/guides/ttyg/ttyg-ask-explain-answer-more.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "ttyg-ask-explain-answer-more",
 * }
 * ```
 */
const step = {
  guideBlockName: 'ttyg-ask-explain-answer-more',
  getSteps: function(options, pluginService) {
    const GuideUtils = pluginService.GuideUtils;
    const explainMoreBtnSelector = GuideUtils.getLastGuideElementSelector('how-derive-answer-btn');
    const elementSelector = GuideUtils.getLastGuideElementSelector('chat-item', explainMoreBtnSelector);
    const translate = pluginService.translate;
    const title = options.title ? options.title : translate(this.translationBundle, TTYG_ASK_DEFAULT_TITLE);

    return [
      {
        // If button is not visible for some reason, skip the whole step
        guideBlockName: 'info-message',
        options: {
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
          },
          ...options
        }
      },
      {
        guideBlockName: 'clickable-element',
        options: {
          title,
          content: translate(this.translationBundle, EXPLAIN_ANSWER_MORE),
          class: 'input-agent-name',
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
  },
  translationBundle: {
    en: {
      [TTYG_ASK_DEFAULT_TITLE]: 'Ask the agent',
      [EXPLAIN_ANSWER_MORE]: 'You can ask the agent how it derived the answer by clicking on the button'
    },

    fr: {
      [TTYG_ASK_DEFAULT_TITLE]: 'Demander à l\'agent',
      [EXPLAIN_ANSWER_MORE]: 'Vous pouvez demander à l\'agent comment il a obtenu la réponse en cliquant sur le bouton'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
