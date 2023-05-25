import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupRenderingTest } from 'test-app/tests/helpers';
import { module, test } from 'qunit';

module(
  'Integration | Component | welcome-page-in-template-tag',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it renders', async function (assert) {
      await render(hbs`
        <WelcomePageInTemplateTag />
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
    });
  }
);
