import * as Utils from '../utils.js';

const step = {
  guideBlockName: 'repositories-enable-fts',
  getSteps: (options, services) => {
    const GuideUtils = services.GuideUtils;
    return [
      {
        guideBlockName: 'clickable-element',
        options: {
          content: 'guide.step_plugin.create_repository.enable-fts.content',
          // If mainAction is set the title will be set automatically
          ...(options.mainAction ? {} : {title: Utils.REPOSITORIES_CREATE_DEFAULT_TITLE}),
          class: 'gdb-repository-enable-fts',
          extraContent: 'guide.step_plugin.create_repository.enable-fts.extra-content',
          extraContentClass: 'alert alert-help text-left',
          ...options,
          url: 'repository/create/graphdb',
          elementSelector: GuideUtils.getGuideElementSelector('enable-fts-search'),
          disablePreviousFlow: false,
          onNextValidate: () =>
            Promise.resolve(
              GuideUtils.isChecked(
                GuideUtils.getGuideElementSelector('enable-fts-search', 'input')
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
