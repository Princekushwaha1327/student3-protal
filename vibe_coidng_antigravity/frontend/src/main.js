// Drag and Drop implemented with Native API below
// Keeping it dependency-free for this vibe-coding session

document.addEventListener('DOMContentLoaded', () => {
    // Navigation
    const navLinks = document.querySelectorAll('.nav-links li');
    const views = document.querySelectorAll('.view');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const tempView = link.getAttribute('data-view');
            switchView(tempView);
        });
    });

    function switchView(viewName) {
        // Update Nav
        navLinks.forEach(l => l.classList.remove('active'));
        const activeLink = document.querySelector(`.nav-links li[data-view="${viewName}"]`);
        if (activeLink) activeLink.classList.add('active');

        // Update View
        views.forEach(v => v.classList.remove('active'));
        const activeView = document.getElementById(`view-${viewName}`);
        if (activeView) activeView.classList.add('active');
    }

    // Command Palette
    const cmdOverlay = document.getElementById('command-palette');
    const cmdBtn = document.getElementById('cmd-btn');
    const cmdInput = document.getElementById('cmd-input');

    function toggleCmd() {
        cmdOverlay.classList.toggle('hidden');
        if (!cmdOverlay.classList.contains('hidden')) {
            cmdInput.focus();
        }
    }

    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            toggleCmd();
        }
        if (e.key === 'Escape' && !cmdOverlay.classList.contains('hidden')) {
            toggleCmd();
        }
    });

    cmdBtn.addEventListener('click', toggleCmd);

    cmdOverlay.addEventListener('click', (e) => {
        if (e.target === cmdOverlay) toggleCmd();
    });

    // Command Actions
    document.getElementById('cmd-results').addEventListener('click', (e) => {
        const action = e.target.getAttribute('data-action');
        if (action) {
            handleAction(action);
            toggleCmd();
        }
    });

    function handleAction(action) {
        console.log('Action:', action);
        if (action === 'goto-dashboard') switchView('dashboard');
        if (action === 'goto-warroom') switchView('war-room');
        if (action === 'toggle-theme') toggleTheme();
    }

    // Theme Toggle
    function toggleTheme() {
        document.body.classList.toggle('light-mode');
        // Simple toggle for demo
    }
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

    // War Room Timer
    let countdown = 3600 * 24 * 2 + 3600 * 14 + 1800; // 2d 14h 30m start
    function updateTimer() {
        countdown--;
        if (countdown < 0) countdown = 0;

        const d = Math.floor(countdown / (3600 * 24));
        const h = Math.floor((countdown % (3600 * 24)) / 3600);
        const m = Math.floor((countdown % 3600) / 60);
        const s = Math.floor(countdown % 60);

        // Hero Timer
        const dEl = document.getElementById('d');
        if (dEl) dEl.innerText = d.toString().padStart(2, '0');

        const hEl = document.getElementById('h');
        if (hEl) hEl.innerText = h.toString().padStart(2, '0');

        const mEl = document.getElementById('m');
        if (mEl) mEl.innerText = m.toString().padStart(2, '0');

        const sEl = document.getElementById('s');
        if (sEl) sEl.innerText = s.toString().padStart(2, '0');

        // Dashboard Mini Preview
        const miniEl = document.querySelector('.countdown-mini .timer');
        if (miniEl) miniEl.innerText = `${d}d ${h}h ${m}m ${s}s`;
    }
    // Update every second so time actually flows
    setInterval(updateTimer, 1000);
    updateTimer();

    window.toggleStressMode = function () {
        document.body.classList.toggle('stress-free');
        const btn = document.querySelector('.war-header .header-right button');
        if (document.body.classList.contains('stress-free')) {
            btn.innerHTML = '<i class="ri-eye-line"></i> Exit Focus';
        } else {
            btn.innerHTML = '<i class="ri-eye-off-line"></i> Stress-Free Mode';
        }
    };

    // Circular Progress Animation
    const circle = document.querySelector('.circle');
    if (circle) {
        // Trigger reflow
        circle.style.animation = 'none';
        circle.offsetHeight; /* trigger reflow */
        circle.style.animation = 'progress 1s ease-out forwards';
    }

    // Academics Workspace Logic
    window.openCourse = function (courseName) {
        const ws = document.getElementById('course-workspace');
        if (!ws) return;

        // Populate Title (Mock)
        const titleEl = document.getElementById('ws-course-title');
        if (titleEl) titleEl.innerText = courseName;

        ws.classList.remove('hidden');
    };

    window.closeCourse = function () {
        const ws = document.getElementById('course-workspace');
        if (ws) ws.classList.add('hidden');
    };

    // Workspace Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class
            tabBtns.forEach(b => b.classList.remove('active'));
            const panes = document.querySelectorAll('.tab-pane');
            panes.forEach(p => p.classList.remove('active'));

            // Add active
            btn.classList.add('active');
            const tabId = btn.getAttribute('data-tab');
            const targetPane = document.getElementById(`tab-${tabId}`);
            if (targetPane) targetPane.classList.add('active');
        });
    });

    // Profile Dropdown
    window.toggleProfileMenu = function () {
        const menu = document.getElementById('profile-menu');
        if (menu) menu.classList.toggle('hidden');
    };

    // Close dropdown when clicking outside
    document.addEventListener('click', function (e) {
        const menu = document.getElementById('profile-menu');
        const avatar = document.querySelector('.avatar-small');
        if (menu && !menu.classList.contains('hidden')) {
            if (!menu.contains(e.target) && !avatar.contains(e.target)) {
                menu.classList.add('hidden');
            }
        }
    });

    // --- INTERACTIVITY BOOST ---

    // 1. Toast Notification System
    window.showToast = function (message, type = 'info') {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;

        let icon = 'ri-information-line';
        if (type === 'success') icon = 'ri-checkbox-circle-line';
        if (type === 'error') icon = 'ri-error-warning-line';

        toast.innerHTML = `<i class="${icon}"></i> <span>${message}</span>`;
        container.appendChild(toast);

        // Trigger animation
        requestAnimationFrame(() => {
            toast.classList.add('show');
        });

        // Remove after 3s
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    };

    // 2. Chart.js Integration
    const ctx = document.getElementById('progressChart');
    if (ctx) {
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Completed', 'Remaining'],
                datasets: [{
                    data: [75, 25],
                    backgroundColor: ['#00d2ff', 'rgba(255, 255, 255, 0.1)'],
                    borderWidth: 0,
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
                plugins: {
                    legend: { display: false },
                    tooltip: { enabled: false }
                }
            }
        });
    }

    // 3. Vanilla 3D Tilt Effect
    const tiltCards = document.querySelectorAll('.glass-panel');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -5; // Max 5deg rotation
            const rotateY = ((x - centerX) / centerX) * 5;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });

    // 4. Staggered Entrance Animation
    function animateGrid() {
        const items = document.querySelectorAll('.grid-container > div, .grid-row-top > div');
        items.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
    // Run on load
    animateGrid();

    // Attach Toasts to some actions
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) themeBtn.addEventListener('click', () => showToast('Theme Toggled', 'success'));

    if (cmdBtn) cmdBtn.addEventListener('click', () => showToast('Command Palette Ready', 'info'));

});
