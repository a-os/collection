'use strict';

/* global CollectionsDatabase, MockDatastore, MockNavigatorDatastore */

require('/shared/unit_test_mocks/mock_navigator_datastore.js');
require('/shared/uuid/uuid.js');
require('/shared/collections_database/collections_database.js');

suite('collections_database.js >', function() {

  var realDatastore;

  suiteSetup(function() {
    realDatastore = navigator.getDataStores;
  });

  suiteTeardown(function() {
    navigator.getDataStores = realDatastore;
  });

  setup(function() {
    navigator.getDataStores = MockNavigatorDatastore.getDataStores;
  });

  teardown(function() {
    MockDatastore._inError = false;
    MockDatastore._records = Object.create(null);
  });

  test('calling to add multiple times will create records', function(done) {
    CollectionsDatabase.add({name: 'everything.me'})
    .then(function(value) {
      assert.isTrue(value);
    });

    CollectionsDatabase.add({name: 'mozilla'})
    .then(function(value) {
      assert.isTrue(value);
      done();
    });
  });

  test('verify that same id does not create multiple records', function(done) {
    CollectionsDatabase.add({name: 'everything.me', id: 123})
    .then(function(value) {
      assert.isTrue(value);
    });

    CollectionsDatabase.add({name: 'mozilla', id: 123})
    .then(function(value) {
      assert.isTrue(!value);
      done();
    });
  });

});
