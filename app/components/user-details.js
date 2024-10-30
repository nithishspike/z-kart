import Ember from 'ember';
import encryptData from '../utils/encrypt-data';
import { validatePassword } from '../utils/password-validation';
import ajaxReq from '../utils/ajax-req';

export default Ember.Component.extend({
  isVerified: true,
  isPasswordVisible: false,
  disableEditDetails:true,
  toast: Ember.inject.service(),
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
  validateEmail:/^([a-z A-Z 0-9 _\.\-])+\@(([a-z A-Z 0-9\-])+\.)+([a-z A-z 0-9]{3,3})+$/,
  error: '',
  emailError:'',
  selectedPayment:null,
  toast: Ember.inject.service(),
  isDisabled: Ember.computed('isVerified', 'readOnly', function() {
    console.log("address value" ,this.get('isVerified') , this.get('readOnly'))
    return this.get('isVerified') &&  !this.get('readOnly');
  }), 
  paymentOptions: [
    { id: '0', value: 0, label: 'Cash On Delivery' },
    { id: '1', value: 1, label: 'UPI' },
    { id: '2', value: 2, label: 'Net Banking' },
    { id: '3', value: 3, label: 'Debit/Credit Card' }
  ],
  // Store initial state when loading user details
  init() {
    this._super(...arguments);
    this.set('initialUserData', {
      firstName: this.get('model.firstName'),
      lastName: this.get('model.lastName'),
      mobile: this.get('model.mobile'),
      address: this.get('model.address'),
      email: this.get('model.email')
    });
    console.log("initial ",this.get("initialUserData"),this.get("model"));
    
  },
  validateDetails(){
    let isValid=true;
    if (this.newPassword && this.newPassword !== this.confirmPassword) {
      this.set('error', "Confirm password does not match the new password");
      isValid=false;
    }

    if (this.newPassword) {
      const passwordError = validatePassword(this.newPassword);
      if (passwordError) {
        this.set('error', passwordError);
        isValid=false;
      }
    }

    if(this.model.mobile.toString().length!=10){
      
      this.set('mobileError','Mobile Number should containe 10 digits');
      isValid=false;
    }

    if(!this.get("validateEmail").test(this.get("model.email"))){
      this.set('emailError','Enter the valid Email');
      isValid=false;
    }
    return isValid;
  },

  actions: {
    editProfile(){
      // this.toast("")
      this.get('toast').showToast("You can now edit your profile details","","success");
        
      // this.toast("You can now edit your profile details",'success');
      this.set("disableEditDetails",false);
    },
    updatePayment(value){
         console.log("updating the payment");
         this.set("selectedPayment",value);
         this.set("paymentMode",value);
         console.log("payment Mode value is ",value,this.get("paymentMode"));
         
    },

    updateDetails() {
      if(!this.validateDetails()){
          return ;
      }

      const userDetails = {};
      if (this.get('model.firstName') !== this.initialUserData.firstName) {
        userDetails.first_name = this.get('model.firstName');
      }

      if (this.get('model.lastName') !== this.initialUserData.lastName) {
        userDetails.last_name = this.get('model.lastName');
      }

      if (this.get('model.mobile') !== this.initialUserData.mobile) {
        userDetails.mobile = String(this.get('model.mobile'));
      }

      if (this.get('model.address') !== this.initialUserData.address) {
        userDetails.address = this.get('model.address');
      }
      if (this.get('model.email') !== this.initialUserData.email) {
        userDetails.email = this.get('model.email');
      }

      if (this.newPassword) {
        userDetails.new_password = encryptData({ password: this.newPassword });
      }
    console.log(JSON.stringify(userDetails),userDetails);
      if (Object.keys(userDetails).length === 0) {
        this.set('error', "No changes detected. Please update at least one field.");
        return;
      }

      ajaxReq({
        endpoint:'users',
        method:'PUT',
        data: JSON.stringify(userDetails),
      })
      .then((response)=>{
          this.set('initialUserData', {
            firstName: this.get('model.firstName'),
            lastName: this.get('model.lastName'),
            mobile: this.get('model.mobile'),
            address: this.get('model.address'),
            email: this.get('model.email')
          });
          this.get('toast').showToast('Details updated successfully','success');
          this.set('emailError','');
          this.set("mobileError",'');
          this.set('error','');
      })
      .catch((error) => {
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
            this.get("toast").showToast(error.message || "An unexpected error occurred", "Error", "error");
        }
    })
    },

    cancel() {
      console.log("cancelling");
      let router=Ember.getOwner(this).lookup("router:main");
      router.transitionTo("/");
      this.setProperties({
        isVerified: false,
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
        error: ''
      });
    }
  }
});
