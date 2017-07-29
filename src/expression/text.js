// @flow

import { BinaryNode, Expression } from './ast.js'

export class Concat extends Expression {
  constructor (children: Array<Expression<*>>) {
    super(children, 'concat')
  }
}

export class Left extends BinaryNode {
  constructor (l: Expression<*>, r: Expression<*>) {
    super(l, r, 'left')
  }
}

export class Right extends BinaryNode {
  constructor (l: Expression<*>, r: Expression<*>) {
    super(l, r, 'right')
  }
}
