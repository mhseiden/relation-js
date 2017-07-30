// @flow
import * as util from './util.js'
import { type Table, BooleanColumn } from './column.js'
import { Expression, BOOLEAN_TYPE } from '../expression'

import execute from './execute.js'
import * as b00l from '../expression/boolean'

type Cmp = (any, any) => boolean;
type CmpBool = (bool, bool) => boolean;

function cmp (e: Expression<*>, t: Table, f: Cmp): BooleanColumn {
  const l = execute(e.children[0], t)
  const r = execute(e.children[1], t)
  if (l.type !== r.type) {
    throw new Error('Runtime Error: wrong type')
  }

  const data = util.zipWithNullSafe(l.data, r.data, f)
  return new BooleanColumn(data)
}

function cmpBool (e: Expression<*>, t: Table, f: CmpBool): BooleanColumn {
  const l = execute(e.children[0], t)
  const r = execute(e.children[1], t)

  if (l.type !== BOOLEAN_TYPE) {
    throw new Error('Runtime Error: wrong type')
  }
  if (r.type !== BOOLEAN_TYPE) {
    throw new Error('Runtime Error: wrong type')
  }

  const data = util.zipWithNullSafe(l.data, r.data, f)
  return new BooleanColumn(data)
}

export function eq (e: b00l.Eq, t: Table): BooleanColumn {
  return cmp(e, t, (a, b) => a === b)
}

export function ne (e: b00l.Ne, t: Table): BooleanColumn {
  return cmp(e, t, (a, b) => a !== b)
}

export function and (e: b00l.And, t: Table): BooleanColumn {
  return cmpBool(e, t, (a, b) => a && b)
}

export function isnull (e: b00l.IsNull, t: Table): BooleanColumn {
  const c = execute(e.children[0], t)
  const data = util.map(c.data, a => a == null)
  return new BooleanColumn(data)
}

export function not (e: b00l.Not, t: Table): BooleanColumn {
  const c = execute(e.children[0], t)
  if (c.type !== BOOLEAN_TYPE) {
    throw new Error('Runtime Error: wrong type')
  }

  const data = util.mapNullSafe(c.data, (a: boolean) => !a)
  return new BooleanColumn(data)
}
