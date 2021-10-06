import { getOwner } from '@ember/application';
import { VERSION } from '@ember/version';
import Component from '@glimmer/component';
import './welcome-page.css';

export default class WelcomePageComponent extends Component {
  get isCurrent() {
    let stableRegex = /^\d+\.\d+\.\d+$/;
    return !stableRegex.test(VERSION);
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
