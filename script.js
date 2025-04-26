// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Výpočet let zkušeností
function calculateYearsOfExperience() {
    const startYear = 2006;
    const currentYear = new Date().getFullYear();
    const years = currentYear - startYear;
    document.getElementById('years-of-experience').textContent = years;
}

// Carousel functionality
const carouselTrack = document.querySelector('.carousel-track');
const carouselItems = document.querySelectorAll('.carousel-item');
const dots = document.querySelectorAll('.carousel-dot');
const prevButton = document.querySelector('.carousel-prev');
const nextButton = document.querySelector('.carousel-next');

let currentIndex = 0;
const itemWidth = carouselItems[0].offsetWidth;

function updateCarousel() {
    carouselTrack.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    dots.forEach((dot, index) => {
        dot.classList.toggle('bg-blue-600', index === currentIndex);
        dot.classList.toggle('bg-gray-300', index !== currentIndex);
    });
}

prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
    updateCarousel();
});

nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % carouselItems.length;
    updateCarousel();
});

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentIndex = index;
        updateCarousel();
    });
});

// Spustíme výpočet při načtení stránky
calculateYearsOfExperience(); 