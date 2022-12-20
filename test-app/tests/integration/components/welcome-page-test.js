import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { findAll, render } from '@ember/test-helpers';
import { VERSION } from '@ember/version';
import { hbs } from 'ember-cli-htmlbars';
import semver from 'semver';

function getCurrentVersion() {
  if (semver.valid(VERSION) && !semver.prerelease(VERSION)) {
    const [majorVersion, minorVersion] = VERSION.split('.');

    return `v${majorVersion}.${minorVersion}.0`;
  }

  return 'release';
}

module('Integration | Component | welcome-page', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`<WelcomePage/>`);

    const links = findAll('a');
    const linkToQuickStart = links[0];
    const linkToTutorial = links[1];

    const currentVersion = getCurrentVersion();

    assert
      .dom(linkToQuickStart)
      .hasAttribute(
        'href',
        `https://guides.emberjs.com/${currentVersion}/getting-started/quick-start/`,
        'We see the correct link for the Quick Start.'
      )
      .hasText('Quick Start', 'We see the correct label for the Quick Start.');

    assert
      .dom(linkToTutorial)
      .hasAttribute(
        'href',
        `https://guides.emberjs.com/${currentVersion}/tutorial/`,
        'We see the correct link for the Tutorial.'
      )
      .hasText('Tutorial', 'We see the correct label for the Tutorial.');
  });
});
