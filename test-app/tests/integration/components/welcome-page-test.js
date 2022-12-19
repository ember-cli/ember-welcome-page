import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { find, render } from '@ember/test-helpers';
import { VERSION } from '@ember/version';
import { hbs } from 'ember-cli-htmlbars';
import semver from 'semver';

module('Integration | Component | welcome-page', function (hooks) {
  setupRenderingTest(hooks);

  if (semver.valid(VERSION) && !semver.prerelease(VERSION)) {
    test('it renders', async function (assert) {
      await render(hbs`<WelcomePage/>`);

      const element = find('[data-ember-version]');
      const { emberVersion } = element.dataset;

      const [emberMajor, emberMinor] = VERSION.split('.');

      assert.strictEqual(
        emberVersion,
        `${emberMajor}.${emberMinor}.0`,
        'We see the correct Ember version.'
      );
    });
  } else {
    test('it renders (the app runs on the latest Ember version)', async function (assert) {
      await render(hbs`<WelcomePage/>`);

      const element = find('[data-ember-version]');
      const { emberVersion } = element.dataset;

      assert.strictEqual(
        emberVersion,
        'current',
        'We see the correct Ember version.'
      );
    });
  }
});
