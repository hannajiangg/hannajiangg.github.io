// server.js
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Serve static files
app.use(express.static('public'));

// API to read /pics folder
app.get('/api/photos', (req, res) => {
    const picsPath = path.join(__dirname, 'public', 'pics', 'author');

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
                const relativePath = fullPath.replace(path.join(__dirname, 'public'), '').replace(/\\/g, '/');
                result.push({ src: relativePath, caption: item.name });
            }
        });

        return result;
    }

    try {
        const photos = readFolder(picsPath);
        res.json(photos);
    } catch (err) {
        res.status(500).json({ error: 'Cannot read pics folder.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
