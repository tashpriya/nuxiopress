import { configure, extend } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';

const config = {
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid'
  },
  bails: true,
  skipOptional: true,
  mode: 'aggressive',
  useConstraintAttrs: true
};

// Sets the options.
configure(config);

Object.keys(rules).forEach(rule => {
  extend(rule, {
    ...rules[rule] // copies rule configuration
  });
});
