# Google Apps Script Rollup template

Powered by [Bun]()! Bring your own IDE and packages from npm to edit your Google Apps Scripts!

## Usage

1. Use this template to make a new repository.
1. Clone it to your machine, and run `bun install` in its directory.
1. Copy `appsscript.json.example` to `appsscript.json` and add your required [permissions]()
    - You can also delete the default permissions I provided, they are there... well, for examples of course.
1. Copy `.clasp.json.example` to `.clasp.json` and add your script's ID
1. [Enable the Google Apps Script API](https://script.google.com/home/usersettings)
1. Login to Google with `bunx clasp login`.
1. Write your code in `src`
1. ???
1. Profit.

### Linting

Linting is done using [Biome](), it will also write all its non-destructive fixes by default.

```sh
bun run lint
```

### Building

Building the app will run the linter, and also the minifier by default. The output will be in the `dist` folder.

```sh
bun run build
```

### Publishing

This runs the linter, the build and the minifier. Outputs to `dist` and also uploads your script to Google. This is what you want.

```sh
bun run publish
```

## Caveats

Your imports only make it to the end result if you export them somewhere. This is true even for the index.html:

`src/functions.ts`
```ts
export function logThreeTimes() {
    Logger.log("ThreeTimes");
}
```

`src/index.ts`
```ts
import {logThreeTimes} from "./functions.ts";

function unseenFunc() {
    Logger.log("this will not be in the bundle");
}

export function logLog() {
    logThreeTimes();
    Logger.log(9 + 10); // 21
}
```

`dist/bundle.js`
```js
"use strict";
function logThreeTimes() {
    Logger.log("ThreeTimes")
}
function logLog() {
    logThreeTimes();
    Logger.log(19)
}
```

Another caveat is with a lot of external functions or larger libraries your bundle might get a bit too big, making the finding of functions harder. Thankfully, they are sorted based on time of appearance, so most of your useful functions will just be at the bottom of the list.

## Editing the minifier

The minifier is literally just `tools/trim.js`. You can edit its behavior however you see fit. By default it:
- Removes all the export lines, as Apps Script does not support them.
- Minifies the output using [terser]().
