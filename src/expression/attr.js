// @flow

import {
  type DataType,
  type Value,
  NUMBER_TYPE,
  BOOLEAN_TYPE,
  STRING_TYPE,
  UNKNOWN_TYPE
} from './type.js'

import { LeafNode, type ReferenceMap } from './ast.js'

export class Reference extends LeafNode {
  name: string;

  constructor (name: string) {
    super('reference')
    this.name = name
  }

  typecheck (r: ReferenceMap): DataType {
    const t = r[this.name]
    if (t == null) {
      throw new Error(`Missing reference ${this.name}`)
    }
    return t
  }
}

export class Literal extends LeafNode {
  value: Value;

  constructor (value: Value) {
    super('literal')
    this.value = value
  }

  typecheck (r: ReferenceMap): DataType {
    if (typeof (this.value) === 'number') {
      return NUMBER_TYPE
    } else if (typeof (this.value) === 'string') {
      return STRING_TYPE
    } else if (typeof (this.value) === 'boolean') {
      return BOOLEAN_TYPE
    }

    return UNKNOWN_TYPE
  }
}
