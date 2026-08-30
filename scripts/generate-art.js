const fs = require('fs');
const path = require('path');

const dirs = [
  'public/images/dishes',
  'public/images/festivals',
  'public/images/ingredients',
  'public/images/trails',
];

dirs.forEach((d) => {
  const full = path.join(__dirname, '..', d);
  if (!fs.existsSync(full)) {
    fs.mkdirSync(full, { recursive: true });
  }
});

function createFoodSvg(name, subtitle, bg1, bg2, accentColor, emoji, patternType = 'rangoli') {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${bg1}" />
      <stop offset="100%" stop-color="${bg2}" />
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${accentColor}" stop-opacity="0.35" />
      <stop offset="100%" stop-color="${bg2}" stop-opacity="0" />
    </radialGradient>
    <pattern id="mandalaPat" width="40" height="40" patternUnits="userSpaceOnUse">
      <circle cx="20" cy="20" r="1.5" fill="${accentColor}" opacity="0.25" />
      <path d="M 0 20 Q 20 0 40 20 Q 20 40 0 20" fill="none" stroke="${accentColor}" stroke-width="0.75" opacity="0.1" />
    </pattern>
  </defs>

  <!-- Background -->
  <rect width="800" height="500" fill="url(#bgGrad)" />
  <rect width="800" height="500" fill="url(#mandalaPat)" />
  <circle cx="400" cy="230" r="220" fill="url(#glow)" />

  <!-- Center Decorative Plate -->
  <g transform="translate(400, 220)">
    <!-- Outer Rim -->
    <circle cx="0" cy="0" r="140" fill="#1A1816" opacity="0.4" />
    <circle cx="0" cy="0" r="130" fill="#2D241E" stroke="${accentColor}" stroke-width="3" stroke-dasharray="8 4" />
    <!-- Brass / Terracotta Platter -->
    <circle cx="0" cy="0" r="115" fill="#42281D" stroke="#D4A373" stroke-width="2" />
    <circle cx="0" cy="0" r="105" fill="#583424" />

    <!-- Food Emoji Center Icon -->
    <text x="0" y="25" font-size="80" text-anchor="middle" dominant-baseline="middle">${emoji}</text>
  </g>

  <!-- Cultural Heritage Label Box -->
  <rect x="50" y="380" width="700" height="85" rx="18" fill="#181513" fill-opacity="0.85" stroke="${accentColor}" stroke-width="1.5" />
  
  <text x="75" y="418" font-family="Georgia, serif" font-size="24" font-weight="bold" fill="#FFFFFF" letter-spacing="0.5">
    ${name}
  </text>
  <text x="75" y="445" font-family="system-ui, sans-serif" font-size="13" font-weight="600" fill="${accentColor}" letter-spacing="1">
    ${subtitle.toUpperCase()}
  </text>

  <!-- Authenticity Stamp Badge -->
  <g transform="translate(700, 422)">
    <circle cx="0" cy="0" r="22" fill="${accentColor}" fill-opacity="0.2" stroke="${accentColor}" stroke-width="1.5" />
    <text x="0" y="4" font-size="16" text-anchor="middle" dominant-baseline="middle">🇮🇳</text>
  </g>
</svg>`;
}

const dishes = [
  { file: 'hyderabadi-biryani.svg', name: 'Hyderabadi Kacchi Dum Biryani', sub: 'Royal Nizami Saffron Dum Feast • Telangana', bg1: '#3D1C06', bg2: '#1F0D03', acc: '#E9C46A', emoji: '🍛' },
  { file: 'ukadiche-modak.svg', name: 'Ukadiche Modak', sub: 'Steamed Rice & Jaggery Prasad • Maharashtra', bg1: '#2E1C38', bg2: '#160B1C', acc: '#F4A261', emoji: '🥟' },
  { file: 'dal-baati-churma.svg', name: 'Dal Baati Churma', sub: 'Desert Warfare Embers & Desi Ghee • Rajasthan', bg1: '#4A1D0D', bg2: '#240B04', acc: '#E9C46A', emoji: '🍲' },
  { file: 'chhena-poda.svg', name: 'Chhena Poda (Caramelized Cottage Cake)', sub: 'Wood Charcoal Baked Chhena • Odisha', bg1: '#3D2817', bg2: '#1E120A', acc: '#F4A261', emoji: '🥮' },
  { file: 'avial.svg', name: 'Avial (Onam Sadya Centerpiece)', sub: 'Coconut & Curd Ayurvedic Medley • Kerala', bg1: '#13332B', bg2: '#081C17', acc: '#2A9D8F', emoji: '🥗' },
  { file: 'pakhala-bhata.svg', name: 'Pakhala Bhata', sub: 'Fermented Probiotic Rice & Torani • Odisha', bg1: '#1C3144', bg2: '#0D1A26', acc: '#A5C4D4', emoji: '🍚' },
  { file: 'patishapta.svg', name: 'Patishapta Pitha', sub: 'Harvest Rice Crepe with Nolen Gur • West Bengal', bg1: '#3B1A1A', bg2: '#1C0A0A', acc: '#E9C46A', emoji: '🥞' },
  { file: 'makki-roti.svg', name: 'Makki di Roti & Sarson da Saag', sub: 'Slow-Simmered Mustard Greens • Punjab', bg1: '#263318', bg2: '#121C0A', acc: '#E9C46A', emoji: '🫓' },
  { file: 'solkadhi.svg', name: 'Solkadhi', sub: 'Digestive Kokum & Coconut Nectar • Maharashtra & Goa', bg1: '#421626', bg2: '#210811', acc: '#FF7B54', emoji: '🥥' },
  { file: 'litti-chokha.svg', name: 'Litti Chokha', sub: 'Cow-Dung Fire Roasted Sattu Balls • Bihar', bg1: '#3D2012', bg2: '#1C0E07', acc: '#E9C46A', emoji: '🧆' },
  { file: 'thekua.svg', name: 'Thekua (Chhath Mahaprasad)', sub: 'Sun-Patterned Ghee & Wheat Cookies • Bihar', bg1: '#42240C', bg2: '#1E0F04', acc: '#F4A261', emoji: '🍪' },
  { file: 'assamese-khar.svg', name: 'Omita Khar', sub: 'Alkaline Papaya & Banana Ash Curry • Assam', bg1: '#1A3326', bg2: '#0B1A12', acc: '#2A9D8F', emoji: '🥣' },
  { file: 'rogan-josh.svg', name: 'Kashmiri Wazwan Rogan Josh', sub: 'Saffron & Maval Flower Lamb • Kashmir', bg1: '#471414', bg2: '#240707', acc: '#FF7B54', emoji: '🍖' },
  { file: 'undhiyu.svg', name: 'Surti Undhiyu', sub: 'Earthen Matka Upside-Down Casserole • Gujarat', bg1: '#2E3314', bg2: '#151A07', acc: '#E9C46A', emoji: '🥘' },
  { file: 'bisi-bele-bath.svg', name: 'Bisi Bele Bath', sub: 'Royal Mysore Palace Spiced Lentil Rice • Karnataka', bg1: '#3D1C10', bg2: '#1C0A04', acc: '#F4A261', emoji: '🍲' },
  { file: 'ven-pongal.svg', name: 'Ven Pongal', sub: 'Ghee & Black Pepper Temple Prasadam • Tamil Nadu', bg1: '#382B14', bg2: '#1A1307', acc: '#E9C46A', emoji: '🍚' },
];

dishes.forEach((d) => {
  fs.writeFileSync(path.join(__dirname, '../public/images/dishes', d.file), createFoodSvg(d.name, d.sub, d.bg1, d.bg2, d.acc, d.emoji));
});

const festivals = [
  { file: 'poush-sankranti.svg', name: 'Poush Sankranti / Nabanna', sub: 'Winter Rice Harvest & Pithe Festival', bg1: '#3B1A1A', bg2: '#1C0A0A', acc: '#E9C46A', emoji: '🌾' },
  { file: 'onam.svg', name: 'Onam Harvest & Sadya', sub: '26-Dish Feast on Plantain Leaf', bg1: '#13332B', bg2: '#081C17', acc: '#2A9D8F', emoji: '🌸' },
  { file: 'pongal.svg', name: 'Thai Pongal Thanksgiving', sub: 'Sun God Surya Rice Boil-Over', bg1: '#382B14', bg2: '#1A1307', acc: '#E9C46A', emoji: '☀️' },
  { file: 'bihu.svg', name: 'Magh Bihu Feast', sub: 'Granaries Overflowing & Meji Bonfires', bg1: '#1A3326', bg2: '#0B1A12', acc: '#2A9D8F', emoji: '🔥' },
  { file: 'durga-puja.svg', name: 'Durga Puja Mahotsav', sub: 'Sacred Khichuri Bhog & Community Pandal', bg1: '#471414', bg2: '#240707', acc: '#FF7B54', emoji: '🪔' },
  { file: 'chhath.svg', name: 'Chhath Puja', sub: 'Vedic Sun Worship & Holy Thekua', bg1: '#42240C', bg2: '#1E0F04', acc: '#F4A261', emoji: '🌅' },
  { file: 'ganesh.svg', name: 'Ganesh Chaturthi', sub: '21 Ukadiche Modaks Offering', bg1: '#2E1C38', bg2: '#160B1C', acc: '#F4A261', emoji: '🐘' },
  { file: 'diwali.svg', name: 'Diwali Feast of Lights', sub: 'Ghee Confectionery & Sweet Exchanges', bg1: '#3D1C06', bg2: '#1F0D03', acc: '#E9C46A', emoji: '✨' },
];

festivals.forEach((f) => {
  fs.writeFileSync(path.join(__dirname, '../public/images/festivals', f.file), createFoodSvg(f.name, f.sub, f.bg1, f.bg2, f.acc, f.emoji));
});

const ingredients = [
  { file: 'gobindobhog.svg', name: 'Gobindobhog Heirloom Rice', sub: 'GI Tagged Fragrant Grain • Bengal', bg1: '#382B14', bg2: '#1A1307', acc: '#E9C46A', emoji: '🌾' },
  { file: 'nolen-gur.svg', name: 'Winter Date Palm Jaggery', sub: 'Nolen Gur Tapped at Winter Dawn', bg1: '#42240C', bg2: '#1E0F04', acc: '#F4A261', emoji: '🍯' },
  { file: 'kokum.svg', name: 'Konkan Kokum (Vrikshamla)', sub: 'Sun-Dried Digestive Souring Fruit', bg1: '#421626', bg2: '#210811', acc: '#FF7B54', emoji: '🍒' },
  { file: 'mustard-oil.svg', name: 'Kachi Ghani Mustard Oil', sub: 'Cold-Pressed Pungent Golden Fat', bg1: '#382B14', bg2: '#1A1307', acc: '#E9C46A', emoji: '🫗' },
  { file: 'chhena.svg', name: 'Fresh Artisanal Chhena', sub: 'Cow Milk Curd for Rasagola & Poda', bg1: '#3D2817', bg2: '#1E120A', acc: '#F4A261', emoji: '🧀' },
  { file: 'saffron.svg', name: 'Pampore Kashmiri Saffron', sub: 'GI Tagged Royal Red Gold', bg1: '#471414', bg2: '#240707', acc: '#FF7B54', emoji: '🌺' },
  { file: 'curry-leaves.svg', name: 'Fresh Kariveppila (Curry Leaves)', sub: 'South Indian Aromatic Signature', bg1: '#13332B', bg2: '#081C17', acc: '#2A9D8F', emoji: '🍃' },
];

ingredients.forEach((ing) => {
  fs.writeFileSync(path.join(__dirname, '../public/images/ingredients', ing.file), createFoodSvg(ing.name, ing.sub, ing.bg1, ing.bg2, ing.acc, ing.emoji));
});

const trails = [
  { file: 'kolkata-trail.svg', name: 'North Kolkata Heritage Sweet Trail', sub: '150-Year Confectionery Dynasties Walk', bg1: '#3B1A1A', bg2: '#1C0A0A', acc: '#E9C46A', emoji: '🏛️' },
  { file: 'delhi-trail.svg', name: 'Old Delhi Shahjahanabad Food Walk', sub: '17th-Century Imperial Mughal Gastronomy', bg1: '#3D1C06', bg2: '#1F0D03', acc: '#E9C46A', emoji: '🕌' },
];

trails.forEach((tr) => {
  fs.writeFileSync(path.join(__dirname, '../public/images/trails', tr.file), createFoodSvg(tr.name, tr.sub, tr.bg1, tr.bg2, tr.acc, tr.emoji));
});

console.log('✅ Generated 30+ stunning, high-res local SVG food artworks with zero external network dependency!');
