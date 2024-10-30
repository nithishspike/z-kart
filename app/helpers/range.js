import Ember from 'ember';

export function range(params) {
  // console.log("range is working",params)
  let [start,end]=params;
  let array=[];
  for(let i=start;i<=end &&i<=5;i++)
  {
    array.push(i);
  }
  // console.log("array" ,array)
  return array;

}

export default Ember.Helper.helper(range);
