const REPOSITORIES_CREATE_DEFAULT_TITLE = 'guide.step-action.create-repository';
const ENABLE_FTS_CONTENT = 'guide.step_plugin.create_repository.enable-fts.content';
const EXTRA_CONTENT = 'guide.step_plugin.create_repository.enable-fts.extra-content';

/**
 * @name repositories-enable-fts
 * @memberof module:Interactive Guide
 *
 * @description
 * This step guides the user to enable full-text search (FTS) index for a repository.
 *
 * Enable full-text search step<br>
 * <img src="resources/guides/repository/repositories-enable-fts.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "repositories-enable-fts"
 * }
 * ```
 */
const step = {
  guideBlockName: 'repositories-enable-fts',
  getSteps: function(options, services) {
    const translate = services.translate;
    const GuideUtils = services.GuideUtils;
    return [
      {
        guideBlockName: 'clickable-element',
        options: {
          content: translate(this.translationBundle, ENABLE_FTS_CONTENT),
          title: translate(this.translationBundle, REPOSITORIES_CREATE_DEFAULT_TITLE),
          class: 'gdb-repository-enable-fts',
          extraContent: translate(this.translationBundle, EXTRA_CONTENT),
          extraContentClass: 'alert alert-help text-left',
          ...options,
          url: 'repository/create/graphdb',
          elementSelector: GuideUtils.getGuideElementSelector('enable-fts-search'),
          disablePreviousFlow: false,
          onNextValidate: () =>
            Promise.resolve(
              GuideUtils.isChecked(
                GuideUtils.getGuideElementSelector('enable-fts-search', 'input')
              )
            )
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [REPOSITORIES_CREATE_DEFAULT_TITLE]: 'Create repository',
      [ENABLE_FTS_CONTENT]: 'Enable full-text search (FTS) index',
      [EXTRA_CONTENT]: 'The full text search index is used for finding specific strings within the values associated with a given entity. For example, you can search for the word "feature" within a larger context. This is very helpful in cases where a lot of data is stored in literals.'
    },
    fr: {
      [REPOSITORIES_CREATE_DEFAULT_TITLE]: 'Créer un dépôt',
      [ENABLE_FTS_CONTENT]: 'Activer l\'index de recherche en texte intégral (FTS)',
      [EXTRA_CONTENT]: 'L\'index de recherche plein texte est utilisé pour trouver des chaînes de caractères spécifiques dans les valeurs associées à une entité donnée. Par exemple, vous pouvez rechercher le mot « feature » dans un contexte plus large. Cette fonction est très utile dans les cas où de nombreuses données sont stockées sous forme de valeurs littérales.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
