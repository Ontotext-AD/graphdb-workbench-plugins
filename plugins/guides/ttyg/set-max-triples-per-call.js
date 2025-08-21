import {FTS_METHOD_DEFAULT_TITLE} from '../utils.js';

const step = {
  guideBlockName: 'set-max-triples-per-call',
  getSteps: (options, services) => {
    const GuideUtils = services.GuideUtils;

    return {
      guideBlockName: 'input-element',
      options: {
        content: 'guide.step_plugin.fts-search-method.set-max-triples-per-call',
        // If mainAction is set the title will be set automatically
        ...(options.mainAction ? {} : {title: FTS_METHOD_DEFAULT_TITLE}),
        class: 'toggle-fts-search',
        ...options,
        url: 'ttyg',
        elementSelector: GuideUtils.getGuideElementSelector('max-triples-per-call-input'),
        onNextValidate: () => {
          if (options.maxTriplesPerCall) {
            return Promise.resolve(GuideUtils.validateTextInput(GuideUtils.getGuideElementSelector('max-triples-per-call-input'), options.maxTriplesPerCall, false));
          }
          return Promise.resolve(true);
        }
      }
    };
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
