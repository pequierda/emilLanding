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
        // Check if visitor has been here before
        let visitorId = getCookie('visitor_id');
        let isReturning = false;
        
        if (!visitorId) {
            // New visitor - generate unique ID
            visitorId = generateVisitorId();
            setCookie('visitor_id', visitorId, 365); // Cookie lasts 1 year
            isReturning = false;
        } else {
            // Returning visitor
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
            
            // Log visitor info to console (for debugging)
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
        visitorCountElement.textContent = '---';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Update visitor count
    updateVisitorCount();

    // Add animation delays to link cards
    const linkCards = document.querySelectorAll('.link-card');
    linkCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // Optional: Add click tracking
    linkCards.forEach(card => {
        card.addEventListener('click', function(e) {
            const title = this.querySelector('.link-card-title').textContent;
            console.log(`Clicked on: ${title}`);
        });
    });

    // Smooth scroll behavior (if you add sections later)
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
});

// Optional: Add a function to dynamically create link cards via JavaScript
function addLinkCard(title, description, url, icon) {
    const container = document.querySelector('.links-grid');
    if (!container) return;

    const card = document.createElement('a');
    card.href = url;
    card.target = '_blank';
    card.rel = 'noopener noreferrer';
    card.className = 'link-card group block p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50';
    
    card.innerHTML = `
        <div class="flex items-start space-x-4">
            <div class="flex-shrink-0">
                <div class="icon-wrapper w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
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
                <svg class="arrow-icon w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
            </div>
        </div>
    `;
    
    container.appendChild(card);
}
