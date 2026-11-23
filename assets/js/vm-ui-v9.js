(function() {
  if (window.__VM_UI_V9_LOADED__) return;
  window.__VM_UI_V9_LOADED__ = true;

  function formatTwoLineName(rawName) {
    var txt = String(rawName || "").trim();
    var match = txt.match(/^([^(]+?)\s*(\([^)]+\))\s*$/);
    if (match) {
      return '<span class="vm-two-line-title"><span class="vm-name-hi">' + match[1].trim() + '</span><span class="vm-name-en">' + match[2].trim() + '</span></span>';
    }
    return '<span class="vm-two-line-title"><span class="vm-name-hi">' + txt + '</span></span>';
  }
  window.vmFormatTwoLineName = formatTwoLineName;

  function applyDevicePreferences() {
    try {
      var lang = (navigator.language || "hi").toLowerCase();
      document.documentElement.setAttribute("data-device-lang", lang);
      var w = window.innerWidth || screen.width || 1280;
      if (w <= 480) {
        document.documentElement.style.fontSize = "15px";
      } else if (w <= 900) {
        document.documentElement.style.fontSize = "15.5px";
      } else {
        document.documentElement.style.fontSize = "16px";
      }
    } catch (e) {}
  }

  function enableFormAutocomplete() {
    var fields = document.querySelectorAll("input, textarea, select");
    fields.forEach(function(el) {
      if (el.hasAttribute("autocomplete")) return;
      var k = ((el.name || "") + " " + (el.id || "") + " " + (el.placeholder || "") + " " + (el.type || "")).toLowerCase();
      if (k.indexOf("name") !== -1 || k.indexOf("नाम") !== -1) {
        el.setAttribute("autocomplete", "name");
      } else if (k.indexOf("tel") !== -1 || k.indexOf("phone") !== -1 || k.indexOf("mobile") !== -1 || k.indexOf("मोबाइल") !== -1) {
        el.setAttribute("autocomplete", "tel");
      } else if (k.indexOf("email") !== -1 || k.indexOf("ईमेल") !== -1) {
        el.setAttribute("autocomplete", "email");
      } else if (k.indexOf("pin") !== -1 || k.indexOf("zip") !== -1 || k.indexOf("पिन") !== -1) {
        el.setAttribute("autocomplete", "postal-code");
      } else if (k.indexOf("address") !== -1 || k.indexOf("पता") !== -1) {
        el.setAttribute("autocomplete", "street-address");
      } else {
        el.setAttribute("autocomplete", "on");
      }
    });
  }

  function setupMobileLeftDrawer() {
    if (document.getElementById("vm-side-drawer")) return;
    var backdrop = document.createElement("div");
    backdrop.id = "vm-drawer-backdrop";
    backdrop.className = "vm-drawer-backdrop";

    var drawer = document.createElement("aside");
    drawer.id = "vm-side-drawer";
    drawer.className = "vm-side-drawer";
    drawer.setAttribute("aria-label", "मुख्य नेविगेशन मेन्यू");
    drawer.innerHTML =
      '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;border-bottom:1px solid rgba(253,224,71,0.3);padding-bottom:10px;">' +
      '<strong style="color:#fde047;font-size:15px;">विश्वकर्मा म्यूज़िकल्स</strong>' +
      '<button type="button" id="vm-drawer-close" aria-label="मेन्यू बंद करें" style="background:#fde047;color:#160a04;border:none;border-radius:6px;padding:4px 10px;font-weight:800;cursor:pointer;">✕</button>' +
      '</div>' +
      '<a href="index.html">होम (Home)</a>' +
      '<a href="instruments.html">वाद्ययंत्र (Instruments)</a>' +
      '<a href="catalog.html">लाइव कैटलॉग (Live Catalog)</a>' +
      '<a href="workshop.html">कार्यशाला व मरम्मत (Workshop)</a>' +
      '<a href="downloads.html">डाउनलोड व ब्रोशर (Downloads)</a>' +
      '<a href="about.html">हमारे बारे में (About)</a>' +
      '<a href="contact.html">संपर्क व पता (Contact)</a>' +
      '<hr style="border:0;border-top:1px solid rgba(253,224,71,0.2);margin:12px 0;">' +
      '<div style="font-size:13px;line-height:1.6;">' +
      '<div>📞 कॉल: <a href="tel:+919755088022" style="display:inline;padding:0;color:#fde047;">+91 97550 88022</a></div>' +
      '<div>✉️ info@vishwakarmamusicals.in</div>' +
      '</div>';

    document.body.appendChild(backdrop);
    document.body.appendChild(drawer);

    function openDrawer() {
      drawer.classList.add("open");
      backdrop.classList.add("open");
    }
    function closeDrawer() {
      drawer.classList.remove("open");
      backdrop.classList.remove("open");
    }

    backdrop.addEventListener("click", closeDrawer);
    var closeBtn = drawer.querySelector("#vm-drawer-close");
    if (closeBtn) closeBtn.addEventListener("click", closeDrawer);

    var header = document.querySelector("header, .site-header, .navbar");
    if (header && !header.querySelector(".vm-mobile-menu-btn")) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "vm-mobile-menu-btn";
      btn.setAttribute("aria-label", "मेन्यू खोलें");
      btn.textContent = "☰";
      btn.addEventListener("click", openDrawer);
      header.insertBefore(btn, header.firstChild);
    }
  }

  function applyTwoLineTitlesInDom() {
    var headings = document.querySelectorAll(".product-title, .card-title, h3.item-name, [data-role='product-title']");
    headings.forEach(function(el) {
      if (el.dataset.vmTwoLineDone === "1") return;
      var t = (el.textContent || "").trim();
      if (t.indexOf("(") !== -1 && t.indexOf(")") !== -1) {
        el.innerHTML = formatTwoLineName(t);
        el.dataset.vmTwoLineDone = "1";
      }
    });
  }

  function runAll() {
    applyDevicePreferences();
    enableFormAutocomplete();
    setupMobileLeftDrawer();
    applyTwoLineTitlesInDom();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", runAll);
  } else {
    runAll();
  }
  setTimeout(applyTwoLineTitlesInDom, 800);
  setTimeout(applyTwoLineTitlesInDom, 2000);
})();


/* === VM UI v9.1 RUNTIME: LEFT HAMBURGER DRAWER, TWO-LINE NAMES & MAP PLACEMENT === */
(function () {
  function ensureLeftHamburger() {
    var header = document.querySelector("header.site-header, header");
    if (!header) return;
    var inner = header.querySelector(".header-inner") || header.querySelector(".container") || header;
    if (document.getElementById("vm-left-hamburger-btn")) return;

    var btn = document.createElement("button");
    btn.id = "vm-left-hamburger-btn";
    btn.type = "button";
    btn.setAttribute("aria-label", "नेविगेशन मेन्यू खोलें");
    btn.innerHTML = "&#9776;";
    btn.style.cssText = "display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:10px;border:1.5px solid #e6b84d;background:#241107;color:#fcd777;font-size:1.25rem;cursor:pointer;flex-shrink:0;";

    var drawer = document.createElement("aside");
    drawer.id = "vm-left-nav-drawer";
    drawer.setAttribute("aria-label", "मुख्य मेन्यू");
    drawer.style.cssText = "position:fixed;top:0;left:-310px;width:290px;max-width:85vw;height:100vh;background:#160a04;color:#ffffff;border-right:2px solid #e6b84d;z-index:400;padding:20px;display:flex;flex-direction:column;gap:12px;transition:left 0.28s ease;overflow-y:auto;";

    var backdrop = document.createElement("div");
    backdrop.id = "vm-left-nav-backdrop";
    backdrop.style.cssText = "position:fixed;inset:0;background:rgba(0,0,0,0.65);z-index:390;display:none;";

    var links = [
      ["index.html", "होम"],
      ["instruments.html", "वाद्य यंत्र"],
      ["workshop.html", "वर्कशॉप व मरम्मत"],
      ["catalog.html", "कैटलॉग"],
      ["downloads.html", "डाउनलोड"],
      ["about.html", "हमारे बारे में"],
      ["contact.html", "संपर्क व दुकान"],
      ["privacy-policy.html", "गोपनीयता नीति"],
      ["terms-and-conditions.html", "नियम व शर्तें"],
      ["disclaimer.html", "अस्वीकरण"]
    ];

    var closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.textContent = "✕ बंद करें";
    closeBtn.style.cssText = "align-self:flex-end;background:#281409;color:#fcd777;border:1px solid #e6b84d;border-radius:999px;padding:6px 14px;cursor:pointer;font-weight:700;";

    drawer.appendChild(closeBtn);
    links.forEach(function (pair) {
      var a = document.createElement("a");
      a.href = pair[0];
      a.textContent = pair[1];
      a.style.cssText = "color:#f7eee4;text-decoration:none;padding:10px 12px;border-radius:8px;font-weight:600;border-bottom:1px solid rgba(230,184,77,0.18);";
      drawer.appendChild(a);
    });

    function openDrawer() {
      drawer.style.left = "0";
      backdrop.style.display = "block";
    }
    function closeDrawer() {
      drawer.style.left = "-310px";
      backdrop.style.display = "none";
    }

    btn.addEventListener("click", openDrawer);
    closeBtn.addEventListener("click", closeDrawer);
    backdrop.addEventListener("click", closeDrawer);

    inner.insertBefore(btn, inner.firstChild);
    document.body.appendChild(backdrop);
    document.body.appendChild(drawer);
  }

  function formatTwoLineNames() {
    document.querySelectorAll(".product-title, .card-title-two-line, h3.item-title").forEach(function (el) {
      el.classList.add("vm-two-line-title");
      var raw = (el.textContent || "").trim();
      var match = raw.match(/^([^(]+)\(([^)]+)\)$/);
      if (match && !el.querySelector(".vm-en-sub")) {
        var hiPart = match[1].trim();
        var enPart = "(" + match[2].trim() + ")";
        el.innerHTML = "<span style='display:block;'>" + hiPart + "</span><span class='vm-en-sub' style='display:block;font-size:0.88em;opacity:0.92;'>" + enPart + "</span>";
      }
    });
  }

  function placeMapUnderDirectContact() {
    var mapWrap = document.querySelector("[data-vm-map-block], #vm-google-map-box, iframe[src*='maps.google.com']");
    if (!mapWrap) return;
    var block = mapWrap.closest("div, section") || mapWrap;
    var headings = Array.from(document.querySelectorAll("h1, h2, h3, h4, section, div"));
    var target = headings.find(function (node) {
      return (node.textContent || "").indexOf("सीधा संपर्क व पता") !== -1;
    });
    if (target) {
      var container = target.closest("section") || target.parentElement;
      if (container && !container.contains(block)) {
        container.appendChild(block);
      }
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    ensureLeftHamburger();
    formatTwoLineNames();
    placeMapUnderDirectContact();
  });
})();


