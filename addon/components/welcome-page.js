import { getOwner } from '@ember/application';
import { VERSION } from '@ember/version';
import { computed } from '@ember/object';
// eslint-disable-next-line ember/no-classic-components
import Component from '@ember/component';
import layout from '../templates/components/welcome-page';
import { gte } from 'ember-compatibility-helpers';

// eslint-disable-next-line ember/no-classic-classes,ember/require-tagless-components
export default Component.extend({
  layout,

  isCurrent: computed(function () {
    let stableRegex = /^\d+\.\d+\.\d+$/;
    return !stableRegex.test(VERSION);
  }),

  canAngleBracket: computed(function () {
    return gte('3.4.0');
  }),

  rootURL: computed(function () {
    let config = getOwner(this).factoryFor('config:environment');

    if (config) {
      return config.class.rootURL;
    } else {
      return '/';
    }
  }),

  emberVersion: computed('isCurrent', function () {
    let isCurrent = this.isCurrent;

    if (isCurrent) {
      return 'current';
    } else {
      let [major, minor] = VERSION.split('.');
      return `${major}.${minor}.0`;
    }
  }),
});
