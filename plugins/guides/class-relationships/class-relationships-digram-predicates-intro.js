const DEFAULT_TITLE = 'guide.step_plugin.class-relationships.default.title';
const CONTENT = 'guide.step_plugin.class-relationships-digram-predicates-intro.content';

/**
 * @name class-relationships-digram-predicates-intro
 * @memberof module:Interactive Guide
 *
 * @description
 * The `class-relationships-digram-predicates-intro` step displays a dialog that explains how to explore the relationships between classes
 * by clicking on a connection line in the diagram to view the top predicates linking them.<br>
 * <img src="resources/guides/class-relationships/class-relationships-digram-predicates-intro.png" style="height:200px; border: solid; border-width:1px"/>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```JSON
 * {
 *   "guideBlockName": "class-relationships-digram-predicates-intro"
 * }
 * ```
 */
const step = {
  guideBlockName: 'class-relationships-digram-predicates-intro',
  getSteps: function(options, pluginService) {
    const GuideUtils = pluginService.GuideUtils;
    const translate = pluginService.translate;
    return [
      {
        guideBlockName: 'focus-element',
        options: {
          url: 'relationships',
          elementSelector: GuideUtils.getGuideElementSelector('relationships-diagram'),
          placement: 'left',
          class: 'class-relationships-digram-predicates-intro',
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
      [CONTENT]: 'Click on any connection line in the diagram to see the top predicates used between those two classes. This helps to understand what kind of relationships link them.'

    },
    fr: {
      [DEFAULT_TITLE]: 'Relations de classe',
      [CONTENT]: 'Cliquez sur n\'importe quelle ligne de connexion dans le diagramme pour voir les principaux prédicats utilisés entre ces deux classes. Cela aide à comprendre quel type de relations les lie.'

    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
