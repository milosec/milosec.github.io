// Optimized spotlight effect: Listeners attached to cards only, updates throttled via requestAnimationFrame,
// and getBoundingClientRect cached on mouseenter to prevent layout thrashing
document.querySelectorAll('.card').forEach(card => {
	let rect = null;
	let scrollY = window.scrollY;
	let ticking = false;

	card.addEventListener('mouseenter', () => {
		rect = card.getBoundingClientRect();
		scrollY = window.scrollY;
	});

	card.addEventListener('mouseleave', () => {
		rect = null;
	});

	card.addEventListener('mousemove', e => {
		if (!rect) {
			rect = card.getBoundingClientRect();
			scrollY = window.scrollY;
		}

		const currentScrollY = window.scrollY;
		const scrollDiff = currentScrollY - scrollY;

		const x = e.clientX - rect.left;
		const y = e.clientY - (rect.top - scrollDiff);

		if (!ticking) {
			requestAnimationFrame(() => {
				card.style.setProperty('--mouse-x', `${x}px`);
				card.style.setProperty('--mouse-y', `${y}px`);
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

	// Reset on resize
	const mediaQuery = window.matchMedia('(min-width: 769px)');
	mediaQuery.addEventListener('change', (e) => {
		if (e.matches) {
			menuToggle.setAttribute('aria-expanded', 'false');
			navLinks.classList.remove('active');
			document.body.style.overflow = '';
		}
	});
}
