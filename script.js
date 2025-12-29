// Render photos recursively
function renderPhotos(items, parent) {
    items.forEach(item => {
      if (item.folder && item.images) {
        const container = document.createElement('div');
        container.className = 'photo-folder';
  
        const title = document.createElement('h3');
        title.textContent = item.folder;
        container.appendChild(title);
  
        renderPhotos(item.images, container);
        parent.appendChild(container);
      } else if (item.src) {
        const img = document.createElement('img');
        img.src = item.src;          // must be the src from photos.json
        img.alt = item.caption || '';
        img.className = 'photo';
        parent.appendChild(img);
      }
    });
  }
  
  // Load photos.json
  async function loadPhotos() {
    try {
      const res = await fetch('public/photos.json'); // path to JSON
      const data = await res.json();
      const grid = document.getElementById('photoGrid');
      renderPhotos(data, grid);
    } catch (err) {
      console.error('Failed to load photos:', err);
    }
  }
  
  // Tabs
  function openTab(tabId, el) {
    document.querySelectorAll('.tab-content').forEach(tab =>
      tab.classList.remove('show')
    );
    document.querySelectorAll('.tabs button').forEach(btn =>
      btn.classList.remove('active')
    );
  
    document.getElementById(tabId).classList.add('show');
    el.classList.add('active');
  }
  
  // Initialize after DOM loads
  document.addEventListener('DOMContentLoaded', () => {
    loadPhotos();
  
    // Show first tab
    const firstTab = document.querySelector('.tabs button');
    if (firstTab) firstTab.click();
  });
  