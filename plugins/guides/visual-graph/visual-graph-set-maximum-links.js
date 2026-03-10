const VISUAL_GRAPH_EXPLORE_TITLE = 'guide.step-action.visual-graph';
const VISUAL_GRAPH_SET_MAXIMUM_LINKS_CONTENT = 'guide.step-action.visual-graph-set-maximum-links-content';

/**
 * @name visual-graph-set-maximum-links
 * @memberof module:Interactive Guide
 *
 * @description
 * The `visual-graph-set-maximum-links` guide step prompts the user to enter the maximum number of links to show
 * in the visual graph settings.
 *
 * Set maximum links<br>
 * <img src="resources/guides/visual-graph/visual-graph-set-maximum-links.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 * Additionally, the following specific option is required:
 *
 * @property {number} [options.linkLimit] - The maximum number of links to show.
 *
 * @example
 * ```json
 * {
 *   "guideBlockName": "visual-graph-set-maximum-links",
 *   "options": {
 *     "linkLimit": 20
 *   }
 * }
 * ```
 */
const step = {
  guideBlockName: 'visual-graph-set-maximum-links',
  getSteps: function(options, pluginServices) {
    const translate = pluginServices.translate;
    const GuideUtils = pluginServices.GuideUtils;
    const elementSelector = GuideUtils.getGuideElementSelector('graph-settings-links-limit');
    const linkLimit = options.linkLimit || '';

    return [
      {
        guideBlockName: 'input-element',
        options: {
          content: translate(this.translationBundle, VISUAL_GRAPH_SET_MAXIMUM_LINKS_CONTENT, {linkLimit}),
          ...(options.title ?? {title: translate(this.translationBundle, VISUAL_GRAPH_EXPLORE_TITLE)}),
          ...options,
          elementSelector,
          onNextValidate: () => Promise.resolve(GuideUtils.validateTextInput(elementSelector, linkLimit))
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [VISUAL_GRAPH_EXPLORE_TITLE]: 'Visual graph explore',
      [VISUAL_GRAPH_SET_MAXIMUM_LINKS_CONTENT]: 'Enter <b>{{linkLimit}}</b> as the maximum number of links to show.'
    },
    fr: {
      [VISUAL_GRAPH_EXPLORE_TITLE]: 'Explorer le graphique visuel',
      [VISUAL_GRAPH_SET_MAXIMUM_LINKS_CONTENT]: 'Entrez <b>{{linkLimit}}</b> comme nombre maximal de liens à afficher.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}

