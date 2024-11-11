document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const siteMenu = document.querySelector('.site-menu');
    const mainNav = document.querySelector('.main-nav');
    const menuItems = document.querySelectorAll('.menu-item');
    const subMenus = document.querySelectorAll('.menu-submenu');
    const circleBg = document.querySelector('.circle-bg');

    const enableMobileMenu = () => {
        burger.removeEventListener('click', toggleMainMenu);
        menuItems.forEach(menuItem => menuItem.removeEventListener('click', toggleSubMenu));
        if (window.matchMedia('(max-width: 768px)').matches) {
            burger.addEventListener('click', toggleMainMenu);
            menuItems.forEach(menuItem => menuItem.addEventListener('click', toggleSubMenu));
        }
    };

    const closeAllSubMenus = (excludeMenu = null) => {
        subMenus.forEach(subMenu => {
            if (subMenu !== excludeMenu) {
                subMenu.classList.add('slow-close');
                setTimeout(() => {
                    subMenu.classList.remove('active', 'visible', 'slow-close');
                }, 400);
            }
        });
    };

    const toggleMainMenu = () => {
        if (window.matchMedia('(max-width: 768px)').matches) {
            const anySubMenuActive = Array.from(subMenus).some(subMenu => subMenu.classList.contains('active'));
            if (anySubMenuActive) closeAllSubMenus();

            if (siteMenu.classList.contains('active')) {
                mainNav.classList.remove('active');
                siteMenu.classList.remove('active');
                setTimeout(() => {
                    siteMenu.classList.remove('visible');
                    burger.classList.remove('active');
                    document.body.classList.remove('menu-open');
                }, 300);
            } else {
                circleBg.classList.add('active');
                siteMenu.classList.add('visible');
                setTimeout(() => {
                    mainNav.classList.add('active');
                    siteMenu.classList.add('active');
                    burger.classList.add('active');
                    document.body.classList.add('menu-open');
                }, 50);
            }
        }
    };

    const toggleSubMenu = (event) => {
        event.preventDefault();
        const menuItem = event.currentTarget;
        const submenuId = menuItem.getAttribute('data-submenu');
        const targetSubMenu = document.getElementById(submenuId);
        closeAllSubMenus(targetSubMenu);
        targetSubMenu.classList.add('visible');
        setTimeout(() => {
            targetSubMenu.classList.add('active');
            siteMenu.classList.remove('active');
        }, 10);
    };

    enableMobileMenu();
    window.addEventListener('resize', enableMobileMenu);
});
