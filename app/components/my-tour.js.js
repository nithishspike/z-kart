// app/components/my-tour.js
import Component from '@ember/component';
import { run } from '@ember/runloop';
import introJs from 'intro.js'; // Import Intro.js

export default Component.extend({
  didInsertElement() {
    this._super(...arguments);
    this.startTour(); // Start the tour when the component is inserted
  },

  startTour() {
    introJs().setOptions({
      steps: [
        {
          element: '.navbar-logo',
          intro: "Welcome! Let's explore the key features of our online shopping platform",
          position: 'bottom'
        },
        {
          element: '.dropbtn:nth-of-type(1)', // First dropdown for Categories
          intro: "Use this dropdown to browse products by category",
          position: 'bottom'
        },
        {
          element: '.dropbtn:nth-of-type(2)', // Second dropdown for Brands
          intro: "Select a brand to see all products from that brand",
          position: 'bottom'
        },
        {
          element: '.search-field',
          intro: "Search for specific products using the search bar",
          position: 'bottom'
        },
        {
          element: '.navbar-cart',
          intro: "Click here to view items in your cart",
          position: 'bottom'
        },
        {
          element: '.navbar-account',
          intro: "Access your profile, update password, and view your orders here.",
          position: 'bottom'
        }
      ],
      showBullets: false,
      showProgress: true
    }).start(); // Start the tour
  }
});
