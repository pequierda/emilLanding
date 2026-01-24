// Custom JavaScript for Landing Page

// Cookie utility functions
function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function generateVisitorId() {
    return 'visitor_' + Date.now() + '_' + Math.random().toString(36).substring(2, 15);
}

// Visitor Counter using Upstash Redis via API
async function updateVisitorCount() {
    const visitorCountElement = document.querySelector('.visitor-count');
    if (!visitorCountElement) return;

    try {
        let visitorId = getCookie('visitor_id');
        let isReturning = false;
        
        if (!visitorId) {
            visitorId = generateVisitorId();
            setCookie('visitor_id', visitorId, 365);
            isReturning = false;
        } else {
            isReturning = true;
        }
        
        const referrer = document.referrer || 'Direct';
        
        const response = await fetch('/api/visitor-count', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                referrer,
                visitorId,
                isReturning
            })
        });
        const data = await response.json();
        
        if (data.count !== undefined) {
            visitorCountElement.textContent = data.count.toLocaleString();
            
            if (data.visitor) {
                console.log('Visitor Info:', {
                    'Visitor Type': data.visitor.isReturning ? '🔄 RETURNING' : '✨ NEW',
                    'Visitor ID': data.visitor.visitorId,
                    IP: data.visitor.ip,
                    Device: data.visitor.device,
                    Browser: data.visitor.browser,
                    OS: data.visitor.os,
                    'Referrer (Full URL)': data.visitor.referrer,
                    'Referrer Domain': data.visitor.referrerDomain,
                    'Referrer Path': data.visitor.referrerPath
                });
            }
        } else {
            throw new Error('Invalid response format');
        }
    } catch (error) {
        console.error('Failed to update visitor count:', error);
        const visitorCountElement = document.querySelector('.visitor-count');
        if (visitorCountElement) {
            visitorCountElement.textContent = '---';
        }
    }
}

// Check if device is touch-enabled
function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
}

// Interactive Cursor Trail (desktop only)
let cursorTrail = null;
let mouseX = 0;
let mouseY = 0;
let trailX = 0;
let trailY = 0;

function initCursorTrail() {
    if (isTouchDevice()) {
        const trail = document.getElementById('cursor-trail');
        if (trail) trail.style.display = 'none';
        return;
    }
    
    cursorTrail = document.getElementById('cursor-trail');
    if (!cursorTrail) return;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateTrail() {
        trailX += (mouseX - trailX) * 0.1;
        trailY += (mouseY - trailY) * 0.1;
        
        if (cursorTrail) {
            cursorTrail.style.left = trailX + 'px';
            cursorTrail.style.top = trailY + 'px';
        }
        
        requestAnimationFrame(animateTrail);
    }
    
    animateTrail();
}

