import F from 'funcunit';
import QUnit from 'steal-qunit';

import 'avx-token-app/models/test';

F.attach(QUnit);

QUnit.module('avx-token-app functional smoke test', {
  beforeEach() {
    F.open('./development.html');
  }
});

QUnit.test('avx-token-app main page shows up', function() {
  F('title').text('avx-token-app', 'Title is set');
});
