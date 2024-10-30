import Ember from 'ember';

export function joinString(params) {
  return params.join('');
}

export default Ember.Helper.helper(joinString);
