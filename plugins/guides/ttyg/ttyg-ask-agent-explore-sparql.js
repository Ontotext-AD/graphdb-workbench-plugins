import * as Utils from '../utils.js';

const step = {
  guideBlockName: 'ttyg-ask-agent-explore-sparql',
  getSteps: (options, services) => {
    const GuideUtils = services.GuideUtils;
    const exploreSparqlBtnSelector = GuideUtils.getLastGuideElementSelector('open-in-sparql-editor-btn');
    const elementSelector = GuideUtils.getLastGuideElementSelector('chat-item', exploreSparqlBtnSelector);

    return [
      {
        // If button is not visible for some reason, skip the whole step
        guideBlockName: 'info-message',
        options: angular.extend({}, {
          url: 'ttyg',
          beforeShowPromise: (guide, currentStep) => GuideUtils.waitFor(elementSelector, 1)
            .then(() => {
              // Using a timeout because the library executes logic to show the step in a then clause which causes current and next steps to show
              setTimeout(() => guide.next());
            })
            .catch(() => {
              const stepId = currentStep.id;
              // Using a timeout because the library executes logic to show the step in a then clause which causes current and next steps to show
              setTimeout(() => guide.show(stepId + 2));
            })
        }, options)
      },
      {
        guideBlockName: 'clickable-element',
        options: {
          content: 'guide.step_plugin.ask-ttyg-agent.explore-sparql',
          class: 'explore-sparql',
          // If mainAction is set the title will be set automatically
          ...(options.mainAction ? {} : {title: Utils.TTYG_ASK_DEFAULT_TITLE}),
          disableNextFlow: true,
          ...options,
          url: 'ttyg',
          elementSelector
        }
      }
    ];
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
