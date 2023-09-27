// @TODO: move to bundle or edge function to get/set cookie before load

document.addEventListener('DOMContentLoaded', () => {
	const themeSwitcher = document.querySelector('.theme-switcher');
	const defaultTheme = document.querySelectorAll('.theme-switcher input')[0].value;
	const currentTheme = localStorage.getItem('theme');
	
	console.log(currentTheme);
	
	if(!currentTheme) {
		localStorage.setItem('theme', defaultTheme);
		document.documentElement.dataset.theme = defaultTheme;
	}
	else {
		document.documentElement.dataset.theme = currentTheme;
	}
	
	if(themeSwitcher) {
		themeSwitcher.addEventListener('click', (event) => {
			document.querySelector('html').dataset.theme = event.target.value;
			localStorage.setItem('theme', event.target.value);
		});
	}
});