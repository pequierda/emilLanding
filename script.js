// Project data
const projects = [
    {
        title: 'Portfolio',
        description: 'My full portfolio showcasing personal projects, skills, and experience.',
        url: 'https://emilprotfolio.vercel.app',
        category: 'app',
        featured: true,
        badge: 'Featured',
        glow: 'rgba(99, 102, 241, 0.4)',
        icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>'
    },
    {
        title: 'Encryptor',
        description: 'Secure text encryption and decryption tool with a clean interface.',
        url: 'https://encryptor-emilpro.vercel.app',
        category: 'tool',
        badge: 'Tool',
        glow: 'rgba(6, 182, 212, 0.3)',
        icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>'
    },
    {
        title: 'QR Generator',
        description: 'Create custom QR codes instantly with styling options.',
        url: 'https://emilqrgen.vercel.app',
        category: 'tool',
        badge: 'Tool',
        glow: 'rgba(168, 85, 247, 0.3)',
        icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path></svg>'
    },
    {
        title: 'For Sale Landing Page',
        description: 'Modern landing page template for sale with admin panel.',
        url: 'https://forsalelandingpage.vercel.app',
        category: 'template',
        badge: 'Template',
        glow: 'rgba(34, 197, 94, 0.3)',
        icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>'
    },
    {
        title: 'Business Landing Page',
        description: 'Professional business landing page template with admin panel.',
        url: 'https://4businesspage.vercel.app/',
        category: 'template',
        badge: 'Template',
        glow: 'rgba(251, 146, 60, 0.3)',
        icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>'
    },
    {
        title: 'Quote Generator',
        description: 'Generate inspirational quotes and chat with an AI assistant.',
        url: 'https://quote-generator-swart-ten.vercel.app/',
        category: 'app',
        badge: 'AI App',
        glow: 'rgba(236, 72, 153, 0.3)',
        icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>'
    }
];

function renderProjects(filter = 'all') {
    const container = document.querySelector('.links-grid');
    if (!container) return;

    container.innerHTML = '';

    const filtered = filter === 'all'
        ? projects
        : projects.filter(p => p.category === filter);

    filtered.forEach((project, index) => {
        const card = document.createElement('a');
        card.href = project.url;
        card.target = '_blank';
        card.rel = 'noopener noreferrer';
        card.className = `link-card${project.featured ? ' bento-featured' : ''}`;
        card.dataset.category = project.category;
        card.style.animationDelay = `${index * 0.08}s`;

        card.innerHTML = `
            <div class="link-card-glow" style="background: ${project.glow}; top: -50px; right: -50px;"></div>
            <div class="link-card-inner">
                <div class="link-card-top">
                    <div class="link-card-icon">${project.icon}</div>
                    <span class="link-card-badge">${project.badge}</span>
                </div>
                <h3 class="link-card-title">${project.title}</h3>
                <p class="link-card-desc">${project.description}</p>
                <div class="link-card-footer">
                    <span class="link-card-cta">
                        Launch project
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                        </svg>
                    </span>
                </div>
            </div>
        `;

        container.appendChild(card);
    });
}

function initFilterTabs() {
    const tabs = document.querySelectorAll('.filter-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');
            renderProjects(tab.dataset.filter);
        });
    });
}

function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(el => observer.observe(el));
}

function initStatCounter() {
    const statEl = document.querySelector('.stat-number[data-count]');
    if (!statEl) return;

    const target = parseInt(statEl.dataset.count, 10);
    let started = false;

    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !started) {
            started = true;
            let current = 0;
            const step = () => {
                current += 1;
                statEl.textContent = current;
                if (current < target) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
        }
    }, { threshold: 0.5 });

    observer.observe(statEl);
}

function initCursorGlow() {
    if (isTouchDevice()) return;

    const glow = document.getElementById('cursor-glow');
    if (!glow) return;

    let gx = 0, gy = 0, tx = 0, ty = 0;

    document.addEventListener('mousemove', (e) => {
        tx = e.clientX;
        ty = e.clientY;
    });

    function animate() {
        gx += (tx - gx) * 0.06;
        gy += (ty - gy) * 0.06;
        glow.style.left = gx + 'px';
        glow.style.top = gy + 'px';
        requestAnimationFrame(animate);
    }
    animate();
}

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

// Interactive Center Logo
function initInteractiveLogo() {
    const logo = document.getElementById('center-logo');
    if (!logo) return;

    const handleLogoClick = (e) => {
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

    logo.addEventListener('click', handleLogoClick);
    logo.addEventListener('touchend', handleLogoClick, { passive: false });
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
            const gradient = document.querySelector('.hero-title-gradient');
            const messages = [
                'digital universe',
                'creative cosmos',
                'code nebula',
                'idea galaxy'
            ];
            if (gradient) {
                gradient.textContent = messages[Math.floor(Math.random() * messages.length)];
            }
            clickCount = 0;
        }
    };
    
    profileImage.addEventListener('click', handleProfileClick);
    profileImage.addEventListener('touchend', handleProfileClick, { passive: false });
}


// Enhanced Link Cards
let linkCardsInitialized = false;

function initLinkCards() {
    const container = document.querySelector('.links-grid');
    if (!container || linkCardsInitialized) return;
    linkCardsInitialized = true;

    container.addEventListener('click', function(e) {
        const card = e.target.closest('.link-card');
        if (!card) return;

        const title = card.querySelector('.link-card-title')?.textContent;
        if (title) console.log(`Clicked on: ${title}`);

        const x = e.clientX || window.innerWidth / 2;
        const y = e.clientY || window.innerHeight / 2;
        createParticleBurst(x, y);
    });

    if (!isTouchDevice()) {
        container.addEventListener('mouseenter', function(e) {
            const card = e.target.closest('.link-card');
            if (card) card.style.transform = 'translateY(-6px)';
        }, true);

        container.addEventListener('mouseleave', function(e) {
            const card = e.target.closest('.link-card');
            if (card) card.style.transform = '';
        }, true);
    }
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
    renderProjects();
    initFilterTabs();
    initScrollReveal();
    initStatCounter();
    initCursorGlow();
    initLinkCards();
    updateVisitorCount();
    initCursorTrail();
    new ParticleSystem();
    initPlanetModal();
    initInteractiveLogo();
    initProfileImage();
    initSmoothScroll();

    document.querySelectorAll('.hero .reveal').forEach(el => {
        setTimeout(() => el.classList.add('visible'), 100);
    });
    
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
    console.log('💡 Try clicking on planets, the EP logo, or your profile image!');
    if (isTouchDevice()) {
        console.log('📱 Mobile mode: Touch interactions enabled');
    }
});

function addLinkCard(title, description, url, icon, category = 'app') {
    projects.push({
        title,
        description,
        url,
        category,
        badge: category.charAt(0).toUpperCase() + category.slice(1),
        glow: 'rgba(99, 102, 241, 0.3)',
        icon: icon || '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>'
    });

    const activeFilter = document.querySelector('.filter-tab.active');
    renderProjects(activeFilter ? activeFilter.dataset.filter : 'all');

    const statEl = document.querySelector('.stat-number[data-count]');
    if (statEl) statEl.dataset.count = projects.length;
}

