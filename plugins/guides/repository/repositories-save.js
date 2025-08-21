import * as Utils from '../utils.js';

const step = {
  guideBlockName: 'repositories-save',
  getSteps: (options, services) => {
    const GuideUtils = services.GuideUtils;
    const repositoryIdInputSelector = GuideUtils.getGuideElementSelector('graphDBRepositoryIdInput');
    return [
      {
        guideBlockName: 'clickable-element',
        options: {
          content: 'guide.step_plugin.create_repository.save_button.content',
          // If mainAction is set the title will be set automatically
          ...(options.mainAction ? {} : {title: Utils.REPOSITORIES_CREATE_DEFAULT_TITLE}),
          class: 'create-repository-button',
          ...options,
          url: 'repository/create/graphdb',
          elementSelector: GuideUtils.getGuideElementSelector('graphDBRepositoryCrateButton'),
          disablePreviousFlow: false,
          show: () => () => {
            GuideUtils.validateTextInput(repositoryIdInputSelector, options.repositoryId);
          },
          onNextClick: GuideUtils.clickOnGuideElement('graphDBRepositoryCrateButton')
        }
      }
    ];
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
