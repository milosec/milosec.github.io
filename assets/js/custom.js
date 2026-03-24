// Optimized spotlight effect: Listeners attached to cards only, and updates throttled via requestAnimationFrame
const cards = document.querySelectorAll('.card');

cards.forEach(card => {
	card._ticking = false;
	card._cachedRect = null;

	card._updateRect = () => {
		const rect = card.getBoundingClientRect();
		const scrollTop = document.documentElement.scrollTop || window.pageYOffset;
		const scrollLeft = document.documentElement.scrollLeft || window.pageXOffset;

		card._cachedRect = {
			top: rect.top + scrollTop,
			left: rect.left + scrollLeft,
			width: rect.width,
			height: rect.height
		};
	};

	card.addEventListener('mouseenter', card._updateRect);

	card.addEventListener('mousemove', e => {
		if (!card._cachedRect) {
			card._updateRect(); // Fallback initialization
		}

		if (!card._ticking) {
			window.requestAnimationFrame(() => {
				// Calculate position relative to the element, accounting for scroll
				const x = e.pageX - card._cachedRect.left;
				const y = e.pageY - card._cachedRect.top;

				card.style.setProperty('--mouse-x', `${x}px`);
				card.style.setProperty('--mouse-y', `${y}px`);
				card._ticking = false;
			});
			card._ticking = true;
		}
	});
});

// Invalidate caches globally on resize
window.addEventListener('resize', () => {
	cards.forEach(card => {
		card._cachedRect = null;
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
	window.addEventListener('resize', () => {
		if (window.innerWidth > 768) {
			menuToggle.setAttribute('aria-expanded', 'false');
			navLinks.classList.remove('active');
			document.body.style.overflow = '';
		}
	});
}
