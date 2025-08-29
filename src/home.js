const typingTexts = [
    "Sales",
    "App",
    "Website",

];

let currentTextIndex = 0;
const typewriterElement = document.getElementById('typewriter');
let isDeleting = false;
let text = '';
let delta = 100; // typing speed
let timeout = null;

function typeWriter() {
    const i = currentTextIndex % typingTexts.length;
    const fullText = typingTexts[i];

    if (isDeleting) {
        // Remove characters one by one
        text = fullText.substring(0, text.length - 1);
    } else {
        // Add characters one by one
        text = fullText.substring(0, text.length + 1);
    }

    typewriterElement.textContent = text;

    // Determine typing speed
    let typeSpeed = isDeleting ? delta / 2 : delta;

    // If word is complete
    if (!isDeleting && text === fullText) {
        typeSpeed = 2000; // pause at end of typing
        isDeleting = true;
    } else if (isDeleting && text === '') {
        isDeleting = false;
        currentTextIndex++;
        typeSpeed = 500; // pause before starting next phrase
    }

    timeout = setTimeout(typeWriter, typeSpeed);
}

// Start the typewriter effect
document.addEventListener('DOMContentLoaded', function () {
    // Set initial text
    text = typingTexts[0];
    typewriterElement.textContent = text;

    // Start animation after a delay
    setTimeout(() => {
        isDeleting = true;
        typeWriter();
    }, 3000);
});

// review section starts here 
document.addEventListener('DOMContentLoaded', function () {
    const reviews = document.querySelectorAll('.review');
    const indicators = document.querySelectorAll('.indicator');
    let currentIndex = 0;

    // Function to show a specific review
    function showReview(index) {
        // Hide all reviews
        reviews.forEach(review => review.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));

        // Show the selected review
        reviews[index].classList.add('active');
        indicators[index].classList.add('active');

        currentIndex = index;
    }

    // Set up auto-sliding
    function autoSlide() {
        let nextIndex = (currentIndex + 1) % reviews.length;
        showReview(nextIndex);
    }

    // Set interval for auto-sliding (every 5 seconds)
    let slideInterval = setInterval(autoSlide, 5000);

    // Add click events to indicators
    indicators.forEach(indicator => {
        indicator.addEventListener('click', function () {
            let index = parseInt(this.getAttribute('data-index'));
            showReview(index);

            // Reset the auto-slide timer when user clicks manually
            clearInterval(slideInterval);
            slideInterval = setInterval(autoSlide, 5000);
        });
    });

    // Pause auto-sliding when hovering over reviews
    const reviewsContainer = document.querySelector('.reviews-container');
    reviewsContainer.addEventListener('mouseenter', function () {
        clearInterval(slideInterval);
    });

    // Resume auto-sliding when mouse leaves
    reviewsContainer.addEventListener('mouseleave', function () {
        clearInterval(slideInterval);
        slideInterval = setInterval(autoSlide, 5000);
    });
});
// contact us section 
document.addEventListener('DOMContentLoaded', function () {
    const nameInput = document.getElementById('contact_us_h_name');
    const submitBtn = document.getElementById('contact_us_h_submitBtn');
    const animatedCheck = document.getElementById('contact_us_h_animatedCheck');

    // Focus on input when page loads
    nameInput.focus();

    // Handle form submission
    submitBtn.addEventListener('click', function () {
        if (nameInput.value.trim() === '') {
            // Shake animation for empty input
            nameInput.style.borderColor = '#ff4757';
            nameInput.animate([
                { transform: 'translateX(0)' },
                { transform: 'translateX(-5px)' },
                { transform: 'translateX(5px)' },
                { transform: 'translateX(-5px)' },
                { transform: 'translateX(5px)' },
                { transform: 'translateX(0)' }
            ], {
                duration: 500
            });

            // Reset border color after animation
            setTimeout(() => {
                nameInput.style.borderColor = '#e0e0e0';
            }, 500);
        } else {
            // Show success animation
            animatedCheck.classList.add('contact_us_h_show');

            // Change button text
            submitBtn.textContent = 'Thank You!';
            submitBtn.style.background = 'linear-gradient(135deg, #4cd964 0%, #2ab573 100%)';

            // Reset after 3 seconds
            setTimeout(() => {
                animatedCheck.classList.remove('contact_us_h_show');
                submitBtn.textContent = 'Continue';
                submitBtn.style.background = 'linear-gradient(135deg, #2a3e62 0%, #7a96c6 100%)';
                nameInput.value = '';
                nameInput.focus();
            }, 3000);
        }
    });

    // Press Enter to submit
    nameInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            submitBtn.click();
        }
    });
});
// serive secition
document.addEventListener('DOMContentLoaded', function () {
    const servicesLink = document.getElementById('servicesLink');
    const servicesDropdown = document.getElementById('servicesDropdown');
    const showDropdownBtn = document.getElementById('showDropdown');
    const hideDropdownBtn = document.getElementById('hideDropdown');
    const toggleDropdownBtn = document.getElementById('toggleDropdown');

    let dropdownTimeout;

    // Show dropdown function
    function showDropdown() {
        clearTimeout(dropdownTimeout);
        servicesDropdown.classList.add('active');
    }

    // Hide dropdown function with delay
    function hideDropdown() {
        dropdownTimeout = setTimeout(() => {
            servicesDropdown.classList.remove('active');
        }, 300); // 300ms delay before hiding
    }

    // Cancel hiding if needed
    function cancelHideDropdown() {
        clearTimeout(dropdownTimeout);
    }

    // Event listeners for services link
    servicesLink.addEventListener('mouseenter', showDropdown);
    servicesLink.addEventListener('mouseleave', hideDropdown);

    // Event listeners for dropdown itself
    servicesDropdown.addEventListener('mouseenter', cancelHideDropdown);
    servicesDropdown.addEventListener('mouseleave', hideDropdown);

    // Control buttons
    showDropdownBtn.addEventListener('click', showDropdown);
    hideDropdownBtn.addEventListener('click', hideDropdown);
    toggleDropdownBtn.addEventListener('click', function () {
        servicesDropdown.classList.toggle('active');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function (event) {
        if (!servicesLink.contains(event.target) && !servicesDropdown.contains(event.target)) {
            hideDropdown();
        }
    });
});
//  hehehe 

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');

    // Change icon based on menu state
    const icon = hamburger.querySelector('i');
    if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.querySelector('i').classList.remove('fa-times');
        hamburger.querySelector('i').classList.add('fa-bars');
    });
});

function filterSelection(category) {
      let items = document.querySelectorAll('.portfolio-item');
      let buttons = document.querySelectorAll('.filter-buttons button');

      buttons.forEach(btn => btn.classList.remove('active'));
      event.target.classList.add('active');

      items.forEach(item => {
        if (category === 'all' || item.classList.contains(category)) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    }