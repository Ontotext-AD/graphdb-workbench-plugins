import * as Utils from '../utils.js';

const step = {
  guideBlockName: 'repositories-id-input',
  getSteps: (options, services) => {
    const GuideUtils = services.GuideUtils;
    const repositoryIdInputSelector = GuideUtils.getGuideElementSelector('graphDBRepositoryIdInput');
    return [
      {
        guideBlockName: 'input-element',
        options: {
          content: 'guide.step_plugin.create_repository.repository_id.content',
          // If mainAction is set the title will be set automatically
          ...(options.mainAction ? {} : {title: Utils.REPOSITORIES_CREATE_DEFAULT_TITLE}),
          class: 'gdb-repository-id-input',
          ...options,
          url: 'repository/create/graphdb',
          elementSelector: repositoryIdInputSelector,
          disablePreviousFlow: false,
          onNextValidate: () =>
            Promise.resolve(
              GuideUtils.validateTextInput(
                repositoryIdInputSelector,
                options.repositoryId
              )
            )
        }
      }
    ];
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
