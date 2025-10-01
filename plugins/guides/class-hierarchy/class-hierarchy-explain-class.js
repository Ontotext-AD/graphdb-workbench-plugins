import * as Utils from '../utils.js';

const CLASS_HIERARCHY_DEFAULT_TITLE = 'view.class.hierarchy.title';
/**
 * @name class-hierarchy-explain-class
 * @memberof module:Interactive Guide
 *
 * @description
 * This step focuses on explaining a specific class within the class hierarchy visualization.
 * It highlights the selected class and provides detailed information about it
 *
 * * <img src="resources/guides/class-hierarchy/class-hierarchy-explain-class.png" style="height:200px; border: solid; border-width:1px"/>
 *
 * @example
 * ```JSON
 * {
 * "guideBlockName": "class-hierarchy-explain-class",
 * }
 * ```
 */
const step = {
  guideBlockName: 'class-hierarchy-explain-class',
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
        guideBlockName: 'read-only-element',
        options: {
          title,
          url: 'hierarchy',
          placement: 'left',
          elementSelector: selector,
          class: 'class-hierarchy-explain-class',
          show: () => Utils.disableAllRDFClasses,
          hide: () => Utils.enableAllRDFClasses,
          ...options
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [CLASS_HIERARCHY_DEFAULT_TITLE]: 'Class hierarchy'
    },

    fr: {
      [CLASS_HIERARCHY_DEFAULT_TITLE]: 'Hiérarchie de classe'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
