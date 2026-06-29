const TTYG_DEFAULT_TITLE = 'menu.ttyg.label';
const SET_MAX_IRIS_PER_CALL = 'guide.step_plugin.ttyg.set-max-iris-per-call';

/**
 * @name set-max-iris-per-call
 * @memberof module:Interactive Guide
 *
 * @description
 * This step guides the user to set the maximum number of IRIs to retrieve per call in the TTYG agent configuration.
 * It highlights the input field and provides instructions on how to proceed.
 *
 * Set maximum IRIs per call<br>
 * <img src="resources/guides/ttyg/set-max-iris-per-call.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options). Additionally, it supports:
 *
 * @property {number} options.maxIrisPerCall - The maximum number of IRIs per call. This will be displayed in the instructions and used for validation.
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "set-max-iris-per-call",
 *  "options": {
 *    "maxIrisPerCall": 20
 *  }
 * }
 * ```
 */
const step = {
  guideBlockName: 'set-max-iris-per-call',
  getSteps: function(options, pluginService) {
    const GuideUtils = pluginService.GuideUtils;
    const translate = pluginService.translate;
    const maxIrisPerCall = options.maxIrisPerCall ?? 10;
    const maxIrisInputSelector = GuideUtils.getGuideElementSelector('autocomplete-max-iris-input');

    return {
      guideBlockName: 'input-element',
      options: {
        content: translate(this.translationBundle, SET_MAX_IRIS_PER_CALL, {maxIrisPerCall}),
        title: translate(this.translationBundle, TTYG_DEFAULT_TITLE),
        class: 'set-max-iris-per-call',
        ...options,
        url: 'ttyg',
        elementSelector: maxIrisInputSelector,
        onNextValidate: () => {
          return Promise.resolve(GuideUtils.validateTextInput(maxIrisInputSelector, maxIrisPerCall, false));
        }
      }
    };
  },
  translationBundle: {
    en: {
      [TTYG_DEFAULT_TITLE]: 'Talk to Your Graph',
      [SET_MAX_IRIS_PER_CALL]: 'Set the <b>Max number of results (IRIs) per call</b> to <b>{{maxIrisPerCall}}</b>.<br>This setting limits how many candidate IRIs the agent retrieves in a single autocomplete call when trying to resolve partial names. Keeping this value at a reasonable level helps control the amount of data returned so that the agent sees a manageable set of possible matches without overwhelming the query context.'
    },
    fr: {
      [TTYG_DEFAULT_TITLE]: 'Parlez à votre graphe',
      [SET_MAX_IRIS_PER_CALL]: 'Réglez le <b>Nombre maximal de résultats (IRI) par appel</b> sur <b>{{maxIrisPerCall}}</b>.<br>Ce paramètre limite le nombre d\'IRI candidates que l\'agent récupère lors d\'un seul appel d\'autocomplétion lorsqu\'il tente de résoudre des noms partiels. Maintenir cette valeur à un niveau raisonnable aide à contrôler la quantité de données renvoyées afin que l\'agent voie un ensemble gérable de correspondances possibles sans submerger le contexte de la requête.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
