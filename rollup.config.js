const babel = require("rollup-plugin-babel");
const replace = require("rollup-plugin-replace");
const commonjs = require("rollup-plugin-commonjs");
const nodeResolve = require("rollup-plugin-node-resolve");
const { uglify } = require("rollup-plugin-uglify");
const { sizeSnapshot } = require("rollup-plugin-size-snapshot");
const pkg = require("./package.json");

function isBareModuleId(id) {
	return !id.startsWith(".") && !id.includes(pkg.name + "/");
}
const extensions = [".js", ".ts", ".tsx", ".jsx"];

export default function configureRollup(commandOptions) {
	const addSizeSnapshot = !commandOptions["config-ci"];
	const cjs = [
		{
			input: "src/index.ts",
			output: { file: `dist/cjs/${pkg.name}.js`, format: "cjs", compact: true, },
			external: isBareModuleId,
			plugins: [
				nodeResolve({ extensions }),
				babel({ exclude: /node_modules/, extensions }),
				replace({ "process.env.NODE_ENV": JSON.stringify("development") }),
				commonjs({ extensions }),
				addSizeSnapshot ? sizeSnapshot() : null,
			]
		},
		{
			input: "src/index.ts",
			output: { file: `dist/cjs/${pkg.name}.min.js`, format: "cjs", compact: true, },
			external: isBareModuleId,
			plugins: [
				nodeResolve({ extensions }),
				babel({ exclude: /node_modules/, extensions }),
				replace({ "process.env.NODE_ENV": JSON.stringify("production") }),
				uglify(),
				addSizeSnapshot ? sizeSnapshot() : null,
			]
		}
	];

	const esm = [
		{
			input: "src/index.ts",
			output: { file: `dist/esm/${pkg.name}.js`, format: "esm", entryFileNames: "[name].js" },
			external: isBareModuleId,
			plugins: [
				nodeResolve({ extensions }),
				babel({
					exclude: /node_modules/,
					extensions,
				}),
				addSizeSnapshot ? sizeSnapshot() : null,
			]
		}
	];

	return cjs.concat(esm);
}