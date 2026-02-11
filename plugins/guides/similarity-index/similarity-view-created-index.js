const CREATE_SIMILARITY_INDEX_DEFAULT = 'guide.step-action.create-similarity-index';
const VIEW_CREATED_INDEX_DEFAULT = 'guide.step_plugin.similarity-view-index';
const VIEW_CREATED_INDEX_BY_NAME = 'guide.step_plugin.similarity-view-created-index';

/**
 * @name similarity-view-created-index
 * @memberof module:Interactive Guide
 *
 * @description
 * This step highlights the newly created similarity index in the Existing Indexes table. The default index to highlight
 * is the first index, unless <code>options.rowIndex</code> is specified. If <code>options.indexName</code> is specified,
 * the step will highlight the index with the specified name.
 *
 * View the newly created similarity index<br>
 * <img src="resources/guides/similarity-index/similarity-view-created-index.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options). Additionally, it supports:
 *
 * @property {string} [options.content] - The content of the dialog.
 * @property {string} [options.title] - The title of the dialog.
 * @property {number} [options.rowIndex] - The index of the row to focus on.
 * @property {string} [options.indexName] - The name of the index to focus on.
 *
 * @example
 * ```JSON
 * {
 *   "guideBlockName": "similarity-view-created-index",
 *   "options": {
 *     "title": {
 *       "en": "Explore Similarity index"
 *     },
 *     "content": "In the <b>Existing Indexes</b> table, you can now see the <b>SpellSimIndex</b> which is the similarity index we created with the previous query.",
 *     "rowIndex": 1
 *   }
 * }
 */
const step = {
  guideBlockName: 'similarity-view-created-index',
  getSteps: function(options, services) {
    const translate = services.translate;
    const GuideUtils = services.GuideUtils;
    const content = options.indexName ?
      translate(this.translationBundle, VIEW_CREATED_INDEX_BY_NAME, {indexName: options.indexName}) :
      translate(this.translationBundle, VIEW_CREATED_INDEX_DEFAULT);
    let elementSelector;
    if (options.indexName) {
      elementSelector = GuideUtils.getGuideElementSelector(`similarity-index-name-${options.indexName}`);
    } else {
      elementSelector = GuideUtils.getGuideElementSelector(`similarity-index-row-${options.rowIndex ?? 0}`, 'td:has(> .index-name)');
    }

    return [
      {
        guideBlockName: 'focus-element',
        options: {
          content,
          url: 'similarity',
          class: 'view-created-index',
          ...(options.title ?? {title: CREATE_SIMILARITY_INDEX_DEFAULT}),
          ...options,
          elementSelector
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [CREATE_SIMILARITY_INDEX_DEFAULT]: 'Create Similarity index',
      [VIEW_CREATED_INDEX_BY_NAME]: 'In the <b>Existing Indexes</b> table, you can now see the <b>{{indexName}}</b> which is the similarity index we created with the previous query.',
      [VIEW_CREATED_INDEX_DEFAULT]: 'In the <b>Existing Indexes</b> table, you can now see the created index.'
    },
    fr: {
      [CREATE_SIMILARITY_INDEX_DEFAULT]: 'Créer un indice de similitude',
      [VIEW_CREATED_INDEX_BY_NAME]: 'Dans le tableau <b>Index existants</b>, vous pouvez maintenant voir le <b>{{indexName}}</b> qui est l\'index de similarité que nous avons créé avec la requête précédente.',
      [VIEW_CREATED_INDEX_DEFAULT]: 'Dans le tableau <b>Index existants</b>, vous pouvez désormais voir l\'index créé.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
