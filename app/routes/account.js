import Ember from 'ember';

export default Ember.Route.extend({
  dataStore: Ember.inject.service('data-store'),

  model() {
    const dataStore = this.get('dataStore');
    // Load data only if it hasn't been loaded yet
    console.log("reloading the data "+dataStore.get("isDataLoaded"));
    
    return dataStore.get('isDataLoaded') 
      ? Ember.RSVP.resolve() // Data is already loaded, return resolved promise
      : dataStore.loadData(); // Load data if not already loaded
  },

  afterModel() {
    const dataStore = this.get('dataStore');

    if (!dataStore.get('isLoggedIn')) {
      this.transitionTo('/');
    }
  },
});
