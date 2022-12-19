import { getOwner } from '@ember/application';
import { VERSION } from '@ember/version';
import Component from '@glimmer/component';
import './welcome-page.css';

function isLatestVersion() {
  const stableRegex = /^\d+\.\d+\.\d+$/;

  return !stableRegex.test(VERSION);
}

export default class WelcomePageComponent extends Component {
  get rootURL() {
    const config = getOwner(this).factoryFor('config:environment');

    if (config) {
      return config.class.rootURL;
    }

    return '/';
  }

  get emberVersion() {
    if (isLatestVersion()) {
      return 'current';
    }

    const [majorVersion, minorVersion] = VERSION.split('.');
    const emberVersion = `${majorVersion}.${minorVersion}.0`;

    return emberVersion;
  }

  get urlForEmberGuides() {
    if (isLatestVersion()) {
      return `https://guides.emberjs.com/current`;
    }

    const [majorVersion, minorVersion] = VERSION.split('.');
    const emberVersion = `${majorVersion}.${minorVersion}.0`;

    return `https://guides.emberjs.com/v${emberVersion}`;
  }
}
