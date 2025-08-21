import * as Utils from '../utils.js';

const step = {
  guideBlockName: 'import-upload-rdf-file',
  getSteps: (options, services) => {
    const GuideUtils = services.GuideUtils;
    const toastr = services.toastr;
    const $translate = services.$translate;
    const $interpolate = services.$interpolate;
    const EventEmitterService = services.EventEmitterService;
    const importSettingsButtonSelector = GuideUtils.getGuideElementSelector('import-settings-import-button');
    let filesForUploadSelectedSubscription;
    return [
      {
        guideBlockName: 'clickable-element',
        options: {
          content: 'guide.step_plugin.import_rdf_file.content',
          class: 'upload-rdf-file-button',
          // If mainAction is set the title will be set automatically
          ...(options.mainAction ? {} : {title: Utils.IMPORT_FILE_DEFAULT_STEP_TITLE}),
          ...options,
          url: 'import',
          elementSelector: GuideUtils.getGuideElementSelector('uploadRdfFileButton'),
          // Disable default behavior of service when element is clicked.
          advanceOn: undefined,
          show: (guide) => () => {
            // Subscribes to event "filesForUploadSelected", when the step is showing, this will give opportunity
            // to canceling uploading if user not choose correct file.
            filesForUploadSelectedSubscription = EventEmitterService.subscribe('filesForUploadSelected', ((eventData) => {
              const uploadedFiles = eventData.files || [];
              if (uploadedFiles.some((uploadedFile) => uploadedFile.name === options.resourceFile)) {
                // When tha correct file is selected, the guide can continue.

                // Check for duplicated name, if import button for guide rdf data exist.
                if (GuideUtils.isVisible(GuideUtils.getGuideElementSelector('import-file-' + options.resourceFile))) {
                  GuideUtils.getOrWaitFor('.confirm-duplicate-files-dialog')
                    .then(() => guide.next());
                } else {
                  GuideUtils.getOrWaitFor(importSettingsButtonSelector)
                    .then(() => guide.next());
                }
              } else {
                // Canceling the automatic uploading of files
                // because the guide rdf file is not selected.
                eventData.cancel = true;
              }
            }));
          },
          hide: () => () => {
            if (filesForUploadSelectedSubscription) {
              filesForUploadSelectedSubscription();
            }
          },
          onNextValidate: () => {
            return Promise.allSettled([GuideUtils.getOrWaitFor('.confirm-duplicate-files-dialog'), GuideUtils.getOrWaitFor(GuideUtils.getGuideElementSelector('import-file-' + options.resourceFile))])
              .then(([confirmDialogPromise, importButtonPromise]) => {
                // There are two ways to exit this step:
                // if the duplication dialog is opened
                // or if the import button for the guide file is displayed.
                // The first scenario indicates that the user is trying to upload the same file,
                // while the second scenario suggests
                // that the guide has been started more than once.
                if ('rejected' === confirmDialogPromise.status && 'rejected' === importButtonPromise.status) {
                  GuideUtils.noNextErrorToast(toastr, $translate, $interpolate, 'guide.step_plugin.import_rdf_file.file-must-be-uploaded', options);
                  return false;
                }
                return true;
              });
          },
          onNextClick: (guide) => {
            GuideUtils.getOrWaitFor(GuideUtils.getGuideElementSelector('import-file-' + options.resourceFile))
              .then((element) => {
                // If we have file import button for the guide rdf file,
                // this indicates that we go through this step for the second time.
                // This can happen if the user starts the guide for the second time.
                element.click();
              })
              .finally(() => guide.next());
          }
        }
      }
    ];
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
