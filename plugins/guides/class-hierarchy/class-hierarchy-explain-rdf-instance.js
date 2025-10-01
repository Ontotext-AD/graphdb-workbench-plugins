const CLASS_HIERARCHY_DEFAULT_TITLE = 'view.class.hierarchy.title';
const EXPLAIN_RDF_INSTANCE = 'guide.step_plugin.class-hierarchy-explain-rdf-instance.content';

/**
 * @name class-hierarchy-explain-rdf-instance
 * @memberof module:Interactive Guide
 *
 * @description
 * This step focuses on explaining a specific RDF instance within the class hierarchy visualization.
 * It highlights the selected instance and provides detailed information about it.
 *
 * <img src="resources/guides/class-hierarchy/class-hierarchy-explain-rdf-instance.png" style="height:200px; border: solid; border-width:1px"/>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @property {string} options.iri - The IRI of the class to which the instance belongs. This option is required.
 * @property {string} options.instance - The label of the RDF instance to be explained. This option is required.
 * @property {Object} [options.extraContent] - Bundle object with additional content to display.
 *
 * @example
 * ```JSON
 * {
 *   "guideBlockName": "class-hierarchy-explain-rdf-instance",
 *   "options": {
 *     "iri": "imdb:ColorMovie",
 *     "instance": "The Godfather",
 *     "extraContent": {
 *       "en": "My additional content in English",
 *       "fr": "Mon contenu additionnel en français"
 *     }
 *   }
 * }
 * ```
 */
const step = {
  guideBlockName: 'class-hierarchy-explain-rdf-instance',
  /**
   * @param {Options} options - Options object containing settings and parameters for the step.
   * @param {PluginServiceInterface} pluginService - The plugin service used to interact with the application (e.g., translations).
   */
  getSteps: function(options, pluginService) {
    const GuideUtils = pluginService.GuideUtils;
    const translate = pluginService.translate;
    const title = options.title ? options.title : translate(this.translationBundle, CLASS_HIERARCHY_DEFAULT_TITLE);
    return [
      {
        guideBlockName: 'read-only-element',
        options: {
          title,
          content: translate(this.translationBundle, EXPLAIN_RDF_INSTANCE, {
            iri: options.iri,
            focusInstance: options.instance
          }),
          url: 'hierarchy',
          canBePaused: false,
          elementSelector: GuideUtils.getGuideElementSelector('instance-' + options.instance),
          class: 'class-hierarchy-explain-rdf-instance',
          focusInstance: options.instance,
          extraContent: options.extraContent,
          ...options
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [CLASS_HIERARCHY_DEFAULT_TITLE]: 'Class hierarchy',
      [EXPLAIN_RDF_INSTANCE]: '<b>{{focusInstance}}</b> is an instance of the class <b>{{iri}}</b>.'
    },

    fr: {
      [CLASS_HIERARCHY_DEFAULT_TITLE]: 'Hiérarchie de classe',
      [EXPLAIN_RDF_INSTANCE]: '<b>{{focusInstance}}</b> est une instance de la classe <b>{{iri}}</b>.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
