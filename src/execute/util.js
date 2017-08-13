// @flow

export function zipWithNullSafe<T, U, V> (l: Array<?T>, r: Array<?U>, f: (T, U) => V): Array<?V> {
  const len = l.length
  if (len !== r.length) {
    throw new Error("length doesn't match")
  }

  const o = ((l.slice(0)): any)
  for (let idx = 0; idx < len; idx++) {
    const lval = (o[idx]: ?T)
    if (lval == null) continue

    const rval = r[idx]
    if (rval == null) {
      o[idx] = null
    } else {
      o[idx] = f(lval, rval)
    }
  }
  return o
}

export function map<T, U> (d: Array<?T>, f: (?T) => U): Array<U> {
  return d.map(f)
}
export function mapNullSafe<T, U> (d: Array<?T>, f: (T) => U): Array<?U> {
  return d.map(e => e == null ? null : f(e))
}

export function fill<T> (count: number, value: T): Array<T> {
  const data: Array<T> = new Array(count)
  if (data.fill) {
    data.fill(value)
  } else {
    for (var i = 0; i < count; ++i) data[i] = value
  }
  return data
}
