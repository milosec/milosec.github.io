// Optimized spotlight effect: Listeners attached to cards only, and updates throttled via requestAnimationFrame
// Caches bounds on mouseenter to prevent layout thrashing and uses a ticking lock for requestAnimationFrame
document.querySelectorAll('.card').forEach(card => {
	let rectLeft = 0;
	let rectTop = 0;
	let ticking = false;
	let currentX = 0;
	let currentY = 0;

	card.addEventListener('mouseenter', () => {
		const bounds = card.getBoundingClientRect();
		rectLeft = bounds.left + window.scrollX;
		rectTop = bounds.top + window.scrollY;
	});

	card.addEventListener('mousemove', e => {
		currentX = e.pageX - rectLeft;
		currentY = e.pageY - rectTop;

		if (!ticking) {
			requestAnimationFrame(() => {
				card.style.setProperty('--mouse-x', `${currentX}px`);
				card.style.setProperty('--mouse-y', `${currentY}px`);
				ticking = false;
			});
			ticking = true;
		}
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

	// Reset when crossing the desktop breakpoint
	const mediaQuery = window.matchMedia('(min-width: 769px)');
	mediaQuery.addEventListener('change', (e) => {
		if (e.matches) {
			menuToggle.setAttribute('aria-expanded', 'false');
			navLinks.classList.remove('active');
			document.body.style.overflow = '';
		}
	});
}
