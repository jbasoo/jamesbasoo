const breakpoints = require('./config/breakpoints')

module.exports = {
	plugins: {
		'postcss-simple-vars': {variables: breakpoints},
		'postcss-nesting': {},
		'autoprefixer': {}
	}
}