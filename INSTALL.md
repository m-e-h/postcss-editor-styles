# Installing PostCSS Editor Styles

[PostCSS Editor Styles] runs in all Node environments, with special instructions for:

| [Node](#node) | [PostCSS CLI](#postcss-cli) | [Webpack](#webpack) | [Create React App](#create-react-app) | [Gulp](#gulp) | [Grunt](#grunt) |
| ------------- | --------------------------- | ------------------- | ------------------------------------- | ------------- | --------------- |


## Node

Add [PostCSS Editor Styles] to your project:

```bash
npm install postcss-editor-styles --save-dev
```

Use [PostCSS Editor Styles] to process your CSS:

```js
const postcssEditorStyles = require("postcss-editor-styles");

postcssEditorStyles.process(YOUR_CSS /*, processOptions, pluginOptions */);
```

Or use it as a [PostCSS] plugin:

```js
const postcss = require("postcss");
const postcssEditorStyles = require("postcss-editor-styles");

postcss([postcssEditorStyles(/* pluginOptions */)]).process(
	YOUR_CSS /*, processOptions */
);
```

## PostCSS CLI

Add [PostCSS CLI] to your project:

```bash
npm install postcss-cli --save-dev
```

Use [PostCSS Editor Styles] in your `postcss.config.js` configuration file:

```js
const postcssEditorStyles = require("postcss-editor-styles");

module.exports = {
	plugins: [postcssEditorStyles(/* pluginOptions */)]
};
```

## Webpack

Add [PostCSS Loader] to your project:

```bash
npm install postcss-loader --save-dev
```

Use [PostCSS Editor Styles] in your Webpack configuration:

```js
const postcssEditorStyles = require("postcss-editor-styles");

module.exports = {
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					"style-loader",
					{ loader: "css-loader", options: { importLoaders: 1 } },
					{
						loader: "postcss-loader",
						options: {
							ident: "postcss",
							plugins: () => [
								postcssEditorStyles(/* pluginOptions */)
							]
						}
					}
				]
			}
		]
	}
};
```

## Create React App

Add [React App Rewired] and [React App Rewire PostCSS] to your project:

```bash
npm install react-app-rewired react-app-rewire-postcss --save-dev
```

Use [React App Rewire PostCSS] and [PostCSS Editor Styles] in your
`config-overrides.js` file:

```js
const reactAppRewirePostcss = require("react-app-rewire-postcss");
const postcssEditorStyles = require("postcss-editor-styles");

module.exports = config =>
	reactAppRewirePostcss(config, {
		plugins: () => [postcssEditorStyles(/* pluginOptions */)]
	});
```

## Gulp

Add [Gulp PostCSS] to your project:

```bash
npm install gulp-postcss --save-dev
```

Use [PostCSS Editor Styles] in your Gulpfile:

```js
const postcss = require("gulp-postcss");
const postcssEditorStyles = require("postcss-editor-styles");

gulp.task("css", () =>
	gulp
		.src("./src/*.css")
		.pipe(postcss([postcssEditorStyles(/* pluginOptions */)]))
		.pipe(gulp.dest("."))
);
```

## Grunt

Add [Grunt PostCSS] to your project:

```bash
npm install grunt-postcss --save-dev
```

Use [PostCSS Editor Styles] in your Gruntfile:

```js
const postcssEditorStyles = require("postcss-editor-styles");

grunt.loadNpmTasks("grunt-postcss");

grunt.initConfig({
	postcss: {
		options: {
			use: [postcssEditorStyles(/* pluginOptions */)]
		},
		dist: {
			src: "*.css"
		}
	}
});
```

[gulp postcss]: https://github.com/postcss/gulp-postcss
[grunt postcss]: https://github.com/nDmitry/grunt-postcss
[postcss]: https://github.com/postcss/postcss
[postcss cli]: https://github.com/postcss/postcss-cli
[postcss loader]: https://github.com/postcss/postcss-loader
[postcss editor styles]: https://github.com/m-e-h/postcss-editor-styles
[react app rewire postcss]: https://github.com/csstools/react-app-rewire-postcss
[react app rewired]: https://github.com/timarney/react-app-rewired
