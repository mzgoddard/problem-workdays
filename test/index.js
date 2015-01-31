const expect = require('chai').expect;

const workdays = require('..');

const fixtures = {
  add: require('./fixtures.add'),
  subtract: require('./fixtures.subtract'),
};

describe('workdays', function() {

  createTests('add', +1);
  createTests('subtract', -1);

});

function createTests(name, sign) {
  describe(name, function() {
    for (var key in fixtures[name]) {
      var dayOfWeek = fixtures[name][key];
      var start = dayOfWeek[0];
      for (var index in dayOfWeek) {
        (function(start, increment, result) {
          eval([
            'it(\'add ' + increment + ' to ' + start + ' == ' + result + '\', function() {',
            '  expect(workdays(\'' + start + '\', ' + increment + '))' +
              '.to.equal(\'' + result + '\');',
            '});'
          ].join('\n'));
        }(start, index * sign, dayOfWeek[index]));
      }
    }
  });
}
