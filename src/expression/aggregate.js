// @flow
import { Aggregate, Expression, type ReferenceMap } from './ast.js'

export class Count extends Aggregate {
  constructor(child: Expression<*>) {
    super(child, "count")
  }
}

export class CountValid extends Aggregate {
  constructor(child: Expression<*>) {
    super(child, "cvl")
  }
}

export class Max extends Aggregate {
  constructor(child: Expression<*>) {
    super(child, "max")
  }
}

export class Min extends Aggregate {
  constructor(child: Expression<*>) {
    super(child, "min")
  }
}

export class Sum extends Aggregate {
  constructor(child: Expression<*>) {
    super(child, "sum")
  }
}
