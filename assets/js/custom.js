// Optimized spotlight effect: Caching absolute page coordinates to prevent layout thrashing
const cardCoords = new WeakMap();

const updateCardCoords = (card) => {
	const rect = card.getBoundingClientRect();
	cardCoords.set(card, {
		left: rect.left + window.scrollX,
		top: rect.top + window.scrollY
	});
};

document.querySelectorAll('.card').forEach(card => {
	card.addEventListener('mouseenter', () => updateCardCoords(card));

	card.addEventListener('mousemove', e => {
		const coords = cardCoords.get(card);
		if (!coords) return;

		const x = e.pageX - coords.left;
		const y = e.pageY - coords.top;

		requestAnimationFrame(() => {
			card.style.setProperty('--mouse-x', `${x}px`);
			card.style.setProperty('--mouse-y', `${y}px`);
		});
	});
});

const handleResize = () => {
	document.querySelectorAll('.card').forEach(card => {
		if (cardCoords.has(card)) {
			updateCardCoords(card);
		}
	});
};

if (typeof window.smartresize === 'function') {
	window.smartresize(handleResize);
} else {
	window.addEventListener('resize', handleResize);
}

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
