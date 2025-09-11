import {LUCENE_CONNECTOR_NAME, LUCENE_DEFAULT_TITLE} from '../../utils.js';

const step = {
  guideBlockName: 'connectors-lucene-type-intro',
  getSteps: (options) => {
    return [{
      guideBlockName: 'connectors-type-intro',
      options: {
        content: 'guide.step_plugin.connectors-lucene-type-intro.content',
        // If mainAction is set the title will be set automatically
        ...(options.mainAction ? {} : {title: LUCENE_DEFAULT_TITLE}),
        ...options,
        connectorName: LUCENE_CONNECTOR_NAME,
        class: 'connectors-lucene-type-intro'
      }
    }];
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
