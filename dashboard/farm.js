/* Skill Farm: an isometric server farm drawn with the Hairline engine (window.HL).
   Your server in the centre holds every installed skill; the scanned skills stand in
   lane districts around it; the unscanned GitHub skills fill the Uncharted. */
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
  const VC = { ADD: '#45e08a', WATCH: '#f2b94b', SKIP: '#56636e' };
  const hash = (s) => { let h = 7; for (const ch of String(s)) h = (h * 31 + ch.charCodeAt(0)) >>> 0; return h; };

  const C = Cam(45, 0.5, 1);
  fit(C, [[0, 0, 0]], 0, 0);
  const P = proj(C), front = facing(C);
  const seg = (a, b) => `M${a[0].toFixed(1)},${a[1].toFixed(1)}L${b[0].toFixed(1)},${b[1].toFixed(1)}`;

  // district centres in world units: the lanes ring your server, the Uncharted lies beyond
  const DISTRICTS = {
    'Post-production': [230, 40], 'AI filmmaking': [40, 230], 'Building tools & sites': [215, 225],
    'Business & outreach': [-205, 140], 'Wildcard': [140, -205], 'Uncharted': [-300, -280],
  };
  const BOUND = 560;

  const world = $('world'), svg = $('map'), camG = $('cam'), floorG = $('floor'), entsG = $('ents');
  let ents = [], built = false, installed = [], player, bot;
  const visited = new Set();
  const quest = { home: false, openedHome: false, add: false };

  /* ---------- building ---------- */
  function floorText(text, x, y, size, cls) {
    const [sx, sy] = P(x, y, 0);
    const t = sv('text', { class: 'label ' + (cls || ''), transform: `matrix(0.7071 0.3536 -0.7071 0.3536 ${sx.toFixed(1)} ${sy.toFixed(1)})`, 'font-size': size }, floorG);
    t.textContent = text;
  }

  function rackEnt(kind, data, x0, y0, h) {
    const x1 = x0 + 16, y1 = y0 + 12;
    const g = sv('g', { class: 'rack' + (kind === 'frontier' ? ' uncharted' : ''), 'data-ent': '' });
    const [r, inner] = rings(x0, y0, x1, y1, 2, 1);
    const pr = prism(P, front, r, inner, 0, h);
    sv('path', { d: pr.sil, class: 'sil' }, g);
    sv('path', { d: pr.crease, class: 'nf lo roof' }, g);
    let blades = '';
    for (let z = 6; z < h - 4; z += 6.5) blades += seg(P(x0 + 5, y1, z), P(x1 - 2, y1, z));
    sv('path', { d: blades, class: 'lo' }, g);
    const led = (z, fill, blink, i) => {
      const [cx, cy] = P(x0 + 2.6, y1, z);
      const c = sv('circle', { cx: cx.toFixed(1), cy: cy.toFixed(1), r: 1.35, fill, class: 'led' + (blink ? ' blink' : '') }, g);
      if (blink) c.style.animationDelay = `${-(hash(data.id) % 26) / 10 - i * 0.7}s`;
    };
    if (kind === 'review') {
      led(h - 7, VC[data.verdict], data.verdict !== 'SKIP', 0);
      led(h - 13, data.flag ? '#ff5f5f' : '#1d2830', !!data.flag, 1);
      led(h - 19, data.adopted ? '#45e08a' : '#1d2830', false, 2);
    } else {
      led(h - 7, '#62d3ff', true, 0);
      led(h - 13, '#1d2830', false, 1);
    }
    return { kind, data, g, x0, y0, x1, y1, h, key: x1 + y1, cx: (x0 + x1) / 2, cy: (y0 + y1) / 2 };
  }

  function homeEnt() {
    const x0 = -24, y0 = -16, x1 = 24, y1 = 16, h = 78;
    const g = sv('g', { class: 'rack home', 'data-ent': '' });
    const [r, inner] = rings(x0, y0, x1, y1, 4, 1.5);
    const pr = prism(P, front, r, inner, 0, h);
    sv('path', { d: pr.sil, class: 'sil' }, g);
    sv('path', { d: pr.crease, class: 'nf lo' }, g);
    // 2 × 11 bays on the front, one per installed skill
    let n = 0;
    for (const [xa, xb] of [[-21, -2.5], [2.5, 21]]) {
      for (let b = 0; b < 11; b++, n++) {
        const z = 5 + b * 6.6;
        sv('path', { d: poly([P(xa, y1, z), P(xb, y1, z), P(xb, y1, z + 5), P(xa, y1, z + 5)]), class: 'nf lo' }, g);
        const on = n < installed.length, via = on && installed[n].via === 'scout';
        const [cx, cy] = P(xa + 2.4, y1, z + 2.5);
        const c = sv('circle', { cx: cx.toFixed(1), cy: cy.toFixed(1), r: 1.3, fill: on ? '#45e08a' : '#1d2830', class: 'led' + (on && (via || n % 3 === 0) ? ' blink' : '') }, g);
        c.style.animationDelay = `${-n * 0.37}s`;
      }
    }
    // a beacon on the roof
    const [br, bi] = rings(-4, -4, 4, 4, 2, 0.8);
    const bp = prism(P, front, br, bi, h, h + 6);
    sv('path', { d: bp.sil, class: 'sil' }, g);
    const [bx, by] = P(0, 0, h + 8.5);
    sv('circle', { cx: bx, cy: by, r: 2.2, fill: '#45e08a', class: 'led blink' }, g);
    return { kind: 'home', data: { id: 'parth-01', name: 'parth-01' }, g, x0, y0, x1, y1, h, key: x1 + y1, cx: 0, cy: 0 };
  }

  function build(inst, reviews, frontier) {
    installed = inst;
    floorG.replaceChildren(); entsG.replaceChildren(); ents = [];
    // the floor grid
    let d = '';
    for (let v = -BOUND; v <= BOUND; v += 40) { d += seg(P(v, -BOUND, 0), P(v, BOUND, 0)) + seg(P(-BOUND, v, 0), P(BOUND, v, 0)); }
    sv('path', { d, class: 'grid' }, floorG);
    // your server's plinth and aura
    const [pr0, pi0] = rings(-42, -32, 42, 32, 10, 2);
    const pl = prism(P, front, pr0, pi0, 0, 3);
    sv('path', { d: pl.sil, class: 'sil' }, floorG);
    sv('path', { d: pl.crease, class: 'nf lo' }, floorG);
    sv('path', { d: poly(ringAt(P, circ(66, 40), 0)), class: 'aura pulse' }, floorG);
    floorText('parth-01 · your server', -40, 50, 9, 'big');

    const home = homeEnt();
    ents.push(home);

    const groups = {};
    for (const r of reviews) (groups[r.lane] = groups[r.lane] || []).push(r);
    groups.Uncharted = frontier;
    for (const [lane, items] of Object.entries(groups)) {
      const centre = DISTRICTS[lane] || [0, 300];
      const cols = lane === 'Uncharted' ? 7 : Math.min(items.length, 4), rows = Math.ceil(items.length / cols);
      const bx0 = centre[0] - (cols * 26) / 2, by0 = centre[1] - (rows * 44) / 2;
      sv('path', { d: poly(ringAt(P, rrect(bx0 - 14, by0 - 14, bx0 + cols * 26 + 2, by0 + rows * 44 + 8, 8, 4), 0)), class: 'nf lo' }, floorG);
      floorText(lane === 'Uncharted' ? 'the uncharted · github' : lane, bx0 - 10, by0 + rows * 44 + 22, lane === 'Uncharted' ? 11 : 9, lane === 'Uncharted' ? 'big' : '');
      const sorted = lane === 'Uncharted' ? items : items.slice().sort((a, b) => tot(b) - tot(a));
      sorted.forEach((it, i) => {
        const x0 = bx0 + (i % cols) * 26, y0 = by0 + Math.floor(i / cols) * 44;
        const h = lane === 'Uncharted' ? 26 + (hash(it.id) % 4) * 6 : 28 + tot(it) * 1.7;
        const e = rackEnt(lane === 'Uncharted' ? 'frontier' : 'review', it, x0, y0, h);
        e.district = lane;
        ents.push(e);
      });
    }
    ents.sort((a, b) => a.key - b.key);
    ents.forEach((e, i) => { e.g.dataset.ent = i; entsG.appendChild(e.g); });

    // the picker: you
    bot = { g: sv('g', { class: 'bot' }), shadow: null, body: null, crease: null, lens: null, ant: null, tip: null };
    bot.shadow = sv('path', { class: 'shadow' }, bot.g);
    bot.body = sv('path', { class: 'sil' }, bot.g);
    bot.crease = sv('path', { class: 'nf lo' }, bot.g);
    bot.ant = sv('path', { class: 'sil nf' }, bot.g);
    bot.lens = sv('circle', { r: 1.6, class: 'lens' }, bot.g);
    bot.tip = sv('circle', { r: 1.3, fill: '#62d3ff', class: 'led blink' }, bot.g);
    entsG.appendChild(bot.g);
    targetMark = sv('path', { class: 'target', visibility: 'hidden' }, floorG);
    player = { x: 0, y: 66, vx: 0, vy: 0, fx: 1, fy: 1, last: '' };
    drawBot(0);
    buildMini();
    built = true;
    updateHud();
    kick();
  }

  /* ---------- the player ---------- */
  function drawBot(bob) {
    const { x, y } = player, z0 = 2 + bob;
    const sig = `${x.toFixed(1)},${y.toFixed(1)},${bob.toFixed(2)},${player.fx.toFixed(2)}`;
    if (sig === player.last) return;
    player.last = sig;
    bot.shadow.setAttribute('d', poly(ringAt(P, circ(7, 16).map((q) => ({ ...q, u: q.u + x, v: q.v + y })), 0)));
    const [r, inner] = rings(x - 5, y - 5, x + 5, y + 5, 3, 1);
    const pr = prism(P, front, r, inner, z0, z0 + 10);
    bot.body.setAttribute('d', pr.sil); bot.crease.setAttribute('d', pr.crease);
    const [lx, ly] = P(x + player.fx * 5.4, y + player.fy * 5.4, z0 + 6);
    bot.lens.setAttribute('cx', lx); bot.lens.setAttribute('cy', ly);
    bot.ant.setAttribute('d', seg(P(x, y, z0 + 10), P(x, y, z0 + 15)));
    const [tx, ty] = P(x, y, z0 + 16.3);
    bot.tip.setAttribute('cx', tx); bot.tip.setAttribute('cy', ty);
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

  /* ---------- focus, inspect, quests ---------- */
  let focus = null, pendingOpen = null, panelFor = null;
  const prompt = $('prompt');
  function updateFocus() {
    let best = null, bd = Infinity;
    for (const e of ents) {
      const d = rectDist(e, player.x, player.y) - (e.kind === 'home' ? 12 : 0);
      if (d < bd) { bd = d; best = e; }
    }
    const f = bd < 16 ? best : null;
    if (f === focus) return;
    if (focus) focus.g.classList.remove('focus');
    focus = f;
    if (f) {
      f.g.classList.add('focus');
      if (f.kind === 'home') quest.home = true;
      else if (!visited.has(f)) { visited.add(f); f.g.classList.add('visited'); }
      prompt.replaceChildren(ce('kbd', null, 'E'), document.createTextNode(f.kind === 'home' ? 'open parth-01 · your server' : `inspect ${f.data.name}`));
      prompt.classList.add('on');
      if (pendingOpen === f) { pendingOpen = null; openPanel(f); }
    } else prompt.classList.remove('on');
    updateHud();
  }

  function vu(r) {
    const box = ce('div', 'vu');
    [['fit', r.fit], ['leverage', r.leverage], ['craft', r.craft], ['originality', r.originality]].forEach(([k, v]) => {
      const s = ce('div', 'seg'); s.style.setProperty('--c', VC[r.verdict]);
      for (let i = 1; i <= 5; i++) s.append(ce('i', i <= num(v) ? 'on' : ''));
      box.append(ce('span', null, k), s, ce('b', null, String(num(v))));
    });
    return box;
  }
  const link = (url, text) => { const a = ce('a', 'src', text + ' ↗'); a.href = url; a.target = '_blank'; a.rel = 'noopener'; return a; };

  function openPanel(e) {
    const body = $('pbody'), tag = $('ptag');
    const kids = [];
    if (e.kind === 'home') {
      quest.openedHome = true;
      const mine = installed.filter((s) => s.by === 'you').length;
      tag.textContent = 'server parth-01 · home';
      kids.push(ce('h3', null, 'parth-01'), ce('p', 'meta', `${installed.length} skills mounted · ${mine} added by you · ${installed.length - mine} from Anthropic`));
      const bays = ce('div', 'bays');
      installed.forEach((s, i) => {
        const b = ce('div', 'bay'), mid = ce('div');
        mid.append(ce('b', null, s.name), ce('span', 'd', s.summary));
        b.append(ce('span', 'n', String(i + 1).padStart(2, '0')), mid, ce('em', s.via === 'scout' ? 'scout' : '', s.via === 'scout' ? 'via scout' : s.by === 'you' ? 'yours' : 'anthropic'));
        bays.append(b);
      });
      kids.push(bays);
    } else if (e.kind === 'review') {
      const r = e.data;
      if (r.verdict === 'ADD') quest.add = true;
      tag.textContent = `server · ${r.lane}`;
      kids.push(ce('h3', null, r.name), ce('span', 'led ' + r.verdict.toLowerCase(), r.adopted ? 'mounted on parth-01' : r.verdict),
        ce('p', 'meta', `${tot(r)}/20 · scanned ${r.date}`), vu(r), ce('p', null, r.summary));
      if (r.why) kids.push(ce('p', 'why', r.why));
      if (r.caveat) kids.push(ce('p', 'cav', r.caveat));
      if (r.flag) kids.push(ce('div', 'flag', '⚠ ' + r.flag));
      kids.push(link(r.url, r.id));
    } else {
      const r = e.data;
      tag.textContent = 'uncharted · github';
      kids.push(ce('h3', null, r.name), ce('span', 'led new', 'not scanned'), ce('p', 'meta', `${r.owner} · found on ${r.source}`), ce('p', null, r.summary),
        ce('p', 'cav', 'Nothing here has been checked yet — not its code, not its claims. The scout will open it on a coming sweep.'), link(r.url, r.id));
    }
    body.replaceChildren(...kids);
    body.scrollTop = 0;
    $('panel').classList.add('open');
    panelFor = e;
    updateHud();
  }
  const closePanel = () => { $('panel').classList.remove('open'); panelFor = null; world.focus({ preventScroll: true }); };
  $('pclose').addEventListener('click', closePanel);
  prompt.addEventListener('click', () => focus && openPanel(focus));

  function zoneName() {
    if (Math.hypot(player.x, player.y) < 90) return 'parth-01 · home';
    let best = null, bd = 170;
    for (const [n, c] of Object.entries(DISTRICTS)) { const d = Math.hypot(player.x - c[0], player.y - c[1]); if (d < bd) { bd = d; best = n; } }
    return best ? (best === 'Uncharted' ? 'the uncharted' : best) : 'the floor';
  }
  let lastZone = '';
  function updateHud() {
    if (!built) return;
    const total = ents.length - 1;
    $('xp').textContent = `${visited.size} / ${total}`;
    $('xpbar').style.width = `${(visited.size / total) * 100}%`;
    const fv = [...visited].filter((e) => e.kind === 'frontier').length;
    const qs = [
      ['Walk to your server, parth-01', quest.home],
      ['Open it and see what\'s mounted', quest.openedHome],
      ['Find a server worth adding in the hot aisles', quest.add],
      [`Scout the Uncharted (${Math.min(fv, 5)}/5)`, fv >= 5],
    ];
    const ol = $('qlist');
    ol.replaceChildren(...qs.map(([t, d]) => ce('li', d ? 'done' : '', t)),
      ce('li', 'ext', 'Connect the GitHub uplink — create the skill-library repo (outside the game)'));
    $('qcount').textContent = `${qs.filter((q) => q[1]).length}/${qs.length}`;
    const z = zoneName();
    if (z !== lastZone) { lastZone = z; $('zone').textContent = z; }
  }
  document.querySelector('#quests h4').addEventListener('click', () => $('quests').classList.toggle('min'));

  /* ---------- minimap ---------- */
  let miniPlayer, miniT = (x, y) => [0, 0];
  function buildMini() {
    const m = $('mini'); m.replaceChildren();
    const pts = ents.map((e) => P(e.cx, e.cy, 0));
    const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
    const x0 = Math.min(...xs) - 30, x1 = Math.max(...xs) + 30, y0 = Math.min(...ys) - 30, y1 = Math.max(...ys) + 30;
    const s = Math.min(168 / (x1 - x0), 118 / (y1 - y0)), ox = (168 - (x1 - x0) * s) / 2, oy = (118 - (y1 - y0) * s) / 2;
    miniT = (wx, wy) => { const [a, b] = P(wx, wy, 0); return [ox + (a - x0) * s, oy + (b - y0) * s]; };
    ents.forEach((e) => {
      const [a, b] = miniT(e.cx, e.cy);
      const fill = e.kind === 'home' ? '#45e08a' : e.kind === 'frontier' ? '#2b6f86' : VC[e.data.verdict];
      sv('circle', { cx: a, cy: b, r: e.kind === 'home' ? 3.6 : 1.7, fill }, m);
    });
    miniPlayer = sv('circle', { r: 2.6, fill: '#ffffff', stroke: '#05070a', 'stroke-width': 1 }, m);
  }

  /* ---------- camera, input, loop ---------- */
  let W = 800, Hh = 500, zoom = 1.5;
  const cam = { x: 0, y: 0 };
  const keys = new Set();
  let target = null, targetMark = null, running = false, lastT = 0;
  function resize() {
    W = world.clientWidth || 800; Hh = world.clientHeight || 500;
    svg.setAttribute('viewBox', `0 0 ${W} ${Hh}`);
    if (!resize.done) { zoom = W < 640 ? 1.05 : 1.55; resize.done = true; }
    kick();
  }
  new ResizeObserver(resize).observe(world);

  const DIRS = { w: [-1, -1], arrowup: [-1, -1], s: [1, 1], arrowdown: [1, 1], a: [-1, 1], arrowleft: [-1, 1], d: [1, -1], arrowright: [1, -1] };
  world.addEventListener('keydown', (ev) => {
    const k = ev.key.toLowerCase();
    if (DIRS[k]) { keys.add(k); target = null; ev.preventDefault(); kick(); hideStart(); }
    else if (k === 'e' || k === 'enter' || k === ' ') { if (focus) { openPanel(focus); ev.preventDefault(); } }
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
    const sx = (clientX - r.left - W / 2) / zoom + cam.x, sy = (clientY - r.top - Hh / 2) / zoom + cam.y;
    return unproj(C, sx, sy, 0);
  }
  svg.addEventListener('pointerdown', (ev) => {
    if (!built) return;
    world.focus({ preventScroll: true });
    hideStart();
    const g = ev.target.closest('[data-ent]');
    if (g) {
      const e = ents[Number(g.dataset.ent)];
      if (focus === e) { openPanel(e); return; }
      target = [e.cx, e.y1 + (e.kind === 'home' ? 22 : 13)]; pendingOpen = e;
    } else {
      target = screenToWorld(ev.clientX, ev.clientY); pendingOpen = null;
    }
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
    if (target) {
      const tx = target[0] - player.x, ty = target[1] - player.y, d = Math.hypot(tx, ty);
      if (d < 2.5) { target = null; } else { dx = tx / d; dy = ty / d; }
    }
    const m = Math.hypot(dx, dy);
    const speed = 150, a = 1 - Math.exp(-dt * 12);
    const wx = m ? (dx / m) * speed : 0, wy = m ? (dy / m) * speed : 0;
    player.vx += (wx - player.vx) * a; player.vy += (wy - player.vy) * a;
    const moving = Math.hypot(player.vx, player.vy) > 1;
    if (moving) {
      const ox = player.x, oy = player.y;
      player.x += player.vx * dt; player.y += player.vy * dt;
      collide();
      if (target && Math.hypot(player.x - ox, player.y - oy) < 0.02) target = null; // blocked
      const v = Math.hypot(player.vx, player.vy); player.fx = player.vx / v; player.fy = player.vy / v;
    }
    drawBot(moving ? Math.sin(t / 90) * 0.8 : 0);
    restackBot();
    updateFocus();
    if (moving) updateHud();
    if (target) { targetMark.setAttribute('visibility', 'visible'); targetMark.setAttribute('d', poly(ringAt(P, circ(5, 16).map((q) => ({ ...q, u: q.u + target[0], v: q.v + target[1] })), 0))); }
    else targetMark.setAttribute('visibility', 'hidden');
    const [px, py] = P(player.x, player.y, 0), k = 1 - Math.exp(-dt * 5);
    cam.x += (px - cam.x) * k; cam.y += (py - cam.y) * k;
    camG.setAttribute('transform', `translate(${(W / 2).toFixed(1)} ${(Hh / 2).toFixed(1)}) scale(${zoom.toFixed(3)}) translate(${(-cam.x).toFixed(1)} ${(-cam.y).toFixed(1)})`);
    const [mx, my] = miniT(player.x, player.y); miniPlayer.setAttribute('cx', mx); miniPlayer.setAttribute('cy', my);
    const settled = !moving && !target && keys.size === 0 && Math.hypot(px - cam.x, py - cam.y) < 0.3;
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
    // land the camera on you before the first frame
    const [px, py] = P(player.x, player.y, 0); cam.x = px; cam.y = py;
  });
})();
