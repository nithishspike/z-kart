import Ember from 'ember';
import ajaxReq from "../../utils/ajax-req";
export default Ember.Route.extend({
  model() {
    return ajaxReq({
      endpoint:'users',
    })
    .then((response) => {
      console.log("profile "+response);
      return response[0];
    }).catch((error) => {
      if(error.status===401){
        this.transitionTo("login");
        localStorage.setItem("isLoggedIn",false);
        localStorage.setItem("isAdmin",false);
      }
      else{
        console.error('Error fetching users:', error);
      }
    });
    // return Ember.$.ajax({
    //   url: 'http://localhost:8002/api/v1/users',
    //   type: 'GET',
    //   xhrFields: {
    //     withCredentials: true // Use this instead of 'credentials' for including cookies.
    //   }
    // }).then((response) => {
    //   console.log("profile "+response);
    //   return response[0];
    // }).catch((error) => {
    //   if(error.status===401){
    //     this.transitionTo("login");
    //     localStorage.setItem("isLoggedIn",false);
    //     localStorage.setItem("isAdmin",false);
    //   }
    //   else{
    //     console.error('Error fetching users:', error);
    //   }
    // });
  }
});
