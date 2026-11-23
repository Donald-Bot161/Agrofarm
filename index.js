const stats = document.querySelectorAll(".stat-item h2");

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            const element = entry.target;
            const originalText = element.textContent;
            const number = parseInt(originalText.replace(/,/g, ""));
            const suffix = originalText.includes("+") ? "+" : "";

            let current = 0;
            const increment = Math.ceil(number / 60);

            const timer = setInterval(() => {

                current += increment;

                if (current >= number) {
                    current = number;
                    clearInterval(timer);
                }

                element.textContent =
                    current.toLocaleString() + suffix;

            }, 25);

            observer.unobserve(element);

        }

    });

}, { threshold: 0.5 });


stats.forEach(stat => observer.observe(stat));


// Smooth scrolling for homepage links

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function(event) {

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth"
            });
        }

    });

});
