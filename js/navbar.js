document.addEventListener('DOMContentLoaded', () => {
    const mainHeader = document.querySelector('.main-header');
    const navList = document.querySelector('.main-header ul');
    const mobileNav = document.querySelector('.mobile-nav');

 
    if (mainHeader) {
        window.addEventListener('scroll', () => {
            mainHeader.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    
    let desktopNavLinks;
    const updateDesktopIndicator = (activeLink) => {
        if (!activeLink || !navList) return;
        const parentLi = activeLink.parentElement;
        const indicator = navList.style;
        indicator.setProperty('--indicator-left', `${parentLi.offsetLeft}px`);
        indicator.setProperty('--indicator-width', `${parentLi.offsetWidth}px`);
    };

    if (navList) {
        desktopNavLinks = navList.querySelectorAll('a');
        desktopNavLinks.forEach(link => {
            link.parentElement.addEventListener('click', () => {
                desktopNavLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                updateDesktopIndicator(link);
            });
        });
        window.addEventListener('resize', () => updateDesktopIndicator(navList.querySelector('a.active')));
    }


    let mobileNavItems;
    const updateMobileIndicator = (activeItem) => {
        if (!activeItem || !mobileNav) return;
        const navRect = mobileNav.getBoundingClientRect();
        const itemRect = activeItem.getBoundingClientRect();
        const indicator = mobileNav.style;
        indicator.setProperty('--indicator-left-mobile', `${itemRect.left - navRect.left}px`);
        indicator.setProperty('--indicator-width-mobile', `${itemRect.width}px`);
    };

    if (mobileNav) {
        mobileNavItems = mobileNav.querySelectorAll('.mobile-nav__item');
        mobileNavItems.forEach(item => {
            item.addEventListener('click', () => {
                mobileNavItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
                updateMobileIndicator(item);
            });
        });
        window.addEventListener('resize', () => updateMobileIndicator(mobileNav.querySelector('.mobile-nav__item.active')));
    }

   
    const sections = document.querySelectorAll('section[id]');
    if (sections.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    
                 
                    if (desktopNavLinks) {
                        desktopNavLinks.forEach(link => {
                            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                        });
                        const activeDesktopLink = navList.querySelector('a.active');
                        updateDesktopIndicator(activeDesktopLink);
                    }

                
                    if (mobileNavItems) {
                        mobileNavItems.forEach(item => {
                            item.classList.toggle('active', item.getAttribute('href') === `#${id}`);
                        });
                        const activeMobileItem = mobileNav.querySelector('.mobile-nav__item.active');
                        updateMobileIndicator(activeMobileItem);
                    }
                }
            });
        }, {
          
            rootMargin: '-25% 0px -75% 0px'
        });

        sections.forEach(section => observer.observe(section));
    }
    

    if (navList) updateDesktopIndicator(navList.querySelector('a.active'));
    if (mobileNav) updateMobileIndicator(mobileNav.querySelector('.mobile-nav__item.active'));
});