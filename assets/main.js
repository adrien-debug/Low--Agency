document.addEventListener('DOMContentLoaded', () => {
  // 1. Header scroll effect
  const header = document.querySelector('[data-header]');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Intersection Observer for Scroll Animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll('[data-animate]');
  animatedElements.forEach((el, index) => {
    // Add staggered delay for grid items
    if (el.classList.contains('bento-card') || el.classList.contains('metric')) {
      el.style.transitionDelay = `${index % 3 * 100}ms`;
    }
    observer.observe(el);
  });

  // 3. Mobile Menu Toggle
  const toggleBtn = document.querySelector('[data-nav-toggle]');
  const navMenu = document.querySelector('#nav-menu'); // Note: In real production, would need mobile specific styling
  
  toggleBtn.addEventListener('click', () => {
    // Simple toggle logic - in a full build we'd add a class to body to lock scroll
    alert('Menu mobile activé (Fonctionnalité à implémenter selon le design system final)');
  });

  // 4. Smooth Anchor Scrolling (Native CSS is good, but JS offers more control if needed)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 100, // Offset for fixed header
          behavior: 'smooth'
        });
      }
    });
  });
});
