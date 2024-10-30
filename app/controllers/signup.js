import Ember from 'ember';
import { validatePassword } from "../utils/password-validation";
import encryptData from '../utils/encrypt-data';
import $ from "jquery";
import ENV from 'online-shopping-client/config/environment';

import ajaxReq from '../utils/ajax-req';

export default Ember.Controller.extend({
  toast: Ember.inject.service(),
  DataStore:Ember.inject.service(),
  first_name: '',
  last_name: '',
  mobile: '',
  address: '',
  email: '',
  password: '',
  confirm_password: '',
  error: '', // General error
  firstNameError: '', // Specific errors for each field
  lastNameError: '',
  mobileError: '',
  addressError: '',
  emailError: '',
  passwordError: '',
  confirmPasswordError: '',
  
  validateFields() {
    let isValid = true;
    // Clear previous errors
    this.setProperties({
      firstNameError: '',
      lastNameError: '',
      mobileError: '',
      addressError: '',
      emailError: '',
      passwordError: '',
      confirmPasswordError: ''
    });

    // Validate each field and set errors
    if (!this.first_name) {
      this.set('firstNameError', 'First name is required');
      isValid = false;
    }
    
    if (!this.last_name) {
      this.set('lastNameError', 'Last name is required');
      isValid = false;
    }

    if (!this.mobile) {
      this.set('mobileError', 'Mobile number is required');
      isValid = false;
    }
    else if(this.mobile.length!=10){
      this.set('mobileError', 'Mobile number should container 10 digits');
      isValid=false;
    }

    if (!this.address) {
      this.set('addressError', 'Address is required');
      isValid = false;
    }
    if (!this.email) {
      this.set('emailError', 'Email is required');
      isValid = false;
    }
    if (!this.password) {
      this.set('passwordError', 'Password is required');
      isValid = false;
    }
    if (!this.confirm_password) {
      this.set('confirmPasswordError', 'Confirm password is required');
      isValid = false;
    } else if (this.password !== this.confirm_password) {
      this.set('confirmPasswordError', 'Passwords do not match');
      isValid = false;
    }

    const passwordError = validatePassword(this.password);
    if (passwordError) {
      this.set('passwordError', passwordError);
      isValid = false;
    }

    return isValid;
  },

  actions: {
    cancel() {
      this.transitionToRoute("/");
    },

    submitSignup() {
      if (!this.validateFields()) {
        return;
      }
      ajaxReq({
        endpoint:'auth/signup',
        method:'POST',
        data: JSON.stringify({
              first_name: this.first_name,
              last_name: this.last_name,
              mobile: this.mobile,
              address: this.address,
              encryptedData: encryptData({ email: this.email, password: this.password }),
            })
      })
      .then((res)=>{
          this.set('error', '1'); 
          this.get("DataStore").set("isLoggedIn",true);
          if (res.isAdmin) {
            this.get('DataStore').set('isAdmin',true);
          }

          this.get("toast").showToast("Welcome to Z-kart!", "Signup Successful", 'success');
          this.transitionToRoute("/");
        })
      .catch((error)=>{
        let f = 0;
        if (error.responseJSON && error.responseJSON.email) {
            this.set("emailError", error.responseJSON.email);
            f = 1;
        }
        if (error.responseJSON && error.responseJSON.mobile) {
            this.set("mobileError", error.responseJSON.mobile);
            f = 1;
        }
        if (f === 0) {
            this.set("error", error.message || "An unexpected error occurred");
        }
      })

          }
  }
});
