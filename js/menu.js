document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const siteMenu = document.querySelector('.site-menu');
    const mainNav = document.querySelector('.main-nav');
    const menuItems = document.querySelectorAll('.menu-item');
    const subMenus = document.querySelectorAll('.menu-submenu');
    const circleBg = document.querySelector('.circle-bg');

    let mobileMenuEnabled = false;

    const enableMobileMenu = () => {
        burger.removeEventListener('click', toggleMainMenu);
        menuItems.forEach(menuItem => menuItem.removeEventListener('click', toggleSubMenu));
    
        if (window.matchMedia('(max-width: 768px)').matches) {
            if (!mobileMenuEnabled) {
                burger.addEventListener('click', toggleMainMenu);
                menuItems.forEach(menuItem => menuItem.addEventListener('click', toggleSubMenu));
                mobileMenuEnabled = true;
            }
        } else {
            mobileMenuEnabled = false;
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
                circleBg.classList.remove('active');
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
// Popup
const popup = document.getElementById("deadLinkPopup");
        const closePopup = document.getElementById("closePopup");
        const deadLinks = document.querySelectorAll(".dead-link");

        // Show popup when dead link is clicked
        deadLinks.forEach(link => {
            link.addEventListener("click", (e) => {
                e.preventDefault(); // Prevent navigation
                popup.style.display = "flex"; // Show the popup
            });
        });

        // Close popup when "X" is clicked
        closePopup.addEventListener("click", () => {
            popup.style.display = "none";
        });

        // Close popup when clicking outside the popup
        popup.addEventListener("click", (e) => {
            if (e.target === popup) {
                popup.style.display = "none";
            }
        });
