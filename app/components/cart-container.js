import Ember from 'ember';
import ajaxReq from '../utils/ajax-req';

export default Ember.Component.extend({
  selectedDiscount: "",
  toast: Ember.inject.service(),
  DataStore:Ember.inject.service(),
  dealOfTheMoment:Ember.computed.alias('DataStore.dealOfTheMoment'),
  showCart: false,
  outOfStock: false, 
  router: Ember.computed(function() {
    return Ember.getOwner(this).lookup('router:main')
  }),

  totalAmount: Ember.computed('cartItems.@each.quantity', 'cartItems.@each.product.productPrice', function() {
    let cartItems = this.get('cartItems') || [];
    if (!Array.isArray(cartItems)) {
      cartItems = [];
    }
    return cartItems.reduce((total, item) => {
      let quantity = item.quantity || 0;
      let price = item.product.productPrice || 0;
      let OfferProduct=this.get("dealOfTheMoment.productId")
      if(item.productId==OfferProduct)
      {
          price=(price*(1-this.get("dealOfTheMoment").percentage/100)).toFixed(2);
      }
      return total + (quantity * price);
    }, 0);
  }),

  total: Ember.computed('cartItems.@each.quantity', 'cartItems.@each.product.productPrice', 'selectedDiscount', function() {
    if (this.get("selectedDiscount")) {
      let total = this.get("totalAmount") * (100 - this.get("selectedDiscount").percentage) / 100;
      return parseFloat(total.toFixed(2));
    } else {
      return this.get("totalAmount");
    }
  }),
  updateProduct(productId,quantity){
    console.log("updating the cart product");
    
    ajaxReq({
      endpoint:'cart',
      method:'PUT',
      data: JSON.stringify([{product_id:productId,quantity:quantity}]),
    })
    .then((res)=>{
      console.log(res);
    })
    .catch((error)=>{
      console.error('Update cart failed', error.responseJSON);
    })
    // Ember.$.ajax({
    //   url: "http://localhost:8002/api/v1/cart",
    //   type: 'PUT',
    //   contentType: 'application/json',
    //   data: JSON.stringify([{product_id:productId,quantity:quantity}]),
    //   success: (res) => {
    //     console.log(res);
    //   },
    //   error: (error) => {
        
    //     console.error('Update cart failed', error.responseJSON);
    //   }
    // });
  },

  checkOutOfStockItems() {
    // Check if any item in the cart is out of stock
    const outOfStockItems = this.get('cartItems').filter(item => item.product.stock === 0);
    this.set('outOfStock', outOfStockItems.length > 0);
  },

  actions: {
    increaseQuantity(item) {
      let newQuantity = item.quantity + 1;
      Ember.set(item, 'quantity', newQuantity);
      this.updateProduct(item.productId, newQuantity);
      this.checkOutOfStockItems(); // Check for out-of-stock after updating
    },
    decreaseQuantity(item) {
      if (item.quantity > 0) {
        let newQuantity = item.quantity - 1;
        if(newQuantity==0){
          console.log("removing the cartItem");
          this.get("cartItems").removeObject(item);
          console.log(this.cartItems);
          
        }
        else{
          Ember.set(item, 'quantity', newQuantity);
        }
        this.updateProduct(item.productId, newQuantity);
        this.checkOutOfStockItems(); // Check for out-of-stock after updating
      }
    },
    updateCart() {
      let filteredItems = this.get('cartItems').map(item => ({
        product_id: item.productId,
        quantity: item.quantity
      }));
      ajaxReq({
        endpoint:'cart',
        method:'PUT',
        data: JSON.stringify(filteredItems),
      })
      .then((res)=>{
        console.log(res);
        this.checkOutOfStockItems(); // Check for out-of-stock after updating
      })
      .catch((error)=>{
        console.error('Update cart failed', error.responseJSON);
      })
      // Ember.$.ajax({
      //   url: `http://localhost:8002/api/v1/cart`,
      //   type: 'PUT',
      //   data: JSON.stringify(filteredItems),
      //   success: (res) => {
      //     console.log(res);
      //     this.checkOutOfStockItems(); // Check for out-of-stock after updating
      //   },
      //   error: (error) => {
      //     console.error('Update cart failed', error.responseJSON);
      //   }
      // });
    },

    toggleCart() {
      this.toggleProperty("showCart");
    },

    updateDiscount(discount) {
      this.set("selectedDiscount", discount);
    },

    purchase(address, paymentMode, userDiscountId) {
      if (!paymentMode || !address) {
        this.get('toast').showToast(!paymentMode ? "Please select payment mode" : "Please Enter Shipping address","Warning","warning");
        return;
      }
      
      this.checkOutOfStockItems(); // Check for out-of-stock before proceeding
      if (this.get('outOfStock')) {
        this.get('toast').showToast('Some items in your cart are out of stock. Please remove them to proceed.','Warning',"warning");
        return; 
      }
      console.log("Purchasing the product");
      ajaxReq({
        endpoint:'orders',
        method:'POST',
        data: JSON.stringify({
          shipping_address: address ? address : '',
          payment_mode: paymentMode,
          user_discount_id: userDiscountId,
          deal:200011
        }),
      })
      .then((res)=>{
        this.get("DataStore").set("isOrderConfirm",true);
        if(res.discount_code!=null){
          console.log("query working");
          this.get("router").transitionTo('checkout.order-confirmation', { queryParams: { coupon:res.discount_code } });
        }
        else{
          this.get("router").transitionTo("checkout.order-confirmation",{ queryParams: { coupon:'' } });
        }
        this.get('toast').showToast('Thank you for shopping with us', 'Order Placed Successfully!','success');
      })
    }
  }
});
