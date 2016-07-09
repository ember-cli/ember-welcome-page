import Ember from 'ember';

const { Route, VERSION } = Ember;

export default Route.extend({
  model() {
    return {
      version: VERSION.replace(/(\d).(\d).\d/, '$1.$2.0')
    }
  }
});
