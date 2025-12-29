// render photos
function renderPhotos(items, parent) {
    items.forEach(item => {
      if (item.folder && item.images) {
        // Folder container
        const folderDiv = document.createElement('div');
        folderDiv.className = 'photo-folder';
  
        const header = document.createElement('h3');
        header.className = 'photo-folder-header';
        header.textContent = item.folder;
        folderDiv.appendChild(header);
  
        // Grid container
        const gridDiv = document.createElement('div');
        gridDiv.className = 'photo-folder-grid';
  
        // Recursively render images into the grid
        renderPhotos(item.images, gridDiv);
        folderDiv.appendChild(gridDiv);
  
        parent.appendChild(folderDiv);
      } else if (item.src) {
        // Single photo wrapped in card
        const card = document.createElement('div');
        card.className = 'photo-card';
  
        const img = document.createElement('img');
        img.src = item.src;
        img.alt = item.caption || '';
        card.appendChild(img);
  
        parent.appendChild(card);
      }
    });
  }  
  
  // Load photos.json
  async function loadPhotos() {
    try {
      const res = await fetch('./photos.json');
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