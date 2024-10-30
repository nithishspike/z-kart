import Ember from 'ember';

export default Ember.Controller.extend({
    currentRouteName: null, // Initialize the property

  init() {
    this._super(...arguments);
    this.updateCurrentRouteName(); 
    
  },

  updateCurrentRouteName() {
    const router = Ember.getOwner(this).lookup('router:main');
    this.set('currentRouteName', router.get('currentRouteName'));
    // Add an observer for route changes
    router.on('didTransition', () => {
      this.set('currentRouteName', router.get('currentRouteName'));
    });
  },

  actions: {
    click() {
      console.log('Current route:', this.get('currentRouteName'));
    }
  }
});