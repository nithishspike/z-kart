import Ember from 'ember';

export default Ember.Component.extend({
  passwordVisible: false, // default to password being hidden
  
  actions: {
    toggleVisibility() {
      this.toggleProperty('passwordVisible'); // toggle the password visibility
    }
  }
});
