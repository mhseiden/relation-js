// @flow
import { type DataType, BOOLEAN_TYPE, same } from './type.js'
import { Expression, BinaryNode, UnaryNode, type ReferenceMap } from './ast.js'

function checkCmp (children, refs) {
  const l = children[0].typecheck(refs)
  const r = children[1].typecheck(refs)
  same(l, r)

  return BOOLEAN_TYPE
}

export class Eq extends BinaryNode {
  constructor (l: Expression<*>, r: Expression<*>) {
    super(l, r, 'eq')
  }
  typecheck (refs: ReferenceMap): DataType {
    return checkCmp(this.children, refs)
  }
}

export class Ne extends BinaryNode {
  constructor (l: Expression<*>, r: Expression<*>) {
    super(l, r, 'ne')
  }
  typecheck (refs: ReferenceMap): DataType {
    return checkCmp(this.children, refs)
  }
}

export class Gt extends BinaryNode {
  constructor (l: Expression<*>, r: Expression<*>) {
    super(l, r, 'gt')
  }
  typecheck (refs: ReferenceMap): DataType {
    return checkCmp(this.children, refs)
  }
}

export class Gte extends BinaryNode {
  constructor (l: Expression<*>, r: Expression<*>) {
    super(l, r, 'gte')
  }
  typecheck (refs: ReferenceMap): DataType {
    return checkCmp(this.children, refs)
  }
}

export class Lt extends BinaryNode {
  constructor (l: Expression<*>, r: Expression<*>) {
    super(l, r, 'lt')
  }
  typecheck (refs: ReferenceMap): DataType {
    return checkCmp(this.children, refs)
  }
}

export class Lte extends BinaryNode {
  constructor (l: Expression<*>, r: Expression<*>) {
    super(l, r, 'lte')
  }
  typecheck (refs: ReferenceMap): DataType {
    return checkCmp(this.children, refs)
  }
}

export class And extends BinaryNode {
  constructor (l: Expression<*>, r: Expression<*>) {
    super(l, r, 'and')
  }
  typecheck (refs: ReferenceMap): DataType {
    const l = this.children[0].typecheck(refs)
    const r = this.children[1].typecheck(refs)
    return same(BOOLEAN_TYPE, same(l, r))
  }
}

export class Not extends UnaryNode {
  constructor (c: Expression<*>) {
    super(c, 'not')
  }
  typecheck (refs: ReferenceMap): DataType {
    const c = this.children[0].typecheck(refs)
    return same(BOOLEAN_TYPE, c)
  }
}

export class IsNull extends UnaryNode {
  constructor (c: Expression<*>) {
    super(c, 'isnull')
  }
  typecheck (refs: ReferenceMap): DataType {
    this.children[0].typecheck(refs)
    return BOOLEAN_TYPE
  }
}
