import Ember from 'ember';
import $ from "jquery";
import ajaxReq from '../utils/ajax-req';
export default Ember.Controller.extend({
    DataStore:Ember.inject.service(),
    toast: Ember.inject.service(),
    isLoggedIn: Ember.computed.alias('dataStore.isLoggedIn'),
    isAdmin:Ember.computed.alias('dataStore.isAdmin'),
    dealOfTheMoment:Ember.computed.alias('DataStore.dealOfTheMoment'),
    //get category
    category: Ember.computed('model', 'DataStore', function() {
        const model = this.get('model');
        if (model.length === 0) {
            console.log("DataStore does not started")
            return null; 
        }
        const categoryId = model.product.categoryId;
        console.log("value ",this.get('DataStore').getCategories(),categoryId);
        return this.get('DataStore').getCategories().find((category) => category.categoryId === categoryId);
    }),
    //get brand
    brand: Ember.computed('model', 'DataStore', function() {
        const model = this.get('model');
        if (model.length === 0) {
            return null; 
        }
        const brandId = model.product.brandId;
        return this.get('DataStore').getBrands().find((brand) => brand.brandId === brandId);
    }),
    init(){
        this._super(...arguments);  
        console.log("DataStore  is "+this.get("DataStore"));
    },
    selectedQuantity:1,
    actions: {
        updateQuantity(event) {
            // Update the selected quantity based on user selection
            this.set('selectedQuantity', parseInt(event.target.value, 10));
            console.log("updating");
        },
        AddItem(value){

            if(this.get('DataStore').get('isLoggedIn')){
                console.log(this.get("model").product.productId,this.get("model").product,this.get("model"))
                ajaxReq({
                    endpoint:'cart',
                    method:'POST',
                    data: JSON.stringify({
                        "product_id": this.get("model").product.productId,
                        "quantity": this.get("selectedQuantity")
                    }),
                })
                .then((res) => {
                    this.get('toast').showToast('Cart item added successfully!','success');
                    if(value){
                      this.transitionToRoute("/checkout");
                  }})
                .catch((error) => {
                this.get('toast').showToast("An error occurred while adding to cart", 'Error','error');
                console.error("Error adding item to cart:", error); // Log the complete error object for debugging
                  });   
            }
            else{
                this.get('toast').showToast("User is not logged in", 'Warning','warning');
            }
        }
       

    }
});
