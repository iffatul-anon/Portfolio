// Helper selectors
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const yearEl = document.getElementById('year');

// Ensure all cards participate in scroll reveal animations
const revealTargets = [
	'.skill-card',
	'.project-card',
	'.achievement-card',
	'.cp-card',
	'.about-card',
	'.timeline-content',
	'.hobby-card',
	'.photo-card',
	'.contact-card',
	'.contact-info'
];

revealTargets.forEach(selector => {
	document.querySelectorAll(selector).forEach(el => {
		el.setAttribute('data-reveal', '');
	});
});

// Update footer year
if (yearEl) {
	yearEl.textContent = new Date().getFullYear();
}

// Mobile nav toggle
if (navToggle && navLinks) {
	navToggle.addEventListener('click', () => {
		const isOpen = navLinks.classList.toggle('open');
		navToggle.classList.toggle('open');
		navToggle.setAttribute('aria-expanded', String(isOpen));
	});

	navItems.forEach(link => {
		link.addEventListener('click', () => {
			navLinks.classList.remove('open');
			navToggle.classList.remove('open');
			navToggle.setAttribute('aria-expanded', 'false');
		});
	});
}

// Smooth scroll
navItems.forEach(link => {
	link.addEventListener('click', event => {
		const targetId = link.getAttribute('href');
		if (targetId && targetId.startsWith('#')) {
			event.preventDefault();
			const target = document.querySelector(targetId);
			if (target) {
				target.scrollIntoView({ behavior: 'smooth', block: 'start' });
			}
		}
	});
});

// Active link detection with IntersectionObserver
const observerOptions = { root: null, rootMargin: '0px', threshold: 0.4 };
const activeObserver = new IntersectionObserver(entries => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			const id = entry.target.id;
			navItems.forEach(link => {
				link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
			});
		}
	});
}, observerOptions);

sections.forEach(section => activeObserver.observe(section));

// Scroll reveal animations using IntersectionObserver (replay on re-enter)
const revealElements = document.querySelectorAll('[data-reveal]');
const revealObserver = new IntersectionObserver(entries => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			entry.target.classList.add('visible');
		} else {
			entry.target.classList.remove('visible');
		}
	});
}, { threshold: 0.2, rootMargin: '0px 0px -5% 0px' });

revealElements.forEach(el => revealObserver.observe(el));
