// @flow

import { type Table, DataColumn } from './column.js'

type ColumnEntry = {|
  name: string,
  type: string,
  data: Array<any>
|}

// (max) XXX TODO - error checking during the load process...
export function loadColumns (columns: any): Table {
  const table = []
  for (const c of (columns: Array<ColumnEntry>)) {
    table.push([c.name, DataColumn.fromType(c.type, c.data)])
  }
  return table
}
