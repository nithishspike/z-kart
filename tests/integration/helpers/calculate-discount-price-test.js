
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('calculate-discount-price', 'helper:calculate-discount-price', {
  integration: true
});

// Replace this with your real tests.
test('it renders', function(assert) {
  this.set('inputValue', '1234');

  this.render(hbs`{{calculate-discount-price inputValue}}`);

  assert.equal(this.$().text().trim(), '1234');
});

