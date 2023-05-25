import { findAll, render } from '@ember/test-helpers';
import { VERSION } from '@ember/version';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import semver from 'semver';
import { setupRenderingTest } from 'test-app/tests/helpers';

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
    await render(hbs`
      <WelcomePage />
    `);

    assert
      .dom('.tomster img')
      .hasAttribute(
        'alt',
        'Under construction',
        'The image has an alternate text.'
      )
      .hasAttribute(
        'src',
        '/ember-welcome-page/images/construction.png',
        'The image source is correct.'
      );

    const links = findAll('ul a');
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

  test('it passes accessibility audit', async function (assert) {
    await render(hbs`
      <WelcomePage />
    `);

    await a11yAudit();

    assert.ok(true, 'We passed the accessibility audit.');
  });
});
