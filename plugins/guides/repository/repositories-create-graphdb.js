const REPOSITORIES_CREATE_DEFAULT_TITLE = 'guide.step-action.create-repository';
const GRAPHDB_REPOSITORY_CONTENT = 'guide.step_plugin.create_repository.graph_db_repository.content';

/**
 * @name repositories-create-graphdb
 * @memberof module:Interactive Guide
 *
 * @description
 * This step explains how to create a GraphDB repository.
 *
 * Create GraphDB repository step<br>
 * <img src="resources/guides/repository/repositories-create-graphdb.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "repositories-create-graphdb"
 * }
 * ```
 */
const step = {
  guideBlockName: 'repositories-create-graphdb',
  getSteps: function(options, services) {
    const translate = services.translate;
    const GuideUtils = services.GuideUtils;
    return [
      {
        guideBlockName: 'clickable-element',
        options: {
          content: translate(this.translationBundle, GRAPHDB_REPOSITORY_CONTENT),
          ...(options.title ?? {title: translate(this.translationBundle, REPOSITORIES_CREATE_DEFAULT_TITLE)}),
          class: 'create-gdb-repository',
          ...options,
          url: 'repository/create',
          elementSelector: GuideUtils.getGuideElementSelector('createGraphDBRepository'),
          disablePreviousFlow: false,
          onNextClick: GuideUtils.clickOnGuideElement('createGraphDBRepository')
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [REPOSITORIES_CREATE_DEFAULT_TITLE]: 'Create repository',
      [GRAPHDB_REPOSITORY_CONTENT]: 'Click on the <b>GraphDB Repository</b> button.'
    },
    fr: {
      [REPOSITORIES_CREATE_DEFAULT_TITLE]: 'Créer un dépôt',
      [GRAPHDB_REPOSITORY_CONTENT]: 'Cliquez sur le bouton <b>Dépôt GraphDB</b>.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
