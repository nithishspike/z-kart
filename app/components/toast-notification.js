import Ember from 'ember';

export default Ember.Component.extend({
    toast: Ember.inject.service(),

  activateToast: Ember.computed.alias('toast.isVisible'),
  message: Ember.computed.alias('toast.message'),
  type: Ember.computed.alias('toast.type'),
  status: Ember.computed.alias('toast.status'),

  actions: {
    closeToast() {
      this.get('toast').set('isVisible', false);
    }
  }
});
