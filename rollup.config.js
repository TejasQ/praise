// rollup.config.js
import typescript from "rollup-plugin-typescript2";

export default {
  input: "./index.ts",
  output: { format: "umd", file: "dist/praise.js", name: "praise" },
  plugins: [typescript({ typescript: require("typescript") })]
};
