'use strict';

exports.config = {
  paths: {
    public: 'public'
  },

  server: {
    path: 'server',
    port: 3333
  },

  files: {
    javascripts: {
      joinTo: {
        'javascripts/app.js': /^app/,
        'javascripts/vendor.js': /^(vendor|bower_components)/
      }
    },

    stylesheets: {
      joinTo: {
        'stylesheets/app.css': /^(app|vendor|bower_components)/
      }
    },

    templates: {
      joinTo: 'javascripts/app.js'
    }
  }
};
