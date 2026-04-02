// Optimized spotlight effect: Listeners attached to cards only, and updates throttled via requestAnimationFrame
const cardCache = new WeakMap();

function updateCardCache(card) {
	const rect = card.getBoundingClientRect();
	cardCache.set(card, {
		left: rect.left + window.scrollX,
		top: rect.top + window.scrollY,
	});
}

document.querySelectorAll('.card').forEach(card => {
	card.addEventListener('mouseenter', () => updateCardCache(card));

	card.addEventListener('mousemove', e => {
		const cached = cardCache.get(card);
		if (!cached) return;

		const x = e.pageX - cached.left;
		const y = e.pageY - cached.top;

		requestAnimationFrame(() => {
			card.style.setProperty('--mouse-x', `${x}px`);
			card.style.setProperty('--mouse-y', `${y}px`);
		});
	});
});

window.addEventListener('resize', () => {
    document.querySelectorAll('.card').forEach(card => {
        if (cardCache.has(card)) {
            updateCardCache(card);
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
	window.addEventListener('resize', () => {
		if (window.innerWidth > 768) {
			menuToggle.setAttribute('aria-expanded', 'false');
			navLinks.classList.remove('active');
			document.body.style.overflow = '';
		}
	});
}
