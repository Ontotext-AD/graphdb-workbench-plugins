import * as Utils from '../utils.js';

const COPY_TEXT = 'guide.step_plugin.core-steps.copy-text-element.copy-to-input';

/**
 * @name copy-text-element
 * @memberof module:Interactive Guide
 *
 * @description
 * Step that shows an input-like step with a code block containing provided text and a button to copy that
 * text into a target input (specified by `options.elementSelector`). It internally uses `input-element` to render the
 * step and manages attaching/removing the copy click listener when the step is shown/hidden.
 *
 * Copy text element example<br>
 * <img src="resources/guides/core/copy-text-element.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options). Additionally, it supports:
 *
 * @property {string} options.text - The text content to display and copy into the target input.
 * @property {string} options.elementSelector - CSS selector of the target input where text will be inserted on copy.
 *
 * @example
 * ```JSON
 * {
 *   "guideBlockName": "copy-text-element",
 *   "options": {
 *     "elementSelector": "#query-input",
 *     "text": "SELECT * WHERE { ?s ?p ?o }"
 *   }
 * }
 * ```
 */
const step = {
  guideBlockName: 'copy-text-element',
  getSteps: function(options, pluginService) {
    const translate = pluginService.translate;
    const GuideUtils = pluginService.GuideUtils;

    const text = options.text;
    const code = document.createElement('code');
    code.innerText = text;

    const copy = document.createElement('button');
    const copyToInputQueryButtonClass = 'guide-copy-to-input-query-button';
    copy.className = `btn btn-sm btn-secondary ${copyToInputQueryButtonClass}`;
    copy.innerText = translate(this.translationBundle, COPY_TEXT);

    let stepHTMLElement;
    const copyToInputListener = Utils.createCopyToInputListener(GuideUtils.getElementSelector(options.elementSelector), text);

    return [
      {
        guideBlockName: 'input-element',
        options: {
          ...options,
          content: 'guide.step_plugin.core-steps.copy-text-element.content',
          textAsHtmlCodeElement: '<div class="shepherd-code">' + code.outerHTML + copy.outerHTML + '</div>',
          show: (guide) => () => {
            stepHTMLElement = guide.currentStep.el.querySelector(`.${copyToInputQueryButtonClass}`);
            stepHTMLElement.addEventListener('click', copyToInputListener);
          },
          hide: () => () => {
            if (stepHTMLElement) {
              stepHTMLElement.removeEventListener('click', copyToInputListener);
            }
          }
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [COPY_TEXT]: 'Copy to input'
    },
    fr: {
      [COPY_TEXT]: 'Copier dans la saisie'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
