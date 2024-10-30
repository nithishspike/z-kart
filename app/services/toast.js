import Ember from 'ember';

export default Ember.Service.extend({
  isVisible: false,
  message: '',
  type: 'success',
  status:'',

  showToast(message, type ,status='success') {
    // console.log(message,type,status);
    
    this.set('message', message);
    this.set('type', type);
    this.set('isVisible', true);
    this.set('status',status);
    console.log(this.get("status"));
    
    // Automatically hide the toast after 5 seconds
    Ember.run.later(this, () => {
      
      this.set('isVisible', false);
    }, 3000);
  }
});
