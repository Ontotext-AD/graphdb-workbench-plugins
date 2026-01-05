const RDF_RANK_TITLE = 'view.rdf.rank.title';
const COMPUTE_FILL = 'guide.step_plugin.rdf-rank-compute-fill.content';

/**
 * @name rdf-rank-compute-fill
 * @memberof module:Interactive Guide
 *
 * @description
 * This step prompts the user to click on the "Compute Full" button to start the RDF Rank computation.
 *
 * Click Compute Full<br>
 * <img src="resources/guides/rdf-rank/rdf-rank-compute-fill.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "rdf-rank-compute-fill"
 * }
 * ```
 */
const step = {
  guideBlockName: 'rdf-rank-compute-fill',
  getSteps: function(options, services) {
    const translate = services.translate;
    const GuideUtils = services.GuideUtils;
    const computeRDFRankButtonSelector = GuideUtils.getGuideElementSelector('compute-rdf-rank-btn');
    return [
      {
        guideBlockName: 'clickable-element',
        options: {
          url: 'rdfrank',
          content: translate(this.translationBundle, COMPUTE_FILL),
          elementSelector: computeRDFRankButtonSelector,
          ...(options.title ?? {title: translate(this.translationBundle, RDF_RANK_TITLE)}),
          onNextClick: computeRDFRankButtonSelector,
          ...options
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [RDF_RANK_TITLE]: 'RDF Rank',
      [COMPUTE_FILL]: 'Click on <b>Compute Full</b> to start the RDF Rank computation.'
    },
    fr: {
      [RDF_RANK_TITLE]: 'Rang RDF',
      [COMPUTE_FILL]: 'Cliquez sur <b>Calculer tout</b> pour lancer le calcul du RDF Rank.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
