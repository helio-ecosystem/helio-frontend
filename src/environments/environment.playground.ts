// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { environment as envDev } from "./environment";
import {InterceptorPlaygroundService} from "../app/services/interceptor/interceptor_playground.service";

export const environment = {
  production: true,
  version: '0.0.2',
  host: 'http://localhost:4567',
  interceptor: InterceptorPlaygroundService,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
