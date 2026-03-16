const CHAT_DETAILS_SELECTOR = 'chat-details';
const TTYG_ASK_DEFAULT_TITLE = 'guide.step-action.ask-ttyg-agent';
const INPUT_QUESTION = 'guide.step_plugin.ask-ttyg-agent.input-question';
const WAIT_FOR_ANSWER = 'guide.step_plugin.ask-ttyg-agent.wait-for-answer';

/**
 * @name ttyg-ask-question
 * @memberof module:Interactive Guide
 *
 * @description
 * This step focuses on guiding the user to ask a question to the TTYG agent.
 * It highlights the input area where the user can type their question and provides instructions on how to proceed.
 *
 * Ask the agent<br>
 * <img src="resources/guides/ttyg/ttyg-ask-question.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * @property {Object} [question] - The question to be asked to the TTYG agent. This will be displayed in the instructions.
 *
 * @example
 * ```JSON
 * {
 *   "guideBlockName": "ttyg-ask-question",
 *   "options": {
 *     "question": "Can you describe your purpose and dataset, please? What classes and instances are there?"
 *   }
 * }
 * ```
 */
const step = {
  guideBlockName: 'ttyg-ask-question',
  getSteps: function(options, pluginService) {
    const GuideUtils = pluginService.GuideUtils;
    const translate = pluginService.translate;
    const title = options.title ? options.title : translate(this.translationBundle, TTYG_ASK_DEFAULT_TITLE);
    return [
      {
        guideBlockName: 'input-element',
        options: {
          title,
          content: translate(this.translationBundle, INPUT_QUESTION, {question: options.question}),
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
                GuideUtils.waitFor(GuideUtils.getGuideElementSelector(CHAT_DETAILS_SELECTOR))
                  .then(() => guide.next());
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
      [INPUT_QUESTION]: 'Type "<b>{{question}}</b>" in the input and press enter',
      [WAIT_FOR_ANSWER]: 'Wait for the answer to be returned and explore it. When ready proceed by clicking next.'
    },
    fr: {
      [TTYG_ASK_DEFAULT_TITLE]: 'Demander à l\'agent',
      [INPUT_QUESTION]: 'Tapez "<b>{{question}}</b>" dans le champ de saisie et appuyez sur la touche \'Entrée\'',
      [WAIT_FOR_ANSWER]: 'Attendez que la réponse vous soit renvoyée et explorez-la. Lorsque vous êtes prêt, cliquez sur suivant.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
