import Ember from 'ember';

export default Ember.Component.extend({
  passwordVisible: false,
  label:'',
  inputType: 'text', 
  tag:'input',
  inputId: '',
  placeholder: '',
  value: '',
  error: '',
  required: false,
  forLabel:'',
  labelClass:'',
  inputClass:'',
  actions: {
    toggleVisibility() {
      this.toggleProperty('passwordVisible'); 
    }
  }
});
