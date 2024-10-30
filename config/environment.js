/* eslint-env node */
'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'online-shopping-client',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },
    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
    // API_BASE_URL: 'http://localhost:8002/api/v1',
    development: {
      API_BASE_URL: 'http://localhost:8002/api/v1',
    },

    publicKey: `
            MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAt9tbxFmYAee0qZzJE54G
            ZnwzrYpo9fix3YWKP2gTV7K8IhMwqGevgqIz9DXW+wqks8lT4zp3w40Vl4Jxgda1
            x2t1xR6b6hQgAAcBNsMIxEG7jH5eZp5ilj84dJZ2AoKSiMFKy8+fXKhzGsBMOaoe
            /973EE2sWB/9oqd44M5yA75r6NzAsqtMKRnU9T3ryNOQplWlfBIXpPpEiCjjNbv/
            cCzLKfCqs5YOs6p0QG90IOX9b+iHFpIo0ncAW29ENOCHuC/b1pR8mjoRq+FgNhX+
            zHdlU33OiMHrQGKYCenwqD6HTk2u3VEvvaPpO2uAwVNLay6523ZOCni4upNQ2rNk
            rQIDAQABz`,
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
