const DEFAULT_TITLE = 'guide.step_plugin.class-relationships.default.title';
const CONTENT = 'guide.step_plugin.class-relationships-class-list-intro.content';

/**
 * @name class-relationships-class-list-intro
 * @memberof module:Interactive Guide
 *
 * @description
 * The `class-relationships-class-list-intro` step displays a dialog that explains class dependency table in
 * the Class relationships view.<br>
 * <img src="resources/guides/class-relationships/class-relationships-class-list-intro.png" style="height:200px; border: solid; border-width:1px"/>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```JSON
 * {
 *   "guideBlockName": "class-relationships-class-list-intro"
 * }
 * ```
 */
const step = {
  guideBlockName: 'class-relationships-class-list-intro',
  getSteps: function(options, pluginService) {
    const GuideUtils = pluginService.GuideUtils;
    const translate = pluginService.translate;
    return [
      {
        guideBlockName: 'read-only-element',
        options: {
          url: 'relationships',
          elementSelector: GuideUtils.getGuideElementSelector('class-list-wrapper'),
          placement: 'right',
          class: 'class-relationships-class-list-intro',
          content: translate(this.translationBundle, CONTENT),
          title: translate(this.translationBundle, DEFAULT_TITLE),
          ...options
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [DEFAULT_TITLE]: 'Class relationships',
      [CONTENT]: 'The left panel shows all classes, sorted by number of links, displaying both incoming and outgoing connections.'

    },
    fr: {
      [DEFAULT_TITLE]: 'Relations de classe',
      [CONTENT]: 'Le panneau de gauche montre toutes les classes, triées par nombre de liens, affichant les connexions entrantes et sortantes.'

    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
