import ts from "@wessberg/rollup-plugin-ts";
import replace from "rollup-plugin-replace";
import { uglify } from "rollup-plugin-uglify";
import pkg from "./package.json";

function isBareModuleId(id) {
	return !id.startsWith(".") && !id.includes(pkg.name + "/");
}

export default function configureRollup(commandOptions) {
	const isCi = !commandOptions["config-ci"];
	return [
		// CJS:
		{
			input: "src/index.ts",
			output: { file: `dist/cjs/${pkg.name}.js`, format: "cjs", compact: true },
			external: isBareModuleId,
			plugins: [
				ts({
					transpiler: "babel",
				}),
				replace({ "process.env.NODE_ENV": JSON.stringify("development") }),
			],
		},
		{
			input: "src/index.ts",
			output: { file: `dist/cjs/${pkg.name}.min.js`, format: "cjs", compact: true },
			external: isBareModuleId,
			plugins: [
				ts({
					transpiler: "babel",
				}),
				replace({ "process.env.NODE_ENV": JSON.stringify("production") }),
				uglify(),
			],
		},
		// ESM:
		{
			input: "src/index.ts",
			output: { file: `dist/esm/${pkg.name}.js`, format: "esm", entryFileNames: "[name].js" },
			external: isBareModuleId,
			plugins: [
				ts({
					transpiler: "babel",
				}),
			],
		},
	];
}
