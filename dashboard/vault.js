/* Skill Vault: a film archive you walk through, drawn with the Hairline engine (window.HL).
   Developed things are line drawings. Undeveloped stock (unscanned GitHub skills) is ASCII.
   The floor is a flow field: the current runs from the unprocessed stock to your bench. */
(() => {
  const H = window.HL;
  if (!H) return;
  const { Cam, fit, proj, facing, rings, prism, ringAt, circ, poly, rrect, unproj } = H;
  const NS = 'http://www.w3.org/2000/svg';
  const sv = (tag, attrs, parent) => { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); if (parent) parent.appendChild(e); return e; };
  const $ = (id) => document.getElementById(id);
  const num = (x) => Number(x) || 0;
  const tot = (r) => num(r.fit) + num(r.leverage) + num(r.craft) + num(r.originality);
  const ce = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; };
  const hash = (s) => { let h = 7; for (const ch of String(s)) h = (h * 31 + ch.charCodeAt(0)) >>> 0; return h; };
  const rng = (seed) => () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
  const NOTE = { ADD: 'circled', WATCH: 'hold', SKIP: 'NG' };

  const C = Cam(45, 0.5, 1);
  fit(C, [[0, 0, 0]], 0, 0);
  const P = proj(C), front = facing(C);
  const f1 = (n) => n.toFixed(1);
  const seg = (a, b) => `M${f1(a[0])},${f1(a[1])}L${f1(b[0])},${f1(b[1])}`;
  const line = (pts) => 'M' + pts.map((p) => `${f1(p[0])},${f1(p[1])}`).join('L');
  // text lying on a face: on the floor (x along, y down) or on a front face (x along, z down)
  const onFloor = (x, y) => { const [sx, sy] = P(x, y, 0); return `matrix(0.7071 0.3536 -0.7071 0.3536 ${f1(sx)} ${f1(sy)})`; };
  const onFront = (x, y, z) => { const [sx, sy] = P(x, y, z); return `matrix(0.7071 0.3536 0 0.866 ${f1(sx)} ${f1(sy)})`; };
  // a circle standing in the front face (an x–z ring), and one lying flat
  const canRing = (cx, y, cz, r, n = 18) => Array.from({ length: n }, (_, i) => { const t = (i / n) * Math.PI * 2; return P(cx + r * Math.cos(t), y, cz + r * Math.sin(t)); });
  const flatRing = (cx, cy, z, r, n = 24) => Array.from({ length: n }, (_, i) => { const t = (i / n) * Math.PI * 2; return P(cx + r * Math.cos(t), cy + r * Math.sin(t), z); });

  const AISLES = {
    'Post-production': [230, 40], 'AI filmmaking': [40, 230], 'Building tools & sites': [215, 225],
    'Business & outreach': [-205, 140], 'Wildcard': [140, -205], 'Uncharted': [-300, -280],
  };
  const AISLE_NO = { 'Post-production': 1, 'AI filmmaking': 2, 'Building tools & sites': 3, 'Business & outreach': 4, 'Wildcard': 5 };
  const BOUND = 560;
  const GLYPHS = '░▒▓#%&@*+=:·';

  const world = $('world'), svg = $('map'), camG = $('cam'), floorG = $('floor'), entsG = $('ents');
  let ents = [], built = false, installed = [], player, bot, targetMark = null;
  const visited = new Set();
  const quest = { home: false, openedHome: false, add: false };

  /* ---------- the floor: a flow field ---------- */
  function field(x, y) {
    // a slow noise, bent toward the bench by the current that runs out of the uncharted stock
    const n = Math.sin(x * 0.012 + Math.cos(y * 0.009) * 1.7) + Math.cos(y * 0.011 - Math.sin(x * 0.008) * 1.3);
    const toHome = Math.atan2(-y, -x);
    const d = Math.hypot(x, y), pull = Math.min(1, 140 / (d + 60));
    const a = n * 1.25;
    return Math.atan2(Math.sin(a) * (1 - pull) + Math.sin(toHome) * pull, Math.cos(a) * (1 - pull) + Math.cos(toHome) * pull);
  }
  function drawFlow() {
    const r = rng(41);
    let d = '';
    for (let gx = -BOUND; gx <= BOUND; gx += 34) for (let gy = -BOUND; gy <= BOUND; gy += 34) {
      let x = gx + r() * 30, y = gy + r() * 30;
      const pts = [P(x, y, 0)];
      for (let s = 0; s < 22; s++) {
        const a = field(x, y); x += Math.cos(a) * 7; y += Math.sin(a) * 7;
        if (Math.abs(x) > BOUND || Math.abs(y) > BOUND) break;
        pts.push(P(x, y, 0));
      }
      if (pts.length > 4) d += line(pts);
    }
    sv('path', { d, class: 'flow' }, floorG);
  }

  /* ---------- the stock ---------- */
  function floorText(text, x, y, size, cls) {
    sv('text', { class: 'flab ' + (cls || ''), transform: onFloor(x, y), 'font-size': size }, floorG).textContent = text;
  }

  function shelfEnt(r, x0, y0, take) {
    const x1 = x0 + 18, y1 = y0 + 12, h = 26 + tot(r) * 1.5;
    const g = sv('g', { class: 'unit v-' + NOTE[r.verdict].toLowerCase(), 'data-ent': '' });
    const [ring, inner] = rings(x0, y0, x1, y1, 2, 1);
    const pr = prism(P, front, ring, inner, 0, h);
    sv('path', { d: pr.sil, class: 'sil' }, g);
    sv('path', { d: pr.crease, class: 'nf lo roof' }, g);
    // shelves, and film cans standing on them
    let shelves = '', cans = '', hubs = '';
    for (let z = 3; z + 9 < h; z += 11) {
      shelves += seg(P(x0 + 1, y1, z), P(x1 - 1, y1, z));
      for (const cx of [x0 + 5, x1 - 5]) { cans += 'M' + canRing(cx, y1 + 0.05, z + 4.6, 3.9).map((p) => `${f1(p[0])},${f1(p[1])}`).join('L') + 'Z'; hubs += 'M' + canRing(cx, y1 + 0.05, z + 4.6, 1).map((p) => `${f1(p[0])},${f1(p[1])}`).join('L') + 'Z'; }
    }
    sv('path', { d: shelves, class: 'lo' }, g);
    sv('path', { d: cans, class: 'can' }, g);
    sv('path', { d: hubs, class: 'nf lo' }, g);
    // the take number, slated on the roof edge
    sv('text', { class: 'slate', transform: onFront(x0 + 1.5, y1, h - 1.4), 'font-size': 3.6 }, g).textContent = `T${take}`;
    // the script supervisor's marks
    if (r.verdict === 'ADD') {
      const [cx, cz] = [x0 + 9, h - 9];
      const wob = (s) => Array.from({ length: 30 }, (_, i) => { const t = (i / 28) * Math.PI * 2 + s; return P(cx + Math.cos(t) * (10.5 + Math.sin(t * 3) * 0.7), y1 + 0.2, cz + Math.sin(t) * (7.5 + Math.cos(t * 2) * 0.6)); });
      sv('path', { d: line(wob(0.3)), class: 'circled' }, g);
    } else if (r.verdict === 'WATCH') {
      sv('path', { d: poly([P(x0 + 2, y1 + 0.2, h - 3), P(x1 - 2, y1 + 0.2, h - 3), P(x1 - 2, y1 + 0.2, h - 8.5), P(x0 + 2, y1 + 0.2, h - 8.5)]), class: 'tape' }, g);
      sv('text', { class: 'tapet', transform: onFront(x0 + 4, y1 + 0.2, h - 4.2), 'font-size': 4 }, g).textContent = 'HOLD';
    } else {
      sv('text', { class: 'ng', transform: onFront(x0 + 2, y1 + 0.2, 6.5), 'font-size': 4.4 }, g).textContent = 'NG';
    }
    if (r.flag) sv('text', { class: 'dmg', transform: onFront(x0 + 1, y1 + 0.3, h * 0.55), 'font-size': 3.3 }, g).textContent = 'DAMAGED NEG';
    if (r.adopted) sv('text', { class: 'stamp', transform: onFront(x0 + 1, y1 + 0.3, 3), 'font-size': 3.2 }, g).textContent = 'ON BENCH';
    return { kind: 'review', data: r, take, g, x0, y0, x1, y1, h, key: x1 + y1, cx: (x0 + x1) / 2, cy: (y0 + y1) / 2 };
  }

  function rawEnt(r, x0, y0) {
    const x1 = x0 + 16, y1 = y0 + 12, h = 20 + (hash(r.id) % 4) * 5;
    const g = sv('g', { class: 'unit raw', 'data-ent': '' });
    const [ring, inner] = rings(x0, y0, x1, y1, 2, 1);
    const pr = prism(P, front, ring, inner, 0, h);
    sv('path', { d: pr.sil, class: 'sil rawsil' }, g);
    const rows = [], rand = rng(hash(r.id));
    for (let z = h - 2.6, i = 0; z > 2; z -= 3.6, i++) {
      const t = sv('text', { class: 'ascii', transform: onFront(x0 + 0.8, y1 + 0.1, z), 'font-size': 3.4 }, g);
      t.textContent = Array.from({ length: 7 }, () => GLYPHS[Math.floor(rand() * GLYPHS.length)]).join('');
      rows.push(t);
    }
    // the top face, in characters too
    const tt = sv('text', { class: 'ascii dim', transform: onFloorAt(x0 + 1, y0 + 4, h), 'font-size': 3.4 }, g);
    tt.textContent = '·:·:·:·';
    return { kind: 'frontier', data: r, g, rows, x0, y0, x1, y1, h, key: x1 + y1, cx: (x0 + x1) / 2, cy: (y0 + y1) / 2 };
  }
  function onFloorAt(x, y, z) { const [sx, sy] = P(x, y, z); return `matrix(0.7071 0.3536 -0.7071 0.3536 ${f1(sx)} ${f1(sy)})`; }

  function scramble(e) {
    if (!e.rows) return;
    let n = 0;
    const tick = () => {
      e.rows.forEach((t) => { t.textContent = Array.from({ length: 7 }, () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)]).join(''); });
      if (++n < 7) setTimeout(tick, 55);
    };
    tick();
  }

  function benchEnt() {
    const x0 = -32, y0 = -16, x1 = 32, y1 = 16, h = 24;
    const g = sv('g', { class: 'unit bench', 'data-ent': '' });
    // the viewer, at the back
    const [vr, vi] = rings(-9, -15, 9, -11, 1.5, 0.7);
    const vp = prism(P, front, vr, vi, h, h + 20);
    sv('path', { d: vp.sil, class: 'sil' }, g);
    sv('path', { d: poly([P(-7, -11, h + 4), P(7, -11, h + 4), P(7, -11, h + 17), P(-7, -11, h + 17)]), class: 'screen' }, g);
    // the table
    const [r, inner] = rings(x0, y0, x1, y1, 4, 1.5);
    const pr = prism(P, front, r, inner, 0, h);
    sv('path', { d: pr.sil, class: 'sil' }, g);
    sv('path', { d: pr.crease, class: 'nf lo' }, g);
    // four platters: picture, picture, sound, sound
    const spokes = [];
    for (const [px, py] of [[-22, 3], [-8, 6], [8, 6], [22, 3]]) {
      sv('path', { d: poly(flatRing(px, py, h + 0.4, 8.5)), class: 'platter' }, g);
      sv('path', { d: poly(flatRing(px, py, h + 0.5, 1.6, 12)), class: 'nf' }, g);
      spokes.push({ el: sv('path', { class: 'spoke' }, g), px, py });
    }
    // 22 loaded reels along the front, one per installed skill; the scout's are red
    let reels = '', red = '';
    for (let i = 0; i < 22; i++) {
      const cx = x0 + 4.5 + (i % 11) * 5.4, cz = i < 11 ? 15 : 7;
      const d = 'M' + canRing(cx, y1 + 0.05, cz, 2.2, 14).map((p) => `${f1(p[0])},${f1(p[1])}`).join('L') + 'Z';
      if (i < installed.length && installed[i].via === 'scout') red += d; else reels += d;
    }
    sv('path', { d: reels, class: 'can' }, g);
    sv('path', { d: red, class: 'can red' }, g);
    return { kind: 'home', data: { id: 'bench', name: 'your bench' }, g, spokes, x0, y0, x1, y1, h, key: x1 + y1, cx: 0, cy: 0 };
  }
  function spin(home, t) {
    home.spokes.forEach((s, i) => {
      const a = t / (i < 2 ? 700 : 520) * (i % 2 ? -1 : 1);
      s.el.setAttribute('d', seg(P(s.px + Math.cos(a) * 1.6, s.py + Math.sin(a) * 1.6, home.h + 0.6), P(s.px + Math.cos(a) * 8, s.py + Math.sin(a) * 8, home.h + 0.6)));
    });
  }

  function build(inst, reviews, frontier) {
    installed = inst;
    floorG.replaceChildren(); entsG.replaceChildren(); ents = [];
    drawFlow();
    const [pr0, pi0] = rings(-46, -32, 46, 32, 10, 2);
    const pl = prism(P, front, pr0, pi0, 0, 2.5);
    sv('path', { d: pl.sil, class: 'sil rug' }, floorG);
    floorText('YOUR BENCH · ' + inst.length + ' REELS LOADED', -40, 58, 7.5, 'big');

    const home = benchEnt();
    ents.push(home);

    const groups = {};
    for (const r of reviews) (groups[r.lane] = groups[r.lane] || []).push(r);
    let take = 1;
    const ranked = reviews.slice().sort((a, b) => tot(b) - tot(a));
    const takeOf = new Map(ranked.map((r, i) => [r.id, i + 1]));
    groups.Uncharted = frontier;
    for (const [lane, items] of Object.entries(groups)) {
      const centre = AISLES[lane] || [0, 300];
      const raw = lane === 'Uncharted';
      const cols = raw ? 7 : Math.min(items.length, 4), rows = Math.ceil(items.length / cols);
      const bx0 = centre[0] - (cols * 27) / 2, by0 = centre[1] - (rows * 44) / 2;
      sv('path', { d: poly(ringAt(P, rrect(bx0 - 12, by0 - 12, bx0 + cols * 27 + 2, by0 + rows * 44 + 6, 6, 4), 0)), class: 'aisle' + (raw ? ' rawaisle' : '') }, floorG);
      floorText(raw ? 'UNPROCESSED STOCK · GITHUB' : `AISLE ${AISLE_NO[lane] || '·'} · ${lane.toUpperCase()}`, bx0 - 8, by0 + rows * 44 + 18, raw ? 9 : 7, raw ? 'big' : '');
      const sorted = raw ? items : items.slice().sort((a, b) => tot(b) - tot(a));
      sorted.forEach((it, i) => {
        const x0 = bx0 + (i % cols) * 27, y0 = by0 + Math.floor(i / cols) * 44;
        const e = raw ? rawEnt(it, x0, y0) : shelfEnt(it, x0, y0, takeOf.get(it.id));
        e.aisle = lane;
        ents.push(e);
      });
    }
    ents.sort((a, b) => a.key - b.key);
    ents.forEach((e, i) => { e.g.dataset.ent = i; entsG.appendChild(e.g); });

    bot = { g: sv('g', { class: 'bot' }) };
    bot.shadow = sv('path', { class: 'shadow' }, bot.g);
    bot.body = sv('path', { class: 'sil' }, bot.g);
    bot.crease = sv('path', { class: 'nf lo' }, bot.g);
    bot.lens = sv('path', { class: 'lensr' }, bot.g);
    bot.reel = sv('path', { class: 'nf sil' }, bot.g);
    entsG.appendChild(bot.g);
    targetMark = sv('path', { class: 'target', visibility: 'hidden' }, floorG);
    player = { x: 0, y: 66, vx: 0, vy: 0, fx: 1, fy: 1, last: '' };
    drawBot(0);
    buildMini();
    built = true;
    updateHud();
    kick();
  }

  /* ---------- you: a projectionist's cart ---------- */
  function drawBot(bob) {
    const { x, y } = player, z0 = 2 + bob;
    const sig = `${f1(x)},${f1(y)},${bob.toFixed(2)},${player.fx.toFixed(2)}`;
    if (sig === player.last) return;
    player.last = sig;
    bot.shadow.setAttribute('d', poly(flatRing(x, y, 0, 7, 16)));
    const [r, inner] = rings(x - 5, y - 5, x + 5, y + 5, 3, 1);
    const pr = prism(P, front, r, inner, z0, z0 + 9);
    bot.body.setAttribute('d', pr.sil); bot.crease.setAttribute('d', pr.crease);
    const [lx, ly] = P(x + player.fx * 5.4, y + player.fy * 5.4, z0 + 5);
    bot.lens.setAttribute('d', `M${f1(lx - 1.6)},${f1(ly)}a1.6,1.6 0 1,0 3.2,0a1.6,1.6 0 1,0 -3.2,0`);
    bot.reel.setAttribute('d', 'M' + canRing(x, y + 0.5, z0 + 15, 4.6, 16).map((p) => `${f1(p[0])},${f1(p[1])}`).join('L') + 'Z' + seg(P(x, y, z0 + 9), P(x, y + 0.5, z0 + 11)));
  }
  let order = -1;
  function restackBot() {
    const k = player.x + player.y + 5;
    let i = ents.findIndex((e) => e.key > k);
    if (i < 0) i = ents.length;
    if (i === order) return;
    order = i;
    entsG.insertBefore(bot.g, i < ents.length ? ents[i].g : null);
  }
  function collide() {
    const R = 6;
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

  /* ---------- focus, slates, quests ---------- */
  let focus = null, pendingOpen = null;
  const prompt = $('prompt');
  function updateFocus() {
    let best = null, bd = Infinity;
    for (const e of ents) { const d = rectDist(e, player.x, player.y) - (e.kind === 'home' ? 12 : 0); if (d < bd) { bd = d; best = e; } }
    const f = bd < 16 ? best : null;
    if (f === focus) return;
    if (focus) focus.g.classList.remove('focus');
    focus = f;
    if (f) {
      f.g.classList.add('focus');
      if (f.kind === 'frontier') scramble(f);
      if (f.kind === 'home') quest.home = true;
      else if (!visited.has(f)) { visited.add(f); f.g.classList.add('visited'); }
      const verb = f.kind === 'home' ? 'open your bench' : f.kind === 'frontier' ? `peek at raw stock · ${f.data.name}` : `pull reel · ${f.data.name}`;
      prompt.replaceChildren(ce('kbd', null, 'E'), document.createTextNode(verb));
      prompt.classList.add('on');
      if (pendingOpen === f) { pendingOpen = null; openSlate(f); }
    } else prompt.classList.remove('on');
    updateHud();
  }

  function vu(r) {
    const box = ce('div', 'vu');
    [['fit', r.fit], ['leverage', r.leverage], ['craft', r.craft], ['originality', r.originality]].forEach(([k, v]) => {
      const n = num(v);
      box.append(ce('span', null, k), ce('span', 'bar', '█'.repeat(n) + '░'.repeat(5 - n)), ce('b', null, String(n)));
    });
    return box;
  }
  const link = (url, text) => { const a = ce('a', 'src', text + ' ↗'); a.href = url; a.target = '_blank'; a.rel = 'noopener'; return a; };
  function slateHead(scene, take, roll) {
    const s = ce('div', 'clap');
    s.append(ce('div', 'sticks'));
    const f = ce('div', 'fields');
    [['scene', scene], ['take', take], ['roll', roll]].forEach(([k, v]) => { const c = ce('div'); c.append(ce('small', null, k), ce('b', null, v)); f.append(c); });
    s.append(f);
    return s;
  }
  function openSlate(e) {
    const body = $('pbody'), kids = [];
    if (e.kind === 'home') {
      quest.openedHome = true;
      const mine = installed.filter((s) => s.by === 'you').length;
      kids.push(slateHead('bench', String(installed.length).padStart(2, '0'), 'live'), ce('h3', null, 'Your bench'),
        ce('p', 'meta', `${installed.length} reels loaded · ${mine} cut by you · ${installed.length - mine} from Anthropic · red = brought in by the scout`));
      const list = ce('div', 'reels');
      installed.forEach((s, i) => {
        const row = ce('div', 'reel' + (s.via === 'scout' ? ' scout' : '')), mid = ce('div');
        mid.append(ce('b', null, s.name), ce('span', 'd', s.summary));
        row.append(ce('span', 'n', 'R' + String(i + 1).padStart(2, '0')), mid, ce('em', null, s.via === 'scout' ? 'scout' : s.by === 'you' ? 'yours' : 'anthropic'));
        list.append(row);
      });
      kids.push(list);
    } else if (e.kind === 'review') {
      const r = e.data;
      if (r.verdict === 'ADD') quest.add = true;
      kids.push(slateHead(r.lane, `T${e.take}`, 'sweep 01'), ce('h3', null, r.name),
        ce('span', 'note n-' + NOTE[r.verdict].toLowerCase(), r.adopted ? 'circled · on your bench' : NOTE[r.verdict] === 'circled' ? 'circled take' : NOTE[r.verdict] === 'hold' ? 'hold' : 'NG — no good'),
        ce('p', 'meta', `${tot(r)}/20 · developed ${r.date}`), vu(r), ce('p', null, r.summary));
      if (r.why) kids.push(ce('p', 'why', r.why));
      if (r.caveat) kids.push(ce('p', 'cav', r.caveat));
      if (r.flag) kids.push(ce('div', 'flag', 'DAMAGED NEGATIVE — do not project · ' + r.flag));
      kids.push(link(r.url, r.id));
    } else {
      const r = e.data;
      const raw = ce('pre', 'rawbox');
      const rand = rng(hash(r.id) + 3);
      raw.textContent = Array.from({ length: 5 }, () => Array.from({ length: 30 }, () => GLYPHS[Math.floor(rand() * GLYPHS.length)]).join('')).join('\n');
      kids.push(slateHead('unprocessed', '—', 'github'), raw, ce('h3', null, r.name), ce('span', 'note n-raw', 'not developed'),
        ce('p', 'meta', `${r.owner} · found on ${r.source}`), ce('p', null, r.summary),
        ce('p', 'cav', 'Undeveloped: nobody has looked at its code or tested its claims. The scout develops it on a coming sweep.'), link(r.url, r.id));
    }
    body.replaceChildren(...kids);
    body.scrollTop = 0;
    $('panel').classList.add('open');
    updateHud();
  }
  const closePanel = () => { $('panel').classList.remove('open'); world.focus({ preventScroll: true }); };
  $('pclose').addEventListener('click', closePanel);
  prompt.addEventListener('click', () => focus && openSlate(focus));

  function zoneName() {
    if (Math.hypot(player.x, player.y) < 90) return 'your bench';
    let best = null, bd = 170;
    for (const [n, c] of Object.entries(AISLES)) { const d = Math.hypot(player.x - c[0], player.y - c[1]); if (d < bd) { bd = d; best = n; } }
    return best ? (best === 'Uncharted' ? 'unprocessed stock' : `aisle ${AISLE_NO[best]} · ${best}`) : 'the vault floor';
  }
  const box = (lines, w) => ['┌' + '─'.repeat(w) + '┐', ...lines.map((l) => '│' + l.padEnd(w).slice(0, w) + '│'), '└' + '─'.repeat(w) + '┘'].join('\n');
  let lastZone = '';
  function updateHud() {
    if (!built) return;
    const total = ents.length - 1, fv = [...visited].filter((e) => e.kind === 'frontier').length;
    const pct = visited.size / total, bar = '█'.repeat(Math.round(pct * 20)).padEnd(20, '░');
    const qs = [
      ['walk to your bench', quest.home], ['open it, see what\'s loaded', quest.openedHome],
      ['find a circled take', quest.add], [`peek at raw stock ${Math.min(fv, 5)}/5`, fv >= 5],
    ];
    const z = zoneName();
    if (z !== lastZone) { lastZone = z; }
    $('hudlog').textContent = box([
      ' CAMERA REPORT', ` zone  ${z}`, ` seen  ${String(visited.size).padStart(2, '0')}/${total} ${bar}`, '',
      ...qs.map(([t, d]) => ` [${d ? 'x' : ' '}] ${t}`), ' [!] create the github repo', '     (outside the vault)',
    ], 34);
  }

  /* ---------- an ASCII minimap ---------- */
  const MW = 34, MH = 15;
  let miniBase = [], miniT = () => [0, 0];
  function buildMini() {
    const pts = ents.map((e) => P(e.cx, e.cy, 0));
    const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
    const x0 = Math.min(...xs) - 20, x1 = Math.max(...xs) + 20, y0 = Math.min(...ys) - 20, y1 = Math.max(...ys) + 20;
    miniT = (wx, wy) => { const [a, b] = P(wx, wy, 0); return [Math.round(((a - x0) / (x1 - x0)) * (MW - 1)), Math.round(((b - y0) / (y1 - y0)) * (MH - 1))]; };
    miniBase = Array.from({ length: MH }, () => Array(MW).fill('·'));
    ents.forEach((e) => {
      const [c, r] = miniT(e.cx, e.cy);
      if (r < 0 || r >= MH || c < 0 || c >= MW) return;
      const ch = e.kind === 'home' ? 'B' : e.kind === 'frontier' ? '░' : e.data.verdict === 'ADD' ? 'O' : e.data.verdict === 'WATCH' ? 'h' : 'x';
      if (miniBase[r][c] === '·' || ch === 'B' || ch === 'O') miniBase[r][c] = ch;
    });
  }
  let miniLast = '';
  function drawMini() {
    const [c, r] = miniT(player.x, player.y);
    const key = c + ',' + r;
    if (key === miniLast) return;
    miniLast = key;
    const g = miniBase.map((row) => row.slice());
    if (r >= 0 && r < MH && c >= 0 && c < MW) g[r][c] = '@';
    $('mini').textContent = g.map((row) => row.join('')).join('\n') + '\n@ you  B bench  O circled  h hold  x NG  ░ raw';
  }

  /* ---------- camera, input, loop ---------- */
  let W = 800, Hh = 500, zoom = 1.5;
  const cam = { x: 0, y: 0 };
  const keys = new Set();
  let target = null, running = false, lastT = 0;
  function resize() {
    W = world.clientWidth || 800; Hh = world.clientHeight || 500;
    svg.setAttribute('viewBox', `0 0 ${W} ${Hh}`);
    if (!resize.done) { zoom = W < 640 ? 1.1 : 1.6; resize.done = true; }
    kick();
  }
  new ResizeObserver(resize).observe(world);

  const DIRS = { w: [-1, -1], arrowup: [-1, -1], s: [1, 1], arrowdown: [1, 1], a: [-1, 1], arrowleft: [-1, 1], d: [1, -1], arrowright: [1, -1] };
  world.addEventListener('keydown', (ev) => {
    const k = ev.key.toLowerCase();
    if (DIRS[k]) { keys.add(k); target = null; ev.preventDefault(); kick(); hideStart(); }
    else if (k === 'e' || k === 'enter' || k === ' ') { if (focus) { openSlate(focus); ev.preventDefault(); } }
    else if (k === 'escape') closePanel();
    else if (k === '+' || k === '=') setZoom(zoom * 1.2);
    else if (k === '-' || k === '_') setZoom(zoom / 1.2);
  });
  world.addEventListener('keyup', (ev) => { keys.delete(ev.key.toLowerCase()); });
  world.addEventListener('blur', () => keys.clear());
  const setZoom = (z) => { zoom = Math.max(0.55, Math.min(2.6, z)); kick(); };
  $('zin').addEventListener('click', () => setZoom(zoom * 1.25));
  $('zout').addEventListener('click', () => setZoom(zoom / 1.25));
  $('zhome').addEventListener('click', () => { target = [0, 62]; pendingOpen = null; kick(); });

  function screenToWorld(clientX, clientY) {
    const r = svg.getBoundingClientRect();
    return unproj(C, (clientX - r.left - W / 2) / zoom + cam.x, (clientY - r.top - Hh / 2) / zoom + cam.y, 0);
  }
  svg.addEventListener('pointerdown', (ev) => {
    if (!built) return;
    world.focus({ preventScroll: true });
    hideStart();
    const g = ev.target.closest('[data-ent]');
    if (g) {
      const e = ents[Number(g.dataset.ent)];
      if (focus === e) { openSlate(e); return; }
      target = [e.cx, e.y1 + (e.kind === 'home' ? 24 : 13)]; pendingOpen = e;
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
    player.vx += ((m ? (dx / m) * 150 : 0) - player.vx) * a; player.vy += ((m ? (dy / m) * 150 : 0) - player.vy) * a;
    const moving = Math.hypot(player.vx, player.vy) > 1;
    if (moving) {
      const ox = player.x, oy = player.y;
      player.x += player.vx * dt; player.y += player.vy * dt;
      collide();
      if (target && Math.hypot(player.x - ox, player.y - oy) < 0.02) target = null;
      const v = Math.hypot(player.vx, player.vy); player.fx = player.vx / v; player.fy = player.vy / v;
    }
    drawBot(moving ? Math.sin(t / 90) * 0.7 : 0);
    restackBot();
    updateFocus();
    if (moving) updateHud();
    drawMini();
    const home = ents.find((e) => e.kind === 'home');
    const spinning = focus === home && !matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (spinning || !home.spun) { spin(home, t); home.spun = true; }
    if (target) { targetMark.setAttribute('visibility', 'visible'); targetMark.setAttribute('d', poly(flatRing(target[0], target[1], 0, 5, 16))); }
    else targetMark.setAttribute('visibility', 'hidden');
    const [px, py] = P(player.x, player.y, 0), k = 1 - Math.exp(-dt * 5);
    cam.x += (px - cam.x) * k; cam.y += (py - cam.y) * k;
    camG.setAttribute('transform', `translate(${f1(W / 2)} ${f1(Hh / 2)}) scale(${zoom.toFixed(3)}) translate(${f1(-cam.x)} ${f1(-cam.y)})`);
    const settled = !moving && !target && keys.size === 0 && !spinning && Math.hypot(px - cam.x, py - cam.y) < 0.3;
    if (settled) { running = false; return; }
    requestAnimationFrame(frame);
  }

  /* ---------- data ---------- */
  let sig = '';
  dash.onData(() => {
    const a = dash.data('installed'), b = dash.data('reviews'), c = dash.data('frontier');
    const st = [a, b, c].map((x) => x.status);
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
