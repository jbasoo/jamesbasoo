// @TODO: move to bundle or edge function to get/set cookie before load
const themeSwitcherInputs = document.querySelectorAll('.theme-switcher input')

themeSwitcherInputs[0].checked = true;

themeSwitcherInputs.forEach((element) => {
	element.addEventListener('change', (event) => {
		document.querySelector('html').dataset.theme = event.target.value;
	});
});