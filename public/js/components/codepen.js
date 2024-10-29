(() => {
	let cpScript = document.createElement('script');
	cpScript.src = 'https://cpwebassets.codepen.io/assets/embed/ei.js';

	let pens = document.querySelectorAll('.codepen');
	let observer = new IntersectionObserver(handleIntersection, {
		rootMargin: '100%',
		threshold: 0,
	});

	function handleIntersection(entries) {
		entries.map((entry) => {
			if (entry.isIntersecting) {
				document.querySelector('head').appendChild(cpScript);
				pens.forEach(pen => observer.unobserve(pen));
			}
		});
	}

	pens.forEach(pen => observer.observe(pen));
})();
