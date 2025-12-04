const REPOSITORIES_CREATE_DEFAULT_TITLE = 'guide.step-action.create-repository';
const REPOSITORY_ID_CONTENT = 'guide.step_plugin.create_repository.repository_id.content';

/**
 * @name repositories-id-input
 * @memberof module:Interactive Guide
 *
 * @description
 * This step guides the user to enter a repository ID.
 *
 * Repository ID input step<br>
 * <img src="resources/guides/repository/repositories-id-input.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options). Takes repositoryId from
 * repositoryIdBase + index if needed
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "repositories-id-input"
 * }
 * ```
 */
const step = {
  guideBlockName: 'repositories-id-input',
  getSteps: function(options, services) {
    const translate = services.translate;
    const GuideUtils = services.GuideUtils;
    const repositoryIdInputSelector = GuideUtils.getGuideElementSelector('graphDBRepositoryIdInput');
    return [
      {
        guideBlockName: 'input-element',
        options: {
          content: translate(this.translationBundle, REPOSITORY_ID_CONTENT, {repositoryId: options.repositoryId}),
          ...(options.title ?? {title: translate(this.translationBundle, REPOSITORIES_CREATE_DEFAULT_TITLE)}),
          class: 'gdb-repository-id-input',
          ...options,
          url: 'repository/create/graphdb',
          elementSelector: repositoryIdInputSelector,
          disablePreviousFlow: false,
          onNextValidate: () =>
            Promise.resolve(
              GuideUtils.validateTextInput(
                repositoryIdInputSelector,
                options.repositoryId
              )
            )
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [REPOSITORIES_CREATE_DEFAULT_TITLE]: 'Create repository',
      [REPOSITORY_ID_CONTENT]: 'Enter repository ID: <b>{{repositoryId}}.</b>'
    },
    fr: {
      [REPOSITORIES_CREATE_DEFAULT_TITLE]: 'Créer un dépôt',
      [REPOSITORY_ID_CONTENT]: 'Entrez l\'ID du dépôt : <b>{{repositoryId}}.</b>'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
