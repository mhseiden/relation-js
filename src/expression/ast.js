// @flow
import { type DataType } from './type.js'
import { type Operator } from './op.js'

export type ReferenceMap = { [string]: DataType };

export class Expression<Op: Operator> {
  children: Array<Expression<*>>;
  op: Op;

  constructor (children: Array<Expression<*>>, op: Op) {
    this.children = children
    this.op = op
  }

  typecheck (r: ReferenceMap): DataType {
    throw new Error('typecheck() is not implemented')
  }
}

export class LeafNode<Op: Operator> extends Expression<Op> {
  constructor (op: Op) {
    super([], op)
  }
}

export class UnaryNode<Op: Operator> extends Expression<Op> {
  constructor (c: Expression<*>, op: Op) {
    super([c], op)
  }
}

export class BinaryNode<Op: Operator> extends Expression<Op> {
  constructor (l: Expression<*>, r: Expression<*>, op: Op) {
    super([l, r], op)
  }
}
