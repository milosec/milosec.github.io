// Optimized spotlight effect: Listeners attached to cards only, and updates throttled via requestAnimationFrame
// Further optimization: cache bounding rectangles on mouseenter/resize to prevent layout thrashing
const cards = document.querySelectorAll('.card');

cards.forEach(card => {
	let rect = null;
	let absLeft = 0;
	let absTop = 0;

	const updateRect = () => {
		rect = card.getBoundingClientRect();
		// Cache absolute page coordinates to handle scrolling properly without invalidating
		absLeft = rect.left + (window.scrollX || window.pageXOffset);
		absTop = rect.top + (window.scrollY || window.pageYOffset);
	};

	card.addEventListener('mouseenter', updateRect);
	if (window.smartresize) {
		window.smartresize(updateRect);
	} else {
		window.addEventListener('resize', updateRect);
	}

	card.addEventListener('mousemove', e => {
		if (!rect) updateRect(); // Lazy initialization just in case

		// Use page-relative mouse coordinates compared to cached absolute element coordinates
		const x = e.pageX - absLeft;
		const y = e.pageY - absTop;

		requestAnimationFrame(() => {
			card.style.setProperty('--mouse-x', `${x}px`);
			card.style.setProperty('--mouse-y', `${y}px`);
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

	// Reset on resize
	window.addEventListener('resize', () => {
		if (window.innerWidth > 768) {
			menuToggle.setAttribute('aria-expanded', 'false');
			navLinks.classList.remove('active');
			document.body.style.overflow = '';
		}
	});
}
