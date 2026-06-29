const CREATE_SIMILARITY_INDEX_DEFAULT = 'guide.step-action.create-similarity-index';
const CREATE_INDEX = 'guide.step_plugin.create-similarity-index.create-index';

/**
 * @name similarity-click-to-create
 * @memberof module:Interactive Guide
 *
 * @description
 * This step highlights the "Create Similarity index" button and prompts the user to click it.
 *
 * Click the button to create a new Similarity index<br>
 * <img src="resources/guides/similarity-index/similarity-click-to-create.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "similarity-click-to-create"
 * }
 * ```
 */
const step = {
  guideBlockName: 'similarity-click-to-create',
  getSteps: function(options, services) {
    const translate = services.translate;
    const GuideUtils = services.GuideUtils;
    return [
      {
        guideBlockName: 'clickable-element',
        options: {
          content: translate(this.translationBundle, CREATE_INDEX),
          title: translate(this.translationBundle, CREATE_SIMILARITY_INDEX_DEFAULT),
          class: 'create-similarity-index',
          disablePreviousFlow: false,
          disableNextFlow: true,
          ...options,
          url: 'similarity/index/create',
          elementSelector: GuideUtils.getGuideElementSelector('create-similarity-index-btn')
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [CREATE_SIMILARITY_INDEX_DEFAULT]: 'Create Similarity index',
      [CREATE_INDEX]: 'Click the button to create the Similarity index.'
    },
    fr: {
      [CREATE_SIMILARITY_INDEX_DEFAULT]: 'Créer un indice de similitude',
      [CREATE_INDEX]: 'Cliquez sur le bouton pour créer l\'index de similarité.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
