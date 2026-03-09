const VISUAL_GRAPH_EXPLORE_TITLE = 'guide.step-action.visual-graph';
const VISUAL_GRAPH_CONFIG_SHARE_CONTENT = 'guide.step-action.visual-graph-config-share-content';

/**
 * @name visual-graph-config-share
 * @memberof module:Interactive Guide
 *
 * @description
 * This step guides the user to check the share visual graph configuration checkbox to make the config available to other users
 *
 * Share visual graph config step<br>
 * <img src="resources/guides/visual-graph/visual-graph-config-share.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```JSON
 * {
 *   "guideBlockName": "visual-graph-config-share",
 * }
 * ```
 */
const step = {
  guideBlockName: 'visual-graph-config-share',
  getSteps: function(options, pluginServices) {
    const translate = pluginServices.translate;
    const GuideUtils = pluginServices.GuideUtils;
    const elementSelector = GuideUtils.getGuideElementSelector('share-graph-config');

    return [
      {
        guideBlockName: 'clickable-element',
        options: {
          content: translate(this.translationBundle, VISUAL_GRAPH_CONFIG_SHARE_CONTENT),
          ...(options.title ?? {title: translate(this.translationBundle, VISUAL_GRAPH_EXPLORE_TITLE)}),
          url: 'graphs-visualizations/config/save',
          elementSelector,
          onNextValidate: () => Promise.resolve(GuideUtils.isChecked(elementSelector)),
          scrollToHandler: () => GuideUtils.scrollIntoView(elementSelector, {block: 'center', behavior: 'smooth'}),
          ...options
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [VISUAL_GRAPH_EXPLORE_TITLE]: 'Visual graph explore',
      [VISUAL_GRAPH_CONFIG_SHARE_CONTENT]: 'Check the <b>Share visual graph with other users</b> box to make the visual graph configuration available to other users in the repository.'
    },
    fr: {
      [VISUAL_GRAPH_EXPLORE_TITLE]: 'Explorer le graphique visuel',
      [VISUAL_GRAPH_CONFIG_SHARE_CONTENT]: 'Cochez la case <b>Partager le graphique visuel avec d\'autres utilisateurs</b> pour rendre la configuration du graphique visuel accessible aux autres utilisateurs du dépôt.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}

