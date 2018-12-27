var nx = require('next-js-core2');
var NxGroup = require('../src/next-group');

test('test data group api:set/get/setItem/getItem', () => {
  var dataGroup = new NxGroup('sex', (item) => {
    return 'tid_' + item.name + '_' + item.sex;
  });
  dataGroup.add({ name: 'a', sex: 'male' });
  dataGroup.add({ name: 'b', sex: 'male' });
  dataGroup.add({ name: 'c', sex: 'female' });
  dataGroup.add({ name: 'd', sex: 'female' });
  dataGroup.add({ name: 'e', sex: 'male' });
  dataGroup.add({ name: 'f', sex: 'female' });

  dataGroup.update('male', {
    desc: 'woman group'
  });

  dataGroup.update('female', {
    desc: 'man group'
  });

  expect(dataGroup.maps.group.male.desc).toBe('woman group');
  expect(dataGroup.maps.group.female.desc).toBe('man group');
});
