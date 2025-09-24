// eslint-disable-next-line no-unused-vars
import {Options} from '../options.js';

/**
 * @name welcome
 * @memberof module:Interactive Guide
 *
 * @description
 * The Welcome step produces two steps:
 *
 * - The first step onboards users on how to interact with the guide dialogs. It explains the basic concepts, provides hints,
 * and describes the overall purpose of the guide.<br>
 *   <img src="resources/guides/welcome/welcome_1.png" style="height:200px; border: solid; border-width:1px"/>
 *
 * - The second step shows the description for the specific guide being run. The content is passed through the option
 * `translatedGuideDescription`.<br>
 *   <img src="resources/guides/welcome/welcome_2.png" style="height:200px; border: solid; border-width:1px"/>
 *
 * The Welcome step can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```JSON
 * {
 *   "guideBlockName": "welcome"
 * }
 * ```
 *
 */
const step = {
  guideBlockName: 'welcome',
  /**
   *
   * @param {Options} options - Options object containing settings and parameters for the step.
   * @param {PluginServiceInterface} pluginService - The plugin service used to interact with the application (e.g., translations).
   */
  getSteps: function(options, pluginService) {
    const translate = pluginService.translate;
    const title = translate(this.translationBundle, 'guide.step_plugin.welcome.title', {translatedGuideName: options.translatedGuideName});
    const infoIconHint = translate(this.translationBundle, 'guide.step_plugin.welcome.info-icon-hint');
    const mouseIconHint = translate(this.translationBundle, 'guide.step_plugin.welcome.mouse-icon-hint');
    const inputIconHint = translate(this.translationBundle, 'guide.step_plugin.welcome.input-icon-hint');

    return [
      {
        guideBlockName: 'info-message',
        options: {
          title,
          content: translate(this.translationBundle, 'guide.step_plugin.welcome.content', {
            infoIconHint,
            mouseIconHint,
            inputIconHint
          })
        }
      },
      {
        guideBlockName: 'info-message',
        options: {
          title,
          content: translate(this.translationBundle, 'guide.step_plugin.welcome-what.content', {translatedGuideDescription: options.translatedGuideDescription})
        }
      }
    ];
  },
  // TODO: The translations contains icon that belong to the client application, this should be handled differently via plugin service.
  translationBundle: {
    en: {
      'guide.step_plugin.welcome.title': 'Welcome to {{translatedGuideName}}',
      'guide.step_plugin.welcome.content': 'Throughout the guide you will see boxes like this one that will provide instructions on what to do.<p>The icon in the top left corner is a hint too:<ul><li>{{infoIconHint}}</li><li>{{mouseIconHint}}</li><li>{{inputIconHint}}</li></ul></p>',
      'guide.step_plugin.welcome.info-icon-hint': '<span class="icon icon-1-5x icon-info"></span> means the box provides information.',
      'guide.step_plugin.welcome.mouse-icon-hint': '<span class="icon icon-1-5x icon-focus"></span> asks you to do something with the mouse.',
      'guide.step_plugin.welcome.input-icon-hint': '<span class="icon icon-1-5x icon-edit"></span> tells you to type or paste something.',
      'guide.step_plugin.welcome-what.content': '{{translatedGuideDescription}}<p>Let\'s get started for real now!</p>'
    },
    fr: {
      'guide.step_plugin.welcome.title': 'Bienvenue dans {{translatedGuideName}}',
      'guide.step_plugin.welcome.content': 'Tout au long du guide, vous verrez des boîtes comme celle-ci qui fourniront des instructions sur ce qu\'il faut faire.<p>L\'icône dans le coin supérieur gauche est également un indice :<ul><li>{{infoIconHint}}</li><li>{{mouseIconHint}}</li><li>{{inputIconHint}}</li></ul></p>',
      'guide.step_plugin.welcome.info-icon-hint': '<span class="icon icon-1-5x icon-info"></span> signifie que la boîte fournit des informations.',
      'guide.step_plugin.welcome.mouse-icon-hint': '<span class="icon icon-1-5x icon-focus"></span> vous demande de faire quelque chose avec la souris.',
      'guide.step_plugin.welcome.input-icon-hint': '<span class="icon icon-1-5x icon-edit"></span> vous dit de taper ou de coller quelque chose.',
      'guide.step_plugin.welcome-what.content': '{{translatedGuideDescription}}<p>Commençons pour de vrai maintenant !</p>'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
