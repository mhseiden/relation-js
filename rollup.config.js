import babel from 'rollup-plugin-babel';

export default {
  entry: 'src/index.js',
  format: 'umd',
  plugins: [
    babel({
      babelrc: false,
      plugins: ["transform-class-properties", "external-helpers"],
      presets: [
        "flow",
        ["env", { modules: false }]
      ],
      exclude: 'node_modules/**' // only transpile our source code
    })
  ],
  moduleName: 'relation',
  dest: 'relation.js'
};
