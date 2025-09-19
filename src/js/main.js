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
let slideIndex = 0;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    let i;
    const slides = document.getElementsByClassName("carousel-item");
    const carouselInner = document.querySelector(".carousel-inner");
    if (n >= slides.length) { slideIndex = 0; }
    if (n < 0) { slideIndex = slides.length - 1; }
    
    carouselInner.style.transform = `translateX(-${slideIndex * 100}%)`;
}

// Modal
const modal = document.getElementById("myModal");
const btn = document.getElementById("modalBtn");
const span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

console.log('Hello World!')
