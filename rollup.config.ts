import ts from "@wessberg/rollup-plugin-ts";
import path from "path";
import resolve from "rollup-plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import replace from "@rollup/plugin-replace";
import pkg from "./package.json";

function isBareModuleId(id) {
  if (id.startsWith(".")) {
    return false;
  }
  if (id.startsWith("src")) {
    return false;
  }
  return !id.includes(path.join(process.cwd(), "src"));
}

export default function configureRollup(commandOptions) {
  return [
    // CJS:
    {
      input: "src/index.ts",
      output: { file: `dist/cjs/${pkg.name}.js`, format: "cjs", compact: true },
      external: isBareModuleId,
      plugins: [
        resolve({ extensions: [".js", ".jsx", ".ts", ".tsx"] }),
        ts({
          transpiler: "babel"
        }),
        replace({ "process.env.NODE_ENV": JSON.stringify("development") })
      ]
    },
    {
      input: "src/index.ts",
      output: {
        file: `dist/cjs/${pkg.name}.min.js`,
        format: "cjs",
        compact: true
      },
      external: isBareModuleId,
      plugins: [
        resolve({ extensions: [".js", ".jsx", ".ts", ".tsx"] }),
        ts({
          transpiler: "babel"
        }),
        replace({ "process.env.NODE_ENV": JSON.stringify("production") }),
        terser()
      ]
    },
    // ESM:
    {
      input: "src/index.ts",
      output: { file: `dist/esm/${pkg.name}.js`, format: "esm" },
      external: isBareModuleId,
      plugins: [
        resolve({ extensions: [".js", ".jsx", ".ts", ".tsx"] }),
        ts({
          transpiler: "babel"
        })
      ]
    },
    {
      input: "src/index.ts",
      output: { file: `dist/esm/${pkg.name}.min.js`, format: "esm" },
      external: isBareModuleId,
      plugins: [
        resolve({ extensions: [".js", ".jsx", ".ts", ".tsx"] }),
        ts({
          transpiler: "babel"
        }),
        terser()
      ]
    }
  ];
}
