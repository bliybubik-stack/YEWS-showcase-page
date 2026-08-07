// app.js - YewsWsi Developer Portfolio

(function() {
  'use strict';

  // ===== DATA =====
  const projects = [
    {
      id: 'v1',
      title: 'Showcase V1',
      subtitle: 'Fitness · Tilt + Tabs',
      category: 'all',
      file: 'showcases/showcase-v1.html',
      icon: 'fa-dumbbell',
      color: '#a0a0a0',
      date: '2024',
      tech: ['GSAP', 'Anime.js', 'Tailwind']
    },
    {
      id: 'v2',
      title: 'Showcase V2',
      subtitle: 'Portfolio · Glass',
      category: 'all',
      file: 'showcases/showcase-v2.html',
      icon: 'fa-user-astronaut',
      color: '#b0b0b0',
      date: '2024',
      tech: ['GSAP', 'Anime.js', 'Tailwind']
    },
    {
      id: 'v3',
      title: 'Showcase V3',
      subtitle: 'Studio · Services',
      category: 'all',
      file: 'showcases/showcase-v3.html',
      icon: 'fa-palette',
      color: '#c0c0c0',
      date: '2024',
      tech: ['GSAP', 'Anime.js', 'Tailwind']
    },
    {
      id: 'v4',
      title: 'Showcase V4',
      subtitle: 'Agency · Portfolio',
      category: 'all',
      file: 'showcases/showcase-v4.html',
      icon: 'fa-building',
      color: '#b8b8b8',
      date: '2024',
      tech: ['GSAP', 'Anime.js', 'Tailwind']
    },
    {
      id: 'v5',
      title: 'Showcase V5',
      subtitle: 'Analytics · Products',
      category: 'all',
      file: 'showcases/showcase-v5.html',
      icon: 'fa-chart-simple',
      color: '#a8a8a8',
      date: '2024',
      tech: ['GSAP', 'Anime.js', 'Tailwind']
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

  // ===== RENDER CARDS =====
  function renderCards(category = 'all') {
    const filtered = category === 'all' 
      ? projects 
      : projects.filter(p => p.category === category);
    
    listEl.innerHTML = '';
    projectCount.textContent = filtered.length;

    filtered.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'showcase-card tilt-card';
      card.dataset.index = index;
      card.dataset.file = item.file;

      card.innerHTML = `
        <div class="tilt-content">
          <div class="flex items-center gap-4">
            <div class="preview-icon no-tilt">
              <i class="fas ${item.icon} text-gray-400 text-xl"></i>
            </div>
            <div class="flex-1">
              <div class="flex items-center justify-between">
                <p class="text-white font-medium text-sm">${item.title}</p>
                <span class="badge">${item.id}</span>
              </div>
              <p class="text-gray-400 text-xs">${item.subtitle}</p>
              <div class="flex gap-2 mt-1 flex-wrap">
                ${item.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
              </div>
            </div>
            <i class="fas fa-chevron-right text-gray-500 text-xs no-tilt"></i>
          </div>
        </div>
      `;

      card.addEventListener('click', function(e) {
        const file = this.dataset.file;
        const title = this.querySelector('.text-white')?.textContent || 'Project';
        const sub = this.querySelector('.text-gray-400')?.textContent || '';
        openModal(file, title, sub);
      });

      listEl.appendChild(card);
    });

    setTimeout(initTilt, 50);
  }

  // ===== TABS =====
  tabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      tabBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      const category = this.dataset.tab;
      renderCards(category);
    });
  });

  // ===== MODAL CONTROLS =====
  function openModal(file, title, sub) {
    modalTitle.textContent = title || 'Project';
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
      y: 30, 
      scale: 0.95, 
      duration: 0.7 
    })
    .from(".profile-section", { 
      opacity: 0, 
      y: 20, 
      duration: 0.6 
    }, "-=0.3")
    .from(".badge-group .badge", { 
      opacity: 0, 
      scale: 0.8, 
      stagger: 0.08, 
      duration: 0.4 
    }, "-=0.2")
    .from(".tabs-container", { 
      opacity: 0, 
      y: 10, 
      duration: 0.5 
    }, "-=0.2");

    // Anime.js micro-animations
    anime({
      targets: '.showcase-card',
      translateY: [10, 0],
      opacity: [0, 1],
      duration: 600,
      easing: 'easeOutQuad',
      delay: anime.stagger(60, { start: 300 })
    });

    // Profile icon pulse
    anime({
      targets: '.profile-icon',
      scale: [1, 1.05, 1],
      duration: 3000,
      easing: 'easeInOutQuad',
      loop: true
    });

    // Glass elements
    document.querySelectorAll('.glass, .glass-deep').forEach((el, i) => {
      gsap.from(el, { 
        opacity: 0, 
        y: 12, 
        duration: 0.5, 
        delay: 0.1 + i * 0.05, 
        ease: "power2.out" 
      });
    });
  }

  // ===== INIT =====
  renderCards('all');
  entranceAnim();
  setTimeout(initTilt, 200);

})();
