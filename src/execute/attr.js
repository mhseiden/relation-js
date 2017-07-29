// @flow

import { type Table, type DataColumn, mkLiteralColumn } from './column.js'
import { Reference, Literal } from '../expression/attr'

export function reference (e: Reference, t: Table): DataColumn<*> {
  const res = t.find(([name, col]) => e.name === name)
  if (res == null) {
    throw new Error(`Missing reference ${e.name}`)
  }
  return res[1]
}

export function literal (e: Literal, t: Table): DataColumn<*> {
  const count = t[0][1].data.length
  return mkLiteralColumn(count, e.value)
}
