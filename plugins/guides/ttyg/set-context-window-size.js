const TTYG_DEFAULT_TITLE = 'menu.ttyg.label';
const SET_CONTEXT_WINDOW_SIZE = 'guide.step_plugin.set-context-window-size.info';

/**
 * @name set-context-window-size
 * @memberof module:Interactive Guide
 *
 * @description
 * This step sets the context window size for the TTYG agent.
 * It guides the user to set the context size input to a specified value.
 *
 * Set context window size<br>
 * <img src="resources/guides/ttyg/set-context-window-size.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options). Additionally, it requires:
 *
 * @property {number} options.contextSize - The target value for the context window size.
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "set-context-window-size",
 *  "options": {
 *    "contextSize": 4096
 *  }
 * }
 * ```
 */
const step = {
  guideBlockName: 'set-context-window-size',
  getSteps: function(options, pluginService) {
    const GuideUtils = pluginService.GuideUtils;
    const translate = pluginService.translate;

    const inputSelector = GuideUtils.getGuideElementSelector('context-size-input');

    return {
      guideBlockName: 'focus-element',
      options: {
        url: 'ttyg',
        elementSelector: inputSelector,
        placement: 'bottom',
        class: 'set-context-window-size',
        content: translate(this.translationBundle, SET_CONTEXT_WINDOW_SIZE, {contextSize: options.contextSize}),
        onNextValidate: () => Promise.resolve(GuideUtils.validateTextInput(inputSelector, options.contextSize)),
        title: translate(this.translationBundle, TTYG_DEFAULT_TITLE),
        ...options
      }
    };
  },
  translationBundle: {
    en: {
      [TTYG_DEFAULT_TITLE]: 'Talk to Your Graph',
      [SET_CONTEXT_WINDOW_SIZE]: 'Set Context Size to <b>{{contextSize}}</b> so the model can use the ontology and conversation history to answer correctly'
    },
    fr: {
      [TTYG_DEFAULT_TITLE]: 'Parlez à votre graphe',
      [SET_CONTEXT_WINDOW_SIZE]: 'Définissez la taille du contexte sur <b>{{contextSize}}</b> afin que le modèle puisse utiliser l\'ontologie et l\'historique de conversation pour répondre correctement'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}

