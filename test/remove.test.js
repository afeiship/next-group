var nx = require('next-js-core2');
var NxGroup = require('../src/next-group');

test('test data group api:remove', () => {
    var dataGroup = new NxGroup('sex', (item) => {
        return 'tid_' + item.name + '_' + item.sex;
    });
    dataGroup.add({ name: 'a', sex: 'male' });
    dataGroup.add({ name: 'b', sex: 'male' });
    dataGroup.add({ name: 'c', sex: 'female' });
    dataGroup.add({ name: 'd', sex: 'female' });
    dataGroup.add({ name: 'e', sex: 'male' });
    dataGroup.add({ name: 'f', sex: 'female' });

    // before:
    expect(dataGroup.maps.group.male.length).toBe(3);
    expect(dataGroup.maps.group.female.length).toBe(3);

    // remove an exsist:
    dataGroup.remove({ name: 'b', sex: 'male' });
    dataGroup.remove({ name: 'f', sex: 'female' });

    // after:
    expect(dataGroup.maps.group.male.length).toBe(2);
    expect(dataGroup.maps.group.female.length).toBe(2);
});
