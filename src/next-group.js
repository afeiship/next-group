(function() {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('next-js-core2');
  var FUNC = 'function';

  var NxGroup = nx.declare('nx.Group', {
    properties: {
      items: {
        get: function() {
          var result = [];
          this._groups.forEach(function(group) {
            result = result.concat(group.items || []);
          });
          return result;
        }
      },
      groups: {
        get: function() {
          return this._groups;
        }
      },
      maps: {
        get: function() {
          var itemMap = {};
          var groupMap = {};
          var self = this;
          nx.each(this._groups, function(_, group) {
            groupMap[group.id] = group;
            nx.each(group.items, function(__, item) {
              itemMap[self.tid(item)] = item;
            });
          });

          return {
            item: itemMap,
            group: groupMap
          };
        }
      }
    },
    methods: {
      /**
       * 接受两个参数：
       * inGroupId: 这个是 group 的唯一标识，可能是一个 any/function
       * inItemId: 这个是每个数据  item 的唯一标识，可能是一个 any/function
       * @param {*} inGroupId
       * @param {*} inItemId
       */
      init: function(inGroupId, inItemId) {
        this.groupId = inGroupId;
        this.itemId = inItemId;
        this._groups = [];
      },
      id: function(inKey, inItem) {
        return typeof this[inKey] === FUNC ? this[inKey](inItem) : inItem[this[inKey]];
      },
      gid: function(inItem) {
        return this.id('groupId', inItem);
      },
      tid: function(inItem) {
        return this.id('itemId', inItem);
      },
      indexOfGroup: function(inItem) {
        var gid = this.gid(inItem);
        for (var i = 0; i < this._groups.length; i++) {
          var group = this._groups[i];
          if (group.id === gid) {
            return i;
          }
        }
        return -1;
      },
      indexOf: function(inKey, inItems, inItem) {
        var index = -1;
        for (var i = 0; i < inItems.length; i++) {
          var item = inItems[i];
          if (this[inKey](inItem) === this[inKey](item)) {
            index = i;
            break;
          }
        }
        return index;
      },
      contains: function(inItem) {
        return this.indexOf('tid', this.items, inItem) > -1;
      },
      get: function(inGid) {
        return this.maps.group[inGid];
      },
      set: function(inGid, inItem) {
        this.maps.group[inGid] = inItem;
      },
      update: function(inGid, inObject) {
        nx.each(
          inObject,
          function(key, value) {
            this.get(inGid)[key] = value;
          },
          this
        );
      },
      add: function(inItem) {
        if (!this.contains(inItem)) {
          var gid = this.gid(inItem);
          var gIdx = this.indexOfGroup(inItem);
          if (gIdx !== -1) {
            this._groups[gIdx].items.push(inItem);
          } else {
            this._groups.push({ id: gid, items: [inItem] });
          }
        }
      },
      remove: function(inItem) {
        var gIdx = this.indexOfGroup(inItem);
        if (gIdx !== -1) {
          var group = this._groups[gIdx];
          var tIdx = this.indexOf('tid', group.items, inItem);
          if (tIdx !== -1) {
            group.items.splice(tIdx, 1);
            if (!group.items.length) {
              this._groups.splice(gIdx, 1);
            }
            return true;
          }
        }
        return false;
      },
      toggleBy: function(inItem, inValue) {
        if (inValue) {
          this.add(inItem);
        } else {
          this.remove(inItem);
        }
      },
      toggle: function(inItem) {
        this.toggleBy(inItem, !this.contains(inItem));
      }
    }
  });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxGroup;
  }
})();
