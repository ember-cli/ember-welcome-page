import { visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'test-app/tests/helpers';

module('Acceptance | template-tag', function (hooks) {
  setupApplicationTest(hooks);

  test('We can visit the template-tag route', async function (assert) {
    await visit('/');

    assert.ok(true, 'The <WelcomePage> component rendered without an issue.');
  });
});
