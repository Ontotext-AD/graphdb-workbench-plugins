import {BASIC_STEP} from '../config.js';

const step = {
  guideBlockName: 'hold-and-wait-until-shown',
  getStep: (options, services) => {
    const notOverridable = {
      type: 'readonly'
    };
    return angular.extend({}, BASIC_STEP, {
      initPreviousStep: services.GuideUtils.defaultInitPreviousStep,
      onNextValidate: () => Promise.resolve(services.GuideUtils.isVisible(options.elementSelectorToWait))
    }, options, notOverridable);
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
