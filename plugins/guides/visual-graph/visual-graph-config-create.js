const VISUAL_GRAPH_EXPLORE_TITLE = 'guide.step-action.visual-graph';

/**
 * @name visual-graph-config-create
 * @memberof module:Interactive Guide
 *
 * @description
 * This is a complex step that guides the user through the full process of creating a new visual graph configuration.
 * It includes navigating to the visual graph page, creating and naming the configuration, optionally adding a description
 * and hint, configuring tabs with starting points, SPARQL queries, or resource IRIs, and saving the configuration.
 *
 * The step sequence is dynamic and depends on the provided options. Some steps are always included, while others
 * appear only when certain options are provided.
 *
 * **Always included steps:**
 *
 * Navigate to the visual graph page via the Explore main menu<br>
 * <img src="resources/guides/main-menu/main-menu-explore.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * Click the button to create a new configuration<br>
 * <img src="resources/guides/visual-graph/visual-graph-config-create-click.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * Enter a name for the configuration<br>
 * <img src="resources/guides/visual-graph/visual-graph-config-name.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * Introduction to the starting point configuration<br>
 * <img src="resources/guides/visual-graph/visual-graph-config-starting-point-intro.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * **Optional steps (based on options):**
 *
 * Enter a description for the configuration (when `options.configDescription` is provided)<br>
 * <img src="resources/guides/visual-graph/visual-graph-config-description.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * Enter a hint IRI for the configuration (when `options.configHint` is provided)<br>
 * <img src="resources/guides/visual-graph/visual-graph-config-hint.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * **Tab configuration steps (based on `options.tabConfig`):**
 *
 * If `options.tabConfig` is not provided or is empty, the step sequence ends after the starting point intro.
 * Otherwise, for each entry in the `tabConfig` array, the following steps are added:
 *
 * Click on a configuration tab (skipped if the tab is already active)<br>
 * <img src="resources/guides/visual-graph/visual-graph-config-click-tab.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * Select a starting point type (when `tabConfig.startingPoint` is provided)<br>
 * <img src="resources/guides/visual-graph/visual-graph-config-starting-point-search.png" style="height:200px; border: solid; border-width:1px"/><br>
 * <img src="resources/guides/visual-graph/visual-graph-config-starting-point-fixed.png" style="height:200px; border: solid; border-width:1px"/><br>
 * <img src="resources/guides/visual-graph/visual-graph-config-starting-point-query.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * Search for a resource IRI (when `tabConfig.iri` and `tabConfig.searchTerm` are provided).
 * **Cannot be combined with `tabConfig.query`** — only one of `iri`/`searchTerm` or `query` should be set per tab config entry.<br>
 * <img src="resources/guides/resource/resource-search-rdf.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * Select the resource from autocomplete results<br>
 * <img src="resources/guides/resource/resource-search-autocomplete-item.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * Enter a SPARQL query (when `tabConfig.query` is provided).
 * **Cannot be combined with `tabConfig.iri`/`tabConfig.searchTerm`** — only one of `query` or `iri`/`searchTerm` should be set per tab config entry.<br>
 * <img src="resources/guides/sparql-editor/sparql-editor.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * Toggle include inferred data (when `tabConfig.includeInferredData` is provided)<br>
 * <img src="resources/guides/sparql-editor/sparql-editor-include-inferred-data.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * Toggle expand results over owl:sameAs (when `tabConfig.expandResultsOverOwl` is provided)<br>
 * <img src="resources/guides/sparql-editor/sparql-editor-expand-results-over-owl.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * View sample queries (when `tabConfig.sampleQueryContent` is provided)<br>
 * <img src="resources/guides/visual-graph/visual-graph-config-sample-query.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * **Post-configuration steps (only when `options.tabConfig` is provided):**
 *
 * Share the configuration with other users (when `options.shareConfig` is `true`)<br>
 * <img src="resources/guides/visual-graph/visual-graph-config-share.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * Save the configuration<br>
 * <img src="resources/guides/visual-graph/visual-graph-config-save.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * Select the newly created configuration<br>
 * <img src="resources/guides/visual-graph/visual-graph-config-select.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * Open graph settings<br>
 * <img src="resources/guides/visual-graph/visual-graph-settings-click.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * Set the maximum number of links<br>
 * <img src="resources/guides/visual-graph/visual-graph-set-maximum-links.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * Save the graph settings<br>
 * <img src="resources/guides/visual-graph/visual-graph-settings-save.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * Expand a node in the visual graph (when `options.expandIri` is provided)<br>
 * <img src="resources/guides/visual-graph/visual-graph-expand.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * Zoom the visual graph<br>
 * <img src="resources/guides/visual-graph/visual-graph-zoom.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * The step can be configured using the common options defined in [Options](#.Options).
 *
 * @property {string} [options.configDescription] - Optional. The description for the configuration. When provided, the description step is included.
 * @property {string} [options.configHint] - Optional. The hint IRI for the configuration. When provided, the hint step is included.
 * @property {boolean} [options.shareConfig] - Optional. When `true`, the share configuration step is included.
 * @property {Object[]} [options.tabConfig] - Optional. An array of tab configuration objects. When not provided or empty, the step ends early without saving.
 * @property {string} options.tabConfig[].tabName - The name of the tab to click. Must be one of `startingPoint`, `graphExpansion`, `nodeBasics`, `edgeBasics`, or `nodeExtra`.
 * @property {string} [options.tabConfig[].startingPoint] - Optional. The starting point type to select.
 * @property {string} [options.tabConfig[].iri] - Optional. The IRI of the resource to search for. Must be used together with `searchTerm`. Cannot be used together with `query`.
 * @property {string} [options.tabConfig[].searchTerm] - Optional. The search term used to find the resource. Must be used together with `iri`. Cannot be used together with `query`.
 * @property {string} [options.tabConfig[].query] - Optional. The SPARQL query to enter. Cannot be used together with `iri`/`searchTerm`.
 * @property {boolean} [options.tabConfig[].includeInferredData] - Optional. When provided, the include inferred data step is shown.
 * @property {boolean} [options.tabConfig[].expandResultsOverOwl] - Optional. When provided, the expand results over owl:sameAs step is shown.
 * @property {string} [options.tabConfig[].sampleQueryContent] - Optional. When provided, the sample query step is shown with this content.
 * @property {number} [options.linkLimit] - The maximum number of links to set in the graph settings.
 * @property {string} [options.expandIri] - Optional. The IRI of the node to expand in the visual graph. When provided, the expand step is included.
 * @property {string} [options.iriLabel] - Optional. The label to display for the node to expand. When provided, the expand step is included.
 *
 * @example
 * ```JSON
 * {
 *   "guideBlockName": "visual-graph-config-create",
 *   "options": {
 *     "configDescription": "A visual graph for exploring RDF data.",
 *     "configHint": "http://example.org/resource",
 *     "shareConfig": true,
 *     "expandIri": "https://swapi.co/resource/Human/6/",
 *     "iriLabel": "Leia Organa",
 *     "linkLimit": 20,
 *     "tabConfig": [
 *       {
 *            "tabName": "startingPoint",
 *            "startingPoint": "fixed",
 *            "searchTerm": "luke",
 *            "iri": "https://swapi.co/resource/human/1"
 *        },
 *        {
 *            "tabName": "graphExpansion",
 *            "query": "PREFIX wev: <http://weverify.eu/ontology/>\nPREFIX schema: <http://schema.org/>\nconstruct {\n    ?node ?p ?o .\n    ?s ?p ?node .\n} where {\n    values ?p {\n        schema:hasPart\n        schema:appearance\n        schema:itemReviewed\n        schema:mentionedIn\n        schema:author\n        schema:publisher\n    }\n    { ?node ?p ?o . filter not exists {?o a wev:SupportingEvidence . } }\n    union\n    { ?s ?p ?node . }\n}",
 *            "queryExtraContent": "The graph expansion query defines what happens when a node is expanded in the visual graph. Expanding a node loads additional resources connected to it and adds them to the graph as new nodes and edges.",
 *            "sampleQueryContent": "The <b>Sample queries</b>  includes example graph expansion queries. <b>Unfiltered object properties</b> shows all object property connections of a node, while <b>Filtered object properties</b> shows only selected ones.",
 *            "includeInferredData": true,
 *            "expandResultsOverOwl": true
 *        },
 *        {
 *            "tabName": "nodeBasics",
 *            "query": "PREFIX skos: <http://www.w3.org/2004/02/skos/core#>\nPREFIX : <http://data.europa.eu/949/>\nselect * {\n    ?node :opType/skos:prefLabel ?type\n    filter (lang(?type)=\"en\")\n    ?node :opName ?name; :uopid ?id\n    bind(concat(?name,\"\\n\",?type,\": \",?id) as ?label)\n}",
 *            "queryExtraContent": "The <b>Node basics</b> query retrieves basic properties of a node and maps them to visual attributes such as label, type, description, and rank used when rendering the node in the graph.",
 *            "sampleQueryContent": "The Sample queries includes ready examples of Node basics queries. Direct type only uses only the node’s type to determine its color. Direct type, label and rank also retrieves a label to display as the node name and a rank value that controls the node size."
 *        },
 *        {
 *            "tabName": "edgeBasics",
 *            "query": "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\nPREFIX skos: <http://www.w3.org/2004/02/skos/core#>\n\nSELECT ?label {\n    ?edge rdfs:label | skos:prefLabel ?label .\n}",
 *            "queryExtraContent": "This Edge Basics defines the text shown on the edges in the visual graph. It retrieves a label for each relationship so that the edge displays a clear name instead of the full predicate IRI.",
 *            "sampleQueryContent": "The Sample queries provides example queries for retrieving labels for edges. RDFS or SKOS label displays the label stored in rdfs:label or skos:prefLabel. RDFS or SKOS label in English displays the label only when it is available in English."
 *        },
 *        {
 *            "tabName": "nodeExtra",
 *            "query": "SELECT ?property ?value {\n    ?node ?property ?value .\nFILTER(isLiteral(?value))\n}",
 *            "queryExtraContent": "This Node extra defines the text shown on the nodes in the visual graph. It retrieves a label for each relationship so that the edge displays a clear name instead of the full predicate IRI.",
 *            "sampleQueryContent": "The Sample queries provides examples for retrieving node details. Datatype properties shows properties with literal values, while Image and datatype properties also includes an image URL."
 *        }
 *     ]
 *   }
 * }
 * ```
 */
