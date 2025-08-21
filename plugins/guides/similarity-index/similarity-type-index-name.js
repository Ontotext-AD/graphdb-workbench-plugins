import * as Utils from '../utils.js';

const step = {
  guideBlockName: 'similarity-type-index-name',
  getSteps: (options, services) => {
    const GuideUtils = services.GuideUtils;
    return [
      {
        guideBlockName: 'input-element',
        options: {
          content: 'guide.step_plugin.create-similarity-index.input-index-name',
          // If mainAction is set the title will be set automatically
          ...(options.mainAction ? {} : {title: Utils.CREATE_SIMILARITY_INDEX_DEFAULT}),
          class: 'similarity-index-name-input',
          ...options,
          url: 'similarity/index/create',
          elementSelector: GuideUtils.getGuideElementSelector('similarity-index-name'),
          onNextValidate: () => Promise.resolve(GuideUtils.validateTextInputNotEmpty(GuideUtils.getGuideElementSelector('similarity-index-name')))
        }
      }
    ];
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
