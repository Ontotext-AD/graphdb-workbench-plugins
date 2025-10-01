const TOGGLE_PREFIXES_CONTENT = 'guide.step_plugin.class-hierarchy-toggle-prefixes.content';
const CLASS_HIERARCHY_DEFAULT_TITLE = 'view.class.hierarchy.title';

/**
 * @name class-hierarchy-toggle-prefixes
 * @memberof module:Interactive Guide
 *
 * @description
 * This step focuses on the button that toggles the display of prefixes in the class hierarchy view.
 *
 * <img src="resources/guides/class-hierarchy/class-hierarchy-toggle-prefixes.png" style="height:200px; border: solid; border-width:1px"/>
 *
 * * @example
 * ```JSON
 * {
 *   "guideBlockName": "class-hierarchy-toggle-prefixes",
 * }
 * ```
 */
const step = {
  guideBlockName: 'class-hierarchy-toggle-prefixes',
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
        guideBlockName: 'clickable-element',
        options: {
          title,
          content: translate(this.translationBundle, TOGGLE_PREFIXES_CONTENT),
          url: 'hierarchy',
          elementSelector: '.prefix-toggle-btn',
          class: 'class-hierarchy-toggle-prefixes',
          scrollToHandler: GuideUtils.scrollToTop,
          onNextClick: (_guide) => {
            GuideUtils.clickOnElement('.prefix-toggle-btn')();
          },
          ...options
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [TOGGLE_PREFIXES_CONTENT]: 'Click on <b>Show prefixes/Hide prefixes</b> to toggle the display of the prefixes.',
      [CLASS_HIERARCHY_DEFAULT_TITLE]: 'Class hierarchy'
    },

    fr: {
      [TOGGLE_PREFIXES_CONTENT]: 'Cliquez sur <b>Afficher les préfixes/Masquer les préfixes</b> pour afficher ou masquer les préfixes.',
      [CLASS_HIERARCHY_DEFAULT_TITLE]: 'Hiérarchie de classe'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
