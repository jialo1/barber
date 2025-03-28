const https = require('https');
const fs = require('fs');
const path = require('path');

const icons = [
  {
    url: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon.png',
    filename: 'marker-icon.png'
  },
  {
    url: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-shadow.png',
    filename: 'marker-shadow.png'
  }
];

const publicDir = path.join(__dirname, '..', 'public');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

icons.forEach(icon => {
  https.get(icon.url, (response) => {
    const filePath = path.join(publicDir, icon.filename);
    const fileStream = fs.createWriteStream(filePath);
    response.pipe(fileStream);
    fileStream.on('finish', () => {
      fileStream.close();
      console.log(`Downloaded ${icon.filename}`);
    });
  }).on('error', (err) => {
    console.error(`Error downloading ${icon.filename}:`, err.message);
  });
}); 