/* ==========================================================================
   AuraGlow / The Professional Beauty Point - Main JavaScript Module
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // --- Set Min Date to Today for Booking Form ---
  const dateInput = document.querySelector('#preferredDate');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
    dateInput.value = today;
  }

  // --- Header Scroll Effect ---
  const header = document.querySelector('.header');
  const backToTopBtn = document.querySelector('.back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    if (window.scrollY > 350) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- Mobile Drawer Toggle ---
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const mobileDrawer = document.querySelector('.mobile-nav-drawer');
  const mobileOverlay = document.querySelector('.mobile-nav-overlay');
  const mobileCloseBtn = document.querySelector('.mobile-close-btn');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function openMobileMenu() {
    mobileDrawer.classList.add('active');
    mobileOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileDrawer.classList.remove('active');
    mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (hamburgerBtn) hamburgerBtn.addEventListener('click', openMobileMenu);
  if (mobileCloseBtn) mobileCloseBtn.addEventListener('click', closeMobileMenu);
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeMobileMenu);

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // Highlight active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // --- Services Filter Tabs ---
  const serviceFilterBtns = document.querySelectorAll('.services-section .filter-btn');
  const serviceCards = document.querySelectorAll('.service-card');

  serviceFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      serviceFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      serviceCards.forEach(card => {
        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // --- Gallery Filter Tabs ---
  const galleryFilterBtns = document.querySelectorAll('.gallery-section .filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      galleryFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // --- Lightbox Modal ---
  const lightboxModal = document.querySelector('.lightbox-modal');
  const lightboxImg = document.querySelector('.lightbox-img');
  const lightboxCaption = document.querySelector('.lightbox-caption');
  const lightboxClose = document.querySelector('.lightbox-close');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const title = item.querySelector('.gallery-title')?.textContent || 'Beauty Showcase';
      if (img && lightboxModal) {
        lightboxImg.src = img.src;
        lightboxCaption.textContent = title;
        lightboxModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeLightbox() {
    if (lightboxModal) {
      lightboxModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });
  }

  // Escape key closes modal & drawer
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
      closeMobileMenu();
    }
  });

  // --- Toast Notification Helper ---
  const toast = document.querySelector('.toast-notification');
  const toastTitle = document.querySelector('.toast-message h4');
  const toastDesc = document.querySelector('.toast-message p');
  let toastTimer = null;

  function showToast(title, desc) {
    if (!toast) return;
    if (toastTimer) clearTimeout(toastTimer);

    toastTitle.textContent = title;
    toastDesc.textContent = desc;
    toast.classList.add('active');

    toastTimer = setTimeout(() => {
      toast.classList.remove('active');
    }, 4500);
  }

  // --- Appointment Booking Form & WhatsApp Integration ---
  const bookingForm = document.querySelector('#appointmentForm');

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.querySelector('#fullName')?.value.trim();
      const phone = document.querySelector('#phoneNumber')?.value.trim();
      const service = document.querySelector('#selectService')?.value;
      const date = document.querySelector('#preferredDate')?.value;
      const time = document.querySelector('#preferredTime')?.value;
      const message = document.querySelector('#bookingMessage')?.value.trim();

      if (!name || !phone || !service || !date) {
        showToast('Incomplete Booking', 'Please fill in all required fields to confirm.');
        return;
      }

      // Format WhatsApp message text
      const waMessage = `Hello AuraGlow / The Professional Beauty Point,%0A%0AI would like to book an appointment:%0A• Name: ${encodeURIComponent(name)}%0A• Phone: ${encodeURIComponent(phone)}%0A• Service: ${encodeURIComponent(service)}%0A• Date: ${encodeURIComponent(date)}%0A• Time: ${encodeURIComponent(time)}%0A• Note: ${encodeURIComponent(message || 'N/A')}`;

      const waPhone = '919876543210';
      const waUrl = `https://wa.me/${waPhone}?text=${waMessage}`;

      showToast('Appointment Requested!', `Thank you ${name}. Opening WhatsApp to send your booking confirmation...`);

      setTimeout(() => {
        window.open(waUrl, '_blank');
        bookingForm.reset();
        if (dateInput) dateInput.value = today;
      }, 1400);
    });
  }

  // Quick Service Pre-select listener
  const bookBtns = document.querySelectorAll('.service-book-btn, .package-book-btn');
  bookBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const serviceName = btn.getAttribute('data-service-name');
      const selectElem = document.querySelector('#selectService');
      if (selectElem && serviceName) {
        for (let i = 0; i < selectElem.options.length; i++) {
          if (selectElem.options[i].text.includes(serviceName) || selectElem.options[i].value === serviceName) {
            selectElem.selectedIndex = i;
            break;
          }
        }
      }
      
      const bookingSection = document.querySelector('#booking');
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // --- Special Offer Claim Button ---
  const claimOfferBtn = document.querySelector('#claimOfferBtn');
  if (claimOfferBtn) {
    claimOfferBtn.addEventListener('click', () => {
      showToast('15% OFF Discount Claimed!', 'Code "GLOW15" has been activated for your appointment.');
      const bookingSection = document.querySelector('#booking');
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
});
