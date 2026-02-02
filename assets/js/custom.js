// Optimized mousemove effect: Scoped listeners + RequestAnimationFrame
document.querySelectorAll('.card').forEach(card => {
	let ticking = false;
	card.addEventListener('mousemove', e => {
		if (!ticking) {
			window.requestAnimationFrame(() => {
				const rect = card.getBoundingClientRect();
				const x = e.clientX - rect.left;
				const y = e.clientY - rect.top;
// Optimized mousemove handling for cards
// Uses scoped event listeners and requestAnimationFrame to prevent layout thrashing
document.querySelectorAll('.card').forEach(card => {
	let ticking = false;
	card.addEventListener('mousemove', (e) => {
		if (!ticking) {
			const clientX = e.clientX;
			const clientY = e.clientY;
			window.requestAnimationFrame(() => {
				const rect = card.getBoundingClientRect();
				const x = clientX - rect.left;
				const y = clientY - rect.top;
				card.style.setProperty('--mouse-x', `${x}px`);
				card.style.setProperty('--mouse-y', `${y}px`);
				ticking = false;
			});
			ticking = true;
		}
	});
});

		requestAnimationFrame(() => {
			cards.forEach(card => {
				const rect = card.getBoundingClientRect();
				const x = clientX - rect.left;
				const y = clientY - rect.top;
				card.style.setProperty('--mouse-x', `${x}px`);
				card.style.setProperty('--mouse-y', `${y}px`);
			});
			ticking = false;
		});

		ticking = true;
	}
});

// Email Obfuscation
document.querySelectorAll('a[data-user][data-domain]').forEach(link => {
	const user = link.getAttribute('data-user');
	const domain = link.getAttribute('data-domain');
	const email = `${user}@${domain}`;

	// Inject email content dynamically to prevent simple scraping
	if (link.textContent.trim() !== email) {
		link.textContent = email;
	}

	link.addEventListener('click', function (e) {
		e.preventDefault();
		window.location.href = `mailto:${email}`;
	});
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
	menuToggle.addEventListener('click', () => {
		const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
		menuToggle.setAttribute('aria-expanded', !isExpanded);
		navLinks.classList.toggle('active');
		document.body.style.overflow = !isExpanded ? 'hidden' : '';
	});

	// Close menu when a link is clicked
	navLinks.querySelectorAll('a').forEach(link => {
		link.addEventListener('click', () => {
			menuToggle.setAttribute('aria-expanded', 'false');
			navLinks.classList.remove('active');
			document.body.style.overflow = '';
		});
	});

	// Reset on resize
	window.addEventListener('resize', () => {
		if (window.innerWidth > 768) {
			menuToggle.setAttribute('aria-expanded', 'false');
			navLinks.classList.remove('active');
			document.body.style.overflow = '';
		}
	});
}
