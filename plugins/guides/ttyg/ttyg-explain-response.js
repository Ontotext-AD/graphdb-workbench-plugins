const TTYG_ASK_DEFAULT_TITLE = 'guide.step-action.ask-ttyg-agent';
const EXPLAIN_ANSWER = 'guide.step_plugin.ask-ttyg-agent.explain-answer';
const WAIT_FOR_ANSWER = 'guide.step_plugin.ask-ttyg-agent.wait-for-answer';

/**
 * @name ttyg-explain-response
 * @memberof module:Interactive Guide
 *
 * @description
 * This step focuses on guiding the user to explain the response received from the TTYG agent.
 *
 * Click on explain button<br>
 * <img src="resources/guides/ttyg/ttyg-explain-response.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "ttyg-explain-response",
 * }
 * ```
 */
const step = {
  guideBlockName: 'ttyg-explain-response',
  getSteps: function(options, pluginService) {
    const GuideUtils = pluginService.GuideUtils;
    const explainBtnSelector = GuideUtils.getLastGuideElementSelector('explain-response-btn');
    const elementSelector = GuideUtils.getLastGuideElementSelector('chat-item', explainBtnSelector);
    const translate = pluginService.translate;
    const title = options.title ? options.title : translate(this.translationBundle, TTYG_ASK_DEFAULT_TITLE);
    return [
      {
        // If button is not visible for some reason, skip the whole step
        guideBlockName: 'info-message',
        options: {
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
            }),
          ...options
        }
      },
      {
        guideBlockName: 'clickable-element',
        options: {
          title,
          content: translate(this.translationBundle, EXPLAIN_ANSWER),
          class: 'explain-answer',
          disableNextFlow: true,
          ...options,
          url: 'ttyg',
          elementSelector
        }
      },
      {
        guideBlockName: 'hold-and-wait-until-hidden',
        options: {
          title,
          content: translate(this.translationBundle, WAIT_FOR_ANSWER),
          class: 'wait-for-answer',
          url: 'ttyg',
          elementSelector: GuideUtils.getGuideElementSelector('chat-details'),
          elementSelectorToWait: GuideUtils.getGuideElementSelector('question-loader'),
          ...options
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [TTYG_ASK_DEFAULT_TITLE]: 'Ask the agent',
      [EXPLAIN_ANSWER]: 'Explain the answer by clicking on the \'Explain response\' button.',
      [WAIT_FOR_ANSWER]: 'Wait for the answer to be returned and explore it. When ready proceed by clicking next.'
    },
    fr: {
      [TTYG_ASK_DEFAULT_TITLE]: 'Demander à l\'agent',
      [EXPLAIN_ANSWER]: 'Expliquez la réponse en cliquant sur le bouton \'Expliquer la réponse\'',
      [WAIT_FOR_ANSWER]: 'Attendez que la réponse vous soit renvoyée et explorez-la. Lorsque vous êtes prêt, cliquez sur suivant.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
