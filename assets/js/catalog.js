window.VMCsv = {
  parse: function (csvText) {
    var rows = [];
    var row = [];
    var cur = "";
    var inQuotes = false;
    var text = String(csvText || "").replace(/^\uFEFF/, "");
    for (var i = 0; i < text.length; i++) {
      var ch = text[i];
      var next = text[i + 1];
      if (inQuotes) {
        if (ch === '"' && next === '"') { cur += '"'; i++; }
        else if (ch === '"') { inQuotes = false; }
        else { cur += ch; }
      } else {
        if (ch === '"') { inQuotes = true; }
        else if (ch === ",") { row.push(cur); cur = ""; }
        else if (ch === "\r" && next === "\n") { row.push(cur); rows.push(row); row = []; cur = ""; i++; }
        else if (ch === "\n" || ch === "\r") { row.push(cur); rows.push(row); row = []; cur = ""; }
        else { cur += ch; }
      }
    }
    if (cur.length > 0 || row.length > 0) { row.push(cur); rows.push(row); }
    return rows.filter(function (r) { return r.some(function (cell) { return String(cell).trim() !== ""; }); });
  }
};

function vmNormalizeHeader(str) {
  return String(str || "")
    .replace(/^\uFEFF/, "")
    .replace(/_/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function vmParseName(rawName) {
  var full = sanitizeVMText(rawName).trim();
  var match = full.match(/^(.*?)\s*\(([^)]+)\)\s*$/);
  if (match) return { full: full, hindi: match[1].trim(), english: match[2].trim() };
  return { full: full, hindi: full, english: "" };
}

function vmCategoryLabel(rawCategory) {
  var cat = String(rawCategory || "").toLowerCase().trim();
  if (cat === "harmonium") return "हारमोनियम";
  if (cat === "dholak") return "ढोलक";
  if (cat === "tabla") return "तबला";
  if (cat === "flute") return "बांसुरी";
  if (cat === "folk") return "लोक वाद्य";
  if (cat === "accessories") return "सहायक सामग्री";
  if (cat === "modern") return "आधुनिक सुरीला वाद्य";
  return sanitizeVMText(rawCategory || "वाद्य यंत्र");
}

function vmMapRows(rows) {
  if (!rows || rows.length < 2) return [];
  var headerRowIndex = 0;
  for (var rIdx = 0; rIdx < Math.min(5, rows.length); rIdx++) {
    var candidate = rows[rIdx].map(vmNormalizeHeader);
    if (candidate.some(function (h) { return h.indexOf("sku") !== -1 || h.indexOf("item name") !== -1; })) {
      headerRowIndex = rIdx;
      break;
    }
  }
  var headers = rows[headerRowIndex].map(vmNormalizeHeader);
  var colIdx = function (names) {
    for (var a = 0; a < names.length; a++) {
      var idx1 = headers.indexOf(vmNormalizeHeader(names[a]));
      if (idx1 !== -1) return idx1;
    }
    for (var b = 0; b < names.length; b++) {
      var idx2 = headers.findIndex(function (h) { return h.indexOf(vmNormalizeHeader(names[b])) !== -1; });
      if (idx2 !== -1) return idx2;
    }
    return -1;
  };

  var idxMap = {
    sku: colIdx(["sku code", "sku", "item code"]),
    name: colIdx(["item name", "product title", "name"]),
    category: colIdx(["category"]),
    price: colIdx(["final customer price (₹)", "live price", "selling price", "price"]),
    status: colIdx(["product status", "status"]),
    itemType: colIdx(["item type", "type"]),
    mainImage: colIdx(["main image url", "main image", "image url"]),
    shortDesc: colIdx(["short description", "short desc"]),
    keyFeatures: colIdx(["key features", "features"]),
    slug: colIdx(["page slug", "slug"])
  };

  var getVal = function (r, key) {
    return (idxMap[key] !== -1 && r[idxMap[key]] !== undefined) ? sanitizeVMText(r[idxMap[key]]).trim() : "";
  };

  var products = [];
  for (var i = headerRowIndex + 1; i < rows.length; i++) {
    var r = rows[i];
    var sku = getVal(r, "sku").toUpperCase();
    if (!sku || vmNormalizeHeader(sku) === "sku" || vmNormalizeHeader(sku) === "sku code") continue;

    var status = getVal(r, "status").toLowerCase();
    if (["inactive", "disabled", "hidden", "no", "false", "0", "archived"].indexOf(status) !== -1) continue;

    var itemType = getVal(r, "itemType").toLowerCase();
    if (itemType.indexOf("service") !== -1 || itemType.indexOf("repair") !== -1 || itemType.indexOf("raw") !== -1 || itemType.indexOf("pack") !== -1 || sku.indexOf("VM-S") === 0 || sku.indexOf("VM-R") === 0 || sku.indexOf("VM-P") === 0) {
      continue;
    }

    var parsedName = vmParseName(getVal(r, "name") || sku);
    var price = Number(getVal(r, "price").replace(/[^\d.]/g, "")) || 0;
    var rawCategory = getVal(r, "category");
    var slug = (getVal(r, "slug") || sku).toLowerCase();
    var features = getVal(r, "keyFeatures").split("|").map(function (f) { return f.trim(); }).filter(Boolean).slice(0, 3);

    products.push({
      sku: sku,
      nameFull: parsedName.full,
      nameHindi: parsedName.hindi,
      nameEnglish: parsedName.english,
      rawCategory: rawCategory,
      badgeLabel: vmCategoryLabel(rawCategory),
      price: price,
      mainImage: getVal(r, "mainImage"),
      shortDesc: getVal(r, "shortDesc") || "सीजन्ड सूखी लकड़ी और शुद्ध कारीगरी से निर्मित प्रामाणिक वाद्य यंत्र।",
      features: features.length ? features : ["440Hz स्टैंडर्ड स्वर ट्यूनिंग", "अमानगंज कार्यशाला में परखा गया", "सुरक्षित पैकेजिंग व डिलीवरी"],
      slug: slug
    });
  }
  return products;
}

window.VMCatalog = {
  getCachedProducts: function () {
    var key = (typeof VM_CONFIG !== "undefined" && VM_CONFIG.catalogCacheKey) ? VM_CONFIG.catalogCacheKey : "vm_dynamic_products_v20";
    try {
      var raw = localStorage.getItem(key);
      var parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) { return []; }
  },
  saveCachedProducts: function (products) {
    var key = (typeof VM_CONFIG !== "undefined" && VM_CONFIG.catalogCacheKey) ? VM_CONFIG.catalogCacheKey : "vm_dynamic_products_v20";
    try { localStorage.setItem(key, JSON.stringify(products)); } catch (e) {}
  },
  fetchLiveProducts: async function () {
    if (this._inflightPromise) {
      return this._inflightPromise;
    }

    var self = this;
    this._inflightPromise = (async function () {
      var apiUrl = (typeof VM_CONFIG !== "undefined" && VM_CONFIG.orderApiUrl) ? VM_CONFIG.orderApiUrl : "";
      var csvUrls = (typeof VM_CONFIG !== "undefined" && Array.isArray(VM_CONFIG.catalogCsvUrls)) ? VM_CONFIG.catalogCsvUrls : [];

      var catalogDeadline = Date.now() + 10000;

      async function fetchWithTimeout(targetUrl, ms, consumeResponse) {
        var controller = typeof AbortController !== "undefined" ? new AbortController() : null;
        var timer = 0;
        var timeoutPromise = new Promise(function (_, reject) {
          timer = setTimeout(function () {
            if (controller) controller.abort();
            reject(new Error("catalog-timeout"));
          }, ms);
        });
        var requestPromise = (async function () {
          var response = await fetch(targetUrl, {
            method: "GET",
            cache: "no-store",
            signal: controller ? controller.signal : undefined
          });
          if (!response || !response.ok) return null;
          return await consumeResponse(response);
        })();
        try {
          return await Promise.race([requestPromise, timeoutPromise]);
        } finally {
          clearTimeout(timer);
        }
      }

      function remainingRequestTime() {
        return Math.max(0, Math.min(4000, catalogDeadline - Date.now()));
      }

      if (apiUrl && remainingRequestTime() > 0) {
        try {
          var apiPayload = await fetchWithTimeout(apiUrl, remainingRequestTime(), function (response) {
            return response.json();
          });
          if (apiPayload) {
            var json = apiPayload;
            if (json && Array.isArray(json.items) && json.items.length > 0) {
              var headers = Object.keys(json.items[0]);
              var rows = [headers].concat(json.items.map(function (obj) {
                return headers.map(function (h) { return obj[h] !== undefined ? String(obj[h]) : ""; });
              }));
              var prodsApi = vmMapRows(rows);
              if (prodsApi.length > 0) {
                self.saveCachedProducts(prodsApi);
                return prodsApi;
              }
            }
          }
        } catch (e) {}
      }

      for (var i = 0; i < csvUrls.length && remainingRequestTime() > 0; i++) {
        try {
          var csvText = await fetchWithTimeout(csvUrls[i], remainingRequestTime(), function (response) {
            return response.text();
          });
          if (typeof csvText !== "string" || !csvText) continue;
          var rowsCsv = window.VMCsv.parse(csvText);
          var prodsCsv = vmMapRows(rowsCsv);
          if (prodsCsv.length > 0) {
            self.saveCachedProducts(prodsCsv);
            return prodsCsv;
          }
        } catch (e) {}
      }

      var cachedFallback = self.getCachedProducts();
      return Array.isArray(cachedFallback) ? cachedFallback : [];
    })();

    try {
      return await this._inflightPromise;
    } finally {
      self._inflightPromise = null;
    }
  }
};
