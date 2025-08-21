import * as Utils from '../utils.js';

const step = {
  guideBlockName: 'repositories-create-repository',
  getSteps: (options, services) => {
    const GuideUtils = services.GuideUtils;
    return [
      {
        guideBlockName: 'clickable-element',
        options: {
          content: 'guide.step_plugin.create_repository.create_repository_button.content',
          // If mainAction is set the title will be set automatically
          ...(options.mainAction ? {} : {title: Utils.REPOSITORIES_CREATE_DEFAULT_TITLE}),
          class: 'create-repository',
          ...options,
          url: 'repository',
          elementSelector: GuideUtils.getGuideElementSelector('createRepository'),
          onNextClick: GuideUtils.clickOnGuideElement('createRepository')
        }
      }
    ];
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
