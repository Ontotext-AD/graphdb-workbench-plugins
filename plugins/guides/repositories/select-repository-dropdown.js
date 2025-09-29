import * as Utils from '../utils.js';
import {SKIP_SECTION} from '../utils.js';

const step = {
  guideBlockName: 'select-repository-dropdown',
  getSteps: (options, services) => {
    const GuideUtils = services.GuideUtils;
    options.mainAction = 'select-repository';
    options.getRepositoryId = () => Utils.getRepositoryName(services, options);
    let repositorySelectorElement;
    let mouseUpHandler;

    return [{
      guideBlockName: 'clickable-element',
      options: {
        skipPoint: true,
        skipButtonLabel: SKIP_SECTION,
        content: 'guide.step_plugin.choose-repository.content',
        elementSelector: '.onto-repository-selector',
        class: 'repositories-group-button',
        onNextClick: GuideUtils.clickOnElement('.onto-repository-selector .onto-dropdown-button'),
        ...options
      }
    }, {
      guideBlockName: 'clickable-element',
      options: angular.extend({}, {
        content: 'guide.step_plugin.select-repository.content',
        elementSelector: () => {
          return Utils.getRepositoryElementSelector(services, options);
        },
        class: 'repository-select-button',
        advanceOn: undefined,
        beforeShowPromise: () => services.GuideUtils.waitFor(Utils.getRepositoryElementSelector(services, options), 1)
          .then((element) => repositorySelectorElement = element)
          .catch((error) => {
            services.toastr.error(services.$translate.instant('guide.unexpected.error.message'));
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
      }, options)
    }
    ];
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
