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
