// @flow
import { Expression } from '../expression/index.js'
import { type ReferenceMap } from '../expression/ast.js'
import { type Table, type DataColumn } from './column.js'

import execute from './execute.js'

function mkReferenceMap (s: Table): ReferenceMap {
  const refs = {}
  for (const [name, column] of s) {
    if (refs[name] != null) {
      throw new Error(`Duplicate field name: ${name}`)
    }
    refs[name] = column.type
  }
  return refs
}

export default function (expression: Expression<*>, table: Table): DataColumn<*> {
  const refs = mkReferenceMap(table)
  const outType = expression.typecheck(refs)
  const column = execute(expression, table)

  if (column.type !== outType) {
    throw new Error(`Runtime Type Error: ${column.type} !== ${outType}`)
  }
  return column
}

export * from './column.js'
export * from './loaders.js'
export { default as aggregate } from './aggregate.js'
