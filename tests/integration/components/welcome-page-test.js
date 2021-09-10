import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { VERSION } from '@ember/version';
import { hbs } from 'ember-cli-htmlbars';
import semver from 'semver';

module('Integration | Component | welcome page', function (hooks) {
  setupRenderingTest(hooks);

  test('it links to correct docs for the version of ember', async function (assert) {
    /* eslint-disable qunit/no-conditional-assertions qunit/require-expect */
    await render(hbs`<WelcomePage/>`);

    if (semver.valid(VERSION) && !semver.prerelease(VERSION)) {
      let [emberMajor, emberMinor] = VERSION.split('.');
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
      assert.equal(welcomePatch, '0', 'Patch segment of version should be 0.');
    } else {
      let versionText = this.element.querySelector('[data-ember-version]')
        .dataset.emberVersion;

      assert.equal(
        versionText,
        'current',
        "Version text should be set to 'current' when a non-stable release is used."
      );
    }
  });
});
