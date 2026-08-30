const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const photoUrls = {
  dishes: {
    'hyderabadi-biryani.jpg': 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=80',
    'ukadiche-modak.jpg': 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=800&auto=format&fit=crop&q=80',
    'dal-baati-churma.jpg': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&auto=format&fit=crop&q=80',
    'chhena-poda.jpg': 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&auto=format&fit=crop&q=80',
    'avial.jpg': 'https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?w=800&auto=format&fit=crop&q=80',
    'pakhala-bhata.jpg': 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80',
    'patishapta.jpg': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=80',
    'makki-roti.jpg': 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&auto=format&fit=crop&q=80',
    'solkadhi.jpg': 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&auto=format&fit=crop&q=80',
    'litti-chokha.jpg': 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&auto=format&fit=crop&q=80',
    'thekua.jpg': 'https://images.unsplash.com/photo-1576867757603-05b134ebc379?w=800&auto=format&fit=crop&q=80',
    'assamese-khar.jpg': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&auto=format&fit=crop&q=80',
    'rogan-josh.jpg': 'https://images.unsplash.com/photo-1545247181-516773cae754?w=800&auto=format&fit=crop&q=80',
    'undhiyu.jpg': 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80',
    'bisi-bele-bath.jpg': 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&auto=format&fit=crop&q=80',
    'ven-pongal.jpg': 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&auto=format&fit=crop&q=80',
  },
  festivals: {
    'poush-sankranti.jpg': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=80',
    'onam.jpg': 'https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?w=800&auto=format&fit=crop&q=80',
    'pongal.jpg': 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&auto=format&fit=crop&q=80',
    'bihu.jpg': 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&auto=format&fit=crop&q=80',
    'durga-puja.jpg': 'https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?w=800&auto=format&fit=crop&q=80',
    'chhath.jpg': 'https://images.unsplash.com/photo-1576867757603-05b134ebc379?w=800&auto=format&fit=crop&q=80',
    'ganesh.jpg': 'https://images.unsplash.com/photo-1567653418876-5bb0e566e1c2?w=800&auto=format&fit=crop&q=80',
    'diwali.jpg': 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80',
  },
  ingredients: {
    'gobindobhog.jpg': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&auto=format&fit=crop&q=80',
    'nolen-gur.jpg': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=80',
    'kokum.jpg': 'https://images.unsplash.com/photo-1534483509719-3feaee7c30da?w=800&auto=format&fit=crop&q=80',
    'mustard-oil.jpg': 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&auto=format&fit=crop&q=80',
    'chhena.jpg': 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&auto=format&fit=crop&q=80',
    'saffron.jpg': 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&auto=format&fit=crop&q=80',
    'curry-leaves.jpg': 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=800&auto=format&fit=crop&q=80',
  },
  trails: {
    'kolkata-trail.jpg': 'https://images.unsplash.com/photo-1558431382-27e303142255?w=800&auto=format&fit=crop&q=80',
    'delhi-trail.jpg': 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&auto=format&fit=crop&q=80',
  },
};

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const getUrl = (currentUrl, redirects = 0) => {
      if (redirects > 5) return reject(new Error('Too many redirects'));
      https.get(currentUrl, (response) => {
        if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
          return getUrl(response.headers.location, redirects + 1);
        }
        if (response.statusCode !== 200) {
          return reject(new Error(`Failed with status: ${response.statusCode}`));
        }
        response.pipe(file);
        file.on('finish', () => {
          file.close(resolve);
        });
      }).on('error', (err) => {
        fs.unlink(dest, () => {});
        reject(err);
      });
    };
    getUrl(url);
  });
}

async function run() {
  console.log('📥 Downloading real, authentic photographic JPEG files for dishes, festivals, ingredients...');
  for (const [folder, items] of Object.entries(photoUrls)) {
    const dir = path.join(__dirname, '..', 'public', 'images', folder);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    for (const [filename, url] of Object.entries(items)) {
      const dest = path.join(dir, filename);
      try {
        await downloadFile(url, dest);
        console.log(`✓ Saved real photo: public/images/${folder}/${filename}`);
      } catch (err) {
        console.error(`✗ Failed for ${filename}:`, err.message);
      }
    }
  }
  console.log('🎉 Real food photos download complete!');
}

run();
