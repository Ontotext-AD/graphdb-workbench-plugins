const DEFAULT_TITLE = 'guide.step_plugin.class-relationships.default.title';
const CONTENT = 'guide.step_plugin.class-relationships-class-list-background-intro.content';

/**
 * @name class-relationships-class-list-background-intro
 * @memberof module:Interactive Guide
 *
 * @description
 * The `class-relationships-class-list-background-intro` step displays a dialog that explains which classes are highlighted
 * in the dependency table of the Class Relationships view.<br>
 * <img src="resources/guides/class-relationships/class-relationships-class-list-background-intro.png" style="height:200px; border: solid; border-width:1px"/>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```JSON
 * {
 *   "guideBlockName": "class-relationships-class-list-background-intro"
 * }
 * ```
 */
const step = {
  guideBlockName: 'class-relationships-class-list-background-intro',
  getSteps: function(options, pluginService) {
    const GuideUtils = pluginService.GuideUtils;
    const translate = pluginService.translate;
    return [
      {
        guideBlockName: 'read-only-element',
        options: {
          url: 'relationships',
          elementSelector: GuideUtils.getGuideElementSelector('class-list'),
          placement: 'right',
          class: 'class-relationships-class-list-background-intro',
          content: translate(this.translationBundle, CONTENT),
          title: options.title ?? translate(this.translationBundle, DEFAULT_TITLE),
          ...options
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [DEFAULT_TITLE]: 'Class relationships',
      [CONTENT]: 'A <b>green background</b> behind a class name in the list indicates that it is currently shown in the diagram.'
    },
    fr: {
      [DEFAULT_TITLE]: 'Relations de classe',
      [CONTENT]: 'Un <b>arrière-plan vert</b> derrière un nom de classe dans la liste indique qu\'elle est actuellement affichée dans le diagramme.'

    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
