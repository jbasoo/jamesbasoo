const breakpoints = require('./config/breakpoints')

module.exports = {
	plugins: {
		'postcss-import': {},
		'postcss-simple-vars': { variables: breakpoints },
		'postcss-nesting': {},
		'autoprefixer': {},
		'cssnano': {},
		// '@fullhuman/postcss-purgecss': {
		// 	content: [
		// 		'./_site/**/*.html',
		// 		'./_site/**/*.css',
		// 		'./_site/**/*.js'
		// 	],
		// 	css: ['./site/css/main.css'],
		// 	rejected: true,
		// 	variables: true,
		// 	fontFace: true
		// }
	}
}