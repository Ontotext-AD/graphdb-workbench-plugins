const CREATE_SIMILARITY_INDEX_DEFAULT = 'guide.step-action.create-similarity-index';
const INPUT_INDEX_NAME = 'guide.step_plugin.create-similarity-index.input-index-name';

/**
 * @name similarity-type-index-name
 * @memberof module:Interactive Guide
 *
 * @description
 * This step prompts the user to type a name for the similarity index.
 *
 * Type a name for the similarity index<br>
 * <img src="resources/guides/similarity-index/similarity-type-index-name.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "similarity-type-index-name"
 * }
 * ```
 */
const step = {
  guideBlockName: 'similarity-type-index-name',
  getSteps: function(options, services) {
    const translate = services.translate;
    const GuideUtils = services.GuideUtils;
    return [
      {
        guideBlockName: 'input-element',
        options: {
          content: translate(this.translationBundle, INPUT_INDEX_NAME),
          ...(options.title ?? {title: translate(this.translationBundle, CREATE_SIMILARITY_INDEX_DEFAULT)}),
          class: 'similarity-index-name-input',
          ...options,
          url: 'similarity/index/create',
          elementSelector: GuideUtils.getGuideElementSelector('similarity-index-name'),
          onNextValidate: () => Promise.resolve(GuideUtils.validateTextInputNotEmpty(GuideUtils.getGuideElementSelector('similarity-index-name')))
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [CREATE_SIMILARITY_INDEX_DEFAULT]: 'Create Similarity index',
      [INPUT_INDEX_NAME]: 'Type a name for the index. You will refer to it later.'
    },
    fr: {
      [CREATE_SIMILARITY_INDEX_DEFAULT]: 'Créer un indice de similitude',
      [INPUT_INDEX_NAME]: 'Saisissez un nom pour l\'index. Vous y ferez référence ultérieurement.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
