import Ember from 'ember';

export function timeConverter(millis) {
  var date = new Date(millis * 1000); 

    
    var day = String(date.getDate()).padStart(2, '0'); // Ensure 2 digits for day
    var month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed, add 1
    var year = date.getFullYear();

    // Return the formatted date as dd/mm/yyyy
    return `${day}/${month}/${year}`;

}

export default Ember.Helper.helper(timeConverter);
