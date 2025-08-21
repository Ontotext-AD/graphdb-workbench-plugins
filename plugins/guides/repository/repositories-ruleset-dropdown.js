import * as Utils from '../utils.js';

const step = {
  guideBlockName: 'repositories-ruleset-dropdown',
  getSteps: (options, services) => {
    const GuideUtils = services.GuideUtils;
    const repositoryIdInputSelector = GuideUtils.getGuideElementSelector('graphDBRepositoryIdInput');
    return [
      {
        guideBlockName: 'clickable-element',
        options: {
          content: 'guide.step_plugin.create_repository.ruleset_dropdown.content',
          // If mainAction is set the title will be set automatically
          ...(options.mainAction ? {} : {title: Utils.REPOSITORIES_CREATE_DEFAULT_TITLE}),
          class: 'gdb-repository-ruleset-select',
          ...options,
          url: 'repository/create/graphdb',
          elementSelector: GuideUtils.getGuideElementSelector('graphDBRepositoryRulesetSelect'),
          disablePreviousFlow: false,
          show: () => () => {
            GuideUtils.validateTextInput(repositoryIdInputSelector, options.repositoryId);
          }
        }
      }
    ];
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
