import { getOwner } from '@ember/application';
import { VERSION } from '@ember/version';
import { gte } from 'ember-compatibility-helpers';

import Component from '@glimmer/component';

export default class WelcomePageComponent extends Component {
  get isCurrent() {
    let stableRegex = /^\d+\.\d+\.\d+$/;
    return !stableRegex.test(VERSION);
  }

  get canAngleBracket() {
    return gte('3.4.0');
  }

  get rootURL() {
    let config = getOwner(this).factoryFor('config:environment');

    if (config) {
      return config.class.rootURL;
    } else {
      return '/';
    }
  }

  get emberVersion() {
    let isCurrent = this.isCurrent;

    if (isCurrent) {
      return 'current';
    } else {
      let [major, minor] = VERSION.split('.');
      return `${major}.${minor}.0`;
    }
  }
}
