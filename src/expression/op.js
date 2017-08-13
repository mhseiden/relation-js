// @flow

type NumericOps =
  "add" |
  "sub" |
  "mul" |
  "div";

type StringOps =
  "left" |
  "right" |
  "concat";

type BooleanOps =
  "eq" |
  "ne" |
  "gt" |
  "lt" |
  "gte" |
  "lte" |
  "and" |
  "or" |
  "not" |
  "isnull";

type MiscOps =
  "literal" |
  "reference";

export type Aggregator =
  "count" |
  "cvl" |
  "min" |
  "max" |
  "sum";

export type Operator =
  Aggregator |
  NumericOps |
  StringOps |
  BooleanOps |
  MiscOps;
