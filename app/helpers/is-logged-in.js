import Ember from 'ember';

export default Ember.Helper.extend({
  dataStore: Ember.inject.service('data-store'),

  compute([user]) {
    let dataStore = this.get('dataStore');
    console.log("data is not loaded so initailling");
    
    if (!dataStore.get('isDataLoaded')) {
      return dataStore.loadData().then(() => {
        return this.getUserStatus(user);
      });
    }
    return this.getUserStatus(user);
  },

  getUserStatus(user) {
    let dataStore = this.get('dataStore');
    
    if (user === "admin") {
      console.log("Admin check is ", dataStore.get('isAdmin'));
      return dataStore.get('isAdmin');  
    } else {
      console.log("Login check is ", dataStore.get('isLoggedIn'));
      return dataStore.get('isLoggedIn');  
    }
  }
});
