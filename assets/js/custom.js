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
