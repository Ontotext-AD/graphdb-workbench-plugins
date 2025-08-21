import * as Utils from '../utils.js';

const step = {
  guideBlockName: 'resource-results-explain',
  getSteps: (options) => {
    return [
      {
        guideBlockName: 'sparql-results-explain',
        options: {
          content: 'guide.step_plugin.resource-results-explain.content',
          // If mainAction is set the title will be set automatically
          ...(options.mainAction ? {} : {title: Utils.RESOURCE_DEFAULT_TITLE}),
          ...options,
          ...(options.skipUrl ? {} : {url: Utils.getResourceURL(options)}),
          class: 'resource-results-explain'
        }
      }
    ];
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
