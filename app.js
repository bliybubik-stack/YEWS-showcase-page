// app.js - Developer Portfolio Showcase

(function() {
  'use strict';

  // ===== SHOWCASE DATA =====
  const showcases = [
    {
      id: 'v1',
      title: 'Fitness Tracker',
      subtitle: 'Glass · Tilt + Tabs',
      file: 'showcases/showcase-v1.html',
      icon: 'fa-dumbbell',
      color: '#a0a0a0',
      category: 'ui-ux'
    },
    {
      id: 'v2',
      title: 'Portfolio V2',
      subtitle: 'Glass · Portfolio',
      file: 'showcases/showcase-v2.html',
      icon: 'fa-user-astronaut',
      color: '#b0b0b0',
      category: 'web'
    },
    {
      id: 'v3',
      title: 'Creative Studio',
      subtitle: 'Glass · Services',
      file: 'showcases/showcase-v3.html',
      icon: 'fa-palette',
      color: '#c0c0c0',
      category: 'ui-ux'
    },
    {
      id: 'v4',
      title: 'Agency Portfolio',
      subtitle: 'Glass · Agency',
      file: 'showcases/showcase-v4.html',
      icon: 'fa-building',
      color: '#b8b8b8',
      category: 'web'
    },
    {
      id: 'v5',
      title: 'Analytics Dashboard',
      subtitle: 'Glass · Analytics',
      file: 'showcases/showcase-v5.html',
      icon: 'fa-chart-simple',
      color: '#a8a8a8',
      category: 'data'
    }
  ];

  // ===== DOM ELEMENTS =====
  const listEl = document.getElementById('showcaseList');
  const modalOverlay = document.getElementById('modalOverlay');
  const modalClose = document.getElementById('modalClose');
  const modalIframe = document.getElementById('modalIframe');
  const modalTitle = document.getElementById('modalTitle');
  const modalSub = document.getElementById('modalSub');
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  const viewAllBtn = document.getElementById('viewAllBtn');

  // ===== TAB SYSTEM =====
  function activateTab(tabId) {
    // Update buttons
    tabButtons.forEach(btn => {
      btn.classList.remove('active');
      if (btn.dataset.tab === tabId) {
        btn.classList.add('active');
      }
    });

    // Update content
    tabContents.forEach(content => {
      content.classList.remove('active');
      if (content.id === `tab-${tabId}`) {
        content.classList.add('active');
      }
    });

    // Filter showcases
    filterShowcases(tabId);
  }

  // ===== FILTER SHOWCASES =====
  function filterShowcases(category) {
    const cards = document.querySelectorAll('.showcase-card');
    
    cards.forEach(card => {
      if (category === 'all' || card.dataset.category === category) {
        card.style.display = 'flex';
        // Re-animate visible cards
        gsap.from(card, {
          opacity: 0,
          y: 10,
          duration: 0.4,
          delay: 0.05,
          ease: "power2.out"
        });
      } else {
        card.style.display = 'none';
      }
    });
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
              <i class="fas ${item.icon} text-gray-400 text-xl"></i>
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-start justify-between gap-2">
                <div>
                  <p class="text-white font-medium text-base truncate">${item.title}</p>
                  <p class="text-gray-400 text-xs">${item.subtitle}</p>
                </div>
                <span class="badge flex-shrink-0">${item.id}</span>
              </div>
              <div class="flex items-center gap-3 mt-2">
                <span class="text-gray-500 text-[10px] flex items-center gap-1">
                  <i class="fas fa-code text-[8px]"></i> ${item.category.replace('-', ' ')}
                </span>
                <span class="text-gray-500 text-[10px] flex items-center gap-1">
                  <i class="fas fa-calendar text-[8px]"></i> 2025
                </span>
              </div>
            </div>
          </div>
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
    // Clear iframe src to stop loading
    setTimeout(() => {
      if (!modalOverlay.classList.contains('active')) {
        // Keep the src to avoid reload flicker
      }
    }, 300);
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
    const MAX_TILT = 3.5;

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
          boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
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

        const shadowX = (x - 0.5) * 6;
        const shadowY = (y - 0.5) * 6;
        gsap.to(card, {
          boxShadow: `${shadowX}px ${shadowY}px 25px rgba(0,0,0,0.4)`,
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

  // ===== STATS COUNTER ANIMATION =====
  function animateCounters() {
    const counters = document.querySelectorAll('.stat-value');
    
    counters.forEach(counter => {
      const target = parseInt(counter.dataset.target);
      const duration = 1500;
      const startTime = performance.now();
      
      function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(eased * target);
        
        counter.textContent = current.toLocaleString();
        
        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target.toLocaleString();
        }
      }
      
      requestAnimationFrame(updateCounter);
    });
  }

  // ===== ENTRANCE ANIMATIONS =====
  function entranceAnim() {
    const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.8 } });
    
    tl.from(".app-container", { 
      opacity: 0, 
      duration: 0.5 
    })
    .from(".hero-section", { 
      opacity: 0, 
      y: 20, 
      duration: 0.6 
    }, "-=0.2")
    .from(".stats-grid", { 
      opacity: 0, 
      y: 15, 
      duration: 0.5 
    }, "-=0.3")
    .from(".tabs-container", { 
      opacity: 0, 
      y: 15, 
      duration: 0.5 
    }, "-=0.2")
    .from(".showcase-card", { 
      opacity: 0, 
      y: 20, 
      stagger: 0.08, 
      duration: 0.5 
    }, "-=0.2");

    // Animate stats after they appear
    setTimeout(animateCounters, 800);
  }

  // ===== TAB EVENT LISTENERS =====
  tabButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const tabId = this.dataset.tab;
      activateTab(tabId);
    });
  });

  // ===== VIEW ALL BUTTON =====
  if (viewAllBtn) {
    viewAllBtn.addEventListener('click', function() {
      activateTab('all');
    });
  }

  // ===== INIT =====
  renderCards();
  entranceAnim();
  
  // Additional tilt init after animations
  setTimeout(initTilt, 300);

})();
