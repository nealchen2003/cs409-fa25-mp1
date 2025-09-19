// Your JS here.
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    const navbar = document.getElementById('navbar');
    const scrollPosition = window.scrollY;

    if (scrollPosition > 50) {
        header.classList.add('scrolled');
        navbar.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
        navbar.classList.remove('scrolled');
    }

    // Position Indicator
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('#navbar ul li a');
    let currentSection = '';

    // Highlight last menu item when at the bottom
    if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 2) { // Use a small tolerance
        const lastNavigableSection = Array.from(sections).reverse().find(section => {
            return document.querySelector(`#navbar ul li a[href="#${section.id}"]`);
        });
        if (lastNavigableSection) {
            currentSection = lastNavigableSection.id;
        }
    } else {
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbar.offsetHeight;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
    }

    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkHref = link.getAttribute('href');
        if (linkHref && linkHref.substring(1) === currentSection) {
            link.classList.add('active');
        }
    });
});

// Smooth Scrolling
document.querySelectorAll('#navbar a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Carousel JavaScript
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector(".carousel");
    if (!carousel || carousel.dataset.initialized) {
        return;
    }
    carousel.dataset.initialized = 'true';

    const carouselInner = carousel.querySelector(".carousel-inner");
    const slides = carousel.getElementsByClassName("carousel-item");
    const dotsContainer = carousel.parentElement.querySelector(".carousel-dots");
    const numSlides = slides.length;

    if (numSlides === 0) return;

    // Create dots
    for (let i = 0; i < numSlides; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        dot.addEventListener('click', () => {
            slideIndex = i + 1;
            moveToSlide();
            updateDots();
        });
        dotsContainer.appendChild(dot);
    }
    const dots = dotsContainer.getElementsByClassName('dot');

    const updateDots = () => {
        for (let i = 0; i < dots.length; i++) {
            dots[i].classList.remove('active');
        }
        // The active dot should correspond to the "real" slide index
        let activeDotIndex = (slideIndex - 1 + numSlides) % numSlides;
        dots[activeDotIndex].classList.add('active');
    };

    // Clone first and last slides for infinite loop effect
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[numSlides - 1].cloneNode(true);
    carouselInner.appendChild(firstClone);
    carouselInner.insertBefore(lastClone, slides[0]);

    let slideIndex = 1; // Start on the first "real" slide, not the clone

    const moveToSlide = () => {
        carouselInner.style.transform = `translateX(-${slideIndex * 100}%)`;
        updateDots();
    };

    // Initialize position without animation
    carouselInner.style.transition = 'none';
    moveToSlide();

    // Use a small timeout to ensure the initial position is set before enabling transitions
    setTimeout(() => {
        carouselInner.style.transition = 'transform 0.5s ease-in-out';
    }, 50);


    window.plusSlides = (n) => {
        slideIndex += n;
        carouselInner.style.transition = 'transform 0.5s ease-in-out';
        moveToSlide();
    };

    carouselInner.addEventListener('transitionend', () => {
        updateDots();
        // After transitioning to the cloned last slide, jump to the real last slide
        if (slideIndex === 0) {
            carouselInner.style.transition = 'none';
            slideIndex = numSlides;
            moveToSlide();
        }
        // After transitioning to the cloned first slide, jump to the real first slide
        if (slideIndex === numSlides + 1) {
            carouselInner.style.transition = 'none';
            slideIndex = 1;
            moveToSlide();
        }
    });
});


// Modal
const modal = document.getElementById("myModal");
const modalTrigger = document.querySelector(".modal-trigger");

modalTrigger.onclick = function() {
  modal.classList.add("show");
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.classList.remove("show");
  }
}

console.log('Hello World!')
