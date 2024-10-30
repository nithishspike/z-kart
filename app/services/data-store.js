import Ember from 'ember';
import $ from 'jquery';
import RSVP from 'rsvp';
import ajaxReq from '../utils/ajax-req';

export default Ember.Service.extend({
  categories: null,
  brands: null,
  dealOfTheMoment:null,
  isLoggedIn:false,
  isAdmin:false,
  isDataLoaded:false,
  isOrderConfirm:false,
  init() {
    this._super(...arguments);
    console.log('Service initialized');
    this.loadData();
  },
  getCategories(){
    console.log("try to get the categories");
    return this.get("categories");
  },
  getBrands(){
    console.log("try to get the brand");
    return this.get("brands");
  },
  getisLoggedIn(){
    return this.get("isLoggedIn");
  },
  loadData() {
    console.log('Loading data');
    return RSVP.hashSettled({
      categories:ajaxReq({
        endpoint:'category'
      }),
      brands:ajaxReq({
        endpoint:'brand'
      }),
      dealOfTheMoment:ajaxReq({
        endpoint:'product',
        data: { deal: 200011 }
      }),
      discount:ajaxReq({
        endpoint:'discount',
        data: { discount_id: 200011 }
      }),
      user:ajaxReq({
        endpoint:'users'
      })
    }).then((res) => {
      this.set("isDataLoaded",true);
      if (res.categories.state === 'fulfilled') {
        this.set('categories', res.categories.value);
      } else {
        console.error('Failed to load categories');
      }

      if (res.brands.state === 'fulfilled') {
        this.set('brands', res.brands.value);
      } else {
        console.error('Failed to load brands');
      }

      
      if (res.dealOfTheMoment.state === 'fulfilled') {
        this.set('dealOfTheMoment', res.dealOfTheMoment.value[0]);
      } else {
        console.error('Failed to load deal of the moment');
      }
      
      if (res.discount.state === 'fulfilled' && res.dealOfTheMoment.state === 'fulfilled') {
        this.dealOfTheMoment.percentage = res.discount.value[0].percentage;
        this.dealOfTheMoment.discountCode = res.discount.value[0].discountCode;
      } else {
        console.error('Failed to load discount');
      }
      
      if (res.user.state === 'fulfilled') {
        // this.set('user', res.user.value);
        console.log("user check is",res.user.value);
        this.set("isLoggedIn",true);
        this.set("isAdmin",res.user.value[0].isAdmin);
      } else {
        this.set("isLoggedIn",false);
        this.set("isAdmin",false);

        console.error('Failed and user is not logged in');
      }
      console.log('Data fetched successfully');
    }).catch((error) => {
      this.set("isDataLoaded",true);
      console.error('Overall error occurred', error);
    });
  },
  
});

