import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | addon works without application.hbs');

test('visiting / with the addon installed and no application.hbs file shows our welcome splash page', function(assert) {

  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/');
    assert.equal(find('h2#title').text(), "Congratulations, you made it!");
  });
});
