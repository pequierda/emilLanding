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

// Quote Generator and AI Chat functionality
const quotes = [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
    { text: "Life is what happens to you while you're busy making other plans.", author: "John Lennon" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
    { text: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" },
    { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
    { text: "Don't be pushed around by the fears in your mind. Be led by the dreams in your heart.", author: "Roy T. Bennett" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
    { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
    { text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { text: "The future depends on what you do today.", author: "Mahatma Gandhi" },
    { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
    { text: "You are never too old to set another goal or to dream a new dream.", author: "C.S. Lewis" },
    { text: "The only person you are destined to become is the person you decide to be.", author: "Ralph Waldo Emerson" }
];

let currentQuote = null;

// Modal functions
function openQuoteGenerator() {
    document.getElementById('quoteModal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeQuoteGenerator() {
    document.getElementById('quoteModal').classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Quote generation
function generateQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    currentQuote = quote;
    
    document.getElementById('quoteText').textContent = `"${quote.text}"`;
    document.getElementById('quoteAuthor').textContent = `- ${quote.author}`;
    
    // Add animation
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.style.transform = 'scale(0.95)';
    setTimeout(() => {
        quoteDisplay.style.transform = 'scale(1)';
    }, 100);
}

function copyQuote() {
    if (!currentQuote) {
        alert('Please generate a quote first!');
        return;
    }
    
    const textToCopy = `"${currentQuote.text}" - ${currentQuote.author}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
        // Show success feedback
        const button = event.target.closest('button');
        const originalText = button.textContent;
        button.textContent = 'Copied!';
        button.classList.add('bg-green-100', 'text-green-700');
        setTimeout(() => {
            button.textContent = originalText;
            button.classList.remove('bg-green-100', 'text-green-700');
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
        alert('Failed to copy quote. Please try again.');
    });
}

// AI Chat functionality
function addMessage(content, isUser = false) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'flex items-start space-x-3';
    
    if (isUser) {
        messageDiv.innerHTML = `
            <div class="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
            </div>
            <div class="bg-indigo-600 text-white rounded-lg p-3 max-w-xs ml-auto">
                <p class="text-sm">${content}</p>
            </div>
        `;
    } else {
        messageDiv.innerHTML = `
            <div class="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg class="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                </svg>
            </div>
            <div class="bg-gray-100 rounded-lg p-3 max-w-xs">
                <p class="text-sm text-gray-700">${content}</p>
            </div>
        `;
    }
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Add user message
    addMessage(message, true);
    input.value = '';
    
    // Simulate AI response
    setTimeout(() => {
        const responses = [
            "That's an interesting perspective! Can you tell me more about that?",
            "I understand what you're saying. How does that make you feel?",
            "That's a great question! Let me think about that...",
            "I appreciate you sharing that with me. What would you like to explore further?",
            "That sounds like an important topic. What are your thoughts on it?",
            "I'm here to help! Is there anything specific you'd like to discuss?",
            "That's a wonderful insight! How did you come to that conclusion?",
            "I find that fascinating! Can you elaborate on that point?",
            "Thank you for sharing that. What would you like to focus on next?",
            "That's a thoughtful observation. What do you think the next step should be?"
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        addMessage(randomResponse);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
}

function handleChatKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Close modal when clicking outside
document.addEventListener('click', function(event) {
    const modal = document.getElementById('quoteModal');
    if (event.target === modal) {
        closeQuoteGenerator();
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
