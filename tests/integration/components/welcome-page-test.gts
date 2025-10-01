import { findAll, render } from '@ember/test-helpers';
import { VERSION } from '@ember/version';
import { a11yAudit } from 'ember-a11y-testing/addon-test-support';
import { module, test } from 'qunit';
import semver from 'semver';
import { setupRenderingTest } from 'ember-qunit';

// @ts-expect-error cannot find module or types?
import WelcomePage from 'ember-welcome-page/components/welcome-page';

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
    await render(<template><WelcomePage /></template>);

    assert
      .dom('.tomster img')
      .hasAttribute(
        'alt',
        'Under construction',
        'The image has an alternate text.',
      )
      .hasAttribute('src', /.*\.png/, 'The image source is correct.');

    const links = findAll('ul a');
    const linkToQuickStart = links[0];
    const linkToTutorial = links[1];

    const currentVersion = getCurrentVersion();

    assert
      .dom(linkToQuickStart)
      .hasAttribute(
        'href',
        `https://guides.emberjs.com/${currentVersion}/getting-started/quick-start/`,
        'We see the correct link for the Quick Start.',
      )
      .hasText('Quick Start', 'We see the correct label for the Quick Start.');

    assert
      .dom(linkToTutorial)
      .hasAttribute(
        'href',
        `https://guides.emberjs.com/${currentVersion}/tutorial/`,
        'We see the correct link for the Tutorial.',
      )
      .hasText('Tutorial', 'We see the correct label for the Tutorial.');

    const codeSnippets = findAll('code');
    const usage = codeSnippets[0];
    const path = codeSnippets[1];

    assert
      .dom(usage)
      .hasText(
        '<WelcomePage />',
        'The usage example has not extension argument',
      );

    assert
      .dom(path)
      .hasText(
        'app/templates/application.hbs',
        'The application template path has the default extension',
      );
  });

  test('it renders with custom extension argument', async function (assert) {
    await render(<template><WelcomePage @extension="gts" /></template>);

    const codeSnippets = findAll('code');
    const usage = codeSnippets[0];
    const path = codeSnippets[1];

    assert
      .dom(usage)
      .hasText(
        '<WelcomePage @extension="gts" />',
        'The usage example has the correct extension argument',
      );

    assert
      .dom(path)
      .hasText(
        'app/templates/application.gts',
        'The application template path has the correct extension',
      );
  });

  test('it passes accessibility audit', async function (assert) {
    await render(<template><WelcomePage /></template>);

    // @ts-expect-error this.element doesn't exist? but it works?
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    await a11yAudit(this.element, {
      rules: {
        // we detect the qunit main during testsing so this is a false positive
        'landmark-no-duplicate-main': {
          enabled: false,
        },
      },
    });

    assert.ok(true, 'We passed the accessibility audit.');
  });
});
