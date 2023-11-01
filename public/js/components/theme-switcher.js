// @TODO: move to bundle or edge function to get/set cookie before load

document.addEventListener('DOMContentLoaded', () => {
	const themeSwitcher = document.querySelector('.theme-switcher');
	const defaultTheme = (window.matchMedia("(prefers-color-scheme: dark)").matches ? 'holodeck' : 'light');
	const currentTheme = localStorage.getItem('theme');

	if(!currentTheme) {
		localStorage.setItem('theme', defaultTheme);
		document.documentElement.dataset.theme = defaultTheme;
	}
	else {
		document.documentElement.dataset.theme = currentTheme;
	}

	if(themeSwitcher) {
		themeSwitcher.addEventListener('click', (event) => {
			if(event.target.tagName === 'BUTTON') {
				document.querySelector('html').dataset.theme = event.target.value;
				localStorage.setItem('theme', event.target.value);
			}
		});
	}
});