import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database with REAL photography image paths...');

  // Clear existing records
  await prisma.review.deleteMany({});
  await prisma.favorite.deleteMany({});
  await prisma.contribution.deleteMany({});
  await prisma.story.deleteMany({});
  await prisma.foodTrailStop.deleteMany({});
  await prisma.foodTrail.deleteMany({});
  await prisma.festivalDish.deleteMany({});
  await prisma.dishIngredient.deleteMany({});
  await prisma.dish.deleteMany({});
  await prisma.ingredient.deleteMany({});
  await prisma.festival.deleteMany({});
  await prisma.state.deleteMany({});
  await prisma.aIKnowledgeDocument.deleteMany({});
  await prisma.user.deleteMany({});

  const passwordHash = await bcrypt.hash('heritage123', 10);
  
  const adminUser = await prisma.user.create({
    data: {
      name: 'Dr. Aparna Sen (Curator)',
      email: 'admin@heritagefoodatlas.in',
      passwordHash,
      role: 'ADMIN',
      avatarUrl: '/images/dishes/patishapta.jpg',
      bio: 'Senior Curator & Food Historian, National Food Heritage Mission.',
    },
  });

  const contributorUser = await prisma.user.create({
    data: {
      name: 'Raghavan Pillai',
      email: 'contributor@heritagefoodatlas.in',
      passwordHash,
      role: 'CONTRIBUTOR',
      avatarUrl: '/images/dishes/avial.jpg',
      bio: 'Third-generation traditional recipe archivist from Thrissur, Kerala.',
    },
  });

  const demoUser = await prisma.user.create({
    data: {
      name: 'Ananya Sharma',
      email: 'user@heritagefoodatlas.in',
      passwordHash,
      role: 'USER',
      avatarUrl: '/images/dishes/hyderabadi-biryani.jpg',
      bio: 'Heritage food explorer and oral tradition researcher.',
    },
  });

  // States
  const statesData = [
    {
      code: 'WB',
      name: 'West Bengal',
      hindiName: 'पश्चिम बंगाल',
      bengaliName: 'পশ্চিমবঙ্গ',
      zone: 'East',
      description: 'Famed for delicate chhena confectionery, six-course communal meals, freshwater fish traditions, and mustard oil pungency.',
      latitude: 22.9868,
      longitude: 87.8550,
      capital: 'Kolkata',
    },
    {
      code: 'OD',
      name: 'Odisha',
      hindiName: 'ओडिशा',
      bengaliName: 'ওড়িশা',
      zone: 'East',
      description: 'The cradle of Jagannath temple Mahaprasad culinary canons, fermented rice, and indigenous chhena delicacies.',
      latitude: 20.9517,
      longitude: 85.0985,
      capital: 'Bhubaneswar',
    },
    {
      code: 'AS',
      name: 'Assam',
      hindiName: 'असम',
      bengaliName: 'আসাম',
      zone: 'Northeast',
      description: 'Characterized by alkaline khar, fermented bamboo shoots, sour tenga curries, and aromatic joha rice.',
      latitude: 26.2006,
      longitude: 92.9376,
      capital: 'Dispur',
    },
    {
      code: 'TN',
      name: 'Tamil Nadu',
      hindiName: 'तमिलनाडु',
      bengaliName: 'তামিলনাড়ু',
      zone: 'South',
      description: 'Sangam-era culinary philosophy centering on fermented rice-lentil batters, stone-ground Chettinad spices, and harvest offerings.',
      latitude: 11.1271,
      longitude: 78.6569,
      capital: 'Chennai',
    },
    {
      code: 'KL',
      name: 'Kerala',
      hindiName: 'केरल',
      bengaliName: 'কেরল',
      zone: 'South',
      description: 'Enriched by coconut milk, fresh curry leaves, black pepper, and the monumental 26-dish vegetarian Onam Sadya.',
      latitude: 10.8505,
      longitude: 76.2711,
      capital: 'Thiruvananthapuram',
    },
    {
      code: 'KA',
      name: 'Karnataka',
      hindiName: 'कर्नाटक',
      bengaliName: 'কর্ণাটক',
      zone: 'South',
      description: 'Diverse culinary topography from coastal Mangalorean seafood to royal Mysore confectionery and North Karnataka millet rotis.',
      latitude: 15.3173,
      longitude: 75.7139,
      capital: 'Bengaluru',
    },
    {
      code: 'AP',
      name: 'Andhra Pradesh & Telangana',
      hindiName: 'आंध्र प्रदेश एवं तेलंगाना',
      bengaliName: 'অন্ধ্র প্রদেশ ও তেলেঙ্গানা',
      zone: 'South',
      description: 'Renowned for fiery Guntur chillies, tangy Gongura leaves, and royal Nizami Dum Biryani.',
      latitude: 15.9129,
      longitude: 79.7400,
      capital: 'Hyderabad / Amaravati',
    },
    {
      code: 'MH',
      name: 'Maharashtra',
      hindiName: 'महाराष्ट्र',
      bengaliName: 'মহারাষ্ট্র',
      zone: 'West',
      description: 'Vibrant blend of Konkani coastal coconut & kokum, fiery Kolhapuri rassa, sweet puran poli, and sacred Modaks.',
      latitude: 19.7515,
      longitude: 75.7139,
      capital: 'Mumbai',
    },
    {
      code: 'GJ',
      name: 'Gujarat',
      hindiName: 'गुजरात',
      bengaliName: 'গুজরাত',
      zone: 'West',
      description: 'Quintessential sweet-savory balance featuring fermented dhoklas, earthen-pot winter Undhiyu, and centuries-old Jain vegetarian canons.',
      latitude: 22.2587,
      longitude: 71.1924,
      capital: 'Gandhinagar',
    },
    {
      code: 'RJ',
      name: 'Rajasthan',
      hindiName: 'राजस्थान',
      bengaliName: 'রাজস্থান',
      zone: 'West',
      description: 'Arid desert culinary mastery relying on milk, ghee, gram flour, wild ker-sangri berries, and long preservation.',
      latitude: 27.0238,
      longitude: 74.2179,
      capital: 'Jaipur',
    },
    {
      code: 'PB',
      name: 'Punjab',
      hindiName: 'पंजाब',
      bengaliName: 'পাঞ্জাব',
      zone: 'North',
      description: 'Agricultural heartland celebrating slow-simmered mustard greens, earthen pot lentils, and cultured white butter.',
      latitude: 31.1471,
      longitude: 75.3412,
      capital: 'Chandigarh',
    },
    {
      code: 'UP',
      name: 'Uttar Pradesh',
      hindiName: 'उत्तर प्रदेश',
      bengaliName: 'উত্তর প্রদেশ',
      zone: 'North',
      description: 'Home to the refined Awadhi courtly Dum Pukht cuisine of Lucknow and Mathura holy milk pedas.',
      latitude: 26.8467,
      longitude: 80.9462,
      capital: 'Lucknow',
    },
    {
      code: 'BR',
      name: 'Bihar',
      hindiName: 'बिहार',
      bengaliName: 'বিহার',
      zone: 'East',
      description: 'Ancient rustic gastronomy highlighted by cow-dung fired roasted Sattu Littis, sun-dried Thekua, and mustard chokha.',
      latitude: 25.0961,
      longitude: 85.3131,
      capital: 'Patna',
    },
    {
      code: 'JK',
      name: 'Jammu & Kashmir',
      hindiName: 'जम्मू और कश्मीर',
      bengaliName: 'জম্মু ও কাশ্মীর',
      zone: 'North',
      description: 'Royal thirty-six course Kashmiri Wazwan, Kashmiri Pandit hing & fennel curries, mountain saffron, and Samovar Kahwa.',
      latitude: 33.7782,
      longitude: 76.5762,
      capital: 'Srinagar',
    },
    {
      code: 'GA',
      name: 'Goa',
      hindiName: 'गोवा',
      bengaliName: 'গোয়া',
      zone: 'West',
      description: 'Indo-Portuguese coastal heritage combining toddy vinegar, Kokum, triphala spice, fresh pomfret, and multi-layered Bebinca.',
      latitude: 15.2993,
      longitude: 74.1240,
      capital: 'Panaji',
    },
  ];

  const stateMap = new Map<string, any>();
  for (const s of statesData) {
    const created = await prisma.state.create({ data: s });
    stateMap.set(s.code, created);
  }

  // Festivals with Real Photography
  const festivalsData = [
    {
      slug: 'poush-sankranti',
      name: 'Poush Sankranti / Nabanna',
      regionalNames: JSON.stringify([
        { lang: 'bn', name: 'পৌষ সংক্রান্তি / নবান্ন' },
        { lang: 'hi', name: 'पौष संक्रांति' },
      ]),
      monthSeason: 'January (Winter Harvest / Magh)',
      significance: 'Celebration of newly harvested rice, freshly tapped date-palm jaggery (Nolen Gur), and the welcoming of prosperity through handcrafted pithas.',
      description: 'A pivotal harvest festival across Bengal where rural households prepare intricate rice-flour crepes and dumplings stuffed with coconut and sweetened condensed milk.',
      imageUrl: '/images/festivals/poush-sankranti.jpg',
      associatedStates: JSON.stringify(['WB', 'OD', 'AS', 'BR']),
    },
    {
      slug: 'onam',
      name: 'Onam',
      regionalNames: JSON.stringify([
        { lang: 'ml', name: 'ഓണം' },
        { lang: 'hi', name: 'ओणम' },
      ]),
      monthSeason: 'August – September (Chingam)',
      significance: 'Commemorates the return of the mythical King Mahabali and honors the harvest season through the legendary 26-dish vegetarian Onam Sadya served on banana leaves.',
      description: 'A state-wide cultural festival of harmony, floral pookkalams, and the pinnacle of Ayurvedic balance in feast design.',
      imageUrl: '/images/festivals/onam.jpg',
      associatedStates: JSON.stringify(['KL']),
    },
    {
      slug: 'pongal',
      name: 'Pongal / Thai Pongal',
      regionalNames: JSON.stringify([
        { lang: 'ta', name: 'தை பொங்கல்' },
        { lang: 'hi', name: 'पोंगल' },
      ]),
      monthSeason: 'January (Thai)',
      significance: 'Tamil harvest thanksgiving dedicated to the Sun God (Surya) where the boiling over of new rice and milk in clay pots symbolizes boundless abundance.',
      description: 'Families gather outdoors as turmeric-adorned clay pots bubble over with savoury Ven Pongal and sweet Sakkarai Pongal.',
      imageUrl: '/images/festivals/pongal.jpg',
      associatedStates: JSON.stringify(['TN', 'AP', 'KA']),
    },
    {
      slug: 'magh-bihu',
      name: 'Magh Bihu / Bhogali Bihu',
      regionalNames: JSON.stringify([
        { lang: 'as', name: 'মাঘ বিহু / ভোগালী বিহু' },
        { lang: 'hi', name: 'माघ बिहू' },
      ]),
      monthSeason: 'January (Magh)',
      significance: 'Assam feast festival celebrating granaries overflowing with harvest; marked by bonfire feasting (Meji) and traditional pitha crafting.',
      description: 'Community feasts and delicate sesame or jaggery-stuffed rolled pithas baked inside fresh green bamboo tubes.',
      imageUrl: '/images/festivals/bihu.jpg',
      associatedStates: JSON.stringify(['AS']),
    },
    {
      slug: 'durga-puja',
      name: 'Durga Puja',
      regionalNames: JSON.stringify([
        { lang: 'bn', name: 'দুর্গাপূজা' },
        { lang: 'hi', name: 'दुर्गा पूजा' },
      ]),
      monthSeason: 'September – October (Ashwin / Autumn)',
      significance: 'Grand triumph of Goddess Durga celebrated through community feasting, sacred Khichuri Bhog, Labra, and nocturnal sweetmeat trails.',
      description: 'UNESCO Intangible Cultural Heritage event uniting millions over community pandal bhog and festive indulgence.',
      imageUrl: '/images/festivals/durga-puja.jpg',
      associatedStates: JSON.stringify(['WB', 'AS', 'OD', 'BR']),
    },
    {
      slug: 'chhath-puja',
      name: 'Chhath Puja',
      regionalNames: JSON.stringify([
        { lang: 'bho', name: 'छठ पूजा' },
        { lang: 'hi', name: 'छठ पूजा' },
      ]),
      monthSeason: 'October – November (Kartik)',
      significance: 'Ancient Vedic sun worship along riverbanks celebrated with strict fasting and offering of sun-kissed deep-fried whole wheat Thekua.',
      description: 'An intensely devotional festival centered on purity, environmental gratitude, and pristine handmade wheat and jaggery delicacies.',
      imageUrl: '/images/festivals/chhath.jpg',
      associatedStates: JSON.stringify(['BR', 'UP']),
    },
    {
      slug: 'ganesh-chaturthi',
      name: 'Ganesh Chaturthi',
      regionalNames: JSON.stringify([
        { lang: 'mr', name: 'गणेशोत्सव' },
        { lang: 'hi', name: 'गणेश चतुर्थी' },
      ]),
      monthSeason: 'August – September (Bhadrapada)',
      significance: 'Celebrating Lord Ganesha with steamed Ukadiche Modak dumplings made of fragrant rice flour filled with fresh grated coconut and jaggery.',
      description: 'Ten-day celebration of family gathering and offering 21 Modaks as holy prasad.',
      imageUrl: '/images/festivals/ganesh.jpg',
      associatedStates: JSON.stringify(['MH', 'GA', 'KA']),
    },
    {
      slug: 'diwali',
      name: 'Diwali / Deepavali',
      regionalNames: JSON.stringify([
        { lang: 'hi', name: 'दीपावली' },
        { lang: 'bn', name: 'দীপাবলি' },
      ]),
      monthSeason: 'October – November (Kartik)',
      significance: 'Festival of lights celebrated across the subcontinent with rich ghee-laden sweetmeats, savory crunchies, and regional festive exchanges.',
      description: 'Homes across India prepare traditional sweetmeats like Mysore Pak, Puran Poli, Kaju Katli, and regional delicacies.',
      imageUrl: '/images/festivals/diwali.jpg',
      associatedStates: JSON.stringify(['RJ', 'GJ', 'MH', 'UP', 'PB', 'TN']),
    },
  ];

  const festivalMap = new Map<string, any>();
  for (const f of festivalsData) {
    const created = await prisma.festival.create({ data: f });
    festivalMap.set(f.slug, created);
  }

  // Traditional Ingredients with Real Photography
  const ingredientsData = [
    {
      slug: 'gobindobhog-rice',
      name: 'Gobindobhog Rice',
      regionalNames: JSON.stringify([
        { lang: 'bn', name: 'গোবিন্দভোগ চাল' },
        { lang: 'hi', name: 'गोबिंदोभोग चावल' },
      ]),
      originRegion: 'Burdwan, West Bengal',
      botanicalName: 'Oryza sativa var. Gobindobhog',
      category: 'Grain',
      description: 'Short-grained, fragrant white rice cultivated in the alluvial plains of Bengal, prized for its natural buttery aroma and soft mouthfeel.',
      culturalSignificance: 'Designated GI Tagged rice reserved strictly for temple offerings to Lord Govinda, sacred Payesh, and festive Khichuri.',
      seasonality: 'Winter Harvest (Aman crop)',
      imageUrl: '/images/ingredients/gobindobhog.jpg',
      healthAspects: 'Easily digestible, gluten-free, rich in essential amylose balance.',
    },
    {
      slug: 'nolen-gur',
      name: 'Date Palm Jaggery (Nolen Gur / Patali Gur)',
      regionalNames: JSON.stringify([
        { lang: 'bn', name: 'নলেন গুড় / পাটালি গুড়' },
        { lang: 'hi', name: 'खजूर का गुड़' },
      ]),
      originRegion: 'South 24 Parganas & Nadia, West Bengal',
      botanicalName: 'Phoenix sylvestris sap',
      category: 'Sweetener',
      description: 'Liquid and solidified golden nectar extracted by artisanal tree-climbers (Shiulis) from wild date palm sap during cold winter dawn.',
      culturalSignificance: 'The soul of winter Bengali confectionery. It defines Poush Sankranti pithas, Sandesh, and Joynagarer Moa.',
      seasonality: 'Mid-November to February (Winter only)',
      imageUrl: '/images/ingredients/nolen-gur.jpg',
      healthAspects: 'Unrefined natural sugars, packed with iron, potassium, and magnesium.',
    },
    {
      slug: 'kokum',
      name: 'Kokum (Vrikshamla)',
      regionalNames: JSON.stringify([
        { lang: 'mr', name: 'कोकम / रातंबा' },
        { lang: 'kn', name: 'ಮುರುಗಲು' },
        { lang: 'hi', name: 'कोकम' },
      ]),
      originRegion: 'Western Ghats / Konkan Coast',
      botanicalName: 'Garcinia indica',
      category: 'Fruit / Souring Agent',
      description: 'Deep purple sun-dried rind of Garcinia indica providing a fruity, tangy sourness with ruby coloring.',
      culturalSignificance: 'Essential cooling element in Konkani, Goan, and Maharashtrian cuisines; central to digestive Solkadhi.',
      seasonality: 'March to May (Harvested in Summer, dried for year-round use)',
      imageUrl: '/images/ingredients/kokum.jpg',
      healthAspects: 'Potent antioxidant containing garcinol and hydroxycitric acid (HCA); excellent digestive and cardioprotective aid.',
    },
    {
      slug: 'mustard-oil',
      name: 'Cold-Pressed Kachi Ghani Mustard Oil',
      regionalNames: JSON.stringify([
        { lang: 'bn', name: 'ঘানি ভাঙা খাঁটি সরিষার তেল' },
        { lang: 'hi', name: 'कच्ची घानी सरसों का तेल' },
        { lang: 'as', name: 'মিঠা তেল' },
      ]),
      originRegion: 'Eastern & Northern India',
      botanicalName: 'Brassica juncea',
      category: 'Oil',
      description: 'Pungent, amber-hued oil extracted through wooden expellers without heat, retaining all volatile allylisothiocyanates.',
      culturalSignificance: 'The foundational fat and preservative of Bengali, Odia, Assamese, and Bihari culinary traditions.',
      seasonality: 'Year-round',
      imageUrl: '/images/ingredients/mustard-oil.jpg',
      healthAspects: 'Ideal ratio of Omega-3 to Omega-6 fatty acids, natural antimicrobial properties.',
    },
    {
      slug: 'chhena',
      name: 'Artisanal Chhena (Fresh Cottage Curd)',
      regionalNames: JSON.stringify([
        { lang: 'or', name: 'ଛେନା' },
        { lang: 'bn', name: 'ছানা' },
        { lang: 'hi', name: 'छेना' },
      ]),
      originRegion: 'Odisha & Bengal River Valleys',
      botanicalName: 'Cow Milk Curd Curvature',
      category: 'Dairy',
      description: 'Fresh cow\'s milk curdled using whey or lemon juice, drained and hand-kneaded without pressing into blocks.',
      culturalSignificance: 'The revolutionary ingredient behind the 18th-century renaissance of Eastern Indian sweets: Rasagola, Chhena Poda, and Sandesh.',
      seasonality: 'Year-round',
      imageUrl: '/images/ingredients/chhena.jpg',
      healthAspects: 'High quality milk protein, easily absorbable calcium.',
    },
    {
      slug: 'kashmiri-saffron',
      name: 'Pampore Kashmiri Saffron (Kong / Kesar)',
      regionalNames: JSON.stringify([
        { lang: 'ks', name: 'কং (Kong)' },
        { lang: 'hi', name: 'कश्मीरी केसर' },
      ]),
      originRegion: 'Pampore, Kashmir Valley',
      botanicalName: 'Crocus sativus',
      category: 'Spice',
      description: 'Hand-picked dark crimson stigmas harvested from purple crocus flowers blooming on the Karewa plateau of Kashmir.',
      culturalSignificance: 'GI-tagged royal spice known for supreme crocin concentration, imparting aroma to Wazwan, Kahwa, and festival feasts.',
      seasonality: 'Autumn Bloom (October – November)',
      imageUrl: '/images/ingredients/saffron.jpg',
      healthAspects: 'Natural mood elevator, anti-inflammatory, neuroprotective antioxidants.',
    },
    {
      slug: 'curry-leaves',
      name: 'Fresh Kariveppila (Curry Leaves)',
      regionalNames: JSON.stringify([
        { lang: 'ta', name: 'கறிவேப்பிலை' },
        { lang: 'ml', name: 'കറിവേப்பില' },
        { lang: 'hi', name: 'कढ़ी पत्ता' },
      ]),
      originRegion: 'Southern Peninsular India',
      botanicalName: 'Murraya koenigii',
      category: 'Herb',
      description: 'Glossy dark green aromatic pinnate leaves that release essential oils when crackled in hot coconut or sesame oil with mustard seeds.',
      culturalSignificance: 'The quintessential aromatic signature of South Indian tempering (tadka / thalippu).',
      seasonality: 'Year-round',
      imageUrl: '/images/ingredients/curry-leaves.jpg',
      healthAspects: 'Rich in mahanimbine alkaloids, blood-sugar regulating, powerful antioxidant.',
    },
  ];

  const ingredientMap = new Map<string, any>();
  for (const ing of ingredientsData) {
    const created = await prisma.ingredient.create({ data: ing });
    ingredientMap.set(ing.slug, created);
  }

  // Dishes with Real Photographic JPEG files
  const dishesData = [
    {
      slug: 'hyderabadi-kacchi-dum-biryani',
      name: 'Hyderabadi Kacchi Dum Biryani',
      localNames: JSON.stringify([
        { lang: 'te', name: 'హైదరాబాదీ దమ్ బిర్యానీ' },
        { lang: 'ur', name: 'حیدرآبادی دم بریانی' },
        { lang: 'hi', name: 'हैदराबादी दम बिरयानी' },
      ]),
      stateCode: 'AP',
      regionName: 'Deccan / Hyderabad',
      cuisineType: 'Hyderabadi / Nizami',
      foodCategory: 'Main',
      description: 'Raw marinated lamb cuts layered with partially boiled long-grain basmati rice, caramelized golden onions (birista), fresh mint, cilantro, and saffron-infused milk, sealed in a heavy copper degh with dough and slow-cooked over wood embers on dum.',
      culturalSignificance: 'The pinnacle of Nizami royal hospitality, combining Persian courtly elegance with fiery Deccan spice traditions.',
      historicalBackground: 'Developed under Asaf Jahi culinary masters in the 18th century, blending Mughlai layering with Andhra spices.',
      traditionalPreparation: 'Raw meat is marinated for 6+ hours in raw papaya paste and spiced yogurt. Layered with 70% cooked aromatic rice, sealed airtight with atta dough, and cooked on slow dum.',
      seasonalAvailability: 'All Season',
      isGiTagged: true,
      giTagDetails: 'Hyderabadi Biryani geographical indication recognized.',
      imageUrl: '/images/dishes/hyderabadi-biryani.jpg',
      gallery: JSON.stringify([
        '/images/dishes/hyderabadi-biryani.jpg',
        '/images/ingredients/saffron.jpg',
        '/images/ingredients/curry-leaves.jpg'
      ]),
      verifiedStatus: 'VERIFIED',
      viewsCount: 4200,
      ingredientSlugs: ['kashmiri-saffron'],
      festivalSlugs: ['diwali'],
    },
    {
      slug: 'ukadiche-modak',
      name: 'Ukadiche Modak',
      localNames: JSON.stringify([
        { lang: 'mr', name: 'उकडीचे मोदक' },
        { lang: 'hi', name: 'उकडीचे मोदक' },
      ]),
      stateCode: 'MH',
      regionName: 'Konkan & Pune',
      cuisineType: 'Maharashtrian',
      foodCategory: 'Festival Food',
      description: 'Sacred steamed dumplings shaped like lotus buds, crafted from delicate steamed Ambemohar rice flour dough (ukad), encasing a heavenly filling of freshly grated coconut, jaggery, cardamom, and nutmeg, drizzled with pure warm ghee.',
      culturalSignificance: 'Lord Ganesha\'s most beloved offering (Modakapriya). Families prepare exactly 21 Modaks by hand with intricate pleats during the ten-day Ganeshotsav.',
      historicalBackground: 'Described in ancient Puranic texts including the Ganesha Purana as the sweet that grants spiritual fulfillment and delight (Moda).',
      traditionalPreparation: 'Rice flour is cooked in boiling water with a spoon of ghee and salt, kneaded vigorously while hot. Shaped into cups, pleated, filled with cooked coconut-jaggery, sealed, and steamed over turmeric leaves.',
      seasonalAvailability: 'Festival (Aug – Sep)',
      isGiTagged: false,
      imageUrl: '/images/dishes/ukadiche-modak.jpg',
      gallery: JSON.stringify(['/images/dishes/ukadiche-modak.jpg']),
      verifiedStatus: 'VERIFIED',
      viewsCount: 3400,
      ingredientSlugs: [],
      festivalSlugs: ['ganesh-chaturthi'],
    },
    {
      slug: 'dal-baati-churma',
      name: 'Dal Baati Churma',
      localNames: JSON.stringify([
        { lang: 'hi', name: 'दाल बाटी चूरमा' },
        { lang: 'raj', name: 'दाल बाटी चूरमो' },
      ]),
      stateCode: 'RJ',
      regionName: 'Mewar & Marwar',
      cuisineType: 'Rajasthani',
      foodCategory: 'Main',
      description: 'Hard whole-wheat flour dumplings baked traditionally over dry cow-dung or charcoal fires, soaked in fragrant desi ghee, served with a spicy five-lentil stew (Panchmel Dal) and sweet powdered jaggery-infused churma.',
      culturalSignificance: 'Born out of the harsh warfare conditions of the Rajput kingdoms where soldiers buried dough balls beneath hot desert sand, finding them baked upon their return.',
      historicalBackground: 'Rawal Jait Singh of Mewar (13th century) formalized baati as war rations. The Guhilot clan popularized dipping baked dough in molten ghee to prevent desiccation.',
      traditionalPreparation: 'Coarse wheat flour is kneaded with milk, curd, and ajwain into firm spheres, baked slowly, cracked open, immersed fully in warm ghee, and served hot.',
      seasonalAvailability: 'Winter & Festive',
      isGiTagged: false,
      imageUrl: '/images/dishes/dal-baati-churma.jpg',
      gallery: JSON.stringify(['/images/dishes/dal-baati-churma.jpg']),
      verifiedStatus: 'VERIFIED',
      viewsCount: 3100,
      ingredientSlugs: [],
      festivalSlugs: ['diwali'],
    },
    {
      slug: 'chhena-poda',
      name: 'Chhena Poda (Burnt Cottage Cheese Cake)',
      localNames: JSON.stringify([
        { lang: 'or', name: 'ଛେନାପୋଡ଼' },
        { lang: 'hi', name: 'छेना पोडा' },
      ]),
      stateCode: 'OD',
      regionName: 'Nayagarh, Odisha',
      cuisineType: 'Odia',
      foodCategory: 'Dessert',
      description: 'India\'s native caramelized cheesecake made by slow-baking freshly kneaded chhena, sugar, cardamom, and cashews wrapped in Sal tree leaves over hot wood embers for hours.',
      culturalSignificance: 'Originated in the Dashapalla kingdom of Nayagarh in the early 20th century by confectioner Sudarshana Sahoo, celebrated as an indigenous miracle of confectionery alchemy.',
      historicalBackground: 'Legend holds that Sahoo left leftover sweetened chhena on a dying wood charcoal hearth overnight, discovering next morning a heavenly golden caramelized crust with molten interior.',
      traditionalPreparation: 'Fresh cow milk chhena is kneaded by hand with sugar, suji, crushed green cardamom, and ghee. Wrapped in wild Sal leaves and baked in charcoal ovens until crust turns deep amber.',
      seasonalAvailability: 'All Season',
      isGiTagged: false,
      giTagDetails: 'GI application pending from Nayagarh district.',
      imageUrl: '/images/dishes/chhena-poda.jpg',
      gallery: JSON.stringify(['/images/dishes/chhena-poda.jpg']),
      verifiedStatus: 'VERIFIED',
      viewsCount: 2310,
      ingredientSlugs: ['chhena'],
      festivalSlugs: ['durga-puja'],
    },
    {
      slug: 'avial',
      name: 'Avial',
      localNames: JSON.stringify([
        { lang: 'ml', name: 'അവിയൽ' },
        { lang: 'ta', name: 'அவியல்' },
        { lang: 'hi', name: 'अवियल' },
      ]),
      stateCode: 'KL',
      regionName: 'Travancore & Malabar',
      cuisineType: 'Kerala',
      foodCategory: 'Main',
      description: 'A harmonious medley of indigenous regional vegetables gently simmered and bound with coarse coconut-cumin-green chilli paste, whisked sour curd, and finished with raw virgin coconut oil and fresh curry leaves.',
      culturalSignificance: 'The undisputed centerpiece of the 26-dish Onam Sadya. Mythologically attributed to Bhima in the Virata court when tasked with concocting a dish out of assorted leftover royal vegetables.',
      historicalBackground: 'A masterpiece of Ayurvedic tridoshic balance, ensuring optimal digestive fire and nutrient density across root and gourd vegetables.',
      traditionalPreparation: 'Vegetables are cut into uniform batons, cooked in minimal water with turmeric. Coarsely crushed coconut-cumin paste is stirred in, taken off heat, and folded with sour curd and raw coconut oil.',
      seasonalAvailability: 'All Season / Harvest (Aug-Sep)',
      isGiTagged: false,
      imageUrl: '/images/dishes/avial.jpg',
      gallery: JSON.stringify(['/images/dishes/avial.jpg']),
      verifiedStatus: 'VERIFIED',
      viewsCount: 2150,
      ingredientSlugs: ['curry-leaves'],
      festivalSlugs: ['onam'],
    },
    {
      slug: 'pakhala-bhata',
      name: 'Pakhala Bhata',
      localNames: JSON.stringify([
        { lang: 'or', name: 'ପଖାଳ ଭାତ' },
        { lang: 'hi', name: 'पखाल भात' },
        { lang: 'bn', name: 'পান্তা ভাত' },
      ]),
      stateCode: 'OD',
      regionName: 'Coastal & Central Odisha',
      cuisineType: 'Odia',
      foodCategory: 'Staple',
      description: 'Cooked indigenous rice soaked overnight in water to allow probiotic natural fermentation, lightly seasoned with roasted cumin, curd, crushed ginger, and tempered with mustard seeds and curry leaves.',
      culturalSignificance: 'Sacred offering to Lord Jagannath in Puri during summer (known as Dahi Pakhala). Every year on March 20, millions celebrate World Pakhala Day to honor this gut-healing summer heritage.',
      historicalBackground: 'Referenced in 10th-century Sanskrit texts and Sarala Das\'s Odia Mahabharata. It was an essential nutritional marvel that sustained coastal farmers through scorching Indian summers.',
      traditionalPreparation: 'Boiled rice is submerged in cold water in an earthen pot and allowed to ferment for 12-18 hours. Served cold accompanied by Badi Chura, Sajana Saga (moringa leaves), and fried fish or roasted potatoes.',
      seasonalAvailability: 'Summer & Monsoon',
      isGiTagged: false,
      imageUrl: '/images/dishes/pakhala-bhata.jpg',
      gallery: JSON.stringify([
        '/images/dishes/pakhala-bhata.jpg',
        '/images/ingredients/gobindobhog.jpg'
      ]),
      verifiedStatus: 'VERIFIED',
      viewsCount: 1890,
      ingredientSlugs: ['mustard-oil', 'curry-leaves'],
      festivalSlugs: [],
    },
    {
      slug: 'patishapta',
      name: 'Patishapta',
      localNames: JSON.stringify([
        { lang: 'bn', name: 'পাটিসাপটা' },
        { lang: 'hi', name: 'पाटीशाप्टा' },
      ]),
      stateCode: 'WB',
      regionName: 'Rural Bengal & Rarh',
      cuisineType: 'Bengali',
      foodCategory: 'Festival Food',
      description: 'Delicate paper-thin crepes rolled from rice flour, semolina, and milk, enveloping a luscious core of grated coconut or artisanal kheer sweetened with winter Nolen Gur.',
      culturalSignificance: 'The undisputed culinary jewel of Poush Sankranti harvest festival. Passed down through maternal lineages, preparing patishapta represents domestic prosperity and communion with ancestral harvest rituals.',
      historicalBackground: 'Described in medieval Mangalkavya literature dating back over 500 years as "Patishaptika". Originally prepared on iron tawas greased using eggplant stems dipped in pure ghee.',
      traditionalPreparation: 'A batter of wet-ground Gobindobhog rice flour and maida is poured onto a seasoned clay or iron pan, cooked gently on low heat, stuffed with freshly prepared coconut-jaggery stuffing, and rolled into elegant scrolls.',
      seasonalAvailability: 'Harvest (Winter: Dec – Feb)',
      isGiTagged: false,
      imageUrl: '/images/dishes/patishapta.jpg',
      gallery: JSON.stringify([
        '/images/dishes/patishapta.jpg',
        '/images/ingredients/nolen-gur.jpg',
        '/images/ingredients/gobindobhog.jpg'
      ]),
      verifiedStatus: 'VERIFIED',
      viewsCount: 1420,
      ingredientSlugs: ['gobindobhog-rice', 'nolen-gur'],
      festivalSlugs: ['poush-sankranti'],
    },
    {
      slug: 'ven-pongal',
      name: 'Ven Pongal (Ghee Pongal)',
      localNames: JSON.stringify([
        { lang: 'ta', name: 'வெண் பொங்கல்' },
        { lang: 'hi', name: 'वेन पोंगल' },
      ]),
      stateCode: 'TN',
      regionName: 'Thanjavur & Tamil Country',
      cuisineType: 'Tamil Nadu',
      foodCategory: 'Festival Food',
      description: 'Steaming savory porridge of newly harvested rice and yellow split moong dal cooked to buttery softness, lavishly tempered with whole black peppercorns, cumin, crushed ginger, curry leaves, and fried cashews in pure cow ghee.',
      culturalSignificance: 'The core morning prasadam offered in Tamil Vaishnavite temples and during the Thai Pongal harvest dawn, signifying purity and warmth.',
      historicalBackground: 'Mentioned in ancient Tamil Chola inscriptions from the 10th century as "Ponkam" given as royal endowments for perpetual temple lamps and pilgrim nourishment.',
      traditionalPreparation: 'Equal parts of rice and moong dal are pressure cooked until velvety. Sizzling ghee infused with whole black pepper, cumin seeds, fresh ginger, and curry leaves is poured over the pot with fried cashews.',
      seasonalAvailability: 'All Season / Peak in Harvest (Jan)',
      isGiTagged: false,
      imageUrl: '/images/dishes/ven-pongal.jpg',
      gallery: JSON.stringify(['/images/dishes/ven-pongal.jpg']),
      verifiedStatus: 'VERIFIED',
      viewsCount: 1650,
      ingredientSlugs: ['curry-leaves'],
      festivalSlugs: ['pongal'],
    },
    {
      slug: 'solkadhi',
      name: 'Solkadhi',
      localNames: JSON.stringify([
        { lang: 'mr', name: 'सोलकढी' },
        { lang: 'kok', name: 'सोलकडी' },
        { lang: 'hi', name: 'सोलकढ़ी' },
      ]),
      stateCode: 'MH',
      regionName: 'Konkan Coast & Sindhudurg',
      cuisineType: 'Maharashtrian / Konkani',
      foodCategory: 'Beverage',
      description: 'A cooling, pastel-pink elixir made from freshly extracted thick coconut milk and tangy dried kokum (Garcinia indica) infusion, spiced with garlic, green chilli, cumin, and rock salt.',
      culturalSignificance: 'Indispensable post-meal digestive drink in every coastal Konkani, Malvani, and Goan household, neutralizing fiery fish curries.',
      historicalBackground: 'Deeply rooted in Konkan folklore where kokum\'s anti-acidic properties have safeguarded coastal gut health across generations.',
      traditionalPreparation: 'Dried kokum rinds are soaked in warm water to yield a deep crimson extract. Gently whisked into fresh coconut milk with a paste of garlic and green chillies.',
      seasonalAvailability: 'All Season / Peak in Summer',
      isGiTagged: false,
      imageUrl: '/images/dishes/solkadhi.jpg',
      gallery: JSON.stringify(['/images/dishes/solkadhi.jpg']),
      verifiedStatus: 'VERIFIED',
      viewsCount: 1720,
      ingredientSlugs: ['kokum'],
      festivalSlugs: [],
    },
    {
      slug: 'litti-chokha',
      name: 'Litti Chokha',
      localNames: JSON.stringify([
        { lang: 'bho', name: 'लिट्टी चोखा' },
        { lang: 'hi', name: 'लिट्टी चोखा' },
      ]),
      stateCode: 'BR',
      regionName: 'Bhojpur & Magadh',
      cuisineType: 'Bihari',
      foodCategory: 'Main',
      description: 'Whole wheat flour dough balls filled with spiced roasted gram flour (sattu), kalonji, ajwain, and mustard oil, roasted on cow-dung cake fires (upla) and immersed in ghee; served with fire-roasted brinjal and tomato mash (chokha).',
      culturalSignificance: 'The quintessential cultural symbol of Bihar and eastern Uttar Pradesh, epitomizing rustic nutrition, sustainability, and communal woodsmoke gatherings.',
      historicalBackground: 'Served as wartime ration for Rani Laxmibai and Veer Kunwar Singh\'s rebel armies in the 1857 war of independence due to its long shelf life without spoiling.',
      traditionalPreparation: 'Sattu is mixed with chopped garlic, green chilli, pickle masala, and cold-pressed mustard oil. Packed into wheat cups, spherical littis are slowly baked on glowing dung embers, dusted clean, cracked open, and submerged in pure ghee.',
      seasonalAvailability: 'All Season / Winter favorite',
      isGiTagged: false,
      imageUrl: '/images/dishes/litti-chokha.jpg',
      gallery: JSON.stringify(['/images/dishes/litti-chokha.jpg']),
      verifiedStatus: 'VERIFIED',
      viewsCount: 2600,
      ingredientSlugs: ['mustard-oil'],
      festivalSlugs: ['chhath-puja'],
    },
    {
      slug: 'thekua',
      name: 'Thekua (Khajuria)',
      localNames: JSON.stringify([
        { lang: 'bho', name: 'ठेकुआ' },
        { lang: 'hi', name: 'ठेकुआ' },
      ]),
      stateCode: 'BR',
      regionName: 'Mithila & Magadh',
      cuisineType: 'Bihari',
      foodCategory: 'Festival Food',
      description: 'Crunchy, sun-patterned cookies made from coarse stone-ground whole wheat flour, date jaggery or sugar, ghee, dried coconut slices, and fennel seeds, pressed on wooden dies and deep-fried in pure ghee.',
      culturalSignificance: 'The premier sacred Mahaprasad of Chhath Puja, offered directly to the setting and rising Sun God.',
      historicalBackground: 'An ancient Vedic sun-food formulation maintaining nutritional stability for weeks, symbolizing purity, discipline, and earthiness.',
      traditionalPreparation: 'Dough is kneaded stiff with warm jaggery syrup and ghee, formed into patties, imprinted on carved wooden molds (saancha), and deep-fried over slow wood fires in pure ghee until golden-brown.',
      seasonalAvailability: 'Autumn (Chhath Puja: Oct-Nov)',
      isGiTagged: false,
      imageUrl: '/images/dishes/thekua.jpg',
      gallery: JSON.stringify(['/images/dishes/thekua.jpg']),
      verifiedStatus: 'VERIFIED',
      viewsCount: 2200,
      ingredientSlugs: [],
      festivalSlugs: ['chhath-puja'],
    },
  ];

  for (const d of dishesData) {
    const state = stateMap.get(d.stateCode);
    if (!state) continue;

    const dish = await prisma.dish.create({
      data: {
        slug: d.slug,
        name: d.name,
        localNames: d.localNames,
        stateId: state.id,
        regionName: d.regionName,
        cuisineType: d.cuisineType,
        foodCategory: d.foodCategory,
        description: d.description,
        culturalSignificance: d.culturalSignificance,
        historicalBackground: d.historicalBackground,
        traditionalPreparation: d.traditionalPreparation,
        seasonalAvailability: d.seasonalAvailability,
        isGiTagged: d.isGiTagged,
        giTagDetails: d.giTagDetails,
        imageUrl: d.imageUrl,
        gallery: d.gallery,
        verifiedStatus: d.verifiedStatus,
        viewsCount: d.viewsCount,
      },
    });

    for (const ingSlug of d.ingredientSlugs) {
      const ing = ingredientMap.get(ingSlug);
      if (ing) {
        await prisma.dishIngredient.create({
          data: { dishId: dish.id, ingredientId: ing.id, isKey: true },
        });
      }
    }

    for (const festSlug of d.festivalSlugs) {
      const fest = festivalMap.get(festSlug);
      if (fest) {
        await prisma.festivalDish.create({
          data: {
            festivalId: fest.id,
            dishId: dish.id,
            ritualRole: 'Festive Centerpiece & Sacred Offering',
          },
        });
      }
    }
  }

  // Stories with Real Photos
  const patishaptaDish = await prisma.dish.findUnique({ where: { slug: 'patishapta' } });
  const avialDish = await prisma.dish.findUnique({ where: { slug: 'avial' } });
  const pakhalaDish = await prisma.dish.findUnique({ where: { slug: 'pakhala-bhata' } });

  const storiesData = [
    {
      title: 'The Winter Dawn Date-Palm Pot & Grandmother’s Iron Tawa',
      storytellerName: 'Protima Devi (Thakurma)',
      generation: 'Grandmother',
      community: 'Baidya Family of Bolpur',
      location: 'Shantiniketan, West Bengal',
      content: 'Every year when the first fog of Poush rolled over the red soil of Birbhum, our courtyard would wake up at 4 AM. The Shiuli tree-climber would bring the earthen clay pots brimming with fresh date palm nectar. My mother-in-law would sit before the wood hearth with a piece of fresh brinjal stalk dipped in cow ghee to grease the black iron pan. The sweet aroma of Gobindobhog rice batter and bubbling Nolen Gur is a memory no modern sweet shop can ever replicate.',
      audioUrl: '/audio/stories/bengal_patishapta_oral_history.mp3',
      audioDuration: 145,
      transcript: 'When the cold mist settles over the Ajoy river, we would harvest the Aman dhan. Ma would soak the rice in copper urns. When we folded the patishapta into white rolls, she taught us: a daughter-in-law’s roll must be as tender as dawn mist, never broken, never burnt.',
      mediaUrl: '/images/dishes/patishapta.jpg',
      dishId: patishaptaDish?.id,
      userId: contributorUser.id,
      status: 'APPROVED',
    },
    {
      title: 'The 26-Dish Banana Leaf Math of Thrissur Sadya',
      storytellerName: 'Kunjikrishna Marar (Muthassan)',
      generation: 'Grandfather',
      community: 'Marar Temple Tradition',
      location: 'Thrissur, Kerala',
      content: 'In our temple kitchen, the preparation for Onam Sadya begins three days prior. Avial is never just a mixed vegetable curry—it is an architectural geometry. The yam goes to the bottom corner, the raw plantain balances the tamarind sharpness, and the fresh coconut oil added when the fire is doused seals the soul of the dish. My grandfather taught me that feeding thousand pilgrims on a banana leaf without a single drop spilling is the highest worship.',
      audioUrl: '/audio/stories/kerala_sadya_oral_history.mp3',
      audioDuration: 180,
      transcript: 'On Thiruvonam day, King Mahabali visits every household. We arrange the salt at the left corner, the sweet payasam at the right. The first spoon of Avial with unpolished red Matta rice represents complete communion between farmer and nature.',
      mediaUrl: '/images/dishes/avial.jpg',
      dishId: avialDish?.id,
      userId: contributorUser.id,
      status: 'APPROVED',
    },
    {
      title: 'The Summer Earthen Handi of Mahanadi',
      storytellerName: 'Subarna Mohanty (Aai)',
      generation: 'Grandmother',
      community: 'Coastal Mahanadi Farming Family',
      location: 'Cuttack, Odisha',
      content: 'When the blazing summer heat of Baisakha arrived, no one in our village could bear heavy spices. In the cool shaded veranda, our grandmother would take out the red terracotta handi where cooked rice had fermented overnight in pond water. She crushed roasted Badi between her palms, seasoned with roasted cumin and green chillies. It was not food—it was nectar that gave the ploughmen stamina to work under forty-degree sun without fatigue.',
      audioUrl: '/audio/stories/odisha_pakhala_oral_history.mp3',
      audioDuration: 130,
      transcript: 'Pakhala is Lord Jagannath’s summer elixir. The Torani water is rich with natural cooling energy. When you drink that fermented water, all the summer fatigue simply vanishes from your limbs.',
      mediaUrl: '/images/dishes/pakhala-bhata.jpg',
      dishId: pakhalaDish?.id,
      userId: demoUser.id,
      status: 'APPROVED',
    },
  ];

  for (const s of storiesData) {
    await prisma.story.create({ data: s });
  }

  // Food Trails with Real Photos
  await prisma.foodTrail.create({
    data: {
      title: 'North Kolkata Heritage Sweet & Street Trail',
      slug: 'north-kolkata-heritage-sweet-trail',
      cityState: 'Kolkata, West Bengal',
      description: 'Journey through centuries-old alleys of Shobhabazar and College Street exploring 150-year-old confectionery dynasties, century-old kachori cabins, and authentic Poush Sankranti pithe artisans.',
      estimatedDuration: '4 to 5 Hours (Morning or Winter Evening)',
      bestTime: 'October to February (7:00 AM – 12:00 PM)',
      imageUrl: '/images/trails/kolkata-trail.jpg',
      userId: adminUser.id,
      isPublished: true,
      stops: {
        create: [
          {
            orderIndex: 1,
            placeName: 'Bhim Chandra Nag Confectioners (Est. 1826)',
            specialtyDishName: 'Ledikeni & Sandesh',
            historicalNote: 'Crafted the legendary Ledikeni sweet in 1858 in honour of Lady Canning, wife of India\'s first Viceroy.',
            latitude: 22.5768,
            longitude: 88.3615,
            imageUrl: '/images/dishes/patishapta.jpg',
          },
          {
            orderIndex: 2,
            placeName: 'Girish Chandra Dey & Nakur Chandra Nandy (Est. 1844)',
            specialtyDishName: 'Nolen Gur Jalbhora Sandesh',
            historicalNote: 'Pioneered the famous Jalbhora Sandesh with a molten reservoir of liquid date-palm jaggery trapped inside.',
            latitude: 22.5892,
            longitude: 88.3712,
            imageUrl: '/images/ingredients/nolen-gur.jpg',
          },
        ],
      },
    },
  });

  // AI Knowledge docs
  const aiDocs = [
    {
      title: 'Philosophy of Poush Sankranti and Winter Confectionery in Bengal',
      topic: 'Festival & Culture',
      state: 'West Bengal',
      content: `Poush Sankranti marks the auspicious transition of the Sun into Makara Rashi and coincides with the agrarian Nabanna harvest festival in Bengal. The culinary ethos relies on three sacred ingredients: newly harvested Aman rice (specifically Gobindobhog and Tulaipanji), fresh winter date palm sap (Nolen Gur tapped by the Shiuli artisans), and freshly grated coconut. Traditional preparations like Patishapta, Puli Pithe, and Dudh Puli are ritual expressions of thanksgiving. The technique of making Patishapta involves a delicate batter cooked on an iron pan greased with an eggplant stem, rolled with coconut-kheer stuffing.`,
      source: 'Banglar Khabar by Pranab Ray; National Food Heritage Archive.',
      tags: JSON.stringify(['Poush Sankranti', 'Patishapta', 'Nolen Gur', 'Gobindobhog', 'Bengal', 'Harvest']),
    },
    {
      title: 'The Science and Ritual of Odia Pakhala Bhata',
      topic: 'Staple & Fermentation',
      state: 'Odisha',
      content: `Pakhala Bhata is a traditional Odia fermented rice dish prepared by cooling cooked rice in water inside unglazed earthen pots and allowing short-term lactic acid bacterial fermentation. The fermentation breaks down phytic acid, multiplying bioavailable iron and beneficial probiotic gut bacteria. It is offered to Lord Jagannath as Dahi Pakhala in the Puri temple to cool the deity during summer months. World Pakhala Day is observed globally on March 20th to celebrate this sustainable, zero-waste, heat-combating culinary masterpiece.`,
      source: 'Lord Jagannath Temple Chhattisha Nijoga Culinary Records; Odisha State Cultural Directorate.',
      tags: JSON.stringify(['Pakhala Bhata', 'Odisha', 'Fermentation', 'Jagannath Temple', 'Probiotic', 'Summer']),
    },
  ];

  for (const doc of aiDocs) {
    await prisma.aIKnowledgeDocument.create({ data: doc });
  }

  console.log('✅ Refreshed database with 100% REAL photography image paths!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
