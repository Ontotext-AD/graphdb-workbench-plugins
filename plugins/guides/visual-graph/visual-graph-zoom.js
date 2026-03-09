const VISUAL_GRAPH_EXPLORE_TITLE = 'guide.step-action.visual-graph';
const VISUAL_GRAPH_ZOOM_CONTENT = 'guide.step-action.visual-graph-zoom-content';

/**
 * @name visual-graph-zoom
 * @memberof module:Interactive Guide
 *
 * @description
 * This step guides the user to zoom in and out of the visual graph using the mouse wheel or touchpad.<br>
 *
 * Visual graph zoom step<br>
 * <img src="resources/guides/visual-graph/visual-graph-zoom.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```JSON
 * {
 *   "guideBlockName": "visual-graph-zoom",
 * }
 * ```
 */
const step = {
  guideBlockName: 'visual-graph-zoom',
  getSteps: function(options, services) {
    const translate = services.translate;
    const GuideUtils = services.GuideUtils;
    const elementSelector = GuideUtils.getGuideElementSelector('graph-visualization');
    return [{
      guideBlockName: 'scroll-only-element',
      options: {
        ...(options.title ?? {title: translate(this.translationBundle, VISUAL_GRAPH_EXPLORE_TITLE)}),
        content: translate(this.translationBundle, VISUAL_GRAPH_ZOOM_CONTENT),
        ...options,
        elementSelector,
        url: 'graphs-visualizations',
        allowScroll: true
      }
    }];
  },
  translationBundle: {
    en: {
      [VISUAL_GRAPH_EXPLORE_TITLE]: 'Visual graph explore',
      [VISUAL_GRAPH_ZOOM_CONTENT]: 'Scrolling with the <b>mouse wheel</b> or <b>two fingers on the touchpad</b> zooms the visual graph in and out.'
    },
    fr: {
      [VISUAL_GRAPH_EXPLORE_TITLE]: 'Explorer le graphique visuel',
      [VISUAL_GRAPH_ZOOM_CONTENT]: 'Faites défiler avec la <b>molette de la souris</b> ou <b>deux doigts sur le pavé tactile</b> pour zoomer et dézoomer le graphique visuel.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}

