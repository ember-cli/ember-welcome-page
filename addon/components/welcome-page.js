import Ember from 'ember';
import layout from '../templates/components/welcome-page';

export default Ember.Component.extend({
  layout,

  emberVersion: Ember.computed(function() {
    let [ major, minor ] = Ember.VERSION.split(".");

    return `${major}.${minor}.0`;
  }),

  canAngleBracket: Ember.computed(function() {
    let [ major, minor ] = Ember.VERSION.split(".");
    return parseFloat(`${major}.${minor}`) >= 3.4;
  }),

  isModuleUnification: Ember.computed(function() {
    const config = Ember.getOwner(this).resolveRegistration('config:environment');

    return config && config.isModuleUnification;
  })
});
