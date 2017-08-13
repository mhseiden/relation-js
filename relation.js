(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.relation = {})));
}(this, (function (exports) { 'use strict';

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

function _typecheck(r) {
  throw new Error('typecheck() is not implemented');
}

var Expression = function () {
  function Expression(children, op) {
    classCallCheck(this, Expression);

    this.children = children;
    this.op = op;
  }

  createClass(Expression, [{
    key: 'typecheck',
    value: _typecheck
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

function _typecheck$1(r) {
  var t = r[this.name];
  if (t == null) {
    throw new Error('Missing reference ' + this.name);
  }
  return t;
}

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
    value: _typecheck$1
  }]);
  return Reference;
}(LeafNode);

function _typecheck2(r) {
  if (typeof this.value === 'number') {
    return NUMBER_TYPE;
  } else if (typeof this.value === 'string') {
    return STRING_TYPE;
  } else if (typeof this.value === 'boolean') {
    return BOOLEAN_TYPE;
  }

  return UNKNOWN_TYPE;
}

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
    value: _typecheck2
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

function checkCmp(children, refs) {
  var l = children[0].typecheck(refs);
  var r = children[1].typecheck(refs);
  same(l, r);

  return BOOLEAN_TYPE;
}

function _typecheck$2(refs) {
  return checkCmp(this.children, refs);
}

var Eq = function (_BinaryNode) {
  inherits(Eq, _BinaryNode);

  function Eq(l, r) {
    classCallCheck(this, Eq);
    return possibleConstructorReturn(this, (Eq.__proto__ || Object.getPrototypeOf(Eq)).call(this, l, r, 'eq'));
  }

  createClass(Eq, [{
    key: 'typecheck',
    value: _typecheck$2
  }]);
  return Eq;
}(BinaryNode);

function _typecheck2$1(refs) {
  return checkCmp(this.children, refs);
}

var Ne = function (_BinaryNode2) {
  inherits(Ne, _BinaryNode2);

  function Ne(l, r) {
    classCallCheck(this, Ne);
    return possibleConstructorReturn(this, (Ne.__proto__ || Object.getPrototypeOf(Ne)).call(this, l, r, 'ne'));
  }

  createClass(Ne, [{
    key: 'typecheck',
    value: _typecheck2$1
  }]);
  return Ne;
}(BinaryNode);

function _typecheck3(refs) {
  return checkCmp(this.children, refs);
}

var Gt = function (_BinaryNode3) {
  inherits(Gt, _BinaryNode3);

  function Gt(l, r) {
    classCallCheck(this, Gt);
    return possibleConstructorReturn(this, (Gt.__proto__ || Object.getPrototypeOf(Gt)).call(this, l, r, 'gt'));
  }

  createClass(Gt, [{
    key: 'typecheck',
    value: _typecheck3
  }]);
  return Gt;
}(BinaryNode);

function _typecheck4(refs) {
  return checkCmp(this.children, refs);
}

var Gte = function (_BinaryNode4) {
  inherits(Gte, _BinaryNode4);

  function Gte(l, r) {
    classCallCheck(this, Gte);
    return possibleConstructorReturn(this, (Gte.__proto__ || Object.getPrototypeOf(Gte)).call(this, l, r, 'gte'));
  }

  createClass(Gte, [{
    key: 'typecheck',
    value: _typecheck4
  }]);
  return Gte;
}(BinaryNode);

function _typecheck5(refs) {
  return checkCmp(this.children, refs);
}

var Lt = function (_BinaryNode5) {
  inherits(Lt, _BinaryNode5);

  function Lt(l, r) {
    classCallCheck(this, Lt);
    return possibleConstructorReturn(this, (Lt.__proto__ || Object.getPrototypeOf(Lt)).call(this, l, r, 'lt'));
  }

  createClass(Lt, [{
    key: 'typecheck',
    value: _typecheck5
  }]);
  return Lt;
}(BinaryNode);

function _typecheck6(refs) {
  return checkCmp(this.children, refs);
}

var Lte = function (_BinaryNode6) {
  inherits(Lte, _BinaryNode6);

  function Lte(l, r) {
    classCallCheck(this, Lte);
    return possibleConstructorReturn(this, (Lte.__proto__ || Object.getPrototypeOf(Lte)).call(this, l, r, 'lte'));
  }

  createClass(Lte, [{
    key: 'typecheck',
    value: _typecheck6
  }]);
  return Lte;
}(BinaryNode);

function _typecheck7(refs) {
  var l = this.children[0].typecheck(refs);
  var r = this.children[1].typecheck(refs);
  return same(BOOLEAN_TYPE, same(l, r));
}

var And = function (_BinaryNode7) {
  inherits(And, _BinaryNode7);

  function And(l, r) {
    classCallCheck(this, And);
    return possibleConstructorReturn(this, (And.__proto__ || Object.getPrototypeOf(And)).call(this, l, r, 'and'));
  }

  createClass(And, [{
    key: 'typecheck',
    value: _typecheck7
  }]);
  return And;
}(BinaryNode);

function _typecheck8(refs) {
  var c = this.children[0].typecheck(refs);
  return same(BOOLEAN_TYPE, c);
}

var Not = function (_UnaryNode) {
  inherits(Not, _UnaryNode);

  function Not(c) {
    classCallCheck(this, Not);
    return possibleConstructorReturn(this, (Not.__proto__ || Object.getPrototypeOf(Not)).call(this, c, 'not'));
  }

  createClass(Not, [{
    key: 'typecheck',
    value: _typecheck8
  }]);
  return Not;
}(UnaryNode);

function _typecheck9(refs) {
  this.children[0].typecheck(refs);
  return BOOLEAN_TYPE;
}

var IsNull = function (_UnaryNode2) {
  inherits(IsNull, _UnaryNode2);

  function IsNull(c) {
    classCallCheck(this, IsNull);
    return possibleConstructorReturn(this, (IsNull.__proto__ || Object.getPrototypeOf(IsNull)).call(this, c, 'isnull'));
  }

  createClass(IsNull, [{
    key: 'typecheck',
    value: _typecheck9
  }]);
  return IsNull;
}(UnaryNode);

function _typecheck$3(refs) {
  var l = this.children[0].typecheck(refs);
  var r = this.children[1].typecheck(refs);
  return same(NUMBER_TYPE, same(l, r));
}

var Add = function (_BinaryNode) {
  inherits(Add, _BinaryNode);

  function Add(l, r) {
    classCallCheck(this, Add);
    return possibleConstructorReturn(this, (Add.__proto__ || Object.getPrototypeOf(Add)).call(this, l, r, 'add'));
  }

  createClass(Add, [{
    key: 'typecheck',
    value: _typecheck$3
  }]);
  return Add;
}(BinaryNode);

function _typecheck2$2(refs) {
  var l = this.children[0].typecheck(refs);
  var r = this.children[1].typecheck(refs);
  return same(NUMBER_TYPE, same(l, r));
}

var Sub = function (_BinaryNode2) {
  inherits(Sub, _BinaryNode2);

  function Sub(l, r) {
    classCallCheck(this, Sub);
    return possibleConstructorReturn(this, (Sub.__proto__ || Object.getPrototypeOf(Sub)).call(this, l, r, 'sub'));
  }

  createClass(Sub, [{
    key: 'typecheck',
    value: _typecheck2$2
  }]);
  return Sub;
}(BinaryNode);

function _typecheck3$1(refs) {
  var l = this.children[0].typecheck(refs);
  var r = this.children[1].typecheck(refs);
  return same(NUMBER_TYPE, same(l, r));
}

var Mul = function (_BinaryNode3) {
  inherits(Mul, _BinaryNode3);

  function Mul(l, r) {
    classCallCheck(this, Mul);
    return possibleConstructorReturn(this, (Mul.__proto__ || Object.getPrototypeOf(Mul)).call(this, l, r, 'mul'));
  }

  createClass(Mul, [{
    key: 'typecheck',
    value: _typecheck3$1
  }]);
  return Mul;
}(BinaryNode);

function _typecheck4$1(refs) {
  var l = this.children[0].typecheck(refs);
  var r = this.children[1].typecheck(refs);
  return same(NUMBER_TYPE, same(l, r));
}

var Div = function (_BinaryNode4) {
  inherits(Div, _BinaryNode4);

  function Div(l, r) {
    classCallCheck(this, Div);
    return possibleConstructorReturn(this, (Div.__proto__ || Object.getPrototypeOf(Div)).call(this, l, r, 'div'));
  }

  createClass(Div, [{
    key: 'typecheck',
    value: _typecheck4$1
  }]);
  return Div;
}(BinaryNode);

var types = {
  UNKNOWN_TYPE: UNKNOWN_TYPE,
  NUMBER_TYPE: NUMBER_TYPE,
  STRING_TYPE: STRING_TYPE,
  BOOLEAN_TYPE: BOOLEAN_TYPE
};

var index$1 = Object.freeze({
	types: types,
	Expression: Expression,
	Aggregate: Aggregate$1,
	Reference: Reference,
	Literal: Literal,
	Count: Count,
	CountValid: CountValid,
	Max: Max,
	Min: Min,
	Sum: Sum,
	Eq: Eq,
	Ne: Ne,
	Gt: Gt,
	Gte: Gte,
	Lt: Lt,
	Lte: Lte,
	And: And,
	Not: Not,
	IsNull: IsNull,
	Add: Add,
	Sub: Sub,
	Mul: Mul,
	Div: Div
});

function zipWithNullSafe(l, r, f) {
  var len = l.length;
  if (len !== r.length) {
    throw new Error("length doesn't match");
  }

  var o = l.slice(0);
  for (var idx = 0; idx < len; idx++) {
    var lval = o[idx];
    if (lval == null) continue;

    var rval = r[idx];
    if (rval == null) {
      o[idx] = null;
    } else {
      o[idx] = f(lval, rval);
    }
  }
  return o;
}

function map(d, f) {
  return d.map(f);
}
function mapNullSafe(d, f) {
  return d.map(function (e) {
    return e == null ? null : f(e);
  });
}

function fill(count, value) {
  var data = new Array(count);
  if (data.fill) {
    data.fill(value);
  } else {
    for (var i = 0; i < count; ++i) {
      data[i] = value;
    }
  }
  return data;
}

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
        return !!selector[i] || false;
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
  var data = fill(count, value);
  switch (typeof value === 'undefined' ? 'undefined' : _typeof(value)) {
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

function _ref(a, b) {
  return a + b;
}

function add(e, t) {
  return binop(e, t, _ref);
}

function _ref2(a, b) {
  return a - b;
}

function sub(e, t) {
  return binop(e, t, _ref2);
}

function _ref3$1(a, b) {
  return a * b;
}

function mul(e, t) {
  return binop(e, t, _ref3$1);
}

function _ref4(a, b) {
  return a / b;
}

function div(e, t) {
  return binop(e, t, _ref4);
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

function _ref$1(a, b) {
  return a === b;
}

function eq(e, t) {
  return cmp(e, t, _ref$1);
}

function _ref2$1(a, b) {
  return a !== b;
}

function ne(e, t) {
  return cmp(e, t, _ref2$1);
}

function _ref3$2(a, b) {
  return a > b;
}

function gt(e, t) {
  return cmp(e, t, _ref3$2);
}

function _ref4$1(a, b) {
  return a >= b;
}

function gte(e, t) {
  return cmp(e, t, _ref4$1);
}

function _ref5(a, b) {
  return a < b;
}

function lt(e, t) {
  return cmp(e, t, _ref5);
}

function _ref6$1(a, b) {
  return a <= b;
}

function lte(e, t) {
  return cmp(e, t, _ref6$1);
}

function _ref7(a, b) {
  return a && b;
}

function and(e, t) {
  return cmpBool(e, t, _ref7);
}

function _ref8(a) {
  return a == null;
}

function isnull(e, t) {
  var c = execute(e.children[0], t);
  var data = map(c.data, _ref8);
  return new BooleanColumn(data);
}

function _ref9(a) {
  return !a;
}

function not(e, t) {
  var c = execute(e.children[0], t);
  if (c.type !== BOOLEAN_TYPE) {
    throw new Error('Runtime Error: wrong type');
  }

  var data = mapNullSafe(c.data, _ref9);
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
  } else if (e instanceof Gt) {
    return gt(e, t);
  } else if (e instanceof Gte) {
    return gte(e, t);
  } else if (e instanceof Lt) {
    return lt(e, t);
  } else if (e instanceof Lte) {
    return lte(e, t);
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

// (max) XXX TODO - error checking during the load process...
function loadColumns(columns) {
  var table = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = columns[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var c = _step.value;

      table.push([c.name, DataColumn.fromType(c.type, c.data)]);
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

  return table;
}

var DEFAULT_ID = 0;

function _insert(elem) {
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

var KeyMap = function () {
  function KeyMap() {
    classCallCheck(this, KeyMap);

    this.map = {};
    this.nextId = 1 + DEFAULT_ID;
  }

  createClass(KeyMap, [{
    key: 'insert',
    value: _insert
  }]);
  return KeyMap;
}();

function _insert2(row) {
  var next = this.input.data[row];
  this.current = aggregate$1(this.op, this.current, next);
}

function _type() {
  switch (this.op) {
    case 'min':
    case 'max':
      return this.input.type;
    case 'count':
    case 'cvl':
    case 'sum':
      return NUMBER_TYPE;
    default:
      throw new Error('Unexpected op: ' + this.op);
  }
}

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
    value: _insert2
  }, {
    key: 'type',
    value: _type
  }]);
  return Accumulator;
}();

function _ref$2(acc) {
  return acc.init();
}

function _insert3(row, key) {
  if (key.length === 0) {
    return this.global(row);
  }

  var keyString = key.toString();

  var accs = this.accs[keyString];
  if (accs == null) {
    accs = this.init.map(_ref$2);
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

function _global(row) {
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

function _ref2$2(init) {
  return DataColumn.fromType(init.type(), []);
}

function _finish(global) {
  var outputCount = this.init.length;
  var output = this.init.map(_ref2$2);

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
    value: _insert3
  }, {
    key: 'global',
    value: _global
  }, {
    key: 'finish',
    value: _finish
  }]);
  return AggMap;
}();

function _ref3$3() {
  return new KeyMap();
}

var aggregate = function (table, keys, aggs) {
  var rowCount = table[0][1].data.length;
  var keyCount = keys.length;

  var keyData = keys.map(function (e) {
    return execute(e, table);
  });
  var keyMaps = keyData.map(_ref3$3);

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

var _execute3 = function (expression, table) {
  var refs = mkReferenceMap(table);
  var outType = expression.typecheck(refs);
  var column = execute(expression, table);

  if (column.type !== outType) {
    throw new Error('Runtime Type Error: ' + column.type + ' !== ' + outType);
  }
  return column;
};

function _execute() {
  throw new Error('execute() not implemented');
}

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
    value: _execute
  }]);
  return Operator;
}();

function _execute2() {
  return this.table;
}

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
    value: _execute2
  }]);
  return Scan;
}(Operator);

