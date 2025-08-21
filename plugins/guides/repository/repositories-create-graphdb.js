import * as Utils from '../utils.js';

const step = {
  guideBlockName: 'repositories-create-graphdb',
  getSteps: (options, services) => {
    const GuideUtils = services.GuideUtils;
    return [
      {
        guideBlockName: 'clickable-element',
        options: {
          content: 'guide.step_plugin.create_repository.graph_db_repository.content',
          // If mainAction is set the title will be set automatically
          ...(options.mainAction ? {} : {title: Utils.REPOSITORIES_CREATE_DEFAULT_TITLE}),
          class: 'create-gdb-repository',
          ...options,
          url: 'repository/create',
          elementSelector: GuideUtils.getGuideElementSelector('createGraphDBRepository'),
          disablePreviousFlow: false,
          onNextClick: GuideUtils.clickOnGuideElement('createGraphDBRepository')
        }
      }
    ];
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
