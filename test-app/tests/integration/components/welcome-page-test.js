import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | welcome page', function (hooks) {
  setupRenderingTest(hooks);

  test('it links to version for release version', async function (assert) {
    await render(hbs`<WelcomePage @emberVersion="3.1.5" />`);

    let emberMajor = 3;
    let emberMinor = 1;
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
    await render(hbs`<WelcomePage @emberVersion="2.15.0-alpha.1" />`);

    let versionText = this.element.querySelector('[data-ember-version]').dataset
      .emberVersion;

    assert.equal(
      versionText,
      'current',
      "Version text should be set to 'current' when an alpha version is used."
    );
  });

  test('it links to "/current" for beta versions', async function (assert) {
    await render(hbs`<WelcomePage @emberVersion="2.15.0-beta.1" />`);

    let versionText = this.element.querySelector('[data-ember-version]').dataset
      .emberVersion;

    assert.equal(
      versionText,
      'current',
      "Version text should be set to 'current' when a beta version is used."
    );
  });

  test('it links to "/current" for master', async function (assert) {
    await render(hbs`<WelcomePage @emberVersion="master" />`);

    let versionText = this.element.querySelector('[data-ember-version]').dataset
      .emberVersion;

    assert.equal(
      versionText,
      'current',
      "Version text should be set to 'current' when master is used."
    );
  });
});
