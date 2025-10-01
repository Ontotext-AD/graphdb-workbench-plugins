const CLASS_HIERARCHY_DEFAULT_TITLE = 'view.class.hierarchy.title';
const RDF_INSTANCES_SIDE_PANEL_INTRO = 'guide.step_plugin.class-hierarchy-rdf-instances-side-panel-intro.content';

/**
 * @name class-hierarchy-rdf-instances-side-panel-intro
 * @memberof module:Interactive Guide
 *
 * @description
 * This step focuses on introducing the RDF instances side panel in the class hierarchy view.
 *
 * <img src="resources/guides/class-hierarchy/class-hierarchy-rdf-instances-side-panel-intro.png" style="height:200px; border: solid">
 *
 * This step can be configured using the common options defined in [Options](#.Options). It requires `options.iri`
 *
 * @property {string} options.iri - The IRI of the class whose instances are to be viewed. This option is required.
 *
 * @example
 * ```JSON
 * {
 *   "guideBlockName": "class-hierarchy-rdf-instances-side-panel-intro",
 *   "options": {
 *     "iri": "imdb:ColorMovie"
 *   }
 * }
 * ```
 */
const step = {
  guideBlockName: 'class-hierarchy-rdf-instances-side-panel-intro',
  /**
   *
   * @param {Options} options - Options object containing settings and parameters for the step.
   * @param {PluginServiceInterface} pluginService - The plugin service used to interact with the application (e.g., translations).
   */
  getSteps: function(options, pluginService) {
    const translate = pluginService.translate;
    const title = options.title ? options.title : translate(this.translationBundle, CLASS_HIERARCHY_DEFAULT_TITLE);
    return [
      {
        guideBlockName: 'read-only-element',
        options: {
          title,
          content: translate(this.translationBundle, RDF_INSTANCES_SIDE_PANEL_INTRO, {iri: options.iri}),
          url: 'hierarchy',
          elementSelector: '.rdf-info-side-panel div',
          class: 'class-hierarchy-rdf-instances-side-panel-intro',
          canBePaused: false,
          placement: 'left',
          ...options
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [CLASS_HIERARCHY_DEFAULT_TITLE]: 'Class hierarchy',
      [RDF_INSTANCES_SIDE_PANEL_INTRO]: 'The side panel shows the first 1,000 instances of the clicked class, <b>{{iri}}</b>.'
    },

    fr: {
      [CLASS_HIERARCHY_DEFAULT_TITLE]: 'Hiérarchie de classe',
      [RDF_INSTANCES_SIDE_PANEL_INTRO]: 'Le panneau latéral affiche les 1 000 premières instances de la classe cliquée, <b>{{iri}}</b>.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
