var nx = require('next-js-core2');
var NxGroup = require('../src/next-group');

test('test data group api:add', () => {
  var dataGroup = new NxGroup('sex', (item) => {
    return 'tid_' + item.name + '_' + item.sex;
  });
  dataGroup.add({ name: 'a', sex: 'male' });
  dataGroup.add({ name: 'b', sex: 'male' });
  dataGroup.add({ name: 'c', sex: 'female' });
  dataGroup.add({ name: 'd', sex: 'female' });
  dataGroup.add({ name: 'e', sex: 'male' });
  dataGroup.add({ name: 'f', sex: 'female' });

  // console.log(dataGroup);
  expect(dataGroup.items.length).toBe(6);
  expect(dataGroup.groups.length).toBe(2);

  //gid & tid:
  expect(dataGroup.gid({ name: 'd', sex: 'female' })).toBe('female');
  expect(dataGroup.tid({ name: 'd', sex: 'female' })).toBe('tid_d_female');

  // console.log(dataGroup);

});
