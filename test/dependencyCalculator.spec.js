const test = require('tape');
const Calculator = require('./dependencyCalculator.js');

test('Initializing a dependency calculator', function(t) {
    var calc = new Calculator();
    calc.addDirect('A', ['B', 'C']);
    calc.addDirect('B', ['C', 'E']);
    calc.addDirect('C', ['G']);
    calc.addDirect('D', ['A', 'F']);
    calc.addDirect('E', ['F']);
    calc.addDirect('F', ['H']);
    t.plan(6);
    t.same(calc.dependenciesFor('A'), ['B', 'C', 'E', 'G', 'F', 'H'])
    t.same(calc.dependenciesFor('B'), ['C', 'E', 'G', 'F', 'H'])
    t.same(calc.dependenciesFor('C'), ['G'])
    t.same(calc.dependenciesFor('D'), ['A', 'F', 'B', 'C', 'E', 'G', 'H'])
    t.same(calc.dependenciesFor('E'), ['F', 'H'])
    t.same(calc.dependenciesFor('F'), ['H'])


})
