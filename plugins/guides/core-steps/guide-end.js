import {BASIC_STEP} from '../config.js';

const GUIDE_END_TITLE = 'guide.step_plugin.guide-ended.title';
const GUIDE_END_CONTENT = 'guide.step_plugin.guide-ended.content';
/**
 * @name guide-end
 * @memberof module:Interactive Guide
 *
 * @description
 * Final step indicating the guide has ended.
 *
 * Final step example<br>
 * <img src="resources/guides/core/guide-end.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options). Additionally, it supports:
 *
 * @property {string} [options.title] - A custom title for the final step.
 * @property {string} [options.content] - A custom content/message for the final step.
 *
 * @example
 * ```JSON
 * {
 *   "guideBlockName": "guide-end",
 *   "options": {
 *     "title": "All done!",
 *     "content": "You have completed the guide."
 *   }
 * }
 * ```
 */
const step = {
  guideBlockName: 'guide-end',
  getStep: function(options, pluginService) {
    const translate = pluginService.translate;
    const notOverridable = {
      type: 'readonly',
      title: options.title || translate(this.translationBundle, GUIDE_END_TITLE),
      content: options.content || translate(this.translationBundle, GUIDE_END_CONTENT),
      lastStep: true
    };
    return {
      ...BASIC_STEP,
      initPreviousStep: pluginService.GuideUtils.defaultInitPreviousStep,
      ...options,
      ...notOverridable
    };
  },
  translationBundle: {
    en: {
      [GUIDE_END_TITLE]: 'End of guide',
      [GUIDE_END_CONTENT]: 'This guide has ended.'
    },
    fr: {
      [GUIDE_END_TITLE]: 'Fin du guide',
      [GUIDE_END_CONTENT]: 'Ce guide est terminé.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
