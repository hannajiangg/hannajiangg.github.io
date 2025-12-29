const fs = require('fs');
const path = require('path');

// Path to the main pics folder
const picsPath = path.join(__dirname, 'pics');

// Output JSON
const outputFile = path.join(__dirname, 'photos.json');

// Recursive function to read all subfolders
function readFolder(folder) {
    const items = fs.readdirSync(folder, { withFileTypes: true });
    const result = [];
  
    items.forEach(item => {
      const fullPath = path.join(folder, item.name);
  
      if (item.isDirectory()) {
        result.push({
          folder: item.name,
          images: readFolder(fullPath) // recurse into subfolder
        });
      } else if (item.isFile() && /\.(png|jpg|jpeg|gif)$/i.test(item.name)) {
        // Make path relative to the repo root for GitHub Pages
        const relativePath = fullPath
          .replace(__dirname + path.sep, '')  // relative to repo root
          .replace(/\\/g, '/');               // Windows compatibility
        result.push({ src: relativePath, caption: item.name });
      }
    });
  
    return result;
  }  

// Generate photos.json
try {
  const photos = readFolder(picsPath);
  fs.writeFileSync(outputFile, JSON.stringify(photos, null, 2));
  console.log('photos.json generated successfully!');
} catch (err) {
  console.error('Error generating photos.json:', err);
}
