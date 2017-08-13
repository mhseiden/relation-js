'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var UNKNOWN_TYPE = 'unknown';
var NUMBER_TYPE = 'number';
var STRING_TYPE = 'string';
var BOOLEAN_TYPE = 'boolean';

function same(l, r) {
  if (l !== r) {
    throw new Error('Mismatched types: ' + l + ' !== ' + r);
  }
  return l;
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();









var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};





var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

var Expression = function () {
  function Expression(children, op) {
    classCallCheck(this, Expression);

    this.children = children;
    this.op = op;
  }

  createClass(Expression, [{
    key: 'typecheck',
    value: function typecheck(r) {
      throw new Error('typecheck() is not implemented');
    }
  }]);
  return Expression;
}();

var Aggregate$1 = function (_Expression) {
  inherits(Aggregate, _Expression);

  function Aggregate(c, op) {
    classCallCheck(this, Aggregate);

    var _this = possibleConstructorReturn(this, (Aggregate.__proto__ || Object.getPrototypeOf(Aggregate)).call(this, [c], op));

    _this.input = c;
    return _this;
  }

  return Aggregate;
}(Expression);

var LeafNode = function (_Expression2) {
  inherits(LeafNode, _Expression2);

  function LeafNode(op) {
    classCallCheck(this, LeafNode);
    return possibleConstructorReturn(this, (LeafNode.__proto__ || Object.getPrototypeOf(LeafNode)).call(this, [], op));
  }

  return LeafNode;
}(Expression);

var UnaryNode = function (_Expression3) {
  inherits(UnaryNode, _Expression3);

  function UnaryNode(c, op) {
    classCallCheck(this, UnaryNode);
    return possibleConstructorReturn(this, (UnaryNode.__proto__ || Object.getPrototypeOf(UnaryNode)).call(this, [c], op));
  }

  return UnaryNode;
}(Expression);

var BinaryNode = function (_Expression4) {
  inherits(BinaryNode, _Expression4);

  function BinaryNode(l, r, op) {
    classCallCheck(this, BinaryNode);
    return possibleConstructorReturn(this, (BinaryNode.__proto__ || Object.getPrototypeOf(BinaryNode)).call(this, [l, r], op));
  }

  return BinaryNode;
}(Expression);

var Reference = function (_LeafNode) {
  inherits(Reference, _LeafNode);

  function Reference(name) {
    classCallCheck(this, Reference);

    var _this = possibleConstructorReturn(this, (Reference.__proto__ || Object.getPrototypeOf(Reference)).call(this, 'reference'));

    _this.name = name;
    return _this;
  }

  createClass(Reference, [{
    key: 'typecheck',
    value: function typecheck(r) {
      var t = r[this.name];
      if (t == null) {
        throw new Error('Missing reference ' + this.name);
      }
      return t;
    }
  }]);
  return Reference;
}(LeafNode);

var Literal = function (_LeafNode2) {
  inherits(Literal, _LeafNode2);

  function Literal(value) {
    classCallCheck(this, Literal);

    var _this2 = possibleConstructorReturn(this, (Literal.__proto__ || Object.getPrototypeOf(Literal)).call(this, 'literal'));

    _this2.value = value;
    return _this2;
  }

  createClass(Literal, [{
    key: 'typecheck',
    value: function typecheck(r) {
      if (typeof this.value === 'number') {
        return NUMBER_TYPE;
      } else if (typeof this.value === 'string') {
        return STRING_TYPE;
      } else if (typeof this.value === 'boolean') {
        return BOOLEAN_TYPE;
      }

      return UNKNOWN_TYPE;
    }
  }]);
  return Literal;
}(LeafNode);

var Count = function (_Aggregate) {
  inherits(Count, _Aggregate);

  function Count(child) {
    classCallCheck(this, Count);
    return possibleConstructorReturn(this, (Count.__proto__ || Object.getPrototypeOf(Count)).call(this, child, 'count'));
  }

  return Count;
}(Aggregate$1);

var CountValid = function (_Aggregate2) {
  inherits(CountValid, _Aggregate2);

  function CountValid(child) {
    classCallCheck(this, CountValid);
    return possibleConstructorReturn(this, (CountValid.__proto__ || Object.getPrototypeOf(CountValid)).call(this, child, 'cvl'));
  }

  return CountValid;
}(Aggregate$1);

