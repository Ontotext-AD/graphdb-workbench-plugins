import * as Utils from '../utils.js';

const step = {
  guideBlockName: 'resource-results-row-explain',
  getSteps: (options, services) => {
    const GuideUtils = services.GuideUtils;
    return [
      {
        guideBlockName: 'read-only-element',
        options: {
          content: 'guide.step_plugin.resource-results-row-explain.content',
          // If mainAction is set the title will be set automatically
          ...(options.mainAction ? {} : {title: Utils.RESOURCE_DEFAULT_TITLE}),
          ...options,
          ...(options.skipUrl ? {} : {url: Utils.getResourceURL(options)}),
          class: 'visual_graph-row',
          elementSelector: GuideUtils.getSparqlResultsSelectorForRow(options.row)
        }
      }
    ];
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
