import Ember from 'ember';

export default Ember.Component.extend({
  products: [],
  isLoading: true,
  isImageError: false,
  dataStore: Ember.inject.service('data-store'),
  dealOfTheMoment:Ember.computed.alias('dataStore.dealOfTheMoment'),
  init() {
    this._super(...arguments);
    this.fetchProducts();
  },
  actions: {
    load() {
      console.log("Image loaded successfully");
      this.set("isImageError", false); // Reset image error state
    },
    error() {
      console.log("Can't load the image");
      this.set("isImageError", true); // Set image error state
    }
  },

  fetchProducts() {
    // Simulate a delay to mimic data fetching
    setTimeout(() => {
      // Replace this with your actual data fetching logic
      this.set('products', this.get('products')); // Update with actual products
      this.set('isLoading', false); // Set loading to false when done
    }, 10); // Simulate a short loading time
  }
});