var Max = function (_Aggregate3) {
  inherits(Max, _Aggregate3);

  function Max(child) {
    classCallCheck(this, Max);
    return possibleConstructorReturn(this, (Max.__proto__ || Object.getPrototypeOf(Max)).call(this, child, 'max'));
  }

  return Max;
}(Aggregate$1);

var Min = function (_Aggregate4) {
  inherits(Min, _Aggregate4);

  function Min(child) {
    classCallCheck(this, Min);
    return possibleConstructorReturn(this, (Min.__proto__ || Object.getPrototypeOf(Min)).call(this, child, 'min'));
  }

  return Min;
}(Aggregate$1);

var Sum = function (_Aggregate5) {
  inherits(Sum, _Aggregate5);

  function Sum(child) {
    classCallCheck(this, Sum);
    return possibleConstructorReturn(this, (Sum.__proto__ || Object.getPrototypeOf(Sum)).call(this, child, 'sum'));
  }

  return Sum;
}(Aggregate$1);

var Eq = function (_BinaryNode) {
  inherits(Eq, _BinaryNode);

  function Eq(l, r) {
    classCallCheck(this, Eq);
    return possibleConstructorReturn(this, (Eq.__proto__ || Object.getPrototypeOf(Eq)).call(this, l, r, 'eq'));
  }

  createClass(Eq, [{
    key: 'typecheck',
    value: function typecheck(refs) {
      var l = this.children[0].typecheck(refs);
      var r = this.children[1].typecheck(refs);
      same(l, r);

      return BOOLEAN_TYPE;
    }
  }]);
  return Eq;
}(BinaryNode);

var Ne = function (_BinaryNode2) {
  inherits(Ne, _BinaryNode2);

  function Ne(l, r) {
    classCallCheck(this, Ne);
    return possibleConstructorReturn(this, (Ne.__proto__ || Object.getPrototypeOf(Ne)).call(this, l, r, 'ne'));
  }

  createClass(Ne, [{
    key: 'typecheck',
    value: function typecheck(refs) {
      var l = this.children[0].typecheck(refs);
      var r = this.children[1].typecheck(refs);
      same(l, r);

      return BOOLEAN_TYPE;
    }
  }]);
  return Ne;
}(BinaryNode);

var And = function (_BinaryNode3) {
  inherits(And, _BinaryNode3);

  function And(l, r) {
    classCallCheck(this, And);
    return possibleConstructorReturn(this, (And.__proto__ || Object.getPrototypeOf(And)).call(this, l, r, 'and'));
  }

  createClass(And, [{
    key: 'typecheck',
    value: function typecheck(refs) {
      var l = this.children[0].typecheck(refs);
      var r = this.children[1].typecheck(refs);
      return same(BOOLEAN_TYPE, same(l, r));
    }
  }]);
  return And;
}(BinaryNode);

var Not = function (_UnaryNode) {
  inherits(Not, _UnaryNode);

  function Not(c) {
    classCallCheck(this, Not);
    return possibleConstructorReturn(this, (Not.__proto__ || Object.getPrototypeOf(Not)).call(this, c, 'not'));
  }

  createClass(Not, [{
    key: 'typecheck',
    value: function typecheck(refs) {
      var c = this.children[0].typecheck(refs);
      return same(BOOLEAN_TYPE, c);
    }
  }]);
  return Not;
}(UnaryNode);

var IsNull = function (_UnaryNode2) {
  inherits(IsNull, _UnaryNode2);

  function IsNull(c) {
    classCallCheck(this, IsNull);
    return possibleConstructorReturn(this, (IsNull.__proto__ || Object.getPrototypeOf(IsNull)).call(this, c, 'isnull'));
  }

  createClass(IsNull, [{
    key: 'typecheck',
    value: function typecheck(refs) {
      this.children[0].typecheck(refs);
      return BOOLEAN_TYPE;
    }
  }]);
  return IsNull;
}(UnaryNode);

var Add = function (_BinaryNode) {
  inherits(Add, _BinaryNode);

  function Add(l, r) {
    classCallCheck(this, Add);
    return possibleConstructorReturn(this, (Add.__proto__ || Object.getPrototypeOf(Add)).call(this, l, r, 'add'));
  }

  createClass(Add, [{
    key: 'typecheck',
    value: function typecheck(refs) {
      var l = this.children[0].typecheck(refs);
      var r = this.children[1].typecheck(refs);
      return same(NUMBER_TYPE, same(l, r));
    }
  }]);
  return Add;
}(BinaryNode);

