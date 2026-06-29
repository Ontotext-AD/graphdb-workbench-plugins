const REPOSITORIES_CREATE_DEFAULT_TITLE = 'guide.step-action.create-repository';
const DROPDOWN_CONTENT = 'guide.step_plugin.create_repository.ruleset_dropdown.content';

/**
 * @name repositories-ruleset-dropdown
 * @memberof module:Interactive Guide
 *
 * @description
 * This step guides the user to select a ruleset for a repository.
 *
 * Ruleset dropdown step<br>
 * <img src="resources/guides/repository/repositories-ruleset-dropdown.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options). Additionally, it requires:
 * @property {string} rulesetName - The name of the ruleset to be selected.
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "repositories-ruleset-dropdown",
 *  "options": {
 *    "rulesetName": "OWL2-RL"
 *  }
 * }
 * ```
 */
const step = {
  guideBlockName: 'repositories-ruleset-dropdown',
  getSteps: function(options, services) {
    const translate = services.translate;
    const GuideUtils = services.GuideUtils;
    const repositoryIdInputSelector = GuideUtils.getGuideElementSelector('graphDBRepositoryIdInput');
    return [
      {
        guideBlockName: 'clickable-element',
        options: {
          content: translate(this.translationBundle, DROPDOWN_CONTENT, {rulesetName: options.rulesetName}),
          title: translate(this.translationBundle, REPOSITORIES_CREATE_DEFAULT_TITLE),
          class: 'gdb-repository-ruleset-select',
          ...options,
          url: 'repository/create/graphdb',
          elementSelector: GuideUtils.getGuideElementSelector('graphDBRepositoryRulesetSelect'),
          disablePreviousFlow: false,
          show: () => () => {
            GuideUtils.validateTextInput(repositoryIdInputSelector, options.repositoryId);
          }
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [REPOSITORIES_CREATE_DEFAULT_TITLE]: 'Create repository',
      [DROPDOWN_CONTENT]: 'Choose ruleset: <b>{{rulesetName}}</b>.'
    },
    fr: {
      [REPOSITORIES_CREATE_DEFAULT_TITLE]: 'Créer un dépôt',
      [DROPDOWN_CONTENT]: 'Choisissez l\'ensemble de règles : <b>{{rulesetName}}</b>.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
