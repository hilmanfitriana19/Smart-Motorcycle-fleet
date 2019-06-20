// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase : {
    apiKey: "AIzaSyACUbsYhoY9OdXRIEdPBmpWNl2TLePHj_c",
    authDomain: "smart-motorcycle.firebaseapp.com",
    databaseURL: "https://smart-motorcycle.firebaseio.com",
    projectId: "smart-motorcycle",
    storageBucket: "smart-motorcycle.appspot.com",
    messagingSenderId: "652856867479",
    appId: "1:652856867479:web:56a411258b5bf1a1"
  }
};
