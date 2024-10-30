/* eslint-env node */
'use strict';
const EmberApp = require('ember-cli/lib/broccoli/ember-app');
module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    sassOptions: {
      extension: 'scss'
    }
    // Add options here
  });
  // app.import("");
  app.import('/Users/nithish-tt0489/projects/online-shopping-client/node_modules/jsencrypt/bin/jsencrypt.js');
  app.import('vendor/intro.min.css');
  app.import('vendor/intro.min.js');



return app.toTree();
};
