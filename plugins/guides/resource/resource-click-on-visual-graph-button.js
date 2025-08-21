import * as Utils from '../utils.js';

const step = {
  guideBlockName: 'resource-click-on-visual-graph-button',
  getSteps: (options, services) => {
    const GuideUtils = services.GuideUtils;
    return [
      {
        guideBlockName: 'clickable-element',
        options: {
          content: 'guide.step_plugin.resource-click-on-visual-graph-button.content',
          // If mainAction is set the title will be set automatically
          ...(options.mainAction ? {} : {title: Utils.RESOURCE_DEFAULT_TITLE}),
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
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
