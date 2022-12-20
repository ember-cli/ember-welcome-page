import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { findAll, render } from '@ember/test-helpers';
import { VERSION } from '@ember/version';
import { hbs } from 'ember-cli-htmlbars';
import semver from 'semver';

module('Integration | Component | welcome-page', function (hooks) {
  setupRenderingTest(hooks);

  if (semver.valid(VERSION) && !semver.prerelease(VERSION)) {
    test('it renders', async function (assert) {
      await render(hbs`<WelcomePage/>`);

      const links = findAll('a');
      const linkToQuickStart = links[0];
      const linkToTutorial = links[1];

      const [majorVersion, minorVersion] = VERSION.split('.');

      assert
        .dom(linkToQuickStart)
        .hasAttribute(
          'href',
          `https://guides.emberjs.com/v${majorVersion}.${minorVersion}.0/getting-started/quick-start/`,
          'We see the correct link for the Quick Start.'
        )
        .hasText(
          'Quick Start',
          'We see the correct label for the Quick Start.'
        );

      assert
        .dom(linkToTutorial)
        .hasAttribute(
          'href',
          `https://guides.emberjs.com/v${majorVersion}.${minorVersion}.0/tutorial/`,
          'We see the correct link for the Tutorial.'
        )
        .hasText('Tutorial', 'We see the correct label for the Tutorial.');
    });
  } else {
    test('it renders (the app runs on the latest Ember version)', async function (assert) {
      await render(hbs`<WelcomePage/>`);

      const links = findAll('a');
      const linkToQuickStart = links[0];
      const linkToTutorial = links[1];

      assert
        .dom(linkToQuickStart)
        .hasAttribute(
          'href',
          'https://guides.emberjs.com/release/getting-started/quick-start/',
          'We see the correct link for the Quick Start.'
        )
        .hasText(
          'Quick Start',
          'We see the correct label for the Quick Start.'
        );

      assert
        .dom(linkToTutorial)
        .hasAttribute(
          'href',
          'https://guides.emberjs.com/release/tutorial/',
          'We see the correct link for the Tutorial.'
        )
        .hasText('Tutorial', 'We see the correct label for the Tutorial.');
    });
  }
});
