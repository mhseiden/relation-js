// @flow
import * as expr from '../expression'
import execute, { type Table } from '../execute'

type Expression<T> = expr.Expression<T>;

class Operator {
  _child: ?Operator;

  constructor (child: ?Operator) {
    this._child = child
  }

  child (): Operator {
    if (this._child == null) {
      throw new Error('operator has no child')
    } else {
      return this._child
    }
  }

  execute (): Table {
    throw new Error('execute() not implemented')
  }
}

export class Scan extends Operator {
  table: Table;

  constructor (table: Table) {
    super(null)
    this.table = table
  }

  execute (): Table {
    return this.table
  }
}

export class Project extends Operator {
  expressions: Array<[string, Expression<*>]>;

  constructor (child: Operator, expressions: Array<[string, Expression<*>]>) {
    super(child)
    this.expressions = expressions
  }

  execute (): Table {
    const child = this.child().execute()
    return this.expressions.map(([name, expr]) => {
      return [name, execute(expr, child)]
    })
  }
}

export class Filter extends Operator {
  predicate: Expression<*>;

  constructor (child: Operator, predicates: Array<Expression<*>>) {
    super(child)
    this.predicate = predicates.reduce((l, r) => {
      return new expr.And(l, r)
    })
  }

  execute (): Table {
    const child = this.child().execute()
    const { data } = execute(this.predicate, child)
    return child.map(([name, col]) => {
      return [name, col.select(data)]
    })
  }
}
