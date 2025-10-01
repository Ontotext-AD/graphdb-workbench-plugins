const DEFAULT_TITLE = 'guide.step-action.import-file';

/**
 * @name import-rdf-file
 * @memberof module:Interactive Guide
 *
 * @description
 * The `import-rdf-file` guide shows how to import an RDF file into GraphDB.
 *
 * The guide consists of the following steps:
 * 1. A step that guides the user to click on the "Import" main menu.<br>
 * <img src="resources/guides/main-menu/main-menu-import.png" style="height:200px; border: solid; border-width:1px"/>
 * 2. A step that downloads a guide resource if specified.<br>
 * <img src="resources/guides/import/import-download-guide-resource.png" style="height:200px; border: solid; border-width:1px"/>
 * 3. A step that guides the user to upload an RDF file.<br>
 * <img src="resources/guides/import/import-upload-rdf-file.png" style="height:200px; border: solid; border-width:1px"/>
 * 4. (Optional) A step that shows an info dialog if the file is already uploaded.<br>
 * <img src="resources/guides/import/import-confirm-duplicate-files.png" style="height:200px; border: solid; border-width:1px"/>
 * 5. A step that guides the user to click the import button.<br>
 * <img src="resources/guides/import/import-click-on-import-button.png" style="height:200px; border: solid; border-width:1px"/>
 * 6. A step that shows the import progress.<br>
 * <img src="resources/guides/import/import-show-progress.png" style="height:200px; border: solid; border-width:1px"/>
 *
 * This guide can be configured using the common options defined in [Options](#.Options). Additionally, it supports the following options:
 * @property {string} resourcesPath - The path to the resource that should be downloaded in the step.
 * @property {string} resourceFile - The name of the resource file that should be downloaded in the step.
 *
 * @example
 * ```JSON
 * {
 *   "guideBlockName": "import-rdf-file",
 *   "options": {
 *        "resourcePath": "/path/to/example.rdf",
 *        "resourceFile": "example.rdf",
 *   }
 * }
 * ```
 */
const step = {
  guideBlockName: 'import-rdf-file',
  getSteps: (options, services) => {
    const translate = services.translate;
    options.mainAction = 'import-file';
    const title = options.title ? options.title : translate(step.translationBundle, DEFAULT_TITLE);
    const steps = [
      {
        guideBlockName: 'click-main-menu',
        options: {
          menu: 'import',
          showIntro: true,
          title,
          ...options
        }
      }
    ];

    if (options.resourcePath) {
      steps.push(
        {
          guideBlockName: 'download-guide-resource',
          options: {
            title,
            ...options
          }
        }
      );
    }

    steps.push(...[
      {
        guideBlockName: 'import-upload-rdf-file', options: {
          disablePreviousFlow: false,
          title,
          ...options}
      },
      // This step is optional and will only appear if the file we want to upload has already been uploaded.
      // If the file is already uploaded, a confirmation dialog will be opened, and this step will display the confirm button of the dialog.
      {
        guideBlockName: 'import-confirm-duplicate-files', options: {title, ...options}
      },
      {
        guideBlockName: 'import-click-on-import-button', options: {title, ...options}
      },
      {
        guideBlockName: 'import-show-progress', options: {title, ...options}
      }
    ]);

    return steps;
  },
  translationBundle: {
    en: {
      [DEFAULT_TITLE]: 'Import file'
    },
    fr: {
      [DEFAULT_TITLE]: 'Importer un fichier'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
