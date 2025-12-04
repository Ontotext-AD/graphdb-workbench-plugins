import * as Utils from '../utils.js';

const RESOURCE_CLICK_ON_VISUAL_GRAPH_BUTTON_TITLE = 'view.resource.title';
const RESOURCE_CLICK_ON_VISUAL_GRAPH_BUTTON_CONTENT = 'guide.step_plugin.resource-click-on-visual-graph-button.content';
/**
 * @name resource-click-on-visual-graph-button
 * @memberof module:Interactive Guide
 *
 * @description
 * The `resource-click-on-visual-graph-button` guide step guides the user to click on the Visual Graph button
 * in the resource view.
 *
 * <img src="resources/guides/resource/resource-click-on-visual-graph-button.png" style="height:200px;
 * border: solid; border-width:1px"/>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```json
 * {
 *   "guideBlockName": "resource-click-on-visual-graph-button",
 *   "options": {
 *     "skipUrl": false
 *   }
 * }
 * ```
 */
const step = {
  guideBlockName: 'resource-click-on-visual-graph-button',
  getSteps: function(options, services) {
    const GuideUtils = services.GuideUtils;
    const translate = services.translate;
    return [
      {
        guideBlockName: 'clickable-element',
        options: {
          content: translate(this.translationBundle, RESOURCE_CLICK_ON_VISUAL_GRAPH_BUTTON_CONTENT),
          title: translate(this.translationBundle, RESOURCE_CLICK_ON_VISUAL_GRAPH_BUTTON_TITLE),
          ...options,
          ...(options.skipUrl ? {} : {url: Utils.getResourceURL(options)}),
          elementSelector: GuideUtils.getGuideElementSelector('explore-visual'),
          class: 'resource-click-on-visual-graph-button',
          onNextClick: (guide, step) => {
            GuideUtils.waitFor(step.elementSelector, 3)
              .then(() => document.querySelector(step.elementSelector).click());
          }
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [RESOURCE_CLICK_ON_VISUAL_GRAPH_BUTTON_TITLE]: 'Resource',
      [RESOURCE_CLICK_ON_VISUAL_GRAPH_BUTTON_CONTENT]: 'Click on the <b>Visual graph</b> button.'
    },
    fr: {
      [RESOURCE_CLICK_ON_VISUAL_GRAPH_BUTTON_TITLE]: 'Ressource',
      [RESOURCE_CLICK_ON_VISUAL_GRAPH_BUTTON_CONTENT]: 'Cliquez sur le bouton <b>Graphique visuel</b>.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
