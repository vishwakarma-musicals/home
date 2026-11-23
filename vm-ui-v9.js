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