// Particle System
class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById('particles-canvas');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.isMobile = isTouchDevice();
        
        this.resize();
        this.init();
        
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => this.resize(), 250);
        });
        
        if (this.isMobile) {
            document.addEventListener('touchmove', (e) => {
                if (e.touches.length > 0) {
                    this.mouse.x = e.touches[0].clientX;
                    this.mouse.y = e.touches[0].clientY;
                }
            }, { passive: true });
        } else {
            document.addEventListener('mousemove', (e) => {
                this.mouse.x = e.clientX;
                this.mouse.y = e.clientY;
            });
        }
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.particles.forEach(particle => {
            if (particle.x > this.canvas.width) particle.x = this.canvas.width;
            if (particle.y > this.canvas.height) particle.y = this.canvas.height;
        });
    }
    
    init() {
        const baseCount = this.isMobile ? 20 : 50;
        const particleCount = Math.min(baseCount, Math.floor(window.innerWidth / (this.isMobile ? 30 : 20)));
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                radius: this.isMobile ? (Math.random() * 1 + 0.5) : (Math.random() * 2 + 1),
                speedX: (Math.random() - 0.5) * (this.isMobile ? 0.3 : 0.5),
                speedY: (Math.random() - 0.5) * (this.isMobile ? 0.3 : 0.5),
                opacity: this.isMobile ? (Math.random() * 0.3 + 0.1) : (Math.random() * 0.5 + 0.2)
            });
        }
        
        this.animate();
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach((particle, index) => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            if (particle.x < 0 || particle.x > this.canvas.width) particle.speedX *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.speedY *= -1;
            
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            const interactionDistance = this.isMobile ? 80 : 100;
            if (distance < interactionDistance) {
                const force = (interactionDistance - distance) / interactionDistance;
                particle.x -= (dx / distance) * force * (this.isMobile ? 0.3 : 0.5);
                particle.y -= (dy / distance) * force * (this.isMobile ? 0.3 : 0.5);
            }
            
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
            this.ctx.fill();
            
            if (index < this.particles.length - 1) {
                const nextParticle = this.particles[index + 1];
                const dx2 = nextParticle.x - particle.x;
                const dy2 = nextParticle.y - particle.y;
                const distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
                const connectionDistance = this.isMobile ? 80 : 100;
                
                if (distance2 < connectionDistance) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(nextParticle.x, nextParticle.y);
                    const opacity = this.isMobile ? 0.05 : 0.1;
                    this.ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * (1 - distance2 / connectionDistance)})`;
                    this.ctx.lineWidth = this.isMobile ? 0.5 : 1;
                    this.ctx.stroke();
                }
            }
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Planet Modal System
const planetInfo = {
    Mercury: "The smallest planet in our solar system and the closest to the Sun. It completes an orbit in just 88 Earth days!",
    Venus: "The hottest planet in our solar system, with surface temperatures hot enough to melt lead. It rotates backwards!",
    Earth: "Our home planet, the only known celestial body to harbor life. It's the third planet from the Sun.",
    Mars: "Known as the Red Planet due to iron oxide on its surface. It has the largest volcano in the solar system!",
    Jupiter: "The largest planet in our solar system. It's a gas giant with a Great Red Spot, a storm larger than Earth!",
    Saturn: "Famous for its beautiful ring system. It's less dense than water and would float if placed in a giant bathtub!"
};

function initPlanetModal() {
    const planets = document.querySelectorAll('.clickable-planet');
    const modal = document.getElementById('planet-modal');
    const closeModal = document.getElementById('close-modal');
    const planetName = document.getElementById('planet-name');
    const planetInfoText = document.getElementById('planet-info');
    
    if (!modal) return;
    
    planets.forEach(planet => {
        const handleClick = (e) => {
            e.stopPropagation();
            e.preventDefault();
            const planetNameValue = planet.getAttribute('data-planet');
            planetName.textContent = planetNameValue;
            planetInfoText.textContent = planetInfo[planetNameValue] || "Tap on planets to learn more!";
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; // Prevent background scroll
            
            const x = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : window.innerWidth / 2);
            const y = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : window.innerHeight / 2);
            createParticleBurst(x, y);
        };
        
        planet.addEventListener('click', handleClick);
        planet.addEventListener('touchend', handleClick, { passive: false });
    });
    
    const closeModalHandler = () => {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    };
    
    closeModal.addEventListener('click', closeModalHandler);
    closeModal.addEventListener('touchend', closeModalHandler);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModalHandler();
        }
    });
    
    modal.addEventListener('touchend', (e) => {
        if (e.target === modal) {
            closeModalHandler();
        }
    });
}

// Particle Burst Effect
function createParticleBurst(x, y) {
    const burst = document.createElement('div');
    burst.style.position = 'fixed';
    burst.style.left = x + 'px';
    burst.style.top = y + 'px';
    burst.style.width = '4px';
    burst.style.height = '4px';
    burst.style.background = 'white';
    burst.style.borderRadius = '50%';
    burst.style.pointerEvents = 'none';
    burst.style.zIndex = '10001';
    document.body.appendChild(burst);
    
    const particles = 20;
    for (let i = 0; i < particles; i++) {
        setTimeout(() => {
            const particle = burst.cloneNode();
            const angle = (Math.PI * 2 * i) / particles;
            const velocity = 50 + Math.random() * 50;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;
            
            let px = x;
            let py = y;
            let opacity = 1;
            
            const animate = () => {
                px += vx * 0.1;
                py += vy * 0.1;
                opacity -= 0.02;
                
                particle.style.left = px + 'px';
                particle.style.top = py + 'px';
                particle.style.opacity = opacity;
                
                if (opacity > 0) {
                    requestAnimationFrame(animate);
                } else {
                    particle.remove();
                }
            };
            
            document.body.appendChild(particle);
            animate();
        }, i * 10);
    }
    
    setTimeout(() => burst.remove(), 1000);
}

// Interactive Sun
function initInteractiveSun() {
    const sun = document.getElementById('sun');
    if (!sun) return;
    
    const handleSunClick = (e) => {
        e.stopPropagation();
        const x = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : window.innerWidth / 2);
        const y = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : window.innerHeight / 2);
        createParticleBurst(x, y);
        
        const planets = document.querySelectorAll('.planet');
        planets.forEach((planet, index) => {
            setTimeout(() => {
                planet.style.transform = 'translateX(-50%) scale(1.3)';
                setTimeout(() => {
                    planet.style.transform = '';
                }, 300);
            }, index * 50);
        });
    };
    
    sun.addEventListener('click', handleSunClick);
    sun.addEventListener('touchend', handleSunClick, { passive: false });
}

// Profile Image Interaction
function initProfileImage() {
    const profileImage = document.getElementById('profile-image');
    if (!profileImage) return;
    
    let clickCount = 0;
    let lastClickTime = 0;
    
    const handleProfileClick = (e) => {
        e.stopPropagation();
        const currentTime = Date.now();
        
        if (currentTime - lastClickTime > 1000) {
            clickCount = 0;
        }
        
        clickCount++;
        lastClickTime = currentTime;
        
        const x = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : window.innerWidth / 2);
        const y = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : window.innerHeight / 2);
        createParticleBurst(x, y);
        
        if (clickCount >= 5) {
            const title = document.getElementById('main-title');
            const messages = [
                "Welcome to my digital space",
                "Explore the cosmos",
                isTouchDevice() ? "Tap planets to learn!" : "Click planets to learn!",
                "Try the speed toggle!",
                "Enjoy the journey!"
            ];
            const randomMessage = messages[Math.floor(Math.random() * messages.length)];
            title.textContent = randomMessage;
            clickCount = 0;
        }
    };
    
    profileImage.addEventListener('click', handleProfileClick);
    profileImage.addEventListener('touchend', handleProfileClick, { passive: false });
}

// Speed Toggle
let currentSpeed = 'normal';
const speedStates = ['normal', 'fast', 'slow'];

function initSpeedToggle() {
    const speedToggle = document.getElementById('speed-toggle');
    const speedText = document.getElementById('speed-text');
    
    if (!speedToggle || !speedText) return;
    
    speedToggle.addEventListener('click', () => {
        const currentIndex = speedStates.indexOf(currentSpeed);
        const nextIndex = (currentIndex + 1) % speedStates.length;
        currentSpeed = speedStates[nextIndex];
        
        document.body.classList.remove('speed-fast', 'speed-slow');
        
        switch(currentSpeed) {
            case 'fast':
                document.body.classList.add('speed-fast');
                speedText.textContent = 'Fast Speed';
                break;
            case 'slow':
                document.body.classList.add('speed-slow');
                speedText.textContent = 'Slow Speed';
                break;
            default:
                speedText.textContent = 'Normal Speed';
        }
    });
}

// Enhanced Link Cards
function initLinkCards() {
    const linkCards = document.querySelectorAll('.link-card');
    
    linkCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        
        if (!isTouchDevice()) {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        }
        
        card.addEventListener('click', function(e) {
            const title = this.querySelector('.link-card-title').textContent;
            console.log(`Clicked on: ${title}`);
            
            const x = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : window.innerWidth / 2);
            const y = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : window.innerHeight / 2);
            createParticleBurst(x, y);
        });
    });
}

// Smooth scroll behavior
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    updateVisitorCount();
    initCursorTrail();
    new ParticleSystem();
    initPlanetModal();
    initInteractiveSun();
    initProfileImage();
    initSpeedToggle();
    initLinkCards();
    initSmoothScroll();
    
    // Prevent double-tap zoom on iOS
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
    
    console.log('🚀 Interactive space landing page initialized!');
    console.log('💡 Try clicking on planets, the sun, or your profile image!');
    if (isTouchDevice()) {
        console.log('📱 Mobile mode: Touch interactions enabled');
    }
});

// Optional: Add a function to dynamically create link cards via JavaScript
function addLinkCard(title, description, url, icon) {
    const container = document.querySelector('.links-grid');
    if (!container) return;

    const card = document.createElement('a');
    card.href = url;
    card.target = '_blank';
    card.rel = 'noopener noreferrer';
    card.className = 'link-card group block p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 relative overflow-hidden';
    
    card.innerHTML = `
        <div class="link-card-bg"></div>
        <div class="flex items-start space-x-4 relative z-10">
            <div class="flex-shrink-0">
                <div class="icon-wrapper w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 group-hover:rotate-12 transition-transform">
                    ${icon}
                </div>
            </div>
            <div class="flex-1 min-w-0">
                <h3 class="link-card-title text-xl font-bold text-gray-900 mb-1">
                    ${title}
                </h3>
                <p class="text-gray-600 text-sm">
                    ${description}
                </p>
            </div>
            <div class="flex-shrink-0">
                <svg class="arrow-icon w-5 h-5 text-gray-400 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
            </div>
        </div>
        <div class="link-card-shine"></div>
    `;
    
    container.appendChild(card);
    initLinkCards();
}