/* === VM UI v9.3 RUNTIME: SINGLE HAMBURGER, TWO-LINE HI/EN NAMES, CALL CTA & MAP FOOTER === */
(function () {
  function keepSingleHamburger() {
    var extraBtn = document.getElementById("vm-left-hamburger-btn");
    var extraDrawer = document.getElementById("vm-left-nav-drawer");
    var extraBackdrop = document.getElementById("vm-left-nav-backdrop");
    var allMenuTriggers = Array.from(document.querySelectorAll("button, a")).filter(function (el) {
      if (el === extraBtn) return false;
      var txt = (el.textContent || "").trim();
      var aria = (el.getAttribute("aria-label") || "").toLowerCase();
      var cls = (el.className || "").toString().toLowerCase();
      return txt === "☰" || aria.indexOf("menu") !== -1 || aria.indexOf("मेन्यू") !== -1 || cls.indexOf("hamburger") !== -1 || cls.indexOf("menu-toggle") !== -1 || cls.indexOf("nav-toggle") !== -1;
    });
    if (allMenuTriggers.length > 0) {
      if (extraBtn) extraBtn.remove();
      if (extraDrawer) extraDrawer.remove();
      if (extraBackdrop) extraBackdrop.remove();
    }
  }

  function splitTwoLinesHiEn() {
    var targets = document.querySelectorAll(".product-title, .card-title-two-line, h3.item-title, .vm-two-line-title, [class*='product-title']");
    targets.forEach(function (el) {
      if (el.dataset.vmSplitV93 === "1") return;
      var raw = (el.textContent || "").trim();
      if (!raw) return;
      var hi = raw;
      var en = "";
      var m = raw.match(/^([^(]+)\(([^)]+)\)(.*)$/);
      if (m) {
        hi = (m[1] + (m[3] || "")).trim();
        en = "(" + m[2].trim() + ")";
      } else {
        var splitIdx = raw.search(/[A-Za-z]/);
        if (splitIdx > 0) {
          hi = raw.slice(0, splitIdx).trim();
          en = raw.slice(splitIdx).trim();
        }
      }
      if (hi && en) {
        el.innerHTML = "<span class='vm-name-hi'>" + hi + "</span><span class='vm-name-en'>" + en + "</span>";
        el.dataset.vmSplitV93 = "1";
      }
    });
  }

  function tuneStickyCallCta() {
    var secondBtn = document.querySelector(".mobile-sticky-bar a:nth-child(2), .mobile-sticky-bar button:nth-child(2), .sticky-cta-bar a:nth-child(2), .sticky-cta-bar button:nth-child(2)");
    if (secondBtn) {
      if (secondBtn.tagName === "A") {
        secondBtn.href = "tel:+919755088022";
      }
      secondBtn.textContent = "सीधे कॉल करें";
    }
  }

  function placeMapBelowDirectContact() {
    var mapIframe = document.querySelector("iframe[src*='maps.google.com'], iframe[src*='google.com/maps']");
    if (!mapIframe) return;
    var mapWrap = mapIframe.closest(".vm-map-frame-wrap") || mapIframe.parentElement || mapIframe;
    var nodes = Array.from(document.querySelectorAll("h1, h2, h3, h4, section, div"));
    var target = nodes.find(function (n) {
      return (n.textContent || "").indexOf("सीधा संपर्क व पता") !== -1;
    });
    if (target) {
      var host = target.closest("section") || target.parentElement;
      if (host) {
        if (!host.contains(mapWrap)) {
          host.appendChild(mapWrap);
        }
        if (!host.querySelector(".vm-map-below-actions")) {
          var infoBox = document.createElement("div");
          infoBox.className = "vm-map-below-actions";
          infoBox.innerHTML =
            "<p style='margin:0 0 10px;color:#f5ede0;'>मकान नं. 109, वार्ड नं. 10, हरदौल मंदिर के बगल में, शाला मोहल्ला, अमानगंज, जिला पन्ना, म.प्र. 488441 | GSTIN: 23BSDPV5529B1ZV</p>" +
            "<div style='display:flex;gap:12px;justify-content:center;flex-wrap:wrap;'>" +
            "<a href='tel:+919755088022' class='btn' style='padding:10px 18px;border-radius:8px;background:#e6b84d;color:#1f1107;font-weight:700;text-decoration:none;'>📞 +91 97550 88022</a>" +
            "<a href='mailto:info@vishwakarmamusicals.in' class='btn' style='padding:10px 18px;border-radius:8px;background:#281409;color:#fcd777;border:1.5px solid #e6b84d;font-weight:700;text-decoration:none;'>✉️ info@vishwakarmamusicals.in</a>" +
            "</div>";
          host.appendChild(infoBox);
        }
      }
    }
  }

  function matchTrustSectionStyle() {
    var nodes = Array.from(document.querySelectorAll("section, div"));
    var trustEl = nodes.find(function (n) {
      var t = n.textContent || "";
      return t.indexOf("ग्राहक भरोसा, गुणवत्ता व कार्यशाला प्रमाण") !== -1 && n.tagName === "SECTION";
    });
    if (trustEl) {
      trustEl.classList.add("vm-trust-section");
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    keepSingleHamburger();
    splitTwoLinesHiEn();
    tuneStickyCallCta();
    placeMapBelowDirectContact();
    matchTrustSectionStyle();
  });
})();


/* === VM UI v9.5 RUNTIME: MOBILE HERO TOP BADGE CLEARANCE + ALL V9.4 FIXES === */
(function () {
  var waUrl = "https://wa.me/919755088022?text=" + encodeURIComponent("नमस्ते विश्वकर्मा म्यूज़िकल्स, मुझे वाद्य यंत्र / कार्यशाला के बारे में पूछना है।");

  function fixMobileHeroBadgeOffset() {
    if (window.innerWidth > 768) return;
    var header = document.querySelector("header.site-header, header");
    var headerHeight = header ? Math.ceil(header.getBoundingClientRect().height) : 64;
    var firstSec = document.querySelector("main > section:first-of-type, .hero-section, .hero-banner");
    if (firstSec) {
      var neededTop = Math.max(headerHeight + 16, 76);
      firstSec.style.paddingTop = neededTop + "px";
    }
    var candidates = Array.from(document.querySelectorAll("main > section:first-of-type span, main > section:first-of-type div, .hero-section span, .hero-section div"));
    candidates.forEach(function (el) {
      var rect = el.getBoundingClientRect();
      if (rect.height > 0 && rect.height < 52 && rect.top < headerHeight + 10) {
        var txt = (el.textContent || "").trim();
        if (txt.length > 0 && txt.length < 70 && el.children.length === 0) {
          el.style.position = "relative";
          el.style.zIndex = "6";
          el.style.marginTop = "10px";
        }
      }
    });
  }

  function removeDuplicateHamburger() {
    var extraBtn = document.getElementById("vm-left-hamburger-btn");
    var extraDrawer = document.getElementById("vm-left-nav-drawer");
    var extraBackdrop = document.getElementById("vm-left-nav-backdrop");
    if (extraBtn) extraBtn.remove();
    if (extraDrawer) extraDrawer.remove();
    if (extraBackdrop) extraBackdrop.remove();
  }

  function forceTwoLineNames() {
    var nodes = document.querySelectorAll(".product-title, .card-title-two-line, h3.item-title, .vm-two-line-title, [class*='product-title']");
    nodes.forEach(function (el) {
      var raw = (el.dataset.vmRawTitle || el.textContent || "").replace(/\s+/g, " ").trim();
      if (!raw) return;
      el.dataset.vmRawTitle = raw;

      var hi = "";
      var en = "";
      var m = raw.match(/^([^(]+)\(([^)]+)\)(.*)$/);
      if (m) {
        hi = (m[1] + " " + (m[3] || "")).replace(/\s+/g, " ").trim();
        en = "(" + m[2].trim() + ")";
      } else {
        var idx = raw.search(/[A-Za-z]/);
        if (idx > 0) {
          hi = raw.slice(0, idx).replace(/[-–—|•]+$/g, "").trim();
          en = raw.slice(idx).trim();
        }
      }

      if (hi && en) {
        el.innerHTML = "<span class='vm-name-hi'>" + hi + "</span><span class='vm-name-en'>" + en + "</span>";
      }
    });
  }

  function setStickyWhatsappCta() {
    var secondBtn = document.querySelector(".mobile-sticky-bar a:nth-child(2), .mobile-sticky-bar button:nth-child(2), .sticky-cta-bar a:nth-child(2), .sticky-cta-bar button:nth-child(2)");
    if (secondBtn) {
      if (secondBtn.tagName === "A") {
        secondBtn.href = waUrl;
        secondBtn.target = "_blank";
        secondBtn.rel = "noopener noreferrer";
      }
      secondBtn.innerHTML = "💬 Whatsapp पर पूछें";
    }
  }

  function formatDirectContactMapAndButtons() {
    var mapIframe = document.querySelector("iframe[src*='maps.google.com'], iframe[src*='google.com/maps']");
    if (!mapIframe) return;
    var mapWrap = mapIframe.closest(".vm-map-frame-wrap") || mapIframe.parentElement || mapIframe;
    mapWrap.classList.add("vm-map-frame-wrap");

    var nodes = Array.from(document.querySelectorAll("h1, h2, h3, h4, section, div"));
    var target = nodes.find(function (n) {
      return (n.textContent || "").indexOf("सीधा संपर्क व पता") !== -1;
    });
    if (!target) return;
    var host = target.closest("section") || target.parentElement;
    if (!host) return;

    if (!host.contains(mapWrap)) {
      host.appendChild(mapWrap);
    }

    var oldBox = host.querySelector(".vm-map-below-actions");
    if (oldBox) oldBox.remove();

    var infoBox = document.createElement("div");
    infoBox.className = "vm-map-below-actions";
    infoBox.innerHTML =
      "<p style='margin:0 0 6px;color:#f5ede0;'>मकान नं. 109, वार्ड नं. 10, हरदौल मंदिर के बगल में, शाला मोहल्ला, अमानगंज, जिला पन्ना, म.प्र. 488441 | GSTIN: 23BSDPV5529B1ZV</p>" +
      "<div class='vm-map-top-row'>" +
        "<a href='tel:+919755088022' class='btn' style='padding:10px 18px;border-radius:8px;background:#e6b84d;color:#1f1107;font-weight:700;text-decoration:none;'>📞 +91 97550 88022</a>" +
        "<a href='" + waUrl + "' target='_blank' rel='noopener noreferrer' class='btn' style='padding:10px 18px;border-radius:8px;background:#1f5c36;color:#ffffff;border:1.5px solid #5ad488;font-weight:700;text-decoration:none;'>💬 Whatsapp पर पूछें</a>" +
      "</div>" +
      "<div class='vm-map-bottom-row'>" +
        "<a href='mailto:info@vishwakarmamusicals.in' class='btn' style='padding:10px 20px;border-radius:8px;background:#281409;color:#fcd777;border:1.5px solid #e6b84d;font-weight:700;text-decoration:none;'>✉️ info@vishwakarmamusicals.in</a>" +
      "</div>";
    host.appendChild(infoBox);
  }

  function fixTrustHeadingAndButtons() {
    var sections = Array.from(document.querySelectorAll("section, div"));
    var trustSec = sections.find(function (n) {
      var t = n.textContent || "";
      return t.indexOf("विश्वकर्मा म्यूज़िकल्स - ग्राहक भरोसा, गुणवत्ता व कार्यशाला प्रमाण") !== -1 && n.tagName === "SECTION";
    });
    if (!trustSec) return;
    trustSec.classList.add("vm-trust-section");

    var headings = Array.from(trustSec.querySelectorAll("h1, h2, h3, h4, p, div"));
    var titleEl = headings.find(function (el) {
      return (el.textContent || "").indexOf("विश्वकर्मा म्यूज़िकल्स - ग्राहक भरोसा, गुणवत्ता व कार्यशाला प्रमाण") !== -1 && el.children.length === 0;
    });
    if (titleEl) {
      titleEl.style.color = "#fcd777";
      titleEl.style.textAlign = "center";
      titleEl.style.opacity = "1";
      titleEl.style.visibility = "visible";
      titleEl.style.fontWeight = "700";
    }

    var btns = Array.from(trustSec.querySelectorAll("a.btn, button.btn, a[href^='tel:'], a[href^='https://wa.me/']"));
    if (btns.length >= 2 && !trustSec.querySelector(".vm-trust-bottom-cta-row")) {
      var row = document.createElement("div");
      row.className = "vm-trust-bottom-cta-row";
      var lastTwo = btns.slice(-2);
      lastTwo.forEach(function (b) {
        row.appendChild(b);
      });
      trustSec.appendChild(row);
    }
  }

  function runAll() {
    fixMobileHeroBadgeOffset();
    removeDuplicateHamburger();
    forceTwoLineNames();
    setStickyWhatsappCta();
    formatDirectContactMapAndButtons();
    fixTrustHeadingAndButtons();
  }

  document.addEventListener("DOMContentLoaded", function () {
    runAll();
    setTimeout(runAll, 600);
    setTimeout(runAll, 1500);
  });
  window.addEventListener("resize", fixMobileHeroBadgeOffset);
})();


