import EmberApp from '@ember/application';
import Resolver from 'ember-resolver';
import EmberRouter from '@ember/routing/router';

import WelcomePage from 'ember-welcome-page/components/welcome-page';

class Router extends EmberRouter {
  location = 'none';
  rootURL = '/';
}

export default class TestApp extends EmberApp {
  modulePrefix = 'demo-app';
  Resolver = Resolver.withModules({
    'demo-app/router': { default: Router },
    'demo-app/templates/application': <template>
      <WelcomePage @extension="gjs" />
    </template>,
  });
}
