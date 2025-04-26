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

// Modal functionality
const modal = document.getElementById('imageModal');
const modalContent = modal.querySelector('div > div'); // Vnitřní kontejner s obrázkem
const modalImage = document.getElementById('modalImage');

// Zabráníme propagaci kliknutí na obrázek a jeho kontejner
modalContent.addEventListener('click', function(e) {
    e.stopPropagation();
});

modalImage.addEventListener('click', function(e) {
    e.stopPropagation();
});

function openModal(imageSrc, title, description) {
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');

    modalImage.src = imageSrc;
    modalImage.alt = title;
    modalTitle.textContent = title;
    modalDescription.textContent = description;
    
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
}

function closeModal() {
    modal.classList.add('hidden');
    document.body.style.overflow = ''; // Restore scrolling
}

// Close modal when clicking outside the image
modal.addEventListener('click', function(e) {
    // Zkontrolujeme, jestli kliknutí bylo mimo vnitřní kontejner
    if (!modalContent.contains(e.target)) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Carousel functionality
const carouselTrack = document.querySelector('.carousel-track');
const carouselItems = document.querySelectorAll('.carousel-item');
const dots = document.querySelectorAll('.carousel-dot');
const prevButton = document.querySelector('.carousel-prev');
const nextButton = document.querySelector('.carousel-next');

let currentIndex = 0;
const itemWidth = carouselItems[0].offsetWidth;

// Funkce pro načtení obrázku
function loadImage(imgElement) {
    const src = imgElement.getAttribute('data-src');
    if (!src) return;

    const loadingSpinner = imgElement.parentElement.querySelector('.loading-spinner');
    
    // Skryjeme spinner a zobrazíme obrázek po načtení
    imgElement.onload = () => {
        imgElement.classList.remove('hidden');
        loadingSpinner.style.display = 'none';
    };

    // Nastavíme src, což spustí načítání
    imgElement.src = src;
}

// Funkce pro načtení aktuálního a sousedních obrázků
function loadCurrentAndAdjacentImages() {
    const prevIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
    const nextIndex = (currentIndex + 1) % carouselItems.length;

    // Načteme aktuální obrázek
    const currentImg = carouselItems[currentIndex].querySelector('img');
    loadImage(currentImg);

    // Načteme sousední obrázky
    const prevImg = carouselItems[prevIndex].querySelector('img');
    const nextImg = carouselItems[nextIndex].querySelector('img');
    loadImage(prevImg);
    loadImage(nextImg);
}

function updateCarousel() {
    carouselTrack.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    dots.forEach((dot, index) => {
        dot.classList.toggle('bg-blue-600', index === currentIndex);
        dot.classList.toggle('bg-gray-300', index !== currentIndex);
    });
    
    // Načteme obrázky při změně slide
    loadCurrentAndAdjacentImages();
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

// Načteme první obrázek při načtení stránky
loadCurrentAndAdjacentImages(); 