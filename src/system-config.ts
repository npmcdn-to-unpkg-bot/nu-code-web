declare var System: any;

System.config({
  map: {
    'app': 'app',

    '@angular/core': 'vendor/@angular/core/bundles/core.umd.js',
    '@angular/common': 'vendor/@angular/common/bundles/common.umd.js',
    '@angular/compiler': 'vendor/@angular/compiler/bundles/compiler.umd.js',
    '@angular/platform-browser': 'vendor/@angular/platform-browser/bundles/platform-browser.umd.js',
    '@angular/platform-browser-dynamic': 'vendor/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
    '@angular/http': 'vendor/@angular/http/bundles/http.umd.js',
    '@angular/router': 'vendor/@angular/router/bundles/router.umd.js',
    '@angular/forms': 'vendor/@angular/forms/bundles/forms.umd.js',

    'rxjs': 'vendor/rxjs',

    'jquery': 'vendor/jquery/dist/jquery.min.js',
    'bootstrap': 'vendor/bootstrap/dist/js/bootstrap.min.js',

    'firebase': 'vendor/firebase/firebase.js',
    'angularfire2': 'vendor/angularfire2',

    'angular2-fontawesome': 'vendor/angular2-fontawesome',

    'moment': 'vendor/moment/moment.js',
    'ng2-bootstrap': 'vendor/ng2-bootstrap'
  },
  packages: {
    'app': {
      main: './main.js',
      defaultExtension: 'js'
    },

    'rxjs': {
      defaultExtension: 'js'
    },

    'angularfire2': {
      defaultExtension: 'js',
      main: 'angularfire2.js'
    },
    'ng2-bootstrap': {
      defaultExtension: 'js',
      main: 'ng2-bootstrap.js'
    },
    'angular2-fontawesome': {
      defaultExtension: 'js'
    }
  }
});

const barrels: string[] = [
  'app/login-modal',
  'app/navbar',
  'app/shared',
  'app/shared/guards',
  'app/shared/models',
  'app/shared/pipes',
  'app/shared/services'
];

const cliSystemConfigPackages: any = {};
barrels.forEach((barrelName: string) => {
  cliSystemConfigPackages[barrelName] = { main: 'index' };
});

System.config({
  packages: cliSystemConfigPackages
});
