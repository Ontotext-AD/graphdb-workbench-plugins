const DEFAULT_TITLE = 'guide.step-action.import-file';
const CONTENT = 'guide.step_plugin.import_rdf_file.content';
const UPLOAD_FILE_ERROR = 'guide.step_plugin.import_rdf_file.file-must-be-uploaded';
const UNEXPECTED_FILE = 'guide.step_plugin.import_rdf_file.unexpected-file';

/**
 * @name import-upload-rdf-file
 * @memberof module:Interactive Guide
 *
 * @description
 *
 * The `import-upload-rdf-file` step guides the user to click the button to upload an RDF file in GraphDB.<br>
 * <img src="resources/guides/import/import-upload-rdf-file.png" style="height:200px; border: solid; border-width:1px"/>
 *
 * This step can be configured using the common options defined in [Options](#.Options). Additionally, it supports the following options:
 * @property {string} resourceFile - The name of the resource file that should be downloaded in the step.
 *
 * @example
 * ```JSON
 * {
 *   "guideBlockName": "import-upload-rdf-file",
 *   "options": {
 *        "resourceFile": "example.rdf"
 *   }
 * }
 * ```
 */
const step = {
  guideBlockName: 'import-upload-rdf-file',
  getSteps: function(options, services) {
    const GuideUtils = services.GuideUtils;
    const toastr = services.toastr;
    const $translate = services.$translate;
    const translate = services.translate;
    const $interpolate = services.$interpolate;
    const EventEmitterService = services.EventEmitterService;
    const importSettingsButtonSelector = GuideUtils.getGuideElementSelector('import-settings-import-button');
    let filesForUploadSelectedSubscription;
    return [
      {
        guideBlockName: 'clickable-element',
        options: {
          content: translate(step.translationBundle, CONTENT, {resourceFile: options.resourceFile}),
          class: 'upload-rdf-file-button',
          ...(options.title ? {} : {title: translate(step.translationBundle, DEFAULT_TITLE)}),
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
                GuideUtils.noNextErrorToast(toastr, $translate, $interpolate, translate(this.translationBundle, UNEXPECTED_FILE, {resourceFile: options.resourceFile}), options);
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
                  const uploadFileError = translate(this.translationBundle, UPLOAD_FILE_ERROR, {resourceFile: options.resourceFile});
                  // TODO should be reworked with GDB-13089
                  GuideUtils.noNextErrorToast(toastr, $translate, $interpolate, uploadFileError, options);
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
  },
  translationBundle: {
    en: {
      [DEFAULT_TITLE]: 'Import file',
      [CONTENT]: 'Click on the <b>Upload RDF files</b> button and choose a file with the name <b>{{resourceFile}}</b>.',
      [UPLOAD_FILE_ERROR]: 'Upload the file <b>{{resourceFile}}</b> first',
      [UNEXPECTED_FILE]: 'The uploaded file does not match the expected resource. Please upload <b>{{resourceFile}}</b>.'
    },
    fr: {
      [DEFAULT_TITLE]: 'Importer un fichier',
      [CONTENT]: 'Cliquez sur le bouton <b>Télécharger des fichiers RDF</b> et choisissez un fichier avec le nom <b>{{resourceFile}}</b>.',
      [UPLOAD_FILE_ERROR]: 'Téléchargez d\'abord le fichier <b>{{resourceFile}}</b>',
      [UNEXPECTED_FILE]: 'Le fichier importé ne correspond pas à la ressource attendue. Veuillez importer <b>{{resourceFile}}</b>.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
