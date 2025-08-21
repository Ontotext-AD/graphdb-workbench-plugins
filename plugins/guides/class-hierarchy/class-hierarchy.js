const step = {
  guideBlockName: 'class-hierarchy',
  getSteps: (options, services) => {
    const GuideUtils = services.GuideUtils;
    options.mainAction = 'class-hierarchy';

    const steps = [
      {
        guideBlockName: 'click-main-menu',
        options: angular.extend({}, {
          menu: 'class-hierarchy',
          showIntro: true
        }, options)
      }, {
        guideBlockName: 'class-hierarchy-intro',
        options: {...options}
      }
    ];

    if (options.introExtraContent) {
      steps.push({
        guideBlockName: 'class-hierarchy-dataset-intro',
        options: {
          content: options.introExtraContent,
          ...options
        }
      });
    }

    if (Array.isArray(options.zoomIris)) {
      options.zoomIris.forEach((zoomIri) => {
        steps.push({
          guideBlockName: 'class-hierarchy-zoom-class',
          options: {
            iri: zoomIri.iri,
            ...options
          }
        });
        if (zoomIri.postExtraContent) {
          steps.push({
            guideBlockName: 'class-hierarchy-explain-class',
            options: {
              content: zoomIri.postExtraContent,
              beforeShowPromise: GuideUtils.deferredShow(800),
              iri: zoomIri.iri,
              ...options
            }
          });
        }
      });
    }

    return steps;
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
