import Ember from 'ember';
import ajaxReq from '../utils/ajax-req';

export default Ember.Component.extend({
  dataStore: Ember.inject.service('data-store'),  
  isLoggedIn: Ember.computed.alias('dataStore.isLoggedIn'),
  isAdmin: Ember.computed.alias('dataStore.isAdmin'),
  categories: Ember.computed.alias('dataStore.categories'),
  brands: Ember.computed.alias('dataStore.brands'),
  searchQuery: '',
  searchResults: [],
  showSuggestion: false,
  selectedIndex: -1,
  showCart:false,
  router: Ember.computed(function() {
    return Ember.getOwner(this).lookup('router:main');
  }),

  liveSearch: Ember.observer('searchQuery', function() {
    if (this.get("searchQuery").length >= 3) {
      this.set('selectedIndex',-1);
      this.set("showSuggestion", true);
      ajaxReq({
        endpoint: 'product',
        data: { filter_name: this.get("searchQuery"), page_size: 5 },
      })
      .then((response) => {
        this.set('searchResults', response.length ? response : [{ productName: "No Results Found" }]);
      })
      .catch((error) => {
        this.get('toast').showToast('Search failed. Please try again.', 'Warning', "warning");
        this.set('searchResults', []); 
      });
    } else {
      this.set("showSuggestion", false);
      this.set('searchResults', []);
    }
  }),

  didInsertElement() {
    this._super(...arguments);
    this.$('.search-input').on('keydown', this.handleKeyDown.bind(this));
    // this.$('.search-input').on('keyup', this.handleKeyUp.bind(this));
    this._clickOutsideListener = this.clickOutside.bind(this);
    document.addEventListener('click', this._clickOutsideListener);
  },

  willDestroyElement() {
    this.$('.search-input').off('keydown');
    // this.$('.search-input').off('keyup');
    document.removeEventListener('click', this._clickOutsideListener);
  },

  handleKeyDown(event) {
    const inputValue = event.target.value;
    const searchResults = this.get('searchResults');
    const selectedIndex = this.get('selectedIndex');
    if (event.keyCode === 38) { // Up arrow
      this.set('selectedIndex', Math.max(selectedIndex - 1, 0));
      console.log('Up arrow pressed:', inputValue,this.get('selectedIndex'));
    } else if (event.keyCode === 40) { // Down arrow
      this.set('selectedIndex', Math.min(selectedIndex +1, searchResults.length - 1));

      console.log('Down arrow pressed:', inputValue,this.get('selectedIndex'));
    }
    else if (event.keyCode === 13 && selectedIndex >= 0) {
      // event.preventDefault();
      const selectedProduct = searchResults[selectedIndex];
      if (selectedProduct && selectedProduct.productId) {
        this.send('searchContent', selectedProduct.productId); // Trigger action with selected product ID
        this.set("showSuggestion", false); // Hide suggestions after selection
        this.set('searchQuery','');
      }
    }
  },

  handleKeyUp(event) {
    const inputValue = event.target.value;
    console.log('Key released:', event.key, 'Current input value:', inputValue,this.get('selectedIndex'));
  },

  clickOutside(event) {
    const searchInput = this.$('.search-input')[0];
    const searchSuggestions = this.$('.search-suggestions')[0];
    const cartIcon=this.$('.navbar-cart')[0];
    if(!cartIcon.contains(event.target)){
      this.set('showCart',false);
    }
    if (searchInput && searchSuggestions && !searchInput.contains(event.target) && !searchSuggestions.contains(event.target)) {
      this.set("showSuggestion", false);
    }
  },

  actions: {
    selectCategory(value) {
      this.get("router").transitionTo('products', { queryParams: { filter_category: value, filter_brand: null } });
    },

    selectBrand(value) {
      this.get("router").transitionTo('products', { queryParams: { filter_brand: value, filter_category: null } });
    },

    toggleCart(getItems) {
      if (getItems) {
        ajaxReq({
          endpoint: 'cart',
        })
        .then((response) => {
          this.set("cartItems", response);
        })
        .catch((error) => {
          this.get('toast').showToast('Something went wrong', 'Warning', "warning");
        });
      }
      this.toggleProperty("showCart");
    },

    handleKeydown(event) {
      if (event.keyCode === 13 && this.selectedIndex >= 0) { // Enter key
        const selectedProduct = this.get('searchResults')[this.selectedIndex];
        if (selectedProduct && selectedProduct.productId) {
          this.send('searchContent', selectedProduct.productId); // Call searchContent with selected product ID
        }
      }
    },
    searchContent(productId) {
      this.get('router').transitionTo('product', productId);
    }
  }
});
