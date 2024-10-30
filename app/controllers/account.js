import Ember from 'ember';
import ajaxReq from '../utils/ajax-req';

export default Ember.Controller.extend({
    toast: Ember.inject.service(),
    isLoggedIn: Ember.computed.alias('dataStore.isLoggedIn'),
    isAdmin:Ember.computed.alias('dataStore.isAdmin'),
    isCurrentRoute:null,
    showOverlay:false,
    dataStore: Ember.inject.service('data-store'),
    init() {
        this._super(...arguments);
        this.updateCurrentRouteName(); 
        
    },

    updateCurrentRouteName() {
        const router = Ember.getOwner(this).lookup('router:main');
        this.set('isCurrentRoute', router.get('currentRouteName')=="account.orders" || router.get("currentRouteName")=="account.users");
        console.log("working ",this.get("isCurrentRoute"));
        
        router.on('didTransition', () => {
            console.log("account router is "+router.get('currentRouteName'));
            
          this.set('isCurrentRoute', router.get('currentRouteName')=="account.orders" || router.get("currentRouteName")=="account.users");
          console.log("working ",this.get("isCurrentRoute"));
        });
      },
    actions:{
        logout(){

        ajaxReq({
            endpoint:'auth/logout',
            method:'DELETE',
        })
        .then((response) => {
                console.log("Logout successful", response);
            })
        .catch((error) => {
            this.get('toast').showToast('Logout failed','Warning',"warning");
        })
        .then(() => {
            
            this.get('toast').showToast('Logout Successfull','success',"success");
            this.get("dataStore").set("isLoggedIn",false);
            this.get("dataStore").set("isAdmin",false);
            this.transitionToRoute("/");
        })
    },
    showModel(){
        this.set("showOverlay",true);
    }
}
});
