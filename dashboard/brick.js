/* Skill Vault, toy-brick build: the library as studded plastic bricks on a baseplate.
   Snapped-on picks are red, set-aside are yellow, rejects grey, your bench is a green
   build with one stud per installed skill, and unscanned GitHub skills are clear bricks
   still in the bag, with ASCII inside. Projection from the Hairline engine (window.HL). */
(() => {
  const H = window.HL;
  if (!H) return;
  const { Cam, fit, proj, unproj } = H;
  const NS = 'http://www.w3.org/2000/svg';
  const sv = (tag, attrs, parent) => { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); if (parent) parent.appendChild(e); return e; };
  const $ = (id) => document.getElementById(id);
  const num = (x) => Number(x) || 0;
  const tot = (r) => num(r.fit) + num(r.leverage) + num(r.craft) + num(r.originality);
  const ce = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; };
  const hash = (s) => { let h = 7; for (const ch of String(s)) h = (h * 31 + ch.charCodeAt(0)) >>> 0; return h; };
  const rng = (seed) => () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
  const COL = { ADD: 'red', WATCH: 'yellow', SKIP: 'grey' };
  const WORD = { ADD: 'snapped on', WATCH: 'set aside', SKIP: 'rejected' };

  const C = Cam(45, 0.5, 1);
  fit(C, [[0, 0, 0]], 0, 0);
  const P = proj(C);
  const f1 = (n) => n.toFixed(1);
  const pts = (a) => a.map((p) => `${f1(p[0])},${f1(p[1])}`).join(' ');
  const line = (a) => 'M' + a.map((p) => `${f1(p[0])},${f1(p[1])}`).join('L');
  const onFloor = (x, y, z = 0) => { const [sx, sy] = P(x, y, z); return `matrix(0.7071 0.3536 -0.7071 0.3536 ${f1(sx)} ${f1(sy)})`; };
  const onFront = (x, y, z) => { const [sx, sy] = P(x, y, z); return `matrix(0.7071 0.3536 0 0.866 ${f1(sx)} ${f1(sy)})`; };
  const flatRing = (cx, cy, z, r, n = 14) => Array.from({ length: n }, (_, i) => { const t = (i / n) * Math.PI * 2; return P(cx + r * Math.cos(t), cy + r * Math.sin(t), z); });

  // aisle centres in world units, around your bench; Building is the big one
  const AISLES = {
    'Post-production': [190, -20], 'AI filmmaking': [-20, 190], 'Building tools & sites': [250, 250],
    'Business & outreach': [-250, 30], 'Wildcard': [30, -250],
  };
  const TINT = { 'Post-production': '#2dd4bf', 'AI filmmaking': '#e879f9', 'Building tools & sites': '#60a5fa', 'Business & outreach': '#fb923c', 'Wildcard': '#a3e635' };
  const FLOORS = 12, FLOOR_H = 6, TW = 14;
  const AISLE_NO = { 'Post-production': 1, 'AI filmmaking': 2, 'Building tools & sites': 3, 'Business & outreach': 4, 'Wildcard': 5 };
  const BOUND = 520, COURSE = 9.6, GLYPHS = '░▒▓#%&@*+=';

  const world = $('world'), svg = $('map'), camG = $('cam'), floorG = $('floor'), entsG = $('ents');
  let ents = [], built = false, installed = [], player, bot, targetMark = null;
  const visited = new Set();
  const quest = { home: false, openedHome: false, add: false };

  /* ---------- drawing a brick ---------- */
  function stud(g, cx, cy, z, col, r = 2.5) {
    const base = flatRing(cx, cy, z, r), top = flatRing(cx, cy, z + 1.9, r);
    let li = 0, ri = 0;
    base.forEach((p, i) => { if (p[0] < base[li][0]) li = i; if (p[0] > base[ri][0]) ri = i; });
    const walk = (dir) => { const out = []; let j = li; for (;;) { out.push(base[j]); if (j === ri) break; j = (j + dir + base.length) % base.length; } return out; };
    const a = walk(1), b = walk(-1);
    const low = a.reduce((s, p) => s + p[1], 0) / a.length > b.reduce((s, p) => s + p[1], 0) / b.length ? a : b;
    sv('polygon', { points: pts([top[li], ...low, top[ri]]), class: 'ss ' + col }, g);
    sv('polygon', { points: pts(top), class: 'st ' + col }, g);
    const [hx, hy] = P(cx - r * 0.35, cy - r * 0.35, z + 1.9);
    sv('ellipse', { cx: f1(hx), cy: f1(hy), rx: f1(r * 0.5), ry: f1(r * 0.24), class: 'sh' }, g);
  }
  function brick(g, x, y, w, d, h, col, opts = {}) {
    const x1 = x + w, y1 = y + d;
    if (col !== 'raw') {
      sv('polygon', { points: pts([P(x - 1, y - 1, 0), P(x1 + 5, y - 1, 0), P(x1 + 5, y1 + 6, 0), P(x - 1, y1 + 6, 0)]), class: 'shd1' }, g);
      sv('polygon', { points: pts([P(x, y, 0), P(x1 + 2.5, y, 0), P(x1 + 2.5, y1 + 3, 0), P(x, y1 + 3, 0)]), class: 'shd2' }, g);
    }
    sv('polygon', { points: pts([P(x1, y, 0), P(x1, y1, 0), P(x1, y1, h), P(x1, y, h)]), class: 'fs ' + col }, g);
    sv('polygon', { points: pts([P(x, y1, 0), P(x1, y1, 0), P(x1, y1, h), P(x, y1, h)]), class: 'ff ' + col }, g);
    sv('polygon', { points: pts([P(x, y, h), P(x1, y, h), P(x1, y1, h), P(x, y1, h)]), class: 'ft ' + col + ' lid' }, g);
    let seams = '', his = '';
    const course = opts.course || COURSE;
    for (let z = course; z < h - 1; z += course) {
      seams += line([P(x, y1, z), P(x1, y1, z), P(x1, y, z)]);
      his += line([P(x, y1, z + 0.7), P(x1, y1, z + 0.7), P(x1, y, z + 0.7)]);
    }
    if (seams) { sv('path', { d: seams, class: 'seam' }, g); sv('path', { d: his, class: 'seamhi' }, g); }
    sv('path', { d: line([P(x, y1, h), P(x1, y1, h), P(x1, y, h)]), class: 'edgehi' }, g);
    if (opts.noStuds) return;
    const nx = opts.nx || Math.max(1, Math.round(w / 8)), ny = opts.ny || Math.max(1, Math.round(d / 8));
    const cells = [];
    for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) cells.push([x + ((i + 0.5) * w) / nx, y + ((j + 0.5) * d) / ny, j * nx + i]);
    cells.sort((a, b) => a[0] + a[1] - b[0] - b[1]);
    cells.forEach(([cx, cy, k]) => stud(g, cx, cy, h, opts.studCol ? opts.studCol(k) : col));
  }

  /* ---------- the floor ---------- */
  function field(x, y) {
    const n = Math.sin(x * 0.012 + Math.cos(y * 0.009) * 1.7) + Math.cos(y * 0.011 - Math.sin(x * 0.008) * 1.3);
    const toHome = Math.atan2(-y, -x), d = Math.hypot(x, y), pull = Math.min(1, 140 / (d + 60)), a = n * 1.25;
    return Math.atan2(Math.sin(a) * (1 - pull) + Math.sin(toHome) * pull, Math.cos(a) * (1 - pull) + Math.cos(toHome) * pull);
  }
  function drawFloor() {
    // the baseplate: iso studs as a pattern, under everything
    const r = sv('rect', { x: -900, y: -600, width: 1800, height: 1200, fill: 'url(#plate)' }, floorG);
    r.setAttribute('class', 'plate');
    const rn = rng(41);
    let d = '';
    for (let gx = -BOUND; gx <= BOUND; gx += 38) for (let gy = -BOUND; gy <= BOUND; gy += 38) {
      let x = gx + rn() * 30, y = gy + rn() * 30;
      const ps = [P(x, y, 0.3)];
      for (let s = 0; s < 20; s++) { const a = field(x, y); x += Math.cos(a) * 7; y += Math.sin(a) * 7; if (Math.abs(x) > BOUND || Math.abs(y) > BOUND || Math.hypot(x, y) < 50) break; ps.push(P(x, y, 0.3)); }
      if (ps.length > 4) d += line(ps);
    }
    sv('path', { d, class: 'flow' }, floorG);
  }
  const floorText = (text, x, y, size, cls) => { sv('text', { class: 'flab ' + (cls || ''), transform: onFloor(x, y), 'font-size': size }, floorG).textContent = text; };

  /* ---------- entities ---------- */
  function shelfEnt(r, x0, y0, take) {
    const w = 16, d = 8, h = COURSE * Math.max(2, Math.min(5, Math.round(tot(r) / 3.6)));
    const col = COL[r.verdict];
    const g = sv('g', { class: 'unit', 'data-ent': '' });
    brick(g, x0, y0, w, d, h, col, {
      nx: 2, ny: 1,
      studCol: (k) => (r.adopted ? 'green' : r.flag && k === 1 ? 'warn' : col),
    });
    if (r.verdict === 'ADD') {
      const [cx, cy] = P(x0 + w / 2, y0 + d, h - 7);
      sv('ellipse', { cx: f1(cx), cy: f1(cy), rx: 10.5, ry: 6.5, transform: `rotate(26 ${f1(cx)} ${f1(cy)})`, class: 'ring' }, g);
    }
    sv('text', { class: 'tno', transform: onFront(x0 + 1.4, y0 + d + 0.1, 5.2), 'font-size': 3.6 }, g).textContent = `T${take}`;
    return { kind: 'review', data: r, take, g, x0, y0, x1: x0 + w, y1: y0 + d, h, key: x0 + w + y0 + d, cx: x0 + w / 2, cy: y0 + d / 2 };
  }
  function rawEnt(r, x0, y0) {
    const w = 12, d = 6, h = COURSE * (1 + (hash(r.id) % 2));
    const g = sv('g', { class: 'unit rawu', 'data-ent': '' });
    brick(g, x0, y0, w, d, h, 'raw', { noStuds: true });
    const rand = rng(hash(r.id));
    const t = sv('text', { class: 'ascii', transform: onFront(x0 + 0.8, y0 + d + 0.1, h - 3), 'font-size': 3.2 }, g);
    t.textContent = Array.from({ length: 5 }, () => GLYPHS[Math.floor(rand() * GLYPHS.length)]).join('');
    const rows = [t];
    return { kind: 'frontier', data: r, g, rows, x0, y0, x1: x0 + w, y1: y0 + d, h, key: x0 + w + y0 + d, cx: x0 + w / 2, cy: y0 + d / 2 };
  }
  function benchEnt() {
    const x0 = -44, y0 = -8, w = 88, d = 16, h = COURSE * 2;
    const g = sv('g', { class: 'unit benchu', 'data-ent': '' });
    // a darker green base plate, then the build: one stud per installed skill (11 × 2)
    brick(g, x0 - 6, y0 - 6, w + 12, d + 12, 2.2, 'plateg', { nx: 1, ny: 1, studCol: () => 'none' });
    const gb = sv('g', {}, g);
    brick(gb, x0, y0, w, d, h, 'green', {
      nx: 11, ny: 2,
      studCol: (k) => (k < installed.length ? (installed[k].via === 'scout' ? 'red' : 'green') : 'none'),
    });
    return { kind: 'home', data: { id: 'bench', name: 'your bench' }, g, x0: x0 - 6, y0: y0 - 6, x1: x0 + w + 6, y1: y0 + d + 6, h, key: x0 + w + y0 + d + 12, cx: 0, cy: 0 };
  }
  // a tower of unopened skills: one floor per skill, glass tinted by its district
  function towerEnt(lane, items, x0, y0, no) {
    const h = items.length * FLOOR_H + 2, x1 = x0 + TW, y1 = y0 + TW;
    const g = sv('g', { class: 'unit toweru', 'data-ent': '' });
    g.style.color = TINT[lane];
    brick(g, x0 - 2, y0 - 2, TW + 4, TW + 4, 2, 'lobby', { noStuds: true });
    const b = sv('g', {}, g);
    brick(b, x0, y0, TW, TW, h, 'glass', { nx: 2, ny: 2, course: FLOOR_H });
    // a lit window band on every floor, front and side
    let wf = '', ws = '';
    for (let i = 0; i < items.length; i++) {
      const z0 = 2 + i * FLOOR_H + 1.6, z1 = z0 + 2.6;
      wf += 'M' + pts([P(x0 + 1.5, y1 + 0.05, z0), P(x1 - 1.5, y1 + 0.05, z0), P(x1 - 1.5, y1 + 0.05, z1), P(x0 + 1.5, y1 + 0.05, z1)]).replace(/ /g, 'L') + 'Z';
      ws += 'M' + pts([P(x1 + 0.05, y0 + 1.5, z0), P(x1 + 0.05, y1 - 1.5, z0), P(x1 + 0.05, y1 - 1.5, z1), P(x1 + 0.05, y0 + 1.5, z1)]).replace(/ /g, 'L') + 'Z';
    }
    sv('path', { d: wf, class: 'win' }, g);
    sv('path', { d: ws, class: 'win side' }, g);
    return { kind: 'tower', lane, no, items, g, x0: x0 - 2, y0: y0 - 2, x1: x1 + 2, y1: y1 + 2, h, key: x1 + y1 + 4, cx: x0 + TW / 2, cy: y0 + TW / 2 };
  }
  function road(xa, ya, xb, yb, w) {
    const dx = xb - xa, dy = yb - ya, L = Math.hypot(dx, dy), nx = (-dy / L) * w / 2, ny = (dx / L) * w / 2;
    sv('polygon', { points: pts([P(xa + nx, ya + ny, 0.3), P(xb + nx, yb + ny, 0.3), P(xb - nx, yb - ny, 0.3), P(xa - nx, ya - ny, 0.3)]), class: 'road' }, floorG);
    sv('path', { d: line([P(xa, ya, 0.4), P(xb, yb, 0.4)]), class: 'lane-line' }, floorG);
  }
  function scramble(e) {
    if (!e.rows) return;
    let n = 0;
    const tick = () => { e.rows.forEach((t) => { t.textContent = Array.from({ length: 5 }, () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)]).join(''); }); if (++n < 7) setTimeout(tick, 55); };
    tick();
  }

  function build(inst, reviews, frontier) {
    installed = inst;
    floorG.replaceChildren(); entsG.replaceChildren(); ents = [];
    drawFloor();
    floorText(`YOUR BENCH · ${inst.length} PIECES BUILT IN`, -50, 34, 7, 'big');
    ents.push(benchEnt());
    const takeOf = new Map(reviews.slice().sort((a, b) => tot(b) - tot(a)).map((r, i) => [r.id, i + 1]));
    // the plaza, and a road from it to every district
    sv('polygon', { points: pts([P(-62, -40, 0.25), P(62, -40, 0.25), P(62, 44, 0.25), P(-62, 44, 0.25)]), class: 'plaza' }, floorG);
    for (const [lx, ly] of Object.values(AISLES)) road(0, 0, lx * 0.82, ly * 0.82, 18);
    for (const lane of Object.keys(AISLES)) {
      const scanned = reviews.filter((r) => r.lane === lane).sort((a, b) => tot(b) - tot(a));
      const unopened = frontier.filter((r) => (r.lane || 'Wildcard') === lane).sort((a, b) => String(a.name).localeCompare(String(b.name)));
      const [cxw, cyw] = AISLES[lane];
      // floors per tower vary, so the district reads as a skyline, not a car park
      const SKY = [9, 14, 11, 16, 8, 12, 15, 10, 13, 7];
      const towers = [];
      for (let i = 0, k = hash(lane) % SKY.length; i < unopened.length; k++) { const n = SKY[k % SKY.length]; towers.push(unopened.slice(i, i + n)); i += n; }
      const cols = Math.max(2, Math.ceil(Math.sqrt(towers.length))), rows = Math.ceil(towers.length / cols);
      const PITCH = 26, gw = cols * PITCH, gh = rows * PITCH;
      const bx0 = cxw - gw / 2, by0 = cyw - gh / 2;
      // shops: the inspected skills along the district's front street
      const sy = by0 + gh + 8, sx0 = cxw - (Math.max(1, scanned.length) * 22) / 2;
      const x0a = Math.min(bx0, sx0) - 12, x1a = Math.max(bx0 + gw, sx0 + scanned.length * 22) + 6, y0a = by0 - 12, y1a = sy + 22;
      const plate = sv('polygon', { points: pts([P(x0a, y0a, 0.5), P(x1a, y0a, 0.5), P(x1a, y1a, 0.5), P(x0a, y1a, 0.5)]), class: 'district' }, floorG);
      plate.style.color = TINT[lane];
      floorText(`${lane.toUpperCase()} · ${scanned.length} SHOPS · ${towers.length} TOWERS · ${unopened.length} SKILLS`, x0a + 2, y1a + 12, 7, 'big');
      towers.forEach((floors, i) => {
        // taller towers toward the middle of the block, like a skyline
        const e = towerEnt(lane, floors, bx0 + (i % cols) * PITCH, by0 + Math.floor(i / cols) * PITCH, i + 1);
        e.aisle = lane; ents.push(e);
      });
      scanned.forEach((it, i) => { const e = shelfEnt(it, sx0 + i * 22, sy, takeOf.get(it.id)); e.aisle = lane; ents.push(e); });
    }
    ents.sort((a, b) => a.key - b.key);
    ents.forEach((e, i) => { e.g.dataset.ent = i; entsG.appendChild(e.g); e.sc = P(e.cx, e.cy, e.h / 2); e.shown = true; });
    lastCull = null;

    bot = { g: sv('g', { class: 'bot' }) };
    entsG.appendChild(bot.g);
    targetMark = sv('polygon', { class: 'target', visibility: 'hidden' }, floorG);
    player = { x: 0, y: 46, vx: 0, vy: 0, fx: 1, fy: 1, last: '' };
    drawBot(0);
    buildMini();
    built = true;
    updateHud();
    kick();
  }

  /* ---------- you: a small white brick with an eye ---------- */
  function drawBot(bob) {
    const { x, y } = player;
    const sig = `${f1(x)},${f1(y)},${bob.toFixed(1)},${player.fx.toFixed(1)},${player.fy.toFixed(1)}`;
    if (sig === player.last) return;
    player.last = sig;
    bot.g.replaceChildren();
    const g = sv('g', { transform: `translate(0 ${f1(-bob)})` }, bot.g);
    brick(g, x - 4, y - 4, 8, 8, COURSE, 'white', { nx: 1, ny: 1 });
    const [ex, ey] = P(x + player.fx * 4.2, y + player.fy * 4.2, COURSE * 0.6);
    sv('circle', { cx: f1(ex), cy: f1(ey), r: 1.4, class: 'eye' }, g);
  }
  let order = -1;
  function restackBot() {
    const k = player.x + player.y + 4;
    let i = ents.findIndex((e) => e.key > k);
    if (i < 0) i = ents.length;
    if (i === order) return;
    order = i;
    entsG.insertBefore(bot.g, i < ents.length ? ents[i].g : null);
  }
  function collide() {
    const R = 5;
    for (const e of ents) {
      const ax0 = e.x0 - R, ax1 = e.x1 + R, ay0 = e.y0 - R, ay1 = e.y1 + R;
      if (player.x > ax0 && player.x < ax1 && player.y > ay0 && player.y < ay1) {
        const pl = player.x - ax0, pr = ax1 - player.x, pt = player.y - ay0, pb = ay1 - player.y, m = Math.min(pl, pr, pt, pb);
        if (m === pl) player.x = ax0; else if (m === pr) player.x = ax1; else if (m === pt) player.y = ay0; else player.y = ay1;
      }
    }
    player.x = Math.max(-BOUND, Math.min(BOUND, player.x));
    player.y = Math.max(-BOUND, Math.min(BOUND, player.y));
  }
  const rectDist = (e, x, y) => Math.hypot(Math.max(e.x0 - x, 0, x - e.x1), Math.max(e.y0 - y, 0, y - e.y1));

  /* ---------- focus, panels, quests ---------- */
  let focus = null, pendingOpen = null;
  const prompt = $('prompt');
  function updateFocus() {
    let best = null, bd = Infinity;
    for (const e of ents) { const d = rectDist(e, player.x, player.y); if (d < bd) { bd = d; best = e; } }
    const f = bd < 14 ? best : null;
    if (f === focus) return;
    if (focus) focus.g.classList.remove('focus');
    focus = f;
    if (f) {
      f.g.classList.add('focus');

      if (f.kind === 'home') quest.home = true;
      else if (!visited.has(f)) { visited.add(f); f.g.classList.add('visited'); }
      const verb = f.kind === 'home' ? 'open your bench' : f.kind === 'tower' ? `enter tower ${f.no} · ${f.lane} · ${f.items.length} floors` : `pick up · ${f.data.name}`;
      prompt.replaceChildren(ce('kbd', null, 'E'), document.createTextNode(verb));
      prompt.classList.add('on');
      if (pendingOpen === f) { pendingOpen = null; openPanel(f); }
    } else prompt.classList.remove('on');
    updateHud();
  }
  function meters(r) {
    const box = ce('div', 'meters'), col = COL[r.verdict];
    [['fit', r.fit], ['leverage', r.leverage], ['craft', r.craft], ['originality', r.originality]].forEach(([k, v]) => {
      const row = ce('span', 'pips');
      for (let i = 1; i <= 5; i++) row.append(ce('i', i <= num(v) ? 'on ' + col : ''));
      box.append(ce('span', 'k', k), row, ce('b', null, String(num(v))));
    });
    return box;
  }
  const link = (url, text) => { const a = ce('a', 'src', text + ' ↗'); a.href = url; a.target = '_blank'; a.rel = 'noopener'; return a; };
  function tile(text, col) { return ce('span', 'tile ' + col, text); }
  function addBtn(r, unopened) {
    const b = ce('button', 'btn yellow addbtn');
    b.type = 'button';
    b.textContent = r.adopted ? 'ALREADY IN YOUR BUILD' : unopened ? '+ CHECK & ADD TO MY CLAUDE' : '+ ADD TO MY CLAUDE';
    if (r.adopted) b.disabled = true;
    b.addEventListener('click', () => window.skillAdd && window.skillAdd(r, !!unopened));
    return b;
  }
  function openPanel(e) {
    const body = $('pbody'), kids = [];
    if (e.kind === 'home') {
      quest.openedHome = true;
      const mine = installed.filter((s) => s.by === 'you').length;
      const head = ce('div', 'phead'); head.append(tile('B', 'green'), ce('span', 'pmeta', `YOUR BENCH · ${installed.length} PIECES`));
      kids.push(head, ce('h3', null, 'Your bench'), ce('p', 'meta', `${mine} built by you · ${installed.length - mine} from Anthropic · red studs came from the scout`));
      const list = ce('div', 'pieces');
      installed.forEach((s, i) => {
        const row = ce('div', 'piece'), mid = ce('div');
        mid.append(ce('b', null, s.name), ce('span', 'd', s.summary));
        row.append(ce('span', 'stud ' + (s.via === 'scout' ? 'red' : 'green')), mid, ce('em', null, s.via === 'scout' ? 'scout' : s.by === 'you' ? 'yours' : 'anthropic'));
        list.append(row);
      });
      kids.push(list);
    } else if (e.kind === 'review') {
      const r = e.data;
      if (r.verdict === 'ADD') quest.add = true;
      const head = ce('div', 'phead'); head.append(tile('T' + e.take, COL[r.verdict]), ce('span', 'pmeta', `${r.lane.toUpperCase()} · BUILD 01`));
      kids.push(head, ce('h3', null, r.name), tile(r.adopted ? 'in your build' : WORD[r.verdict], r.adopted ? 'green' : COL[r.verdict]),
        ce('p', 'meta', `${tot(r)}/20 · inspected ${r.date}`), meters(r), ce('p', null, r.summary));
      if (r.why) kids.push(ce('p', 'why', r.why));
      if (r.caveat) kids.push(ce('p', 'cav', r.caveat));
      if (r.flag) kids.push(ce('div', 'flag', 'Cracked piece — never used · ' + r.flag));
      kids.push(addBtn(r), link(r.url, r.id));
    } else if (e.kind === 'tower') {
      return openTower(e);
    } else {
      const r = e.data;
      const raw = ce('pre', 'rawbox'), rand = rng(hash(r.id) + 3);
      raw.textContent = Array.from({ length: 4 }, () => Array.from({ length: 30 }, () => GLYPHS[Math.floor(rand() * GLYPHS.length)]).join('')).join('\n');
      const head = ce('div', 'phead'); head.append(tile('?', 'raw'), ce('span', 'pmeta', `UNOPENED · ${(r.lane || 'Wildcard').toUpperCase()}`));
      kids.push(head, raw, ce('h3', null, r.name), ce('p', 'meta', `${r.owner} · listed on ${r.source}`), ce('p', null, r.summary),
        ce('p', 'cav', 'Unopened: nobody has checked this piece — not its code, not its claims. Adding it asks Claude to inspect it first.'), addBtn(r, true), link(r.url, r.id));
    }
    body.replaceChildren(...kids);
    body.scrollTop = 0;
    $('panel').classList.add('open');
    updateHud();
  }
  // a tower's lobby directory: every floor, top down; open one to read it
  function openTower(e, floorIdx) {
    const body = $('pbody'), kids = [];
    if (floorIdx == null) {
      const head = ce('div', 'phead'); const tl = tile('▲' + e.no, 'raw'); tl.style.color = TINT[e.lane]; tl.style.borderColor = TINT[e.lane];
      head.append(tl, ce('span', 'pmeta', `${e.lane.toUpperCase()} · LOBBY DIRECTORY`));
      kids.push(head, ce('h3', null, `Tower ${e.no}`), ce('p', 'meta', `${e.items.length} unopened skills, one per floor · nothing here has been checked yet`));
      const list = ce('div', 'floors');
      e.items.map((r, i) => [r, i]).reverse().forEach(([r, i]) => {
        const row = ce('div', 'floor');
        const open = ce('button', 'floorbtn'); open.type = 'button';
        open.append(ce('span', 'fl', 'F' + String(i + 1).padStart(2, '0')), ce('b', null, r.name), ce('span', 'd', r.summary));
        open.addEventListener('click', () => openTower(e, i));
        const add = ce('button', 'mini-add'); add.type = 'button'; add.textContent = '+ add';
        add.addEventListener('click', () => window.skillAdd && window.skillAdd(r, true));
        row.append(open, add); list.append(row);
      });
      kids.push(list);
    } else {
      const r = e.items[floorIdx];
      const back = ce('button', 'backbtn', `← tower ${e.no} directory`); back.type = 'button';
      back.addEventListener('click', () => openTower(e));
      const raw = ce('pre', 'rawbox'), rand = rng(hash(r.id) + 3);
      raw.textContent = Array.from({ length: 4 }, () => Array.from({ length: 30 }, () => GLYPHS[Math.floor(rand() * GLYPHS.length)]).join('')).join('\n');
      const head = ce('div', 'phead'); head.append(tile('F' + (floorIdx + 1), 'raw'), ce('span', 'pmeta', `TOWER ${e.no} · ${e.lane.toUpperCase()}`));
      kids.push(back, head, raw, ce('h3', null, r.name), ce('p', 'meta', `${r.owner} · listed on ${r.source}`), ce('p', null, r.summary),
        ce('p', 'cav', 'Unopened: nobody has checked this skill — not its code, not its claims. Adding it asks Claude to inspect it first.'), addBtn(r, true), link(r.url, r.id));
    }
    body.replaceChildren(...kids);
    body.scrollTop = 0;
    $('panel').classList.add('open');
    updateHud();
  }
  const closePanel = () => { $('panel').classList.remove('open'); world.focus({ preventScroll: true }); };
  $('pclose').addEventListener('click', closePanel);
  prompt.addEventListener('click', () => focus && openPanel(focus));

  function zoneName() {
    if (Math.hypot(player.x, player.y) < 80) return 'your bench';
    let best = null, bd = 300;
    for (const [n, c] of Object.entries(AISLES)) { const d = Math.hypot(player.x - c[0], player.y - c[1]); if (d < bd) { bd = d; best = n; } }
    return best ? `${best} district` : 'the streets';
  }
  function updateHud() {
    if (!built) return;
    const total = ents.length - 1, fv = [...visited].filter((e) => e.kind === 'tower').length;
    const bar = '█'.repeat(Math.round((visited.size / total) * 18)).padEnd(18, '░');
    const qs = [['walk to your bench', quest.home], ['open it, see what\'s built in', quest.openedHome], ['find a piece to snap on', quest.add], [`visit 5 towers ${Math.min(fv, 5)}/5`, fv >= 5]];
    $('hudlog').textContent = ['BUILD LOG', `zone  ${zoneName()}`, `seen  ${String(visited.size).padStart(2, '0')}/${total} ${bar}`, '',
      ...qs.map(([t, d]) => `[${d ? 'x' : ' '}] ${t}`), '[!] create the github repo', '    (outside the build)'].join('\n');
  }

  /* ---------- ASCII minimap ---------- */
  const MW = 32, MH = 13;
  let miniBase = [], miniT = () => [0, 0], miniLast = '';
  function buildMini() {
    const ps = ents.map((e) => P(e.cx, e.cy, 0)), xs = ps.map((p) => p[0]), ys = ps.map((p) => p[1]);
    const x0 = Math.min(...xs) - 20, x1 = Math.max(...xs) + 20, y0 = Math.min(...ys) - 20, y1 = Math.max(...ys) + 20;
    miniT = (wx, wy) => { const [a, b] = P(wx, wy, 0); return [Math.round(((a - x0) / (x1 - x0)) * (MW - 1)), Math.round(((b - y0) / (y1 - y0)) * (MH - 1))]; };
    miniBase = Array.from({ length: MH }, () => Array(MW).fill('·'));
    ents.forEach((e) => {
      const [c, r] = miniT(e.cx, e.cy);
      if (r < 0 || r >= MH || c < 0 || c >= MW) return;
      const ch = e.kind === 'home' ? 'B' : e.kind === 'tower' ? '#' : e.data.verdict === 'ADD' ? 'O' : e.data.verdict === 'WATCH' ? 's' : 'x';
      if (miniBase[r][c] === '·' || ch === 'B' || ch === 'O') miniBase[r][c] = ch;
    });
    miniLast = '';
  }
  function drawMini() {
    const [c, r] = miniT(player.x, player.y), key = c + ',' + r;
    if (key === miniLast) return;
    miniLast = key;
    const g = miniBase.map((row) => row.slice());
    if (r >= 0 && r < MH && c >= 0 && c < MW) g[r][c] = '@';
    $('mini').textContent = g.map((row) => row.join('')).join('\n') + '\n@ you B bench O snapped s aside # tower';
  }

  /* ---------- camera, input, full screen, loop ---------- */
  let W = 800, Hh = 500, zoom = 1.6;
  const cam = { x: 0, y: 0 }, keys = new Set();
  let target = null, running = false, lastT = 0;
  function resize() {
    W = world.clientWidth || 800; Hh = world.clientHeight || 500;
    svg.setAttribute('viewBox', `0 0 ${W} ${Hh}`);
    if (!resize.done) { zoom = W < 640 ? 1.1 : 1.6; resize.done = true; }
    kick();
  }
  new ResizeObserver(resize).observe(world);

  const fsBtn = $('fs');
  const isFull = () => document.fullscreenElement === world || world.classList.contains('max');
  function setFsLabel() { fsBtn.lastChild.textContent = isFull() ? 'EXIT FULL SCREEN' : 'FULL SCREEN'; fsBtn.setAttribute('aria-pressed', String(isFull())); }
  async function toggleFull() {
    if (document.fullscreenElement === world) { await document.exitFullscreen().catch(() => {}); return; }
    if (world.classList.contains('max')) { world.classList.remove('max'); setFsLabel(); return; }
    let ok = false;
    if (world.requestFullscreen && document.fullscreenEnabled) { try { await world.requestFullscreen(); ok = true; } catch { ok = false; } }
    if (!ok) world.classList.add('max'); // the frame forbids it: fill the window instead
    setFsLabel();
    world.focus({ preventScroll: true });
  }
  fsBtn.addEventListener('click', toggleFull);
  document.addEventListener('fullscreenchange', setFsLabel);

  const DIRS = { w: [-1, -1], arrowup: [-1, -1], s: [1, 1], arrowdown: [1, 1], a: [-1, 1], arrowleft: [-1, 1], d: [1, -1], arrowright: [1, -1] };
  world.addEventListener('keydown', (ev) => {
    const k = ev.key.toLowerCase();
    if (DIRS[k]) { keys.add(k); target = null; ev.preventDefault(); kick(); hideStart(); }
    else if (k === 'e' || k === 'enter' || k === ' ') { if (focus) { openPanel(focus); ev.preventDefault(); } }
    else if (k === 'escape') { if ($('panel').classList.contains('open')) closePanel(); else if (world.classList.contains('max')) toggleFull(); }
    else if (k === 'f') toggleFull();
    else if (k === '+' || k === '=') setZoom(zoom * 1.2);
    else if (k === '-' || k === '_') setZoom(zoom / 1.2);
  });
  world.addEventListener('keyup', (ev) => { keys.delete(ev.key.toLowerCase()); });
  world.addEventListener('blur', () => keys.clear());
  const setZoom = (z) => { zoom = Math.max(0.6, Math.min(3, z)); kick(); };
  $('zin').addEventListener('click', () => setZoom(zoom * 1.25));
  $('zout').addEventListener('click', () => setZoom(zoom / 1.25));
  $('zhome').addEventListener('click', () => { target = [0, 40]; pendingOpen = null; kick(); });

  const screenToWorld = (cx, cy) => { const r = svg.getBoundingClientRect(); return unproj(C, (cx - r.left - W / 2) / zoom + cam.x, (cy - r.top - Hh / 2) / zoom + cam.y, 0); };
  svg.addEventListener('pointerdown', (ev) => {
    if (!built) return;
    world.focus({ preventScroll: true });
    hideStart();
    const g = ev.target.closest('[data-ent]');
    if (g) {
      const e = ents[Number(g.dataset.ent)];
      // open it straight away (towers stand in tight blocks, so the walk there can get boxed in), and stroll over
      openPanel(e);
      if (e.kind !== 'home' && !visited.has(e)) { visited.add(e); e.g.classList.add('visited'); }
      target = [e.cx, e.y1 + (e.kind === 'home' ? 14 : 10)]; pendingOpen = null;
    } else { target = screenToWorld(ev.clientX, ev.clientY); pendingOpen = null; }
    kick();
  });
  const startEl = $('start');
  function hideStart() { startEl.classList.add('gone'); }
  startEl.addEventListener('pointerdown', (ev) => { ev.stopPropagation(); hideStart(); world.focus({ preventScroll: true }); });

  function kick() { if (!running && built) { running = true; lastT = performance.now(); requestAnimationFrame(frame); } }
  function frame(t) {
    const dt = Math.min(0.05, (t - lastT) / 1000); lastT = t;
    let dx = 0, dy = 0;
    for (const k of keys) { dx += DIRS[k][0]; dy += DIRS[k][1]; }
    if (target) { const tx = target[0] - player.x, ty = target[1] - player.y, d = Math.hypot(tx, ty); if (d < 2.5) target = null; else { dx = tx / d; dy = ty / d; } }
    const m = Math.hypot(dx, dy), a = 1 - Math.exp(-dt * 12);
    player.vx += ((m ? (dx / m) * 140 : 0) - player.vx) * a; player.vy += ((m ? (dy / m) * 140 : 0) - player.vy) * a;
    const moving = Math.hypot(player.vx, player.vy) > 1;
    if (moving) {
      const ox = player.x, oy = player.y;
      player.x += player.vx * dt; player.y += player.vy * dt;
      collide();
      if (target && Math.hypot(player.x - ox, player.y - oy) < 0.02) target = null;
      const v = Math.hypot(player.vx, player.vy); player.fx = player.vx / v; player.fy = player.vy / v;
    }
    drawBot(moving ? Math.abs(Math.sin(t / 110)) * 1.6 : 0);
    restackBot();
    updateFocus();
    if (moving) updateHud();
    drawMini();
    if (target) { targetMark.setAttribute('visibility', 'visible'); targetMark.setAttribute('points', pts(flatRing(target[0], target[1], 0.4, 5, 16))); }
    else targetMark.setAttribute('visibility', 'hidden');
    const [px, py] = P(player.x, player.y, 0), k = 1 - Math.exp(-dt * 5);
    cam.x += (px - cam.x) * k; cam.y += (py - cam.y) * k;
    cull();
    camG.setAttribute('transform', `translate(${f1(W / 2)} ${f1(Hh / 2)}) scale(${zoom.toFixed(3)}) translate(${f1(-cam.x)} ${f1(-cam.y)})`);
    if (!moving && !target && keys.size === 0 && Math.hypot(px - cam.x, py - cam.y) < 0.3) { running = false; return; }
    requestAnimationFrame(frame);
  }

  /* ---------- culling: only bricks near the camera are drawn ---------- */
  let lastCull = null;
  function cull(force) {
    if (!lastCull || force || Math.abs(cam.x - lastCull.x) > 40 / zoom || Math.abs(cam.y - lastCull.y) > 40 / zoom || lastCull.z !== zoom || lastCull.w !== W || lastCull.h !== Hh) {
      lastCull = { x: cam.x, y: cam.y, z: zoom, w: W, h: Hh };
      const hw = W / 2 / zoom + 140, hh = Hh / 2 / zoom + 140;
      for (const e of ents) {
        const on = Math.abs(e.sc[0] - cam.x) < hw + 60 && Math.abs(e.sc[1] - cam.y) < hh + 60;
        if (on !== e.shown) { e.shown = on; e.g.style.display = on ? '' : 'none'; }
      }
    }
  }

  /* ---------- data ---------- */
  let sig = '';
  dash.onData(() => {
    const a = dash.data('installed'), b = dash.data('reviews'), c = dash.data('frontier'), st = [a, b, c].map((x) => x.status);
    if (st.some((s) => s === 'error' || s === 'connect' || s === 'declined' || s === 'missing')) {
      if (!built) { const f = ce('div', 'fail', 'Failed to load'); f.style.cssText = 'position:absolute;inset:0;'; world.append(f); }
      return;
    }
    if (st.some((s) => s !== 'ok')) return;
    const s2 = `${a.data.length}|${b.data.length}|${c.data.length}|${b.data.map((r) => r.id + r.verdict).join()}`;
    if (s2 === sig) return;
    sig = s2;
    build(a.data, b.data, c.data);
    resize();
    const [px, py] = P(player.x, player.y, 0); cam.x = px; cam.y = py;
  });
})();
