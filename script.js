let currentLang = 'en';

// Sample translations
const translations = {
    en: {
        // Add more as needed - the data-en/data-zh handles most
    },
    zh: {}
};

// Sample shared posts
let sharedPosts = [
    { text: "I feel overwhelmed with assignments but I'm trying my best...", time: "2 hours ago" },
    { text: "University is harder than I expected, but I'm not alone.", time: "Yesterday" }
];

// Load from localStorage
function loadData() {
    const savedPosts = localStorage.getItem('whiteDovePosts');
    if (savedPosts) sharedPosts = JSON.parse(savedPosts);
    
    const savedEntries = localStorage.getItem('whiteDoveEntries');
    if (savedEntries) renderEntries(JSON.parse(savedEntries));
}

function savePosts() {
    localStorage.setItem('whiteDovePosts', JSON.stringify(sharedPosts));
}

// Render feed
function renderFeed() {
    const container = document.getElementById('feed-container');
    container.innerHTML = '';
    
    sharedPosts.forEach(post => {
        const div = document.createElement('div');
        div.className = 'feed-item';
        div.innerHTML = `
            <p>"${post.text}"</p>
            <small style="color:#888; margin-top:10px; display:block;">${post.time} • Anonymous</small>
        `;
        container.appendChild(div);
    });
}

// Share post
document.getElementById('share-btn').addEventListener('click', () => {
    const textarea = document.getElementById('share-text');
    if (!textarea.value.trim()) return;
    
    sharedPosts.unshift({
        text: textarea.value.trim(),
        time: 'Just now'
    });
    
    savePosts();
    renderFeed();
    textarea.value = '';
    
    // Gentle feedback
    const btn = document.getElementById('share-btn');
    const originalText = btn.innerHTML;
    btn.textContent = '🕊️ Shared with care';
    setTimeout(() => {
        btn.innerHTML = originalText;
    }, 2000);
});

// Mood Journal
let currentMood = '';
document.querySelectorAll('.mood-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentMood = btn.dataset.mood;
    });
});

let journalEntries = [];

function renderEntries(entries) {
    const container = document.getElementById('entries-container');
    container.innerHTML = '';
    
    entries.forEach(entry => {
        const div = document.createElement('div');
        div.className = 'entry';
        div.innerHTML = `
            <div style="font-size:2rem; margin-bottom:8px;">${entry.mood}</div>
            <p>${entry.text}</p>
            <small style="color:#888;">${new Date(entry.date).toLocaleDateString()}</small>
        `;
        container.appendChild(div);
    });
}

document.getElementById('save-journal').addEventListener('click', () => {
    const text = document.getElementById('journal-text').value.trim();
    if (!text || !currentMood) {
        alert(currentLang === 'en' ? "Please select a mood and write something 💛" : "请选择心情并写点什么 💛");
        return;
    }
    
    journalEntries.unshift({
        mood: currentMood,
        text: text,
        date: new Date().toISOString()
    });
    
    localStorage.setItem('whiteDoveEntries', JSON.stringify(journalEntries));
    renderEntries(journalEntries);
    
    // Reset
    document.getElementById('journal-text').value = '';
    currentMood = '';
    document.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('active'));
});

// Breathing exercise
let breathingInterval;
function startBreathing() {
    alert("🫁 Let's breathe together.\n\nInhale for 4... Hold for 7... Exhale for 8.\n\nI'll guide you for 4 rounds.");
    // Could be expanded with visual timer
}

// Language toggle
document.getElementById('lang-toggle').addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'zh' : 'en';
    
    document.querySelectorAll('[data-en]').forEach(el => {
        if (currentLang === 'zh' && el.dataset.zh) {
            el.textContent = el.dataset.zh;
        } else if (currentLang === 'en' && el.dataset.en) {
            el.textContent = el.dataset.en;
        }
    });
    
    const langSpan = document.querySelector('.current-lang');
    langSpan.textContent = currentLang === 'en' ? 'English' : '中文';
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Initialize
window.onload = () => {
    loadData();
    renderFeed();
    renderEntries(journalEntries);
    
    // Add subtle animation to cards
    const cards = document.querySelectorAll('.about-card, .resource-card');
    cards.forEach((card, i) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        setTimeout(() => {
            card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            card.style.transitionDelay = `${i * 100}ms`;
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 300);
    });
    
    console.log('%cWhite Dove loaded with love 🕊️', 'color:#7a9eb8; font-family:monospace');
};
