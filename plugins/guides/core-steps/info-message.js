import {BASIC_STEP} from '../config.js';

const step = {
  guideBlockName: 'info-message',
  getStep: (options, services) => {
    const notOverridable = {
      type: 'readonly'
    };
    return angular.extend({}, BASIC_STEP, {
      initPreviousStep: services.GuideUtils.defaultInitPreviousStep
    }, options, notOverridable);
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
