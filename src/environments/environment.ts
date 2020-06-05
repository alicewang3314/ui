// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // baseUrl:"http://crtecdev0108783/tfsapi",
  // baseUrl:"http://crtecdev0308265.pa.lcl/TfsApi",
  // baseUrl: "http://localhost:25670",
  // baseUrl: "http://crtecdv0111429d.pa.lcl"
  //baseLogApiUrl:"http://localhost:26839",
  baseUrl:'http://capmon.cor.state.pa.us/TFSAPI',
  baseLogApiUrl: '',
  kibanaUrl: 'http://crtecdev0108783.pa.lcl:5601',
  TFSDashBSetting: "TfsDashBProjsTeams",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
