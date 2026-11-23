const serviceCards = document.querySelectorAll(
    ".service-card, .service-item"
);

const serviceObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";

            serviceObserver.unobserve(entry.target);

        }

    });

}, { threshold: 0.15 });


serviceCards.forEach(card => {

    card.style.opacity = "0";
    card.style.transform = "translateY(25px)";
    card.style.transition = "all 0.6s ease";

    serviceObserver.observe(card);

});


// Smooth scrolling for service links

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function(event) {

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            event.preventDefault();
            target.scrollIntoView({ behavior: "smooth" });
        }

    });

});
