const VISUAL_GRAPH_EXPLORE_TITLE = 'guide.step-action.visual-graph';
const VISUAL_GRAPH_CONFIG_STARTING_POINT_SEARCH_CONTENT = 'guide.step-action.visual-graph-config-starting-point-search';
const VISUAL_GRAPH_CONFIG_STARTING_POINT_FIXED_CONTENT = 'guide.step-action.visual-graph-config-starting-point-fixed';
const VISUAL_GRAPH_CONFIG_STARTING_POINT_QUERY_CONTENT = 'guide.step-action.visual-graph-config-starting-point-query';

const STARTING_POINT_CONFIG = {
  search: {
    contentKey: VISUAL_GRAPH_CONFIG_STARTING_POINT_SEARCH_CONTENT,
    elementSelector: 'start-with-search-box'
  },
  fixed: {
    contentKey: VISUAL_GRAPH_CONFIG_STARTING_POINT_FIXED_CONTENT,
    elementSelector: 'start-with-a-fixed-node'
  },
  query: {
    contentKey: VISUAL_GRAPH_CONFIG_STARTING_POINT_QUERY_CONTENT,
    elementSelector: 'start-with-graph-query-result'
  }
};

/**
 * @name visual-graph-config-starting-point
 * @memberof module:Interactive Guide
 *
 * @description
 * This step guides the user to select a starting point option in the Visual Graph config page.
 * The starting point type is determined by the `startingPoint` option, which can be one of:
 * - `search` - Start with a search box<br>
 * <img src="resources/guides/visual-graph/visual-graph-config-starting-point-search.png" style="height:200px; border: solid; border-width:1px"/><br>
 * - `fixed` - Start with a fixed node<br>
 * <img src="resources/guides/visual-graph/visual-graph-config-starting-point-fixed.png" style="height:200px; border: solid; border-width:1px"/><br>
 * - `query` - Start with graph query results<br>
 * <img src="resources/guides/visual-graph/visual-graph-config-starting-point-query.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 * Additionally, the following specific option is required:
 *
 * @property {string} options.startingPoint - The type of starting point to select. Must be one of `search`, `fixed`, or `query`.
 *
 * @example
 * ```JSON
 * {
 *   "guideBlockName": "visual-graph-config-starting-point",
 *   "options": {
 *     "startingPoint": "search"
 *   }
 * }
 * ```
 */
const step = {
  guideBlockName: 'visual-graph-config-starting-point',
  getSteps: function(options, pluginServices) {
    const translate = pluginServices.translate;
    const GuideUtils = pluginServices.GuideUtils;
    const config = STARTING_POINT_CONFIG[options.startingPoint];

    return [
      {
        guideBlockName: 'clickable-element',
        options: {
          content: translate(this.translationBundle, config.contentKey),
          title: translate(this.translationBundle, VISUAL_GRAPH_EXPLORE_TITLE),
          url: 'graphs-visualizations/config/save',
          elementSelector: GuideUtils.getGuideElementSelector(config.elementSelector),
          onNextClick: GuideUtils.clickOnGuideElement(config.elementSelector),
          ...options
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [VISUAL_GRAPH_EXPLORE_TITLE]: 'Visual graph explore',
      [VISUAL_GRAPH_CONFIG_STARTING_POINT_SEARCH_CONTENT]: 'Select <b>Start with a search box</b> to allow choosing the starting resource of the visual graph each time it is opened.',
      [VISUAL_GRAPH_CONFIG_STARTING_POINT_FIXED_CONTENT]: 'Select <b>Start with a fixed node</b> to always start the visual graph from a specific resource.',
      [VISUAL_GRAPH_CONFIG_STARTING_POINT_QUERY_CONTENT]: 'Select <b>Start with graph query results</b> to start the visual graph from the results returned by a graph query.'
    },
    fr: {
      [VISUAL_GRAPH_EXPLORE_TITLE]: 'Explorer le graphique visuel',
      [VISUAL_GRAPH_CONFIG_STARTING_POINT_SEARCH_CONTENT]: 'Sélectionnez <b>Commencer avec une boîte de recherche</b> pour permettre de choisir la ressource de départ du graphique visuel à chaque ouverture.',
      [VISUAL_GRAPH_CONFIG_STARTING_POINT_FIXED_CONTENT]: 'Sélectionnez <b>Commencer avec un nœud fixe</b> pour toujours démarrer le graphique visuel à partir d\'une ressource spécifique.',
      [VISUAL_GRAPH_CONFIG_STARTING_POINT_QUERY_CONTENT]: 'Sélectionnez <b>Commencer avec les résultats d\'une requête graphique</b> pour démarrer le graphique visuel à partir des résultats renvoyés par une requête graphique.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}

