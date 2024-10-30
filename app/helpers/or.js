// app/helpers/or.js
import Ember from 'ember';

export function or([arg1, arg2]) {
  return arg1 || arg2;
}

export default Ember.Helper.helper(or);
