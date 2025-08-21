import * as Utils from '../utils.js';

const step = {
  guideBlockName: 'import-show-progress',
  getSteps: (options, services) => {
    const GuideUtils = services.GuideUtils;
    return [
      {
        guideBlockName: 'read-only-element',
        options: {
          content: 'guide.step_plugin.import_status_info.content',
          // If mainAction is set the title will be set automatically
          ...(options.mainAction ? {} : {title: Utils.IMPORT_FILE_DEFAULT_STEP_TITLE}),
          class: 'import-status-info',
          ...options,
          url: 'import',
          elementSelector: '.import-resource-message',
          beforeShowPromise: () => {
            if (GuideUtils.isVisible('.import-resource-message')) {
              return Promise.resolve();
            }
            return GuideUtils.waitFor('.import-resource-message', 10);
          },
          onPreviousClick: () => GuideUtils.getOrWaitFor(GuideUtils.getGuideElementSelector('import-file-' + options.resourceFile), 10)
            .then((element) => {
              element.click();
            })
        }
      }
    ];
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
