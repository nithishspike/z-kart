import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('horizontal-scroll-items', 'Integration | Component | horizontal scroll items', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{horizontal-scroll-items}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#horizontal-scroll-items}}
      template block text
    {{/horizontal-scroll-items}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
