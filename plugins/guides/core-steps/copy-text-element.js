import * as Utils from '../utils.js';

const step = {
  guideBlockName: 'copy-text-element',
  getSteps: (options, services) => {
    const $translate = services.$translate;
    const GuideUtils = services.GuideUtils;

    const text = options.text;
    const code = document.createElement('code');
    code.innerText = text;

    const copy = document.createElement('button');
    const copyToInputQueryButtonClass = 'guide-copy-to-input-query-button';
    copy.className = `btn btn-sm btn-secondary ${copyToInputQueryButtonClass}`;
    copy.innerText = $translate.instant('guide.step_plugin.core-steps.copy-text-element.copy-to-input');


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
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
