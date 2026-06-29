const DEFAULT_TITLE = 'guide.step_plugin.class-relationships.default.title';
const CONTENT = 'guide.step_plugin.class-relationships-named-graph-selection.content';

/**
 * @name class-relationships-named-graph-selection
 * @memberof module:Interactive Guide
 *
 * @description
 * The `class-relationships-named-graph-selection` step displays a dialog that explains how to filter the Class Relationships view
 * by selecting a specific named graph from the All graphs dropdown.<br>
 * <img src="resources/guides/class-relationships/class-relationships-named-graph-selection.png" style="height:200px; border: solid; border-width:1px"/>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```JSON
 * {
 *   "guideBlockName": "class-relationships-named-graph-selection"
 * }
 * ```
 */
const step = {
  guideBlockName: 'class-relationships-named-graph-selection',
  getSteps: function(options, pluginService) {
    const GuideUtils = pluginService.GuideUtils;
    const elementSelector = GuideUtils.getGuideElementSelector('graph-select-dropdown');
    const translate = pluginService.translate;
    return [
      {
        guideBlockName: 'read-only-element',
        options: {
          url: 'relationships',
          elementSelector,
          placement: 'left',
          class: 'class-relationships-named-graph-selection',
          content: translate(this.translationBundle, CONTENT),
          scrollToHandler: () => GuideUtils.scrollIntoView(elementSelector, {block: 'center'}),
          title: translate(this.translationBundle, DEFAULT_TITLE),
          ...options
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [DEFAULT_TITLE]: 'Class relationships',
      [CONTENT]: 'If the repository contains more than one named graph, you can filter the view by opening the <b>All graphs</b> dropdown (next to the toolbar) and selecting the graph to explore.'

    },
    fr: {
      [DEFAULT_TITLE]: 'Relations de classe',
      [CONTENT]: 'Si le référentiel contient plus d\'un graphe nommé, vous pouvez filtrer la vue en ouvrant le menu déroulant <b>Tous les graphes</b> (à côté de la barre d\'outils) et en sélectionnant le graphe à explorer.'

    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
