import { getOwner } from '@ember/application';
/* @ts-expect-error: Cannot find module '@ember/version' or its corresponding type declarations. */
import { VERSION } from '@ember/version';
import Component from '@glimmer/component';
import './welcome-page.css';

function isLatestVersion(): boolean {
  const stableRegex = /^\d+\.\d+\.\d+$/;

  return !stableRegex.test(VERSION as string);
}

/* eslint-disable-next-line @typescript-eslint/no-empty-interface */
interface WelcomePageComponentSignature {}

export default class WelcomePageComponent extends Component<WelcomePageComponentSignature> {
  get rootURL(): string {
    const config = getOwner(this).factoryFor('config:environment');

    if (config) {
      return (config.class as unknown as { rootURL: string }).rootURL;
    }

    return '/';
  }

  get urlForEmberGuides(): string {
    if (isLatestVersion()) {
      return `https://guides.emberjs.com/release`;
    }

    const [majorVersion, minorVersion] = (VERSION as string).split('.');
    const emberVersion = `${majorVersion}.${minorVersion}.0`;

    return `https://guides.emberjs.com/v${emberVersion}`;
  }
}
