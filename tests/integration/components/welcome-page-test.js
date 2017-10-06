import { VERSION } from '@ember/version';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const emberVersion = VERSION;

moduleForComponent('welcome-page', 'Integration | Component | welcome page', {
  integration: true,
  beforeEach() {
    VERSION = emberVersion;
  }
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

test('it links to "/current" for alpha versions', function(assert) {
  // Set the version property
  VERSION = '2.15.0-alpha.1';

  this.render(hbs`{{welcome-page}}`);

  let versionText = this.$('[data-ember-version]').data('ember-version');

  assert.equal(versionText, 'current', "Version text should be set to 'current' when an alpha version is used.");
});

test('it links to "/current" for beta versions', function(assert) {
  // Set the version property
  VERSION = '2.15.0-beta.1';

  this.render(hbs`{{welcome-page}}`);

  let versionText = this.$('[data-ember-version]').data('ember-version');

  assert.equal(versionText, 'current', "Version text should be set to 'current' when a beta version is used.");
});

test('it links to "/current" for master', function(assert) {
  // Set the version property
  VERSION = 'master';

  this.render(hbs`{{welcome-page}}`);

  let versionText = this.$('[data-ember-version]').data('ember-version');

  assert.equal(versionText, 'current', "Version text should be set to 'current' when master is used.");
});
