const REPOSITORIES_CREATE_DEFAULT_TITLE = 'guide.step-action.create-repository';
const SAVE_BUTTON = 'guide.step_plugin.create_repository.save_button.content';

/**
 * @name repositories-save
 * @memberof module:Interactive Guide
 *
 * @description
 * This step guides the user to save the repository creation.
 *
 * Save repository step<br>
 * <img src="resources/guides/repository/repositories-save.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "repositories-save"
 * }
 * ```
 */
const step = {
  guideBlockName: 'repositories-save',
  getSteps: function(options, services) {
    const translate = services.translate;
    const GuideUtils = services.GuideUtils;
    const repositoryIdInputSelector = GuideUtils.getGuideElementSelector('graphDBRepositoryIdInput');
    return [
      {
        guideBlockName: 'clickable-element',
        options: {
          content: translate(this.translationBundle, SAVE_BUTTON),
          title: translate(this.translationBundle, REPOSITORIES_CREATE_DEFAULT_TITLE),
          class: 'create-repository-button',
          ...options,
          url: 'repository/create/graphdb',
          elementSelector: GuideUtils.getGuideElementSelector('graphDBRepositoryCrateButton'),
          disablePreviousFlow: false,
          show: () => () => {
            GuideUtils.validateTextInput(repositoryIdInputSelector, options.repositoryId);
          },
          onNextClick: GuideUtils.clickOnGuideElement('graphDBRepositoryCrateButton')
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [REPOSITORIES_CREATE_DEFAULT_TITLE]: 'Create repository',
      [SAVE_BUTTON]: 'Click on the <b>Create</b> button.'
    },
    fr: {
      [REPOSITORIES_CREATE_DEFAULT_TITLE]: 'Créer un dépôt',
      [SAVE_BUTTON]: 'Cliquez sur le bouton <b>Créer</b>.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
