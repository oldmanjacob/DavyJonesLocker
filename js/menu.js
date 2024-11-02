document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const siteMenu = document.querySelector('.site-menu');
    const mainNav = document.querySelector('.main-nav');
    const menuItems = document.querySelectorAll('.menu-item');
    const subMenus = document.querySelectorAll('.menu-submenu');

    const enableMobileMenu = () => {
        burger.removeEventListener('click', toggleMainMenu);
        menuItems.forEach(menuItem => menuItem.removeEventListener('click', toggleSubMenu));
        if (window.matchMedia('(max-width: 768px)').matches) {
            burger.addEventListener('click', toggleMainMenu);
            menuItems.forEach(menuItem => menuItem.addEventListener('click', toggleSubMenu));
        }
    };

    const toggleMainMenu = () => {
        const anySubMenuActive = Array.from(subMenus).some(subMenu => subMenu.classList.contains('active'));
        if (anySubMenuActive) {
            subMenus.forEach(subMenu => {
                subMenu.classList.add('slow-close');
                subMenu.classList.remove('active');
                setTimeout(() => subMenu.classList.remove('visible', 'slow-close'), 400);
            });
            mainNav.classList.remove('active');
            siteMenu.classList.remove('active', 'visible');
            burger.classList.remove('active');
            document.body.style.overflow = '';
        } else {
            siteMenu.classList.add('visible');
            setTimeout(() => {
                mainNav.classList.toggle('active');
                siteMenu.classList.toggle('active');
                burger.classList.toggle('active');
                document.body.style.overflow = 'hidden';
            }, 10);
        }
    };

    const toggleSubMenu = (event) => {
        event.preventDefault();
        const menuItem = event.currentTarget;
        const submenuId = menuItem.getAttribute('data-submenu');
        const targetSubMenu = document.getElementById(submenuId);
        subMenus.forEach(subMenu => {
            if (subMenu !== targetSubMenu) {
                subMenu.classList.remove('active');
                setTimeout(() => subMenu.classList.remove('visible'), 400);
            }
        });
        targetSubMenu.classList.add('visible');
        setTimeout(() => {
            targetSubMenu.classList.toggle('active');
            if (targetSubMenu.classList.contains('active')) {
                siteMenu.classList.remove('active', 'visible');
            }
        }, 10);
    };

    enableMobileMenu();
    window.addEventListener('resize', enableMobileMenu);
});
