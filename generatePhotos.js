const fs = require('fs');
const path = require('path');

const picsPath = path.join(__dirname, 'public', 'pics');
const outputFile = path.join(__dirname, 'public', 'photos.json');

function readFolder(folder) {
  const items = fs.readdirSync(folder, { withFileTypes: true });
  const result = [];

  items.forEach(item => {
    const fullPath = path.join(folder, item.name);

    if (item.isDirectory()) {
      result.push({
        folder: item.name,
        images: readFolder(fullPath)
      });
    } else if (item.isFile() && /\.(png|jpg|jpeg|gif)$/i.test(item.name)) {
      const relativePath = fullPath
        .replace(path.join(__dirname, 'public'), '')
        .replace(/\\/g, '/');

      result.push({
        src: relativePath,   // ✅ will be /pics/...
        caption: item.name
      });
    }
  });

  return result;
}

const photos = readFolder(picsPath);
fs.writeFileSync(outputFile, JSON.stringify(photos, null, 2));
console.log('photos.json generated');
