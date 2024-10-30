import Ember from 'ember';

export default Ember.Route.extend({
  dataStore: Ember.inject.service('data-store'),

  model() {
    const dataStore = this.get('dataStore');
    // Load data only if it hasn't been loaded yet
    return dataStore.get('isDataLoaded') 
      ? Ember.RSVP.resolve() // Data is already loaded, return resolved promise
      : dataStore.loadData(); // Load data if not already loaded
  },

  afterModel() {
    const dataStore = this.get('dataStore');
    console.log(dataStore);
    console.log(dataStore.get('isLoggedIn'));
    
    if (dataStore.get('isLoggedIn')) {
      this.transitionTo('/');
    }
  },
});