const step = {
  guideBlockName: 'visual-graph-config-create',
  getSteps: function(options, services) {
    const translate = services.translate;
    const GuideUtils = services.GuideUtils;
    options.title = options.title ?? translate(this.translationBundle, VISUAL_GRAPH_EXPLORE_TITLE);

    const steps = [
      {
        guideBlockName: 'click-main-menu',
        options: {
          menu: 'visual-graph',
          showIntro: true,
          ...options
        }
      },
      {
        guideBlockName: 'visual-graph-config-create-click',
        options: {...options}
      },
      {
        guideBlockName: 'visual-graph-config-name',
        options: {...options}
      }
    ];

    const configDescription = options.configDescription;
    if (configDescription) {
      steps.push({
        guideBlockName: 'visual-graph-config-description',
        options: {...options}
      });
    }

    const configHint = options.configHint;
    if (configHint) {
      steps.push({
        guideBlockName: 'visual-graph-config-hint',
        options: {...options}
      });
    }

    steps.push({
      guideBlockName: 'visual-graph-config-starting-point-intro',
      options: {...options}
    });

    if (!options.tabConfig?.length) {
      // If we don't configure the graph, we can't proceed to save and view it
      return steps;
    }

    (options.tabConfig ?? []).forEach((tabConfig) => {
      // each tab config represents a tab click and the related steps to add in that specific tab
      steps.push({
        guideBlockName: 'visual-graph-config-click-tab',
        options: {
          scrollOffset: GuideUtils.SCROLL_OFFSET.START,
          ...options,
          ...tabConfig
        }
      });

      if (tabConfig.startingPoint) {
        steps.push({
          guideBlockName: 'visual-graph-config-starting-point',
          options: {...options, ...tabConfig}
        });
      }

      // we can't have iri and query at the same time. They are not simultaneously available in the view
      if (tabConfig.iri && tabConfig.searchTerm) {
        steps.push({
          guideBlockName: 'resource-search-rdf',
          options: {
            url: 'graphs-visualizations/config/save',
            ...options,
            ...tabConfig
          }
        });
        steps.push({
          guideBlockName: 'resource-search-autocomplete-item',
          options: {
            url: 'graphs-visualizations/config/save',
            ...options,
            ...tabConfig
          }
        });
      } else if (tabConfig.query) {
        steps.push({
          guideBlockName: 'sparql-editor',
          options: {
            url: 'graphs-visualizations/config/save',
            scrollOffset: GuideUtils.SCROLL_OFFSET.CENTER,
            ...options,
            ...tabConfig
          }
        });
      }

      if (tabConfig.includeInferredData) {
        steps.push({
          guideBlockName: 'sparql-editor-include-inferred-data',
          options: {
            url: 'graphs-visualizations/config/save',
            ...options,
            ...tabConfig
          }
        });
      }

      if (tabConfig.expandResultsOverOwl) {
        steps.push({
          guideBlockName: 'sparql-editor-expand-results-over-owl',
          options: {
            url: 'graphs-visualizations/config/save',
            ...options,
            ...tabConfig
          }
        });
      }

      if (tabConfig.sampleQueryContent) {
        steps.push({
          guideBlockName: 'visual-graph-config-sample-query',
          options: {
            ...options,
            ...tabConfig,
            content: tabConfig.sampleQueryContent
          }
        });
      }
    });

    if (options.shareConfig) {
      steps.push({
        guideBlockName: 'visual-graph-config-share',
        options: {...options}
      });
    }

    steps.push({
      guideBlockName: 'visual-graph-config-save',
      options: {...options}
    });

    steps.push({
      guideBlockName: 'visual-graph-config-select',
      options: {...options}
    });

    steps.push({
      guideBlockName: 'visual-graph-settings-click',
      options: {...options}
    });

    steps.push({
      guideBlockName: 'visual-graph-set-maximum-links',
      options: {...options}
    });

    steps.push({
      guideBlockName: 'visual-graph-settings-save',
      options: {...options}
    });

    if (options.expandIri) {
      steps.push({
        guideBlockName: 'visual-graph-expand',
        options: {
          ...options,
          iri: options.expandIri
        }
      });
    }

    steps.push({
      guideBlockName: 'visual-graph-zoom',
      options: {...options}
    });

    return steps;
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
