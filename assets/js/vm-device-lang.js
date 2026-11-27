/* === VM LOOP-SAFE DEVICE LANGUAGE ENGINE, CACHE & FORM GUARD === */
(function () {
  if (window.__vmDeviceLangSafeLoaded) return;
  window.__vmDeviceLangSafeLoaded = true;

  var LANG_KEY = "vm_active_device_lang_v2";
  var CACHE_KEY = "vm_smart_translations_v2";
  var isApplying = false;
  var pendingTimer = null;

  function detectRawDeviceLanguage() {
    var list = [];
    if (Array.isArray(navigator.languages) && navigator.languages.length) {
      list = navigator.languages;
    } else if (navigator.language) {
      list = [navigator.language];
    }
    var raw = String(list[0] || "hi").toLowerCase().trim();
    if (!raw) return "hi";
    if (raw.indexOf("hi") === 0) return "hi";
    if (raw.indexOf("en") === 0) return "en";
    return raw.split("-")[0];
  }

  function syncDeviceLangToCache() {
    var lang = detectRawDeviceLanguage();
    try {
      if (window.localStorage) {
        window.localStorage.setItem(LANG_KEY, lang);
      }
    } catch (e) {}
    return lang;
  }

  function readTranslationCache() {
    try {
      var raw = window.localStorage && window.localStorage.getItem(CACHE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }

  function writeTranslationCache(obj) {
    try {
      if (window.localStorage) {
        window.localStorage.setItem(CACHE_KEY, JSON.stringify(obj));
      }
    } catch (e) {}
  }

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
    "सागौन": "Teak",
    "आम की लकड़ी": "Mango Wood",
    "चीड़": "Pine"
  };

  var combinedEnMap = {};
  Object.keys(uiEnglishMap).forEach(function (k) { combinedEnMap[k] = uiEnglishMap[k]; });
  Object.keys(instrumentEnglishMap).forEach(function (k) { combinedEnMap[k] = instrumentEnglishMap[k]; });

  var devanagariToLatin = {
    "अ": "a", "आ": "aa", "इ": "i", "ई": "ee", "उ": "u", "ऊ": "oo",
    "ऋ": "ri", "ए": "e", "ऐ": "ai", "ओ": "o", "औ": "au",
    "क": "ka", "ख": "kha", "ग": "ga", "घ": "gha", "ङ": "nga",
    "च": "cha", "छ": "chha", "ज": "ja", "झ": "jha", "ञ": "nya",
    "ट": "ta", "ठ": "tha", "ड": "da", "ढ": "dha", "ण": "na",
    "त": "ta", "थ": "tha", "द": "da", "ध": "dha", "न": "na",
    "प": "pa", "फ": "pha", "ब": "ba", "भ": "bha", "म": "ma",
    "य": "ya", "र": "ra", "ल": "la", "व": "va",
    "श": "sha", "ष": "shha", "स": "sa", "ह": "ha",
    "क्ष": "ksha", "त्र": "tra", "ज्ञ": "gya", "श्र": "shra",
    "ा": "a", "ि": "i", "ी": "ee", "ु": "u", "ू": "oo",
    "ृ": "ri", "े": "e", "ै": "ai", "ो": "o", "ौ": "au",
    "ं": "n", "ः": "h", "ँ": "n", "़": "", "्": "",
    "०": "0", "१": "1", "२": "2", "३": "3", "४": "4",
    "५": "5", "६": "6", "७": "7", "८": "8", "९": "9",
    "।": ".", "॥": "."
  };

  function toEnglishLatinForForm(val) {
    var text = String(val || "").replace(/\s+/g, " ").trim();
    if (!text) return "";
    if (Object.prototype.hasOwnProperty.call(combinedEnMap, text)) {
      return combinedEnMap[text];
    }
    var out = "";
    for (var i = 0; i < text.length; i++) {
      var ch = text.charAt(i);
      out += Object.prototype.hasOwnProperty.call(devanagariToLatin, ch) ? devanagariToLatin[ch] : ch;
    }
    return out.replace(/\s+/g, " ").trim();
  }

  function normalizeFormsToEnglish(rootEl) {
    var scope = rootEl || document;
    var fields = scope.querySelectorAll("input[type='text'], input[type='search'], input[type='tel'], input:not([type]), textarea");
    fields.forEach(function (field) {
      if (field.type === "password" || field.type === "hidden" || field.type === "email" || field.type === "number") return;
      if (typeof field.value === "string" && field.value.trim()) {
        var enVal = toEnglishLatinForForm(field.value);
        if (enVal && enVal !== field.value) {
          field.value = enVal;
        }
      }
    });
  }

  function attachFormGuards() {
    document.querySelectorAll("form").forEach(function (form) {
      if (form.dataset.vmFormEnBound === "1") return;
      form.addEventListener("submit", function () {
        normalizeFormsToEnglish(form);
      }, true);
      form.dataset.vmFormEnBound = "1";
    });

    if (!document.body.dataset.vmFormChangeBound) {
      document.addEventListener("change", function (ev) {
        var target = ev.target;
        if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) {
          if (target.type !== "password" && target.type !== "email") {
            var nextVal = toEnglishLatinForForm(target.value);
            if (nextVal && nextVal !== target.value) {
              target.value = nextVal;
            }
          }
        }
      }, true);
      document.body.dataset.vmFormChangeBound = "1";
    }
  }

  function injectFormEnglishNotice() {
    if (!document.body) return;
    var noticeText = "कृपया इसमें जो कुछ भी भरें, वह अंग्रेजी के अक्षरों में भरें।";
    var fields = document.querySelectorAll("form input:not([type='hidden']):not([type='checkbox']):not([type='radio']):not([type='submit']):not([type='button']), form textarea, form select");
    fields.forEach(function (field) {
      var next = field.nextElementSibling;
      if (next && next.classList && next.classList.contains("vm-form-en-instruction")) {
        if (next.textContent !== noticeText) next.textContent = noticeText;
        return;
      }
      var small = document.createElement("small");
      small.className = "vm-form-en-instruction";
      small.textContent = noticeText;
      small.style.cssText = "display:block;margin-top:5px;font-size:0.78rem;line-height:1.35;color:#ffd369;font-weight:600;max-width:100%;box-sizing:border-box;";
      if (field.parentNode) {
        field.parentNode.insertBefore(small, field.nextSibling);
      }
    });
  }

  function resolveEnglishNameForText(text) {
    var clean = String(text || "").replace(/\s+/g, " ").trim();
    if (!clean) return "";
    if (Object.prototype.hasOwnProperty.call(combinedEnMap, clean)) {
      return combinedEnMap[clean];
    }
    var basePart = clean.replace(/\s*\([^)]*\)\s*/g, " ").replace(/\s+/g, " ").trim();
    if (Object.prototype.hasOwnProperty.call(combinedEnMap, basePart)) {
      return combinedEnMap[basePart];
    }
    return basePart.replace(/\bsafari\b/gi, "Safri").replace(/\bjhakora\b/gi, "Jheeka");
  }

  function applyCardNameAndParenthesesRule(lang) {
    if (!document.body) return;
    var cards = document.querySelectorAll(".pcard, .card, [class*='card']");
    cards.forEach(function (card) {
      if (card.closest("footer")) return;
      var titleEls = card.querySelectorAll("h1, h2, h3, h4, .pcard-title, .card-title, [class*='title']");
      var primaryTitle = titleEls.length ? titleEls[0] : null;
      var primaryEnName = "";

      if (primaryTitle) {
        var rawTitle = (primaryTitle.dataset.vmOrigText || primaryTitle.textContent || "").replace(/\s+/g, " ").trim();
        if (!primaryTitle.dataset.vmOrigText) {
          primaryTitle.dataset.vmOrigText = rawTitle;
        }
        primaryEnName = resolveEnglishNameForText(rawTitle);

        var targetTitleText = rawTitle;
        if (lang === "hi") {
          var hiBase = rawTitle.replace(/\s*\([^)]*\)\s*/g, " ").trim();
          targetTitleText = primaryEnName && primaryEnName !== hiBase
            ? hiBase + " (" + primaryEnName + ")"
            : hiBase;
        } else if (lang === "en") { var enClean = (primaryEnName || rawTitle).replace(/\s*\([^)]*\)\s*/g, " ").trim(); targetTitleText = enClean; } else {
          var currentText = (primaryTitle.textContent || "").replace(/\s*\([^)]*\)\s*/g, " ").trim();
          targetTitleText = primaryEnName && primaryEnName.toLowerCase() !== currentText.toLowerCase()
            ? currentText + " (" + primaryEnName + ")"
            : currentText;
        }

        if (primaryTitle.textContent !== targetTitleText) {
          primaryTitle.textContent = targetTitleText;
        }
      }

      card.querySelectorAll("p, span, small, div").forEach(function (sub) {
        if (sub === primaryTitle || sub.querySelector("h1, h2, h3, h4, a, button, input, select, textarea")) return;
        var st = (sub.textContent || "").replace(/\s+/g, " ").trim();
        if (!st) return;

        if (lang === "en") {
          if (/^\([^)]*\)$/.test(st) || (primaryEnName && st.toLowerCase() === primaryEnName.toLowerCase())) {
            sub.style.setProperty("display", "none", "important");
          }
        } else {
          sub.style.removeProperty("display");
        }
      });
    });
  }

  var pendingFetchKeys = {};

  function fetchFreeTranslation(text, targetLang, onDone) {
    if (!text || targetLang === "hi") return;
    var cache = readTranslationCache();
    if (cache[targetLang] && Object.prototype.hasOwnProperty.call(cache[targetLang], text)) {
      onDone(cache[targetLang][text]);
      return;
    }

    var lockKey = targetLang + "::" + text;
    if (pendingFetchKeys[lockKey]) return;
    pendingFetchKeys[lockKey] = true;

    var controller = typeof AbortController !== "undefined" ? new AbortController() : null;
    var timerId = controller ? setTimeout(function () { controller.abort(); }, 2500) : null;

    var url = "https://api.mymemory.translated.net/get?q=" + encodeURIComponent(text) + "&langpair=hi|" + encodeURIComponent(targetLang);
    fetch(url, controller ? { signal: controller.signal } : undefined)
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (data) {
        var translated = data && data.responseData && data.responseData.translatedText
          ? String(data.responseData.translatedText).trim()
          : "";
        if (translated && translated.toUpperCase().indexOf("MYMEMORY WARNING") === -1) {
          translated = translated.replace(/\bsafari\b/gi, "Safri").replace(/\bjhakora\b/gi, "Jheeka");
          var latest = readTranslationCache();
          if (!latest[targetLang]) latest[targetLang] = {};
          latest[targetLang][text] = translated;
          writeTranslationCache(latest);
          onDone(translated);
        }
      })
      .catch(function () {})
      .finally(function () {
        if (timerId) clearTimeout(timerId);
        delete pendingFetchKeys[lockKey];
      });
  }

  function translateWholePageSmartly(lang) {
    if (!document.body || lang === "hi") {
      return;
    }

    var cache = readTranslationCache();
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    var node;
    var count = 0;

    while ((node = walker.nextNode()) && count < 1500) {
      count++;
      var parent = node.parentElement;
      if (!parent) continue;
      if (parent.closest("script, style, noscript, textarea, input, .vm-form-en-instruction, .vm-mob-badge-item, .vm-stacked-pill")) continue;

      var orig = node.nodeValue || "";
      var trimmed = orig.replace(/\s+/g, " ").trim();
      if (!trimmed) continue;

      if (!node.__vmOrigText) {
        node.__vmOrigText = trimmed;
      }
      var sourceText = node.__vmOrigText;
      var leading = (orig.match(/^\s*/) || [""])[0];
      var trailing = (orig.match(/\s*$/) || [""])[0];

      if (lang === "en") {
        if (Object.prototype.hasOwnProperty.call(combinedEnMap, sourceText)) {
          var nextEn = leading + combinedEnMap[sourceText] + trailing;
          if (node.nodeValue !== nextEn) node.nodeValue = nextEn;
        } else if (/[\u0900-\u097F]/.test(sourceText)) {
          if (cache.en && Object.prototype.hasOwnProperty.call(cache.en, sourceText)) {
            var nextCachedEn = leading + cache.en[sourceText] + trailing;
            if (node.nodeValue !== nextCachedEn) node.nodeValue = nextCachedEn;
          } else {
            (function (targetNode, srcStr, lStr, tStr) {
              fetchFreeTranslation(srcStr, "en", function (enOut) {
                var val = lStr + enOut + tStr;
                if (targetNode.nodeValue !== val) targetNode.nodeValue = val;
              });
            })(node, sourceText, leading, trailing);
          }
        }
      } else {
        if (cache[lang] && Object.prototype.hasOwnProperty.call(cache[lang], sourceText)) {
          var nextCachedOther = leading + cache[lang][sourceText] + trailing;
          if (node.nodeValue !== nextCachedOther) node.nodeValue = nextCachedOther;
        } else if (/[\u0900-\u097F]/.test(sourceText) && sourceText.length <= 200) {
          (function (targetNode, srcStr, lStr, tStr, targetLangCode) {
            fetchFreeTranslation(srcStr, targetLangCode, function (outStr) {
              var val = lStr + outStr + tStr;
              if (targetNode.nodeValue !== val) targetNode.nodeValue = val;
            });
          })(node, sourceText, leading, trailing, lang);
        }
      }
    }
  }

  function runFullSmartSync() {
    if (isApplying || !document.body) return;
    isApplying = true;
    try {
      var lang = syncDeviceLangToCache();
      if (document.documentElement.getAttribute("lang") !== lang) {
        document.documentElement.setAttribute("lang", lang);
      }
      if (document.body.getAttribute("data-vm-lang") !== lang) {
        document.body.setAttribute("data-vm-lang", lang);
      }
      translateWholePageSmartly(lang);
      applyCardNameAndParenthesesRule(lang);
      injectFormEnglishNotice();
      attachFormGuards();
    } finally {
      setTimeout(function () { isApplying = false; }, 120);
    }
  }

  function scheduleSafeSync(delayMs) {
    if (pendingTimer) clearTimeout(pendingTimer);
    pendingTimer = setTimeout(runFullSmartSync, delayMs || 250);
  }

  window.VMDeviceLang = {
    getLang: syncDeviceLangToCache,
    setLang: function (nextLang) {
      if (!nextLang) return;
      try {
        window.localStorage && window.localStorage.setItem(LANG_KEY, String(nextLang).toLowerCase());
      } catch (e) {}
      runFullSmartSync();
    },
    convertToEnglish: toEnglishLatinForForm,
    normalizeFormsToEnglish: normalizeFormsToEnglish
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { scheduleSafeSync(50); });
  } else {
    scheduleSafeSync(50);
  }
  window.addEventListener("load", function () { scheduleSafeSync(300); });
  window.addEventListener("languagechange", function () { scheduleSafeSync(100); });
})();




