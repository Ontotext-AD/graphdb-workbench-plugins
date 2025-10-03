/**
 * @name ask-ttyg-agent
 * @memberof module:Interactive Guide
 *
 * @description
 * This is a complex step that may show a sequence of steps to guide the user through asking a question to a TTYG agent,
 * explaining the response, exploring SPARQL queries, and asking for more explanations. The difference between this and
 * the `ttyg-ask-question` step is that this step may include explanation and exploring SPARQL queries
 *
 * Ask an individual question<br>
 * <img src="resources/guides/ttyg/ttyg-ask-question.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * Wait for the response<br>
 * <img src="resources/guides/ttyg/ttyg-wait-for-response.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * Explain the response<br>
 * <img src="resources/guides/ttyg/ttyg-explain-response.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * Explore the SPARQL query<br>
 * <img src="resources/guides/ttyg/ttyg-ask-agent-explore-sparql.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * Ask for more explanation<br>
 * <img src="resources/guides/ttyg/ttyg-ask-explain-answer-more.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * The step can be configured using the common options defined in [Options](#.Options).
 *
 * @property {string} [options.question] - The question to be asked to the TTYG agent. This will be displayed in the instructions.
 * @property {boolean} [options.explain] - Whether to include the explanation step after asking the question.
 * @property {boolean} [options.explainMore] - Whether to include the step for asking more explanation after the explanation step.
 * @property {boolean} [options.exploreSparql] - Whether to include the step for exploring the SPARQL query after the explanation step.
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "ask-ttyg-agent",
 *  "options": {
 *    "question": "Count all the web pages published in 2020? Provide five sample names.",
 *    "explain": true,
 *    "explainMore": true,
 *    "exploreSparql": true
 *   }
 * }
 * ```
 */
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
