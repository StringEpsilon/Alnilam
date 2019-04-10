module.exports = {
	presets: [
		"@babel/react",
		"@babel/typescript"
	],
	plugins: [
		["@babel/proposal-class-properties",
			{ loose: true }
		]
	],
	env:{
		development: {
			presets: [
				[
					"@babel/env", { loose: true, modules: false }
				],
			],
			plugins: [
				[
					"@babel/plugin-transform-runtime",
					{ "useESModules": false },
				]
			]
		},
		test: {
			presets: [
				[
					"@babel/env", { loose: true }
				],
			],
		}
	}
}
