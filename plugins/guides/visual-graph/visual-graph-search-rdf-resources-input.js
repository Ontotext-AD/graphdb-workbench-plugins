const VISUAL_GRAPH_SEARCH_RDF_RESOURCES_INPUT_DEFAULT_TITLE = 'visual.graph.label';
const VISUAL_GRAPH_SEARCH_RDF_RESOURCES_INPUT_CONTENT = 'guide.step_plugin.visual_graph_input_IRI.content';

/**
 * @name visual-graph-search-rdf-resources-input
 * @memberof module:Interactive Guide
 *
 * @description
 * The `visual-graph-search-rdf-resources-input` step guides the user to enter an IRI in the Easy graph search input<br>
 * <img src="resources/guides/visual-graph/visual-graph-search-rdf-resources-input.png" style="height:200px; border: solid; border-width:1px"/>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @property {string} [options.easyGraphInputText] - The text to be entered in the Easy graph text input.
 */
const step = {
  // TODO: Refactor this to use the generic resource-search-rdf.js or remove completely in favor of that step
  guideBlockName: 'visual-graph-search-rdf-resources-input',
  getSteps: function(options, services) {
    const GuideUtils = services.GuideUtils;
    const translate = services.translate;

    return [
      {
        guideBlockName: 'input-element',
        options: {
          // Title comes from options.title when provided, otherwise use translated default
          title: translate(this.translationBundle, VISUAL_GRAPH_SEARCH_RDF_RESOURCES_INPUT_DEFAULT_TITLE),
          content: translate(this.translationBundle, VISUAL_GRAPH_SEARCH_RDF_RESOURCES_INPUT_CONTENT, {easyGraphInputText: options.easyGraphInputText}),
          forceReload: true,
          url: 'graphs-visualizations',
          elementSelector: GuideUtils.getGuideElementSelector('graphVisualisationSearchInputNotConfigured', ' input'),
          class: 'visual-graph-input-iri',
          onNextValidate: (step) => Promise.resolve(GuideUtils.validateTextInput(step.elementSelector, step.easyGraphInputText)),
          ...options
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [VISUAL_GRAPH_SEARCH_RDF_RESOURCES_INPUT_DEFAULT_TITLE]: 'Visual graph',
      [VISUAL_GRAPH_SEARCH_RDF_RESOURCES_INPUT_CONTENT]: 'Enter <b>{{easyGraphInputText}}</b> in the <b>Easy graph</b> text input.'
    },
    fr: {
      [VISUAL_GRAPH_SEARCH_RDF_RESOURCES_INPUT_DEFAULT_TITLE]: 'Graphique visuel',
      [VISUAL_GRAPH_SEARCH_RDF_RESOURCES_INPUT_CONTENT]: 'Entrez <b>{{easyGraphInputText}}</b> dans la saisie de texte <b>Graphique facile</b>.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
