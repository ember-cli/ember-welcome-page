import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | addon works with application.hbs', {
  //beforeEach() {
  //  $.post('/welcome-add-application-hbs', function(data) {
  //    console.log(data.status);
  //  });
  //}
});

test('visiting / with the addon installed and a application.hbs file does not show the welcome page', function(assert) {

  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/');
    assert.equal(find('h2#title').text(), "Welcome to Ember!");
  });
});
