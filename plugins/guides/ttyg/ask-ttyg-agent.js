const step = {
  guideBlockName: 'ask-ttyg-agent',
  getSteps: (options) => {
    options.mainAction = 'ask-ttyg-agent';
    options.maxWaitTime = 10;
    options.forceReload = false;

    const explain = options.explain;
    const explainMore = options.explainMore;
    const exploreSparql = options.exploreSparql;

    const steps = [
      {
        guideBlockName: 'ttyg-ask-question', options: {...options, skipPoint: true}
      }
    ];

    if (explain) {
      steps.push(
        {
          guideBlockName: 'ttyg-explain-response', options: {...options}
        }
      );
    }

    if (explain && exploreSparql) {
      steps.push(
        {
          guideBlockName: 'ttyg-ask-agent-explore-sparql', options: {...options}
        }
      );
    }

    if (explain && explainMore) {
      steps.push(
        {
          guideBlockName: 'ttyg-ask-explain-answer-more', options: {...options}
        }
      );
    }

    return steps;
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
