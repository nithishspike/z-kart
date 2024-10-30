import Ember from 'ember';
import $ from "jquery";
import encryptData from '../utils/encrypt-data';
import ajaxReq from '../utils/ajax-req';

export default Ember.Controller.extend({
  toast: Ember.inject.service(),
  DataStore:Ember.inject.service(),
  error: '', 
  emailError:'',
  password:'',
  show_password:false,
  validateEmail:/^([a-z A-Z 0-9 _\.\-])+\@(([a-z A-Z 0-9\-])+\.)+([a-z A-z 0-9]{3,3})+$/,
  actions: {
      submitEmail() {
          if(!this.validateEmail.test(this.get("email")))
          {
            this.set("emailError",'Enter the valid Email');
            return ;
          }
          if(this.get("show_password")){
            if(this.get("password").length<=0){
              this.set("passwordError",'Enter the valid Password')
              return;
            }

          }
      console.log("submiting the data");
      
      let data=JSON.stringify(this.password ? { encryptedData: encryptData({ email: this.email, password: this.password }) } : { email: this.email });
      ajaxReq({
        endpoint:'auth/login',
        method:'PUT',
        data:data
      })
      .then((res)=>{
              this.set('error', ''); 
              this.set('emailError', '');
              this.set('passwordError', '');
              if(this.get("show_password"))
              {
                this.get('DataStore').set('isLoggedIn',true);
                if(res.isAdmin){
                  
                  this.get('DataStore').set('isAdmin',true);
                }
                this.set("email",'');
                this.set("password",'');
                this.set('show_password',false);
                this.get('toast').showToast('Login successful!','Success','success');
                this.transitionToRoute("/");
              }
              else{
                this.set('show_password',true);
              }
      })
      .catch((error)=>{
        console.log(error);
        
        let f = 0;
        if (error.responseJSON && error.responseJSON.email) {
            this.set("emailError", error.responseJSON.email);
            f = 1;
        }
        if (error.responseJSON && error.responseJSON.password) {
            this.set("passwordError", error.responseJSON.password);
            f = 1;
        }
        if (f === 0) {
            this.set("error", error.message || "An unexpected error occurred");
        }
      })
      }
    }
  });
          