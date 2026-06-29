const DEFAULT_TITLE = 'guide.step-action.import-file';
const CONTENT = 'guide.step_plugin.import_status_info.content';

/**
 * @name import-show-progress
 * @memberof module:Interactive Guide
 *
 * @description
 *
 * The `import-show-progress` step guides the user to monitor the progress of an import operation in the import dialog of GraphDB.<br>
 * <img src="resources/guides/import/import-show-progress.png" style="height:200px; border: solid; border-width:1px"/>
 *
 * This step can be configured using the common options defined in [Options](#.Options). Additionally, it supports the following options:
 * @property {string} resourceFile - The name of the resource file that should be downloaded in the step.
 *
 * @example
 * ```JSON
 * {
 *   "guideBlockName": "import-show-progress",
 *   "options": {
 *     "resourceFile": "example.rdf"
 *   }
 * }
 * ```
 */
const step = {
  guideBlockName: 'import-show-progress',
  getSteps: function(options, services) {
    const GuideUtils = services.GuideUtils;
    const translate = services.translate;
    return [
      {
        guideBlockName: 'read-only-element',
        options: {
          content: translate(step.translationBundle, CONTENT),
          title: translate(step.translationBundle, DEFAULT_TITLE),
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
  },
  translationBundle: {
    en: {
      [DEFAULT_TITLE]: 'Import file',
      [CONTENT]: 'Wait until import finished.'
    },
    fr: {
      [DEFAULT_TITLE]: 'Importer un fichier',
      [CONTENT]: 'Attendez la fin de l\'importation.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
