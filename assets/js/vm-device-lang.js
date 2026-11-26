/* === VM INTELLIGENT DEVICE LANGUAGE ENGINE, FREE WEB TRANSLATION CACHE & FORM NORMALIZER === */
(function () {
  var LANG_KEY = "vm_active_device_lang_v2";
  var CACHE_KEY = "vm_smart_translations_v2";

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
    "प्रतिदिन सुबह 9:00 बजे से रात 9:00 बजे तक": "Daily 9:00 AM to 9:00 PM"
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
          field.dispatchEvent(new Event("change", { bubbles: true }));
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
  }

  function injectFormEnglishNotice() {
    if (!document.body) return;
    var noticeText = "कृपया इसमें जो कुछ भी भरें, वह अंग्रेजी के अक्षरों में भरें।";
    var fields = document.querySelectorAll("form input:not([type='hidden']):not([type='checkbox']):not([type='radio']):not([type='submit']):not([type='button']), form textarea, form select");
    fields.forEach(function (field) {
      var next = field.nextElementSibling;
      if (next && next.classList && next.classList.contains("vm-form-en-instruction")) {
        next.textContent = noticeText;
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

        if (lang === "hi") {
          var hiBase = rawTitle.replace(/\s*\([^)]*\)\s*/g, " ").trim();
          primaryTitle.textContent = primaryEnName && primaryEnName !== hiBase
            ? hiBase + " (" + primaryEnName + ")"
            : hiBase;
        } else if (lang === "en") {
          primaryTitle.textContent = primaryEnName || rawTitle;
        } else {
          var currentText = (primaryTitle.textContent || "").replace(/\s*\([^)]*\)\s*/g, " ").trim();
          primaryTitle.textContent = primaryEnName && primaryEnName.toLowerCase() !== currentText.toLowerCase()
            ? currentText + " (" + primaryEnName + ")"
            : currentText;
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

    var url = "https://api.mymemory.translated.net/get?q=" + encodeURIComponent(text) + "&langpair=hi|" + encodeURIComponent(targetLang);
    fetch(url)
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

    while ((node = walker.nextNode())) {
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

      if (lang === "en") {
        if (Object.prototype.hasOwnProperty.call(combinedEnMap, sourceText)) {
          var leading = (orig.match(/^\s*/) || [""])[0];
          var trailing = (orig.match(/\s*$/) || [""])[0];
          node.nodeValue = leading + combinedEnMap[sourceText] + trailing;
        } else if (/[\u0900-\u097F]/.test(sourceText)) {
          if (cache.en && Object.prototype.hasOwnProperty.call(cache.en, sourceText)) {
            var lEn = (orig.match(/^\s*/) || [""])[0];
            var tEn = (orig.match(/\s*$/) || [""])[0];
            node.nodeValue = lEn + cache.en[sourceText] + tEn;
          } else {
            (function (targetNode, srcStr, rawStr) {
              fetchFreeTranslation(srcStr, "en", function (enOut) {
                var l = (rawStr.match(/^\s*/) || [""])[0];
                var t = (rawStr.match(/\s*$/) || [""])[0];
                targetNode.nodeValue = l + enOut + t;
              });
            })(node, sourceText, orig);
          }
        }
      } else {
        if (cache[lang] && Object.prototype.hasOwnProperty.call(cache[lang], sourceText)) {
          var lOther = (orig.match(/^\s*/) || [""])[0];
          var tOther = (orig.match(/\s*$/) || [""])[0];
          node.nodeValue = lOther + cache[lang][sourceText] + tOther;
        } else if (/[\u0900-\u097F]/.test(sourceText) && sourceText.length <= 240) {
          (function (targetNode, srcStr, rawStr, targetLangCode) {
            fetchFreeTranslation(srcStr, targetLangCode, function (outStr) {
              var l = (rawStr.match(/^\s*/) || [""])[0];
              var t = (rawStr.match(/\s*$/) || [""])[0];
              targetNode.nodeValue = l + outStr + t;
            });
          })(node, sourceText, orig, lang);
        }
      }
    }
  }

  function runFullSmartSync() {
    var lang = syncDeviceLangToCache();
    document.documentElement.setAttribute("lang", lang);
    if (document.body) {
      document.body.setAttribute("data-vm-lang", lang);
    }
    translateWholePageSmartly(lang);
    applyCardNameAndParenthesesRule(lang);
    injectFormEnglishNotice();
    attachFormGuards();
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

  runFullSmartSync();
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", runFullSmartSync);
  }
  window.addEventListener("languagechange", runFullSmartSync);
  setTimeout(runFullSmartSync, 400);
  setTimeout(runFullSmartSync, 1400);

  if (typeof MutationObserver !== "undefined") {
    var obs = new MutationObserver(function () {
      runFullSmartSync();
    });
    var rootTarget = document.body || document.documentElement;
    if (rootTarget) {
      obs.observe(rootTarget, { childList: true, subtree: true });
    }
  }
})();
