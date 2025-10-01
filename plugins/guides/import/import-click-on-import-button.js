const DEFAULT_TITLE = 'guide.step-action.import-file';
const CONTENT = 'guide.step_plugin.import_rdf_file.import-settings.import.button.content';
const UNEXPECTED_ERROR = 'guide.unexpected.error.message';

/**
 * @name import-click-on-import-button
 * @memberof module:Interactive Guide
 *
 * @description
 *
 * The `import-click-on-import-button` step guides the user to click the import button in the import settings dialog of GraphDB.<br>
 * <img src="resources/guides/import/import-click-on-import-button.png" style="height:200px; border: solid; border-width:1px"/>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```JSON
 * {
 *   "guideBlockName": "import-click-on-import-button"
 * }
 * ```
 */
const step = {
  guideBlockName: 'import-click-on-import-button',
  getSteps: (options, services) => {
    const GuideUtils = services.GuideUtils;
    const translate = services.translate;
    const importSettingsButtonSelector = GuideUtils.getGuideElementSelector('import-settings-import-button');
    return [
      {
        guideBlockName: 'clickable-element',
        options: {
          content: translate(step.translationBundle, CONTENT),
          ...(options.title ? {} : {title: translate(step.translationBundle, DEFAULT_TITLE)}),
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
                services.toastr.error(translate(step.translationBundle, UNEXPECTED_ERROR));
                return Promise.reject(error);
              })
            ),
          onNextClick: () => GuideUtils.clickOnGuideElement('import-settings-import-button')(),
          canBePaused: false
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [DEFAULT_TITLE]: 'Import file',
      [CONTENT]: 'Click on the <b>Import</b> button.',
      [UNEXPECTED_ERROR]: 'The guide was cancelled due to an unexpected error. Please run the guide again and if the problem persists contact the support.'
    },
    fr: {
      [DEFAULT_TITLE]: 'Importer un fichier',
      [CONTENT]: 'Cliquez sur le bouton <b>Importer</b>.',
      [UNEXPECTED_ERROR]: 'Le guide a été annulé en raison d\'une erreur inattendue. Veuillez exécuter à nouveau le guide et si le problème persiste, contactez le support.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
