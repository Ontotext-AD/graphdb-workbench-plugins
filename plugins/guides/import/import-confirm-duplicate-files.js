const DEFAULT_TITLE = 'guide.step-action.import-file';
const CONTENT = 'guide.step_plugin.import_rdf_file.confirm_duplicate_files_dialog.content';

/**
 * @name import-confirm-duplicate-files
 * @memberof module:Interactive Guide
 *
 * @description
 *
 * The `import-confirm-duplicate-files` step guides the user to confirm overwriting duplicate files in the import dialog of GraphDB.<br>
 * <img src="resources/guides/import/import-confirm-duplicate-files.png" style="height:200px; border: solid; border-width:1px"/>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```JSON
 * {
 *   "guideBlockName": "import-confirm-duplicate-files"
 * }
 * ```
 */
const step = {
  guideBlockName: 'import-confirm-duplicate-files',
  getSteps: function(options, services) {
    const GuideUtils = services.GuideUtils;
    const translate = services.translate;
    return [
      {
        guideBlockName: 'clickable-element',
        options: {
          content: translate(step.translationBundle, CONTENT),
          title: translate(step.translationBundle, DEFAULT_TITLE),
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
  },
  translationBundle: {
    en: {
      [DEFAULT_TITLE]: 'Import file',
      [CONTENT]: 'Click on the <b>Yes</b> button to override the existing file.'
    },
    fr: {
      [DEFAULT_TITLE]: 'Importer un fichier',
      [CONTENT]: 'Cliquez sur le bouton <b>Oui</b> pour remplacer le fichier existant.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
