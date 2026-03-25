// Optimized spotlight effect: Listeners attached to cards only, layout metrics cached on mouseenter, and updates throttled via requestAnimationFrame
document.querySelectorAll('.card').forEach(card => {
	let docLeft = null;
	let docTop = null;
	let ticking = false;

	card.addEventListener('mouseenter', () => {
		const rect = card.getBoundingClientRect();
		docLeft = rect.left + (window.pageXOffset || document.documentElement.scrollLeft);
		docTop = rect.top + (window.pageYOffset || document.documentElement.scrollTop);
	});

	card.addEventListener('mousemove', e => {
		if (docLeft === null || docTop === null) {
			const rect = card.getBoundingClientRect();
			docLeft = rect.left + (window.pageXOffset || document.documentElement.scrollLeft);
			docTop = rect.top + (window.pageYOffset || document.documentElement.scrollTop);
		}

		if (!ticking) {
			requestAnimationFrame(() => {
				const x = e.pageX - docLeft;
				const y = e.pageY - docTop;
				card.style.setProperty('--mouse-x', `${x}px`);
				card.style.setProperty('--mouse-y', `${y}px`);
				ticking = false;
			});
			ticking = true;
		}
	});

	card.addEventListener('mouseleave', () => {
		docLeft = null;
		docTop = null;
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
