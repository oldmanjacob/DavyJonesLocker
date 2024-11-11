document.addEventListener("DOMContentLoaded", () => {
    const scrollElements = document.querySelectorAll(".scroll-progress");
    const autoAnimateElements = document.querySelectorAll(".auto-animate");

    // Helper function to determine if an element is in view with an optional offset
    const elementInView = (el, offset = 0) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) - offset
        );
    };

    // Scroll progress handler
    const handleScrollProgress = () => {
        scrollElements.forEach((el) => {
            const rect = el.getBoundingClientRect();
            const elementHeight = el.offsetHeight;
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;

            // Calculate scroll progress between 0 and 1
            const elementTop = rect.top;
            const startPoint = windowHeight;
            const endPoint = -elementHeight;
            const progress = Math.min(
                Math.max((startPoint - elementTop) / (startPoint - endPoint), 0),
                1
            );

            // Set CSS variable for animation progress
            el.style.setProperty('--progress', progress);

            // Add the scroll-animate class if the element is in view
            if (progress > 0) {
                el.classList.add("scroll-animate");
            } else {
                el.classList.remove("scroll-animate");
            }
            console.log(`Element: ${el.className}, Progress: ${progress}`);
        });
    };

    // Auto animate handler with 200px offset
    const handleAutoAnimate = () => {
        autoAnimateElements.forEach((el) => {
            if (elementInView(el, 200)) { // Trigger 200px from the bottom
                setTimeout(() => el.classList.add("animate"), 0); // 1-second delay after entering view
            }
        });
    };

    // Initial call and scroll event listener
    window.addEventListener("scroll", () => {
        handleScrollProgress();
        handleAutoAnimate();
    });

    // Run handlers initially in case elements are in view on load
    handleScrollProgress();
    handleAutoAnimate();
});
