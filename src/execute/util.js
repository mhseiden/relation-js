// @flow

export function zipWithNullSafe<T, U, V> (l: Array<?T>, r: Array<?U>, f: (T, U) => V): Array<?V> {
  const len = l.length
  if (len !== r.length) {
    throw new Error("length doesn't match")
  }

  const out = []
  for (let idx = 0; idx < len; idx++) {
    const lval = l[idx]
    const rval = r[idx]
    if (lval == null || rval == null) {
      out.push(null)
    } else {
      out.push(f(lval, rval))
    }
  }
  return out
}

export function map<T, U> (d: Array<?T>, f: (?T) => U): Array<U> {
  return d.map(f)
}
export function mapNullSafe<T, U> (d: Array<?T>, f: (T) => U): Array<?U> {
  return d.map(e => e == null ? null : f(e))
}
