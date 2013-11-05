require('sugar');
var basename = require('path').basename;

/**
 * Add additional constraints to Brunch's ignored setting using tests. Tests
 * can be any of the following:
 *    Function: Return true to ignore
 *    RegExp:   Match to ignore
 *    String:   Equal to ignore
 * @param {Object} config
 * @param {...(Function|RegExp|String)} tests
 */
exports.addIgnored = function(config) {
  if(!config.conventions) {
    config.conventions = {};
  }

  // Get original ignored function and all given tests
  var ignored = config.conventions.ignored;
  var tests = Array.prototype.slice.call(arguments, 1);

  // Set up the new ignored function
  config.conventions.ignored = function(file) {
    // Check if any of the given tests pass
    for(var index = 0, test = tests[index]; index < tests.length; index++) {
      if(test === file) {
        return true;
      }
      if(Object.isFunction(ignored) && test(file)) {
        return true;
      }
      if(Object.isRegExp(ignored) && test.test(file)) {
        return true;
      }
    }

    // Otherwise, delegate to the original ignored declaration
    if(Object.isFunction(ignored)) {
      return ignored(file);
    }
    if(Object.isRegExp(ignored)) {
      return ignored.test(file);
    }

    // This is the default test if any of the previous tests fail
    return basename(file).indexOf('_') === 0;
  };
}
