##### ⚠️ Disclaimer
> This is just a work in progress proof of concept. Currently used only for experimental purposes so it's not optimized for daily use.

# VS Code Infinite Workspace
https://user-images.githubusercontent.com/8178413/224749566-f8f8c318-2def-408b-a1a1-2898ec32db0a.mp4


Prototype built in order to recreate a figma-like canvas experience in Visual Studio Code.

### Development

- Clone this repository
- Run `npm install` to install dependencies
- Run `npm run watch` to start developing
- Run `F5` to open a new window with the extension loaded.

### TODO

- fix initial window positioning
- close window
- save file
- create new file
- fix z-index/window focus issue

### Known issues

- monaco editor supports only 4 [namespaces](https://microsoft.github.io/monaco-editor/typedoc/modules/languages.html) (html, css, ts, json)
- cannot read node_modules folder

### Contributing

If you have any questions or requests or want to contribute, please write an issue or give me a PR freely.

### Bug report

If you find a bug, please report to us opening a new [issue](https://github.com/anas-araid/vscode-infinite-workspace/issues) on GitHub.
