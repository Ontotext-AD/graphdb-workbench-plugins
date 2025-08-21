import * as Utils from '../utils.js';

const step = {
  guideBlockName: 'download-guide-resource',
  getSteps: (options, services) => {
    const downloadButtonClass = `guide-${options.repositoryId}-download-resource-link`;
    const downloadResourceListener = Utils.createDownloadClickHandler(options.resourcePath, options.resourceFile, services);
    let stepHTMLElement;
    return {
      guideBlockName: 'info-message',
      options: angular.extend({}, {
        title: 'guide.step_plugin.download-guide-resource.title',
        content: 'guide.step_plugin.download-guide-resource.content',
        canBePaused: true,
        forceReload: true,
        downloadButtonClass,
        show: (guide) => () => {
          stepHTMLElement = guide.currentStep.el.querySelector(`.${downloadButtonClass}`);
          stepHTMLElement.addEventListener('click', downloadResourceListener);
        },
        hide: () => () => {
          if (stepHTMLElement) {
            stepHTMLElement.removeEventListener('click', downloadResourceListener);
          }
        }
      }, options)
    };
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
