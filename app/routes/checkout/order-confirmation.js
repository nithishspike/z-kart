import Ember from 'ember';
export default Ember.Route.extend({
    DataStore:Ember.inject.service(),
    queryParams: {
        coupon: {
          refreshModel: true  
        }
      },
      model(){
          if(!this.get("DataStore.isOrderConfirm")){
            this.transitionTo("/");
          }
      },
      afterModel(model, transition) {
        this.get("DataStore").set("isOrderConfirm",false);
      },
});