var Sub = function (_BinaryNode2) {
  inherits(Sub, _BinaryNode2);

  function Sub(l, r) {
    classCallCheck(this, Sub);
    return possibleConstructorReturn(this, (Sub.__proto__ || Object.getPrototypeOf(Sub)).call(this, l, r, 'sub'));
  }

  createClass(Sub, [{
    key: 'typecheck',
    value: function typecheck(refs) {
      var l = this.children[0].typecheck(refs);
      var r = this.children[1].typecheck(refs);
      return same(NUMBER_TYPE, same(l, r));
    }
  }]);
  return Sub;
}(BinaryNode);

var Mul = function (_BinaryNode3) {
  inherits(Mul, _BinaryNode3);

  function Mul(l, r) {
    classCallCheck(this, Mul);
    return possibleConstructorReturn(this, (Mul.__proto__ || Object.getPrototypeOf(Mul)).call(this, l, r, 'mul'));
  }

  createClass(Mul, [{
    key: 'typecheck',
    value: function typecheck(refs) {
      var l = this.children[0].typecheck(refs);
      var r = this.children[1].typecheck(refs);
      return same(NUMBER_TYPE, same(l, r));
    }
  }]);
  return Mul;
}(BinaryNode);

var Div = function (_BinaryNode4) {
  inherits(Div, _BinaryNode4);

  function Div(l, r) {
    classCallCheck(this, Div);
    return possibleConstructorReturn(this, (Div.__proto__ || Object.getPrototypeOf(Div)).call(this, l, r, 'div'));
  }

  createClass(Div, [{
    key: 'typecheck',
    value: function typecheck(refs) {
      var l = this.children[0].typecheck(refs);
      var r = this.children[1].typecheck(refs);
      return same(NUMBER_TYPE, same(l, r));
    }
  }]);
  return Div;
}(BinaryNode);

var DataColumn = function () {
  function DataColumn(type, data) {
    classCallCheck(this, DataColumn);

    this.type = type;
    this.data = data;
  }

  createClass(DataColumn, [{
    key: 'select',
    value: function select(selector) {
      return new DataColumn(this.type, this.data.filter(function (e, i) {
        return selector[i] || false;
      }));
    }
  }], [{
    key: 'fromType',
    value: function fromType(type, data) {
      switch (type) {
        case STRING_TYPE:
          return new StringColumn(data);
        case NUMBER_TYPE:
          return new NumberColumn(data);
        case BOOLEAN_TYPE:
          return new BooleanColumn(data);
        default:
          return new UnknownColumn(data);
      }
    }
  }]);
  return DataColumn;
}();

var UnknownColumn = function (_DataColumn) {
  inherits(UnknownColumn, _DataColumn);

  function UnknownColumn(data) {
    classCallCheck(this, UnknownColumn);
    return possibleConstructorReturn(this, (UnknownColumn.__proto__ || Object.getPrototypeOf(UnknownColumn)).call(this, UNKNOWN_TYPE, data));
  }

  return UnknownColumn;
}(DataColumn);

var NumberColumn = function (_DataColumn2) {
  inherits(NumberColumn, _DataColumn2);

  function NumberColumn(data) {
    classCallCheck(this, NumberColumn);
    return possibleConstructorReturn(this, (NumberColumn.__proto__ || Object.getPrototypeOf(NumberColumn)).call(this, NUMBER_TYPE, data));
  }

  return NumberColumn;
}(DataColumn);

var StringColumn = function (_DataColumn3) {
  inherits(StringColumn, _DataColumn3);

  function StringColumn(data) {
    classCallCheck(this, StringColumn);
    return possibleConstructorReturn(this, (StringColumn.__proto__ || Object.getPrototypeOf(StringColumn)).call(this, STRING_TYPE, data));
  }

  return StringColumn;
}(DataColumn);

var BooleanColumn = function (_DataColumn4) {
  inherits(BooleanColumn, _DataColumn4);

  function BooleanColumn(data) {
    classCallCheck(this, BooleanColumn);
    return possibleConstructorReturn(this, (BooleanColumn.__proto__ || Object.getPrototypeOf(BooleanColumn)).call(this, BOOLEAN_TYPE, data));
  }

  return BooleanColumn;
}(DataColumn);

