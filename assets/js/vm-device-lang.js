/* === VM DEVICE LANGUAGE AUTO-SYNC (HI FOR HINDI DEVICES, EN FOR OTHER DEVICE LANGUAGES) === */
(function () {
  var STORAGE_KEY = "vm_preferred_lang_v1";

  function detectDeviceLang() {
    try {
      var saved = window.localStorage && window.localStorage.getItem(STORAGE_KEY);
      if (saved === "hi" || saved === "en") return saved;
    } catch (e) {}

    var list = [];
    if (Array.isArray(navigator.languages) && navigator.languages.length) {
      list = navigator.languages;
    } else if (navigator.language) {
      list = [navigator.language];
    }

    var primary = String(list[0] || "hi").toLowerCase().trim();
    return primary.indexOf("hi") === 0 ? "hi" : "en";
  }

  var exactMapEn = {
    "विश्वकर्मा म्यूज़िकल्स": "Vishwakarma Musicals",
    "होम": "Home",
    "वाद्य यंत्र": "Instruments",
    "वर्कशॉप व मरम्मत": "Workshop & Repair",
    "डाउनलोड": "Downloads",
    "हमारे बारे में": "About Us",
    "संपर्क व दुकान": "Contact & Shop",
    "कार्ट": "Cart",
    "🛒 कार्ट": "🛒 Cart",
    "अभी कॉल करें": "Call Now",
    "सीधे कॉल करें": "Call Directly",
    "वाद्य संग्रह": "Instrument Range",
    "कार्ट देखें →": "View Cart →",
    "❖ स्था. 1990 ❖": "❖ Est. 1990 ❖",
    "❖ मकान नं. 109, शाला मोहल्ला, अमानगंज ❖": "❖ House No. 109, Shala Mohalla, Amanganj ❖",
    "वर्कशॉप, ट्यूनिंग व मरम्मत सेवाएं": "Workshop, Tuning & Repair Services",
    "सभी मरम्मत व ट्यूनिंग कार्य अमानगंज कार्यशाला में स्वयं शिल्पकार तुलसी दास विश्वकर्मा द्वारा किए जाते हैं।": "All repair and tuning work is done at the Amanganj workshop by craftsman Tulsidas Vishwakarma."
  };

  var exactMapHi = {};
  Object.keys(exactMapEn).forEach(function (hiKey) {
    exactMapHi[exactMapEn[hiKey]] = hiKey;
  });

  function translateTextNodes(lang) {
    var dict = lang === "en" ? exactMapEn : exactMapHi;
    if (!document.body) return;

    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    var node;
    while ((node = walker.nextNode())) {
      var parent = node.parentElement;
      if (!parent) continue;
      if (parent.closest("script, style, noscript, textarea, input")) continue;
      if (parent.closest("#vm-ws-light-badge-v1315") && lang === "en") {
        // Keep exact English heritage/address badge text when on en
      }
      var raw = (node.nodeValue || "").replace(/\s+/g, " ").trim();
      if (!raw) continue;
      if (Object.prototype.hasOwnProperty.call(dict, raw)) {
        var leading = (node.nodeValue.match(/^\s*/) || [""])[0];
        var trailing = (node.nodeValue.match(/\s*$/) || [""])[0];
        node.nodeValue = leading + dict[raw] + trailing;
      }
    }
  }

  function applyDeviceLanguage() {
    var lang = detectDeviceLang();
    document.documentElement.setAttribute("lang", lang);
    document.body && document.body.setAttribute("data-vm-lang", lang);
    translateTextNodes(lang);
  }

  window.VMDeviceLang = {
    getLang: detectDeviceLang,
    setLang: function (nextLang) {
      if (nextLang !== "hi" && nextLang !== "en") return;
      try {
        window.localStorage && window.localStorage.setItem(STORAGE_KEY, nextLang);
      } catch (e) {}
      applyDeviceLanguage();
    }
  };

  applyDeviceLanguage();
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyDeviceLanguage);
  }
  setTimeout(applyDeviceLanguage, 300);
  setTimeout(applyDeviceLanguage, 1000);
})();
