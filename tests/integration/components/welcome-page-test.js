import { VERSION } from '@ember/version';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('welcome-page', 'Integration | Component | welcome page', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{welcome-page}}`);

  let [ emberMajor, emberMinor ] = VERSION.split('.');
  let [ welcomeMajor, welcomeMinor, welcomePatch ] = this.$('[data-ember-version]').data('ember-version').split('.');

  assert.equal(emberMajor, welcomeMajor, "Major segment of version should match.");
  assert.equal(emberMinor, welcomeMinor, "Minor segment of version should match.");
  assert.equal("0", welcomePatch, "Patch segment of version should be 0.");
});
