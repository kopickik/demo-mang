const _ = require('underscore')

class DependencyCalculator {
  constructor(name='Default') {
    this.name = name;
    this.dependencies = [];
  }

  addDirect(dep, deps) {
    this.dependencies.push({name: dep, dependencies: deps});
  }

  dependenciesFor(name) {
    var lookup = {};
    for (var i = 0, len = this.dependencies.length; i < len; i++) {
      lookup[this.dependencies[i].name] = this.dependencies[i];
    }

    this.fullDependencies(lookup, name);
    return lookup[name].dependencies;
  }

  fullDependencies(lookup, name) {
    var result = lookup[name].dependencies;
    function getDeps(dep) {
      if (!lookup[dep]) {
        return;
      }
      return lookup[dep].dependencies
    }
    function mapDeps(arr) {
      return _.map(arr, function(thing) {
        arr.push(getDeps(thing))
      })
    }
    mapDeps(result);// loop 1 (A's deps)
    result = _.compact(_.uniq(_.flatten(result)));
    mapDeps(result)// loop 2 ([B, C]'s deps)
    result = _.compact(_.uniq(_.flatten(result)));
    mapDeps(result)// loop 3 (...'s deps)
    result = _.compact(_.uniq(_.flatten(result)));
    lookup[name].dependencies = result;
  }
}

module.exports = DependencyCalculator
