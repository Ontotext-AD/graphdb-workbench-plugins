import * as Utils from '../utils.js';

const step = {
  guideBlockName: 'import-click-on-import-button',
  getSteps: (options, services) => {
    const GuideUtils = services.GuideUtils;
    const importSettingsButtonSelector = GuideUtils.getGuideElementSelector('import-settings-import-button');
    return [
      {
        guideBlockName: 'clickable-element',
        options: {
          content: 'guide.step_plugin.import_rdf_file.import-settings.import.button.content',
          // If mainAction is set the title will be set automatically
          ...(options.mainAction ? {} : {title: Utils.IMPORT_FILE_DEFAULT_STEP_TITLE}),
          placement: 'top',
          class: 'import-settings-import-file-button',
          ...options,
          elementSelector: importSettingsButtonSelector,
          onPreviousClick: () => new Promise(function(resolve) {
            GuideUtils.clickOnGuideElement('import-settings-cancel-button')()
              .then(() => resolve());
          }),
          beforeShowPromise: () => services.GuideUtils.deferredShow(300)()
            .then(() => GuideUtils.getOrWaitFor(importSettingsButtonSelector, 3)
              .catch((error) => {
                services.toastr.error(services.$translate.instant('guide.unexpected.error.message'));
                return Promise.reject(error);
              })
            ),
          onNextClick: () => GuideUtils.clickOnGuideElement('import-settings-import-button')(),
          canBePaused: false
        }
      }
    ];
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
