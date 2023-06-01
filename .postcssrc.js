const breakpoints = require('./config/breakpoints')

module.exports = {
	plugins: {
		'postcss-import': {},
		'postcss-simple-vars': {variables: breakpoints},
		'postcss-nesting': {},
		'autoprefixer': {},
		'cssnano': {}
	}
}