const CREATE_SIMILARITY_INDEX_DEFAULT = 'guide.step-action.create-similarity-index';
const CREATE_INDEX = 'guide.step_plugin.create-similarity-index.create-similarity-index';

/**
 * @name similarity-click-link
 * @memberof module:Interactive Guide
 *
 * @description
 * This step highlights the "Create Similarity index" link and prompts the user to click it.
 *
 * Click the link to start creating a new Similarity index<br>
 * <img src="resources/guides/similarity-index/similarity-click-link.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "similarity-click-link"
 * }
 * ```
 */
const step = {
  guideBlockName: 'similarity-click-link',
  getSteps: function(options, services) {
    const translate = services.translate;
    const GuideUtils = services.GuideUtils;
    return [
      {
        guideBlockName: 'clickable-element',
        options: {
          content: translate(this.translationBundle, CREATE_INDEX),
          ...(options.title ?? {title: translate(this.translationBundle, CREATE_SIMILARITY_INDEX_DEFAULT)}),
          class: 'similarity-index',
          disableNextFlow: true,
          ...options,
          url: 'similarity',
          elementSelector: GuideUtils.getGuideElementSelector('create-similarity-index'),
          onNextClick: () => {
          }
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [CREATE_SIMILARITY_INDEX_DEFAULT]: 'Create Similarity index',
      [CREATE_INDEX]: 'Click the link to start creating a new Similarity index'
    },
    fr: {
      [CREATE_SIMILARITY_INDEX_DEFAULT]: 'Créer un indice de similitude',
      [CREATE_INDEX]: 'Cliquez sur le lien pour commencer à créer un nouvel indice de similitude.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
