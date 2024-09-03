import Cookies from '/js-cookie/js.cookie.min.mjs'

const themeSwitcher = document.querySelector('.theme-switcher');
const defaultTheme = (window.matchMedia("(prefers-color-scheme: dark)").matches ? 'holodeck' : 'light');
const currentTheme = Cookies.get('theme');

if(!currentTheme) {
	Cookies.set('theme', defaultTheme);
	document.documentElement.dataset.theme = defaultTheme;
}
else {
	document.documentElement.dataset.theme = currentTheme;
}

if(themeSwitcher) {
	themeSwitcher.addEventListener('click', (event) => {
		if(event.target.tagName === 'BUTTON') {
			document.querySelector('html').dataset.theme = event.target.value;
			Cookies.set('theme', event.target.value);
		}
	});
}