function _execute4() {
  var child = this.child().execute();
  return this.expressions.map(function (_ref) {
    var _ref2 = slicedToArray(_ref, 2),
        name = _ref2[0],
        expr = _ref2[1];

    return [name, _execute3(expr, child)];
  });
}

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
    value: _execute4
  }]);
  return Project;
}(Operator);

function _ref3(l, r) {
  return new And(l, r);
}

function _execute6() {
  var child = this.child().execute();

  var _execute5 = _execute3(this.predicate, child),
      data = _execute5.data;

  return child.map(function (_ref4) {
    var _ref5 = slicedToArray(_ref4, 2),
        name = _ref5[0],
        col = _ref5[1];

    return [name, col.select(data)];
  });
}

var Filter = function (_Operator3) {
  inherits(Filter, _Operator3);

  function Filter(child, predicates) {
    classCallCheck(this, Filter);

    var _this3 = possibleConstructorReturn(this, (Filter.__proto__ || Object.getPrototypeOf(Filter)).call(this, child));

    _this3.predicate = predicates.reduce(_ref3);
    return _this3;
  }

  createClass(Filter, [{
    key: 'execute',
    value: _execute6
  }]);
  return Filter;
}(Operator);

function _ref6(a) {
  return a[1];
}

function _execute7() {
  var _this5 = this;

  var child = this.child().execute();
  return aggregate(child, this.keys, this.aggs.map(_ref6)).map(function (c, i) {
    return [_this5.aggs[i][0], c];
  });
}

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
    value: _execute7
  }]);
  return Aggregate;
}(Operator);



var index = Object.freeze({
	Scan: Scan,
	Project: Project,
	Filter: Filter,
	Aggregate: Aggregate
});

var loaders = { loadColumns: loadColumns };

exports.operator = index;
exports.expression = index$1;
exports.loaders = loaders;

Object.defineProperty(exports, '__esModule', { value: true });

})));
