var expect = require('chai').expect;
var _ = require('lodash');
var Lore = require('../../src/app/index');
var config = {
  hooks: require('../defaultHooks')
};

describe('lore#build', function() {
  var lore = null;

  beforeEach(function() {
    lore = new Lore();
    lore.build(config);
  });

  describe('expected properties', function() {

    it("should list the current version", function() {
      expect(lore).to.include.keys([
        'version',
        'majorVersion',
        'minorVersion',
        'patchVersion',
        'dependencies'
      ]);
    });

    it("should list the core hooks", function() {
      expect(lore.hooks).to.include.keys([
        'actions',
        'bindActions',
        'collections',
        'connect',
        'connections',
        'models',
        'reducers',
        'redux'
      ]);
    });

    it("should have an empty models object", function() {
      expect(lore.models).to.be.an('object');
      expect(_.keys(lore.models).length).to.equal(0);
    });

    it("should have an empty collections object", function() {
      expect(lore.collections).to.be.an('object');
      expect(_.keys(lore.collections).length).to.equal(0);
    });

    it("should have an empty actions object", function() {
      expect(lore.actions).to.be.an('object');
      expect(_.keys(lore.actions).length).to.equal(0);
    });

    it("should have an empty reducers object", function() {
      expect(lore.reducers).to.be.an('object');
      expect(_.keys(lore.reducers).length).to.equal(0);
    });

    it('should have a loader object', function() {
      expect(lore.loader).to.be.an('object');
      expect(lore.loader).to.include.keys([
        'loadUserConfig',
        'loadModels',
        'loadCollections',
        'loadActions',
        'loadReducers'
      ]);
    });
  });

});

