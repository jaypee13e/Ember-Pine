const DEV = { name: "Your Name", email: "you@example.com" }; // edit these two lines
document.getElementById("devname").textContent = DEV.name;
document.getElementById("devmail").href =
  "mailto:" + DEV.email + "?subject=" + encodeURIComponent("Online shop quote");

const P = [
  {
    id: 1,
    n: "Pine & Smoke",
    c: "Soy candles",
    p: 24,
    col: "#2f5d46",
    k: "candle",
    notes: "Cedar, pine needle, smoked vanilla",
    d: "A forest walk at dusk. Our best seller.",
    sz: [
      ["8 oz", 0],
      ["12 oz", 9],
    ],
    tag: "Best seller",
  },
  {
    id: 2,
    n: "Fig Orchard",
    c: "Soy candles",
    p: 24,
    col: "#7b4b94",
    k: "candle",
    notes: "Ripe fig, green leaf, warm musk",
    d: "Sweet, leafy and a little bit wild.",
    sz: [
      ["8 oz", 0],
      ["12 oz", 9],
    ],
  },
  {
    id: 3,
    n: "Sea Salt Linen",
    c: "Soy candles",
    p: 22,
    col: "#4b86a8",
    k: "candle",
    notes: "Sea salt, white sage, clean cotton",
    d: "Fresh laundry on a windy coast.",
    sz: [
      ["8 oz", 0],
      ["12 oz", 9],
    ],
  },
  {
    id: 4,
    n: "Amber Dusk",
    c: "Soy candles",
    p: 26,
    col: "#c9822b",
    k: "candle",
    notes: "Amber resin, sandalwood, clove",
    d: "Warm and glowing, like the last hour of daylight.",
    sz: [
      ["8 oz", 0],
      ["12 oz", 9],
    ],
    tag: "New",
  },
  {
    id: 5,
    n: "Lavender Fields melts",
    c: "Wax melts",
    p: 12,
    col: "#8d79c9",
    k: "melt",
    notes: "Lavender, chamomile, soft vanilla",
    d: "Calm for the room, no flame needed.",
    sz: [
      ["6 melts", 0],
      ["12 melts", 8],
    ],
  },
  {
    id: 6,
    n: "Winter Citrus melts",
    c: "Wax melts",
    p: 12,
    col: "#e0a63d",
    k: "melt",
    notes: "Blood orange, cinnamon, fir",
    d: "Bright and spiced. Perfect for the kitchen.",
    sz: [
      ["6 melts", 0],
      ["12 melts", 8],
    ],
  },
  {
    id: 7,
    n: "Cozy Night gift set",
    c: "Gift sets",
    p: 48,
    col: "#2c4a52",
    k: "set",
    notes: "One candle, one melt tin, matches",
    d: "Packed in a reusable box with a handwritten note.",
    sz: [
      ["Standard", 0],
      ["With snuffer", 12],
    ],
    tag: "Gift idea",
  },
  {
    id: 8,
    n: "Trio sampler set",
    c: "Gift sets",
    p: 36,
    col: "#b25d6e",
    k: "set",
    notes: "Three 4 oz candles in our top scents",
    d: "Not sure where to start? Start here.",
    sz: [
      ["Standard", 0],
      ["Gift wrapped", 5],
    ],
  },
];
const CATS = ["All", "Soy candles", "Wax melts", "Gift sets"];
const st = { cat: "All", q: "", sort: "", pick: null, stage: "cart", last: null };
const load = () => {
  try {
    return JSON.parse(localStorage.getItem("ep-cart")) || {};
  } catch (e) {
    return {};
  }
};
const cart = load();
const saveC = () => {
  try {
    localStorage.setItem("ep-cart", JSON.stringify(cart));
  } catch (e) {}
};
const $id = (i) => document.getElementById(i);
const esc = (s) =>
  String(s).replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c],
  );
const $ = (n) => "$" + n.toFixed(2);
const price = (p, si) => p.p + p.sz[si][1];

