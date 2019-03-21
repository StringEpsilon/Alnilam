module.exports = {
	presets: [
		["@babel/env", 
			{ loose: true }
		], 
		"@babel/react",
		"@babel/typescript"
	],
	plugins: [
		"dev-expression",
		["@babel/proposal-class-properties", 
			{ loose: true }
		]
	],
}
