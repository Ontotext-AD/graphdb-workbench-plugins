import * as Utils from '../utils.js';

const step = {
  guideBlockName: 'import-confirm-duplicate-files',
  getSteps: (options, services) => {
    const GuideUtils = services.GuideUtils;
    return [
      {
        guideBlockName: 'clickable-element',
        options: {
          content: 'guide.step_plugin.import_rdf_file.confirm_duplicate_files_dialog.content',
          // If mainAction is set the title will be set automatically
          ...(options.mainAction ? {} : {title: Utils.IMPORT_FILE_DEFAULT_STEP_TITLE}),
          placement: 'bottom',
          class: 'import-file-button',
          ...options,
          url: 'import',
          elementSelector: GuideUtils.getElementSelector('.confirm-duplicate-files-dialog .confirm-overwrite-btn'),
          skipFromHistory: true,
          // Checks whether the confirm dialog is currently open.
          showOn: () => GuideUtils.isVisible(GuideUtils.getElementSelector('.confirm-duplicate-files-dialog')),
          onNextClick: () => GuideUtils.clickOnElement('.confirm-duplicate-files-dialog .confirm-overwrite-btn')(),
          onPreviousClick: () => {
            if (GuideUtils.isVisible(GuideUtils.getElementSelector('.confirm-duplicate-files-dialog'))) {
              return GuideUtils.clickOnElement('.confirm-duplicate-files-dialog .cancel-btn');
            }
            return Promise.resolve();
          }
        }
      }
    ];
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
