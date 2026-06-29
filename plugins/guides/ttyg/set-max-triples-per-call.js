const FTS_METHOD_DEFAULT_TITLE = 'guide.step-action.fts-search-method';
const SET_MAX_TRIPLES_PER_CALL = 'guide.step_plugin.fts-search-method.set-max-triples-per-call';

/**
 * @name set-max-triples-per-call
 * @memberof module:Interactive Guide
 *
 * @description
 * This step guides the user to set the maximum number of triples to retrieve per call in the FTS search method configuration.
 * It highlights the input field and provides instructions on how to proceed.
 *
 * Set maximum triples per call<br>
 * <img src="resources/guides/ttyg/set-max-triples-per-call.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options). Additionally it supports:
 *
 * @property {number} options.maxTriplesPerCall - The maximum number of triples to retrieve per call. This will be displayed in the instructions and used for validation.
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "set-max-triples-per-call",
 *  "options": {
 *    "maxTriplesPerCall": 100
 *  }
 * }
 * ```
 */
const step = {
  guideBlockName: 'set-max-triples-per-call',
  getSteps: function(options, pluginService) {
    const GuideUtils = pluginService.GuideUtils;
    const translate = pluginService.translate;

    return {
      guideBlockName: 'input-element',
      options: {
        content: translate(this.translationBundle, SET_MAX_TRIPLES_PER_CALL, {maxTriplesPerCall: options.maxTriplesPerCall}),
        title: translate(this.translationBundle, FTS_METHOD_DEFAULT_TITLE),
        class: 'toggle-fts-search',
        ...options,
        url: 'ttyg',
        elementSelector: GuideUtils.getGuideElementSelector('max-triples-per-call-input'),
        onNextValidate: () => {
          if (options.maxTriplesPerCall) {
            return Promise.resolve(GuideUtils.validateTextInput(GuideUtils.getGuideElementSelector('max-triples-per-call-input'), options.maxTriplesPerCall, false));
          }
          return Promise.resolve(true);
        }
      }
    };
  },
  translationBundle: {
    en: {
      [FTS_METHOD_DEFAULT_TITLE]: 'FTS search query method',
      [SET_MAX_TRIPLES_PER_CALL]: 'Type <b>{{maxTriplesPerCall}}</b> as the maximum number of triples to retrieve per call.'
    },
    fr: {
      [FTS_METHOD_DEFAULT_TITLE]: 'Méthode de recherche FTS',
      [SET_MAX_TRIPLES_PER_CALL]: 'Saisissez <b>{{maxTriplesPerCall}}</b> comme nombre maximum de triplets à récupérer par appel.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
