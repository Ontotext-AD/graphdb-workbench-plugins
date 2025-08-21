import {BASIC_STEP} from '../config.js';

const step = {
  guideBlockName: 'guide-end',
  getStep: (options, services) => {
    const notOverridable = {
      type: 'readonly',
      title: options.title || 'guide.step_plugin.guide-ended.title',
      content: options.content || 'guide.step_plugin.guide-ended.content',
      lastStep: true
    };
    return angular.extend({}, BASIC_STEP, {
      initPreviousStep: services.GuideUtils.defaultInitPreviousStep
    }, options, notOverridable);
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
