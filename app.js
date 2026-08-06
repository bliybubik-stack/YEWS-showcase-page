// app.js - Main Showcase Page JavaScript

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
      color: '#a0a0a0'
    },
    {
      id: 'v2',
      title: 'Showcase V2',
      subtitle: 'Portfolio · Glass',
      file: 'showcases/showcase-v2.html',
      icon: 'fa-user-astronaut',
      color: '#b0b0b0'
    },
    {
      id: 'v3',
      title: 'Showcase V3',
      subtitle: 'Studio · Services',
      file: 'showcases/showcase-v3.html',
      icon: 'fa-palette',
      color: '#c0c0c0'
    },
    {
      id: 'v4',
      title: 'Showcase V4',
      subtitle: 'Agency · Portfolio',
      file: 'showcases/showcase-v4.html',
      icon: 'fa-building',
      color: '#b8b8b8'
    },
    {
      id: 'v5',
      title: 'Showcase V5',
      subtitle: 'Analytics · Products',
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

  // ===== RENDER CARDS =====
  function renderCards() {
    listEl.innerHTML = '';
    
    showcases.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'showcase-card tilt-card flex items-center gap-4';
      card.dataset.index = index;
      card.dataset.file = item.file;

      card.innerHTML = `
        <div class="tilt-content flex items-center gap-4 w-full">
          <div class="preview-icon no-tilt">
            <i class="fas ${item.icon} text-gray-400 text-xl"></i>
          </div>
          <div class="flex-1">
            <div class="flex items-center justify-between">
              <p class="text-white font-medium text-sm">${item.title}</p>
              <span class="badge">${item.id}</span>
            </div>
            <p class="text-gray-400 text-xs">${item.subtitle}</p>
          </div>
          <i class="fas fa-chevron-right text-gray-500 text-xs no-tilt"></i>
        </div>
      `;

      // Click to open modal
      card.addEventListener('click', function(e) {
        const file = this.dataset.file;
        const title = this.querySelector('.text-white')?.textContent || 'Showcase';
        const sub = this.querySelector('.text-gray-400')?.textContent || '';
        openModal(file, title, sub);
      });

      listEl.appendChild(card);
    });

    // Re-init tilt for new cards
    setTimeout(initTilt, 50);
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
  }

  // Modal event listeners
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
      // Avoid duplicate listeners
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
      stagger: 0.05, 
      duration: 0.5 
    }, "-=0.3");

    // Anime.js micro-animations on cards
    anime({
      targets: '.showcase-card',
      translateY: [6, 0],
      opacity: [0, 1],
      duration: 700,
      easing: 'easeOutQuad',
      delay: anime.stagger(80, { start: 200 })
    });

    // Avatar animation
    gsap.from('.avatar', { 
      rotation: -5, 
      scale: 0.9, 
      opacity: 0, 
      duration: 0.7, 
      delay: 0.3, 
      ease: "back.out(1.4)" 
    });

    // Glass elements animation
    document.querySelectorAll('.glass, .glass-deep').forEach((el, i) => {
      gsap.from(el, { 
        opacity: 0, 
        y: 10, 
        duration: 0.5, 
        delay: 0.1 + i * 0.06, 
        ease: "power2.out" 
      });
    });
  }

  // ===== INIT =====
  renderCards();
  entranceAnim();
  
  // Additional tilt init after animations
  setTimeout(initTilt, 200);

})();
