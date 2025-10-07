const MISSING_KEY_TITLE = 'guide.step_plugin.ttyg.missing-key.title';
const MISSING_KEY_CONTENT = 'guide.step_plugin.ttyg.missing-key.content';

/**
 * @name end-on-api-key-error
 * @memberof module:Interactive Guide
 *
 * @description
 * This step checks for an API key error message and ends the guide if the error is present.
 *
 * Missing OpenAI key error message<br>
 * <img src="resources/guides/ttyg/end-on-api-key-error.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "end-on-api-key-error",
 * }
 * ```
 */
const step = {
  guideBlockName: 'end-on-api-key-error',
  getSteps: function(options, pluginService) {
    const GuideUtils = pluginService.GuideUtils;
    options.mainAction = 'end-on-api-key-error';
    const translate = pluginService.translate;

    return [
      {
        guideBlockName: 'guide-end',
        options: {
          title: translate(this.translationBundle, MISSING_KEY_TITLE),
          content: translate(this.translationBundle, MISSING_KEY_CONTENT),
          url: 'ttyg',
          beforeShowPromise: (guide, currentStepDescription) => {
            // Check if error toast is visible waiting for 1 seconds
            return GuideUtils.waitFor('.toast-message', 1)
              .then((element) => {
                if (element.text().includes('graphdb.openai.api-key')) {
                  // Error toast is visible, show this step and complete on next click
                  currentStepDescription.onNextClick = (guide) => {
                    guide.complete();
                  };
                } else {
                  // Toast is not visible, but not the correct, so we go on
                  setTimeout(() => {
                    guide.next();
                  });
                }
              })
              .catch(() => {
                // Error toast is not visible, skip this step and move to next one
                // Using a timeout because the library executes logic to show the step in a then clause which causes current and next steps to show
                setTimeout(() => {
                  guide.next();
                });
              });
          },
          ...options
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [MISSING_KEY_TITLE]: 'Missing OpenAI key',
      [MISSING_KEY_CONTENT]: 'To use <b>Talk to Your Graph</b>, GraphDB must first be configured to work with LLM API. Please ensure that the necessary LLM API type, url and key are in place before starting. For detailed setup instructions, refer to the documentation or contact your administrator.'
    },
    fr: {
      [MISSING_KEY_TITLE]: 'Clé OpenAI manquante',
      [MISSING_KEY_CONTENT]: 'Pour utiliser <b>Parlez à votre graphique</b>, GraphDB doit d\'abord être configuré pour fonctionner avec l\'API LLM. Veuillez vous assurer que le type d\'API LLM requis, l\'URL et la clé sont bien en place avant de commencer. Pour des instructions de configuration détaillées, reportez-vous à la documentation ou contactez votre administrateur.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
