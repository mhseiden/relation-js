// @flow

import { Expression } from '../expression/index.js'
import { type Table, type DataColumn } from './column'

import * as mathExpr from '../expression/math'
import * as mathExec from './math'

import * as attrExpr from '../expression/attr'
import * as attrExec from './attr'

import * as boolExpr from '../expression/boolean'
import * as boolExec from './boolean'

export default function (e: Expression<*>, t: Table): DataColumn<any> {
  // math.js
  if (e instanceof mathExpr.Add) {
    return mathExec.add(e, t)
  } else if (e instanceof mathExpr.Sub) {
    return mathExec.sub(e, t)
  } else if (e instanceof mathExpr.Mul) {
    return mathExec.mul(e, t)
  } else if (e instanceof mathExpr.Div) {
    return mathExec.div(e, t)
  }

  // boolean
  if (e instanceof boolExpr.IsNull) {
    return boolExec.isnull(e, t)
  } else if (e instanceof boolExpr.Not) {
    return boolExec.not(e, t)
  } else if (e instanceof boolExpr.Eq) {
    return boolExec.eq(e, t)
  } else if (e instanceof boolExpr.Ne) {
    return boolExec.ne(e, t)
  } else if (e instanceof boolExpr.Gt) {
    return boolExec.gt(e, t)
  } else if (e instanceof boolExpr.Gte) {
    return boolExec.gte(e, t)
  } else if (e instanceof boolExpr.Lt) {
    return boolExec.lt(e, t)
  } else if (e instanceof boolExpr.Lte) {
    return boolExec.lte(e, t)
  } else if (e instanceof boolExpr.And) {
    return boolExec.and(e, t)
  }

  // misc
  if (e instanceof attrExpr.Reference) {
    return attrExec.reference(e, t)
  } else if (e instanceof attrExpr.Literal) {
    return attrExec.literal(e, t)
  }

  throw new Error(`Missing handler for op: ${e.op}`)
}
