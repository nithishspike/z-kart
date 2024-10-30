import Ember from 'ember';

export function calculateDiscountPrice([price,discount]) {
  console.log("offer price is",price*(1-discount/100));
  
  return (price*(1-discount/100)).toFixed(2);
}
export default Ember.Helper.helper(calculateDiscountPrice);
