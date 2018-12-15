(function() {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('next-js-core2');
  var FUNC = 'function';

  /*
  
  var groups = [
    {
      id:'g1',
      items:[ data1, data2 ]
    },
    {
      id:'g2',
      items:[ data3, data4 ]
    }
  ]

  mutexGroup
  next-mutext-group
  */

  var NxGroup = nx.declare('nx.Group', {
    propteries: {
      items: {
        get: function() {
          var result = [];
          return this._groups.reduce(function(group1, group2) {
            return result.concat(group1.items, group2.items);
          });
        }
      },
      maps: {
        get: function() {}
      },
      groups: {
        get: function() {
          return this._groups;
        }
      },
      length: {
        get: function() {
          return this._groups.length;
        }
      }
    },
    methods: {
      init: function(inData, inId) {
        this.data = inData;
        this.id = inId;
        this._groups = [];
      },
      get: function(inId) {
        var index = this.index(inId);
        return index === -1 ? null : this._groups[index];
      },
      getId: function(inItem) {
        return typeof this.id === FUNC ? this.id(inItem) : inItem[this.id];
      },
      indexOf: function(inId) {
        var index = -1;
        for (var i = 0; i < this._groups.length; i++) {
          var group = this._groups[i];
          if (group.id === inId) {
            index = i;
            break;
          }
        }
        return index;
      },
      contains: function(inItem) {
        return this.items.indexOf(inItem) > -1;
      },
      add: function(inItem) {
        var id = this.getId(inItem);
        var gIndex = this.indexOf(id);
        if (gIndex === -1) {
          this._groups.push({ id: id, items: [inItem] });
        } else {
          this._groups[gIndex].items.push(inItem);
        }
      },
      remove: function(inItem) {
        var id = this.getId(inItem);
        var gIndex = this.indexOf(id);
        if (gIndex !== -1) {
          var iIndex = this._groups[gIndex].items.indexOf(inItem);
          this._groups[gIndex].items.splice(iIndex, 1);
          if (this._groups[gIndex].items.length === 0) {
            this._groups.splice(gIndex, 1);
          }
        }
      },
      toggle: function(inItem) {
        if (this.contains(inItem)) {
          this.remove(inItem);
        } else {
          this.add(inItem);
        }
      }
    }
  });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxGroup;
  }
})();
