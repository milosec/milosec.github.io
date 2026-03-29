// Optimized spotlight effect: Listeners attached to cards only, caching coordinates on mouseenter/resize to prevent layout thrashing
const cards = document.querySelectorAll('.card');
const cardCoords = new WeakMap();

function updateCardCoords(card) {
	const rect = card.getBoundingClientRect();
	cardCoords.set(card, {
		left: rect.left + (window.scrollX || window.pageXOffset),
		top: rect.top + (window.scrollY || window.pageYOffset)
	});
}

cards.forEach(card => {
	card.addEventListener('mouseenter', () => {
		updateCardCoords(card);
	});

	card.addEventListener('mousemove', e => {
		if (!cardCoords.has(card)) {
			updateCardCoords(card);
		}

		const coords = cardCoords.get(card);

		const x = e.pageX - coords.left;
		const y = e.pageY - coords.top;

		requestAnimationFrame(() => {
			card.style.setProperty('--mouse-x', `${x}px`);
			card.style.setProperty('--mouse-y', `${y}px`);
		});
	});
});

const resizeHandler = () => {
	cards.forEach(card => updateCardCoords(card));
};

if (typeof window.smartresize === 'function') {
	window.smartresize(resizeHandler);
} else {
	window.addEventListener('resize', resizeHandler);
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