/* === VM UI v9.6 RUNTIME: ENFORCE 100% ZOOM + ALL V9.5 FIXES === */
(function () {
  var waUrl = "https://wa.me/919755088022?text=" + encodeURIComponent("नमस्ते विश्वकर्मा म्यूज़िकल्स, मुझे वाद्य यंत्र / कार्यशाला के बारे में पूछना है।");

  function enforceHundredPercentZoom() {
    document.documentElement.style.zoom = "100%";
    document.documentElement.style.transform = "none";
    if (document.body) {
      document.body.style.zoom = "100%";
      document.body.style.transform = "none";
    }
  }

  function fixMobileHeroBadgeOffset() {
    if (window.innerWidth > 768) return;
    var header = document.querySelector("header.site-header, header");
    var headerHeight = header ? Math.ceil(header.getBoundingClientRect().height) : 64;
    var firstSec = document.querySelector("main > section:first-of-type, .hero-section, .hero-banner");
    if (firstSec) {
      var neededTop = Math.max(headerHeight + 16, 76);
      firstSec.style.paddingTop = neededTop + "px";
    }
    var candidates = Array.from(document.querySelectorAll("main > section:first-of-type span, main > section:first-of-type div, .hero-section span, .hero-section div"));
    candidates.forEach(function (el) {
      var rect = el.getBoundingClientRect();
      if (rect.height > 0 && rect.height < 52 && rect.top < headerHeight + 10) {
        var txt = (el.textContent || "").trim();
        if (txt.length > 0 && txt.length < 70 && el.children.length === 0) {
          el.style.position = "relative";
          el.style.zIndex = "6";
          el.style.marginTop = "10px";
        }
      }
    });
  }

  function removeDuplicateHamburger() {
    var extraBtn = document.getElementById("vm-left-hamburger-btn");
    var extraDrawer = document.getElementById("vm-left-nav-drawer");
    var extraBackdrop = document.getElementById("vm-left-nav-backdrop");
    if (extraBtn) extraBtn.remove();
    if (extraDrawer) extraDrawer.remove();
    if (extraBackdrop) extraBackdrop.remove();
  }

  function forceTwoLineNames() {
    var nodes = document.querySelectorAll(".product-title, .card-title-two-line, h3.item-title, .vm-two-line-title, [class*='product-title']");
    nodes.forEach(function (el) {
      var raw = (el.dataset.vmRawTitle || el.textContent || "").replace(/\s+/g, " ").trim();
      if (!raw) return;
      el.dataset.vmRawTitle = raw;

      var hi = "";
      var en = "";
      var m = raw.match(/^([^(]+)\(([^)]+)\)(.*)$/);
      if (m) {
        hi = (m[1] + " " + (m[3] || "")).replace(/\s+/g, " ").trim();
        en = "(" + m[2].trim() + ")";
      } else {
        var idx = raw.search(/[A-Za-z]/);
        if (idx > 0) {
          hi = raw.slice(0, idx).replace(/[-–—|•]+$/g, "").trim();
          en = raw.slice(idx).trim();
        }
      }

      if (hi && en) {
        el.innerHTML = "<span class='vm-name-hi'>" + hi + "</span><span class='vm-name-en'>" + en + "</span>";
      }
    });
  }

  function setStickyWhatsappCta() {
    var secondBtn = document.querySelector(".mobile-sticky-bar a:nth-child(2), .mobile-sticky-bar button:nth-child(2), .sticky-cta-bar a:nth-child(2), .sticky-cta-bar button:nth-child(2)");
    if (secondBtn) {
      if (secondBtn.tagName === "A") {
        secondBtn.href = waUrl;
        secondBtn.target = "_blank";
        secondBtn.rel = "noopener noreferrer";
      }
      secondBtn.innerHTML = "💬 Whatsapp पर पूछें";
    }
  }

  function formatDirectContactMapAndButtons() {
    var mapIframe = document.querySelector("iframe[src*='maps.google.com'], iframe[src*='google.com/maps']");
    if (!mapIframe) return;
    var mapWrap = mapIframe.closest(".vm-map-frame-wrap") || mapIframe.parentElement || mapIframe;
    mapWrap.classList.add("vm-map-frame-wrap");

    var nodes = Array.from(document.querySelectorAll("h1, h2, h3, h4, section, div"));
    var target = nodes.find(function (n) {
      return (n.textContent || "").indexOf("सीधा संपर्क व पता") !== -1;
    });
    if (!target) return;
    var host = target.closest("section") || target.parentElement;
    if (!host) return;

    if (!host.contains(mapWrap)) {
      host.appendChild(mapWrap);
    }

    var oldBox = host.querySelector(".vm-map-below-actions");
    if (oldBox) oldBox.remove();

    var infoBox = document.createElement("div");
    infoBox.className = "vm-map-below-actions";
    infoBox.innerHTML =
      "<p style='margin:0 0 6px;color:#f5ede0;'>मकान नं. 109, वार्ड नं. 10, हरदौल मंदिर के बगल में, शाला मोहल्ला, अमानगंज, जिला पन्ना, म.प्र. 488441 | GSTIN: 23BSDPV5529B1ZV</p>" +
      "<div class='vm-map-top-row'>" +
        "<a href='tel:+919755088022' class='btn' style='padding:10px 18px;border-radius:8px;background:#e6b84d;color:#1f1107;font-weight:700;text-decoration:none;'>📞 +91 97550 88022</a>" +
        "<a href='" + waUrl + "' target='_blank' rel='noopener noreferrer' class='btn' style='padding:10px 18px;border-radius:8px;background:#1f5c36;color:#ffffff;border:1.5px solid #5ad488;font-weight:700;text-decoration:none;'>💬 Whatsapp पर पूछें</a>" +
      "</div>" +
      "<div class='vm-map-bottom-row'>" +
        "<a href='mailto:info@vishwakarmamusicals.in' class='btn' style='padding:10px 20px;border-radius:8px;background:#281409;color:#fcd777;border:1.5px solid #e6b84d;font-weight:700;text-decoration:none;'>✉️ info@vishwakarmamusicals.in</a>" +
      "</div>";
    host.appendChild(infoBox);
  }

  function fixTrustHeadingAndButtons() {
    var sections = Array.from(document.querySelectorAll("section, div"));
    var trustSec = sections.find(function (n) {
      var t = n.textContent || "";
      return t.indexOf("विश्वकर्मा म्यूज़िकल्स - ग्राहक भरोसा, गुणवत्ता व कार्यशाला प्रमाण") !== -1 && n.tagName === "SECTION";
    });
    if (!trustSec) return;
    trustSec.classList.add("vm-trust-section");

    var headings = Array.from(trustSec.querySelectorAll("h1, h2, h3, h4, p, div"));
    var titleEl = headings.find(function (el) {
      return (el.textContent || "").indexOf("विश्वकर्मा म्यूज़िकल्स - ग्राहक भरोसा, गुणवत्ता व कार्यशाला प्रमाण") !== -1 && el.children.length === 0;
    });
    if (titleEl) {
      titleEl.style.color = "#fcd777";
      titleEl.style.textAlign = "center";
      titleEl.style.opacity = "1";
      titleEl.style.visibility = "visible";
      titleEl.style.fontWeight = "700";
    }

    var btns = Array.from(trustSec.querySelectorAll("a.btn, button.btn, a[href^='tel:'], a[href^='https://wa.me/']"));
    if (btns.length >= 2 && !trustSec.querySelector(".vm-trust-bottom-cta-row")) {
      var row = document.createElement("div");
      row.className = "vm-trust-bottom-cta-row";
      var lastTwo = btns.slice(-2);
      lastTwo.forEach(function (b) {
        row.appendChild(b);
      });
      trustSec.appendChild(row);
    }
  }

  function runAll() {
    enforceHundredPercentZoom();
    fixMobileHeroBadgeOffset();
    removeDuplicateHamburger();
    forceTwoLineNames();
    setStickyWhatsappCta();
    formatDirectContactMapAndButtons();
    fixTrustHeadingAndButtons();
  }

  document.addEventListener("DOMContentLoaded", function () {
    runAll();
    setTimeout(runAll, 600);
    setTimeout(runAll, 1500);
  });
  window.addEventListener("resize", function () {
    enforceHundredPercentZoom();
    fixMobileHeroBadgeOffset();
  });
})();


