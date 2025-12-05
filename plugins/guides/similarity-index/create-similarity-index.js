/**
 * @name create-similarity-index
 * @memberof module:Interactive Guide
 *
 * @description
 * Complex step, which includes all steps needed to create a similarity index.
 *
 * Similarity click link<br>
 * <img src="resources/guides/similarity-index/similarity-click-link.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * Similarity type index name<br>
 * <img src="resources/guides/similarity-index/similarity-type-index-name.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * Similarity click to create<br>
 * <img src="resources/guides/similarity-index/similarity-click-to-create.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * Similarity hold and wait until shown<br>
 * <img src="resources/guides/similarity-index/similarity-hold-and-wait-until-shown.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "create-similarity-index"
 * }
 * ```
 */
const step = {
  guideBlockName: 'create-similarity-index',
  getSteps: (options, services) => {
    const GuideUtils = services.GuideUtils;
    options.mainAction = 'create-similarity-index';

    return [
      {
        guideBlockName: 'click-main-menu',
        options: {
          menu: 'similarity',
          showIntro: true,
          ...options
        }
      },
      {
        guideBlockName: 'similarity-click-link', options: {...options}
      },
      {
        guideBlockName: 'similarity-type-index-name', options: {...options}
      },
      {
        guideBlockName: 'similarity-click-to-create', options: {...options}
      },
      {
        // check if error block is shown and go back 2 steps or proceed
        guideBlockName: 'info-message',
        options: {
          beforeShowPromise: (guide, currentStep) => GuideUtils.getOrWaitFor(GuideUtils.getGuideElementSelector('error'), 1)
            .then(() => {
              const stepId = currentStep.id;
              // Using a timeout
              // because the library executes logic
              // to show the step in a then clause
              // which causes current and next steps to show
              setTimeout(() => guide.show(stepId - 2));
            })
            .catch(() => {
              // Using a timeout
              // because the library executes logic
              // to show the step in a then clause
              // which causes current and next steps to show
              setTimeout(() => guide.next());
            }),
          ...options
        }
      },
      {
        guideBlockName: 'similarity-hold-and-wait-until-shown', options: {...options}
      }
    ];
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
