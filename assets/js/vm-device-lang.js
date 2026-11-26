/* === VM SMART DEVICE LANGUAGE AUTO-SYNC & FORM-TO-ENGLISH SUBMIT NORMALIZER === */
(function () {
  var LANG_KEY = "vm_device_lang_v1";
  var CACHE_KEY = "vm_i18n_cache_v1";

  function getDeviceLanguageCode() {
    var list = [];
    if (Array.isArray(navigator.languages) && navigator.languages.length) {
      list = navigator.languages;
    } else if (navigator.language) {
      list = [navigator.language];
    }
    var primary = String(list[0] || "hi").toLowerCase().trim();
    return primary.indexOf("hi") === 0 ? "hi" : "en";
  }

  function loadAndSaveDeviceLanguage() {
    var detected = getDeviceLanguageCode();
    try {
      if (window.localStorage) {
        window.localStorage.setItem(LANG_KEY, detected);
      }
    } catch (e) {}
    return detected;
  }

  function readCache() {
    try {
      var raw = window.localStorage && window.localStorage.getItem(CACHE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }

  function writeCache(cacheObj) {
    try {
      if (window.localStorage) {
        window.localStorage.setItem(CACHE_KEY, JSON.stringify(cacheObj));
      }
    } catch (e) {}
  }

  var exactMapEn = {
    "विश्वकर्मा म्यूज़िकल्स": "Vishwakarma Musicals",
    "तुलसी दास विश्वकर्मा": "Tulsidas Vishwakarma",
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
    "हारमोनियम": "Harmonium",
    "सफ़री हारमोनियम": "Safri Harmonium",
    "ढोलक": "Dholak",
    "तबला": "Tabla",
    "बांसुरी": "Bansuri",
    "झीका": "Jheeka",
    "झांझ": "Jhanjh",
    "मंजीरा": "Manjeera",
    "पारंपरिक लकड़ी का डमरू": "Traditional Wooden Damru",
    "धोंकनी": "Bellows (Dhonkni)",
    "प्रतिदिन सुबह 9:00 बजे से रात 9:00 बजे तक": "Daily 9:00 AM to 9:00 PM"
  };

  var exactMapHi = {};
  Object.keys(exactMapEn).forEach(function (hiText) {
    exactMapHi[exactMapEn[hiText]] = hiText;
  });

  var devanagariToLatinMap = {
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

  function transliterateDevanagariToEnglish(str) {
    var out = "";
    var s = String(str || "");
    for (var i = 0; i < s.length; i++) {
      var ch = s.charAt(i);
      if (Object.prototype.hasOwnProperty.call(devanagariToLatinMap, ch)) {
        out += devanagariToLatinMap[ch];
      } else {
        out += ch;
      }
    }
    return out.replace(/\s+/g, " ").trim();
  }

  function convertValueToEnglish(val) {
    var text = String(val || "");
    if (!text.trim()) return text;
    var trimmed = text.replace(/\s+/g, " ").trim();
    if (Object.prototype.hasOwnProperty.call(exactMapEn, trimmed)) {
      return exactMapEn[trimmed];
    }
    if (/[\u0900-\u097F]/.test(trimmed)) {
      return transliterateDevanagariToEnglish(trimmed);
    }
    return trimmed;
  }

  function normalizeFormFieldsToEnglish(rootEl) {
    var scope = rootEl || document;
    var fields = scope.querySelectorAll("input[type='text'], input[type='search'], input[type='tel'], input:not([type]), textarea");
    fields.forEach(function (field) {
      if (field.type === "password" || field.type === "hidden" || field.type === "email" || field.type === "number") return;
      if (typeof field.value === "string" && field.value.trim()) {
        var converted = convertValueToEnglish(field.value);
        if (converted && converted !== field.value) {
          field.value = converted;
          field.dispatchEvent(new Event("change", { bubbles: true }));
        }
      }
    });
  }

  function attachFormEnglishSubmitGuards() {
    document.querySelectorAll("form").forEach(function (form) {
      if (form.dataset.vmEnSubmitGuard === "1") return;
      form.addEventListener("submit", function () {
        normalizeFormFieldsToEnglish(form);
      }, true);
      form.dataset.vmEnSubmitGuard = "1";
    });

    document.addEventListener("change", function (ev) {
      var target = ev.target;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) {
        if (target.type !== "password" && target.type !== "email") {
          var nextVal = convertValueToEnglish(target.value);
          if (nextVal && nextVal !== target.value) {
            target.value = nextVal;
          }
        }
      }
    }, true);
  }

  function translateTextNodes(lang) {
    if (!document.body) return;
    var dict = lang === "en" ? exactMapEn : exactMapHi;
    var cache = readCache();
    var cacheDirty = false;

    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    var node;
    while ((node = walker.nextNode())) {
      var parent = node.parentElement;
      if (!parent) continue;
      if (parent.closest("script, style, noscript, textarea, input, .vm-mob-badge-item, .vm-stacked-pill")) continue;

      var raw = (node.nodeValue || "").replace(/\s+/g, " ").trim();
      if (!raw) continue;

      var translated = null;
      if (Object.prototype.hasOwnProperty.call(dict, raw)) {
        translated = dict[raw];
      } else if (cache[lang] && Object.prototype.hasOwnProperty.call(cache[lang], raw)) {
        translated = cache[lang][raw];
      } else if (lang === "en" && /[\u0900-\u097F]/.test(raw) && raw.length <= 80) {
        translated = transliterateDevanagariToEnglish(raw);
        if (!cache.en) cache.en = {};
        cache.en[raw] = translated;
        cacheDirty = true;
      }

      if (translated && translated !== raw) {
        var leading = (node.nodeValue.match(/^\s*/) || [""])[0];
        var trailing = (node.nodeValue.match(/\s*$/) || [""])[0];
        node.nodeValue = leading + translated + trailing;
      }
    }

    if (cacheDirty) {
      writeCache(cache);
    }
  }

  function applySmartLanguageSync() {
    var lang = loadAndSaveDeviceLanguage();
    document.documentElement.setAttribute("lang", lang);
    if (document.body) {
      document.body.setAttribute("data-vm-lang", lang);
    }
    translateTextNodes(lang);
    attachFormEnglishSubmitGuards();
  }

  window.VMDeviceLang = {
    getLang: loadAndSaveDeviceLanguage,
    setLang: function (nextLang) {
      if (nextLang !== "hi" && nextLang !== "en") return;
      try {
        window.localStorage && window.localStorage.setItem(LANG_KEY, nextLang);
      } catch (e) {}
      applySmartLanguageSync();
    },
    convertToEnglish: convertValueToEnglish,
    normalizeFormsToEnglish: normalizeFormFieldsToEnglish
  };

  applySmartLanguageSync();
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applySmartLanguageSync);
  }
  window.addEventListener("languagechange", applySmartLanguageSync);
  setTimeout(applySmartLanguageSync, 350);
  setTimeout(applySmartLanguageSync, 1200);

  if (typeof MutationObserver !== "undefined") {
    var obs = new MutationObserver(function () {
      applySmartLanguageSync();
    });
    var rootTarget = document.body || document.documentElement;
    if (rootTarget) {
      obs.observe(rootTarget, { childList: true, subtree: true });
    }
  }
})();
