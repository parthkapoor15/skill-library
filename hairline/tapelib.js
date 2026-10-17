/**
 * Tape library: a data-centre library cabinet with two rows of twelve slots,
 * a cartridge in each but two, every one sitting a little proud of the face.
 * A picker rides a rail along the top. The slot under the pointer is fetched:
 * the picker travels over it and its cartridge slides out, while the
 * neighbours in its row stir, staggered outwards from it. The slider is how
 * far a fetched cartridge comes out, in world units.
 *
 * The pattern: one of many. Tweens for every move (which slot is a choice),
 * a stagger by distance, and a hit test on the slots' resting faces.
 */
const {
  Cam, fit, facing, poly, proj, prism, rings, rrect,
  tset, tval, tween, tdone, disposer, mk, solid, put, pointer, reflect, register,
} = HL;

const COLS = 12, ROWS = 2, PITCH = 14, CW = 11, CH = 20;
const L = COLS * PITCH + 8, D = 56, HH = 62, ZR = [8, 34];
const RAIL = 2.5, CAR = 12, OUT = 52;
// how far each cartridge sits proud at rest, row by row; -1 is an empty slot
const REST = [
  [3, 5, 2, 12, 4, 2, 6, 3, 2, 5, 3, 2],
  [2, 4, 6, 3, 2, 5, 2, 4, 3, 6, -1, -1],
];
const HOME = 3; // the cartridge half out at rest, under the parked picker
const sx = (c) => 4 + c * PITCH + (PITCH - CW) / 2;

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  let pull = value;

  // fitted with a cartridge fully out at both ends and the picker on its rail
  const C = Cam(45, 0.5, 1.46);
  fit(C, [[0, 0, 0], [L, 0, 0], [0, D + OUT, 0], [L, D + OUT, 0], [0, 0, HH + RAIL + CAR], [L, D, HH + RAIL + CAR]], 200, 166);
  const P = proj(C), front = facing(C);
  const onFace = (ring, y) => poly(ring.map((q) => P(q.u, y, q.v)));

  const g = mk("g", {}, svg);
  const [bodyRing, bodyIn] = rings(0, 0, L, D, 6, 1.8);
  reflect(svg, g, P, front, bodyRing, 0, 16);
  put(solid(g), prism(P, front, bodyRing, bodyIn, 0, HH));

  // the slot recesses, on the face
  for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
    mk("path", { d: onFace(rrect(sx(c) - 1.2, ZR[r] - 1.2, sx(c) + CW + 1.2, ZR[r] + CH + 1.2, 2, 4), D), class: REST[r][c] < 0 ? "nf" : "nf lo" }, g);
  }

  // the rail, then the picker riding it
  const [railRing, railIn] = rings(-4, D - 8, L + 4, D - 3, 1.5, 0.6);
  put(solid(g), prism(P, front, railRing, railIn, HH, HH + RAIL));
  const car = solid(g), grip = mk("path", { class: "nf lo" }, car.g);
  const park = sx(HOME) + CW / 2, carX = tween(park);

  // cartridges, painted by column then row: a nearer one covers a farther one
  const carts = [];
  for (let c = 0; c < COLS; c++) for (let r = 0; r < ROWS; r++) {
    if (REST[r][c] < 0) continue;
    const s = solid(g), label = mk("path", { class: "nf lo" }, s.g);
    carts.push({ r, c, s, label, e: tween(REST[r][c]), last: NaN });
  }
  const home = carts.find((k) => k.r === 0 && k.c === HOME);
  home.s.sil.classList.add("hi");

  function drawCart(k, e) {
    if (Math.abs(e - k.last) < 0.01) return;
    k.last = e;
    const x0 = sx(k.c), z0 = ZR[k.r];
    const [ring, inner] = rings(x0, D - 1, x0 + CW, D + e, 1.6, 0.8);
    put(k.s, prism(P, front, ring, inner, z0, z0 + CH));
    k.label.setAttribute("d", onFace(rrect(x0 + 2.2, z0 + 3.5, x0 + CW - 2.2, z0 + CH - 7, 1.4, 4), D + e));
  }
  let lastCar = NaN;
  function drawCar(x) {
    if (Math.abs(x - lastCar) < 0.01) return;
    lastCar = x;
    const [ring, inner] = rings(x - 8, D - 12, x + 8, D + 2, 2.5, 1);
    put(car, prism(P, front, ring, inner, HH + RAIL, HH + RAIL + CAR));
    grip.setAttribute("d", onFace(rrect(x - 5, HH + RAIL + 3, x + 5, HH + RAIL + 6.5, 1.5, 4), D + 2));
  }

  // paint order follows each cartridge's nearest corner (x + y, rule 06): a fetched one moves in front
  let order = carts.slice();
  const depth = (k) => sx(k.c) + CW + k.last + k.r * 0.1;
  function restack() {
    const next = carts.slice().sort((a, b) => depth(a) - depth(b));
    if (next.every((k, i) => k === order[i])) return;
    order = next;
    for (const k of order) g.appendChild(k.s.g);
  }

  const B = register(stage, (_dt, now) => {
    let moving = false;
    for (const k of carts) { drawCart(k, tval(k.e, now)); if (!tdone(k.e, now)) moving = true; }
    restack();
    drawCar(tval(carX, now)); if (!tdone(carX, now)) moving = true;
    return moving;
  });
  bag.add(B.unregister);

  // hit test: the slot whose RESTING face centre is nearest the pointer. Faces never move.
  const centres = [];
  for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) centres.push({ r, c, p: P(sx(c) + CW / 2, D, ZR[r] + CH / 2) });
  function hit([x, y]) {
    let best = null, bd = 15 * 15;
    for (const s of centres) { const dx = x - s.p[0], dy = y - s.p[1], d2 = dx * dx + dy * dy; if (d2 < bd) { bd = d2; best = s; } }
    return best;
  }

  let act = null;
  const key = (s) => (s ? s.r * COLS + s.c : -1);
  const caption = (s) => (s ? `slot ${s.r + 1}·${String(s.c + 1).padStart(2, "0")}${REST[s.r][s.c] < 0 ? " · 0" : ""}` : "rest");

  /** Fetches slot s (null returns everything). The stagger spreads out from the slot fetched, or the one let go. */
  function setActive(s, force) {
    if (key(s) === key(act) && !force) return;
    const now = performance.now(), from = s || act;
    act = s;
    for (const k of carts) {
      const d = s && k.r === s.r ? Math.abs(k.c - s.c) : 9; // only its own row stirs
      const chosen = d === 0;
      // the neighbours stir, the nearest most, and the stir stops two slots away (rule 03)
      const stir = d === 1 ? pull * 0.55 : d === 2 ? pull * 0.28 : d === 3 ? pull * 0.1 : 0;
      const t = !s ? REST[k.r][k.c] : chosen ? pull : k === home ? 3 : REST[k.r][k.c] + stir;
      const delay = from ? Math.abs(k.c - from.c) * 40 : 0;
      tset(k.e, t, now, delay);
      k.s.sil.classList.toggle("hi", s ? chosen : k === home);
    }
    tset(carX, s ? sx(s.c) + CW / 2 : park, now, 0);
    read.textContent = caption(s);
    B.wake();
  }

  bag.add(pointer(stage, { move: (p) => setActive(hit(p)), leave: () => setActive(null) }));
  bag.add(() => svg.replaceChildren());

  return {
    set: (v) => { pull = v; if (act) setActive(act, true); },
    destroy: bag.dispose,
  };
}

hairline({
  name: "tapelib",
  means: "A tape library of two dozen slots: point at one, and the picker fetches its cartridge while the neighbours stir.",
  rules: [1, 2, 5, 8],
  range: [30, 42, 52],
  tour: [[150, 200], [250, 160], [300, 210], null],
  mount,
});