/* === VM UI v9.7 RUNTIME: 3D BUTTONS, TRUST TOP BADGE & UNIFORM SECTION LOOK === */
(function () {
  var waUrl = "https://wa.me/919755088022?text=" + encodeURIComponent("नमस्ते विश्वकर्मा म्यूज़िकल्स, मुझे वाद्य यंत्र / कार्यशाला के बारे में पूछना है।");

  function enforceHundredPercentZoom() {
    document.documentElement.style.zoom = "100%";
    document.documentElement.style.transform = "none";
    if (document.body) {
      document.body.style.zoom = "100%";
      document.body.style.transform = "none";
    }
  }

  function fixMobileHeroBadgeOffset() {
    if (window.innerWidth > 768) return;
    var header = document.querySelector("header.site-header, header");
    var headerHeight = header ? Math.ceil(header.getBoundingClientRect().height) : 64;
    var firstSec = document.querySelector("main > section:first-of-type, .hero-section, .hero-banner");
    if (firstSec) {
      var neededTop = Math.max(headerHeight + 16, 76);
      firstSec.style.paddingTop = neededTop + "px";
    }
    var candidates = Array.from(document.querySelectorAll("main > section:first-of-type span, main > section:first-of-type div, .hero-section span, .hero-section div"));
    candidates.forEach(function (el) {
      var rect = el.getBoundingClientRect();
      if (rect.height > 0 && rect.height < 52 && rect.top < headerHeight + 10) {
        var txt = (el.textContent || "").trim();
        if (txt.length > 0 && txt.length < 70 && el.children.length === 0) {
          el.style.position = "relative";
          el.style.zIndex = "6";
          el.style.marginTop = "10px";
        }
      }
    });
  }

  function removeDuplicateHamburger() {
    var extraBtn = document.getElementById("vm-left-hamburger-btn");
    var extraDrawer = document.getElementById("vm-left-nav-drawer");
    var extraBackdrop = document.getElementById("vm-left-nav-backdrop");
    if (extraBtn) extraBtn.remove();
    if (extraDrawer) extraDrawer.remove();
    if (extraBackdrop) extraBackdrop.remove();
  }

  function forceTwoLineNames() {
    var nodes = document.querySelectorAll(".product-title, .card-title-two-line, h3.item-title, .vm-two-line-title, [class*='product-title']");
    nodes.forEach(function (el) {
      var raw = (el.dataset.vmRawTitle || el.textContent || "").replace(/\s+/g, " ").trim();
      if (!raw) return;
      el.dataset.vmRawTitle = raw;

      var hi = "";
      var en = "";
      var m = raw.match(/^([^(]+)\(([^)]+)\)(.*)$/);
      if (m) {
        hi = (m[1] + " " + (m[3] || "")).replace(/\s+/g, " ").trim();
        en = "(" + m[2].trim() + ")";
      } else {
        var idx = raw.search(/[A-Za-z]/);
        if (idx > 0) {
          hi = raw.slice(0, idx).replace(/[-–—|•]+$/g, "").trim();
          en = raw.slice(idx).trim();
        }
      }

      if (hi && en) {
        el.innerHTML = "<span class='vm-name-hi'>" + hi + "</span><span class='vm-name-en'>" + en + "</span>";
      }
    });
  }

  function setStickyWhatsappCta() {
    var secondBtn = document.querySelector(".mobile-sticky-bar a:nth-child(2), .mobile-sticky-bar button:nth-child(2), .sticky-cta-bar a:nth-child(2), .sticky-cta-bar button:nth-child(2)");
    if (secondBtn) {
      if (secondBtn.tagName === "A") {
        secondBtn.href = waUrl;
        secondBtn.target = "_blank";
        secondBtn.rel = "noopener noreferrer";
      }
      secondBtn.classList.add("vm-3d-btn");
      secondBtn.innerHTML = "💬 Whatsapp पर पूछें";
    }
  }

  function formatDirectContactMapAndButtons() {
    var mapIframe = document.querySelector("iframe[src*='maps.google.com'], iframe[src*='google.com/maps']");
    if (!mapIframe) return;
    var mapWrap = mapIframe.closest(".vm-map-frame-wrap") || mapIframe.parentElement || mapIframe;
    mapWrap.classList.add("vm-map-frame-wrap");

    var nodes = Array.from(document.querySelectorAll("h1, h2, h3, h4, section, div"));
    var target = nodes.find(function (n) {
      return (n.textContent || "").indexOf("सीधा संपर्क व पता") !== -1;
    });
    if (!target) return;
    var host = target.closest("section") || target.parentElement;
    if (!host) return;

    if (!host.contains(mapWrap)) {
      host.appendChild(mapWrap);
    }

    var oldBox = host.querySelector(".vm-map-below-actions");
    if (oldBox) oldBox.remove();

    var infoBox = document.createElement("div");
    infoBox.className = "vm-map-below-actions";
    infoBox.innerHTML =
      "<p style='margin:0 0 6px;color:#fff8ee;'>मकान नं. 109, वार्ड नं. 10, हरदौल मंदिर के बगल में, शाला मोहल्ला, अमानगंज, जिला पन्ना, म.प्र. 488441 | GSTIN: 23BSDPV5529B1ZV</p>" +
      "<div class='vm-map-top-row'>" +
        "<a href='tel:+919755088022' class='btn vm-3d-btn'>📞 +91 97550 88022</a>" +
        "<a href='" + waUrl + "' target='_blank' rel='noopener noreferrer' class='btn vm-3d-btn'>💬 Whatsapp पर पूछें</a>" +
      "</div>" +
      "<div class='vm-map-bottom-row'>" +
        "<a href='mailto:info@vishwakarmamusicals.in' class='btn vm-3d-btn'>✉️ info@vishwakarmamusicals.in</a>" +
      "</div>";
    host.appendChild(infoBox);
  }

  function fixTrustSectionBadgeButtonsAndLook() {
    var sections = Array.from(document.querySelectorAll("section, div"));
    var trustSec = sections.find(function (n) {
      var t = n.textContent || "";
      return t.indexOf("विश्वकर्मा म्यूज़िकल्स - ग्राहक भरोसा, गुणवत्ता व कार्यशाला प्रमाण") !== -1 && n.tagName === "SECTION";
    });
    if (!trustSec) return;
    trustSec.classList.add("vm-trust-section");

    if (!trustSec.querySelector(".vm-section-top-badge")) {
      var badge = document.createElement("div");
      badge.className = "vm-section-top-badge";
      badge.textContent = "✦ ग्राहक भरोसा व कार्यशाला प्रमाण ✦";
      trustSec.insertBefore(badge, trustSec.firstChild);
    }

    var headings = Array.from(trustSec.querySelectorAll("h1, h2, h3, h4, p, div"));
    var titleEl = headings.find(function (el) {
      return (el.textContent || "").indexOf("विश्वकर्मा म्यूज़िकल्स - ग्राहक भरोसा, गुणवत्ता व कार्यशाला प्रमाण") !== -1 && el.children.length === 0;
    });
    if (titleEl) {
      titleEl.style.color = "#fcd777";
      titleEl.style.textAlign = "center";
      titleEl.style.opacity = "1";
      titleEl.style.visibility = "visible";
      titleEl.style.fontWeight = "700";
    }

    var btns = Array.from(trustSec.querySelectorAll("a.btn, button.btn, a[href^='tel:'], a[href^='https://wa.me/']"));
    btns.forEach(function (b) {
      b.classList.add("vm-3d-btn");
    });

    if (btns.length >= 2 && !trustSec.querySelector(".vm-trust-bottom-cta-row")) {
      var row = document.createElement("div");
      row.className = "vm-trust-bottom-cta-row";
      var lastTwo = btns.slice(-2);
      lastTwo.forEach(function (b) {
        row.appendChild(b);
      });
      trustSec.appendChild(row);
    }
  }

  function runAll() {
    enforceHundredPercentZoom();
    fixMobileHeroBadgeOffset();
    removeDuplicateHamburger();
    forceTwoLineNames();
    setStickyWhatsappCta();
    formatDirectContactMapAndButtons();
    fixTrustSectionBadgeButtonsAndLook();
  }

  document.addEventListener("DOMContentLoaded", function () {
    runAll();
    setTimeout(runAll, 600);
    setTimeout(runAll, 1500);
  });
  window.addEventListener("resize", function () {
    enforceHundredPercentZoom();
    fixMobileHeroBadgeOffset();
  });
})();


