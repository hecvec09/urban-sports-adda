/* =============================================
   URBAN SPORTS ADDA — Interactive Script
   ============================================= */

// WhatsApp number (replace with actual number)
const WHATSAPP_NUMBER = '919999575042';

// Sport icons map
const sportIcons = {
    '360° Box Cricket': '🏏',
    'Football': '⚽',
    'Badminton': '🏸',
    'Pickleball': '🎾',
    'RC Car Racing': '🏎️',
    'Paddleball': '🏓',
    'Basketball': '🏀'
};

// ---- Loading Screen ----
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
    }, 1800);
});

// ---- Custom Cursor ----
const cursor = document.querySelector('.custom-cursor');
const follower = document.querySelector('.cursor-follower');

if (window.innerWidth > 768) {
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.transform = `translate(${mouseX - 6}px, ${mouseY - 6}px)`;
    });

    function animateFollower() {
        followerX += (mouseX - followerX) * 0.15;
        followerY += (mouseY - followerY) * 0.15;
        follower.style.transform = `translate(${followerX - 20}px, ${followerY - 20}px)`;
        requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Hover effect on interactive elements
    const hoverTargets = document.querySelectorAll('a, button, .sport-card, .cafe-card, .usp-card, .social-link, input');
    hoverTargets.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
}

// ---- Scroll Progress Bar ----
const scrollProgress = document.querySelector('.scroll-progress');
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
});

// ---- Sticky Nav ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ---- Active Nav Link ----
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// ---- Mobile Menu ----
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
});

mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ---- Particles (only if container exists) ----
const particleContainer = document.getElementById('particles');
if (particleContainer) {
    function createParticles() {
        const count = window.innerWidth > 768 ? 50 : 25;
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.width = (Math.random() * 4 + 2) + 'px';
            particle.style.height = particle.style.width;
            particle.style.animationDuration = (Math.random() * 8 + 4) + 's';
            particle.style.animationDelay = (Math.random() * 5) + 's';
            if (Math.random() > 0.5) {
                particle.style.background = 'var(--accent-orange)';
            }
            particleContainer.appendChild(particle);
        }
    }
    createParticles();
}

// ---- Scroll Reveal Animations ----
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Stagger children if it's a grid
            if (entry.target.closest('.sports-grid') || entry.target.closest('.cafe-grid') || entry.target.closest('.usp-grid')) {
                const parent = entry.target.closest('.sports-grid, .cafe-grid, .usp-grid');
                const children = parent.querySelectorAll('.sport-card, .cafe-card, .usp-card');
                children.forEach((child, i) => {
                    child.style.transitionDelay = (i * 0.1) + 's';
                });
            }
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.animate-title, .sport-card, .cafe-card, .usp-card').forEach(el => {
    observer.observe(el);
});

// ---- 3D Tilt Effect for Sport Cards ----
if (window.innerWidth > 768) {
    document.querySelectorAll('.sport-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -8;
            const rotateY = ((x - centerX) / centerX) * 8;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}

// ---- Booking Modal ----
const modal = document.getElementById('bookingModal');
const modalContent = document.getElementById('modalContent');
const modalClose = document.getElementById('modalClose');
const modalSportIcon = document.getElementById('modalSportIcon');
const modalSportName = document.getElementById('modalSportName');
const bookingForm = document.getElementById('bookingForm');
const modalSuccess = document.getElementById('modalSuccess');

let selectedSport = '';

function openModal(sportName) {
    selectedSport = sportName || '';
    if (sportName && sportIcons[sportName]) {
        modalSportIcon.textContent = sportIcons[sportName];
        modalSportName.textContent = sportName;
    } else {
        modalSportIcon.textContent = '🏟️';
        modalSportName.textContent = 'a Slot';
    }

    // Reset form
    bookingForm.reset();
    bookingForm.classList.remove('hidden');
    modalSuccess.classList.remove('show');

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Close on overlay click
modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

modalClose.addEventListener('click', closeModal);

// Close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});

// Book buttons on sport cards
document.querySelectorAll('.sport-book-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        openModal(btn.dataset.sport);
    });
});

// Sport cards click
document.querySelectorAll('.sport-card').forEach(card => {
    card.addEventListener('click', () => {
        openModal(card.dataset.sport);
    });
});

// Nav/Hero/Footer book buttons
['navBookBtn', 'heroBookBtn', 'mobileBookBtn', 'footerBookBtn'].forEach(id => {
    const btn = document.getElementById(id);
    if (btn) {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
            // Close mobile menu if open
            if (mobileMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
            }
        });
    }
});

// Form submission
bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('fullName').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const dateTime = document.getElementById('dateTime').value;
    const players = document.getElementById('players').value;

    // Build WhatsApp message
    let message = `Hi Urban Sports Adda! 👋\nI'd like to book a slot`;
    if (selectedSport) {
        message += ` for *${selectedSport}*`;
    }
    message += `.\n\nName: ${name}\nPhone: ${phone}`;
    if (dateTime) {
        const dt = new Date(dateTime);
        message += `\nDate/Time: ${dt.toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}`;
    }
    if (players) {
        message += `\nPlayers: ${players}`;
    }
    message += `\n\nPlease confirm my booking. Thank you!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    // Show success
    bookingForm.classList.add('hidden');
    modalSuccess.classList.add('show');

    // Confetti burst
    createConfetti();

    // Redirect after delay
    setTimeout(() => {
        window.open(whatsappUrl, '_blank');
        setTimeout(closeModal, 500);
    }, 1500);
});

// ---- Confetti ----
function createConfetti() {
    const colors = ['#00F5A0', '#FF4D00', '#FFB347', '#FF6B6B', '#4ECDC4', '#FFE66D'];
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.width = (Math.random() * 8 + 5) + 'px';
        confetti.style.height = (Math.random() * 8 + 5) + 'px';
        confetti.style.animationDelay = (Math.random() * 0.5) + 's';
        confetti.style.animationDuration = (Math.random() * 1 + 1) + 's';
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 2500);
    }
}

// ---- Phone Number Auto-Format ----
const phoneInput = document.getElementById('phone');
phoneInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 10) value = value.slice(0, 10);
    if (value.length > 5) {
        value = value.slice(0, 5) + ' ' + value.slice(5);
    }
    e.target.value = value;
});

// ---- Celebrity Video Play ----
const celebPlayBtn = document.getElementById('celebPlayBtn');
const celebVideo = document.getElementById('celebVideo');
if (celebPlayBtn && celebVideo) {
    celebPlayBtn.addEventListener('click', () => {
        celebVideo.classList.add('playing');
        celebVideo.play();
        celebPlayBtn.style.display = 'none';
    });
    celebVideo.addEventListener('ended', () => {
        celebVideo.classList.remove('playing');
        celebPlayBtn.style.display = 'flex';
        celebVideo.currentTime = 0;
    });
    celebVideo.addEventListener('click', () => {
        if (!celebVideo.paused) {
            celebVideo.pause();
            celebVideo.classList.remove('playing');
            celebPlayBtn.style.display = 'flex';
        }
    });
}

// ---- Smooth Scroll for all anchor links ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
