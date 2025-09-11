import {LUCENE_DEFAULT_TITLE} from '../../utils.js';

const step = {
  guideBlockName: 'connectors-lucene-view-sparql-dialog-intro',
  getSteps: (options) => {
    return [{
      guideBlockName: 'connectors-view-sparql-dialog-intro',
      options: {
        content: 'guide.step_plugin.connectors-lucene-view-sparql-dialog-intro.content',
        // If mainAction is set the title will be set automatically
        ...(options.mainAction ? {} : {title: LUCENE_DEFAULT_TITLE}),
        ...options,
        class: 'connectors-lucene-view-sparql-dialog-intro'
      }
    }];
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
