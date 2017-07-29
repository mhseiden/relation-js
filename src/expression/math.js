// @flow
import { type DataType, NUMBER_TYPE, same } from './type.js'
import { Expression, BinaryNode, type ReferenceMap } from './ast.js'

export class Add extends BinaryNode {
  constructor (l: Expression<*>, r: Expression<*>) {
    super(l, r, 'add')
  }
  typecheck (refs: ReferenceMap): DataType {
    const l = this.children[0].typecheck(refs)
    const r = this.children[1].typecheck(refs)
    return same(NUMBER_TYPE, same(l, r))
  }
}

export class Sub extends BinaryNode {
  constructor (l: Expression<*>, r: Expression<*>) {
    super(l, r, 'sub')
  }
  typecheck (refs: ReferenceMap): DataType {
    const l = this.children[0].typecheck(refs)
    const r = this.children[1].typecheck(refs)
    return same(NUMBER_TYPE, same(l, r))
  }
}

export class Mul extends BinaryNode {
  constructor (l: Expression<*>, r: Expression<*>) {
    super(l, r, 'mul')
  }
  typecheck (refs: ReferenceMap): DataType {
    const l = this.children[0].typecheck(refs)
    const r = this.children[1].typecheck(refs)
    return same(NUMBER_TYPE, same(l, r))
  }
}

export class Div extends BinaryNode {
  constructor (l: Expression<*>, r: Expression<*>) {
    super(l, r, 'div')
  }
  typecheck (refs: ReferenceMap): DataType {
    const l = this.children[0].typecheck(refs)
    const r = this.children[1].typecheck(refs)
    return same(NUMBER_TYPE, same(l, r))
  }
}
