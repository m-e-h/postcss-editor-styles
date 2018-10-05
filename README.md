# PostCSS Scope To [<img src="https://postcss.github.io/postcss/logo.svg" alt="PostCSS" width="90" height="90" align="right">][postcss]

[![NPM Version][npm-img]][npm-url]
[![Build Status][cli-img]][cli-url]
[![Support Chat][git-img]][git-url]

[PostCSS Scope To] lets you do this in CSS.

```pcss
.example {}

/* becomes */

.example {}
```

## Usage

Add [PostCSS Scope To] to your project:

```bash
npm install postcss-scope-to --save-dev
```

Use [PostCSS Scope To] to process your CSS:

```js
const postcssScopeTo = require('postcss-scope-to');

postcssScopeTo.process(YOUR_CSS /*, processOptions, pluginOptions */);
```

Or use it as a [PostCSS] plugin:

```js
const postcss = require('postcss');
const postcssScopeTo = require('postcss-scope-to');

postcss([
  postcssScopeTo(/* pluginOptions */)
]).process(YOUR_CSS /*, processOptions */);
```

[PostCSS Scope To] runs in all Node environments, with special instructions for:

| [Node](INSTALL.md#node) | [PostCSS CLI](INSTALL.md#postcss-cli) | [Webpack](INSTALL.md#webpack) | [Create React App](INSTALL.md#create-react-app) | [Gulp](INSTALL.md#gulp) | [Grunt](INSTALL.md#grunt) |
| --- | --- | --- | --- | --- | --- |

[cli-img]: https://img.shields.io/travis/m-e-h/postcss-scope-to.svg
[cli-url]: https://travis-ci.org/m-e-h/postcss-scope-to
[git-img]: https://img.shields.io/badge/support-chat-blue.svg
[git-url]: https://gitter.im/postcss/postcss
[npm-img]: https://img.shields.io/npm/v/postcss-scope-to.svg
[npm-url]: https://www.npmjs.com/package/postcss-scope-to

[PostCSS]: https://github.com/postcss/postcss
[PostCSS Scope To]: https://github.com/m-e-h/postcss-scope-to
