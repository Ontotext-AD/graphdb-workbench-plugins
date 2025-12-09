const REPOSITORIES_CREATE_DEFAULT_TITLE = 'guide.step-action.create-repository';

/**
 * @name create-repository
 * @memberof module:Interactive Guide
 *
 * @description
 * Complex step, guiding the user through the creation of a new repository.
 * The step consists of the following steps:
 *
 * Click on the "Create repository" button.<br>
 * <img src="resources/guides/repository/repositories-create-repository.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * Create GraphDB repository.<br>
 * <img src="resources/guides/repository/repositories-create-graphdb.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * Enter a repository ID.<br>
 * <img src="resources/guides/repository/repositories-id-input.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * (Optional) Select a ruleset.<br>
 * <img src="resources/guides/repository/repositories-ruleset-dropdown.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * (Optional) Enable full-text search.<br>
 * <img src="resources/guides/repository/repositories-enable-fts.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * Save the repository.<br>
 * <img src="resources/guides/repository/repositories-save.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options). Additionally, it supports the following options:
 * @property {string} [rulesetName] - If this option is present, a dropdown will be displayed to select a ruleset.
 * @property {boolean} [fts] - If this option is present, a checkbox will be displayed to enable full-text search.
 *
 * @example
 * ```JSON
 * {
 *   "guideBlockName": "create-repository",
 *   "options": {
 *     "rulesetName": "my-ruleset",
 *     "fts": true
 *   }
 * }
 */
const step = {
  guideBlockName: 'create-repository',
  getSteps: function(options, pluginService) {
    const translate = pluginService.translate;
    options.mainAction = 'create-repository';
    options.title = options.title ?? translate(this.translationBundle, REPOSITORIES_CREATE_DEFAULT_TITLE);

    const steps = [
      {
        guideBlockName: 'click-main-menu',
        options: {
          menu: 'repositories',
          showIntro: true,
          ...options
        }
      },
      {guideBlockName: 'repositories-create-repository', options: {...options}},
      {guideBlockName: 'repositories-create-graphdb', options: {...options}},
      {guideBlockName: 'repositories-id-input', options: {...options}}
    ];

    if (options.rulesetName) {
      steps.push({guideBlockName: 'repositories-ruleset-dropdown', options: {...options}});
    }
    if (options.fts) {
      steps.push({guideBlockName: 'repositories-enable-fts', options: {...options}});
    }

    steps.push({guideBlockName: 'repositories-save', options: {...options}});

    return steps;
  },
  translationBundle: {
    en: {
      [REPOSITORIES_CREATE_DEFAULT_TITLE]: 'Create repository'
    },
    fr: {
      [REPOSITORIES_CREATE_DEFAULT_TITLE]: 'Créer un dépôt'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
