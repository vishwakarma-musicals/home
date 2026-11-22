function sanitizeVMText(str) {
  var value = String(str || "");
  value = value.replace(/\bsafari\b/gi, "Safri");
  return value;
}

function ensureVMToast() {
  var toast = document.getElementById("vm-cart-toast");
  if (toast) return toast;
  toast = document.createElement("div");
  toast.id = "vm-cart-toast";
  toast.setAttribute("role", "status");
  toast.setAttribute("aria-live", "polite");
  toast.style.cssText = "position:fixed;bottom:86px;right:20px;z-index:260;background:#1a0e06;color:#ffffff;border:2px solid #e6b84d;border-radius:16px;padding:12px 16px;box-shadow:0 16px 36px rgba(0,0,0,0.55);display:flex;align-items:center;gap:12px;max-width:min(380px,calc(100vw - 32px));opacity:0;transform:translateY(16px);pointer-events:none;transition:opacity 0.25s ease,transform 0.25s ease;";
  var msg = document.createElement("span");
  msg.id = "vm-cart-toast-msg";
  msg.style.cssText = "flex:1;font-size:0.9rem;line-height:1.45;";
  var link = document.createElement("a");
  link.href = (typeof VM_CONFIG !== "undefined" && VM_CONFIG.cartPageUrl) ? VM_CONFIG.cartPageUrl : "cart.html";
  link.textContent = "कार्ट देखें →";
  link.style.cssText = "background:linear-gradient(180deg,#fce09b 0%,#d89f31 100%);color:#1a0e04;font-weight:800;font-size:0.84rem;padding:6px 12px;border-radius:999px;white-space:nowrap;border:1px solid #734c0a;text-decoration:none;";
  toast.appendChild(msg);
  toast.appendChild(link);
  document.body.appendChild(toast);
  return toast;
}

var vmToastTimer = null;
function showVMToast(itemName) {
  var toast = ensureVMToast();
  var msg = document.getElementById("vm-cart-toast-msg");
  if (!msg) return;
  msg.textContent = "✓ " + sanitizeVMText(itemName) + " कार्ट में जोड़ा गया।";
  toast.style.opacity = "1";
  toast.style.transform = "translateY(0)";
  toast.style.pointerEvents = "auto";
  if (vmToastTimer) clearTimeout(vmToastTimer);
  vmToastTimer = setTimeout(function () {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(16px)";
    toast.style.pointerEvents = "none";
  }, 3600);
}

window.VMCartUI = {
  storageKey: (typeof VM_CONFIG !== "undefined" && VM_CONFIG.cartStorageKey) ? VM_CONFIG.cartStorageKey : "vm_cart_items_v1",
  readCart: function () {
    try {
      var raw = localStorage.getItem(this.storageKey);
      return raw ? this.normalizeItems(JSON.parse(raw)) : [];
    } catch (e) { return []; }
  },
  normalizeItems: function (items) {
    if (!Array.isArray(items)) return [];
    return items.filter(function (i) { return i && i.sku; }).map(function (i) {
      return {
        sku: String(i.sku).trim(),
        name: sanitizeVMText(String(i.name || i.sku).trim()),
        price: Number(i.price) || 0,
        qty: Math.max(1, Math.min(10000, Number(i.qty) || 1)),
        weightGrams: Number(i.weightGrams) || 5000
      };
    });
  },
  summarize: function (items) {
    var list = this.normalizeItems(items);
    return {
      count: list.reduce(function (s, i) { return s + i.qty; }, 0),
      total: list.reduce(function (s, i) { return s + i.price * i.qty; }, 0)
    };
  },
  addItem: function (sku, name, price) {
    var cleanSku = String(sku || "").trim().toUpperCase();
    var cleanName = sanitizeVMText(String(name || cleanSku).trim());
    var cleanPrice = Number(price) || 0;
    var items = this.readCart();
    var existing = items.find(function (i) { return i.sku === cleanSku; });
    if (existing) {
      existing.qty = Math.min(10000, existing.qty + 1);
      if (cleanPrice > 0) existing.price = cleanPrice;
    } else {
      items.push({
        sku: cleanSku,
        name: cleanName,
        price: cleanPrice,
        qty: 1,
        weightGrams: cleanSku === "VM-H02" ? 6500 : (cleanSku.indexOf("VM-H") === 0 ? 9500 : ((cleanSku.indexOf("VM-D") === 0 || cleanSku.indexOf("VM-T") === 0 || cleanSku === "VM-O04") ? 5500 : 800))
      });
    }
    try { localStorage.setItem(this.storageKey, JSON.stringify(items)); } catch (e) {}
    this.syncBadge();
    showVMToast(cleanName);
  },
  syncBadge: function () {
    var summary = this.summarize(this.readCart());
    var countEl = document.getElementById("header-cart-count");
    if (countEl) countEl.textContent = String(summary.count);
  }
};

document.addEventListener("DOMContentLoaded", function () {
  window.VMCartUI.syncBadge();
});

window.addEventListener("storage", function (event) {
  if (event.key === window.VMCartUI.storageKey) window.VMCartUI.syncBadge();
});