function mkLiteralColumn(count, value) {
  var data = [];
  for (; count > 0; --count) {
    data.push(value);
  }switch (typeof value === 'undefined' ? 'undefined' : _typeof(value)) {
    case 'string':
      return new DataColumn(STRING_TYPE, data);
    case 'number':
      return new DataColumn(NUMBER_TYPE, data);
    case 'boolean':
      return new DataColumn(BOOLEAN_TYPE, data);
    default:
      return new DataColumn(UNKNOWN_TYPE, data);
  }
}

function zipWithNullSafe(l, r, f) {
  var len = l.length;
  if (len !== r.length) {
    throw new Error("length doesn't match");
  }

  var out = [];
  for (var idx = 0; idx < len; idx++) {
    var lval = l[idx];
    var rval = r[idx];
    if (lval == null || rval == null) {
      out.push(null);
    } else {
      out.push(f(lval, rval));
    }
  }
  return out;
}

function map(d, f) {
  return d.map(f);
}
function mapNullSafe(d, f) {
  return d.map(function (e) {
    return e == null ? null : f(e);
  });
}

function binop(e, t, f) {
  var l = execute(e.children[0], t);
  if (l.type !== NUMBER_TYPE) {
    throw new Error('Runtime Error: wrong type');
  }

  var r = execute(e.children[1], t);
  if (r.type !== NUMBER_TYPE) {
    throw new Error('Runtime Error: wrong type');
  }

  var data = zipWithNullSafe(l.data, r.data, f);
  return new NumberColumn(data);
}

function add(e, t) {
  return binop(e, t, function (a, b) {
    return a + b;
  });
}

function sub(e, t) {
  return binop(e, t, function (a, b) {
    return a - b;
  });
}

function mul(e, t) {
  return binop(e, t, function (a, b) {
    return a * b;
  });
}

function div(e, t) {
  return binop(e, t, function (a, b) {
    return a / b;
  });
}

function reference(e, t) {
  var res = t.find(function (_ref) {
    var _ref2 = slicedToArray(_ref, 2),
        name = _ref2[0],
        col = _ref2[1];

    return e.name === name;
  });
  if (res == null) {
    throw new Error('Missing reference ' + e.name);
  }
  return res[1];
}

function literal(e, t) {
  var count = t[0][1].data.length;
  return mkLiteralColumn(count, e.value);
}

function cmp(e, t, f) {
  var l = execute(e.children[0], t);
  var r = execute(e.children[1], t);
  if (l.type !== r.type) {
    throw new Error('Runtime Error: wrong type');
  }

  var data = zipWithNullSafe(l.data, r.data, f);
  return new BooleanColumn(data);
}

function cmpBool(e, t, f) {
  var l = execute(e.children[0], t);
  var r = execute(e.children[1], t);

  if (l.type !== BOOLEAN_TYPE) {
    throw new Error('Runtime Error: wrong type');
  }
  if (r.type !== BOOLEAN_TYPE) {
    throw new Error('Runtime Error: wrong type');
  }

  var data = zipWithNullSafe(l.data, r.data, f);
  return new BooleanColumn(data);
}

function eq(e, t) {
  return cmp(e, t, function (a, b) {
    return a === b;
  });
}

function ne(e, t) {
  return cmp(e, t, function (a, b) {
    return a !== b;
  });
}

function and(e, t) {
  return cmpBool(e, t, function (a, b) {
    return a && b;
  });
}

function isnull(e, t) {
  var c = execute(e.children[0], t);
  var data = map(c.data, function (a) {
    return a == null;
  });
  return new BooleanColumn(data);
}

function not(e, t) {
  var c = execute(e.children[0], t);
  if (c.type !== BOOLEAN_TYPE) {
    throw new Error('Runtime Error: wrong type');
  }

  var data = mapNullSafe(c.data, function (a) {
    return !a;
  });
  return new BooleanColumn(data);
}

var execute = function (e, t) {
  // math.js
  if (e instanceof Add) {
    return add(e, t);
  } else if (e instanceof Sub) {
    return sub(e, t);
  } else if (e instanceof Mul) {
    return mul(e, t);
  } else if (e instanceof Div) {
    return div(e, t);
  }

  // boolean
  if (e instanceof IsNull) {
    return isnull(e, t);
  } else if (e instanceof Not) {
    return not(e, t);
  } else if (e instanceof Eq) {
    return eq(e, t);
  } else if (e instanceof Ne) {
    return ne(e, t);
  } else if (e instanceof And) {
    return and(e, t);
  }

  // misc
  if (e instanceof Reference) {
    return reference(e, t);
  } else if (e instanceof Literal) {
    return literal(e, t);
  }

  throw new Error('Missing handler for op: ' + e.op);
};

