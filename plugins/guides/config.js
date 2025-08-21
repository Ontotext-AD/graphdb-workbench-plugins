export const BASIC_STEP = {
  title: '',
  content: '',
  elementSelector: undefined,
  placement: 'bottom',
  url: undefined,
  type: 'read-only-element',
  maxWaitTime: 3,
  canBePaused: true,
  onNextClick: undefined,
  disablePreviousFlow: true,
  onNextValidate: () => Promise.resolve(true),
  onPreviousClick: undefined,
  skipPoint: false,
  class: ''
};
