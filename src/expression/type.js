// @flow
export const UNKNOWN_TYPE = 'unknown'
export const NUMBER_TYPE = 'number'
export const STRING_TYPE = 'string'
export const BOOLEAN_TYPE = 'boolean'

export type Value = ?(string | number | boolean);
export type DataType = 'unknown' | 'number' | 'string' | 'boolean';

export function same (l: DataType, r: DataType): DataType {
  if (l !== r) {
    throw new Error(`Mismatched types: ${l} !== ${r}`)
  }
  return l
}
