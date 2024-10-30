import Ember from 'ember';
import encryptData from '../../../utils/encrypt-data';
import { validatePassword } from '../../../utils/password-validation';
import ajaxReq from '../../../utils/ajax-req';

export default Ember.Controller.extend({
    isVerified:false,
    password:'',
    newPassword:"",
    confirmPassword:"",
    passwordError:'',
    newPasswordError:'',
    confirmPasswordError:"",
    error:"",
    toast: Ember.inject.service(),
    actions:{
        verifyPwd(){
            console.log("password "+this.password);
            if (this.password === undefined || this.password === ''){
              this.set('passwordError','Password is Empty');
              return;
            }
            ajaxReq({
              endpoint:'auth/login',
              method:'PUT',
              data: JSON.stringify({ encryptedData: encryptData({ password:this.password })}),
            })
            .then((res)=>{
              this.set("isVerified",true);
              this.set("error",'');
              this.set('passwordError','');
              console.log("success "+res);
            })
            .catch((error)=>{
              this.set("passwordError",error.responseJSON.message);
            })
        },
        updateDetails(){
          const passwordError = validatePassword(this.newPassword);
          let isValid;
          if (passwordError) {
              this.set('newPasswordError', passwordError);
              isValid=true;
          }
          else{
            this.set('newPasswordError','');
          }

          if (this.newPassword && this.newPassword !== this.confirmPassword) {
              this.set('confirmPasswordError', "Confirm password does not match the new password");
              isValid=true;
          }
          else{
            this.set("confirmPasswordError",'');
          }
          if(isValid){
            return;
          }
          
          ajaxReq({
            endpoint:'users',
            method:'PUT',
            data: JSON.stringify({new_password : encryptData({ password: this.newPassword })}),
          })
          .then((response)=>{
            if (response.isValid) {
              this.get('toast').showToast('Details updated successfully!','Success');
              this.set('password','');
              this.set('newPassword','');
              this.set('confirmPassword','');
            
            } else {
              console.log(response);
              
              this.set("error",response.responseJSON.message);
              this.get('toast').showToast('Error updating details. Please try again.!','Error','error');
            }
          })
          .catch((error)=>{
            this.set('newPasswordError',error.responseJSON.message);
            
          })
          
            },
        }
});
