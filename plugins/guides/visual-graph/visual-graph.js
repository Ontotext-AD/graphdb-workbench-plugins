const VISUAL_GRAPH_EXPLORE_TITLE = 'guide.step-action.visual-graph';

/**
 * @name visual-graph
 * @memberof module:Interactive Guide
 *
 * @description
 * The `visual-graph` guide demonstrates how to use the Visual Graph features in GraphDB.
 *
 * The guide consists of the following steps:
 * 1. Click on the "Visual graph" main menu.<br>
 * <img src="resources/guides/visual-graph/visual-graph-click-explore-menu.png" style="height:200px; border: solid; border-width:1px"/>
 * <img src="resources/guides/visual-graph/visual-graph-click-main-menu.png" style="height:200px; border: solid; border-width:1px"/>
 * 2. Use the RDF resources search input to enter an IRI.<br>
 * <img src="resources/guides/visual-graph/visual-graph-search-rdf-resources-input.png" style="height:200px; border: solid; border-width:1px"/>
 * 3. Choose a resource from the autocomplete list.<br>
 * <img src="resources/guides/visual-graph/visual-graph-search-rdf-resources-input-autocomplete-item.png" style="height:200px; border: solid; border-width:1px"/>
 * 4. Inspect and interact with the visual graph (expand nodes, view properties, focus links).<br>
 * <img src="resources/guides/visual-graph/visual-graph-intro.png" style="height:200px; border: solid; border-width:1px"/>
 *
 * This guide can be configured using the common options defined in [Options](#.Options).
 *
 * @property {string} [options.easyGraphInputText] - The text to enter into the Easy graph input.
 * @property {string} [options.iri] - The IRI used to target nodes in the visual graph.
 * @property {string} [options.iriLabel] - The label of the IRI link shown in the visualization.
 * @property {string} [options.fromIri] - Source IRI for link-focused steps.
 * @property {string} [options.toIri] - Target IRI for link-focused steps.
 * @property {string} [options.focusProperties] - Array describing focus properties displayed in properties steps.
 *
 * @example
 * ```JSON
 * {
 *   "guideBlockName": "visual-graph",
 *   "options": {
 *     "iri": "http://example.org/resource",
 *     "iriLabel": "hasRole",
 *     "easyGraphInputText": "http://example.org/resource",
 *     "focusProperties": ["ontl:roleStartDate"]
 *   }
 * }
 * ```
 */

const step = {
  guideBlockName: 'visual-graph',
  getSteps: function(options, services) {
    const GuideUtils = services.GuideUtils;
    const RoutingUtil = services.RoutingUtil;
    const translate = services.translate;
    options.mainAction = 'visual-graph';

    options.title = options.title ?? translate(this.translationBundle, VISUAL_GRAPH_EXPLORE_TITLE);

    return [
      {
        guideBlockName: 'click-main-menu',
        options: {
          menu: 'visual-graph',
          showIntro: true,
          ...options
        }
      }, {
        guideBlockName: 'visual-graph-search-rdf-resources-input',
        options: {...options}
      }, {
        guideBlockName: 'visual-graph-search-rdf-resources-input-autocomplete-item',
        options: {...options}
      }, {
        guideBlockName: 'visual-graph-intro',
        options: {
          onPreviousClick: () => {
            RoutingUtil.navigate('/graphs-visualizations');
            const searchInputSelector = GuideUtils.getGuideElementSelector('graphVisualisationSearchInputNotConfigured', ' input');
            return GuideUtils.waitFor(searchInputSelector, 3)
              .then(() => {
                GuideUtils.validateTextInput(searchInputSelector, options.easyGraphInputText);
              });
          },
          initPreviousStep: () => {
            const url = '/graphs-visualizations?uri=' + options.iri;
            if (url !== decodeURIComponent(RoutingUtil.getCurrentRoute())) {
              const URL = '/graphs-visualizations?uri=' + options.iri;
              RoutingUtil.navigate(URL);
              return GuideUtils.waitFor(`.node-wrapper[id^="${options.iri}"] circle`, 3);
            }
            return Promise.resolve();
          },
          canBePaused: false,
          forceReload: true,
          ...options
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [VISUAL_GRAPH_EXPLORE_TITLE]: 'Visual graph explore'
    },
    fr: {
      [VISUAL_GRAPH_EXPLORE_TITLE]: 'Explorer le graphique visuel'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
