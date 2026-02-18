const VISUAL_GRAPH_INTRO_DEFAULT_TITLE = 'visual.graph.label';
const VISUAL_GRAPH_INTRO_CONTENT = 'guide.step_plugin.visual_graph_intro.content';

/**
 * @name visual-graph-intro
 * @memberof module:Interactive Guide
 *
 * @description
 * The `visual-graph-intro`
 * guide step highlights the graph visualization and explains how the start node connects to other nodes.<br>
 *
 * <img src="resources/guides/visual-graph/visual-graph-intro.png" style="height:200px;
 * border: solid; border-width:1px"/>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 * Additionally, the following specific option is available:
 *
 * @property {string} [options.iri] - The label of the start IRI shown in the visualization.
 *
 * @example
 * ```JSON
 * {
 *   "guideBlockName": "visual-graph-intro",
 *   "options": {
 *     "iri": "http://example.com/my-start-node"
 *     "iriLabel": "My start node"
 *   }
 * }
 * ```
 */
const step = {
  guideBlockName: 'visual-graph-intro',
  getSteps: function(options, services) {
    const translate = services.translate;

    return [
      {
        guideBlockName: 'read-only-element',
        options: {
          content: translate(this.translationBundle, VISUAL_GRAPH_INTRO_CONTENT, {iriLabel: options.iriLabel}),
          ...(options.title ?? {title: translate(this.translationBundle, VISUAL_GRAPH_INTRO_DEFAULT_TITLE)}),
          url: 'graphs-visualizations',
          elementSelector: '.graph-visualization',
          placement: 'left',
          canBePaused: false,
          ...options
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [VISUAL_GRAPH_INTRO_DEFAULT_TITLE]: 'Visual graph',
      [VISUAL_GRAPH_INTRO_CONTENT]: 'The graph shows connections between the start node, <b>{{iriLabel}}</b>, and other nodes. Each arrow represents one or more connections (RDF statements).'
    },
    fr: {
      [VISUAL_GRAPH_INTRO_DEFAULT_TITLE]: 'Graphique visuel',
      [VISUAL_GRAPH_INTRO_CONTENT]: 'Le graphique montre les connexions entre le nœud de départ, <b>{{iriLabel}}</b>, et les autres nœuds. Chaque flèche représente une ou plusieurs connexions (déclarations RDF).'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
