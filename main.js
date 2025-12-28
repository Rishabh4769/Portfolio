/**
 * Rishabh's Portfolio - main.js (Fast & Clean 2025) - PROJECTS FIXED
 */

(function() {
    'use strict';

    console.log('🚀 Fast Portfolio initialized');

    // === PROJECTS SECTION (MOVED OUTSIDE) ===
    function initProjects() {
        const projectsGrid = document.getElementById('projectsGrid');
        if (!projectsGrid) {
            console.log('❌ projectsGrid not found');
            return;
        }

        const projects = [
            { title: "Rule-Based Chatbot", description: "AI-powered conversational agent using Python & NLTK.", tech: ["Python", "NLTK", "Flask"], icon: "fas fa-comments", link: "https://github.com/Rishabh4769/chatbot", type: "github" },
            { title: "Network Packet Sniffer", description: "Real-time traffic analyzer with Scapy.", tech: ["Python", "Scapy", "Pcap"], icon: "fas fa-network-wired", link: "https://github.com/Rishabh4769/packet-sniffer", type: "github" },
            { title: "Ethical Keylogger", description: "Educational cybersecurity tool with encryption.", tech: ["Python", "Pynput"], icon: "fas fa-keyboard", link: "https://github.com/Rishabh4769/keylogger", type: "github" },
            { title: "MERN Matrimony App", description: "Full-stack matrimony platform with real-time chat.", tech: ["React", "Node.js", "MongoDB"], icon: "fas fa-heart", link: "https://github.com/Rishabh4769/matrimony-app", type: "github" },
            { title: "Frolics Management", description: "College event system with ticketing & analytics.", tech: ["React", "Express", "MongoDB"], icon: "fas fa-calendar-alt", link: "https://github.com/Rishabh4769/frolics-system", type: "github" },
            { title: "Bus Ticket Booking", description: "Real-time bus reservation with seat selection.", tech: ["React", "Node.js", "JWT"], icon: "fas fa-bus", link: "https://github.com/Rishabh4769/bus-booking", type: "github" }
        ];

        projectsGrid.innerHTML = projects.map(project => `
            <div class="project-card animate-in">
                <div class="project-image">
                    <i class="${project.icon}"></i>
                </div>
                <div class="project-content">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-tech">
                        ${project.tech.map(t => `<span>${t}</span>`).join('')}
                    </div>
                    <div class="project-links">
                        <a href="${project.link}" class="project-link" target="_blank">
                            <i class="fab fa-${project.type}"></i> View Code
                        </a>
                    </div>
                </div>
            </div>
        `).join('');

        console.log(`✅ ✅ LOADED ${projects.length} PROJECTS`);
    }

    // === 1. THEME TOGGLE ===
    function initTheme() {
        const themeToggle = document.getElementById('theme-toggle');
        const html = document.documentElement;
        if (!themeToggle) return;

        const saved = localStorage.getItem('theme');
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = saved || (systemDark ? 'dark' : 'light');
        
        html.setAttribute('data-theme', theme);
        themeToggle.checked = theme === 'dark';
        
        themeToggle.addEventListener('change', (e) => {
            const newTheme = e.target.checked ? 'dark' : 'light';
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    // === 2. MOBILE MENU ===
    function initMobileMenu() {
        const mobileMenu = document.getElementById('mobile-menu');
        const navMenu = document.getElementById('nav-menu');
        
        if (!mobileMenu || !navMenu) return;

        mobileMenu.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !mobileMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                mobileMenu.classList.remove('active');
            }
        });
    }

    // === 3. SMOOTH SCROLL + ACTIVE ===
    function initSmoothScroll() {
        document.querySelectorAll('.nav-link[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                
                const targetId = link.getAttribute('href').substring(1);
                const target = document.getElementById(targetId);
                
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    document.getElementById('nav-menu')?.classList.remove('active');
                    document.getElementById('mobile-menu')?.classList.remove('active');
                }
            });
        });
    }

    // === 4. NAVBAR SCROLL + ACTIVE ===
    function initNavbarScroll() {
        const navbar = document.getElementById('navbar');
        if (!navbar) return;

        let ticking = false;
        const navLinks = document.querySelectorAll('.nav-link');
        
        const updateActiveLink = () => {
            let current = '';
            const sections = document.querySelectorAll('section[id]');
            const scrollY = window.scrollY + 100;

            for (let section of sections) {
                if (section.offsetTop <= scrollY) {
                    current = '#' + section.getAttribute('id');
                }
            }

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === current) {
                    link.classList.add('active');
                }
            });
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    navbar.classList.toggle('scrolled', window.scrollY > 50);
                    updateActiveLink();
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    // === 5. CONTACT FORM ===
    function initContactForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !message) {
                alert('Please fill all fields');
                return;
            }

            const btn = form.querySelector('button[type="submit"]');
            const original = btn.textContent;
            
            btn.textContent = 'Sending...';
            btn.disabled = true;

            setTimeout(() => {
                btn.textContent = 'Sent! 🎉';
                form.reset();
                setTimeout(() => {
                    btn.textContent = original;
                    btn.disabled = false;
                }, 2000);
            }, 1500);
        });
    }

    // === MAIN INIT ===
    function init() {
        initProjects();  // 🔥 FIRST - LOADS PROJECTS
        initTheme();
        initMobileMenu();
        initSmoothScroll();
        initNavbarScroll();
        initContactForm();
        console.log('✅ ✅ FULLY LOADED WITH PROJECTS');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
