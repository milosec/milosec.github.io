// Optimized spotlight effect: Listeners attached to cards only, and updates throttled via requestAnimationFrame
const cardRects = new WeakMap();

function updateCardRect(card) {
	const rect = card.getBoundingClientRect();
	cardRects.set(card, {
		left: rect.left + window.scrollX,
		top: rect.top + window.scrollY
	});
}

document.querySelectorAll('.card').forEach(card => {
	let ticking = false;

	card.addEventListener('mouseenter', () => {
		if (!cardRects.has(card)) {
			updateCardRect(card);
		}
	});

	card.addEventListener('mousemove', e => {
		if (!ticking) {
			window.requestAnimationFrame(() => {
				const rect = cardRects.get(card);
				if (rect) {
					const x = e.pageX - rect.left;
					const y = e.pageY - rect.top;
					card.style.setProperty('--mouse-x', `${x}px`);
					card.style.setProperty('--mouse-y', `${y}px`);
				}
				ticking = false;
			});
			ticking = true;
		}
	});
});

// Update cached rects on resize
const updateAllRects = () => {
	document.querySelectorAll('.card').forEach(card => {
		if (cardRects.has(card)) {
			updateCardRect(card);
		}
	});
};

if (typeof window.smartresize === 'function') {
	window.smartresize(updateAllRects);
} else {
	window.addEventListener('resize', updateAllRects);
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

	// Reset on resize (only triggered when crossing breakpoint)
	const mql = window.matchMedia('(min-width: 769px)');
	mql.addEventListener('change', (e) => {
		if (e.matches) {
			menuToggle.setAttribute('aria-expanded', 'false');
			navLinks.classList.remove('active');
			document.body.style.overflow = '';
		}
	});
}
