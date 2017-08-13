// @flow
import * as util from './util.js'
import { type Table, NumberColumn } from './column.js'
import { Expression } from '../expression/index.js'
import { NUMBER_TYPE } from '../expression/type.js'

import execute from './execute.js'
import * as math from '../expression/math'

type BinopFn = (number, number) => number;

function binop (e: Expression<*>, t: Table, f: BinopFn): NumberColumn {
  const l = execute(e.children[0], t)
  if (l.type !== NUMBER_TYPE) {
    throw new Error('Runtime Error: wrong type')
  }

  const r = execute(e.children[1], t)
  if (r.type !== NUMBER_TYPE) {
    throw new Error('Runtime Error: wrong type')
  }

  const data = util.zipWithNullSafe(l.data, r.data, f)
  return new NumberColumn(data)
}

export function add (e: math.Add, t: Table): NumberColumn {
  return binop(e, t, (a, b) => a + b)
}

export function sub (e: math.Sub, t: Table): NumberColumn {
  return binop(e, t, (a, b) => a - b)
}

export function mul (e: math.Mul, t: Table): NumberColumn {
  return binop(e, t, (a, b) => a * b)
}

export function div (e: math.Div, t: Table): NumberColumn {
  return binop(e, t, (a, b) => a / b)
}
