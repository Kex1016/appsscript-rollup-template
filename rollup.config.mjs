import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve as resolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";

// rollup.config.mjs
export default {
	input: "src/index.ts",
	output: {
		file: "dist/bundle.js",
		format: "cjs",
	},
	plugins: [
		typescript(),
		commonjs({
			transformMixedEsModules: true,
			defaultIsModuleExports: true,
		}),
		resolve({ browser: true }),
	],
};
