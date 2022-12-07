import {KeycloakService} from 'keycloak-angular';
import {ConfigInitService} from './config-init.service';
import {switchMap} from 'rxjs/operators';
import {fromPromise} from 'rxjs-compat/observable/fromPromise';
import {UtilsService} from '../app/shared/services/utils.service';
import {environment} from '../environments/environment';

export function initializeKeycloak(
  keycloak: KeycloakService,
  configService: ConfigInitService,
  utilsService: UtilsService
): any {
  return () => {
    return configService.getConfig()
      .pipe(
        switchMap<any, any>((config) => {
          if (environment.ignorarKeycloak) {
            console.log(environment);
            utilsService.disableKeycloak();
            return new Promise(resolve => resolve(true));
          }
          return fromPromise(keycloak.init({
            config: {
              url: config.KEYCLOAK_URL + '/auth',
              realm: config.KEYCLOAK_REALM,
              clientId: config.KEYCLOAK_CLIENT_ID,
            },
            loadUserProfileAtStartUp: false,
            initOptions: {
              onLoad: 'check-sso',
              enableLogging: true,
              checkLoginIframe: true,
            },
          }));
        })
      ).toPromise()
      .catch(err => {
        console.error('Keycloak fora do ar!');
        console.debug(err);
        utilsService.disableKeycloak();
      });
  };
}
