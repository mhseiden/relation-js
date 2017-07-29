// @flow /* eslint-env jest */
import { type Table, DataColumn, NumberColumn, StringColumn } from './execute'

export function mkNumberColumn (): [string, DataColumn<*>] {
  return [
    'number',
    new NumberColumn([0, 1, 2, null, 4, 5])
  ]
}

export function mkStringColumn (): [string, DataColumn<*>] {
  return [
    'string',
    new StringColumn(['', '1', '2', null, '4', '5'])
  ]
}

export function mkTestTable (): Table {
  return [
    mkNumberColumn(),
    mkStringColumn()
  ]
}

test('sanity', () => expect(1).toBe(1))
