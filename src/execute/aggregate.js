// @flow
import { type Expression, Aggregate } from '../expression/index.js'
import { type Aggregator } from '../expression/op.js'
import { type Table, DataColumn } from './column.js'
import { type DataType, NUMBER_TYPE } from '../expression/type.js'
import execute from './execute.js'

const DEFAULT_ID = 0

type Keys = Array<Expression<*>>;
type Aggs = Array<Aggregate<*>>;

class KeyMap<T> {
  map: { [T]: number };
  nextId: number;

  constructor () {
    this.map = {}
    this.nextId = 1 + DEFAULT_ID
  }

  insert (elem: ?T): number {
    if (elem == null) {
      return DEFAULT_ID
    }

    const key = (elem: any).toString()
    const id = this.map[key]
    if (id != null) {
      return id
    }

    this.map[key] = this.nextId
    return this.nextId++
  }
}

class Accumulator {
  input: DataColumn<*>;
  op: Aggregator;
  current: any;

  constructor (op: Aggregator, input: DataColumn<*>) {
    this.op = op
    this.input = input
    this.current = null
  }

  init (): Accumulator {
    return new Accumulator(this.op, this.input)
  }

  insert (row: number) {
    const next = this.input.data[row]
    this.current = aggregate(this.op, this.current, next)
  }

  type (): DataType {
    switch (this.op) {
      case 'min':
      case 'max':
        return this.input.type
      case 'count':
      case 'cvl':
      case 'sum':
        return NUMBER_TYPE
      default:
        throw new Error(`Unexpected op: ${this.op}`)
    }
  }
}

class AggMap {
  init: Array<Accumulator>;
  accs: { [string]: Array<Accumulator> };

  constructor (aggs: Aggs, table: Table) {
    this.accs = {}
    this.init = aggs.map(agg => {
      const input = execute(agg.input, table)
      return new Accumulator(agg.op, input)
    })
  }

  insert (row: number, key: Uint32Array) {
    if (key.length === 0) {
      return this.global(row)
    }

    const keyString = key.toString()

    let accs = this.accs[keyString]
    if (accs == null) {
      accs = this.init.map(acc => acc.init())
      this.accs[keyString] = accs
    }

    for (const acc of accs) {
      acc.insert(row)
    }
  }

  global (row: number) {
    for (const acc of this.init) {
      acc.insert(row)
    }
  }

  finish (global: boolean): Array<DataColumn<*>> {
    const outputCount = this.init.length
    const output = this.init.map(init => {
      return DataColumn.fromType(init.type(), [])
    })

    if (global) {
      for (let acc = 0; acc < outputCount; ++acc) {
        output[acc].data.push(this.init[acc].current)
      }
    } else {
      for (const key in this.accs) {
        const accs = this.accs[key]
        for (let acc = 0; acc < outputCount; ++acc) {
          output[acc].data.push(accs[acc].current)
        }
      }
    }

    return output
  }
}

export default function (table: Table, keys: Keys, aggs: Aggs): Array<DataColumn<*>> {
  const rowCount = table[0][1].data.length
  const keyCount = keys.length

  const keyData = keys.map(e => execute(e, table))
  const keyMaps = keyData.map(() => new KeyMap())

  const rowKey = new Uint32Array(keyCount)
  const aggMap = new AggMap(aggs, table)

  for (var row = 0; row < rowCount; ++row) {
    // update the aggregation map's row key
    for (var key = 0; key < keyCount; ++key) {
      const keyMap = keyMaps[key]
      const elem = keyData[key].data[row]
      rowKey[key] = keyMap.insert(elem)
    }

    aggMap.insert(row, rowKey)
  }

  return aggMap.finish(keyCount === 0)
}

function aggregate (op: Aggregator, current: any, next: any): any {
  if (op === 'count') {
    return (current || 0) + 1
  } else if (op === 'cvl') {
    return next == null ? (current || 0) : ((current || 0) + 1)
  }

  if (next == null) {
    return current
  } else if (current == null) {
    return next
  }

  switch (op) {
    case 'min':
      return (next < current) ? next : current
    case 'max':
      return (next > current) ? next : current
    case 'sum':
      return (current || 0) + (next || 0)
    default:
      throw new Error(`Unexpected op: ${op}`)
  }
}
