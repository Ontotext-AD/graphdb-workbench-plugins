const REPOSITORIES_CREATE_DEFAULT_TITLE = 'guide.step-action.create-repository';
const CREATE_REPO_BUTTON = 'guide.step_plugin.create_repository.create_repository_button.content';

/**
 * @name repositories-create-repository
 * @memberof module:Interactive Guide
 *
 * @description
 * This step explains how to create a repository.
 *
 * Create repository step<br>
 * <img src="resources/guides/repository/repositories-create-repository.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "repositories-create-repository"
 * }
 * ```
 */
const step = {
  guideBlockName: 'repositories-create-repository',
  getSteps: function(options, services) {
    const translate = services.translate;
    const GuideUtils = services.GuideUtils;
    return [
      {
        guideBlockName: 'clickable-element',
        options: {
          content: translate(this.translationBundle, CREATE_REPO_BUTTON),
          ...(options.title ?? {title: translate(this.translationBundle, REPOSITORIES_CREATE_DEFAULT_TITLE)}),
          class: 'create-repository',
          ...options,
          url: 'repository',
          elementSelector: GuideUtils.getGuideElementSelector('createRepository'),
          onNextClick: GuideUtils.clickOnGuideElement('createRepository')
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [REPOSITORIES_CREATE_DEFAULT_TITLE]: 'Create repository',
      [CREATE_REPO_BUTTON]: 'Click on the <b>Create new repository</b> button.'
    },
    fr: {
      [REPOSITORIES_CREATE_DEFAULT_TITLE]: 'Créer un dépôt',
      [CREATE_REPO_BUTTON]: 'Cliquez sur le bouton <b>Créer un nouveau dépôt</b>.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
