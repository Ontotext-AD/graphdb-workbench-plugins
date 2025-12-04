import * as Utils from '../utils.js';

const REPOSITORIES_CREATE_DEFAULT_TITLE = 'guide.step-action.create-repository';
const CHOOSE_REPOSITORY = 'guide.step_plugin.choose-repository.content';
const SELECT_REPOSITORY = 'guide.step_plugin.select-repository.content';
const SKIP_SECTION = 'skip-section';
const UNEXPECTED_ERROR_MESSAGE = 'guide.unexpected.error.message';

/**
 * @name select-repository-dropdown
 * @memberof module:Interactive Guide
 *
 * @description
 * Composite step, guiding the user to select a repository from the dropdown.
 * It prompts the user to click the dropdown button and select a repository from the list.
 *
 * Click on the dropdown button example<br>
 * <img src="resources/guides/repository/select-repository-dropdown.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * Select a repository from the dropdown example<br>
 * <img src="resources/guides/repository/select-repository-dropdown-2.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```JSON
 * {
 *   "guideBlockName": "select-repository-dropdown"
 * }
 * ```
 */
const step = {
  guideBlockName: 'select-repository-dropdown',
  getSteps: function(options, services) {
    const translate = services.translate;
    const GuideUtils = services.GuideUtils;
    options.mainAction = 'select-repository';
    let repositorySelectorElement;
    let mouseUpHandler;

    return [{
      guideBlockName: 'clickable-element',
      options: {
        skipPoint: true,
        skipButtonLabel: translate(this.translationBundle, SKIP_SECTION),
        content: translate(this.translationBundle, CHOOSE_REPOSITORY),
        elementSelector: '.onto-repository-selector',
        class: 'repositories-group-button',
        onNextClick: GuideUtils.clickOnElement('.onto-repository-selector .onto-dropdown-button'),
        ...options
      }
    }, {
      guideBlockName: 'clickable-element',
      options: {
        content: translate(this.translationBundle, SELECT_REPOSITORY, {repositoryId: options.repositoryId}),
        elementSelector: () => {
          return Utils.getRepositoryElementSelector(services, options);
        },
        class: 'repository-select-button',
        advanceOn: undefined,
        beforeShowPromise: () => services.GuideUtils.waitFor(Utils.getRepositoryElementSelector(services, options), 1)
          .then((element) => repositorySelectorElement = element)
          .catch((error) => {
            services.toastr.error(translate(this.translationBundle, UNEXPECTED_ERROR_MESSAGE));
            throw (error);
          }),
        show: (guide) => () => {
          Utils.setRepositorySelectorAutoClose(false);
          // Added listener to the element.
          if (repositorySelectorElement) {
            mouseUpHandler = () => guide.next();
            repositorySelectorElement.addEventListener('click', mouseUpHandler);
          }
        },
        onNextClick: () => {
          repositorySelectorElement.click();
        },
        hide: () => () => {
          Utils.setRepositorySelectorAutoClose(true);
          if (repositorySelectorElement) {
            repositorySelectorElement.removeEventListener('click', mouseUpHandler);
          }
        },
        canBePaused: false
      },
      ...options
    }
    ];
  },
  translationBundle: {
    en: {
      [REPOSITORIES_CREATE_DEFAULT_TITLE]: 'Create repository',
      [CHOOSE_REPOSITORY]: 'Click on the repository selection dropdown.',
      [SELECT_REPOSITORY]: 'Click on the <b>{{repositoryId}}</b> repository button.',
      [SKIP_SECTION]: 'Skip section',
      [UNEXPECTED_ERROR_MESSAGE]: 'The guide was cancelled due to an unexpected error. Please run the guide again and if the problem persists contact the support.'
    },
    fr: {
      [REPOSITORIES_CREATE_DEFAULT_TITLE]: 'Créer un dépôt',
      [CHOOSE_REPOSITORY]: 'Cliquez sur la liste déroulante de sélection du dépôt.',
      [SELECT_REPOSITORY]: 'Cliquez sur le bouton de dépôt <b>{{repositoryId}}</b>.',
      [SKIP_SECTION]: 'Sauter la section',
      [UNEXPECTED_ERROR_MESSAGE]: 'Le guide a été annulé en raison d\'une erreur inattendue. Veuillez exécuter à nouveau le guide et si le problème persiste, contactez le support.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
