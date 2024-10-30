import Ember from 'ember';

export default Ember.Controller.extend({
    showCategory: false,
    showBrand: false,
    showPrice: false,
    DataStore: Ember.inject.service(),
    selectedCategory: null,
    selectedBrand: null,
    selectedPriceRange:'',

    priceRanges: [
        { value: 1, label: "Under ₹ 50000", condition: { max_price: 50000 } },
        { value: 2, label: "₹ 50000 to ₹100000", condition: { min_price: 50000, max_price: 100000 } },
        { value: 3, label: "₹ 100000 to ₹300000", condition: { min_price: 100000, max_price: 300000 } },
        { value: 4, label: "₹ 300000 & Above", condition: { min_price: 300000 } }
    ],

    categories: Ember.computed('model', 'DataStore', function() {
        return this.get('DataStore').getCategories();
    }),

    brands: Ember.computed('model', 'DataStore', function() {
        return this.get('DataStore').getBrands();
    }),

    init() {
        this._super(...arguments);
        console.log("DataStore is " + this.get("DataStore"));
    },

    // Common function to handle filtering
    filterProducts() {
        let selectedPriceRange = this.get('selectedPriceRange');
        // let priceCondition = selectedPriceRange ? this.get('priceRanges').findBy('value', selectedPriceRange).condition : {};

        this.transitionToRoute('products', {
            queryParams: {
                filter_category: this.get("selectedCategory"),
                filter_brand: this.get("selectedBrand"),
                min_price: selectedPriceRange.min_price || null,
                max_price: selectedPriceRange.max_price || null
            }
        });
    },

    actions: {
        toggleCategory() {
            this.toggleProperty("showCategory");
        },
        toggleBrand() {
            this.toggleProperty("showBrand");
        },
        togglePrice() {
            this.toggleProperty("showPrice");
        },

        // Common method to call on any filter change
        updateFilter(type, value) {
            // console.log(c);
            
            if (type === 'category') {
                this.set('selectedCategory', value);
            } else if (type === 'brand') {
                this.set('selectedBrand', value);
            } else if (type === 'price') {
                console.log(this.get("selectedPriceRange"));
                
                this.set('selectedPriceRange', value);
            }
            console.log(`${type} selected: `, value);

            // Call common filter method
            this.filterProducts();
        }
    }
});
