import * as Utils from '../utils.js';

const DOWNLOAD_RESOURCE_TITLE = 'guide.step_plugin.download-guide-resource.title';
const RESOURCE_CONTENT = 'guide.step_plugin.download-guide-resource.content';

/**
 * @name download-guide-resource
 * @memberof module:Interactive Guide
 *
 * @description
 * This step guides the user to download a resource file required for the guide.
 *
 * Download guide resource step<br>
 * <img src="resources/guides/download-guide-resource/download-guide-resource.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options). Additionally, it requires:
 * @property {string} options.resourcePath - The path to the resource file.
 * @property {string} options.resourceFile - The name of the resource file.
 *
 * @example
 * ```JSON
 * {
 *   "guideBlockName": "download-guide-resource",
 *   "options": {
 *     "resourcePath": "movies",
 *     "resourceFile": "movies.ttl"
 *   }
 * }
 * ```
 */
const step = {
  guideBlockName: 'download-guide-resource',
  getSteps: function(options, services) {
    const translate = services.translate;
    const downloadButtonClass = `guide-${options.repositoryId}-download-resource-link`;
    const downloadResourceListener = Utils.createDownloadClickHandler(options.resourcePath, options.resourceFile, services);
    let stepHTMLElement;
    return {
      guideBlockName: 'info-message',
      options: {
        title: translate(this.translationBundle, DOWNLOAD_RESOURCE_TITLE),
        content: translate(this.translationBundle, RESOURCE_CONTENT, {
          downloadButtonClass,
          resourceFile: options.resourceFile
        }),
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
        },
        ...options
      }
    };
  },
  translationBundle: {
    en: {
      [DOWNLOAD_RESOURCE_TITLE]: 'Download guide resources',
      [RESOURCE_CONTENT]: 'This guide requires a file to be downloaded.<br>Please <a href="#" class="{{downloadButtonClass}}">download {{resourceFile}}</a>.'
    },
    fr: {
      [DOWNLOAD_RESOURCE_TITLE]: 'Télécharger les ressources du guide',
      [RESOURCE_CONTENT]: 'Ce guide nécessite le téléchargement d\'un fichier.<br>Veuillez <a href="#" class="{{downloadButtonClass}}">télécharger {{resourceFile}}</a>.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
