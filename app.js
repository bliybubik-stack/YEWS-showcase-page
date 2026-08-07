// app.js - Professional Dashboard Showcase

(function() {
  'use strict';

  // ===== SHOWCASE DATA =====
  const showcases = [
    {
      id: 'v1',
      title: 'Fitness Dashboard',
      subtitle: 'Tilt + Tabs · Health Tracking',
      file: 'showcases/showcase-v1.html',
      icon: 'fa-dumbbell',
      color: '#a0a0a0',
      category: 'fitness',
      date: '2024'
    },
    {
      id: 'v2',
      title: 'Portfolio Pro',
      subtitle: 'Glass Design · Creative',
      file: 'showcases/showcase-v2.html',
      icon: 'fa-user-astronaut',
      color: '#b0b0b0',
      category: 'design',
      date: '2024'
    },
    {
      id: 'v3',
      title: 'Studio Services',
      subtitle: 'Motion · Branding',
      file: 'showcases/showcase-v3.html',
      icon: 'fa-palette',
      color: '#c0c0c0',
      category: 'design',
      date: '2025'
    },
    {
      id: 'v4',
      title: 'Agency Portfolio',
      subtitle: 'Digital Studio',
      file: 'showcases/showcase-v4.html',
      icon: 'fa-building',
      color: '#b8b8b8',
      category: 'agency',
      date: '2025'
    },
    {
      id: 'v5',
      title: 'Analytics Pro',
      subtitle: 'Data · Products',
      file: 'showcases/showcase-v5.html',
      icon: 'fa-chart-simple',
      color: '#a8a8a8',
      category: 'analytics',
      date: '2025'
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
  const projectCount = document.getElementById('projectCount');

  // ===== FILTER BY CATEGORY =====
  let currentFilter = 'all';

  function filterProjects(category) {
    currentFilter = category;
    const cards = document.querySelectorAll('.showcase-card');
    let visibleCount = 0;

    cards.forEach(card => {
      const cardCategory = card.dataset.category;
      if (category === 'all' || cardCategory === category) {
        card.style.display = 'flex';
        visibleCount++;
        // Animate in
        gsap.from(card, {
          opacity: 0,
          y: 10,
          duration: 0.3,
          ease: "power2.out"
        });
      } else {
        card.style.display = 'none';
      }
    });

    // Update project count
    if (projectCount) {
      projectCount.textContent = `${visibleCount} projects`;
    }
  }

  // ===== RENDER CARDS =====
  function renderCards() {
    listEl.innerHTML = '';
    
    showcases.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'showcase-card tilt-card';
      card.dataset.index = index;
      card.dataset.file = item.file;
      card.dataset.category = item.category;

      card.innerHTML = `
        <div class="tilt-content">
          <div class="flex items-start gap-4">
            <div class="preview-icon no-tilt">
              <i class="fas ${item.icon} text-2xl"></i>
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between gap-2">
                <h3 class="text-white font-semibold text-base truncate">${item.title}</h3>
                <span class="badge">${item.id}</span>
              </div>
              <p class="text-gray-400 text-sm">${item.subtitle}</p>
              <div class="flex items-center gap-3 mt-2">
                <span class="text-gray-500 text-xs flex items-center gap-1">
                  <i class="fas fa-calendar-alt text-[10px]"></i> ${item.date}
                </span>
                <span class="text-gray-500 text-xs flex items-center gap-1">
                  <i class="fas fa-tag text-[10px]"></i> ${item.category}
                </span>
              </div>
            </div>
            <div class="flex items-center gap-2 no-tilt">
              <button class="preview-btn" data-file="${item.file}">
                <i class="fas fa-eye"></i> Preview
              </button>
            </div>
          </div>
        </div>
      `;

      // Click to open modal
      card.addEventListener('click', function(e) {
        // Don't open if clicking the button
        if (e.target.closest('.preview-btn')) return;
        const file = this.dataset.file;
        const title = this.querySelector('h3')?.textContent || 'Showcase';
        const sub = this.querySelector('.text-gray-400')?.textContent || '';
        openModal(file, title, sub);
      });

      // Preview button
      const previewBtn = card.querySelector('.preview-btn');
      if (previewBtn) {
        previewBtn.addEventListener('click', function(e) {
          e.stopPropagation();
          const file = this.dataset.file;
          const card = this.closest('.showcase-card');
          const title = card.querySelector('h3')?.textContent || 'Showcase';
          const sub = card.querySelector('.text-gray-400')?.textContent || '';
          openModal(file, title, sub);
        });
      }

      listEl.appendChild(card);
    });

    // Update project count
    if (projectCount) {
      projectCount.textContent = `${showcases.length} projects`;
    }

    // Re-init tilt
    setTimeout(initTilt, 50);
  }

  // ===== TAB SYSTEM =====
  function initTabs() {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        // Remove active from all tabs
        tabBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        // Filter projects
        const filter = this.dataset.tab;
        filterProjects(filter);
      });
    });
  }

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
    // Clear iframe src after animation
    setTimeout(() => {
      if (!modalOverlay.classList.contains('active')) {
        // Keep src for smooth reopening
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
    const tiltCards = document.querySelectorAll('.tilt-card:not(.no-tilt)');
    const MAX_TILT = 3.5;

    tiltCards.forEach(card => {
      if (card._tiltAttached) return;
      card._tiltAttached = true;

      let currentRotX = 0, currentRotY = 0;
      let targetRotX = 0, targetRotY = 0;
      let isHovering = false;

      card.addEventListener('mouseenter', () => { isHovering = true; });
      card.addEventListener('mouseleave', () => {
        isHovering = false;
        targetRotX = 0; targetRotY = 0;
        gsap.to(card, {
          boxShadow: '0 12px 28px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.02)',
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
        targetRotX = rotX; targetRotY = rotY;
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
    const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.7 } });
    
    tl.from(".phone-glass", { 
      opacity: 0, 
      y: 30, 
      scale: 0.96, 
      duration: 0.6 
    })
    .from(".nav-bar", { 
      opacity: 0, 
      y: -10, 
      duration: 0.5 
    }, "-=0.2")
    .from(".profile-section", { 
      opacity: 0, 
      y: 15, 
      duration: 0.5 
    }, "-=0.3")
    .from(".tabs-container", { 
      opacity: 0, 
      y: 10, 
      duration: 0.4 
    }, "-=0.2");

    // Anime.js micro-animations
    anime({
      targets: '.showcase-card',
      translateY: [8, 0],
      opacity: [0, 1],
      duration: 600,
      easing: 'easeOutQuad',
      delay: anime.stagger(60, { start: 200 })
    });

    // Avatar animation
    gsap.from('.profile-avatar', { 
      rotation: -5, 
      scale: 0.8, 
      opacity: 0, 
      duration: 0.6, 
      delay: 0.2, 
      ease: "back.out(1.4)" 
    });

    // Tag badges animation
    gsap.from('.tag-badge', { 
      scale: 0, 
      opacity: 0, 
      duration: 0.4, 
      stagger: 0.08, 
      delay: 0.3,
      ease: "back.out(1.4)" 
    });

    // Glass elements
    document.querySelectorAll('.glass, .glass-deep').forEach((el, i) => {
      gsap.from(el, { 
        opacity: 0, 
        y: 8, 
        duration: 0.4, 
        delay: 0.1 + i * 0.04, 
        ease: "power2.out" 
      });
    });
  }

  // ===== INIT =====
  renderCards();
  initTabs();
  entranceAnim();
  setTimeout(initTilt, 200);

  // Expose filter for debugging
  window.filterProjects = filterProjects;

})();
