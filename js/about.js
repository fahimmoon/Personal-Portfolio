document.addEventListener('DOMContentLoaded', () => {
    const aboutSection = document.querySelector('.about');
    if (!aboutSection) return;


    const revealElements = aboutSection.querySelectorAll('.reveal');
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    }

    
    const tabButtons = aboutSection.querySelectorAll('.tab-btn');
    const tabPanels = aboutSection.querySelectorAll('.tab-panel');
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetPanelId = button.dataset.tab;
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            tabPanels.forEach(panel => {
                panel.classList.toggle('active', panel.id === targetPanelId);
            });
        });
    });
});