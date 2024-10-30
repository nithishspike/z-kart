import Ember from 'ember';
import RSVP from 'rsvp';
import ajaxReq from '../utils/ajax-req';

export default Ember.Route.extend({
    dataStore: Ember.inject.service('data-store'),
    model() {
        return RSVP.hash({
            userDetails:ajaxReq({
                endpoint:'users'
            }),
            cartItems:ajaxReq({
                endpoint:'cart'
            }),
            Discounts:ajaxReq({
                endpoint:'discount'
            })
        }).then((responses) => {
            console.log(responses);
            console.log(responses.userDetails[0]);
            console.log(responses.Discounts);
            let userDetails = responses.userDetails[0]; 
            let cartItems = responses.cartItems; 
            
            
            return {
                UserDetails: userDetails,
                cartItems: cartItems,
                Discounts: responses.Discounts
            };
        }).catch((error) => {
            if (error.status === 401) {
                this.transitionTo('login'); 
                this.get('dataStore').set("isLoggedIn",false);
                this.get('dataStore').set("isAdmin",false);
            } else {
                console.error('Error fetching data:', error);
            }
        });
    }
});
