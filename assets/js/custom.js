// Optimized spotlight effect: Listeners attached to cards only, and updates throttled via requestAnimationFrame
document.querySelectorAll('.card').forEach(card => {
	let ticking = false;
	let rect = null;

	card.addEventListener('mouseenter', () => {
		// Cache document-relative bounding rect to prevent layout thrashing on mousemove
		const bounds = card.getBoundingClientRect();
		rect = {
			top: bounds.top + window.scrollY,
			left: bounds.left + window.scrollX
		};
	});

	card.addEventListener('mouseleave', () => {
		rect = null;
	});

	card.addEventListener('mousemove', e => {
		if (!rect || ticking) return;

		// Calculate mouse position relative to the document-relative bounding rect
		const x = e.pageX - rect.left;
		const y = e.pageY - rect.top;

		ticking = true;
		requestAnimationFrame(() => {
			card.style.setProperty('--mouse-x', `${x}px`);
			card.style.setProperty('--mouse-y', `${y}px`);
			ticking = false;
		});
	});
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

	// Reset on resize using matchMedia to prevent layout thrashing
	const mediaQuery = window.matchMedia('(min-width: 769px)');
	mediaQuery.addEventListener('change', (e) => {
		if (e.matches) {
			menuToggle.setAttribute('aria-expanded', 'false');
			navLinks.classList.remove('active');
			document.body.style.overflow = '';
		}
	});
}
