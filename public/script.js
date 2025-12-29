async function loadPhotos() {
    const photoGrid = document.getElementById('photoGrid');
    const res = await fetch('/api/photos');
    const data = await res.json();

    function createFolder(folder) {
        const container = document.createElement('div');
        container.className = 'photo-folder';
    
        // Folder header
        if (folder.folder) {
            const header = document.createElement('h3');
            header.className = 'photo-folder-header';
            header.textContent = folder.folder;
            container.appendChild(header);
        }
    
        // Grid for photos
        const grid = document.createElement('div');
        grid.className = 'photo-folder-grid'; // changed from 'photo-grid'
    
        (folder.images || folder).forEach(item => {
            if (item.folder) {
                // Recursively create subfolders
                container.appendChild(createFolder(item));
            } else {
                const card = document.createElement('div');
                card.className = 'photo-card';
    
                const img = document.createElement('img');
                img.src = item.src;
                img.alt = item.caption || '';
    
                card.appendChild(img);
                grid.appendChild(card);
            }
        });
    
        container.appendChild(grid);
        return container;
    }
    

    data.forEach(folder => {
        photoGrid.appendChild(createFolder(folder));
    });
}

loadPhotos();

// Tabs
function openTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('show'));
    document.querySelectorAll('.tabs button').forEach(btn => btn.classList.remove('active'));
    document.getElementById(tabId).classList.add('show');
    document.querySelector(`.tabs button[onclick="openTab('${tabId}')"]`).classList.add('active');
}