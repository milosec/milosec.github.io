// Optimized spotlight effect: Listeners attached to cards only, and updates throttled via requestAnimationFrame
document.querySelectorAll('.card').forEach(card => {
	card.addEventListener('mousemove', e => {
		const rect = card.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

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

// ScrollSpy Implementation
const sections = document.querySelectorAll('section[id]');
const navLinksMap = new Map();
document.querySelectorAll('.nav-links a').forEach(link => {
	const href = link.getAttribute('href');
	if (href && href.startsWith('#')) {
		const id = href.substring(1);
		navLinksMap.set(id, link);
	}
});

const observerOptions = {
	root: null,
	rootMargin: '-50% 0px -50% 0px',
	threshold: 0
};

const observer = new IntersectionObserver((entries) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			const id = entry.target.id;

			// Remove active class from all links
			document.querySelectorAll('.nav-links a').forEach(link => {
				link.classList.remove('active');
				link.removeAttribute('aria-current');
			});

			// Add active class to current link
			const activeLink = navLinksMap.get(id);
			if (activeLink) {
				activeLink.classList.add('active');
				activeLink.setAttribute('aria-current', 'page');
			}
		}
	});
}, observerOptions);

sections.forEach(section => observer.observe(section));
