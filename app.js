// app.js - Developer Portfolio Showcase

(function() {
  'use strict';

  // ===== SHOWCASE DATA =====
  const showcases = [
    {
      id: 'v1',
      title: 'Showcase V1',
      subtitle: 'Fitness · Tilt + Tabs',
      file: 'showcases/showcase-v1.html',
      icon: 'fa-dumbbell',
      category: 'fitness',
      year: '2026'
    },
    {
      id: 'v2',
      title: 'Showcase V2',
      subtitle: 'Portfolio · Glass',
      file: 'showcases/showcase-v2.html',
      icon: 'fa-user-astronaut',
      category: 'portfolio',
      year: '2026'
    },
    {
      id: 'v3',
      title: 'Showcase V3',
      subtitle: 'Studio · Services',
      file: 'showcases/showcase-v3.html',
      icon: 'fa-palette',
      category: 'studio',
      year: '2026'
    },
    {
      id: 'v4',
      title: 'Showcase V4',
      subtitle: 'Agency · Portfolio',
      file: 'showcases/showcase-v4.html',
      icon: 'fa-building',
      category: 'agency',
      year: '2026'
    },
    {
      id: 'v5',
      title: 'Showcase V5',
      subtitle: 'Analytics · Products',
      file: 'showcases/showcase-v5.html',
      icon: 'fa-chart-simple',
      category: 'analytics',
      year: '2026'
    }
  ];

  // ===== DOM ELEMENTS =====
  const listEl = document.getElementById('showcaseList');
  const modalOverlay = document.getElementById('modalOverlay');
  const modalClose = document.getElementById('modalClose');
  const modalIframe = document.getElementById('modalIframe');
  const modalTitle = document.getElementById('modalTitle');
  const modalSub = document.getElementById('modalSub');
  const tabBtns = document.querySelectorAll('.tab-btn');
  const aboutBtn = document.getElementById('aboutBtn');
  const projectsBtn = document.getElementById('projectsBtn');
  const aboutSection = document.getElementById('aboutSection');
  const projectsSection = document.getElementById('projectsSection');

  // ===== TAB SYSTEM =====
  function switchTab(tab) {
    // Remove active from all tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    
    // Hide all sections
    aboutSection.classList.remove('active');
    projectsSection.classList.remove('active');
    
    if (tab === 'about') {
      aboutBtn.classList.add('active');
      aboutSection.classList.add('active');
    } else {
      projectsBtn.classList.add('active');
      projectsSection.classList.add('active');
    }
  }

  // Tab event listeners
  aboutBtn.addEventListener('click', () => switchTab('about'));
  projectsBtn.addEventListener('click', () => switchTab('projects'));

  // ===== RENDER PROJECT CARDS =====
  function renderCards(filter = 'all') {
    listEl.innerHTML = '';
    
    const filtered = filter === 'all' 
      ? showcases 
      : showcases.filter(s => s.category === filter);
    
    if (filtered.length === 0) {
      listEl.innerHTML = `
        <div class="text-center text-gray-400 py-8">
          <i class="fas fa-search text-2xl mb-2"></i>
          <p>No projects found in this category</p>
        </div>
      `;
      return;
    }
    
    filtered.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'showcase-card tilt-card';
      
      card.innerHTML = `
        <div class="tilt-content">
          <div class="flex items-start gap-4">
            <div class="preview-icon no-tilt">
              <i class="fas ${item.icon} text-gray-400 text-xl"></i>
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-start justify-between gap-2">
                <div>
                  <p class="text-white font-medium text-sm truncate">${item.title}</p>
                  <p class="text-gray-400 text-xs">${item.subtitle}</p>
                </div>
                <span class="badge flex-shrink-0">${item.year}</span>
              </div>
              <div class="flex items-center gap-2 mt-2">
                <span class="text-[8px] uppercase tracking-wider text-gray-500 bg-white/5 px-2 py-0.5 rounded">${item.category}</span>
                <span class="text-[8px] text-gray-500">•</span>
                <span class="text-[8px] text-gray-500">${item.id}</span>
              </div>
            </div>
          </div>
        </div>
      `;

      // Click to open modal
      card.addEventListener('click', function() {
        openModal(item.file, item.title, item.subtitle);
      });

      listEl.appendChild(card);
    });

    // Re-init tilt for new cards
    setTimeout(initTilt, 50);
  }

  // ===== CATEGORY FILTER =====
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const filter = this.dataset.filter;
      renderCards(filter);
    });
  });

  // ===== MODAL CONTROLS =====
  function openModal(file, title, sub) {
    modalTitle.textContent = title || 'Showcase';
    modalSub.textContent = sub || 'preview';
    modalIframe.src = file;
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => {
      if (!modalOverlay.classList.contains('active')) {
        // Keep src for smoothness
      }
    }, 300);
  }

  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', function(e) {
    if (e.target === this) closeModal();
  });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeModal();
  });

  // ===== TILT EFFECT =====
  function initTilt() {
    const tiltCards = document.querySelectorAll('.tilt-card');
    const MAX_TILT = 4.5;

    tiltCards.forEach(card => {
      if (card._tiltAttached) return;
      card._tiltAttached = true;

      let currentRotX = 0, currentRotY = 0;
      let targetRotX = 0, targetRotY = 0;
      let isHovering = false;

      card.addEventListener('mouseenter', () => {
        isHovering = true;
      });

      card.addEventListener('mouseleave', () => {
        isHovering = false;
        targetRotX = 0;
        targetRotY = 0;
        gsap.to(card, {
          boxShadow: '0 12px 28px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.02)',
          duration: 0.3,
          ease: "power2.out"
        });
      });

      card.addEventListener('mousemove', (e) => {
        if (!isHovering) return;
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        const rotY = (x - 0.5) * 2 * MAX_TILT;
        const rotX = (y - 0.5) * 2 * MAX_TILT;
        targetRotX = rotX;
        targetRotY = rotY;

        const shadowX = (x - 0.5) * 8;
        const shadowY = (y - 0.5) * 8;
        gsap.to(card, {
          boxShadow: `${shadowX}px ${shadowY}px 35px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.02)`,
          duration: 0.15,
          ease: "power1.out"
        });
      });

      function animateTilt() {
        if (!isHovering) {
          currentRotX += (0 - currentRotX) * 0.08;
          currentRotY += (0 - currentRotY) * 0.08;
        } else {
          currentRotX += (targetRotX - currentRotX) * 0.12;
          currentRotY += (targetRotY - currentRotY) * 0.12;
        }

        gsap.set(card, {
          rotateX: currentRotX,
          rotateY: currentRotY,
          transformPerspective: 800,
          duration: 0.01,
          overwrite: 'auto'
        });

        requestAnimationFrame(animateTilt);
      }

      animateTilt();
    });
  }

  // ===== ENTRANCE ANIMATIONS =====
  function entranceAnim() {
    const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.8 } });
    
    tl.from(".phone-glass", { 
      opacity: 0, 
      y: 20, 
      scale: 0.97, 
      duration: 0.7 
    })
    .from(".phone-glass > *", { 
      opacity: 0, 
      y: 8, 
      stagger: 0.04, 
      duration: 0.5 
    }, "-=0.3");

    // Avatar icon animation (no human photo)
    gsap.from('.avatar-icon', { 
      rotation: -10, 
      scale: 0.8, 
      opacity: 0, 
      duration: 0.7, 
      delay: 0.3, 
      ease: "back.out(1.7)" 
    });

    // Glass elements animation
    document.querySelectorAll('.glass, .glass-deep').forEach((el, i) => {
      gsap.from(el, { 
        opacity: 0, 
        y: 10, 
        duration: 0.4, 
        delay: 0.1 + i * 0.04, 
        ease: "power2.out" 
      });
    });

    // Anime.js micro-animations on cards
    setTimeout(() => {
      anime({
        targets: '.showcase-card',
        translateY: [6, 0],
        opacity: [0, 1],
        duration: 600,
        easing: 'easeOutQuad',
        delay: anime.stagger(60, { start: 200 })
      });
    }, 300);
  }

  // ===== INIT =====
  // Show projects by default
  switchTab('projects');
  renderCards('all');
  entranceAnim();
  setTimeout(initTilt, 200);

})();
