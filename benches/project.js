(function() {
  const expression = relation.expression;
  const operator = relation.operator;

  enqueue('convert to km', function() {
    const ref = new expression.Reference('distance');
    const lit = new expression.Literal(1.60934);
    const mul = new expression.Mul(ref, lit);
    const plist = [['distance (km)', mul]];
    return new operator.Project(mkScan(), plist);
  });

  enqueue('delay predicate', function() {
    const ref = new expression.Reference('delay');
    const lit = new expression.Literal(0);
    const gte = new expression.Gte(ref, lit);
    const plist = [['is delayed', gte]];
    return new operator.Project(mkScan(), plist);
  });
})();
