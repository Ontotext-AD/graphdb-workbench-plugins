const CLASS_HIERARCHY_DEFAULT_TITLE = 'view.class.hierarchy.title';
const OPEN_ALL_INSTANCES_IN_SPARQL = 'guide.step_plugin.class-hierarchy-rdf-instances-side-panel-open-all-instances-in-sparql.content';

/**
 * @name class-hierarchy-rdf-instances-side-panel-open-all-instances-in-sparql
 * @memberof module:Interactive Guide
 *
 * @description
 * This step focuses on guiding the user to open all RDF instances in SPARQL from the class hierarchy view.
 *
 * <img src="resources/guides/class-hierarchy/class-hierarchy-rdf-instances-side-panel-open-all-instances-in-sparql.png" style="height:200px; border: solid">
 *
 * This step can be configured using the common options defined in [Options](#.Options). It requires `options.iri`
 *
 * @property {string} options.iri - The IRI of the class whose instances are to be viewed. This option is required.
 *
 * @example
 * ```JSON
 * {
 *   "guideBlockName": "class-hierarchy-rdf-instances-side-panel-open-all-instances-in-sparql",
 *   "options": {
 *     "iri": "imdb:ColorMovie"
 *   }
 * }
 * ```
 */
const step = {
  guideBlockName: 'class-hierarchy-rdf-instances-side-panel-open-all-instances-in-sparql',
  /**
   * @param {Options} options - Options object containing settings and parameters for the step.
   * @param {PluginServiceInterface} pluginService - The plugin service used to interact with the application (e.g., translations).
   */
  getSteps: function(options, pluginService) {
    const GuideUtils = pluginService.GuideUtils;
    const translate = pluginService.translate;
    const title = options.title? options.title : translate(this.translationBundle, CLASS_HIERARCHY_DEFAULT_TITLE);
    return [
      {
        guideBlockName: 'clickable-element',
        options: {
          title,
          content: translate(this.translationBundle, OPEN_ALL_INSTANCES_IN_SPARQL, {iri: options.iri}),
          url: 'hierarchy',
          canBePaused: false,
          elementSelector: GuideUtils.getGuideElementSelector('instances-count'),
          class: 'class-hierarchy-rdf-instances-side-panel-open-all-instances-in-sparql',
          onNextClick: GuideUtils.clickOnGuideElement('instances-count'),
          ...options
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [OPEN_ALL_INSTANCES_IN_SPARQL]: 'This link shows the number of instances for the selected class, <b>{{iri}}</b>. Click on the link to open the SPARQL editor with a preloaded query that selects all instances.',
      [CLASS_HIERARCHY_DEFAULT_TITLE]: 'Class hierarchy'
    },

    fr: {
      [OPEN_ALL_INSTANCES_IN_SPARQL]: 'Ce lien affiche le nombre d\'instances pour la classe sélectionnée, <b>{{iri}}</b>. Cliquez sur le lien pour ouvrir l\'éditeur SPARQL avec une requête préchargée qui sélectionne toutes les instances.',
      [CLASS_HIERARCHY_DEFAULT_TITLE]: 'Hiérarchie de classe'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
