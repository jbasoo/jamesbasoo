// @TODO: move to bundle or edge function to get/set cookie before load

if(typeof themeSwitcher === 'undefined') {
	const themeSwitcher = document.querySelector('.theme-switcher');
	
	themeSwitcher.addEventListener('change', (event) => {
		document.querySelector('html').dataset.theme = event.target.value;
	});
}