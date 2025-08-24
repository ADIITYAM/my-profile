// ---------- JS: interactions, animations, validation ----------

// Year
document.getElementById('year')?.append(new Date().getFullYear());

// Mobile nav toggle
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
menuBtn?.addEventListener('click', () => navLinks.classList.toggle('open'));

// Theme toggle
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light');
    localStorage.setItem('prefers-light', document.body.classList.contains('light') ? '1' : '0');
  });
  if (localStorage.getItem('prefers-light') === '1') document.body.classList.add('light');
}

// Reveal on scroll (IntersectionObserver)
const io = new IntersectionObserver((entries) => {
  for (const e of entries) {
    if (e.isIntersecting) {
      e.target.classList.add('show');
      io.unobserve(e.target);
    }
  }
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Animate skill bars when visible
document.querySelectorAll('.bar span').forEach(span => {
  const width = span.getAttribute('data-width');
  const animate = (entry) => { if (entry.isIntersecting) { span.style.width = width + '%'; obs.unobserve(span); } };
  const obs = new IntersectionObserver(entries => entries.forEach(animate), { threshold: 0.5 });
  obs.observe(span);
});

// Back to top button
const toTop = document.getElementById('toTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) toTop?.classList.add('show');
  else toTop?.classList.remove('show');
});
toTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Blog search filter
const search = document.getElementById('search');
if (search) {
  search.addEventListener('input', () => {
    const q = search.value.toLowerCase();
    document.querySelectorAll('.blog-card').forEach(card => {
      const title = (card.getAttribute('data-title') || '').toLowerCase();
      card.style.display = title.includes(q) ? '' : 'none';
    });
  });
}

// Contact form validation + dummy "send"
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  const statusEl = document.getElementById('formStatus');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');

    let ok = true;

    const setErr = (el, msg) => { el.nextElementSibling.textContent = msg; ok = false; };
    [name, email, message].forEach(el => el.nextElementSibling.textContent = '');

    if (!name.value.trim()) setErr(name, 'Please enter your name');
    if (!email.value.match(/^\S+@\S+\.\S+$/)) setErr(email, 'Please enter a valid email');
    if (message.value.trim().length < 10) setErr(message, 'Message must be at least 10 characters');

    if (!ok) return;

    statusEl.textContent = 'Sending...';
    setTimeout(() => {
      statusEl.textContent = 'Message sent! (Demo)';
      contactForm.reset();
    }, 700);
  });
}
