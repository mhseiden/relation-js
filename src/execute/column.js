// @flow
import {
  type DataType,
  type Value,
  NUMBER_TYPE,
  STRING_TYPE,
  BOOLEAN_TYPE,
  UNKNOWN_TYPE
} from '../expression'

export class DataColumn<T> {
  data: Array<?T>;
  type: DataType;

  constructor (type: DataType, data: Array<?T>) {
    this.type = type
    this.data = data
  }

  static fromType (type: string, data: Array<any>): DataColumn<any> {
    switch (type) {
      case STRING_TYPE:
        return new StringColumn((data: Array<?string>))
      case NUMBER_TYPE:
        return new NumberColumn((data: Array<?number>))
      case BOOLEAN_TYPE:
        return new BooleanColumn((data: Array<?boolean>))
      default:
        return new UnknownColumn((data: Array<?null>))
    }
  }

  select (selector: Array<?boolean>): DataColumn<?T> {
    return new DataColumn(this.type, this.data.filter((e, i) => {
      return selector[i] || false
    }))
  }
}

export class UnknownColumn extends DataColumn<null> {
  constructor (data: Array<?null>) {
    super(UNKNOWN_TYPE, data)
  }
}

export class NumberColumn extends DataColumn<number> {
  constructor (data: Array<?number>) {
    super(NUMBER_TYPE, data)
  }
}

export class StringColumn extends DataColumn<string> {
  constructor (data: Array<?string>) {
    super(STRING_TYPE, data)
  }
}

export class BooleanColumn extends DataColumn<boolean> {
  constructor (data: Array<?boolean>) {
    super(BOOLEAN_TYPE, data)
  }
}

export function mkLiteralColumn (count: number, value: Value): DataColumn<*> {
  const data: Array<Value> = []
  for (; count > 0; --count) data.push(value)

  switch (typeof value) {
    case 'string': return new DataColumn(STRING_TYPE, data)
    case 'number': return new DataColumn(NUMBER_TYPE, data)
    case 'boolean': return new DataColumn(BOOLEAN_TYPE, data)
    default: return new DataColumn(UNKNOWN_TYPE, data)
  }
}

export type Schema = Array<[string, DataType]>;
export type Table = Array<[string, DataColumn<*>]>;
