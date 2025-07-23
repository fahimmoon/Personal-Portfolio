document.addEventListener('DOMContentLoaded', function () {
  const skillCards = document.querySelectorAll('.skills-card'); 
  if (!skillCards.length) return;

  const animateCard = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const card = entry.target;
        card.classList.add('is-visible');

        const skillItems = card.querySelectorAll('.skill-item'); 
        skillItems.forEach(item => {
          const level = item.getAttribute('data-level');
          const progressBar = item.querySelector('.skill-item__fill'); 
          if (progressBar) {
            progressBar.style.width = level + '%';
          }
        });

        observer.unobserve(card);
      }
    });
  };

  const cardObserver = new IntersectionObserver(animateCard, {
    threshold: 0.3
  });

  skillCards.forEach(card => {
    cardObserver.observe(card);
  });
});