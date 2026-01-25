document.addEventListener('mousemove', e => {
	document.querySelectorAll('.card').forEach(card => {
		const rect = card.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		card.style.setProperty('--mouse-x', `${x}px`);
		card.style.setProperty('--mouse-y', `${y}px`);
	});
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function (e) {
		e.preventDefault();
		document.querySelector(this.getAttribute('href')).scrollIntoView({
			behavior: 'smooth'
		});
	});
});

// Email Obfuscation
document.querySelectorAll('a[data-user][data-domain]').forEach(link => {
	link.addEventListener('click', function (e) {
		e.preventDefault();
		const user = this.getAttribute('data-user');
		const domain = this.getAttribute('data-domain');
		window.location.href = `mailto:${user}@${domain}`;
	});
});
