// ====================
// Burger menu
// ====================

document.addEventListener('DOMContentLoaded', () => {
    const burgerBtn = document.querySelector('.burger-btn');
    const mobileNav = document.querySelector('.mobile-nav');
    const navLinks = document.querySelectorAll('.nav-link');

    function toggleMenu() {
        burgerBtn.classList.toggle('active');
        mobileNav.classList.toggle('active');

        // Bloque le scroll quand le menu est ouvert
        if (mobileNav.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }

    // Click sur le menu burger
    burgerBtn.addEventListener('click', toggleMenu);

    // Click sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileNav.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
});

// ====================
// Dynamic text resize
// ====================

// Select the elements
const container = document.querySelector('.parent-container');
const text = document.querySelector('.adjustable-text');

// Security: Only run if both elements exist
if (container && text) {
  
  // Main adjustment function
  function adjustTextSize() {
    const targetWidth = container.clientWidth;
    
    // Cancel if the container is hidden (0px width)
    if (targetWidth === 0) return;

    // TRICK: Temporarily remove the text from the document flow 
    // to get its true unconstrained physical width
    text.style.position = 'absolute';
    text.style.width = 'auto';
    text.style.whiteSpace = 'nowrap';
    
    // Apply a base reference size
    text.style.fontSize = '100px';
    
    // Measure the width at 100px
    const widthAt100px = text.scrollWidth;
    
    // Calculate the perfect size using the rule of three
    const newSize = (targetWidth / widthAt100px) * 100;
    
    // Restore standard positioning
    text.style.position = '';
    text.style.width = '';
    
    // Apply the final calculated size with a 1% safety margin (0.99) 
    // to avoid unwanted line breaks caused by browser sub-pixel rendering
    text.style.fontSize = `${newSize * 0.99}px`;
  }

  // Wait for all custom fonts to load before calculating
  document.fonts.ready.then(() => {
    
    // Initial calculation
    adjustTextSize();

    // Re-calculate efficiently on window/container resize
    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(adjustTextSize);
    });
    
    resizeObserver.observe(container);
  });
}

// ====================
// Scramble effect
// ====================

const el = document.querySelector(".scramble");
// const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;':,.<>?";
// const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
// const chars = "0123456789";
const chars = "!@#$%^&*()_+-=[]{}|;':,.<>?";

el.addEventListener("mouseover", () => {
    const text = el.dataset.text;
    let i = 0;

    const interval = setInterval(() => {
        el.textContent = text
            .split("")
            .map((char, index) =>
                index < i
                    ? char
                    : chars[Math.floor(Math.random() * chars.length)]
            )
            .join("");

        i++;

        if (i > text.length) clearInterval(interval);
    }, 75);
});