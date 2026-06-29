import * as Utils from '../utils.js';

const REPOSITORIES_DEFAULT_TITLE = 'guide.step_plugin.repositories.default-title';
const SELECT_REPO_CONTENT = 'guide.step_plugin.repositories.select-repository.content';

/**
 * @name repositories-select-repository
 * @memberof module:Interactive Guide
 *
 * @description
 * This step guides the user to connect to a repository.
 *
 * Connect to a repository<br>
 * <img src="resources/guides/repository/repositories-select-repository.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options). Additionally, it supports:
 * @property {string} repositoryIdToSelect - The id of the repository to connect to.
 *
 * @example
 * ```JSON
 * {
 *   "guideBlockName": "repositories-select-repository",
 *   "options": {
 *     "repositoryIdToSelect": "my-repo"
 *   }
 * }
 * ```
 */
const step = {
  guideBlockName: 'repositories-select-repository',
  getSteps: function(options, services) {
    const translate = services.translate;
    const GuideUtils = services.GuideUtils;
    const repositoryId = options.repositoryIdToSelect ?? Utils.getRepositoryName(services, options);
    const selectRepositoryRowSelector = GuideUtils.getGuideElementSelector(`repository-${repositoryId}`);
    const selectRepositoryButtonWrapperSelector = `${selectRepositoryRowSelector} ${GuideUtils.getGuideElementSelector('select-repository-button-wrapper')}`;
    const selectRepositoryButtonSelector = `${selectRepositoryButtonWrapperSelector} ${GuideUtils.getGuideElementSelector('select-repository-button')}`;
    return [
      {
        guideBlockName: 'clickable-element',
        options: {
          content: translate(this.translationBundle, SELECT_REPO_CONTENT),
          title: translate(this.translationBundle, REPOSITORIES_DEFAULT_TITLE),
          url: 'repository',
          elementSelector: selectRepositoryButtonWrapperSelector,
          class: 'repositories-select-repository',
          onNextClick: () => GuideUtils.clickOnElement(selectRepositoryButtonSelector)(),
          ...options
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [REPOSITORIES_DEFAULT_TITLE]: 'Repositories',
      [SELECT_REPO_CONTENT]: 'Click the connect repository icon.'
    },
    fr: {
      [REPOSITORIES_DEFAULT_TITLE]: 'Dépôts',
      [SELECT_REPO_CONTENT]: 'Cliquez sur l’icône de connexion au dépôt.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
