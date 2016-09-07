// Angular-CLI build configuration
// This file lists all the node_modules files that will be used in a build
// Also see https://github.com/angular/angular-cli/wiki/3rd-party-libs

/* global require, module */

var Angular2App = require('angular-cli/lib/broccoli/angular2-app');

module.exports = function(defaults) {
  return new Angular2App(defaults, {
    vendorNpmFiles: [
      // Angular CLI
      'systemjs/dist/system-polyfills.js',
      'systemjs/dist/system.src.js',
      'zone.js/dist/**/*.+(js|js.map)',
      'core-js/**/*.+(js|js.map)',
      'reflect-metadata/**/*.+(ts|js|js.map)',
      'rxjs/**/*.+(js|js.map)',
      '@angular/**/*.+(js|js.map)',
      // jQuery
      'jquery/dist/jquery.min.js',
      // Bootstrap
      'bootstrap/dist/**',
      // angularfire2
      'angularfire2/**/*.js',
      'firebase/*.js',
      // ng2-bootstrap
      'ng2-bootstrap/**/*.js',
      'moment/moment.js',
      // angular2-fontawesome
      'angular2-fontawesome/*.+(js|js.map)',
      'angular2-fontawesome/**/*.+(js|js.map)',
      'angular2-fontawesome/**/**/*.+(js|js.map)',
      'font-awesome/css/*.*',
      'font-awesome/fonts/*.*',
      // Showdown
      'showdown/dist/*.js',
      // CodeMirror
      'codemirror/**'
    ]
  });
};
