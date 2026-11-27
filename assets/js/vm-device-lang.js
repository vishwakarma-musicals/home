/* === VM LOOP-SAFE DEVICE LANGUAGE ENGINE, CACHE & FORM GUARD === */
(function () {
  if (window.__vmDeviceLangSafeLoaded) return;
  window.__vmDeviceLangSafeLoaded = true;

  var instrumentEnglishMap = {
    "हारमोनियम": "Harmonium",
    "सफ़री हारमोनियम": "Safri Harmonium",
    "ढोलक": "Dholak",
    "आम की लकड़ी की ढोलक": "Mango Wood Dholak",
    "शीशम की ढोलक": "Sheesham Nut-Bolt Dholak",
    "तबला": "Tabla",
    "बांसुरी": "Bansuri",
    "झीका": "Jheeka",
    "झांझ": "Jhanjh",
    "मंजीरा": "Manjeera",
    "पारंपरिक लकड़ी का डमरू": "Traditional Wooden Damru",
    "धोंकनी": "Dhonkni",
    "विश्वकर्मा म्यूज़िकल्स": "Vishwakarma Musicals",
    "तुलसी दास विश्वकर्मा": "Tulsidas Vishwakarma"
  };

  var uiEnglishMap = {
    "होम": "Home",
    "वाद्य यंत्र": "Instruments",
    "कैटलॉग": "Catalog",
    "कार्ट": "Cart",
    "चेकआउट": "Checkout",
    "वर्कशॉप व मरम्मत": "Workshop & Repair",
    "डाउनलोड": "Downloads",
    "हमारे बारे में": "About Us",
    "संपर्क व दुकान": "Contact & Shop",
    "🛒 कार्ट": "🛒 Cart",
    "अभी कॉल करें": "Call Now",
    "सीधे कॉल करें": "Call Directly",
    "वाद्य संग्रह": "Instrument Range",
    "कार्ट देखें →": "View Cart →",
    "❖ स्था. 1990 ❖": "❖ Est. 1990 ❖",
    "❖ मकान नं. 109, शाला मोहल्ला, अमानगंज ❖": "❖ House No. 109, Shala Mohalla, Amanganj ❖",
    "वर्कशॉप, ट्यूनिंग व मरम्मत सेवाएं": "Workshop, Tuning & Repair Services",
    "सभी मरम्मत व ट्यूनिंग कार्य अमानगंज कार्यशाला में स्वयं शिल्पकार तुलसी दास विश्वकर्मा द्वारा किए जाते हैं।": "All repair and tuning work is done at the Amanganj workshop by craftsman Tulsidas Vishwakarma.",
    "चुने गए वाद्य यंत्र": "Selected Instruments",
    "ऑर्डर पुष्टि व शिपिंग गणना के लिए आगे बढ़ने से पहले आइटम और मात्रा जांचें।": "Review items and quantities before proceeding to order confirmation and shipping calculation.",
    "प्रतिदिन सुबह 9:00 बजे से रात 9:00 बजे तक": "Daily 9:00 AM to 9:00 PM",
"प्रमुख वाद्य यंत्र संग्रह": "Featured Instruments",
    "वाद्य चयन और रखरखाव मार्गदर्शक": "Instrument Selection & Care Guide",
    "मरम्मत, ट्यूनिंग और रखरखाव": "Repair, Tuning & Maintenance",
    "विश्वकर्मा म्यूज़िकल्स से जुड़ें": "Connect with Vishwakarma Musicals",
    "हारमोनियम व सफ़री हारमोनियम": "Harmonium & Safri Harmonium",
    "ढोलक, तबला व पुड़ों की देखभाल": "Dholak, Tabla & Pudda Care",
    "बांसुरी, झीका व लकड़ी का डमरू": "Bansuri, Jheeka & Wooden Damru",
    "सफ़री हारमोनियम": "Safri Harmonium",
    "आम की लकड़ी की ढोलक": "Mango Wood Dholak",
    "शीशम की ढोलक": "Sheesham Nut-Bolt Dholak",
    "पारंपरिक लकड़ी का डमरू": "Traditional Wooden Damru",
    "धोंकनी": "Dhonkni",
    "झीका": "Jheeka",
    "सभी वाद्य यंत्र देखें →": "View All Instruments →",
"वाद्य चयन और रखरखाव मार्गदर्शन": "Instrument Selection & Care Guide",
    "कार्ट में जोड़ें": "Add to Cart",
    "विवरण देखें": "View Details",
    "प्रमुख वाद्य यंत्र": "Featured Instruments",
    "संपर्क व दुकान का पता": "Contact & Shop Address",
    "अमानगंज, जिला पन्ना, मध्य प्रदेश": "Amanganj, District Panna, Madhya Pradesh",
    "शीशम": "Sheesham",
"मकान नं. 109, हरदौल मंदिर के बगल में, शाला मोहल्ला, अमानगंज, जिला पन्ना (म.प्र.) - 488441": "House No. 109, Next to Hardaul Temple, Shala Mohalla, Amanganj, Dist. Panna (M.P.) - 488441",
    "📞 विशेषज्ञ से सीधे संपर्क करें (": "📞 Contact Specialist Directly (",
    "🎵 वाद्य संग्रह देखें →": "🎵 Explore Instruments →",
    "1990 से निरंतर कार्यशाला": "Continuous Workshop Since 1990",
    "440Hz मानक स्वर ट्यूनिंग": "440Hz Standard Pitch Tuning",
    "पूरे भारत में सुरक्षित पार्सल शिपिंग": "Safe Parcel Shipping Across India",
    "हमारी विरासत जानें →": "Discover Our Heritage →",
    "शीशम, सागौन, आम व चीड़ की सूखी लकड़ी और प्राकृतिक पुड़ों से तैयार वाद्य यंत्रों का लाइव संग्रह।": "Live collection of instruments crafted from seasoned Sheesham, Teak, Mango, and Pine wood with natural puddas.",
    "लाइव वाद्य सूची लोड हो रही है...": "Loading live instrument list...",
    "Google Sheet से ताज़ा वाद्य विवरण व मूल्य प्राप्त किए जा रहे हैं।": "Fetching fresh instrument details and prices from Google Sheet.",
    "बेस-मेल कॉन्सर्ट हारमोनियम (Bass-Male Concert Harmonium)": "Bass-Male Concert Harmonium",
    "चीड़, देवदार या सागौन की सूखी लकड़ी से निर्मित, 39 चाबियां, सुगम टच और निरंतर वायु प्रवाह वाला कॉन्सर्ट हारमोनियम।": "Concert harmonium crafted from seasoned Pine, Deodar, or Teak wood with 39 keys, smooth touch, and steady airflow.",
    "39 चाबियां (3¼ सप्तक)": "39 Keys (3¼ Octave)",
    "2-लाइन प्रीमियम ब्रास रीड्स (Bass/Male)": "2-Line Premium Brass Reeds (Bass/Male)",
    "डबल फोल्ड एयरटाइट धोंकनी": "Double-Fold Airtight Dhonkni",
    "कार्ट में जोड़ें": "Add to Cart",
    "सफ़री पोर्टेबल मिनी हारमोनियम (Safri Portable Harmonium)": "Safri Portable Harmonium",
    "यात्रा करने वाले साधकों, कथावाचकों व प्रभात फेरी के लिए हल्का और सुगम कॉम्पैक्ट मॉडल।": "Lightweight and convenient compact model for travelling sadhaks, kathavachaks, and prabhat pheri.",
    "वज़न: लगभग 6.5 किग्रा": "Weight: Approx. 6.5 kg",
    "2-लाइन ब्रास रीड्स": "2-Line Brass Reeds",
    "मजबूत ब्रास कॉर्नर व लॉक फिटिंग्स": "Sturdy Brass Corners & Lock Fittings",
    "सूटकेस फोल्डिंग हारमोनियम (Suitcase Folding Harmonium)": "Suitcase Folding Harmonium",
    "यात्रा के समय पूरा हारमोनियम लकड़ी के बक्से में सुरक्षित बैठ जाता है। स्टेज कलाकारों की पहली पसंद।": "During travel, the entire harmonium folds safely inside a wooden case. Top choice for stage artists.",
    "इंटीग्रेटेड सूटकेस फोल्डिंग सिस्टम": "Integrated Suitcase Folding System",
    "7-फोल्ड धोंकनी विथ ऑटो स्प्रिंग टेंशन": "7-Fold Dhonkni with Auto Spring Tension",
    "धूल-रोधी व शॉक-प्रूफ कवरिंग": "Dust-Resistant & Shock-Proof Covering",
    "पारंपरिक पैरदान हारमोनियम (Foot-Pedal Harmonium)": "Foot-Pedal Harmonium",
    "पैर के पैडल से धोंकनी पंपिंग जिससे दोनों हाथ कीबोर्ड पर स्वतंत्र रहते हैं। अखंड संकीर्तन विशेष।": "Foot-pedal Dhonkni pumping leaving both hands free on the keyboard. Special for Akhand Sankirtan.",
    "फुट पैडल मैकेनिकल लिंकेज": "Foot-Pedal Mechanical Linkage",
    "बड़ा एयर रिज़र्वायर - सतत नाद": "Large Air Reservoir - Sustained Resonance",
    "सागौन/चीड़ का भारी व टिकाऊ फ्रेम": "Heavy & Durable Teak/Pine Frame",
    "स्केल-चेंजर कॉन्सर्ट हारमोनियम (Scale Changer Harmonium)": "Scale Changer Harmonium",
    "सुगम पैमानों में सरकने वाला मास्टरपीस स्लाइडर, 3-लाइन प्रीमियम रीड्स और ऑर्गन कपलर से युक्त कॉन्सर्ट मॉडल।": "Concert model featuring a smooth multi-scale slider, 3-line premium reeds, and organ coupler.",
    "स्मूथ मल्टी-स्केल स्लाइडर": "Smooth Multi-Scale Slider",
    "3-लाइन रीड्स (Bass + Male + Female)": "3-Line Reeds (Bass + Male + Female)",
    "राइट-हैंड ऑटोमैटिक ऑर्गन कपलर": "Right-Hand Automatic Organ Coupler",
    "नट-बोल्ट पक्की शीशम ढोलक (Nut-Bolt Sheesham Dholak)": "Nut-Bolt Sheesham Dholak",
"बेस-मेल कॉन्सर्ट हारमोनियम": "Bass-Male Concert Harmonium",
    "चीड़, देवदार या सागौन की सूखी लकड़ी से निर्मित, 39 चाबियां, सुगम टच और निरंतर वायु प्रवाह वाला कॉन्सर्ट हारमोनियम।": "Concert harmonium crafted from seasoned Pine, Deodar, or Teak wood with 39 keys, smooth touch, and steady airflow.",
    "39 चाबियां (3¼ सप्तक)": "39 Keys (3¼ Octave)",
    "2-लाइन प्रीमियम ब्रास रीड्स (Bass/Male)": "2-Line Premium Brass Reeds (Bass/Male)",
    "डबल फोल्ड एयरटाइट धोंकनी": "Double-Fold Airtight Dhonkni",
    "सफ़री पोर्टेबल मिनी हारमोनियम": "Safri Portable Harmonium",
    "यात्रा करने वाले साधकों, कथावाचकों व प्रभात फेरी के लिए हल्का और सुगम कॉम्पैक्ट मॉडल।": "Lightweight and convenient compact model for travelling sadhaks, kathavachaks, and prabhat pheri.",
    "वज़न: लगभग 6.5 किग्रा": "Weight: Approx. 6.5 kg",
    "2-लाइन ब्रास रीड्स": "2-Line Brass Reeds",
    "मजबूत ब्रास कॉर्नर व लॉक फिटिंग्स": "Sturdy Brass Corners & Lock Fittings",
    "सूटकेस फोल्डिंग हारमोनियम": "Suitcase Folding Harmonium",
    "यात्रा के समय पूरा हारमोनियम लकड़ी के बक्से में सुरक्षित बैठ जाता है। स्टेज कलाकारों की पहली पसंद।": "During travel, the entire harmonium folds safely inside a wooden case. Top choice for stage artists.",
    "इंटीग्रेटेड सूटकेस फोल्डिंग सिस्टम": "Integrated Suitcase Folding System",
    "7-फोल्ड धोंकनी विथ ऑटो स्प्रिंग टेंशन": "7-Fold Dhonkni with Auto Spring Tension",
    "धूल-रोधी व शॉक-प्रूफ कवरिंग": "Dust-Resistant & Shock-Proof Covering",
    "पारंपरिक पैरदान हारमोनियम": "Foot-Pedal Harmonium",
    "पैर के पैडल से धोंकनी पंपिंग जिससे दोनों हाथ कीबोर्ड पर स्वतंत्र रहते हैं। अखंड संकीर्तन विशेष।": "Foot-pedal Dhonkni pumping leaving both hands free on the keyboard. Special for Akhand Sankirtan.",
    "फुट पैडल मैकेनिकल लिंकेज": "Foot-Pedal Mechanical Linkage",
    "बड़ा एयर रिज़र्वायर - सतत नाद": "Large Air Reservoir - Sustained Resonance",
    "सागौन/चीड़ का भारी व टिकाऊ फ्रेम": "Heavy & Durable Teak/Pine Frame",
    "स्केल-चेंजर कॉन्सर्ट हारमोनियम": "Scale Changer Harmonium",
    "सुगम पैमानों में सरकने वाला मास्टरपीस स्लाइडर, 3-लाइन प्रीमियम रीड्स और ऑर्गन कपलर से युक्त कॉन्सर्ट मॉडल।": "Concert model featuring a smooth multi-scale slider, 3-line premium reeds, and organ coupler.",
    "स्मूथ मल्टी-स्केल स्लाइडर": "Smooth Multi-Scale Slider",
    "3-लाइन रीड्स (Bass + Male + Female)": "3-Line Reeds (Bass + Male + Female)",
    "राइट-हैंड ऑटोमैटिक ऑर्गन कपलर": "Right-Hand Automatic Organ Coupler",
    "नट-बोल्ट पक्की शीशम ढोलक": "Nut-Bolt Sheesham Dholak",
    "100% पक्की लाल शीशम की ढोलक। पाना लगाकर कभी भी आसानी से मनचाहा सुर कसें।": "100% seasoned red Sheesham dholak. Tune to your desired pitch anytime with a spanner.",
    "पक्की लाल शीशम की मजबूत खोल": "Sturdy Seasoned Red Sheesham Shell",
    "हैवी स्टील नट-बोल्ट ट्यूनिंग": "Heavy Steel Nut-Bolt Tuning",
    "बकरे के चमड़े के जाँचे हुए पुड़े": "Checked Goat-Skin Puddas",
    "शुद्ध आम की लकड़ी की ढोलक": "Pure Mango Wood Dholak",
    "पारंपरिक सूती डोरी व पीतल के छल्लों से बंधी हुई लोक ढोलक। महिला संगीत व घरेलू आयोजनों हेतु अत्यंत हल्की।": "Folk dholak laced with traditional cotton rope and brass rings. Very light for Mahila Sangeet and home gatherings.",
    "प्राकृतिक रूप से सूखी आम की लकड़ी": "Naturally Seasoned Mango Wood",
    "डोरी व पीतल छल्ले ट्यूनिंग": "Rope & Brass Ring Tuning",
    "मीठा व खुला देहाती लोक स्वर": "Sweet & Open Folk Tone",
    "धमाका मसाला डीप बेस ढोलक": "Dhamaka Masala Deep Bass Dholak",
    "बेस साइड पर विशेष भारी मसाले की परत जिससे खुले मैदान व बड़े पंडालों में भी गूंजती हुई गहरी धमक मिलती है।": "Special heavy masala layer on the bass side for deep resonance even in open grounds and large pandals.",
    "विश्वकर्मा विशेष मसाला फॉर्मूला": "Vishwakarma Special Masala Formula",
    "अत्यधिक गहरा गूंजता हुआ धमक": "Deep Resonant Bass",
    "फाग, कीर्तन व पंडाल कार्यक्रम विशेष": "Special for Phag, Kirtan & Pandal Events",
    "भजन-कीर्तन, मंच, रियाज़ या सफ़र—अपनी ज़रूरत के अनुसार सही वाद्य चुनें और उसकी उम्र बढ़ाएं।": "Bhajan-kirtan, stage, riyaaz, or travel—choose the right instrument for your need and extend its life.",
    "धोंकनी की हवा के संतुलन, रीड रिस्पॉन्स और पोर्टेबल या कॉन्सर्ट ज़रूरत के आधार पर सही मॉडल चुनें।": "Select the right model based on Dhonkni airflow balance, reed response, and portable or concert needs.",
    "नमी व तेज धूप से बचाकर, सही तनाव और मसाले के संतुलन से पुड़ों की मधुर गूंज बनाए रखें।": "Protect from moisture and harsh sun, and maintain sweet pudda resonance with proper tension and masala balance.",
    "स्केल चयन, कांसा व लकड़ी की बनावट पर ध्यान देकर पारंपरिक संगत के लिए सही वाद्य पाएं।": "Find the right instrument for traditional accompaniment by focusing on scale selection, kansa, and wood grain.",
    "सभी प्रकार की मरम्मत व ट्यूनिंग सेवाएं मकान नं. 109, शाला मोहल्ला, अमानगंज स्थित कार्यशाला में उपलब्ध हैं।": "All types of repair and tuning services are available at the workshop at House No. 109, Shala Mohalla, Amanganj.",
    "हारमोनियम ट्यूनिंग व धोंकनी": "Harmonium Tuning & Dhonkni",
    "स्वर मिलान, रीड सफ़ाई/बदलाव, चाबी/बटन दुरुस्ती और एयरटाइट धोंकनी लीकेज की मरम्मत।": "Pitch matching, reed cleaning/replacement, key/button repair, and airtight Dhonkni leakage repair.",
    "कार्यशाला सेवा": "Workshop Service",
    "सेवा विवरण देखें": "View Service Details",
    "ढोलक व तबला पुड़ी कार्य": "Dholak & Tabla Pudda Work",
    "नए पुड़े चढ़ाना, रस्सी या नट-बोल्ट कसना, चाटी/मैदान संतुलन और तबले पर मसाला भराई।": "Fitting new puddas, tightening rope or nut-bolts, chati/maidan balancing, and masala filling on tabla.",
    "अन्य पारंपरिक वाद्य मरम्मत": "Other Traditional Instrument Repair",
    "लकड़ी के ढांचे, डोरी/सिंगल व पारंपरिक वाद्यों की संतुलित मरम्मत और नियमित जांच।": "Balanced repair and regular checkup of wooden frames, lacing, and traditional instruments.",
    "वाद्य खरीद, पार्सल शिपिंग या कार्यशाला में मरम्मत के समय की जानकारी के लिए सीधे संपर्क करें।": "Contact directly for information on instrument purchase, parcel shipping, or workshop repair turnaround time.",
    "कार्यशाला व दुकान पता": "Workshop & Shop Address",
    "फ़ोन व ईमेल": "Phone & Email",
    "संचालन समय": "Operating Hours",
    "✦ ग्राहक भरोसा व कार्यशाला प्रमाण ✦": "✦ Customer Trust & Workshop Credentials ✦",
    "विश्वकर्मा म्यूज़िकल्स - ग्राहक भरोसा, गुणवत्ता व कार्यशाला प्रमाण (Est. 1990)": "Vishwakarma Musicals - Customer Trust, Quality & Workshop Credentials (Est. 1990)",
    "प्रोप्राइटर: तुलसी दास विश्वकर्मा |": "Proprietor: Tulsidas Vishwakarma |",
    "35+ वर्षों का अनुभव": "35+ Years of Experience",
    "| अमानगंज, जिला पन्ना (म.प्र.) 488441 | सीधा कॉल:": "| Amanganj, District Panna (M.P.) 488441 | Direct Call:",
    "| ईमेल:": "| Email:",
    "1990 से हस्तनिर्मित परंपरा": "Handmade Tradition Since 1990",
    "चीड़, सागौन, शीशम व आम की लकड़ी, बकरे के चमड़े के जांचे हुए पुड़े और 440Hz सुर मिलान के साथ विश्वसनीय कारीगरी।": "Reliable craftsmanship with Pine, Teak, Sheesham, and Mango wood, checked goat-skin puddas, and 440Hz pitch tuning.",
    "सत्यापित GSTIN व MSME पंजीकरण": "Verified GSTIN & MSME Registration",
    "GSTIN: 23BSDPV5529B1ZV व Udyam MSME पंजीकृत प्रतिष्ठान; पारदर्शी Zoho बिलिंग व स्पष्ट कर विवरण।": "GSTIN: 23BSDPV5529B1ZV & Udyam MSME registered enterprise; transparent Zoho billing and clear tax details.",
    "सुरक्षित HDFC बैंक / UPI सत्यापन": "Secure HDFC Bank / UPI Verification",
    "हर ऑनलाइन ऑर्डर भुगतान सत्यापन (PAYMENT_REVIEW → VERIFIED) के बाद ही प्रसंस्करण व डिस्पैच के लिए आगे बढ़ता है।": "Every online order moves to processing and dispatch only after payment verification (PAYMENT_REVIEW → VERIFIED).",
    "Delhivery One कूरियर व 6 माह वारंटी": "Delhivery One Courier & 6-Month Warranty",
    "नए वाद्य यंत्रों की सुरक्षित देशव्यापी कूरियर शिपिंग तथा कार्यशाला में 6 माह सीमित कारीगरी व सुर वारंटी।": "Safe nationwide courier shipping for new instruments and 6-month limited craftsmanship & pitch warranty at the workshop.",
    "Google रेटिंग: 5.0 ★ (12+ सत्यापित ग्राहक समीक्षाएं)": "Google Rating: 5.0 ★ (12+ Verified Customer Reviews)",
    "लाइव कैटलॉग देखें (Live Catalog)": "View Live Catalog",
    "कैटलॉग व ब्रोशर डाउनलोड करें": "Download Catalog & Brochures",
    "गोपनीयता नीति": "Privacy Policy",
    "नियम व शर्तें": "Terms & Conditions",
    "अस्वीकरण": "Disclaimer",
    "© 2026 विश्वकर्मा म्यूज़िकल्स | फ़ोन:": "© 2026 Vishwakarma Musicals | Phone:",
    "📞 अभी कॉल करें": "📞 Call Now",
    "होम (Home)": "Home",
    "वाद्ययंत्र (Instruments)": "Instruments",
    "लाइव कैटलॉग (Live Catalog)": "Live Catalog",
    "कार्यशाला व मरम्मत (Workshop)": "Workshop & Repair",
    "डाउनलोड व ब्रोशर (Downloads)": "Downloads & Brochures",
    "हमारे बारे में (About)": "About Us",
    "संपर्क व पता (Contact)": "Contact & Address",
    "📞 कॉल:": "📞 Call:",
    "सागौन": "Teak",
    "आम की लकड़ी": "Mango Wood",
    "चीड़": "Pine"
  };

  var combinedEnMap = {};
  Object.keys(uiEnglishMap).forEach(function (k) { combinedEnMap[k] = uiEnglishMap[k]; });
  Object.keys(instrumentEnglishMap).forEach(function (k) { combinedEnMap[k] = instrumentEnglishMap[k]; });


  var combinedHiMap = {};
  Object.keys(combinedEnMap).forEach(function (hindi) {
    var english = combinedEnMap[hindi];
    if (english && !Object.prototype.hasOwnProperty.call(combinedHiMap, english)) combinedHiMap[english] = hindi;
  });
  var LANG_KEY = "vm_active_device_lang_v3";
  var MANUAL_LANG_KEY = "vm_manual_device_lang_v1";
  var CACHE_KEY = "vm_smart_translations_v3";
  var HELP_HI = "कृपया इसमें जो कुछ भी भरें, वह अंग्रेजी के अक्षरों में भरें। स्वतः भरा गया पाठ भी जमा करने से पहले अंग्रेजी (लैटिन) अक्षरों में बदला जाएगा; ईमेल, पासवर्ड और संख्या वाले फ़ील्ड अपने मूल प्रारूप में रहेंगे।";
  var HELP_EN = "Enter names, addresses, and written details using English (Latin) letters. Autofilled text is converted before submission; email, password, and numeric fields remain unchanged.";
  var HELP_TA = "பெயர், முகவரி மற்றும் உரை விவரங்களை ஆங்கில (லத்தீன்) எழுத்துகளில் உள்ளிடவும். தானாக நிரப்பப்பட்ட உரையும் சமர்ப்பிக்கும் முன் மாற்றப்படும்; மின்னஞ்சல், கடவுச்சொல் மற்றும் எண் புலங்கள் மாற்றப்படாது.";
  var RTL_LANGS = { ar: 1, fa: 1, he: 1, ur: 1, ps: 1, sd: 1 };
  var currentLang = "hi";
  var manualLang = "";
  var cache = readCache();
  var cacheWriteTimer = 0;
  var queue = [];
  var pending = Object.create(null);
  var activeRequests = 0;
  var maxConcurrent = 3;
  var textState = new WeakMap();
  var attrState = new WeakMap();
  var titleState = new WeakMap();
  var observer = null;
  var scanTimer = 0;
  var scanBusy = false;
  var ownMutations = false;
  var helpSource = HELP_HI;

  var protectedTerms = [
    ["पारंपरिक लकड़ी का डमरू", "Traditional Wooden Damru"],
    ["सफ़री हारमोनियम", "Safri Harmonium"],
    ["Safri Harmonium", "Safri Harmonium"],
    ["Safri", "Safri"],
    ["धोंकनी", "Dhonkni"],
    ["Dhonkni", "Dhonkni"],
    ["झीका", "Jheeka"],
    ["Jheeka", "Jheeka"]
  ];

  function normalizeLang(value) {
    var match = String(value || "").toLowerCase().trim().match(/^([a-z]{2,3})(?:[-_].*)?$/);
    return match ? match[1] : "";
  }

  function detectDeviceLanguage() {
    if (manualLang) return manualLang;
    try {
      var savedManual = normalizeLang(localStorage.getItem(MANUAL_LANG_KEY));
      if (savedManual) {
        manualLang = savedManual;
        return savedManual;
      }
    } catch (e) {}
    var list = Array.isArray(navigator.languages) ? navigator.languages : [];
    var detected = normalizeLang(list[0] || navigator.language || "");
    if (!detected) {
      try { detected = normalizeLang(localStorage.getItem(LANG_KEY)); } catch (e) {}
    }
    return detected || "hi";
  }

  function setDocumentLanguage(lang) {
    currentLang = normalizeLang(lang) || "hi";
    if (document.documentElement) {
      if (document.documentElement.lang !== currentLang) document.documentElement.lang = currentLang;
      var direction = RTL_LANGS[currentLang] ? "rtl" : "ltr";
      if (document.documentElement.dir !== direction) document.documentElement.dir = direction;
    }
    if (document.body && document.body.dataset.vmLang !== currentLang) {
      document.body.dataset.vmLang = currentLang;
    }
    try { if (localStorage.getItem(LANG_KEY) !== currentLang) localStorage.setItem(LANG_KEY, currentLang); } catch (e) {}
  }

  function readCache() {
    try {
      var raw = localStorage.getItem(CACHE_KEY);
      if (!raw || raw.length > 900000) return {};
      var parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};
      var clean = {};
      Object.keys(parsed).slice(0, 20).forEach(function (lang) {
        var entries = parsed[lang];
        if (!entries || typeof entries !== "object" || Array.isArray(entries)) return;
        clean[lang] = {};
        Object.keys(entries).slice(-700).forEach(function (key) {
          if (typeof entries[key] === "string" && key.length <= 2000 && entries[key].length <= 4000) clean[lang][key] = entries[key];
        });
      });
      return clean;
    } catch (e) { return {}; }
  }

  function scheduleCacheWrite() {
    if (cacheWriteTimer) clearTimeout(cacheWriteTimer);
    cacheWriteTimer = setTimeout(function () {
      cacheWriteTimer = 0;
      try { localStorage.setItem(CACHE_KEY, JSON.stringify(cache)); } catch (e) {}
    }, 500);
  }

  function cacheTranslation(lang, source, translated) {
    if (!cache[lang]) cache[lang] = {};
    cache[lang][source] = translated;
    var keys = Object.keys(cache[lang]);
    while (keys.length > 700) delete cache[lang][keys.shift()];
    scheduleCacheWrite();
  }

  function normalizeForCompare(value) {
    return String(value || "").replace(/\s+/g, " ").trim();
  }

  function sourceLanguage(text) {
    if (/[\u0900-\u097f]/.test(text)) return "hi";
    if (/[\u0b80-\u0bff]/.test(text)) return "ta";
    if (/[\u0980-\u09ff]/.test(text)) return "bn";
    if (/[\u0a00-\u0a7f]/.test(text)) return "pa";
    if (/[\u0a80-\u0aff]/.test(text)) return "gu";
    if (/[\u0b00-\u0b7f]/.test(text)) return "or";
    if (/[\u0c00-\u0c7f]/.test(text)) return "te";
    if (/[\u0c80-\u0cff]/.test(text)) return "kn";
    if (/[\u0d00-\u0d7f]/.test(text)) return "ml";
    return "en";
  }

  function protectTranslationTokens(text) {
    var tokens = [];
    var value = String(text || "");
    function hold(match, replacement) {
      var marker = "VMZXQ" + tokens.length + "QXZ";
      tokens.push({ marker: marker, value: replacement || match });
      return marker;
    }
    var literalTerms = protectedTerms.slice().sort(function (a, b) { return b[0].length - a[0].length; });
    literalTerms.forEach(function (pair) {
      var escaped = pair[0].replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      var flags = /[A-Za-z]/.test(pair[0]) ? "gi" : "g";
      value = value.replace(new RegExp(escaped, flags), function (m) { return hold(m, pair[1]); });
    });
    value = value.replace(/https?:\/\/[^\s<>]+/gi, function (m) { return hold(m); });
    value = value.replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, function (m) { return hold(m); });
    value = value.replace(/\+?91[\s-]?[0-9]{5}[\s-]?[0-9]{5}\b/g, function (m) { return hold(m); });
    value = value.replace(/\b[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][0-9]Z[A-Z0-9]\b/gi, function (m) { return hold(m); });
    value = value.replace(/\b(?:VM-[A-Z0-9-]+|PAYMENT_REVIEW|VERIFIED|GSTIN|MSME|Udyam|HDFC|UPI|Delhivery One|Zoho|Google Sheets)\b/gi, function (m) { return hold(m); });
    value = value.replace(/\b\d+(?:\.\d+)?\s?(?:Hz|kHz|kg|g|mm|cm|inch|inches|keys|octaves?)\b/gi, function (m) { return hold(m); });
    value = value.replace(/₹\s?[\d,]+(?:\.\d{1,2})?/g, function (m) { return hold(m); });
    return { text: value, tokens: tokens };
  }

  function restoreTranslationTokens(text, tokens) {
    var output = String(text || "");
    tokens.forEach(function (token) {
      output = output.replace(new RegExp(token.marker, "gi"), token.value);
    });
    return output;
  }

  function translateRequest(source, target) {
    return new Promise(function (resolve, reject) {
      var key = target + "\u0000" + source;
      if (Object.prototype.hasOwnProperty.call(pending, key)) {
        pending[key].waiters.push({ resolve: resolve, reject: reject });
        return;
      }
      if (queue.length >= 500) { reject(new Error("translation-queue-limit")); return; }
      pending[key] = { source: source, target: target, waiters: [{ resolve: resolve, reject: reject }], attempts: 0 };
      queue.push(key);
      pumpQueue();
    });
  }

  function splitLongText(value) {
    if (value.length <= 430) return [value];
    var words = value.split(/(\s+)/);
    var pieces = [];
    var chunk = "";
    words.forEach(function (word) {
      if (chunk.length && chunk.length + word.length > 430) {
        pieces.push(chunk);
        chunk = "";
      }
      chunk += word;
    });
    if (chunk) pieces.push(chunk);
    return pieces;
  }

  function translateText(source, target) {
    var value = String(source || "");
    if (!value) return Promise.resolve(value);
    if (target === "hi") {
      if (sourceLanguage(value) === "hi") return Promise.resolve(value);
      if (Object.prototype.hasOwnProperty.call(combinedHiMap, value)) {
        return Promise.resolve(combinedHiMap[value]);
      }
    }
    if (target === "en" && Object.prototype.hasOwnProperty.call(combinedEnMap, value)) {
      return Promise.resolve(combinedEnMap[value]);
    }
    if (cache[target] && Object.prototype.hasOwnProperty.call(cache[target], value)) {
      return Promise.resolve(cache[target][value]);
    }
    if (value.length > 430) {
      var chunks = splitLongText(value);
      return Promise.all(chunks.map(function (chunk) { return translateText(chunk, target); }))
        .then(function (translated) {
          var joined = translated.join("");
          cacheTranslation(target, value, joined);
          return joined;
        });
    }
    return translateRequest(value, target).then(function (translated) {
      cacheTranslation(target, value, translated);
      return translated;
    }).catch(function () { return value; });
  }

  function pumpQueue() {
    while (activeRequests < maxConcurrent && queue.length) {
      var key = queue.shift();
      var job = pending[key];
      if (!job) continue;
      activeRequests++;
      runJob(key, job);
    }
  }

  function runJob(key, job) {
    job.attempts++;
    var protectedValue = protectTranslationTokens(job.source);
    var fromLang = sourceLanguage(job.source);
    var url = "https://api.mymemory.translated.net/get?q=" + encodeURIComponent(protectedValue.text) + "&langpair=" + encodeURIComponent(fromLang + "|" + job.target);
    var controller = typeof AbortController !== "undefined" ? new AbortController() : null;
    var timer = 0;
    var timeoutPromise = new Promise(function (_, reject) {
      timer = setTimeout(function () {
        if (controller) controller.abort();
        reject(new Error("translation-timeout"));
      }, 4500);
    });
    Promise.race([
      fetch(url, { method: "GET", cache: "no-store", signal: controller ? controller.signal : undefined }).then(function (response) {
        if (!response.ok) throw new Error("translation-http-" + response.status);
        return response.text();
      }),
      timeoutPromise
    ]).then(function (body) {
        var data = JSON.parse(body);
        var text = data && data.responseData && data.responseData.translatedText ? String(data.responseData.translatedText).trim() : "";
        if (!text || /MYMEMORY WARNING/i.test(text) || (data.responseStatus && data.responseStatus !== 200)) throw new Error("translation-empty");
        return restoreTranslationTokens(text, protectedValue.tokens);
      })
      .then(function (result) { finishJob(key, null, result); })
      .catch(function (error) {
        if (job.attempts < 2 && error && error.name !== "AbortError" && !/quota|warning/i.test(String(error.message || ""))) {
          setTimeout(function () { activeRequests = Math.max(0, activeRequests - 1); queue.push(key); pumpQueue(); }, 650);
        } else {
          finishJob(key, error || new Error("translation-failed"), job.source);
        }
      })
      .finally(function () { clearTimeout(timer); });
  }

  function finishJob(key, error, result) {
    var job = pending[key];
    if (job) {
      delete pending[key];
      job.waiters.forEach(function (waiter) {
        if (error) waiter.reject(error);
        else waiter.resolve(result);
      });
    }
    activeRequests = Math.max(0, activeRequests - 1);
    pumpQueue();
  }

  function shouldSkipText(node) {
    var parent = node && node.parentElement;
    if (!parent) return true;
    return !!parent.closest("script,style,noscript,template,textarea,input,select,option,[contenteditable='true'],.vm-form-language-instruction,.vm-form-language-error,.vm-mob-badge-item,.vm-stacked-pill,[data-vm-i18n-ignore]");
  }

  function processTextNode(node) {
    if (!node || shouldSkipText(node)) return;
    var state = textState.get(node);
    var current = node.nodeValue || "";
    var normalized = normalizeForCompare(current);
    if (!normalized) return;
    if (!state) {
      state = { source: current, last: null, lang: "" };
      textState.set(node, state);
    } else if (state.last !== null && current !== state.last) {
      state.source = current;
      state.last = null;
    }
    if (state.lang === currentLang && state.last === current) return;
    var sourceText = state.source;
    if (sourceLanguage(sourceText) === currentLang) {
      state.lang = currentLang;
      state.last = sourceText;
      if (node.nodeValue !== sourceText) {
        ownMutations = true;
        node.nodeValue = sourceText;
        ownMutations = false;
      }
      return;
    }
    var leading = (sourceText.match(/^\s*/) || [""])[0];
    var trailing = (sourceText.match(/\s*$/) || [""])[0];
    var requestedLang = currentLang;
    translateText(normalizeForCompare(sourceText), currentLang).then(function (translated) {
      if (!node.isConnected || state.source !== sourceText || currentLang !== requestedLang) return;
      var output = leading + translated + trailing;
      if (node.nodeValue !== output) {
        ownMutations = true;
        state.last = output;
        state.lang = currentLang;
        node.nodeValue = output;
        ownMutations = false;
      }
    });
  }

  var translatedAttributes = ["placeholder", "title", "aria-label", "aria-description", "alt", "data-tooltip", "value"];
  function processAttribute(element, attr) {
    if (!element || !element.hasAttribute(attr)) return;
    if (attr === "value" && !(element.tagName === "INPUT" && /^(submit|button|reset)$/i.test(element.type || ""))) return;
    if (attr === "placeholder" && /^(email|password|number|date|time|hidden)$/i.test(element.type || "")) return;
    var value = element.getAttribute(attr) || "";
    if (!normalizeForCompare(value) || value.length > 430) return;
    var states = attrState.get(element);
    if (!states) { states = {}; attrState.set(element, states); }
    var state = states[attr];
    if (!state) { state = states[attr] = { source: value, last: null, lang: "" }; }
    else if (state.last !== null && value !== state.last) { state.source = value; state.last = null; }
    if (state.lang === currentLang && value === state.last) return;
    if (sourceLanguage(state.source) === currentLang) {
      state.lang = currentLang;
      state.last = state.source;
      if (value !== state.source) element.setAttribute(attr, state.source);
      return;
    }
    var original = state.source;
    var requestedLang = currentLang;
    translateText(normalizeForCompare(original), currentLang).then(function (translated) {
      if (!element.isConnected || state.source !== original || currentLang !== requestedLang) return;
      if (element.getAttribute(attr) === value || element.getAttribute(attr) === state.last) {
        state.last = translated;
        state.lang = currentLang;
        if (translated !== value) element.setAttribute(attr, translated);
      }
    });
  }

  function titleSelector() {
    return ".pcard-title-light,.pcard-title,.product-title,.card-title,.card-title-two-line,.product-detail-card h1,.product-detail-card h2,.product-detail-card h3,.product-detail-card h4,h3.item-title,[data-role='product-title'],[data-vm-card-title]";
  }

  function splitName(raw) {
    var value = normalizeForCompare(raw);
    var match = value.match(/^(.*?)\s*\(([^()]+)\)\s*$/);
    if (match && /[A-Za-z]/.test(match[2])) return { primary: match[1].trim(), english: match[2].trim().replace(/^\(|\)$/g, "") };
    if (Object.prototype.hasOwnProperty.call(combinedEnMap, value)) return { primary: value, english: combinedEnMap[value] };
    return { primary: value, english: "" };
  }

  function renderTitle(title, state, language, translatedName, englishName) {
    if (!title.isConnected) return;
    var primary = translatedName || state.primary;
    var renderedText;
    if (language === "en") renderedText = englishName || translatedName || state.primary;
    else renderedText = primary + (englishName ? " (" + englishName.toLowerCase() + ")" : "");
    if (normalizeForCompare(title.textContent) === normalizeForCompare(renderedText) && title.dataset.vmDeviceTitleLang === language) return;
    var primarySpan = document.createElement("span");
    primarySpan.className = "vm-device-title-primary";
    primarySpan.textContent = primary;
    title.replaceChildren(primarySpan);
    if (language !== "en" && englishName) {
      var secondarySpan = document.createElement("span");
      secondarySpan.className = "vm-device-title-secondary";
      secondarySpan.textContent = "(" + englishName.toLowerCase() + ")";
      title.appendChild(secondarySpan);
    }
    title.dataset.vmDeviceTitleLang = language;
    title.dataset.vmDeviceTitleRendered = normalizeForCompare(renderedText);
    var tState = titleState.get(title);
    if (tState) tState.last = normalizeForCompare(title.textContent);
  }

  function processTitle(title) {
    if (!title || title.closest("footer") || title.closest(".cart-drawer,.vm-side-drawer,#vm-left-nav-drawer,[role='dialog']")) return;
    var state = titleState.get(title);
    var visibleText = normalizeForCompare(title.textContent);
    if (!state) {
      var source = title.dataset.vmDeviceTitleSource || title.dataset.vmOrigText || visibleText;
      var parsed = splitName(source);
      state = { source: source, primary: parsed.primary, english: parsed.english, last: null, lang: "" };
      titleState.set(title, state);
      title.dataset.vmDeviceTitleSource = source;
    } else if (state.last !== null && visibleText !== state.last && visibleText !== state.source) {
      var parsedNew = splitName(visibleText);
      state.source = visibleText;
      state.primary = parsedNew.primary;
      state.english = parsedNew.english;
      title.dataset.vmDeviceTitleSource = visibleText;
    }
    if (state.lang === currentLang && title.dataset.vmDeviceTitleLang === currentLang && visibleText === title.dataset.vmDeviceTitleRendered) return;
    state.lang = currentLang;
    var englishPromise = state.english ? Promise.resolve(state.english) : translateText(state.primary, "en");
    if (currentLang === "hi") {
      var hindiPromise = sourceLanguage(state.primary) === "hi" ? Promise.resolve(state.primary) : translateText(state.primary, "hi");
      Promise.all([hindiPromise, englishPromise]).then(function (values) {
        if (state.lang === currentLang) renderTitle(title, state, "hi", values[0], values[1]);
      });
    } else if (currentLang === "en") {
      englishPromise.then(function (enName) { renderTitle(title, state, "en", enName, enName); });
    } else {
      Promise.all([translateText(state.primary, currentLang), englishPromise]).then(function (values) {
        if (state.lang === currentLang) renderTitle(title, state, currentLang, values[0], values[1]);
      });
    }
  }

  function isEditableTextField(field) {
    if (!field || field.disabled || field.readOnly) return false;
    if (field.tagName === "TEXTAREA") return true;
    if (field.tagName !== "INPUT") return false;
    return /^(text|search|tel|url|)$/.test(String(field.type || "").toLowerCase());
  }

  var indicCharMap = {
    "अ":"a","आ":"aa","इ":"i","ई":"i","उ":"u","ऊ":"u","ऋ":"ri","ए":"e","ऐ":"ai","ओ":"o","औ":"au",
    "क":"k","ख":"kh","ग":"g","घ":"gh","ङ":"ng","च":"ch","छ":"chh","ज":"j","झ":"jh","ञ":"ny","ट":"t","ठ":"th","ड":"d","ढ":"dh","ण":"n","त":"t","थ":"th","द":"d","ध":"dh","न":"n","प":"p","फ":"ph","ब":"b","भ":"bh","म":"m","य":"y","र":"r","ल":"l","व":"v","श":"sh","ष":"sh","स":"s","ह":"h","ळ":"l",
    "ा":"a","ि":"i","ी":"i","ु":"u","ू":"u","ृ":"ri","े":"e","ै":"ai","ो":"o","ौ":"au","ं":"n","ँ":"n","ः":"h","़":"","्":"","।":".","॥":".",
    "அ":"a","ஆ":"aa","இ":"i","ஈ":"i","உ":"u","ஊ":"u","எ":"e","ஏ":"e","ஐ":"ai","ஒ":"o","ஓ":"o","ஔ":"au","க":"k","ங":"ng","ச":"ch","ஜ":"j","ஞ":"ny","ட":"t","ண":"n","த":"th","ந":"n","ப":"p","ம":"m","ய":"y","ர":"r","ல":"l","வ":"v","ழ":"zh","ள":"l","ற":"r","ன":"n","ா":"a","ி":"i","ீ":"i","ு":"u","ூ":"u","ெ":"e","ே":"e","ை":"ai","ொ":"o","ோ":"o","ௌ":"au","்":"","ஂ":"m",
    "০":"0","১":"1","২":"2","৩":"3","৪":"4","৫":"5","৬":"6","৭":"7","৮":"8","৯":"9","૦":"0","૧":"1","૨":"2","૩":"3","૪":"4","૫":"5","૬":"6","૭":"7","૮":"8","૯":"9","०":"0","१":"1","२":"2","३":"3","४":"4","५":"5","६":"6","७":"7","८":"8","९":"9"
  };
  function addIndicEntries(entries) {
    entries.split(";").forEach(function (entry) {
      var pair = entry.split("=");
      if (pair.length === 2) indicCharMap[pair[0]] = pair[1];
    });
  }
  addIndicEntries("অ=o;আ=aa;ই=i;ঈ=ii;উ=u;ঊ=uu;ঋ=ri;এ=e;ঐ=oi;ও=o;ঔ=ou;ক=k;খ=kh;গ=g;ঘ=gh;ঙ=ng;চ=ch;ছ=chh;জ=j;ঝ=jh;ঞ=ny;ট=t;ঠ=th;ড=d;ঢ=dh;ণ=n;ত=t;থ=th;দ=d;ধ=dh;ন=n;প=p;ফ=ph;ব=b;ভ=bh;ম=m;য=j;র=r;ল=l;শ=sh;ষ=sh;স=s;হ=h;য়=y;ড়=rh;ঢ়=rh;া=a;ি=i;ী=i;ু=u;ূ=u;ৃ=ri;ে=e;ৈ=oi;ো=o;ৌ=ou;ং=n;ঁ=n;ঃ=h;্=;়=");
  addIndicEntries("ਅ=a;ਆ=aa;ਇ=i;ਈ=ii;ਉ=u;ਊ=uu;ਏ=e;ਐ=ai;ਓ=o;ਔ=au;ਕ=k;ਖ=kh;ਗ=g;ਘ=gh;ਙ=ng;ਚ=ch;ਛ=chh;ਜ=j;ਝ=jh;ਞ=ny;ਟ=t;ਠ=th;ਡ=d;ਢ=dh;ਣ=n;ਤ=t;ਥ=th;ਦ=d;ਧ=dh;ਨ=n;ਪ=p;ਫ=ph;ਬ=b;ਭ=bh;ਮ=m;ਯ=y;ਰ=r;ਲ=l;ਵ=v;ਸ=s;ਹ=h;ਾ=a;ਿ=i;ੀ=i;ੁ=u;ੂ=u;ੇ=e;ੈ=ai;ੋ=o;ੌ=au;ਂ=n;ੱ=;੍=;਼=");
  addIndicEntries("અ=a;આ=aa;ઇ=i;ઈ=ii;ઉ=u;ઊ=uu;ઋ=ri;એ=e;ઐ=ai;ઓ=o;ઔ=au;ક=k;ખ=kh;ગ=g;ઘ=gh;ઙ=ng;ચ=ch;છ=chh;જ=j;ઝ=jh;ઞ=ny;ટ=t;ઠ=th;ડ=d;ઢ=dh;ણ=n;ત=t;થ=th;દ=d;ધ=dh;ન=n;પ=p;ફ=ph;બ=b;ભ=bh;મ=m;ય=y;ર=r;લ=l;વ=v;શ=sh;ષ=sh;સ=s;હ=h;ા=a;િ=i;ી=i;ુ=u;ૂ=u;ૃ=ri;ે=e;ૈ=ai;ો=o;ૌ=au;ં=n;ઃ=h;્=;઼=");
  addIndicEntries("ଅ=a;ଆ=aa;ଇ=i;ଈ=ii;ଉ=u;ଊ=uu;ଋ=ri;ଏ=e;ଐ=ai;ଓ=o;ଔ=au;କ=k;ଖ=kh;ଗ=g;ଘ=gh;ଙ=ng;ଚ=ch;ଛ=chh;ଜ=j;ଝ=jh;ଞ=ny;ଟ=t;ଠ=th;ଡ=d;ଢ=dh;ଣ=n;ତ=t;ଥ=th;ଦ=d;ଧ=dh;ନ=n;ପ=p;ଫ=ph;ବ=b;ଭ=bh;ମ=m;ଯ=y;ର=r;ଲ=l;ୱ=w;ଶ=sh;ଷ=sh;ସ=s;ହ=h;ା=a;ି=i;ୀ=i;ୁ=u;ୂ=uu;ୃ=ri;େ=e;ୈ=ai;ୋ=o;ୌ=au;ଂ=n;ଃ=h;୍=");
  addIndicEntries("అ=a;ఆ=aa;ఇ=i;ఈ=ii;ఉ=u;ఊ=uu;ఋ=ri;ఎ=e;ఏ=ee;ఐ=ai;ఒ=o;ఓ=oo;ఔ=au;క=k;ఖ=kh;గ=g;ఘ=gh;ఙ=ng;చ=ch;ఛ=chh;జ=j;ఝ=jh;ఞ=ny;ట=t;ఠ=th;డ=d;ఢ=dh;ణ=n;త=t;థ=th;ద=d;ధ=dh;న=n;ప=p;ఫ=ph;బ=b;భ=bh;మ=m;య=y;ర=r;ల=l;వ=v;శ=sh;ష=sh;స=s;హ=h;ా=a;ి=i;ీ=ii;ు=u;ూ=uu;ృ=ri;ె=e;ే=ee;ై=ai;ొ=o;ో=oo;ౌ=au;ం=n;ః=h;్=");
  addIndicEntries("ಅ=a;ಆ=aa;ಇ=i;ಈ=ii;ಉ=u;ಊ=uu;ಋ=ri;ಎ=e;ಏ=ee;ಐ=ai;ಒ=o;ಓ=oo;ಔ=au;ಕ=k;ಖ=kh;ಗ=g;ಘ=gh;ಙ=ng;ಚ=ch;ಛ=chh;ಜ=j;ಝ=jh;ಞ=ny;ಟ=t;ಠ=th;ಡ=d;ಢ=dh;ಣ=n;ತ=t;ಥ=th;ದ=d;ಧ=dh;ನ=n;ಪ=p;ಫ=ph;ಬ=b;ಭ=bh;ಮ=m;ಯ=y;ರ=r;ಲ=l;ವ=v;ಶ=sh;ಷ=sh;ಸ=s;ಹ=h;ಾ=aa;ಿ=i;ೀ=ii;ು=u;ೂ=uu;ೃ=ri;ೆ=e;ೇ=ee;ೈ=ai;ೊ=o;ೋ=oo;ೌ=au;ಂ=n;ಃ=h;್=");
  addIndicEntries("അ=a;ആ=aa;ഇ=i;ഈ=ii;ഉ=u;ഊ=uu;ഋ=ri;എ=e;ഏ=ee;ഐ=ai;ഒ=o;ഓ=oo;ഔ=au;ക=k;ഖ=kh;ഗ=g;ഘ=gh;ങ=ng;ച=ch;ഛ=chh;ജ=j;ഝ=jh;ഞ=ny;ട=t;ഠ=th;ഡ=d;ഢ=dh;ണ=n;ത=t;ഥ=th;ദ=d;ധ=dh;ന=n;പ=p;ഫ=ph;ബ=b;ഭ=bh;മ=m;യ=y;ര=r;ല=l;വ=v;ശ=sh;ഷ=sh;സ=s;ഹ=h;ാ=aa;ി=i;ീ=ii;ു=u;ൂ=uu;ൃ=ri;െ=e;േ=ee;ൈ=ai;ൊ=o;ോ=oo;ൌ=au;ം=m;ഃ=h;്=");
  addIndicEntries("্=;୍=;੍=;્=;్=;್=;്=");
  addIndicEntries("ള=l;ഴ=zh;റ=r");
  addIndicEntries("০=0;১=1;২=2;৩=3;৪=4;৫=5;৬=6;৭=7;৮=8;৯=9;੦=0;੧=1;੨=2;੩=3;੪=4;੫=5;੬=6;੭=7;੮=8;੯=9;૦=0;૧=1;૨=2;૩=3;૪=4;૫=5;૬=6;૭=7;૮=8;૯=9;୦=0;୧=1;୨=2;୩=3;୪=4;୫=5;୬=6;୭=7;୮=8;୯=9;౦=0;౧=1;౨=2;౩=3;౪=4;౫=5;౬=6;౭=7;౮=8;౯=9;೦=0;೧=1;೨=2;೩=3;೪=4;೫=5;೬=6;೭=7;೮=8;೯=9;൦=0;൧=1;൨=2;൩=3;൪=4;൫=5;൬=6;൭=7;൮=8;൯=9");
  var indicConsonants = "कखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसहळஙசஜஞடணதநபமயரலவழளறனকখগঘঙচছজঝঞটঠডঢণতথদধনপফবভমযরলশষসহড়ঢ়ਕਖਗਘਙਚਛਜਝਞਟਠਡਢਣਤਥਦਧਨਪਫਬਭਮਯਰਲਵਸਹકખગઘઙચછજઝઞટઠડઢણતથદધનપફબભમયરલવશષસહକଖଗଘଙଚଛଜଝଞଟଠଡଢଣତଥଦଧନପଫବଭମଯରଲୱଶଷସହకఖగఘఙచఛజఝఞటఠడఢణతథదధనపఫబభమయరలవశషసహಕಖಗಘಙಚಛಜಝಞಟಠಡಢಣತಥದಧನಪಫಬಭಮಯರಲವಶಷಸಹകഖഗഘങചഛജഝഞടഠഡഢണതഥദധനപഫബഭമയരലവശഷസഹ";
  var indicVowelMarks = { "ा":1,"ि":1,"ी":1,"ु":1,"ू":1,"ृ":1,"े":1,"ै":1,"ो":1,"ौ":1,"்":1,"াি":1,"া":1,"ি":1,"ী":1,"ু":1,"ূ":1,"ৃ":1,"ে":1,"ৈ":1,"ো":1,"ৌ":1,"্":1,"ਾ":1,"ਿ":1,"ੀ":1,"ੁ":1,"ੂ":1,"ੇ":1,"ੈ":1,"ੋ":1,"ੌ":1,"੍":1,"િ":1,"ુ":1,"ૂ":1,"ૃ":1,"ે":1,"ૈ":1,"ૌ":1,"્":1,"ା":1,"ୀ":1,"ୂ":1,"ୃ":1,"େ":1,"ୈ":1,"ୌ":1,"୍":1,"ా":1,"ి":1,"ీ":1,"ు":1,"ూ":1,"ృ":1,"ె":1,"ే":1,"ై":1,"ొ":1,"ో":1,"ౌ":1,"్":1,"ಾ":1,"ಿ":1,"ೀ":1,"ು":1,"ೂ":1,"ೃ":1,"ೆ":1,"ೇ":1,"ೈ":1,"ೊ":1,"ೋ":1,"ೌ":1,"್":1,"ാ":1,"ി":1,"ീ":1,"ു":1,"ൂ":1,"ൃ":1,"െ":1,"േ":1,"ൈ":1,"ൊ":1,"ോ":1,"ൌ":1,"്":1 };

  function transliterateIndic(value) {
    var text = String(value || "").normalize ? String(value || "").normalize("NFKC") : String(value || "");
    var chars = Array.from(text);
    var output = "";
    for (var i = 0; i < chars.length; i++) {
      var ch = chars[i];
      if (Object.prototype.hasOwnProperty.call(indicCharMap, ch)) {
        var mapped = indicCharMap[ch];
        if (indicConsonants.indexOf(ch) !== -1 || "ളഴറ".indexOf(ch) !== -1) {
          var next = chars[i + 1] || "";
          if (!indicVowelMarks[next]) mapped += "a";
        }
        output += mapped;
      } else if (/\p{M}/u.test(ch)) {
        continue;
      } else {
        output += ch;
      }
    }
    return output.normalize ? output.normalize("NFKD").replace(/\p{M}/gu, "") : output;
  }

  function normalizeFormValue(value) {
    var text = transliterateIndic(String(value || "")).replace(/[\u200B-\u200D\uFEFF]/g, "").replace(/\s+/g, " ").trim();
    return { value: text, latinOnly: !/[^\x00-\x7F]/.test(text) };
  }

  function setFieldError(field, message) {
    field.setAttribute("aria-invalid", "true");
    var node = field.parentNode && field.parentNode.querySelector(".vm-form-language-error[data-for='" + field.id + "']");
    if (!node) {
      node = document.createElement("small");
      node.className = "vm-form-language-error";
      node.setAttribute("role", "alert");
      node.setAttribute("data-for", field.id || "");
      if (field.parentNode) field.parentNode.appendChild(node);
    }
    node.textContent = message;
  }

  function clearFieldError(field) {
    field.removeAttribute("aria-invalid");
    var node = field.parentNode && field.parentNode.querySelector(".vm-form-language-error[data-for='" + field.id + "']");
    if (node) node.remove();
  }

  function errorMessage(lang) {
    if (lang === "hi") return "कृपया इस मान को अंग्रेज़ी (लैटिन) अक्षरों में लिखें।";
    if (lang === "ta") return "இந்த விவரத்தை ஆங்கில (லத்தீன்) எழுத்துகளில் உள்ளிடவும்.";
    return "Please enter this value using English (Latin) letters.";
  }

  function normalizeField(field) {
    if (!isEditableTextField(field) || !field.value) return true;
    var normalized = normalizeFormValue(field.value);
    if (!normalized.latinOnly) {
      setFieldError(field, errorMessage(currentLang));
      return false;
    }
    if (field.value !== normalized.value) field.value = normalized.value;
    clearFieldError(field);
    return true;
  }

  function helpText(lang) {
    if (lang === "hi") return Promise.resolve(HELP_HI);
    if (lang === "en") return Promise.resolve(HELP_EN);
    if (lang === "ta") return Promise.resolve(HELP_TA);
    return translateText(helpSource, lang).then(function (value) { return value && value !== helpSource ? value : HELP_EN; });
  }

  function ensureFieldInstructions() {
    if (!document.body) return;
    var fields = document.querySelectorAll("input:not([type='hidden']):not([type='submit']):not([type='button']):not([type='reset']):not([type='checkbox']):not([type='radio']):not([type='file']),textarea,select");
    fields.forEach(function (field) {
      if (field.closest("[data-vm-i18n-ignore]")) return;
      var help = field.parentNode && field.parentNode.querySelector(":scope > .vm-form-language-instruction");
      if (!help) {
        help = document.createElement("small");
        help.className = "vm-form-language-instruction";
        help.style.cssText = "display:block;margin-top:5px;font-size:.78rem;line-height:1.4;color:#ffd369;font-weight:600;max-width:100%;box-sizing:border-box";
        help.setAttribute("data-vm-i18n-ignore", "1");
        if (field.parentNode) field.parentNode.insertBefore(help, field.nextSibling);
      }
      if (help.dataset.vmHelpLang === currentLang && help.textContent) return;
      var requestedLang = currentLang;
      helpText(requestedLang).then(function (text) {
        if (help.isConnected && currentLang === requestedLang) {
          help.textContent = text;
          help.dataset.vmHelpLang = requestedLang;
        }
      });
    });
  }

  function onChange(event) {
    var field = event.target;
    if (isEditableTextField(field)) normalizeField(field);
  }

  function onSubmit(event) {
    var form = event.target;
    if (!form || form.tagName !== "FORM") return;
    var fields = form.querySelectorAll("input[type='text'],input[type='search'],input[type='tel'],input[type='url'],input:not([type]),textarea");
    var valid = true;
    fields.forEach(function (field) { if (!normalizeField(field)) valid = false; });
    if (!valid) {
      event.preventDefault();
      event.stopImmediatePropagation();
      var first = form.querySelector("[aria-invalid='true']");
      if (first && typeof first.focus === "function") first.focus();
    }
  }

  function processElement(element) {
    if (!element || element.nodeType !== 1) return;
    translatedAttributes.forEach(function (attr) { processAttribute(element, attr); });
    if (element.matches && element.matches(titleSelector())) processTitle(element);
    if (element.querySelectorAll) {
      element.querySelectorAll(titleSelector()).forEach(processTitle);
      element.querySelectorAll("*").forEach(function (child) {
        translatedAttributes.forEach(function (attr) { processAttribute(child, attr); });
      });
    }
  }

  function scanDocument() {
    if (!document.body || scanBusy) return;
    scanBusy = true;
    try {
      setDocumentLanguage(manualLang || detectDeviceLanguage());
      processElement(document.body);
      var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      var node;
      while ((node = walker.nextNode())) {
        if (node.parentElement && node.parentElement.matches(titleSelector())) continue;
        if (node.parentElement && node.parentElement.closest(titleSelector())) continue;
        processTextNode(node);
      }
      ensureFieldInstructions();
    } finally { scanBusy = false; }
  }

  function scheduleScan(delay) {
    if (scanTimer) clearTimeout(scanTimer);
    scanTimer = setTimeout(function () { scanTimer = 0; scanDocument(); }, delay == null ? 120 : delay);
  }

  function installObserver() {
    if (observer || !document.body || typeof MutationObserver === "undefined") return;
    observer = new MutationObserver(function (records) {
      if (ownMutations) return;
      var shouldScan = false;
      records.forEach(function (record) {
        if (record.type === "characterData") {
          processTextNode(record.target);
          return;
        }
        if (record.type === "attributes") {
          if (record.attributeName === "data-vm-lang") return;
          processAttribute(record.target, record.attributeName);
          return;
        }
        if (record.addedNodes && record.addedNodes.length) {
          record.addedNodes.forEach(function (node) {
            if (node.nodeType === 3) processTextNode(node);
            else if (node.nodeType === 1) processElement(node);
          });
          shouldScan = true;
        }
      });
      if (shouldScan) scheduleScan(140);
    });
    observer.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: translatedAttributes });
  }

  function start() {
    setDocumentLanguage(manualLang || detectDeviceLanguage());
    installObserver();
    scanDocument();
  }

  document.addEventListener("change", onChange, true);
  document.addEventListener("submit", onSubmit, true);
  window.VMDeviceLang = {
    getLang: function () { return currentLang; },
    setLang: function (next) {
      manualLang = normalizeLang(next);
      if (!manualLang) return;
      try { localStorage.setItem(MANUAL_LANG_KEY, manualLang); } catch (e) {}
      setDocumentLanguage(manualLang);
      scheduleScan(0);
    },
    convertToEnglish: function (value) { return normalizeFormValue(value).value; },
    normalizeFormsToEnglish: function (root) {
      var scope = root || document;
      var formFields = scope.querySelectorAll("input[type='text'],input[type='search'],input[type='tel'],input[type='url'],input:not([type]),textarea");
      var ok = true;
      formFields.forEach(function (field) { if (!normalizeField(field)) ok = false; });
      return ok;
    },
    translate: translateText,
    rescan: function () { scheduleScan(0); }
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start, { once: true });
  else start();
  window.addEventListener("load", function () { installObserver(); scheduleScan(0); }, { once: true });
  window.addEventListener("languagechange", function () {
    manualLang = "";
    try { localStorage.removeItem(MANUAL_LANG_KEY); } catch (e) {}
    setDocumentLanguage(detectDeviceLanguage());
    scheduleScan(0);
  });
})();