/* === VM UI v9.8 RUNTIME: ENFORCE HIGH-CONTRAST BADGES & SQUARE NEW BUTTONS === */
(function () {
  function applyBadgeContrastAndSquareButtons() {
    document.querySelectorAll(".category-badge, .cat-badge, .badge-category, [class*='category-badge'], [class*='cat-badge'], .product-card .badge, .instrument-card .badge").forEach(function (el) {
      el.style.background = "linear-gradient(180deg, #3b180c 0%, #240e06 100%)";
      el.style.color = "#ffe89e";
      el.style.border = "1.5px solid #e6b84d";
      el.style.fontWeight = "700";
    });

    document.querySelectorAll(".vm-3d-btn, .vm-map-below-actions a, #vm-customer-trust-hub a.btn, #vm-customer-trust-hub button.btn, .vm-trust-section a, .vm-trust-section button, .mobile-sticky-bar a:nth-child(2), .mobile-sticky-bar .btn:nth-child(2)").forEach(function (btn) {
      btn.style.borderRadius = "0px";
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    applyBadgeContrastAndSquareButtons();
    setTimeout(applyBadgeContrastAndSquareButtons, 600);
    setTimeout(applyBadgeContrastAndSquareButtons, 1500);
  });
})();


/* === VM UI v9.9 RUNTIME: ROUND NEW BUTTONS/BADGES & RESTORE LIGHT READABLE TRUST CARDS === */
(function () {
  function fixRoundedAndTrustCards() {
    document.querySelectorAll(".vm-3d-btn, .vm-map-below-actions a, #vm-customer-trust-hub a.btn, #vm-customer-trust-hub button.btn, .vm-trust-section a, .vm-trust-section button, .mobile-sticky-bar a:nth-child(2), .mobile-sticky-bar .btn:nth-child(2), .vm-section-top-badge, .category-badge, .cat-badge, .badge-category").forEach(function (el) {
      el.style.borderRadius = "999px";
    });

    document.querySelectorAll("#vm-customer-trust-hub .card, #vm-customer-trust-hub [class*='card'], .vm-trust-section .card, .vm-trust-section [class*='card']").forEach(function (card) {
      card.style.background = "#fffdf8";
      card.style.color = "#1f1107";
      card.style.border = "1.5px solid #e6b84d";
      card.style.borderRadius = "12px";
      card.querySelectorAll("*").forEach(function (child) {
        if (!child.classList.contains("vm-3d-btn")) {
          child.style.color = "#1f1107";
          child.style.opacity = "1";
          child.style.visibility = "visible";
        }
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    fixRoundedAndTrustCards();
    setTimeout(fixRoundedAndTrustCards, 600);
    setTimeout(fixRoundedAndTrustCards, 1500);
  });
})();


/* === VM UI v9.10 RUNTIME: SINGLE-ROW MOBILE HEADER & DYNAMIC TOP-BAR CLEARANCE === */
(function () {
  function alignMobileHeaderSingleRow() {
    if (window.innerWidth > 768) return;
    var header = document.querySelector("header.site-header, header");
    if (!header) return;

    var menuBtn = Array.from(header.querySelectorAll("button, a")).find(function (el) {
      var txt = (el.textContent || "").trim();
      var cls = (el.className || "").toString().toLowerCase();
      var aria = (el.getAttribute("aria-label") || "").toLowerCase();
      return txt === "☰" || cls.indexOf("hamburger") !== -1 || cls.indexOf("menu-toggle") !== -1 || aria.indexOf("menu") !== -1;
    });

    var cartEl = Array.from(header.querySelectorAll("a, button")).find(function (el) {
      if (el === menuBtn) return false;
      var txt = (el.textContent || "").trim();
      var cls = (el.className || "").toString().toLowerCase();
      return txt.indexOf("कार्ट") !== -1 || cls.indexOf("cart") !== -1;
    });

    var logoEl = Array.from(header.querySelectorAll("a, div, span")).find(function (el) {
      if (el === menuBtn || el === cartEl) return false;
      if (menuBtn && menuBtn.contains(el)) return false;
      if (cartEl && cartEl.contains(el)) return false;
      var txt = (el.textContent || "").trim();
      return txt.indexOf("विश्वकर्मा म्यूज़िकल्स") !== -1 && el.querySelector("img");
    });

    var row = header.querySelector("#vm-mobile-single-row-bar");
    if (!row) {
      row = document.createElement("div");
      row.id = "vm-mobile-single-row-bar";
      row.style.display = "flex";
      row.style.flexDirection = "row";
      row.style.alignItems = "center";
      row.style.justifyContent = "space-between";
      row.style.flexWrap = "nowrap";
      row.style.gap = "8px";
      row.style.width = "100%";
    }

    if (menuBtn && !row.contains(menuBtn)) row.appendChild(menuBtn);
    if (logoEl && !row.contains(logoEl)) row.appendChild(logoEl);
    if (cartEl && !row.contains(cartEl)) row.appendChild(cartEl);

    if (row.children.length > 0 && row.parentElement !== header) {
      header.innerHTML = "";
      header.appendChild(row);
    }

    var h = Math.ceil(header.getBoundingClientRect().height) || 58;
    document.body.style.paddingTop = (h + 10) + "px";
  }

  document.addEventListener("DOMContentLoaded", function () {
    alignMobileHeaderSingleRow();
    setTimeout(alignMobileHeaderSingleRow, 400);
    setTimeout(alignMobileHeaderSingleRow, 1200);
  });
  window.addEventListener("resize", alignMobileHeaderSingleRow);
})();


/* === VM UI v9.11 RUNTIME: KEEP ONLY 3 SMALL TRUST CARDS, HI/EN ROWS, SINGLE-LINE EN & DARK BADGES === */
(function () {
  function applyV911Runtime() {
    document.querySelectorAll(".category-badge, .cat-badge, .badge-category, [class*='category-badge'], [class*='cat-badge'], .product-card .badge, .instrument-card .badge").forEach(function (el) {
      el.style.background = "#240e06";
      el.style.backgroundColor = "#240e06";
      el.style.color = "#ffffff";
      el.style.border = "1.5px solid #e6b84d";
      el.style.fontWeight = "700";
    });

    document.querySelectorAll(".vm-name-en").forEach(function (enEl) {
      enEl.style.display = "block";
      enEl.style.whiteSpace = "nowrap";
      enEl.style.fontSize = window.innerWidth <= 768 ? "11px" : "0.72em";
    });

    var trustSec = Array.from(document.querySelectorAll("section, div")).find(function (n) {
      var t = n.textContent || "";
      return t.indexOf("विश्वकर्मा म्यूज़िकल्स - ग्राहक भरोसा, गुणवत्ता व कार्यशाला प्रमाण") !== -1 && n.tagName === "SECTION";
    });

    if (trustSec && !trustSec.dataset.vmV911Done) {
      trustSec.dataset.vmV911Done = "1";
      var cards = Array.from(trustSec.querySelectorAll(".card, [class*='card'], div[style*='border']"));
      var smallCards = cards.filter(function (c) {
        var txt = (c.textContent || "").trim();
        return txt.length > 0 && txt.length < 240 && c.querySelectorAll("a, button").length === 0;
      }).slice(0, 3);

      if (smallCards.length === 3) {
        var row = document.createElement("div");
        row.className = "vm-trust-small-cards-row";
        var parentRef = smallCards[0].parentElement;
        smallCards.forEach(function (sc) {
          sc.classList.add("vm-trust-small-card");
          row.appendChild(sc);
        });
        if (parentRef) {
          parentRef.insertBefore(row, parentRef.firstChild);
        }
      }

      Array.from(trustSec.querySelectorAll("div")).forEach(function (d) {
        if (d.classList.contains("vm-trust-small-cards-row") || d.classList.contains("vm-trust-small-card") || d.classList.contains("vm-trust-bottom-cta-row") || d.classList.contains("vm-section-top-badge")) return;
        if (d.closest(".vm-trust-small-card")) return;
        d.style.background = "transparent";
        d.style.border = "none";
        d.style.boxShadow = "none";
      });
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    applyV911Runtime();
    setTimeout(applyV911Runtime, 500);
    setTimeout(applyV911Runtime, 1400);
  });
  window.addEventListener("resize", applyV911Runtime);
})();


/* === VM UI v9.12 RUNTIME: REBUILD TRUST SECTION CLEANLY IN PROPER ORDER === */
(function () {
  function rebuildTrustSectionCleanly() {
    var trustSec = Array.from(document.querySelectorAll("section, div")).find(function (n) {
      var t = n.textContent || "";
      return t.indexOf("विश्वकर्मा म्यूज़िकल्स - ग्राहक भरोसा, गुणवत्ता व कार्यशाला प्रमाण") !== -1 && n.tagName === "SECTION";
    });
    if (!trustSec) return;

    var allBoxes = Array.from(trustSec.querySelectorAll("div, article, li"));
    var proofTitles = ["1990 से हस्तनिर्मित परंपरा", "सत्यापित GSTIN व MSME पंजीकरण", "सुरक्षित HDFC बैंक / UPI सत्यापन", "Delhivery One कूरियर व 6 माह वारंटी"];

    var smallCards = proofTitles.map(function (pt) {
      var matchEl = allBoxes.find(function (el) {
        if (el === trustSec || el.classList.contains("vm-trust-clean-wrap") || el.classList.contains("vm-trust-cards-grid")) return false;
        var txt = (el.textContent || "").trim();
        return txt.indexOf(pt) !== -1 && txt.length < 340 && el.querySelectorAll("a, button").length === 0 && el.querySelectorAll("h2").length === 0;
      });
      return matchEl;
    }).filter(Boolean);

    var buttons = Array.from(trustSec.querySelectorAll("a, button")).filter(function (b) {
      var txt = (b.textContent || "").trim();
      return txt.indexOf("लाइव कैटलॉग देखें") !== -1 || txt.indexOf("कैटलॉग व ब्रोशर डाउनलोड करें") !== -1;
    });

    var cleanWrap = document.createElement("div");
    cleanWrap.className = "vm-trust-clean-wrap";

    var badge = document.createElement("div");
    badge.className = "vm-section-top-badge";
    badge.textContent = "✦ ग्राहक भरोसा व कार्यशाला प्रमाण ✦";
    cleanWrap.appendChild(badge);

    var heading = document.createElement("h2");
    heading.className = "vm-trust-heading";
    heading.textContent = "विश्वकर्मा म्यूज़िकल्स - ग्राहक भरोसा, गुणवत्ता व कार्यशाला प्रमाण (Est. 1990)";
    cleanWrap.appendChild(heading);

    var meta = document.createElement("p");
    meta.className = "vm-trust-meta-line";
    meta.innerHTML = "प्रोप्राइटर: तुलसी दास विश्वकर्मा | 35+ वर्षों का अनुभव | अमानगंज, जिला पन्ना (म.प्र.) 488441 | सीधा कॉल: <strong>+91 97550 88022</strong> | ईमेल: <strong>info@vishwakarmamusicals.in</strong>";
    cleanWrap.appendChild(meta);

    if (smallCards.length > 0) {
      var grid = document.createElement("div");
      grid.className = "vm-trust-cards-grid";
      smallCards.forEach(function (sc) {
        sc.className = "vm-trust-small-card";
        sc.removeAttribute("style");
        grid.appendChild(sc);
      });
      cleanWrap.appendChild(grid);
    }

    var rating = document.createElement("p");
    rating.className = "vm-trust-rating-plain";
    rating.textContent = "Google रेटिंग: 5.0 ★ (12+ सत्यापित ग्राहक समीक्षाएं)";
    cleanWrap.appendChild(rating);

    if (buttons.length > 0) {
      var btnRow = document.createElement("div");
      btnRow.className = "vm-trust-bottom-cta-row";
      buttons.forEach(function (b) {
        b.classList.add("vm-3d-btn");
        btnRow.appendChild(b);
      });
      cleanWrap.appendChild(btnRow);
    }

    trustSec.innerHTML = "";
    trustSec.appendChild(cleanWrap);
  }

  document.addEventListener("DOMContentLoaded", function () {
    rebuildTrustSectionCleanly();
    setTimeout(rebuildTrustSectionCleanly, 500);
    setTimeout(rebuildTrustSectionCleanly, 1400);
  });
})();


/* === VM UI v9.13 RUNTIME: DELETE OLD TRUST SECTION COMPLETELY & BUILD FRESH === */
(function () {
  function deleteAndRebuildTrustSection() {
    var existingRebuilt = document.getElementById("vm-trust-rebuilt-section");
    if (existingRebuilt) return;

    var allSections = Array.from(document.querySelectorAll("section"));
    var oldTrust = allSections.find(function (sec) {
      var txt = sec.textContent || "";
      return txt.indexOf("विश्वकर्मा म्यूज़िकल्स - ग्राहक भरोसा, गुणवत्ता व कार्यशाला प्रमाण") !== -1 || txt.indexOf("ग्राहक भरोसा व कार्यशाला प्रमाण") !== -1;
    });

    var anchorParent = oldTrust ? oldTrust.parentElement : (document.querySelector("main") || document.body);
    var nextSibling = oldTrust ? oldTrust.nextElementSibling : null;
    if (oldTrust && oldTrust.parentElement) {
      oldTrust.parentElement.removeChild(oldTrust);
    }

    var sec = document.createElement("section");
    sec.id = "vm-trust-rebuilt-section";
    sec.className = "vm-trust-section";
    sec.setAttribute("data-vm-trust-section", "1");

    var badge = document.createElement("div");
    badge.className = "vm-section-top-badge";
    badge.textContent = "✦ ग्राहक भरोसा व कार्यशाला प्रमाण ✦";
    sec.appendChild(badge);

    var h2 = document.createElement("h2");
    h2.className = "vm-trust-heading";
    h2.textContent = "विश्वकर्मा म्यूज़िकल्स - ग्राहक भरोसा, गुणवत्ता व कार्यशाला प्रमाण (Est. 1990)";
    sec.appendChild(h2);

    var meta = document.createElement("p");
    meta.className = "vm-trust-meta-line";
    meta.innerHTML = "प्रोप्राइटर: तुलसी दास विश्वकर्मा | 35+ वर्षों का अनुभव | अमानगंज, जिला पन्ना (म.प्र.) 488441 | सीधा कॉल: <strong>+91 97550 88022</strong> | ईमेल: <strong>info@vishwakarmamusicals.in</strong>";
    sec.appendChild(meta);

    var cardsData = [
      {
        title: "1990 से हस्तनिर्मित परंपरा",
        desc: "चीड़, सागौन, शीशम व आम की लकड़ी, बकरे के चमड़े के जांचे हुए पुड़े और 440Hz सुर मिलान के साथ विश्वसनीय कारीगरी।"
      },
      {
        title: "सत्यापित GSTIN व MSME पंजीकरण",
        desc: "GSTIN: 23BSDPV5529B1ZV व Udyam MSME पंजीकृत प्रतिष्ठान; पारदर्शी Zoho बिलिंग व स्पष्ट कर विवरण।"
      },
      {
        title: "सुरक्षित HDFC बैंक / UPI सत्यापन",
        desc: "हर ऑनलाइन ऑर्डर भुगतान सत्यापन (PAYMENT_REVIEW → VERIFIED) के बाद ही प्रसंस्करण व डिस्पैच के लिए आगे बढ़ता है।"
      },
      {
        title: "Delhivery One कूरियर व 6 माह वारंटी",
        desc: "नए वाद्य यंत्रों की सुरक्षित देशव्यापी कूरियर शिपिंग तथा कार्यशाला में 6 माह सीमित कारीगरी व सुर वारंटी।"
      }
    ];

    var grid = document.createElement("div");
    grid.className = "vm-trust-cards-grid";
    cardsData.forEach(function (item) {
      var card = document.createElement("div");
      card.className = "vm-trust-small-card";
      card.innerHTML = "<h3>" + item.title + "</h3><p>" + item.desc + "</p>";
      grid.appendChild(card);
    });
    sec.appendChild(grid);

    var rating = document.createElement("p");
    rating.className = "vm-trust-rating-plain";
    rating.textContent = "Google रेटिंग: 5.0 ★ (12+ सत्यापित ग्राहक समीक्षाएं)";
    sec.appendChild(rating);

    var btnRow = document.createElement("div");
    btnRow.className = "vm-trust-bottom-cta-row";
    btnRow.innerHTML =
      "<a href='#catalog' class='btn vm-3d-btn'>लाइव कैटलॉग देखें (Live Catalog)</a>" +
      "<a href='mailto:info@vishwakarmamusicals.in?subject=" + encodeURIComponent("कैटलॉग व ब्रोशर अनुरोध - विश्वकर्मा म्यूज़िकल्स") + "' class='btn vm-3d-btn'>कैटलॉग व ब्रोशर डाउनलोड करें</a>";
    sec.appendChild(btnRow);

    if (anchorParent) {
      if (nextSibling && nextSibling.parentElement === anchorParent) {
        anchorParent.insertBefore(sec, nextSibling);
      } else {
        anchorParent.appendChild(sec);
      }
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    deleteAndRebuildTrustSection();
    setTimeout(deleteAndRebuildTrustSection, 500);
    setTimeout(deleteAndRebuildTrustSection, 1400);
  });
})();


/* === VM UI v9.14 RUNTIME: ENFORCE 4 DARK TRUST CARDS & HIGH CONTRAST === */
(function () {
  function applyV914TrustContrast() {
    var sec = document.getElementById("vm-trust-rebuilt-section") || Array.from(document.querySelectorAll("section")).find(function (s) {
      return (s.textContent || "").indexOf("विश्वकर्मा म्यूज़िकल्स - ग्राहक भरोसा, गुणवत्ता व कार्यशाला प्रमाण") !== -1;
    });
    if (!sec) return;

    sec.style.background = "transparent";
    sec.style.backgroundColor = "transparent";
    sec.style.border = "none";
    sec.style.boxShadow = "none";

    var h2 = sec.querySelector("h2");
    if (h2) {
      h2.style.color = "#6e4305";
      h2.style.fontWeight = "800";
    }

    sec.querySelectorAll(".vm-trust-meta-line, .vm-trust-rating-plain").forEach(function (el) {
      el.style.color = "#1c0d05";
      el.style.background = "transparent";
      el.style.border = "none";
      el.style.boxShadow = "none";
    });

    var cards = sec.querySelectorAll(".vm-trust-small-card");
    cards.forEach(function (card, idx) {
      if (idx >= 4) {
        card.remove();
        return;
      }
      card.style.background = "#220f06";
      card.style.backgroundColor = "#220f06";
      card.style.color = "#fff8eb";
      card.style.border = "1.5px solid #c9942c";
      var title = card.querySelector("h3");
      if (title) title.style.color = "#ffe08a";
      var desc = card.querySelector("p");
      if (desc) desc.style.color = "#fff8eb";
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    applyV914TrustContrast();
    setTimeout(applyV914TrustContrast, 500);
    setTimeout(applyV914TrustContrast, 1400);
  });
})();


/* === VM UI v9.15 RUNTIME: CLEAR HOVER TRANSFORMS/SHADOWS ON TRANSPARENT CARDS === */
(function () {
  function clearTransparentCardHover() {
    var selector = ".transparent-card, .card-transparent, [class*='transparent'][class*='card'], #vm-trust-rebuilt-section, #vm-customer-trust-hub, .vm-trust-section, [data-vm-trust-section]";
    document.querySelectorAll(selector).forEach(function (el) {
      el.style.transition = "none";
      el.style.transform = "none";
      el.addEventListener("mouseenter", function () {
        el.style.transform = "none";
        el.style.filter = "none";
        if (el.id === "vm-trust-rebuilt-section" || el.classList.contains("vm-trust-section") || el.id === "vm-customer-trust-hub" || el.hasAttribute("data-vm-trust-section")) {
          el.style.background = "transparent";
          el.style.backgroundColor = "transparent";
          el.style.border = "none";
          el.style.boxShadow = "none";
        }
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    clearTransparentCardHover();
    setTimeout(clearTransparentCardHover, 500);
    setTimeout(clearTransparentCardHover, 1400);
  });
})();


/* === VM UI v9.16 RUNTIME: STRIP TRANSPARENT CARD BOXES & KEEP HOVER PER-CARD ONLY === */
(function () {
  function applyV916CardIsolation() {
    document.querySelectorAll(".transparent-card, .card-transparent, [class*='transparent'][class*='card']").forEach(function (el) {
      el.style.background = "transparent";
      el.style.backgroundColor = "transparent";
      el.style.border = "none";
      el.style.boxShadow = "none";
      el.style.transform = "none";
      el.style.filter = "none";
    });

    document.querySelectorAll(".product-card, .instrument-card, .vm-trust-small-card, .card").forEach(function (card) {
      card.style.position = "relative";
      card.style.isolation = "isolate";
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    applyV916CardIsolation();
    setTimeout(applyV916CardIsolation, 500);
    setTimeout(applyV916CardIsolation, 1400);
  });
})();


/* === VM UI v9.17 RUNTIME: LOCK CARD POSITION ON HOVER & APPLY DARK BADGE + BRIGHT CREAM TEXT === */
(function () {
  function applyV917Fixes() {
    document.querySelectorAll("#vm-trust-rebuilt-section .vm-trust-small-card, .vm-trust-small-card, .product-card, .instrument-card, .card").forEach(function (card) {
      card.style.transform = "none";
      card.addEventListener("mouseenter", function () {
        card.style.transform = "none";
      });
      card.addEventListener("mouseleave", function () {
        card.style.transform = "none";
      });
    });

    document.querySelectorAll(".category-badge, .cat-badge, .badge-category, [class*='category-badge'], [class*='cat-badge'], .product-card .badge, .instrument-card .badge").forEach(function (badge) {
      badge.style.background = "#240e06";
      badge.style.backgroundColor = "#240e06";
      badge.style.color = "#fff4cc";
      badge.style.border = "1.5px solid #e6b84d";
      badge.style.borderRadius = "999px";
      badge.style.fontWeight = "700";
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    applyV917Fixes();
    setTimeout(applyV917Fixes, 500);
    setTimeout(applyV917Fixes, 1400);
  });
})();


/* === VM UI v9.19 RUNTIME: ISOLATE SINGLE-CARD TRUST HOVER & ENFORCE #fff4cc BADGE TEXT === */
(function () {
  function applyV919Rules() {
    document.documentElement.style.setProperty("zoom", "100%", "important");
    if (document.body) {
      document.body.style.setProperty("zoom", "100%", "important");
    }

    var trustCards = document.querySelectorAll("#vm-trust-rebuilt-section .vm-trust-small-card");
    trustCards.forEach(function (card) {
      card.style.setProperty("transform", "none", "important");
      card.style.setProperty("translate", "none", "important");
      card.style.setProperty("isolation", "isolate", "important");
    });

    var knownCategories = [
      "हारमोनियम", "ढोलक", "तबला", "झीका", "डमरू", "बांसुरी", "मंजीरा", "खड़ताल", "झांझ",
      "Harmonium", "Dholak", "Tabla", "Jheeka", "Damru", "Bansuri", "Manjeera", "Kartal", "Jhanjh"
    ];

    var candidates = document.querySelectorAll(
      ".category-badge, .cat-badge, .badge-category, [class*='category-badge'], [class*='cat-badge'], [class*='category'][class*='badge'], [class*='badge'][class*='category'], .instrument-card span, .instrument-card div, .product-card span, .product-card div"
    );

    candidates.forEach(function (el) {
      if (el.children.length > 0) return;
      var txt = (el.textContent || "").trim();
      if (!txt || txt.length > 32) return;

      var cls = (el.className || "").toString().toLowerCase();
      var isBadgeClass = cls.indexOf("badge") !== -1 || cls.indexOf("category") !== -1 || cls.indexOf("cat-") !== -1;
      var isCategoryText = knownCategories.some(function (k) { return txt === k || txt.indexOf(k) === 0; });

      if (isBadgeClass || isCategoryText) {
        el.style.setProperty("background", "#240e06", "important");
        el.style.setProperty("background-color", "#240e06", "important");
        el.style.setProperty("color", "#fff4cc", "important");
        el.style.setProperty("-webkit-text-fill-color", "#fff4cc", "important");
        el.style.setProperty("border", "1.5px solid #e6b84d", "important");
        el.style.setProperty("border-radius", "999px", "important");
        el.style.setProperty("font-weight", "700", "important");
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    applyV919Rules();
    setTimeout(applyV919Rules, 500);
    setTimeout(applyV919Rules, 1500);
    setTimeout(applyV919Rules, 3000);
  });
})();


/* === VM UI v9.20 RUNTIME: LOCK GRID/PARENT HOVER & KEEP CARD HOVER ISOLATED === */
(function () {
  function lockGridNoHover() {
    document.querySelectorAll("#vm-trust-rebuilt-section, #vm-trust-rebuilt-section .vm-trust-cards-grid, .vm-trust-cards-grid").forEach(function (grid) {
      grid.style.setProperty("transform", "none", "important");
      grid.style.setProperty("translate", "none", "important");
      grid.style.setProperty("transition", "none", "important");
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    lockGridNoHover();
    setTimeout(lockGridNoHover, 600);
  });
})();


/* === VM UI v9.21 RUNTIME: KEEP TRUST CARD HOVER SCOPED TO HOVERED CARD ONLY === */
(function () {
  function ensureTrustCardHoverStyle() {
    document.querySelectorAll("#vm-trust-rebuilt-section .vm-trust-small-card").forEach(function (card) {
      card.style.setProperty("isolation", "isolate", "important");
      card.style.setProperty("position", "relative", "important");
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    ensureTrustCardHoverStyle();
    setTimeout(ensureTrustCardHoverStyle, 500);
  });
})();


/* === VM UI v9.22 RUNTIME: ENSURE 100% TEXT CONTRAST ON INSTRUMENT & PRODUCT CARDS === */
(function () {
  function parseRgb(rgbStr) {
    var m = (rgbStr || "").match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
    if (!m) return null;
    return { r: parseInt(m[1], 10), g: parseInt(m[2], 10), b: parseInt(m[3], 10) };
  }

  function applyV922CardContrast() {
    document.querySelectorAll(".instrument-card, .product-card").forEach(function (card) {
      card.style.setProperty("opacity", "1", "important");
      var bg = getComputedStyle(card).backgroundColor;
      var rgb = parseRgb(bg);
      var isLightCard = rgb ? ((rgb.r * 0.299 + rgb.g * 0.587 + rgb.b * 0.114) > 150) : false;

      card.querySelectorAll("h3, h4, p, span, div").forEach(function (el) {
        if (el.children.length > 0) return;
        var txt = (el.textContent || "").trim();
        if (!txt) return;
        var cls = (el.className || "").toString().toLowerCase();
        var isBadge = cls.indexOf("badge") !== -1 || cls.indexOf("category") !== -1 || cls.indexOf("cat-") !== -1;
        if (isBadge) return;

        el.style.setProperty("opacity", "1", "important");
        if (isLightCard) {
          el.style.setProperty("color", "#1c0d05", "important");
          el.style.setProperty("-webkit-text-fill-color", "#1c0d05", "important");
        } else {
          var isHeading = el.tagName === "H3" || el.tagName === "H4" || cls.indexOf("title") !== -1;
          var targetColor = isHeading ? "#ffe28a" : "#fff6e0";
          el.style.setProperty("color", targetColor, "important");
          el.style.setProperty("-webkit-text-fill-color", targetColor, "important");
        }
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    applyV922CardContrast();
    setTimeout(applyV922CardContrast, 500);
    setTimeout(applyV922CardContrast, 1500);
  });
})();


/* === VM UI v9.23 RUNTIME: APPLY SUBTLE INVERSE TEXT-SHADOW BASED ON BUTTON BACKGROUND === */
(function () {
  function parseRgb(rgbStr) {
    var m = (rgbStr || "").match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
    if (!m) return null;
    return { r: parseInt(m[1], 10), g: parseInt(m[2], 10), b: parseInt(m[3], 10) };
  }

  function applyV923ButtonTextShadow() {
    document.querySelectorAll(".btn, button, .vm-3d-btn, [class*='btn']").forEach(function (btn) {
      var bg = getComputedStyle(btn).backgroundColor;
      var rgb = parseRgb(bg);
      var isLightBtn = rgb ? ((rgb.r * 0.299 + rgb.g * 0.587 + rgb.b * 0.114) > 155) : false;
      var shadowVal = isLightBtn
        ? "0 1px 0 rgba(255, 248, 235, 0.55)"
        : "0 1px 1px rgba(15, 6, 2, 0.70)";
      btn.style.setProperty("text-shadow", shadowVal, "important");
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    applyV923ButtonTextShadow();
    setTimeout(applyV923ButtonTextShadow, 500);
    setTimeout(applyV923ButtonTextShadow, 1400);
  });
})();


/* === VM UI v9.24 RUNTIME: APPLY SUBTLE INVERSE SHADOW FROM COMPUTED TEXT COLOR === */
(function () {
  function parseRgb(rgbStr) {
    var m = (rgbStr || "").match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
    if (!m) return null;
    return { r: parseInt(m[1], 10), g: parseInt(m[2], 10), b: parseInt(m[3], 10) };
  }

  function applyV924InverseButtonShadow() {
    document.querySelectorAll(".btn, button, .vm-3d-btn, [class*='btn']").forEach(function (btn) {
      var cs = getComputedStyle(btn);
      var txtRgb = parseRgb(cs.color);
      var invShadow = "0 1px 1px rgba(15, 6, 2, 0.78)";
      if (txtRgb) {
        var lum = (txtRgb.r * 0.299 + txtRgb.g * 0.587 + txtRgb.b * 0.114);
        if (lum > 140) {
          var invR = Math.max(0, 255 - txtRgb.r);
          var invG = Math.max(0, 255 - txtRgb.g);
          var invB = Math.max(0, 255 - txtRgb.b);
          invShadow = "0 1px 1px rgba(" + Math.round(invR * 0.25) + ", " + Math.round(invG * 0.15) + ", " + Math.round(invB * 0.10) + ", 0.78)";
        } else {
          invShadow = "0 1px 0 rgba(255, 248, 235, 0.55)";
        }
      }
      btn.style.setProperty("opacity", "1", "important");
      btn.style.setProperty("text-shadow", invShadow, "important");
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    applyV924InverseButtonShadow();
    setTimeout(applyV924InverseButtonShadow, 500);
    setTimeout(applyV924InverseButtonShadow, 1400);
  });
})();


/* === VM UI v10.0 PHASE 2 RUNTIME: SMART WRAPPING, STACKED MOBILE NAMES, CONTACT NO-SHADOW & BOTTOM-ONLY STICKY BAR === */
(function () {
  function applySmartWrapping() {
    var phraseList = [
      "❖ स्था. 1990",
      "35+ वर्षों की पारंपरिक कारीगरी",
      "35+ वर्षों का अनुभव",
      "GSTIN: 23BSDPV5529B1ZV",
      "+91 97550 88022",
      "info@vishwakarmamusicals.in",
      "अमानगंज, जिला पन्ना (म.प्र.) - 488441",
      "अमानगंज, जिला पन्ना (म.प्र.) 488441"
    ];

    var targets = document.querySelectorAll(".badge-tag, .vm-trust-meta-line, .pfn-copy, .meta-bar span, .sec-head p");
    targets.forEach(function (el) {
      if (el.getAttribute("data-vm-wrapped") === "1") return;
      var html = el.innerHTML;
      var changed = false;
      phraseList.forEach(function (phrase) {
        if (html.indexOf(phrase) !== -1 && html.indexOf('class="vm-nowrap">' + phrase) === -1) {
          html = html.split(phrase).join('<span class="vm-nowrap">' + phrase + '</span>');
          changed = true;
        }
      });
      if (changed) {
        el.innerHTML = html;
      }
      el.setAttribute("data-vm-wrapped", "1");
    });
  }

  function formatMobileCardTitles() {
    document.querySelectorAll(".instrument-card h3, .product-card h3").forEach(function (h3) {
      if (h3.querySelector(".vm-en-sub, .en-name, .en-title")) return;
      var txt = (h3.textContent || "").trim();
      var m = txt.match(/^(.+?)\s*\(([^()]+)\)\s*$/);
      if (m) {
        h3.innerHTML = '<span class="vm-hi-main">' + m[1].trim() + '</span><span class="vm-en-sub">(' + m[2].trim() + ')</span>';
      }
    });
  }

  function removeContactSectionButtonShadow() {
    var sections = Array.from(document.querySelectorAll("section"));
    sections.forEach(function (sec) {
      if ((sec.textContent || "").indexOf("सीधा संपर्क व पता") !== -1) {
        sec.classList.add("vm-contact-no-shadow");
        sec.querySelectorAll(".btn, button, a.btn, [class*='btn']").forEach(function (b) {
          b.style.setProperty("text-shadow", "none", "important");
        });
      }
    });
  }

  function initBottomOnlyStickyBar() {
    var bar = document.querySelector(".mobile-sticky-bar, .sticky-cta-bar");
    if (!bar) return;

    var btns = bar.querySelectorAll("a, button");
    if (btns.length >= 1) {
      var t0 = (btns[0].textContent || "").trim();
      if (t0.indexOf("97550") !== -1 || t0.indexOf("कॉल") !== -1) {
        btns[0].innerHTML = "📞 अभी कॉल करें";
      }
    }
    if (btns.length >= 2) {
      var t1 = (btns[1].textContent || "").trim();
      if (t1.indexOf("संग्रह") !== -1 || t1.indexOf("कैटलॉग") !== -1) {
        btns[1].innerHTML = "🎵 वाद्य संग्रह";
      }
    }

    var lastY = window.scrollY || window.pageYOffset || 0;
    function updateStickyVisibility() {
      if (window.innerWidth > 768) {
        bar.classList.remove("vm-sticky-visible");
        return;
      }
      var currentY = window.scrollY || window.pageYOffset || 0;
      var docHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
      var winHeight = window.innerHeight || document.documentElement.clientHeight;
      var distFromBottom = docHeight - (currentY + winHeight);
      var scrollingDown = currentY >= lastY;

      if (distFromBottom <= 420 && scrollingDown && currentY > 220) {
        bar.classList.add("vm-sticky-visible");
      } else if (distFromBottom > 520 || !scrollingDown) {
        bar.classList.remove("vm-sticky-visible");
      }
      lastY = currentY;
    }

    window.addEventListener("scroll", updateStickyVisibility, { passive: true });
    window.addEventListener("resize", updateStickyVisibility, { passive: true });
    updateStickyVisibility();
  }

  document.addEventListener("DOMContentLoaded", function () {
    applySmartWrapping();
    formatMobileCardTitles();
    removeContactSectionButtonShadow();
    initBottomOnlyStickyBar();

    setTimeout(function () {
      applySmartWrapping();
      formatMobileCardTitles();
      removeContactSectionButtonShadow();
    }, 600);
    setTimeout(function () {
      applySmartWrapping();
      formatMobileCardTitles();
      removeContactSectionButtonShadow();
    }, 1500);
  });
})();


/* === VM UI v10.2 PRIORITY 1 RUNTIME: STRICT BOTTOM-ONLY MOBILE STICKY BAR & HEADER CLEANUP === */
(function () {
  function syncPriority1MobileBar() {
    var bars = Array.from(document.querySelectorAll(".mobile-sticky-bar, .sticky-cta-bar"));
    if (!bars.length) return;

    // Keep only the primary sticky bar active if multiple exist
    bars.forEach(function (b, index) {
      if (index > 0) {
        b.style.setProperty("display", "none", "important");
      }
    });

    var bar = bars[0];
    var btns = bar.querySelectorAll("a, button");
    if (btns.length >= 1) {
      var t0 = (btns[0].textContent || "").trim();
      if (t0.indexOf("97550") !== -1 || t0.indexOf("कॉल") !== -1) {
        btns[0].innerHTML = "📞 अभी कॉल करें";
      }
    }
    if (btns.length >= 2) {
      var t1 = (btns[1].textContent || "").trim();
      if (t1.indexOf("संग्रह") !== -1 || t1.indexOf("कैटलॉग") !== -1) {
        btns[1].innerHTML = "🎵 वाद्य संग्रह";
      }
    }

    var lastScrollY = window.scrollY || window.pageYOffset || 0;

    function evaluateBarState() {
      if (window.innerWidth > 768) {
        bar.classList.remove("vm-sticky-visible");
        return;
      }

      var y = window.scrollY || window.pageYOffset || 0;
      var docH = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
      var winH = window.innerHeight || document.documentElement.clientHeight;
      var remainingToBottom = docH - (y + winH);
      var movingDown = y >= lastScrollY;

      // Show only when scrolled well down and within bottom zone, hide immediately on upward scroll or away from bottom
      if (y > 260 && movingDown && remainingToBottom <= 360) {
        bar.classList.add("vm-sticky-visible");
      } else if (!movingDown || remainingToBottom > 460) {
        bar.classList.remove("vm-sticky-visible");
      }

      lastScrollY = y;
    }

    window.addEventListener("scroll", evaluateBarState, { passive: true });
    window.addEventListener("resize", evaluateBarState, { passive: true });
    evaluateBarState();
  }

  document.addEventListener("DOMContentLoaded", function () {
    syncPriority1MobileBar();
    setTimeout(syncPriority1MobileBar, 500);
    setTimeout(syncPriority1MobileBar, 1400);
  });
})();


/* === VM UI v10.3 PRIORITY 2 RUNTIME: ENFORCE CLEAN CONTACT BUTTONS & CARD CONTRAST AFTER DYNAMIC RENDER === */
(function () {
  function applyPriority2Polish() {
    document.querySelectorAll("section").forEach(function (sec) {
      var t = sec.textContent || "";
      if (t.indexOf("सीधा संपर्क व पता") !== -1 || t.indexOf("संपर्क व दुकान का पता") !== -1 || t.indexOf("दुकान का सटीक स्थान") !== -1) {
        sec.classList.add("vm-contact-no-shadow");
        sec.querySelectorAll(".btn, button, a.btn, [class*='btn']").forEach(function (btn) {
          btn.style.setProperty("text-shadow", "none", "important");
        });
      }
    });

    document.querySelectorAll(".category-badge, .cat-badge, .badge-category, [class*='category-badge'], [class*='cat-badge']").forEach(function (badge) {
      badge.style.setProperty("background", "#240e06", "important");
      badge.style.setProperty("background-color", "#240e06", "important");
      badge.style.setProperty("color", "#fff4cc", "important");
      badge.style.setProperty("-webkit-text-fill-color", "#fff4cc", "important");
      badge.style.setProperty("text-shadow", "none", "important");
      badge.style.setProperty("opacity", "1", "important");
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    applyPriority2Polish();
    setTimeout(applyPriority2Polish, 600);
    setTimeout(applyPriority2Polish, 1600);
  });
})();


/* === VM UI v10.5 RUNTIME: CLEAN DARK SPACER ABOVE TRUST SECTION & LOCK CARE SHEET CONTRAST === */
(function () {
  function fixTrustGapAndCareContrast() {
    document.querySelectorAll(".care-sheet-light, .care-sheet-light h3, .care-list, .care-list li, .care-list li strong").forEach(function (el) {
      el.style.setProperty("opacity", "1", "important");
      el.style.setProperty("filter", "none", "important");
      if (el.tagName === "H3") {
        el.style.setProperty("color", "#6e4305", "important");
        el.style.setProperty("-webkit-text-fill-color", "#6e4305", "important");
      } else if (el.tagName === "STRONG") {
        el.style.setProperty("color", "#240e06", "important");
        el.style.setProperty("-webkit-text-fill-color", "#240e06", "important");
      } else if (!el.classList.contains("care-sheet-light")) {
        el.style.setProperty("color", "#1c0d05", "important");
        el.style.setProperty("-webkit-text-fill-color", "#1c0d05", "important");
      }
    });

    var trustEl = document.getElementById("vm-trust-rebuilt-section") || document.querySelector(".vm-trust-section");
    if (trustEl && trustEl.parentElement) {
      var prev = trustEl.previousElementSibling;
      while (prev) {
        var txt = (prev.textContent || "").trim();
        var hasContent = prev.querySelector("h1, h2, h3, h4, p, ul, ol, table, form, .card, .product-card, .instrument-card");
        if (!txt && !hasContent) {
          var toRemove = prev;
          prev = prev.previousElementSibling;
          toRemove.remove();
          continue;
        }
        prev.style.setProperty("margin-bottom", "0px", "important");
        break;
      }
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    fixTrustGapAndCareContrast();
    setTimeout(fixTrustGapAndCareContrast, 500);
    setTimeout(fixTrustGapAndCareContrast, 1500);
  });
})();


/* === VM UI v10.6 ALL-DEVICES RUNTIME: STACKED CENTERED BADGES & CONSISTENT UI POLISH === */
(function () {
  function buildStackedHeritageBadges() {
    var targets = ["❖ स्था. 1990", "35+ वर्षों की पारंपरिक कारीगरी", "35+ वर्षों का अनुभव", "GSTIN: 23BSDPV5529B1ZV"];
    document.querySelectorAll(".badge-tag").forEach(function (badge) {
      if (badge.getAttribute("data-vm-stacked-done") === "1") return;
      var rawText = (badge.textContent || "").replace(/^\s*❖\s*|\s*❖\s*$/g, "").trim();
      var parts = rawText.split("•").map(function (s) { return s.trim(); }).filter(Boolean);
      var matchesTarget = parts.some(function (p) {
        return targets.some(function (t) { return p.indexOf(t.replace(/^❖\s*/, "")) !== -1; });
      });
      if (matchesTarget && parts.length >= 2 && badge.parentElement) {
        var group = document.createElement("div");
        group.className = "vm-stacked-badge-group";
        group.setAttribute("data-vm-stacked-done", "1");
        parts.forEach(function (part) {
          var pill = document.createElement("span");
          pill.className = "vm-stacked-pill";
          pill.textContent = part;
          group.appendChild(pill);
        });
        badge.setAttribute("data-vm-stacked-done", "1");
        badge.style.display = "none";
        badge.parentElement.insertBefore(group, badge.nextSibling);
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    buildStackedHeritageBadges();
    setTimeout(buildStackedHeritageBadges, 500);
    setTimeout(buildStackedHeritageBadges, 1400);
  });
})();
