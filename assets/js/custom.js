// Optimized spotlight effect: Cache coordinates and throttle visual updates
document.querySelectorAll('.card').forEach(card => {
	let cachedRect = null;
	let ticking = false;

	const updateRect = () => {
		const rect = card.getBoundingClientRect();
		cachedRect = {
			left: rect.left + window.scrollX,
			top: rect.top + window.scrollY
		};
	};

	card.addEventListener('mouseenter', updateRect);

	if (typeof window.smartresize === 'function') {
		window.smartresize(updateRect);
	} else {
		window.addEventListener('resize', updateRect);
	}

	card.addEventListener('mousemove', e => {
		if (!cachedRect) updateRect();

		if (!ticking) {
			requestAnimationFrame(() => {
				const x = e.pageX - cachedRect.left;
				const y = e.pageY - cachedRect.top;
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
	window.addEventListener('resize', () => {
		if (window.innerWidth > 768) {
			menuToggle.setAttribute('aria-expanded', 'false');
			navLinks.classList.remove('active');
			document.body.style.overflow = '';
		}
	});
}
