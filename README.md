# next-group
> A basic group data structure

## install:
```shell
npm install -S afeiship/next-group
```

## apis:
| api          | args                      | description                                    |
|--------------|---------------------------|------------------------------------------------|
| add          | item                      | add an item to group                           |
| remove       | item                      | remove an item from group                      |
| toggleBy     | item, value               | toggle by the value [true: add; false: remove] |
| toggle       | item                      | toggle the item                                |
| gid          | item                      | get the item groupId                           |
| tid          | item                      | get the item itemId                            |
| indexOf      | key(gid/tid), items, item | get the item's index of the items              |
| indexOfGroup | item                      | get the item's index of the group              |
| contains     | item                      | check if the item is in the group              |

## usage:
```js
import NxGroup from 'next-group';

const dataGroup = new NxGroup('sex', (item) => {
    return 'tid_' + item.name + '_' + item.sex;
});

dataGroup.add({ name: 'a', sex: 'male' });
dataGroup.add({ name: 'b', sex: 'male' });
dataGroup.add({ name: 'c', sex: 'female' });
dataGroup.add({ name: 'd', sex: 'female' });
dataGroup.add({ name: 'e', sex: 'male' });
dataGroup.add({ name: 'f', sex: 'female' });
```