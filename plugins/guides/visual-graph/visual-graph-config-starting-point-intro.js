const DEFAULT_TITLE = 'guide.step-action.visual-graph';
const CONTENT = 'guide.step_plugin.visual-graph-config-starting-point-intro.content';

/**
 * @name visual-graph-config-starting-point-intro
 * @memberof module:Interactive Guide
 *
 * @description
 * The `visual-graph-config-starting-point-intro` step displays a dialog that introduces the starting point section
 * of the Visual Graph configuration.<br>
 * <img src="resources/guides/visual-graph/visual-graph-config-starting-point-intro.png" style="height:200px; border: solid; border-width:1px"/>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```JSON
 * {
 *   "guideBlockName": "visual-graph-config-starting-point-intro"
 * }
 * ```
 */
const step = {
  guideBlockName: 'visual-graph-config-starting-point-intro',
  getSteps: function(options, pluginService) {
    const translate = pluginService.translate;
    return [
      {
        guideBlockName: 'info-message',
        options: {
          url: 'graphs-visualizations/config/save',
          class: 'visual-graph-config-starting-point-intro',
          content: translate(this.translationBundle, CONTENT),
          title: options.title ?? translate(this.translationBundle, DEFAULT_TITLE),
          ...options
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [DEFAULT_TITLE]: 'Visual graph explore',
      [CONTENT]: 'Starting point defines how the visual graph begins when it is opened. It determines the first resource or set of results that will appear in the graph and from which the visualization starts.'
    },
    fr: {
      [DEFAULT_TITLE]: 'Explorer le graphique visuel',
      [CONTENT]: 'Le point de départ définit comment le graphique visuel commence lorsqu\'il est ouvert. Il détermine la première ressource ou l\'ensemble de résultats qui apparaîtra dans le graphique et à partir duquel la visualisation démarre.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}

