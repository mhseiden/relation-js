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
  "and" |
  "or" |
  "not" |
  "isnull";

type MiscOps =
  "literal" |
  "reference";

export type Operator =
  NumericOps |
  StringOps |
  BooleanOps |
  MiscOps;
