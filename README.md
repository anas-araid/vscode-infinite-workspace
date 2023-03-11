##### ⚠️ Disclaimer
> This is just a work in progress proof of concept. Currently used only for experimental purposes so it's not optimized for daily use.

# VS Code Infinite Workspace

Prototype built in order to recreate a figma-like canvas experience in Visual Studio Code.

### Development

- Clone this repository
- Run `npm install` to install dependencies
- Run `npm run watch` to start developing
- Run `F5` to open a new window with the extension loaded.

### TODO

- initial children positioning algorithm
- close window
- save file
- create new file
- fix z-index/window focus issue
- on window drag -> decrease scale -> on drag end -> restore scale

### Known issues

- monaco editor supports only 4 [namespaces](https://microsoft.github.io/monaco-editor/typedoc/modules/languages.html) (html, css, ts, json)
- cannot read node_modules folder

### Contributing

If you have any questions or requests or want to contribute, please write an issue or give me a PR freely.

### Bug report

If you find a bug, please report to us opening a new [issue](https://github.com/anas-araid/vscode-infinite-workspace/issues) on GitHub.
