// Optimized spotlight effect: Prevents layout thrashing by caching coordinates on mouseenter/resize
const cardCache = new WeakMap();

function updateCardCache(card) {
	const rect = card.getBoundingClientRect();
	cardCache.set(card, {
		left: rect.left + window.scrollX,
		top: rect.top + window.scrollY,
		ticking: false
	});
}

document.querySelectorAll('.card').forEach(card => {
	card.addEventListener('mouseenter', () => {
		updateCardCache(card);
	});

	card.addEventListener('mousemove', e => {
		let data = cardCache.get(card);
		if (!data) {
			updateCardCache(card);
			data = cardCache.get(card);
		}

		if (!data.ticking) {
			data.ticking = true;
			requestAnimationFrame(() => {
				const x = e.pageX - data.left;
				const y = e.pageY - data.top;
				card.style.setProperty('--mouse-x', `${x}px`);
				card.style.setProperty('--mouse-y', `${y}px`);
				data.ticking = false;
			});
		}
	});
});

const resizeHandler = () => {
	document.querySelectorAll('.card').forEach(card => {
		if (cardCache.has(card)) {
			updateCardCache(card);
		}
	});
};

if (window.smartresize) {
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
