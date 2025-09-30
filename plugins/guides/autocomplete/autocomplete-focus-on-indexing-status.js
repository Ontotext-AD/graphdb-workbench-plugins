const DEFAULT_TITLE = 'guide.step_plugin.autocomplete.default.title';
const CONTENT = 'guide.step_plugin.autocomplete-focus-on-indexing-status.content';

/**
 * @name autocomplete-focus-on-indexing-status
 * @memberof module:Interactive Guide
 *
 * @description
 *
 * The `autocomplete-focus-on-indexing-status` step produces a step that describes user that have to wait until indexing finished and shows
 * where they can see the status of autocomplete indexing process.<br>
 * <img src="resources/guides/autocomplete/autocomplete-focus-on-indexing-status.png" style="height:200px; border: solid; border-width:1px"/>
 *
 * The autocomplete-focus-on-indexing-status step can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```JSON
 * {
 *   "guideBlockName": "autocomplete-focus-on-indexing-status"
 * }
 * ```
 *
 */
const step = {
  guideBlockName: 'autocomplete-focus-on-indexing-status',
  getSteps: function(options, services) {
    const GuideUtils = services.GuideUtils;
    const translate = services.translate;

    return {
      guideBlockName: 'read-only-element',
      options: {
        content: translate(this.translationBundle, CONTENT),
        ...(options.title ? {} : {title: translate(this.translationBundle, DEFAULT_TITLE)}),
        ...options,
        url: 'autocomplete',
        elementSelector: GuideUtils.getGuideElementSelector('autocompleteStatus'),
        class: 'autocomplete-status-info',
        canBePaused: false
      }
    };
  },
  translationBundle: {
    en: {
      [DEFAULT_TITLE]: 'Enable autocomplete',
      [CONTENT]: 'Wait until indexing finished.'
    },
    fr: {
      [DEFAULT_TITLE]: 'Activer la saisie semi-automatique',
      [CONTENT]: 'Attendez que l\'indexation soit terminée.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