var DEFAULT_ID = 0;

var KeyMap = function () {
  function KeyMap() {
    classCallCheck(this, KeyMap);

    this.map = {};
    this.nextId = 1 + DEFAULT_ID;
  }

  createClass(KeyMap, [{
    key: 'insert',
    value: function insert(elem) {
      if (elem == null) {
        return DEFAULT_ID;
      }

      var key = elem.toString();
      var id = this.map[key];
      if (id != null) {
        return id;
      }

      this.map[key] = this.nextId;
      return this.nextId++;
    }
  }]);
  return KeyMap;
}();

var Accumulator = function () {
  function Accumulator(op, input) {
    classCallCheck(this, Accumulator);

    this.op = op;
    this.input = input;
    this.current = null;
  }

  createClass(Accumulator, [{
    key: 'init',
    value: function init() {
      return new Accumulator(this.op, this.input);
    }
  }, {
    key: 'insert',
    value: function insert(row) {
      var next = this.input.data[row];
      this.current = aggregate$1(this.op, this.current, next);
    }
  }]);
  return Accumulator;
}();

var AggMap = function () {
  function AggMap(aggs, table) {
    classCallCheck(this, AggMap);

    this.accs = {};
    this.init = aggs.map(function (agg) {
      var input = execute(agg.input, table);
      return new Accumulator(agg.op, input);
    });
  }

  createClass(AggMap, [{
    key: 'insert',
    value: function insert(row, key) {
      if (key.length === 0) {
        return this.global(row);
      }

      var keyString = key.toString();

      var accs = this.accs[keyString];
      if (accs == null) {
        accs = this.init.map(function (acc) {
          return acc.init();
        });
        this.accs[keyString] = accs;
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = accs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var acc = _step.value;

          acc.insert(row);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: 'global',
    value: function global(row) {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.init[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var acc = _step2.value;

          acc.insert(row);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
  }, {
    key: 'finish',
    value: function finish(global) {
      var outputCount = this.init.length;
      var output = this.init.map(function (init) {
        return DataColumn.fromType(init.input.type, []);
      });

      if (global) {
        for (var acc = 0; acc < outputCount; ++acc) {
          output[acc].data.push(this.init[acc].current);
        }
      } else {
        for (var key in this.accs) {
          var accs = this.accs[key];
          for (var _acc = 0; _acc < outputCount; ++_acc) {
            output[_acc].data.push(accs[_acc].current);
          }
        }
      }

      return output;
    }
  }]);
  return AggMap;
}();

var aggregate = function (table, keys, aggs) {
  var rowCount = table[0][1].data.length;
  var keyCount = keys.length;

  var keyData = keys.map(function (e) {
    return execute(e, table);
  });
  var keyMaps = keyData.map(function () {
    return new KeyMap();
  });

  var rowKey = new Uint32Array(keyCount);
  var aggMap = new AggMap(aggs, table);

  for (var row = 0; row < rowCount; ++row) {
    // update the aggregation map's row key
    for (var key = 0; key < keyCount; ++key) {
      var keyMap = keyMaps[key];
      var elem = keyData[key].data[row];
      rowKey[key] = keyMap.insert(elem);
    }

    aggMap.insert(row, rowKey);
  }

  return aggMap.finish(keyCount === 0);
};

function aggregate$1(op, current, next) {
  if (op === 'count') {
    return (current || 0) + 1;
  } else if (op === 'cvl') {
    return next == null ? current || 0 : (current || 0) + 1;
  }

  if (next == null) {
    return current;
  } else if (current == null) {
    return next;
  }

  switch (op) {
    case 'min':
      return next < current ? next : current;
    case 'max':
      return next > current ? next : current;
    case 'sum':
      return (current || 0) + (next || 0);
    default:
      throw new Error('Unexpected op: ' + op);
  }
}

function mkReferenceMap(s) {
  var refs = {};
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = s[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _ref = _step.value;

      var _ref2 = slicedToArray(_ref, 2);

      var name = _ref2[0];
      var column = _ref2[1];

      if (refs[name] != null) {
        throw new Error('Duplicate field name: ' + name);
      }
      refs[name] = column.type;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return refs;
}

var _execute = function (expression, table) {
  var refs = mkReferenceMap(table);
  var outType = expression.typecheck(refs);
  var column = execute(expression, table);

  if (column.type !== outType) {
    throw new Error('Runtime Type Error: ' + column.type + ' !== ' + outType);
  }
  return column;
};

var Operator = function () {
  function Operator(child) {
    classCallCheck(this, Operator);

    this._child = child;
  }

  createClass(Operator, [{
    key: 'child',
    value: function child() {
      if (this._child == null) {
        throw new Error('operator has no child');
      } else {
        return this._child;
      }
    }
  }, {
    key: 'execute',
    value: function execute() {
      throw new Error('execute() not implemented');
    }
  }]);
  return Operator;
}();

var Scan = function (_Operator) {
  inherits(Scan, _Operator);

  function Scan(table) {
    classCallCheck(this, Scan);

    var _this = possibleConstructorReturn(this, (Scan.__proto__ || Object.getPrototypeOf(Scan)).call(this, null));

    _this.table = table;
    return _this;
  }

  createClass(Scan, [{
    key: 'execute',
    value: function execute() {
      return this.table;
    }
  }]);
  return Scan;
}(Operator);

var Project = function (_Operator2) {
  inherits(Project, _Operator2);

  function Project(child, expressions) {
    classCallCheck(this, Project);

    var _this2 = possibleConstructorReturn(this, (Project.__proto__ || Object.getPrototypeOf(Project)).call(this, child));

    _this2.expressions = expressions;
    return _this2;
  }

  createClass(Project, [{
    key: 'execute',
    value: function execute() {
      var child = this.child().execute();
      return this.expressions.map(function (_ref) {
        var _ref2 = slicedToArray(_ref, 2),
            name = _ref2[0],
            expr = _ref2[1];

        return [name, _execute(expr, child)];
      });
    }
  }]);
  return Project;
}(Operator);

var Filter = function (_Operator3) {
  inherits(Filter, _Operator3);

  function Filter(child, predicates) {
    classCallCheck(this, Filter);

    var _this3 = possibleConstructorReturn(this, (Filter.__proto__ || Object.getPrototypeOf(Filter)).call(this, child));

    _this3.predicate = predicates.reduce(function (l, r) {
      return new And(l, r);
    });
    return _this3;
  }

  createClass(Filter, [{
    key: 'execute',
    value: function execute() {
      var child = this.child().execute();

      var _execute2 = _execute(this.predicate, child),
          data = _execute2.data;

      return child.map(function (_ref3) {
        var _ref4 = slicedToArray(_ref3, 2),
            name = _ref4[0],
            col = _ref4[1];

        return [name, col.select(data)];
      });
    }
  }]);
  return Filter;
}(Operator);

var Aggregate = function (_Operator4) {
  inherits(Aggregate, _Operator4);

  function Aggregate(child, keys, aggs) {
    classCallCheck(this, Aggregate);

    var _this4 = possibleConstructorReturn(this, (Aggregate.__proto__ || Object.getPrototypeOf(Aggregate)).call(this, child));

    _this4.keys = keys;
    _this4.aggs = aggs;
    return _this4;
  }

  createClass(Aggregate, [{
    key: 'execute',
    value: function execute() {
      var _this5 = this;

      var child = this.child().execute();
      return aggregate(child, this.keys, this.aggs.map(function (a) {
        return a[1];
      })).map(function (c, i) {
        return [_this5.aggs[i][0], c];
      });
    }
  }]);
  return Aggregate;
}(Operator);

exports.Scan = Scan;
exports.Project = Project;
exports.Filter = Filter;
exports.Aggregate = Aggregate;
exports.Expression = Expression;
exports.Reference = Reference;
exports.Literal = Literal;
exports.Count = Count;
exports.CountValid = CountValid;
exports.Max = Max;
exports.Min = Min;
exports.Sum = Sum;
exports.Eq = Eq;
exports.Ne = Ne;
exports.And = And;
exports.Not = Not;
exports.IsNull = IsNull;
exports.Add = Add;
exports.Sub = Sub;
exports.Mul = Mul;
exports.Div = Div;
exports.UNKNOWN_TYPE = UNKNOWN_TYPE;
exports.NUMBER_TYPE = NUMBER_TYPE;
exports.STRING_TYPE = STRING_TYPE;
exports.BOOLEAN_TYPE = BOOLEAN_TYPE;
exports.same = same;
