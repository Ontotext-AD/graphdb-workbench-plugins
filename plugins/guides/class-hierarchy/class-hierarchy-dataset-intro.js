const RDF_INSTANCES_TITLE = 'guide.step_plugin.class-hierarchy-instances.title';

/**
 * @name class-hierarchy-dataset-intro
 * @memberof module:Interactive Guide
 *
 * @description
 * Showcases a visualizes the top level of a class dataset and its subclasses.
 *
 * <img src="resources/guides/class-hierarchy/class-hierarchy-dataset-intro.png" style="height:200px; border: solid; border-width:1px"/>
 *
 * @example
 * ```JSON
 * {
 *   "guideBlockName": "class-hierarchy-dataset-intro"
 * }
 * ```
 */
const step = {
  guideBlockName: 'class-hierarchy-dataset-intro',
  /**
   * @param {Options} options - Options object containing settings and parameters for the step.
   * @param {PluginServiceInterface} pluginService - The plugin service used to interact with the application (e.g., translations).
   */
  getSteps: function(options, pluginService) {
    const translate = pluginService.translate;
    const title = options.title ? options.title : translate(this.translationBundle, RDF_INSTANCES_TITLE);
    return [
      {
        guideBlockName: 'read-only-element',
        options: {
          title,
          url: 'hierarchy',
          elementSelector: '#classChart #main-group',
          placement: 'left',
          class: 'class-hierarchy-dataset-intro',
          ...options
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [RDF_INSTANCES_TITLE]: 'Class hierarchy instances'
    },

    fr: {
      [RDF_INSTANCES_TITLE]: 'Instances de hiérarchie de classes'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
