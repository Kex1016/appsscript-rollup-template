/* eslint-disable no-console */
const { minify } = require("terser");
const { promises: fs } = require("node:fs");
const { join } = require("node:path");

const start = new Date();

const bundle = await fs.readFile(
	join(__dirname, "..", "dist", "bundle.js"),
	"utf-8",
);
const lines = bundle.split("\n");
const newLines = lines.filter((l) => !l.startsWith("exports"));
const code = newLines.join("\n");
const minifyCode = true; // change this if needed lol
if (minifyCode) {
	const minified = await minify(code, {
		compress: true,
		mangle: {
			keep_fnames: ["doOrders"],
		},
	});
	if (!minified.code) {
		throw new Error("minifier failed");
	}
	await fs.writeFile(
		join(__dirname, "..", "dist", "bundle.js"),
		minified.code,
	);
} else {
	await fs.writeFile(join(__dirname, "..", "dist", "bundle.js"), code);
}

const end = new Date();
console.log(`minify done in ${end - start}ms`);
