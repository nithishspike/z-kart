import Ember from 'ember';

export function splitLines([specification]) {
  console.log("specification is ",specification,specification.split("\\n"))
  return specification.split("\\n");
}
export default Ember.Helper.helper(splitLines);
