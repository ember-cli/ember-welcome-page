import { getOwner } from '@ember/application';
import { VERSION } from '@ember/version';
import { computed, get } from '@ember/object';
import Component from '@ember/component';
import layout from '../templates/components/welcome-page';
import { gte } from 'ember-compatibility-helpers';

export default Component.extend({
  layout,

  isCurrent: computed(function() {
    let stableRegex = /^\d+\.\d+\.\d+$/
    return !stableRegex.test(VERSION);
  }),

  canAngleBracket: computed(function() {
    return gte('3.4.0');
  }),

  isModuleUnification: computed(function() {
    const config = getOwner(this).resolveRegistration('config:environment');

    return config && config.isModuleUnification;
  }),

  rootURL: computed(function() {
    let config = getOwner(this).factoryFor('config:environment');

    if (config) {
      return config.class.rootURL;
    } else {
      return '/';
    }
  }),

  emberVersion: computed('isCurrent', function() {
    let isCurrent = get(this, 'isCurrent');

    if (isCurrent) {
      return 'current';
    } else {
      let [ major, minor ] = VERSION.split(".");
      return `${major}.${minor}.0`;
    }
  })
});
