document.addEventListener('DOMContentLoaded', () => {
    const contactSection = document.getElementById('contact');
    if (!contactSection) return;

    const revealElements = contactSection.querySelectorAll('.reveal');
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
               
                    entry.target.style.transitionDelay = `${index * 100}ms`;
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.1 
        });

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    }
});