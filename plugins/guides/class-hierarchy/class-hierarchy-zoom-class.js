const ZOOM_CLASS_CONTENT = 'guide.step_plugin.class-hierarchy-zoom-class.content';
const CLASS_HIERARCHY_DEFAULT_TITLE = 'view.class.hierarchy.title';

/**
 * @name class-hierarchy-zoom-class
 * @memberof module:Interactive Guide
 *
 * @description
 * This step focuses on guiding users to zoom into a specific class within the class hierarchy visualization.
 * Scrolling will zoom into the class, visualizing subclasses
 *
 * <img src="resources/guides/class-hierarchy/class-hierarchy-zoom-class.png" style="height:200px; border: solid; border-width:1px"/>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @property {string} options.iri - The IRI of the class to be zoomed into. This option is required.
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "class-hierarchy-zoom-class",
 *  "options": {
 *    "iri": "imdb:ColorMovie"
 *  }
 * }
 * ```
 */
const step = {
  guideBlockName: 'class-hierarchy-zoom-class',
  /**
   * @param {Options} options - Options object containing settings and parameters for the step.
   * @param {PluginServiceInterface} pluginService - The plugin service used to interact with the application (e.g., translations).
   */
  getSteps: function(options, pluginService) {
    const GuideUtils = pluginService.GuideUtils;
    const translate = pluginService.translate;
    const title = options.title ? options.title : translate(this.translationBundle, CLASS_HIERARCHY_DEFAULT_TITLE);
    const selector = GuideUtils.getGuideElementSelector('class-' + options.iri);
    return [
      {
        guideBlockName: 'clickable-element',
        options: {
          title,
          url: 'hierarchy',
          placement: 'left',
          elementSelector: selector,
          content: translate(this.translationBundle, ZOOM_CLASS_CONTENT, {iri: options.iri}),
          class: 'class-hierarchy-zoom-class',
          onNextClick: (guide, step) => {
            GuideUtils.classHierarchyZoom(step.elementSelector);
            guide.next();
          },
          ...options
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [ZOOM_CLASS_CONTENT]: 'The class <b>{{iri}}</b> is a parent class that has subclasses. Zoom inside to have a better view by scrolling up with the mouse inside the circle.',
      [CLASS_HIERARCHY_DEFAULT_TITLE]: 'Class hierarchy'
    },

    fr: {
      [ZOOM_CLASS_CONTENT]: 'La classe <b>{{iri}}</b> est une classe parente qui a des sous-classes. Zoomez à l\'intérieur pour avoir une meilleure vue en faisant défiler vers le haut avec la souris à l\'intérieur du cercle.',
      [CLASS_HIERARCHY_DEFAULT_TITLE]: 'Hiérarchie de classe'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
