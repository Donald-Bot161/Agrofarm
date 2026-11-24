const aboutElements = document.querySelectorAll(
    ".about-content, .about-image, .about-card, .about-section"
);

const aboutObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";

            aboutObserver.unobserve(entry.target);

        }

    });

}, { threshold: 0.15 });


aboutElements.forEach(element => {

    element.style.opacity = "0";
    element.style.transform = "translateY(25px)";
    element.style.transition = "opacity 0.7s ease, transform 0.7s ease";

    aboutObserver.observe(element);

}); 
