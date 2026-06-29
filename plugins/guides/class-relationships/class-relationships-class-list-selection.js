const DEFAULT_TITLE = 'guide.step_plugin.class-relationships.default.title';
const CONTENT = 'guide.step_plugin.class-relationships-class-list-selection.content';

/**
 * @name class-relationships-class-list-selection
 * @memberof module:Interactive Guide
 *
 * @description
 * The `class-relationships-class-list-selection` step displays a dialog that explains how users can add or remove classes from the diagram.<br>
 * <img src="resources/guides/class-relationships/class-relationships-class-list-selection.png" style="height:200px; border: solid; border-width:1px"/>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```JSON
 * {
 *   "guideBlockName": "class-relationships-class-list-selection"
 * }
 * ```
 */
const step = {
  guideBlockName: 'class-relationships-class-list-selection',
  getSteps: function(options, pluginService) {
    const GuideUtils = pluginService.GuideUtils;
    const translate = pluginService.translate;
    return [
      {
        guideBlockName: 'focus-element',
        options: {
          url: 'relationships',
          elementSelector: GuideUtils.getGuideElementSelector('class-list'),
          placement: 'right',
          class: 'class-relationships-class-list-selection',
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
      [CONTENT]: 'Use the <b>+ / –</b> icons next to each class name to add or remove it from the diagram display.'

    },
    fr: {
      [DEFAULT_TITLE]: 'Relations de classe',
      [CONTENT]: 'Utilisez les icônes <b>+ / –</b> à côté de chaque nom de classe pour l\'ajouter ou la retirer de l\'affichage du diagramme.'

    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
