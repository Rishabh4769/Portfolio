// Create static blinking stars
function createStars() {
    const starsContainer = document.querySelector('.stars-container');
    const numberOfStars = 200;

    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        
        const sizeClass = Math.random() > 0.7 ? 'large' : (Math.random() > 0.5 ? 'medium' : 'small');
        star.classList.add(sizeClass);
        
        const speedClass = Math.random() > 0.7 ? 'fast' : (Math.random() > 0.4 ? 'slow' : '');
        if (speedClass) star.classList.add(speedClass);
        
        star.style.animationDelay = Math.random() * 4 + 's';
        
        starsContainer.appendChild(star);
    }
}

window.addEventListener('load', createStars);

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll animation for sections
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.project-card, .skill-category, .contact-card, .stat-box').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});
