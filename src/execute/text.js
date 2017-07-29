// @flow

import { type Table, type StringColumn } from './column.js'
import { Concat, Left, Right } from '../expression/text'

export function concat (e: Concat, t: Table): StringColumn {
  throw new Error('NYI')
}

export function left (e: Left, t: Table): StringColumn {
  throw new Error('NYI')
}

export function right (e: Right, t: Table): StringColumn {
  throw new Error('NYI')
}
