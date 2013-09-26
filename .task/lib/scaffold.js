'use strict';

require('sugar');
var Q = require('q');
var prompt = require('promptly').prompt;
var execute = require('./execute');
var scaffold = module.exports = Object.create(execute);

scaffold.command = './node_modules/.bin/scaffolt';

scaffold.generate = function(name, destroy) {
  var self = this;

  // If we have a given name, run the scaffold. Otherwise prompt the user
  // for a name first.
  if(name) {
    return execute(name);
  }
  else {
    return this.prompt().done(execute);
  }

  // Callback for prompt. Execute scaffolt to generate or destroy.
  function execute(name) {
    var args = [self.name, name];
    if(destroy) {
      args.push('--revert');
    }
    return self.execute(args);
  }
};

// Alias for generate, but destroys automatically
scaffold.destroy = function(name) {
  this.generate.call(this, name, true);
};

// Prompt command wrapped in a Q promise
scaffold.prompt = function() {
  var self = this;
  var deferred = Q.defer();
  prompt(this.promptString(), {validator: this.validate.bind(this)}, function(err, name) {
    if(err) {
      deferred.reject(err);
    }
    else {
      deferred.resolve(name.parameterize().dasherize());
    }
  });
  return deferred.promise;
};

// Default prompt message for input
scaffold.promptString = function(name) {
  if(name == null) {
    name = this.name.underscore().humanize().toLowerCase();
  }
  return '\nEnter name for ' + name + ': ';
};

scaffold.validate = function(name) {
  return !name.parameterize().isBlank();
};