function art(p, s) {
  const c = p.col;
  const shapes = {
    candle: `<ellipse cx="60" cy="108" rx="34" ry="6" fill="rgba(0,0,0,.12)"/><rect x="26" y="52" width="68" height="56" rx="10" fill="${c}"/><rect x="26" y="52" width="68" height="14" rx="7" fill="rgba(255,255,255,.22)"/><rect x="58" y="34" width="4" height="18" rx="2" fill="#3a2f2a"/><path d="M60 12c8 9 8 16 0 22-8-6-8-13 0-22z" fill="#f2a93b"/><path d="M60 20c4 5 4 9 0 12-4-3-4-7 0-12z" fill="#ffe08a"/>`,
    melt: `<ellipse cx="60" cy="100" rx="40" ry="6" fill="rgba(0,0,0,.12)"/><rect x="18" y="62" width="84" height="36" rx="8" fill="rgba(0,0,0,.18)"/><rect x="26" y="52" width="26" height="30" rx="6" fill="${c}"/><rect x="56" y="46" width="26" height="30" rx="6" fill="${c}" opacity=".85"/><rect x="40" y="66" width="26" height="28" rx="6" fill="${c}" opacity=".7"/>`,
    set: `<ellipse cx="60" cy="108" rx="40" ry="6" fill="rgba(0,0,0,.12)"/><rect x="16" y="56" width="88" height="52" rx="8" fill="${c}"/><rect x="16" y="56" width="88" height="14" rx="6" fill="rgba(255,255,255,.2)"/><rect x="55" y="56" width="10" height="52" fill="#e8a33d"/><path d="M60 56c-14-18-26-4-12 0zM60 56c14-18 26-4 12 0z" fill="#e8a33d"/>`,
  };
  return `<svg viewBox="0 0 120 120" width="${s}" height="${s}" role="img" aria-label="${esc(p.n)} illustration">${shapes[p.k]}</svg>`;
}

function grid() {
  $id("chips").innerHTML = CATS.map(
    (c) => `<button class="chip" aria-pressed="${st.cat === c}" data-c="${c}">${c}</button>`,
  ).join(" ");
  let l = P.filter(
    (p) =>
      (st.cat === "All" || p.c === st.cat) && (p.n + " " + p.notes).toLowerCase().includes(st.q),
  );
  if (st.sort) l.sort((a, b) => (st.sort === "lo" ? a.p - b.p : b.p - a.p));
  $id("grid").innerHTML = l.length
    ? l
        .map(
          (p) =>
            `<div class="pc" style="--c:${p.col}"><button class="art" data-view="${p.id}" aria-label="View ${esc(p.n)}">${art(p, 110)}</button><div class="in">${p.tag ? `<span class="tag">${p.tag}</span>` : ""}<h3>${esc(p.n)}</h3><small>${esc(p.notes)}</small><div class="r"><span class="price">${$(p.p)}</span><button class="btn ghost sm" data-add="${p.id}:0">Add to cart</button></div></div></div>`,
        )
        .join("")
    : `<p class="empty">No products match “${esc(st.q)}”. Try another scent.</p>`;
}
function product() {
  const p = P.find((x) => x.id === st.pick.id),
    si = st.pick.si;
  $id("pbody").innerHTML =
    `<div class="top"><h3 style="font-size:30px">${esc(p.n)}</h3><button class="x" data-close="pdlg" aria-label="Close">✕</button></div>
  <div style="text-align:center;background:color-mix(in srgb,${p.col} 14%,var(--card));border-radius:12px;padding:16px">${art(p, 150)}</div>
  <p>${esc(p.d)}</p><p class="note">Notes: ${esc(p.notes)}</p>
  <div class="opts" role="group" aria-label="Choose a size">${p.sz.map((s, i) => `<button class="chip" aria-pressed="${i === si}" data-size="${i}">${s[0]}, ${$(price(p, i))}</button>`).join("")}</div>
  <button class="btn" style="width:100%" data-add="${p.id}:${si}">Add to cart, ${$(price(p, si))}</button>`;
}
function lines() {
  return Object.entries(cart).map(([k, q]) => {
    const [id, si] = k.split(":").map(Number),
      p = P.find((x) => x.id === id);
    return { k, p, si, q, pr: price(p, si) };
  });
}
function renderCart() {
  const L = lines(),
    sub = L.reduce((s, l) => s + l.pr * l.q, 0),
    ship = !sub || sub >= 50 ? 0 : 5.95;
  $id("count").textContent = L.reduce((s, l) => s + l.q, 0);
  const head = `<div class="top"><h3 style="font-size:30px">Your cart</h3><button class="x" data-close="cart" aria-label="Close cart">✕</button></div>`;
  if (st.stage === "done") {
    $id("cbody").innerHTML =
      head +
      `<div class="ok" role="status">Thank you, ${esc(st.last.name)}! Order ${st.last.no} (${$(st.last.total)}) will ship within 2 business days. (Demo: no payment was taken.)</div>`;
    return;
  }
  if (!L.length) {
    $id("cbody").innerHTML =
      head + `<p class="empty">Your cart is empty. Pick a scent you like.</p>`;
    return;
  }
  const sum = `<div class="sum"><div><span>Subtotal</span><span>${$(sub)}</span></div><div><span>Shipping</span><span>${ship ? $(ship) : "Free"}</span></div>${!ship ? "" : `<div class="note"><span>Add ${$(50 - sub)} more for free shipping</span></div>`}<div class="t"><span>Total</span><span>${$(sub + ship)}</span></div></div>`;
  const items = L.map(
    (l) =>
      `<div class="line"><span><b>${esc(l.p.n)}</b><br><small class="note">${l.p.sz[l.si][0]}, ${$(l.pr)} each</small></span><span><button class="q" data-q="${l.k}" data-d="-1" aria-label="Remove one">−</button> ${l.q} <button class="q" data-q="${l.k}" data-d="1" aria-label="Add one">+</button></span></div>`,
  ).join("");
  const body =
    st.stage === "cart"
      ? `<button class="btn" style="width:100%;margin-top:14px" data-go="checkout">Checkout</button>`
      : `<form id="co" style="margin-top:8px"><label for="nm">Full name</label><input id="nm" required maxlength="50" autocomplete="name"><label for="em">Email</label><input id="em" type="email" required autocomplete="email"><label for="ad">Shipping address</label><input id="ad" required maxlength="100" autocomplete="street-address"><button class="btn" style="width:100%;margin-top:16px">Place order, ${$(sub + ship)}</button></form>`;
  $id("cbody").innerHTML = head + items + sum + body;
}

