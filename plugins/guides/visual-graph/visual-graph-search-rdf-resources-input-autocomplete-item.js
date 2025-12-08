const VISUAL_GRAPH_SEARCH_RDF_RESOURCES_INPUT_AUTOCOMPLETE_ITEM_DEFAULT_TITLE = 'visual.graph.label';
const VISUAL_GRAPH_SEARCH_RDF_RESOURCES_INPUT_AUTOCOMPLETE_ITEM_CONTENT = 'guide.step_plugin.visual_graph_show_autocomplete.content';

/**
 * @name visual-graph-search-rdf-resources-input-autocomplete-item
 * @memberof module:Interactive Guide
 *
 * @description
 * The `visual-graph-search-rdf-resources-input-autocomplete-item` step triggers the autocomplete item for a discovered RDF resource in the Visual Graph search input.<br>
 * <img src="resources/guides/visual-graph/visual-graph-search-rdf-resources-input-autocomplete-item.png" style="height:200px; border: solid; border-width:1px"/>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 * Additionally, the following specific option is available:
 *
 * @property {string} [options.iri] - The IRI displayed in the autocomplete item.
 */
const step = {
  guideBlockName: 'visual-graph-search-rdf-resources-input-autocomplete-item',
  getSteps: function(options, services) {
    const GuideUtils = services.GuideUtils;
    const translate = services.translate;

    return [
      {
        guideBlockName: 'clickable-element',
        options: {
          // Title comes from options.title when provided, otherwise use translated default
          ...(options.title ?? {title: translate(this.translationBundle, VISUAL_GRAPH_SEARCH_RDF_RESOURCES_INPUT_AUTOCOMPLETE_ITEM_DEFAULT_TITLE)}),
          content: translate(this.translationBundle, VISUAL_GRAPH_SEARCH_RDF_RESOURCES_INPUT_AUTOCOMPLETE_ITEM_CONTENT, {iri: options.iri}),
          url: 'graphs-visualizations',
          elementSelector: GuideUtils.getGuideElementSelector(`autocomplete-${options.iri}`),
          class: 'visual-graph-show-autocomplete',
          onNextClick: (guide, step) => GuideUtils.waitFor(step.elementSelector, 3).then(() => $(step.elementSelector).trigger('click')),
          canBePaused: false,
          forceReload: true,
          ...options
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [VISUAL_GRAPH_SEARCH_RDF_RESOURCES_INPUT_AUTOCOMPLETE_ITEM_DEFAULT_TITLE]: 'Visual graph',
      [VISUAL_GRAPH_SEARCH_RDF_RESOURCES_INPUT_AUTOCOMPLETE_ITEM_CONTENT]: 'Click on the <b>{{iri}}</b> IRI to show the visual graph.'
    },
    fr: {
      [VISUAL_GRAPH_SEARCH_RDF_RESOURCES_INPUT_AUTOCOMPLETE_ITEM_DEFAULT_TITLE]: 'Graphique visuel',
      [VISUAL_GRAPH_SEARCH_RDF_RESOURCES_INPUT_AUTOCOMPLETE_ITEM_CONTENT]: 'Cliquez sur l\'IRI <b>{{iri}}</b> pour afficher le graphique visuel.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
