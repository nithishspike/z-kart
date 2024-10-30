import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    startTour() {
      if (typeof window.introJs === 'function') {
        const intro = window.introJs().setOptions({
          steps: [
            {
              element: '.navbar-logo',
              intro: "Welcome to ZKart! Let us guide you through our online shopping features.",
              position: 'bottom'
            },
            {
              element: '.dropbtn:nth-of-type(1)',
              intro: "Browse products by category to find what you need.",
              position: 'bottom'
            },
            {
              element: '#brand',
              intro: "Choose a brand to see all available products from that brand.",
              position: 'bottom'
            },
            {
              element: '.search-field',
              intro: "Use the search bar to quickly find specific products.",
              position: 'bottom'
            },
            {
              element: '.navbar-cart',
              intro: "Click here to view items in your shopping cart.",
              position: 'bottom'
            },
            {
              element: '.navbar-account',
              intro: "Access your account to update your profile, change your password, and view your order history.",
              position: 'bottom'
            },
          ],
          showBullets: false,
          showProgress: true
        }).start();
      } else {
        console.error('Intro.js is not loaded');
      }
    }
  }
});