document.addEventListener("click", (e) => {
  const t = e.target,
    d = t.closest(
      "[data-c],[data-view],[data-add],[data-size],[data-q],[data-go],[data-close],#open-cart",
    );
  if (t.tagName === "DIALOG") return t.close();
  if (!d) return;
  const x = d.dataset;
  if (d.id === "open-cart") {
    if (st.stage === "done") st.stage = "cart";
    renderCart();
    $id("cart").showModal();
  } else if (x.c) {
    st.cat = x.c;
    grid();
  } else if (x.view) {
    st.pick = { id: +x.view, si: 0 };
    product();
    $id("pdlg").showModal();
  } else if (x.size) {
    st.pick.si = +x.size;
    product();
  } else if (x.add) {
    cart[x.add] = (cart[x.add] || 0) + 1;
    saveC();
    st.stage = "cart";
    $id("pdlg").close();
    renderCart();
    $id("cart").showModal();
  } else if (x.q) {
    cart[x.q] += +x.d;
    if (cart[x.q] < 1) delete cart[x.q];
    saveC();
    renderCart();
  } else if (x.go) {
    st.stage = "checkout";
    renderCart();
  } else if (x.close) $id(x.close).close();
});
$id("q").oninput = (e) => {
  st.q = e.target.value.trim().toLowerCase();
  grid();
};
$id("sort").onchange = (e) => {
  st.sort = e.target.value;
  grid();
};
document.addEventListener("submit", (e) => {
  if (e.target.id !== "co") return;
  e.preventDefault();
  const L = lines(),
    sub = L.reduce((s, l) => s + l.pr * l.q, 0);
  st.last = {
    name: $id("nm").value,
    no: "#EP-" + (1000 + Math.floor(Math.random() * 9000)),
    total: sub + (sub >= 50 ? 0 : 5.95),
  };
  Object.keys(cart).forEach((k) => delete cart[k]);
  saveC();
  st.stage = "done";
  renderCart();
});
grid();
renderCart();