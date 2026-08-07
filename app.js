// app.js - YewsWsi Premium Portfolio

(function() {
  'use strict';

  // ===== PROJECT DATA =====
  const projects = [
    {
      id: 'v1',
      title: 'Fitness Dashboard',
      subtitle: 'Tilt + Tabs · Interactive Glass',
      category: 'fitness',
      file: 'showcases/showcase-v1.html',
      icon: 'fa-dumbbell',
      color: '#a0a0a0'
    },
    {
      id: 'v2',
      title: 'Portfolio Showcase',
      subtitle: 'Glass · Monochrome · Tilt',
      category: 'portfolio',
      file: 'showcases/showcase-v2.html',
      icon: 'fa-user-astronaut',
      color: '#b0b0b0'
    },
    {
      id: 'v3',
      title: 'Studio Services',
      subtitle: 'Brand · Digital · Motion',
      category: 'studio',
      file: 'showcases/showcase-v3.html',
      icon: 'fa-palette',
      color: '#c0c0c0'
    },
    {
      id: 'v4',
      title: 'Agency Portfolio',
      subtitle: 'Team · Projects · Awards',
      category: 'agency',
      file: 'showcases/showcase-v4.html',
      icon: 'fa-building',
      color: '#b8b8b8'
    },
    {
      id: 'v5',
      title: 'Analytics Showcase',
      subtitle: 'Products · Graphs · Stats',
      category: 'analytics',
      file: 'showcases/showcase-v5.html',
      icon: 'fa-chart-simple',
      color: '#a8a8a8'
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

  // ===== RENDER CARDS =====
  function renderCards(category = 'all') {
    const filtered = category === 'all' 
      ? projects 
      : projects.filter(p => p.category === category);
    
    listEl.innerHTML = '';

    filtered.forEach((item) => {
      const card = document.createElement('div');
      card.className = 'showcase-card tilt-card';
      card.dataset.file = item.file;

      card.innerHTML = `
        <div class="tilt-content card-content">
          <div class="card-icon no-tilt">
            <i class="fas ${item.icon}"></i>
          </div>
          <div class="card-info">
            <div class="card-title">
              <h4>${item.title}</h4>
              <span class="badge">${item.id}</span>
            </div>
            <p class="card-subtitle">${item.subtitle}</p>
          </div>
          <i class="fas fa-chevron-right card-arrow"></i>
        </div>
      `;

      card.addEventListener('click', function() {
        const file = this.dataset.file;
        const title = this.querySelector('.card-title h4')?.textContent || 'Project';
        const sub = this.querySelector('.card-subtitle')?.textContent || '';
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
      renderCards(this.dataset.tab);
    });
  });

  // ===== MODAL =====
  function openModal(file, title, sub) {
    modalTitle.textContent = title;
    modalSub.textContent = sub;
    modalIframe.src = file;
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', function(e) {
    if (e.target === this) closeModal();
  });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeModal();
  });

  // ===== TILT =====
  function initTilt() {
    const tiltCards = document.querySelectorAll('.tilt-card');
    const MAX_TILT = 4.5;

    tiltCards.forEach(card => {
      if (card._tiltAttached) return;
      card._tiltAttached = true;

      let currentRotX = 0, currentRotY = 0;
      let targetRotX = 0, targetRotY = 0;
      let isHovering = false;

      card.addEventListener('mouseenter', () => { isHovering = true; });
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

  // ===== ANIMATIONS =====
  function entranceAnim() {
    const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.8 } });
    
    tl.from(".phone-glass", { opacity: 0, y: 30, scale: 0.95, duration: 0.7 })
      .from(".hero-section", { opacity: 0, y: 20, duration: 0.6 }, "-=0.3")
      .from(".hero-tag", { opacity: 0, scale: 0.8, stagger: 0.08, duration: 0.4 }, "-=0.2")
      .from(".stats-row .stat-card", { opacity: 0, y: 15, stagger: 0.08, duration: 0.5 }, "-=0.2")
      .from(".tabs-container .tab-btn", { opacity: 0, y: 10, stagger: 0.05, duration: 0.4 }, "-=0.2");

    anime({
      targets: '.showcase-card',
      translateY: [10, 0],
      opacity: [0, 1],
      duration: 600,
      easing: 'easeOutQuad',
      delay: anime.stagger(60, { start: 400 })
    });

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
