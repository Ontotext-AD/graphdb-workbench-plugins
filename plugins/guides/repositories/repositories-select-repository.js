import * as Utils from '../utils.js';

const step = {
  guideBlockName: 'repositories-select-repository',
  getSteps: (options, services) => {
    const GuideUtils = services.GuideUtils;
    const repositoryId = options.repositoryIdToSelect ?? Utils.getRepositoryName(services, options);
    const selectRepositoryRowSelector = GuideUtils.getGuideElementSelector(`repository-${repositoryId}`);
    const selectRepositoryButtonWrapperSelector = `${selectRepositoryRowSelector} ${GuideUtils.getGuideElementSelector('select-repository-button-wrapper')}`;
    const selectRepositoryButtonSelector = `${selectRepositoryButtonWrapperSelector} ${GuideUtils.getGuideElementSelector('select-repository-button')}`;
    return [
      {
        guideBlockName: 'clickable-element',
        options: {
          content: 'guide.step_plugin.repositories.select-repository.content',
          // If mainAction is set the title will be set automatically
          ...(options.mainAction ? {} : {title: Utils.REPOSITORIES_DEFAULT_TITLE}),
          url: 'repository',
          elementSelector: selectRepositoryButtonWrapperSelector,
          class: 'repositories-select-repository',
          onNextClick: () => GuideUtils.clickOnElement(selectRepositoryButtonSelector)(),
          ...options
        }
      }
    ];
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
