var nx = require('next-js-core2');
var NxGroup = require('../src/next-group');

test('test data group', () => {
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

  // remove:
  dataGroup.remove({ name: 'a', sex: 'male' });
  dataGroup.remove({ name: 'b', sex: 'male' });
  dataGroup.remove({ name: 'e', sex: 'male' });
  // expect(dataGroup.items.length).toBe(5);
  // expect(dataGroup.groups.length).toBe(2);

  // dataGroup.remove({ name: 'e', sex: 'female' });

  console.log(dataGroup);

  // expect(dataGroup.items.length).toBe(5);
  // expect(dataGroup.groups.length).toBe(2);
});
