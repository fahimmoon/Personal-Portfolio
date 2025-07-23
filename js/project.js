document.addEventListener('DOMContentLoaded', () => {
    const workSection = document.getElementById('projects');
    if (!workSection) return;

    const filterButtons = workSection.querySelectorAll('.filter-btn');
    const allProjectCards = Array.from(workSection.querySelectorAll('.work-card'));
    const seeMoreBtn = document.getElementById('see-more-btn');
    const projectsToShowInitially = 3;

    let showingAll = false;
    let currentFilter = 'all';

    function updateCardVisibility() {
        let visibleCount = 0;
        const filteredCards = allProjectCards.filter(card => currentFilter === 'all' || card.dataset.category === currentFilter);

        allProjectCards.forEach(card => {
            const matchesFilter = currentFilter === 'all' || card.dataset.category === currentFilter;
            const shouldBeVisible = showingAll || visibleCount < projectsToShowInitially;

            if (matchesFilter && shouldBeVisible) {
                card.style.display = 'flex';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        if (seeMoreBtn) {
            if (filteredCards.length <= projectsToShowInitially) {
                seeMoreBtn.style.display = 'none';
            } else {
                seeMoreBtn.style.display = 'inline-flex';
                if (showingAll) {
                    seeMoreBtn.innerHTML = 'See Less <i class="fa-solid fa-arrow-up"></i>';
                } else {
                    seeMoreBtn.innerHTML = 'See More <i class="fa-solid fa-arrow-down"></i>';
                }
            }
        }
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            workSection.querySelector('.filter-btn.active').classList.remove('active');
            button.classList.add('active');

            currentFilter = button.dataset.filter;
            showingAll = false;
            updateCardVisibility();
        });
    });

    if (seeMoreBtn) {
        seeMoreBtn.addEventListener('click', () => {
            showingAll = !showingAll;
            updateCardVisibility();
        });
    }

    updateCardVisibility();
});