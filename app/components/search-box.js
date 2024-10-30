import Ember from 'ember';

export default Ember.Component.extend({
  placeholder: 'Search...', // Default placeholder
  searchValue: '',
  actionName: '',

//   didInsertElement() {
//     this._super(...arguments);
//     this.$('.search-input').on('keydown', this.handleKeyDown.bind(this));
//     this.$('.search-input').on('keyup', this.handleKeyUp.bind(this));
//   },

//   willDestroyElement() {
//     // Clean up event listeners
//     this.$('.search-input').off('keydown');
//     this.$('.search-input').off('keyup');
//   },

//   handleKeyDown(event) {
//     const inputValue = event.target.value;

//     if (event.keyCode === 38) { // Up arrow
//       console.log('Up arrow pressed:', inputValue);
//     } else if (event.keyCode === 40) { // Down arrow
//       console.log('Down arrow pressed:', inputValue);
//     }
//   },

//   handleKeyUp(event) {
//     const inputValue = event.target.value;
//     console.log('Key released:', event.key, 'Current input value:', inputValue);
//   }
});
