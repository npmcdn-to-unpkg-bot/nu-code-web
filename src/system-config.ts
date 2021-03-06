// SystemJS configuration file, see links for more information
// https://github.com/systemjs/systemjs
// https://github.com/systemjs/systemjs/blob/master/docs/config-api.md

/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/

/** Map relative paths to URLs. */
const map: any = {
  'jquery': 'vendor/jquery/dist/jquery.min.js',
  'bootstrap': 'vendor/bootstrap/dist/js/bootstrap.min.js',
  'firebase': 'vendor/firebase/firebase.js',
  'angularfire2': 'vendor/angularfire2',
  'moment': 'vendor/moment/moment.js',
  'ng2-bootstrap': 'vendor/ng2-bootstrap',
  'angular2-fontawesome': 'vendor/angular2-fontawesome',
  'showdown': 'vendor/showdown/dist/showdown.js',
  'codemirror': 'vendor/codemirror'
};

/** User packages configuration. */
const packages: any = {
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
  },
  'codemirror': {
    defaultExtension: 'js',
    main: 'lib/codemirror.js'
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************
 * Everything underneath this line is managed by the CLI.
 **********************************************************************************************/
const barrels: string[] = [
  // Angular specific barrels.
  '@angular/core',
  '@angular/common',
  '@angular/compiler',
  '@angular/forms',
  '@angular/http',
  '@angular/router',
  '@angular/platform-browser',
  '@angular/platform-browser-dynamic',

  // Thirdparty barrels.
  'rxjs',

  // App specific barrels.
  'app',
  'app/shared',
  'app/shared/guards',
  'app/shared/models',
  'app/shared/pipes',
  'app/shared/services',
  'app/problem-list',
  'app/problem-list/problem-preview',
  'app/competition-list',
  'app/home',
  'app/problem',
  'app/problem/shared',
  'app/submission-modal',
  'app/code-editor',
  'app/code-editor/language-dropdown',
  'app/login-modal',
  'app/navbar',
  'app/navbar/auth-area',
  'app/register',
  'app/problem/view',
  'app/problem/my-submissions',
  'app/problem/leaderboard',
  'app/problem/leaderboard/ranking',
  'app/profile',
  'app/edit-profile',
  'app/login-required',
  'app/verification-required',
  'app/user-management',
  'app/create-problem',
  'app/edit-problem',
  'app/edit-problem-form',
  'app/reset-password',
  'app/competition',
  'app/competition/waiting',
  'app/competition/problem-view',
  'app/competition-list/competition-preview',
  'app/competition/scoreboard-preview',
  'app/competition/scoreboard',
  'app/page-not-found',
  'app/countdown',
  'app/code-editor/code-mirror',
  'app/competition/problem-preview',
  /** @cli-barrel */
];

const cliSystemConfigPackages: any = {};
barrels.forEach((barrelName: string) => {
  cliSystemConfigPackages[barrelName] = { main: 'index' };
});

/** Type declaration for ambient System. */
declare var System: any;

// Apply the CLI SystemJS configuration.
System.config({
  map: {
    '@angular': 'vendor/@angular',
    'rxjs': 'vendor/rxjs',
    'main': 'main.js'
  },
  packages: cliSystemConfigPackages
});

// Apply the user's configuration.
System.config({ map, packages });
