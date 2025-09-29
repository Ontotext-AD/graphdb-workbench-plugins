const step = {
  guideBlockName: 'import-rdf-file',
  getSteps: (options) => {
    options.mainAction = 'import-file';

    const steps = [
      {
        guideBlockName: 'click-main-menu',
        options: angular.extend({}, {
          menu: 'import',
          showIntro: true
        }, options)
      }
    ];

    if (options.resourcePath) {
      steps.push(
        {
          guideBlockName: 'download-guide-resource',
          options: angular.extend({}, {
            title: ''
          }, options)
        }
      );
    }

    steps.push(...[
      {
        guideBlockName: 'import-upload-rdf-file', options: {
          disablePreviousFlow: false,
          ...options}
      },
      // This step is optional and will only appear if the file we want to upload has already been uploaded.
      // If the file is already uploaded, a confirmation dialog will be opened, and this step will display the confirm button of the dialog.
      {
        guideBlockName: 'import-confirm-duplicate-files', options: {...options}
      },
      {
        guideBlockName: 'import-click-on-import-button', options: {...options}
      },
      {
        guideBlockName: 'import-show-progress', options: {...options}
      }
    ]);

    return steps;
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
