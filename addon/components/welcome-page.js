import Ember from 'ember';
import layout from '../templates/components/welcome-page';
import { gte } from 'ember-compatibility-helpers';

export default Ember.Component.extend({
  layout,

  emberVersion: Ember.computed(function() {
    let [ major, minor ] = Ember.VERSION.split(".");

    return `${major}.${minor}.0`;
  }),

  canAngleBracket: Ember.computed(function() {
    return gte('3.4.0');
  }),

  isModuleUnification: Ember.computed(function() {
    const config = Ember.getOwner(this).resolveRegistration('config:environment');

    return config && config.isModuleUnification;
  }),

  rootURL: Ember.computed(function() {
    let config = Ember.getOwner(this).factoryFor('config:environment');

    if (config) {
      return config.class.rootURL;
    } else {
      return '/';
    }
  })
});
