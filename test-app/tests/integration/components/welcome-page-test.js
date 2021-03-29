/* eslint-disable ember/new-module-imports */
import Ember from 'ember';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | welcome page', function (hooks) {
  setupRenderingTest(hooks);

  test('it links to version for release version', async function (assert) {
    debugger;
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    Ember.VERSION = '3.1.5';

    await render(hbs`<WelcomePage/>`);

    let [emberMajor, emberMinor] = Ember.VERSION.split('.');
    let [welcomeMajor, welcomeMinor, welcomePatch] = this.element
      .querySelector('[data-ember-version]')
      .dataset.emberVersion.split('.');

    assert.equal(
      emberMajor,
      welcomeMajor,
      'Major segment of version should match.'
    );
    assert.equal(
      emberMinor,
      welcomeMinor,
      'Minor segment of version should match.'
    );
    assert.equal('0', welcomePatch, 'Patch segment of version should be 0.');
  });

  test('it links to "/current" for alpha versions', async function (assert) {
    // Set the version property
    Ember.VERSION = '2.15.0-alpha.1';

    await render(hbs`<WelcomePage/>`);

    let versionText = this.element.querySelector('[data-ember-version]').dataset
      .emberVersion;

    assert.equal(
      versionText,
      'current',
      "Version text should be set to 'current' when an alpha version is used."
    );
  });

  test('it links to "/current" for beta versions', async function (assert) {
    // Set the version property
    Ember.VERSION = '2.15.0-beta.1';

    await render(hbs`<WelcomePage/>`);

    let versionText = this.element.querySelector('[data-ember-version]').dataset
      .emberVersion;

    assert.equal(
      versionText,
      'current',
      "Version text should be set to 'current' when a beta version is used."
    );
  });

  test('it links to "/current" for master', async function (assert) {
    // Set the version property
    Ember.VERSION = 'master';

    await render(hbs`<WelcomePage/>`);

    let versionText = this.element.querySelector('[data-ember-version]').dataset
      .emberVersion;

    assert.equal(
      versionText,
      'current',
      "Version text should be set to 'current' when master is used."
    );
  });
});
