import Ember from 'ember';
import layout from '../templates/components/welcome-page';
import AppDependencyDescriptors from '../-app-dependency-descriptors';

export default Ember.Component.extend({
  layout,

  dependencies: AppDependencyDescriptors,

  emberVersion: Ember.computed(function() {
    let [ major, minor ] = Ember.VERSION.split(".");

    return `${major}.${minor}.0`;
  })
});
