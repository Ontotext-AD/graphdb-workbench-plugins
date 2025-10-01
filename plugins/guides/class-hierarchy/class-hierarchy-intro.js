const INTRO_CONTENT = 'guide.step_plugin.class-hierarchy-intro.content';
const CLASS_HIERARCHY_DEFAULT_TITLE = 'view.class.hierarchy.title';

/**
 * @name class-hierarchy-intro
 * @memberof module:Interactive Guide
 *
 * @description
 * The Class Hierarchy Intro step provides an introduction to the class hierarchy visualization,
 * explaining how to interpret the circles representing classes and their subclasses.
 *
 * <img src="resources/guides/class-hierarchy/class-hierarchy-intro.png" style="height:200px; border: solid; border-width:1px"/>
 *
 * @example
 * ```JSON
 * {
 *   "guideBlockName": "class-hierarchy-intro"
 * }
 * ```
 */
const step = {
  guideBlockName: 'class-hierarchy-intro',
  /**
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
          content: pluginService.translate(this.translationBundle, INTRO_CONTENT),
          url: 'hierarchy',
          elementSelector: '#classChart',
          placement: 'left',
          class: 'clas-hierarchy-intro',
          ...options
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [INTRO_CONTENT]: 'The biggest circle shows all top-level classes. Every class may have subclasses shown as smaller circles within their parent class. The size of each circle indicates the proportion of RDF resources that belong to that class. Thus, bigger circles are classes that have more instances.',
      [CLASS_HIERARCHY_DEFAULT_TITLE]: 'Class hierarchy'
    },

    fr: {
      [INTRO_CONTENT]: 'Le plus grand cercle montre toutes les classes de niveau supérieur. Chaque classe peut avoir des sous-classes représentées par des cercles plus petits dans leur classe parente. La taille de chaque cercle indique la proportion de ressources RDF qui lui appartiennent. Ainsi, les grands cercles sont des classes qui ont plus d\'instances.',
      [CLASS_HIERARCHY_DEFAULT_TITLE]: 'Hiérarchie de classe'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
