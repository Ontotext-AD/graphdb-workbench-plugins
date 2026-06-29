const WAIT_FOR_INDEX = 'guide.step_plugin.create-similarity-index.wait';
const CREATE_SIMILARITY_INDEX_DEFAULT = 'guide.step-action.create-similarity-index';

/**
 * @name similarity-hold-and-wait-until-shown
 * @memberof module:Interactive Guide
 *
 * @description
 * This step instructs the user to wait until the new similarity index is created
 *
 * <img src="resources/guides/similarity-index/similarity-hold-and-wait-until-shown.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "similarity-hold-and-wait-until-shown"
 * }
 * ```
 */
const step = {
  guideBlockName: 'similarity-hold-and-wait-until-shown',
  getSteps: function(options, services) {
    const translate = services.translate;
    const GuideUtils = services.GuideUtils;
    return [
      {
        guideBlockName: 'hold-and-wait-until-shown',
        options: {
          title: translate(this.translationBundle, CREATE_SIMILARITY_INDEX_DEFAULT),
          content: translate(this.translationBundle, WAIT_FOR_INDEX),
          class: 'wait-for-index',
          ...options,
          elementSelectorToWait: GuideUtils.getGuideElementSelector('similarity-indexes-table')
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [CREATE_SIMILARITY_INDEX_DEFAULT]: 'Create Similarity index',
      [WAIT_FOR_INDEX]: 'Wait for index to be created'
    },
    fr: {
      [CREATE_SIMILARITY_INDEX_DEFAULT]: 'Créer un indice de similitude',
      [WAIT_FOR_INDEX]: 'Attendre la création de l\'index'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
