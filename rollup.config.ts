import ts from "@wessberg/rollup-plugin-ts";
import commonjs from "rollup-plugin-commonjs";
import nodeResolve from "rollup-plugin-node-resolve";
import replace from "rollup-plugin-replace";
import { sizeSnapshot } from "rollup-plugin-size-snapshot";
import { uglify } from "rollup-plugin-uglify";
import pkg from "./package.json";

function isBareModuleId(id) {
	return !id.startsWith(".") && !id.includes(pkg.name + "/");
}
const extensions = [".js", ".ts", ".tsx", ".jsx"];

export default function configureRollup(commandOptions) {
	const addSizeSnapshot = !commandOptions["config-ci"];
	const cjs = [
		{
			input: "src/index.ts",
			output: { file: `dist/cjs/${pkg.name}.js`, format: "cjs", compact: true },
			external: isBareModuleId,
			plugins: [
				nodeResolve({ extensions }),
				ts({
					transpiler: "babel",
				}),
				replace({ "process.env.NODE_ENV": JSON.stringify("development") }),
				commonjs({ extensions }),
				addSizeSnapshot ? sizeSnapshot() : null,
			],
		},
		{
			input: "src/index.ts",
			output: { file: `dist/cjs/${pkg.name}.min.js`, format: "cjs", compact: true },
			external: isBareModuleId,
			plugins: [
				nodeResolve({ extensions }),
				ts({
					transpiler: "babel",
				}),
				replace({ "process.env.NODE_ENV": JSON.stringify("production") }),
				uglify(),
				addSizeSnapshot ? sizeSnapshot() : null,
			],
		},
	];

	const esm = [
		{
			input: "src/index.ts",
			output: { file: `dist/esm/${pkg.name}.js`, format: "esm", entryFileNames: "[name].js" },
			external: isBareModuleId,
			plugins: [
				nodeResolve({ extensions }),
				ts({
					transpiler: "babel",
				}),
				addSizeSnapshot ? sizeSnapshot() : null,
			],
		},
	];
	return [...cjs, esm];
}
