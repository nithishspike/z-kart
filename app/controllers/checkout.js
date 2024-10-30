import Ember from 'ember';

export default Ember.Controller.extend({
    currentRouteName: null, // Initialize the property

    init() {
      this._super(...arguments);
      this.updateCurrentRouteName(); // Set the initial route name
      console.log("chekout page");
      
    },
    updateCurrentRouteName() {
      const router = Ember.getOwner(this).lookup('router:main');
      this.set('currentRouteName', router.get('currentRouteName'));
      // Add an observer for route changes
      router.on('didTransition', () => {
        this.set('currentRouteName', router.get('currentRouteName'));
        console.log('Current route:', this.get('currentRouteName'));
      });
    },
    actions: {
        view() {
            // Use this.get to access model properties
            console.log("user ", this.get('model.UserDetails'),this.get("model"));
            console.log("cart ", this.get('model.cartItems'));
        }
    }
});
