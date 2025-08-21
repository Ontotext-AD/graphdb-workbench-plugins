import * as Utils from '../utils.js';

const step = {
  guideBlockName: 'resource-click-on-role',
  getSteps: (options, services) => {
    const GuideUtils = services.GuideUtils;
    return [
      {
        guideBlockName: 'clickable-element',
        options: {
          content: `guide.step_plugin.resource-click-on-role.${options.role}.content`,
          // If mainAction is set the title will be set automatically
          ...(options.mainAction ? {} : {title: Utils.RESOURCE_DEFAULT_TITLE}),
          ...options,
          ...(options.skipUrl ? {} : {url: Utils.getResourceURL(options)}),
          elementSelector: GuideUtils.getGuideElementSelector('role-' + options.showRole),
          class: 'visual_graph-role',
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
