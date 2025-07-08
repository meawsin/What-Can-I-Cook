function checkAuth(required = true) {
  const token = localStorage.getItem('token');
  if (required && !token) window.location.href = 'login.html';
  return !!token;
}

function highlightNav() {
  const page = window.location.pathname.split('/').pop();
  const navMap = {
    'home.html': ['nav-home', 'side-home'],
    'user.html': ['nav-profile', 'side-profile'],
    'recipes.html': ['nav-recipes', 'side-recipes'],
    'ingredients.html': ['nav-ingredients', 'side-ingredients'],
    'favourites.html': ['nav-favourites', 'side-favourites'],
    'upload.html': ['nav-upload', 'side-upload'],
    'about.html': ['nav-about', 'side-about']
  };
  Object.values(navMap).flat().forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.remove('bg-orange-700', 'text-white', 'shadow-lg', 'font-bold');
  });
  if (navMap[page]) {
    navMap[page].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.add('bg-orange-700', 'text-white', 'shadow-lg', 'font-bold');
    });
  }
}

function setupSidebar() {
  const mobileToggle = document.getElementById('mobile-nav-toggle');
  const sidebar = document.getElementById('mobile-sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  const closeSidebar = document.getElementById('close-sidebar');
  if (mobileToggle && sidebar && overlay && closeSidebar) {
    mobileToggle.addEventListener('click', () => {
      sidebar.classList.add('active');
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
    closeSidebar.addEventListener('click', () => {
      sidebar.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    });
    overlay.addEventListener('click', () => {
      sidebar.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  }
}

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('userInfo');
  window.location.href = 'index.html';
}

function navigateHome() {
  const token = localStorage.getItem('token');
  const userInfo = localStorage.getItem('userInfo');
  if (!token || !userInfo) {
    window.location.href = 'index.html';
  } else {
    window.location.href = 'home.html';
  }
}

function setupSearchModal() {
  const searchModal = document.getElementById('search-modal');
  const navbarSearchBtn = document.getElementById('navbar-search-btn');
  const sidebarSearchBtn = document.getElementById('sidebar-search-btn');
  const closeSearchModal = document.getElementById('close-search-modal');
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  function openSearchModal() {
    searchModal.classList.remove('hidden');
    searchInput.value = '';
    searchResults.innerHTML = '';
    searchInput.focus();
  }
  function closeSearch() {
    searchModal.classList.add('hidden');
  }
  if (navbarSearchBtn) navbarSearchBtn.addEventListener('click', openSearchModal);
  if (sidebarSearchBtn) sidebarSearchBtn.addEventListener('click', openSearchModal);
  if (closeSearchModal) closeSearchModal.addEventListener('click', closeSearch);
  document.addEventListener('keydown', (e) => {
    if (searchModal && !searchModal.classList.contains('hidden') && e.key === 'Escape') closeSearch();
  });
  if (searchModal) searchModal.addEventListener('click', (e) => {
    if (e.target === searchModal) closeSearch();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  highlightNav();
  setupSidebar();
  setupSearchModal();
}); 