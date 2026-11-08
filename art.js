/* art.js: pen-and-watercolour pictures, drawn as SVG.
 *
 * Every sprite lives in a 100 x 100 box and stands on y = 96.
 * Each one is drawn twice: once as a soft colour wash (no outlines) and
 * once as a wobbly ink line (no fills). The two passes don't quite line up,
 * which is what makes it look like an old picture book.
 *
 * Shape classes used inside sprites:
 *   solid : filled with ink in the line pass (eyes, spots); skipped in the wash
 *   nol   : colour only, no ink outline (cheeks, bellies, highlights)
 *   fine  : thinner ink line (whiskers, strings)
 *   label : ink text (words on the word tree)
 */
(function (global) {
  'use strict';

  const C = {
    ink: '#2a1f17', paper: '#f4ead3',
    red: '#c0462f', deepred: '#8e3324', brick: '#c98f6c', rose: '#d9786a', pink: '#eaa797',
    rust: '#c8692e', ginger: '#dc9450', orange: '#e48a3a',
    ochre: '#d9a23a', gold: '#d8a531', butter: '#f2d98b', cream: '#f3e6c8', white: '#fbf6ea',
    green: '#86a456', leaf: '#5d7f3e', pea: '#a9c862', moss: '#6f8f45',
    sky: '#b4cde0', blue: '#7fa3c4', navy: '#2f4a72', teal: '#5d938f',
    brown: '#8a5a3b', tan: '#c49a62', bark: '#7a5236', rabbit: '#a98463',
    grey: '#a39a90', rat: '#8c7d6e', silver: '#cfcac0', black: '#4a3d44', plum: '#5b3a5e'
  };

  /* ---------- little helpers ---------- */
  const f = (n) => Math.round(n * 10) / 10;
  function rng(seed) {
    let s = (seed >>> 0) || 1;
    return () => (s = (Math.imul(s, 1664525) + 1013904223) >>> 0) / 4294967296;
  }
  // smooth closed curve through points (Catmull-Rom to Bezier)
  function smooth(p) {
    const n = p.length, g = (i) => p[(i + n) % n];
    let d = `M${f(p[0][0])} ${f(p[0][1])}`;
    for (let i = 0; i < n; i++) {
      const p0 = g(i - 1), p1 = g(i), p2 = g(i + 1), p3 = g(i + 2);
      d += `C${f(p1[0] + (p2[0] - p0[0]) / 6)} ${f(p1[1] + (p2[1] - p0[1]) / 6)} ` +
        `${f(p2[0] - (p3[0] - p1[0]) / 6)} ${f(p2[1] - (p3[1] - p1[1]) / 6)} ${f(p2[0])} ${f(p2[1])}`;
    }
    return d + 'Z';
  }
  // scalloped "cloud" outline: treetops, bushes, hedges, sheep
  function cloud(cx, cy, rx, ry, n = 9, seed = 1) {
    const r = rng(seed), pts = [];
    for (let i = 0; i < n; i++) {
      const t = (i / n) * Math.PI * 2, j = 0.88 + r() * 0.24;
      pts.push([cx + Math.cos(t) * rx * j, cy + Math.sin(t) * ry * j]);
    }
    let d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
    for (let i = 1; i <= n; i++) {
      const a = pts[i - 1], b = pts[i % n];
      const rr = (Math.hypot(b[0] - a[0], b[1] - a[1]) / 2) * (1.02 + r() * 0.25);
      d += `A${f(rr)} ${f(rr)} 0 0 1 ${f(b[0])} ${f(b[1])}`;
    }
    return d + 'Z';
  }
  // the irregular vignette that the background is painted inside
  function vignette(cx, cy, a, b, seed) {
    const r = rng(seed), pts = [], n = 30, ph = r() * 6;
    for (let i = 0; i < n; i++) {
      const t = (i / n) * Math.PI * 2, c = Math.cos(t), s = Math.sin(t);
      const k = 1 + 0.035 * Math.sin(5 * t + ph) + 0.025 * Math.sin(11 * t + ph * 2) + (r() - 0.5) * 0.03;
      pts.push([cx + a * k * Math.sign(c) * Math.pow(Math.abs(c), 0.5), cy + b * k * Math.sign(s) * Math.pow(Math.abs(s), 0.5)]);
    }
    return smooth(pts);
  }
  const star5 = (cx, cy, R, r = R * 0.45) => {
    let d = '';
    for (let i = 0; i < 10; i++) {
      const a = -Math.PI / 2 + (i * Math.PI) / 5, rad = i % 2 ? r : R;
      d += (i ? 'L' : 'M') + f(cx + Math.cos(a) * rad) + ' ' + f(cy + Math.sin(a) * rad);
    }
    return d + 'Z';
  };

  /* ---------- sprites ---------- */
  const S = {};
  const META = {}; // sky: no ground shadow; w: shadow width factor

  S.cat = (o = {}) => `
<path fill="${C.ginger}" d="M64 91C84 93 95 76 88 62C85 57 80 59 82 63C87 74 81 85 63 85Z"/>
<path fill="${C.ginger}" d="M30 96C22 74 32 52 50 52C68 52 78 74 70 96Z"/>
<ellipse class="nol" fill="${C.cream}" cx="50" cy="80" rx="11" ry="14"/>
<path fill="none" d="M32 70q5 2 8 0M30 80q5 2 8 0M68 70q-5 2-8 0M70 80q-5 2-8 0"/>
<path fill="${C.ginger}" d="M35 31L37 13L48 24Z"/><path fill="${C.ginger}" d="M65 31L63 13L52 24Z"/>
<path class="nol" fill="${C.pink}" d="M38 26L39 18L44 23Z"/><path class="nol" fill="${C.pink}" d="M62 26L61 18L56 23Z"/>
<circle fill="${C.ginger}" cx="50" cy="38" r="17"/>
<path fill="none" d="M45 23l1.5 5M50 22v6M55 23l-1.5 5"/>
${o.sleep || o.happy ? `<path fill="none" d="M41 37q3 2.5 6 0M53 37q3 2.5 6 0"/>`
      : `<ellipse class="solid" cx="44" cy="37" rx="2" ry="2.7"/><ellipse class="solid" cx="56" cy="37" rx="2" ry="2.7"/>`}
<circle class="nol" fill="${C.rose}" opacity=".45" cx="39" cy="44" r="3.5"/><circle class="nol" fill="${C.rose}" opacity=".45" cx="61" cy="44" r="3.5"/>
<path fill="${C.pink}" d="M47.5 42.5h5l-2.5 3z"/>
${o.sad ? `<path fill="none" d="M45 50q5-4 10 0"/>` : `<path fill="none" d="M50 45.5q-2 4-6 3M50 45.5q2 4 6 3"/>`}
<path class="fine" fill="none" d="M41 44L27 41M41 46.5L27 49M59 44L73 41M59 46.5L73 49"/>
<ellipse fill="${C.ginger}" cx="43" cy="94" rx="6" ry="3.5"/><ellipse fill="${C.ginger}" cx="57" cy="94" rx="6" ry="3.5"/>
${o.hat ? `<g transform="translate(31 -13) rotate(-10 19 30) scale(.38)">${S.hat()}</g>` : ''}`;

  S.dog = (o = {}) => `
<path fill="${C.brown}" d="M68 88C82 86 88 74 84 64C83 61 79 62 80 65C82 74 78 81 66 82Z"/>
<path fill="${C.tan}" d="M28 96C22 74 32 54 50 54C68 54 78 74 72 96Z"/>
<path class="nol" fill="${C.white}" d="M42 58C46 70 54 70 58 58C58 80 42 80 42 58Z"/>
<ellipse fill="${C.tan}" cx="50" cy="38" rx="18" ry="16"/>
<ellipse class="nol" fill="${C.brown}" cx="57.5" cy="33" rx="6" ry="5"/>
<path fill="${C.brown}" d="M35 27C24 29 21 44 26 52C30 56 35 50 37 40Z"/>
<path fill="${C.brown}" d="M65 27C76 29 79 44 74 52C70 56 65 50 63 40Z"/>
<ellipse fill="${C.white}" cx="50" cy="46" rx="9.5" ry="7"/>
${o.sad ? `<ellipse class="solid" cx="43" cy="35" rx="2" ry="2.4"/><ellipse class="solid" cx="57" cy="35" rx="2" ry="2.4"/>`
      : `<path fill="none" d="M40 35q3-3.5 6 0M54 35q3-3.5 6 0"/>`}
<ellipse class="solid" cx="50" cy="42" rx="3.4" ry="2.5"/>
${o.sad ? `<path fill="none" d="M45 51q5-3 10 0"/>` : `<path fill="${C.rose}" d="M43.5 47Q50 58 56.5 47Q50 50 43.5 47Z"/>`}
<ellipse fill="${C.tan}" cx="42" cy="94" rx="7" ry="3.5"/><ellipse fill="${C.tan}" cx="58" cy="94" rx="7" ry="3.5"/>`;

  S.cow = () => `
<path fill="none" d="M19 46C11 52 10 63 12 72"/><path fill="${C.black}" d="M12 69l-4 9 7-1z"/>
<rect fill="${C.cream}" x="24" y="64" width="8" height="30" rx="3"/><rect fill="${C.cream}" x="35" y="64" width="8" height="30" rx="3"/>
<rect fill="${C.cream}" x="62" y="64" width="8" height="30" rx="3"/><rect fill="${C.cream}" x="72" y="64" width="8" height="30" rx="3"/>
<path class="nol" fill="${C.black}" d="M24 90h8v4h-8zM35 90h8v4h-8zM62 90h8v4h-8zM72 90h8v4h-8z"/>
<path fill="${C.cream}" d="M18 48C18 36 30 34 50 34C68 34 78 36 80 46L80 64C80 72 72 74 50 74C28 74 18 72 18 64Z"/>
<path class="nol" fill="${C.black}" opacity=".85" d="M28 40C35 37 42 42 40 48C38 54 29 54 27 48Z"/>
<path class="nol" fill="${C.black}" opacity=".85" d="M55 51C62 49 68 53 66 59C62 66 53 62 55 51Z"/>
<path fill="${C.pink}" d="M53 73q4 7 9 0z"/>
<path fill="${C.cream}" d="M77 35l-9-3 6 7z"/>
<path fill="${C.butter}" d="M80 30q-3-7 2-10q-1 5 2 9z"/><path fill="${C.butter}" d="M88 29q1-7 6-8q-3 4-2 9z"/>
<path fill="${C.cream}" d="M76 36C79 27 92 26 95 37L97 49C97 56 87 58 82 52Z"/>
<ellipse fill="${C.pink}" cx="91" cy="52" rx="7.5" ry="5.5"/>
<circle class="solid" cx="88.5" cy="52" r="1.1"/><circle class="solid" cx="93.5" cy="52" r="1.1"/>
<circle class="solid" cx="86" cy="40" r="1.8"/>`;
  META.cow = { w: 1.3 };

  S.moon = (o = {}) => `
<path fill="${C.butter}" d="M62 10A42 42 0 1 0 62 90A50 50 0 0 1 62 10Z"/>
${o.face === false ? '' : `<path fill="none" d="M22 40q4 3 8 0"/>
<circle class="nol" fill="${C.rose}" opacity=".45" cx="27" cy="55" r="4"/>
<path fill="none" d="M20 63q6 5 12-1"/>`}`;
  META.moon = { sky: true };

  S.star = () => `<path fill="${C.butter}" d="${star5(50, 52, 44)}"/>`;
  META.star = { sky: true };

  S.sun = (o = {}) => {
    let rays = '';
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2, b = a + 0.17, c = a - 0.17;
      rays += `M${f(50 + Math.cos(c) * 30)} ${f(50 + Math.sin(c) * 30)}L${f(50 + Math.cos(a) * 47)} ${f(50 + Math.sin(a) * 47)}L${f(50 + Math.cos(b) * 30)} ${f(50 + Math.sin(b) * 30)}Z`;
    }
    return `<path fill="${C.ochre}" d="${rays}"/>
<circle fill="${C.butter}" cx="50" cy="50" r="29"/>
${o.face === false ? '' : `<path fill="none" d="M38 45q4-4 8 0M54 45q4-4 8 0"/>
<circle class="nol" fill="${C.rose}" opacity=".45" cx="37" cy="56" r="4"/><circle class="nol" fill="${C.rose}" opacity=".45" cx="63" cy="56" r="4"/>
<path fill="none" d="M41 60q9 8 18 0"/>`}`;
  };
  META.sun = { sky: true };

  S.dish = () => `
<path fill="none" d="M36 72l-7 15h-6M52 72l7 13 7-2"/>
<path fill="none" d="M22 48l-10-7M66 50l13-3"/>
<circle fill="${C.white}" cx="44" cy="48" r="24"/>
<path class="nol" fill="${C.blue}" fill-rule="evenodd" d="M25 48a19 19 0 1 0 38 0a19 19 0 1 0-38 0M29 48a15 15 0 1 0 30 0a15 15 0 1 0-30 0"/>
<circle fill="none" class="fine" cx="44" cy="48" r="15"/>
<ellipse class="solid" cx="38" cy="45" rx="1.8" ry="2.3"/><ellipse class="solid" cx="50" cy="45" rx="1.8" ry="2.3"/>
<path fill="none" d="M38 53q6 5 12 0"/>`;

  S.spoon = (o = {}) => `
${o.legs === false ? '' : `<path fill="none" d="M49 71l-7 15h-6M53 71l6 14 7-1"/><path fill="none" d="M45 50l-13 3M57 48l11-7"/>`}
<path fill="${C.silver}" d="M48 38L46 74Q51 78 56 74L54 38Z"/>
<ellipse fill="${C.silver}" cx="51" cy="25" rx="12.5" ry="16"/>
<ellipse class="nol" fill="${C.white}" cx="47" cy="19" rx="3" ry="6"/>
${o.legs === false ? '' : `<ellipse class="solid" cx="47" cy="25" rx="1.6" ry="2.1"/><ellipse class="solid" cx="55" cy="25" rx="1.6" ry="2.1"/>
<path fill="none" d="M46 31q5 4 10 0"/>`}`;

  S.fiddle = () => `
<path fill="none" d="M16 26L88 82"/>
<g transform="rotate(-35 50 50)">
<path fill="${C.rust}" d="M50 40C40 40 36 46 38 52C40 56 40 58 38 62C35 70 40 80 50 80C60 80 65 70 62 62C60 58 60 56 62 52C64 46 60 40 50 40Z"/>
<rect fill="${C.black}" x="47.5" y="14" width="5" height="32"/>
<circle fill="${C.rust}" cx="50" cy="12" r="3.5"/>
<path fill="none" class="fine" d="M44 55q-2 4 0 8M56 55q2 4 0 8"/>
<rect fill="${C.black}" x="46" y="66" width="8" height="12" rx="2"/>
<path fill="none" class="fine" d="M49 14V70M51 14V70"/>
</g>`;

  S.box = () => `
<path fill="#a97c48" d="M42 42L86 46L84 33L44 29Z"/>
<path fill="#5a3e28" d="M18 50L42 42L86 46L62 56Z"/>
<path fill="${C.tan}" d="M18 50L42 42L33 30L8 39Z"/>
<path fill="${C.tan}" d="M18 50L62 56L62 96L18 90Z"/>
<path fill="#a97c48" d="M62 56L86 46L86 84L62 96Z"/>
<path fill="#b88d58" d="M86 46L62 56L71 65L95 54Z"/>
<path fill="none" class="fine" d="M24 64l30 4M24 70l18 2.5"/>`;
  META.box = { w: 1.2 };

  S.frog = () => `
<ellipse fill="${C.green}" cx="27" cy="86" rx="14" ry="9"/><ellipse fill="${C.green}" cx="73" cy="86" rx="14" ry="9"/>
<ellipse fill="${C.green}" cx="50" cy="72" rx="27" ry="21"/>
<ellipse class="nol" fill="${C.butter}" cx="50" cy="80" rx="15" ry="12"/>
<circle class="nol" fill="${C.leaf}" cx="34" cy="70" r="3"/><circle class="nol" fill="${C.leaf}" cx="66" cy="66" r="2.5"/>
<circle fill="${C.green}" cx="37" cy="53" r="9.5"/><circle fill="${C.green}" cx="63" cy="53" r="9.5"/>
<circle fill="${C.white}" cx="37" cy="52" r="6"/><circle fill="${C.white}" cx="63" cy="52" r="6"/>
<circle class="solid" cx="38" cy="53" r="2.8"/><circle class="solid" cx="62" cy="53" r="2.8"/>
<path fill="none" d="M33 67Q50 79 67 67"/>
<ellipse fill="${C.green}" cx="40" cy="94" rx="6" ry="2.6"/><ellipse fill="${C.green}" cx="60" cy="94" rx="6" ry="2.6"/>`;

  S.hat = () => `
<ellipse fill="${C.black}" cx="50" cy="88" rx="40" ry="8"/>
<path fill="${C.black}" d="M28 88L31 30Q50 24 69 30L72 88Q50 95 28 88Z"/>
<ellipse fill="#645461" cx="50" cy="30" rx="19" ry="5"/>
<path fill="${C.red}" d="M29.4 72Q50 78 70.6 72L71.2 82Q50 89 28.8 82Z"/>
<path class="nol" fill="#8a7a86" d="M36 36L38 70L41 70L40 36Z"/>`;
  META.hat = { w: 1.2 };

  S.mouse = (o = {}) => {
    const col = o.rat ? C.rat : C.grey;
    return `
<path fill="none" d="${o.rat ? 'M24 86C4 88-2 72 6 60' : 'M24 86C8 84 6 70 14 64'}"/>
<circle fill="${col}" cx="${o.rat ? 66 : 64}" cy="${o.rat ? 55 : 52}" r="${o.rat ? 8 : 10}"/>
<circle class="nol" fill="${C.pink}" cx="${o.rat ? 66 : 64}" cy="${o.rat ? 56 : 53}" r="${o.rat ? 4.5 : 6}"/>
<path fill="${col}" d="M22 90C18 70 34 58 52 60C66 62 72 74 70 90Z"/>
<path class="nol" fill="${C.cream}" opacity=".6" d="M40 88C40 78 50 72 60 76C64 80 64 86 62 88Z"/>
<path fill="${col}" d="M58 66C60 54 72 50 84 60C88 63 91 66 94 69C88 73 80 75 70 74Z"/>
<circle class="solid" cx="77" cy="62" r="1.9"/>
${o.rat ? `<path fill="none" d="M73 57.5l7 1.5"/>` : ''}
<circle fill="${C.pink}" cx="93.5" cy="69" r="2.3"/>
<path class="fine" fill="none" d="M88 69l10-4M88 71l10 2"/>
<ellipse fill="${C.pink}" cx="38" cy="92" rx="7" ry="3"/><ellipse fill="${C.pink}" cx="60" cy="92" rx="7" ry="3"/>`;
  };

  S.tub = () => `
<path fill="${C.gold}" d="M22 80l-5 13h9l3-11Z"/><path fill="${C.gold}" d="M78 80l5 13h-9l-3-11Z"/>
<circle fill="#e5eef2" cx="28" cy="44" r="7"/><circle fill="#e5eef2" cx="41" cy="40" r="9"/>
<circle fill="#e5eef2" cx="57" cy="43" r="7.5"/><circle fill="#e5eef2" cx="70" cy="41" r="8"/>
<circle fill="#e5eef2" cx="64" cy="30" r="3"/><circle fill="#e5eef2" cx="35" cy="28" r="2.5"/>
<path fill="${C.gold}" d="M85 48V35Q85 30 80 30H73V34.5H80.5V48Z"/>
<path fill="${C.teal}" d="M8 52L92 52C92 76 80 86 50 86C20 86 8 76 8 52Z"/>
<rect fill="${C.white}" x="4" y="47" width="92" height="7" rx="3.5"/>`;
  META.tub = { w: 1.4 };

  S.duck = () => `
<path fill="${C.orange}" d="M46 87l-1 7h-7l9 1.5ZM58 87l0 7h-7l9 1.5Z"/>
<path fill="${C.white}" d="M12 58L22 66C24 82 40 90 58 88C76 86 82 74 78 64C74 56 60 58 50 62C40 64 28 62 12 58Z"/>
<path fill="#e8decb" d="M33 68C42 61 58 63 64 72C56 80 41 80 33 68Z"/>
<path fill="none" class="fine" d="M40 70q8 3 16 2M42 74q7 2 13 1"/>
<path fill="${C.white}" d="M62 66C59 53 59 40 70 36C80 32 89 40 85 50C83 56 77 58 77 67Z"/>
<path fill="${C.orange}" d="M84 43L97 47L84 52Z"/>
<circle class="solid" cx="76" cy="42" r="2"/>`;

  S.rabbithead = (o = {}) => `
<path fill="${C.rabbit}" d="M40 32C33 18 33 4 40 4C47 4 47 18 45 32Z"/>
<path fill="${C.rabbit}" d="M60 32C67 18 67 4 60 4C53 4 53 18 55 32Z"/>
<path class="nol" fill="${C.pink}" d="M41 28C37 18 37 9 40 9C43 9 43 18 43 28Z"/>
<path class="nol" fill="${C.pink}" d="M59 28C63 18 63 9 60 9C57 9 57 18 57 28Z"/>
<ellipse fill="${C.rabbit}" cx="50" cy="40" rx="15.5" ry="14"/>
<ellipse class="nol" fill="${C.cream}" cx="50" cy="46.5" rx="7.5" ry="5.5"/>
${o.sleep || o.laugh ? `<path fill="none" d="M41 38q3 2.5 6 0M53 38q3 2.5 6 0"/>`
      : `<ellipse class="solid" cx="44" cy="38" rx="2" ry="2.6"/><ellipse class="solid" cx="56" cy="38" rx="2" ry="2.6"/>`}
<circle class="nol" fill="${C.rose}" opacity=".45" cx="40" cy="45" r="3.2"/><circle class="nol" fill="${C.rose}" opacity=".45" cx="60" cy="45" r="3.2"/>
<path fill="${C.pink}" d="M48 43h4l-2 2.5z"/>
${o.laugh ? `<path fill="${C.rose}" d="M45 48Q50 56 55 48Z"/>` : `<path fill="none" d="M50 45.5v2M50 47.5q-2 2-4 1M50 47.5q2 2 4 1"/>`}
<path class="fine" fill="none" d="M42 46L30 44M42 48L30 50M58 46L70 44M58 48L70 50"/>`;

  S.rabbit = (o = {}) => `
<ellipse fill="${C.rabbit}" cx="40" cy="93" rx="10" ry="4.5"/><ellipse fill="${C.rabbit}" cx="60" cy="93" rx="10" ry="4.5"/>
<path fill="${C.rabbit}" d="M34 92C28 70 36 52 50 52C64 52 72 70 66 92Z"/>
<ellipse class="nol" fill="${C.cream}" cx="50" cy="76" rx="9" ry="13"/>
${o.jacket ? `<path fill="${C.blue}" d="M35 90C30 70 36 56 44 54L50 72L56 54C64 56 70 70 65 90L58 90L56 70L50 80L44 70L42 90Z"/>
<circle class="nol" fill="${C.gold}" cx="45" cy="74" r="1.6"/><circle class="nol" fill="${C.gold}" cx="55" cy="74" r="1.6"/>` : ''}
<path fill="${o.jacket ? C.blue : C.rabbit}" d="M37 58C28 64 27 74 31 79C34 78 36 71 41 65Z"/>
<path fill="${o.jacket ? C.blue : C.rabbit}" d="M63 58C72 64 73 74 69 79C66 78 64 71 59 65Z"/>
<circle fill="${C.rabbit}" cx="31" cy="79" r="3.5"/><circle fill="${C.rabbit}" cx="69" cy="79" r="3.5"/>
${S.rabbithead(o)}`;

  S.bed = (o = {}) => {
    const who = o.rabbit ? `<g transform="translate(15 33) scale(.42)">${S.rabbithead({ sleep: true })}</g>`
      : o.pip ? `<g transform="translate(18.5 44) scale(.42)">${S.piphead({ sleep: true })}</g>`
        : o.ears ? `<path fill="${C.rabbit}" d="M44 62C40 54 41 48 44 48C47 48 48 54 47 62Z"/><path fill="${C.rabbit}" d="M51 62C51 54 53 48 56 49C59 50 56 56 54 62Z"/>` : '';
    return `
<path fill="${C.brown}" d="M6 96V36Q14 26 22 36V96H17V60H11V96Z"/>
<path fill="${C.brown}" d="M86 96V54Q92 47 98 54V96H94V70H90V96Z"/>
<ellipse fill="${C.white}" cx="30" cy="58" rx="13" ry="6.5"/>
${who}
<path fill="${C.red}" d="M20 64Q50 ${o.ears ? 54 : 59} 88 62V84H20Z"/>
<path class="nol" fill="${C.butter}" d="M32 66h12v8H32zM56 72h12v8H56z"/>
<path class="nol" fill="${C.blue}" opacity=".8" d="M44 74h12v8H44zM68 64h12v8H68z"/>
<path fill="none" class="fine" d="M32 66v16M44 64v20M56 64v20M68 63v21M20 74H88"/>
<rect fill="${C.bark}" x="17" y="84" width="74" height="5"/>`;
  };
  META.bed = { w: 1.5 };

  S.pig = (o = {}) => `
<path fill="none" d="M14 52c-7-1-7-8-2-8c4 0 3 6-1 5"/>
<rect fill="${C.pink}" x="25" y="68" width="9" height="26" rx="3"/><rect fill="${C.pink}" x="36" y="68" width="9" height="26" rx="3"/>
<rect fill="${C.pink}" x="58" y="68" width="9" height="26" rx="3"/><rect fill="${C.pink}" x="69" y="68" width="9" height="26" rx="3"/>
<path class="nol" fill="${C.rose}" d="M25 90h9v4h-9zM36 90h9v4h-9zM58 90h9v4h-9zM69 90h9v4h-9z"/>
<ellipse fill="${C.pink}" cx="47" cy="58" rx="36" ry="22"/>
<path class="nol" fill="${C.rose}" opacity=".35" d="M24 66C34 76 60 78 74 70C66 80 34 80 24 66Z"/>
<path fill="${C.pink}" d="M73 41L79 27L86 40Z"/>
<circle fill="${C.pink}" cx="80" cy="53" r="15"/>
<ellipse fill="${C.rose}" cx="94" cy="57" rx="5" ry="7"/>
<ellipse class="solid" cx="93" cy="54.5" rx=".9" ry="1.5"/><ellipse class="solid" cx="95.5" cy="58.5" rx=".9" ry="1.5"/>
<circle class="solid" cx="83" cy="48" r="1.9"/>
<path fill="none" d="M82 62q4 3 8 0"/>
${o.ring ? `<path fill="${C.gold}" fill-rule="evenodd" d="M90 69a5.5 5.5 0 1 0 11 0a5.5 5.5 0 1 0-11 0M92.5 69a3 3 0 1 0 6 0a3 3 0 1 0-6 0"/>` : ''}`;
  META.pig = { w: 1.2 };

  S.hen = (o = {}) => `
<path fill="none" d="M44 86V95M39 96h9M56 86V95M51 96h9"/>
<path fill="${C.deepred}" d="M23 60C12 48 14 32 24 29C28 40 32 49 37 55Z"/>
<ellipse fill="${C.red}" cx="48" cy="66" rx="30" ry="22"/>
<path fill="${C.red}" d="M60 56C58 44 60 32 70 30C80 28 84 38 80 46C78 52 76 56 78 62Z"/>
<path fill="#de4b3a" d="M64 31q1-7 5-3q2-7 5-1q3-6 6 1q-6 3-16 3z"/>
<path fill="#de4b3a" d="M79 43q4 6-1 9q-3-5 1-9z"/>
<path fill="${C.ochre}" d="M80 37L89 40.5L80 44Z"/>
<circle class="solid" cx="74" cy="37" r="2"/>
<path fill="#a33a26" d="M34 64C43 55 62 57 67 68C58 79 43 78 34 64Z"/>
<path fill="none" class="fine" d="M42 66q7 4 15 2M45 70q6 3 12 1"/>
${o.apron ? `<path fill="${C.white}" d="M56 70C62 74 74 72 77 64C78 76 70 84 60 84C56 80 55 76 56 70Z"/>` : ''}`;

  S.barn = () => `
<path fill="${C.red}" d="M14 96V50L30 31H70L86 50V96Z"/>
<path fill="${C.black}" d="M7 53L28 25H72L93 53H86L69 33H31L14 53Z"/>
<rect fill="${C.butter}" x="43" y="40" width="14" height="12"/>
<path fill="none" class="fine" d="M50 40v12M43 46h14"/>
<rect fill="${C.deepred}" x="35" y="62" width="30" height="34"/>
<path fill="none" d="M35 62L65 96M65 62L35 96M50 62V96"/>
<path class="nol" fill="${C.deepred}" opacity=".5" d="M14 60h21v3H14zM65 60h21v3H65zM14 76h21v3H14zM65 76h21v3H65z"/>`;
  META.barn = { w: 1.4 };

  S.wheat = (o = {}) => {
    const n = o.n || 5; let stems = '', heads = '';
    for (let i = 0; i < n; i++) {
      const t = n === 1 ? 0 : i / (n - 1) - 0.5, bx = 50 + t * 10, tx = 50 + t * 46, ty = 22 + Math.abs(t) * 18;
      stems += `M${f(bx)} 96Q${f((bx + tx) / 2)} 60 ${f(tx)} ${f(ty)}`;
      const ang = Math.atan2(ty - 60, tx - bx) * 180 / Math.PI + 90;
      for (let k = 0; k < 5; k++) {
        const hx = tx + (bx - tx) * k * 0.045, hy = ty + (96 - ty) * k * 0.045;
        heads += `<ellipse fill="${C.ochre}" cx="${f(hx - 2.6)}" cy="${f(hy + 1)}" rx="2" ry="4.2" transform="rotate(${f(ang - 28)} ${f(hx - 2.6)} ${f(hy + 1)})"/>` +
          `<ellipse fill="${C.ochre}" cx="${f(hx + 2.6)}" cy="${f(hy + 1)}" rx="2" ry="4.2" transform="rotate(${f(ang + 28)} ${f(hx + 2.6)} ${f(hy + 1)})"/>`;
      }
      heads += `<ellipse fill="${C.ochre}" cx="${f(tx)}" cy="${f(ty - 3)}" rx="2" ry="4" transform="rotate(${f(ang)} ${f(tx)} ${f(ty - 3)})"/>`;
    }
    return `<path fill="none" d="${stems}"/>${heads}`;
  };

  S.bread = () => `
<path fill="#d79b55" d="M8 88C6 62 26 46 50 46C74 46 94 62 92 88Q50 94 8 88Z"/>
<path class="nol" fill="${C.butter}" opacity=".55" d="M20 66C24 56 36 50 46 50C34 54 26 60 20 66Z"/>
<path fill="none" d="M28 58q5 8 3 17M46 52q5 10 3 21M64 54q5 9 3 19"/>`;
  META.bread = { w: 1.3 };

  S.fox = (o = {}) => `
<path fill="${C.rust}" d="M30 90C6 92 0 70 10 58C16 52 22 60 20 68C18 78 26 84 36 84Z"/>
<path fill="${C.white}" d="M10 58C14 53 21 55 20 62C16 65 11 63 10 58Z"/>
<path fill="${C.rust}" d="M30 92C26 70 36 52 54 48C64 46 70 54 68 66C68 78 66 88 64 92Z"/>
<path class="nol" fill="${C.white}" d="M58 52C66 56 66 74 60 84C56 74 54 62 58 52Z"/>
<path fill="${C.rust}" d="M55 34L55 15L64 28Z"/><path fill="${C.rust}" d="M63 29L68 13L72 31Z"/>
<path class="nol" fill="${C.black}" d="M57 30L57 20L61 27ZM65 28L68 18L70 30Z"/>
<path fill="${C.rust}" d="M52 40C52 28 64 24 72 30L91 40C86 45 78 47 70 47C62 49 54 46 52 40Z"/>
<path class="nol" fill="${C.white}" d="M69 41L88 41.5C82 46.5 74 46.5 67 45Z"/>
<circle class="solid" cx="90.5" cy="40" r="2.3"/>
${o.happy ? `<path fill="none" d="M62 34q3-3 6 0"/>` : o.cross ? `<path fill="none" d="M61 31l7 2"/><circle class="solid" cx="65" cy="35" r="1.8"/>` : `<path class="solid" d="M62 35q3.5-3 7 0q-3.5 1.5-7 0z"/>`}
${o.cross ? `<path fill="none" d="M74 46q4-2 8 0"/>` : `<path fill="none" d="M74 44q4 2.5 9-1"/>`}
<path fill="${C.rust}" d="M55 68L52 94H60L62 72Z"/><path class="nol" fill="${C.black}" d="M52.5 88L52 94H60L60.6 88Z"/>`;

  S.pot = (o = {}) => `
${o.fire === false ? '' : `<path fill="${C.orange}" d="M30 96C26 88 32 84 34 78C36 84 40 86 40 92C42 88 44 84 48 80C50 86 54 88 54 94C56 90 60 86 62 82C64 88 70 90 68 96Z"/>
<path class="nol" fill="${C.butter}" d="M40 96C40 92 44 90 46 87C48 91 52 93 52 96Z"/>`}
<path fill="none" d="M26 80l-4 9M74 80l4 9"/>
<path fill="${C.black}" d="M16 46H84C86 70 72 86 50 86C28 86 14 70 16 46Z"/>
<path class="nol" fill="#8a7d86" opacity=".7" d="M24 52C24 64 30 74 38 78C30 70 28 60 28 52Z"/>
<ellipse fill="#6b5e68" cx="50" cy="46" rx="36" ry="7"/>
<ellipse class="nol" fill="#2f2730" cx="50" cy="46" rx="30" ry="4.4"/>
<path fill="none" d="M18 47C14 18 86 18 82 47"/>
<path fill="none" class="fine" d="M40 34q-4-5 0-10t0-10M56 34q-4-5 0-10t0-10"/>`;
  META.pot = { w: 1.1 };

  S.mud = () => `
<path fill="#7a5a3c" d="M8 88C10 78 30 76 44 80C56 72 82 74 92 84C96 92 80 96 60 95C40 98 12 96 8 88Z"/>
<path class="nol" fill="#a07a52" opacity=".7" d="M24 84C34 80 46 82 54 84C46 86 34 86 24 84Z"/>
<circle fill="#7a5a3c" cx="20" cy="70" r="3"/><circle fill="#7a5a3c" cx="80" cy="64" r="3.5"/><circle fill="#7a5a3c" cx="52" cy="62" r="2.4"/><circle fill="#7a5a3c" cx="66" cy="70" r="2"/>`;
  META.mud = { w: 1.4 };

  S.briar = () => {
    const thorns = (pts) => pts.map(([x, y, a]) => `M${x} ${y}l${f(Math.cos(a) * 4)} ${f(Math.sin(a) * 4)}`).join('');
    return `
<path fill="${C.moss}" d="${cloud(50, 66, 46, 30, 11, 7)}"/>
<path class="nol" fill="${C.leaf}" opacity=".6" d="${cloud(38, 74, 26, 16, 8, 3)}"/>
<path fill="none" d="M6 94C14 62 34 44 58 40C70 38 80 44 82 54M30 94C30 72 50 58 70 62C80 64 90 72 92 86M60 94C52 74 30 62 14 70"/>
<path fill="none" class="fine" d="${thorns([[16, 70, -2.2], [24, 56, -2], [36, 46, -1.8], [50, 41, -1.5], [64, 39, -1], [76, 45, -0.4], [36, 68, -2], [52, 60, -1.4], [74, 63, -0.8], [86, 72, -0.2], [44, 72, -2.6], [28, 64, -2.8]])}"/>
<path fill="${C.leaf}" d="M22 52q8-6 12 2q-8 4-12-2zM70 50q6-8 12-2q-6 6-12 2zM44 34q4-8 10-4q-4 7-10 4zM84 64q6-4 9 2q-5 4-9-2z"/>
<circle fill="${C.plum}" cx="30" cy="62" r="3.2"/><circle fill="${C.plum}" cx="34" cy="59" r="3"/><circle fill="${C.plum}" cx="60" cy="52" r="3.2"/>
<circle fill="${C.plum}" cx="64" cy="56" r="3"/><circle fill="${C.red}" cx="78" cy="76" r="2.8"/><circle fill="${C.plum}" cx="48" cy="78" r="3"/>`;
  };
  META.briar = { w: 1.5 };

  S.owl = (o = {}) => `
<path fill="${C.brown}" d="M30 30L32 13L42 24Q50 22 58 24L68 13L70 30C80 46 78 80 66 90C58 96 42 96 34 90C22 80 20 46 30 30Z"/>
<path class="nol" fill="${C.cream}" d="M38 56C40 48 60 48 62 56C64 72 58 86 50 88C42 86 36 72 38 56Z"/>
<path fill="none" class="fine" d="M44 60l3 3 3-3M50 60l3 3 3-3M41 68l3 3 3-3M47 68l3 3 3-3M53 68l3 3 3-3M44 76l3 3 3-3M50 76l3 3 3-3"/>
<path fill="#dcbb8c" d="M29 38C29 27 46 25 50 34C54 25 71 27 71 38C71 50 56 52 50 46C44 52 29 50 29 38Z"/>
<circle fill="${C.butter}" cx="41" cy="38" r="7.2"/><circle fill="${C.butter}" cx="59" cy="38" r="7.2"/>
${o.sleep ? `<path fill="none" d="M36 38q5 3 10 0M54 38q5 3 10 0"/>` : `<circle class="solid" cx="41.5" cy="38.5" r="3.3"/><circle class="solid" cx="58.5" cy="38.5" r="3.3"/>`}
<path fill="${C.ochre}" d="M47 44L53 44L50 50Z"/>
<path fill="#734a30" d="M28 50C19 60 21 78 32 87C32 72 34 60 37 52Z"/>
<path fill="#734a30" d="M72 50C81 60 79 78 68 87C68 72 66 60 63 52Z"/>
<path fill="none" d="M41 92l-3 4M43 92v5M45 92l3 4M55 92l-3 4M57 92v5M59 92l3 4"/>`;

  S.boatsail = () => `
<rect fill="${C.bark}" x="48.5" y="10" width="3" height="80"/>
<path fill="${C.white}" d="M53 12L53 66L86 66Z"/>
<path class="nol" fill="${C.rose}" opacity=".6" d="M53 30L66 30L72 40L53 40ZM53 52L80 52L83 58L53 58Z"/>`;
  META.boatsail = { sky: true };

  S.boat = () => `
<path fill="${C.pea}" d="M2 68H98L87 90C70 96 30 96 13 90Z"/>
<path class="nol" fill="${C.butter}" d="M2 68H98L96 73H4Z"/>
<path fill="none" class="fine" d="M8 79Q50 84 92 79M12 86Q50 91 88 86"/>`;
  META.boat = { sky: true };

  S.waves = () => {
    let d = 'M0 100V78', ink = '';
    for (let x = 0; x <= 100; x += 12.5) d += `Q${x + 6.25} 70 ${x + 12.5} 78`;
    d += 'V100Z';
    for (let x = 0; x < 100; x += 12.5) ink += `M${x + 2} 77q4.25-5 8.5 0`;
    return `<path class="nol" fill="${C.blue}" d="${d}"/><path fill="none" d="${ink}"/>`;
  };
  META.waves = { sky: true };

  S.ring = () => `
<path fill="${C.gold}" fill-rule="evenodd" d="M24 64a26 26 0 1 0 52 0a26 26 0 1 0-52 0M31 64a19 19 0 1 0 38 0a19 19 0 1 0-38 0"/>
<path fill="#d2475a" d="M40 34L60 34L65 41L50 52L35 41Z"/>
<path fill="none" class="fine" d="M35 41H65M45 34L50 52L55 34"/>
<path fill="none" d="M82 18v12M76 24h12M16 30v8M12 34h8M80 76v8M76 80h8"/>`;
  META.ring = { sky: true };

  S.bongtree = () => {
    let leaves = '';
    for (let i = 0; i < 9; i++) {
      const a = -Math.PI + (i / 8) * Math.PI, ex = 50 + Math.cos(a) * 36, ey = 24 + Math.sin(a) * 18 + 10;
      leaves += `<path fill="${i % 2 ? C.leaf : C.green}" d="M50 24Q${f((50 + ex) / 2 + Math.sin(a) * 8)} ${f((24 + ey) / 2 - 10)} ${f(ex)} ${f(ey)}Q${f((50 + ex) / 2)} ${f((24 + ey) / 2 + 2)} 50 26Z"/>`;
    }
    return `<path fill="${C.bark}" d="M47 96C45 70 52 50 47.5 24L52.5 24C57 50 51 70 54 96Z"/>
<path fill="none" class="fine" d="M48 40l5 2M49 52l5 2M48 64l6 2M49 76l6 2M50 88l5 2"/>${leaves}
<circle fill="${C.ochre}" cx="50" cy="24" r="4"/>`;
  };

  S.turkey = () => {
    let fan = '';
    const cols = [C.brown, C.rust, C.bark, C.ochre];
    for (let i = 0; i < 9; i++) {
      const a = Math.PI + (i / 8) * Math.PI, x1 = 50 + Math.cos(a - 0.17) * 40, y1 = 66 + Math.sin(a - 0.17) * 40, x2 = 50 + Math.cos(a + 0.17) * 40, y2 = 66 + Math.sin(a + 0.17) * 40;
      fan += `<path fill="${cols[i % 4]}" d="M50 66L${f(x1)} ${f(y1)}Q${f(50 + Math.cos(a) * 46)} ${f(66 + Math.sin(a) * 46)} ${f(x2)} ${f(y2)}Z"/>`;
    }
    return `${fan}
<path fill="none" d="M44 84V95M40 96h8M56 84V95M52 96h8"/>
<ellipse fill="${C.bark}" cx="50" cy="72" rx="17" ry="15"/>
<path fill="#b9b7c9" d="M54 64C56 54 56 46 60 44C66 42 68 48 64 52C61 55 60 60 61 66Z"/>
<path fill="#de4b3a" d="M62 50q2 7-2 9q-2-5 2-9z"/>
<path fill="${C.ochre}" d="M65 46L71 48L65 50Z"/>
<circle class="solid" cx="62" cy="46.5" r="1.5"/>`;
  };

  S.tree = (o = {}) => `
<path fill="${C.bark}" d="M43 96C46 82 46 70 44 60L48 62L50 52L53 62L57 58C55 70 55 82 59 96Z"/>
<path fill="${o.color || C.green}" d="${cloud(50, 38, 40, 30, 10, o.seed || 4)}"/>
<path class="nol" fill="${C.leaf}" opacity=".5" d="${cloud(42, 46, 22, 14, 7, (o.seed || 4) + 2)}"/>`;

  // the tree whose fruit is words; o.words lists which tags still hang on it
  const TAGS = { in: [24, 34, -8], cat: [30, 50, 6], hat: [50, 24, -4], sun: [73, 44, 8], bug: [42, 66, -6], jam: [64, 62, 5], bed: [80, 26, -7] };
  S.wordtree = (o = {}) => {
    const words = o.words || Object.keys(TAGS);
    const tags = words.filter((w) => TAGS[w]).map((w) => {
      const [x, y, a] = TAGS[w], wd = 4 + w.length * 4.2;
      return `<path fill="none" class="fine" d="M${x} ${y - 9}v5"/>
<g transform="rotate(${a} ${x} ${y})"><rect fill="${C.cream}" x="${f(x - wd / 2)}" y="${y - 4}" width="${f(wd)}" height="9" rx="1.6"/>
<text class="label" x="${x}" y="${y + 3}" text-anchor="middle" font-size="7.5">${w}</text></g>`;
    }).join('');
    return `
<path fill="${C.bark}" d="M42 96C45 84 45 74 42 64L47 66L49 56L53 66L60 61C56 74 56 84 60 96Z"/>
<path fill="${C.green}" d="${cloud(52, 40, 46, 32, 12, 11)}"/>
<path class="nol" fill="${C.leaf}" opacity=".45" d="${cloud(40, 50, 26, 15, 8, 5)}"/>
<path fill="none" class="fine" d="M30 28q6-3 12 0M60 20q6-3 12 0M78 52q5-3 10 0M22 48q5-3 10 0"/>${tags}`;
  };
  META.wordtree = { w: 1.4 };

  S.door = () => {
    let bricks = '';
    for (let y = 36, row = 0; y < 96; y += 8, row++) {
      bricks += `M0 ${y}H100`;
      for (let x = row % 2 ? 6 : 0; x < 100; x += 12) if (x < 30 || x > 70) bricks += `M${x} ${y}v8`;
    }
    return `
<path fill="${C.brick}" d="M0 30H100V96H0Z"/>
<path fill="none" class="fine" d="${bricks}"/>
<path fill="${C.butter}" d="M33 96V52C33 37 67 37 67 52V96Z"/>
<path class="nol" fill="${C.green}" opacity=".8" d="M40 96C44 86 56 86 60 96Z"/>
<path fill="${C.leaf}" d="M33 96V52C33 41 41 38 47 40L47 98Z"/>
<circle class="solid" cx="43.5" cy="70" r="1.6"/>
<path class="nol" fill="${C.moss}" d="${cloud(10, 34, 14, 8, 7, 2)}"/><path class="nol" fill="${C.moss}" d="${cloud(90, 40, 14, 10, 7, 9)}"/>
<path fill="${C.leaf}" d="M4 34q4-5 8 0q-4 4-8 0zM14 30q4-5 8 0q-4 4-8 0zM86 38q4-5 8 0q-4 4-8 0zM90 46q4-5 8 0q-4 4-8 0z"/>`;
  };
  META.door = { w: 1.6 };

  S.piphead = (o = {}) => `
<circle fill="#f2cfae" cx="50" cy="38" r="12.5"/>
<path fill="#7a4a2a" d="M37.5 38C35 26 45 21 51 23C57 21 66 27 62.5 38C61 32 56 29.5 50 30.5C44 29.5 40 33 37.5 38Z"/>
<path fill="#7a4a2a" d="M48 24q2-6 7-5q-4 2-4 6z"/>
${o.sleep ? `<path fill="none" d="M43 39q2.5 2 5 0M52 39q2.5 2 5 0"/>` : `<circle class="solid" cx="45.5" cy="39" r="1.6"/><circle class="solid" cx="54.5" cy="39" r="1.6"/>`}
<circle class="nol" fill="${C.rose}" opacity=".55" cx="42" cy="44" r="2.8"/><circle class="nol" fill="${C.rose}" opacity=".55" cx="58" cy="44" r="2.8"/>
${o.sneeze ? `<ellipse fill="${C.rose}" cx="50" cy="46.5" rx="2.2" ry="2.6"/>` : `<path fill="none" d="M46 45.5q4 3.5 8 0"/>`}`;

  S.pip = (o = {}) => `
<rect fill="${C.navy}" x="42" y="78" width="6" height="15"/><rect fill="${C.navy}" x="52" y="78" width="6" height="15"/>
<ellipse fill="${C.black}" cx="44" cy="94" rx="6.5" ry="3.5"/><ellipse fill="${C.black}" cx="56" cy="94" rx="6.5" ry="3.5"/>
<path fill="${C.red}" d="M35 82L40 51C44 47 56 47 60 51L65 82Q50 86 35 82Z"/>
<path class="nol" fill="${C.cream}" d="M48 58h4v2h-4zM48 66h4v2h-4zM48 74h4v2h-4z"/>
<path fill="none" class="fine" d="M50 52V84"/>
<path fill="${C.red}" d="M40 53C33 59 31 67 33 73L38 73C38 67 40 61 43 57Z"/>
<path fill="${C.red}" d="M60 53C67 59 69 67 67 73L62 73C62 67 60 61 57 57Z"/>
<circle fill="#f2cfae" cx="35.5" cy="75" r="3.2"/><circle fill="#f2cfae" cx="64.5" cy="75" r="3.2"/>
<path fill="${C.ochre}" d="M41 49H59V54H41ZM53 54L56 66L60 65L57 54Z"/>
${S.piphead(o)}`;

  S.bug = () => `
<path fill="none" d="M28 48l-12-6M26 60H12M28 72l-12 7M72 48l12-6M74 60H88M72 72l12 7"/>
<path fill="none" class="fine" d="M44 24q-6-10-12-12M56 24q6-10 12-12"/>
<circle class="solid" cx="32" cy="12" r="2"/><circle class="solid" cx="68" cy="12" r="2"/>
<ellipse fill="${C.black}" cx="50" cy="30" rx="13" ry="9"/>
<circle class="nol" fill="${C.white}" cx="45" cy="28" r="2.2"/><circle class="nol" fill="${C.white}" cx="55" cy="28" r="2.2"/>
<ellipse fill="${C.red}" cx="50" cy="58" rx="25" ry="28"/>
<path fill="none" d="M50 31V86"/>
<circle class="solid" cx="39" cy="46" r="4.5"/><circle class="solid" cx="61" cy="46" r="4.5"/>
<circle class="solid" cx="37" cy="65" r="5"/><circle class="solid" cx="63" cy="65" r="5"/><circle class="solid" cx="50" cy="79" r="3.5"/>`;
  META.bug = { w: 0.8 };

  S.jam = () => `
<path fill="#b8323f" d="M24 40H76V86C76 92 70 96 64 96H36C30 96 24 92 24 86Z"/>
<path class="nol" fill="${C.white}" opacity=".45" d="M30 46h4v40h-4z"/>
<rect fill="${C.cream}" x="34" y="58" width="32" height="20" rx="2"/>
<text class="label" x="50" y="72.5" text-anchor="middle" font-size="12">jam</text>
<path fill="${C.white}" d="M17 41C22 30 78 30 83 41C80 46 72 43 69 47C60 43 40 43 31 47C28 43 20 46 17 41Z"/>
<path class="nol" fill="${C.red}" opacity=".7" d="M28 36h5v4h-5zM40 34h5v4h-5zM52 34h5v4h-5zM64 35h5v4h-5zM34 40h5v3h-5zM58 40h5v3h-5z"/>
<path fill="none" d="M22 42Q50 48 78 42"/>`;

  /* ---------- backgrounds ---------- */
  const W = 300, H = 360;
  const sky = (c) => `<rect fill="${c}" x="-20" y="-20" width="${W + 40}" height="${H + 40}"/>`;
  const ground = (c, h, bump = 14) => `<path fill="${c}" d="M-20 ${h}Q75 ${h - bump} 150 ${h - 4}T320 ${h - 8}V380H-20Z"/>`;
  function tufts(r, h, n = 14) {
    let d = '';
    for (let i = 0; i < n; i++) {
      const x = 15 + r() * 270, y = h + 18 + r() * (H - h - 30);
      d += `M${f(x)} ${f(y)}l2-6M${f(x + 3)} ${f(y)}l1-7M${f(x + 6)} ${f(y)}l-1-5`;
    }
    return `<path fill="none" class="fine" d="${d}"/>`;
  }
  function twinkles(r, n, ymax) {
    let s = '';
    for (let i = 0; i < n; i++) s += `<path fill="${C.butter}" d="${star5(f(20 + r() * 260), f(20 + r() * ymax), f(3 + r() * 4))}"/>`;
    return s;
  }
  const clouds = (r) => `<path fill="#f7f2e6" d="${cloud(70 + r() * 30, 60 + r() * 20, 38, 14, 8, 3)}"/><path fill="#f7f2e6" d="${cloud(220 + r() * 30, 40 + r() * 30, 30, 11, 7, 5)}"/>`;
  function wavesBg(top, col, r, rows = 5) {
    let d = `M-20 ${top}`, ink = '';
    for (let x = -20; x < 320; x += 25) d += `Q${x + 12.5} ${top - 8} ${x + 25} ${top}`;
    d += 'V380H-20Z';
    for (let row = 0; row < rows; row++) {
      const y = top + 18 + row * 22;
      for (let x = (row % 2) * 20 + r() * 10; x < 300; x += 40 + r() * 20) ink += `M${f(x)} ${f(y)}q6-6 12 0`;
    }
    return { wash: `<path fill="${col}" d="${d}"/>`, ink: `<path fill="none" class="fine" d="${ink}"/>` };
  }

  const BG = {
    none: () => null,
    day: (r) => ({ wash: sky(C.sky) + clouds(r) + ground(C.green, 262), ink: tufts(r, 262) }),
    farm: (r) => {
      let posts = '', ink = '';
      for (let x = 12; x < 300; x += 36) { posts += `<rect fill="#c9ab7e" x="${x}" y="226" width="6" height="34"/>`; }
      ink = `<path fill="none" d="M0 236H300M0 250H300${[...Array(9)].map((_, i) => `M${12 + i * 36} 226v34M${18 + i * 36} 226v34`).join('')}"/>`;
      return { wash: sky(C.sky) + clouds(r) + `<path fill="#c9ab7e" d="M0 233h300v5H0zM0 247h300v5H0z"/>` + posts + ground(C.green, 262), ink: ink + tufts(r, 262) };
    },
    night: (r) => ({ wash: sky('#3d5280') + twinkles(r, 9, 170) + ground('#506c42', 266), ink: tufts(r, 266, 8) }),
    indoor: (r) => {
      let stripes = '', boards = '';
      for (let x = 0; x < 300; x += 28) stripes += `<rect class="nol" fill="#e3c992" x="${x}" y="-20" width="11" height="300"/>`;
      for (let y = 280; y < 370; y += 18) boards += `M-20 ${y}H320`;
      for (let i = 0; i < 9; i++) boards += `M${f(r() * 300)} ${280 + Math.floor(r() * 5) * 18}v18`;
      return {
        wash: sky('#ecd8a8') + stripes + `<rect fill="#b38a5e" x="-20" y="262" width="340" height="120"/><rect fill="#8f6640" x="-20" y="256" width="340" height="9"/>`,
        ink: `<path fill="none" d="M-20 256H320M-20 265H320"/><path fill="none" class="fine" d="${boards}"/>`
      };
    },
    sea: (r) => { const w = wavesBg(236, '#6f9db2', r); return { wash: sky('#c4d6df') + clouds(r) + w.wash, ink: w.ink }; },
    nightsea: (r) => { const w = wavesBg(240, '#3d6581', r); return { wash: sky('#34476f') + twinkles(r, 11, 180) + w.wash, ink: w.ink }; },
    nightbeach: (r) => {
      const w = wavesBg(212, '#3d6581', r, 2), shore = 'M-20 266Q80 254 150 260T320 256';
      return { wash: sky('#34476f') + twinkles(r, 11, 160) + w.wash + `<path fill="#d9c08b" d="${shore}V380H-20Z"/>`, ink: w.ink + `<path fill="none" d="${shore}"/>` };
    },
    wood: (r) => {
      let back = '';
      for (let i = 0; i < 4; i++) {
        const x = 20 + i * 80 + r() * 30;
        back += `<rect class="nol" fill="#a3936f" x="${f(x)}" y="80" width="${f(10 + r() * 6)}" height="190"/><path class="nol" fill="#9db06d" d="${cloud(x + 6, 70 + r() * 30, 46, 34, 9, i + 2)}"/>`;
      }
      return { wash: sky('#dbe3c2') + back + ground('#7f9852', 262), ink: tufts(r, 262) };
    },
    garden: (r) => ({
      wash: sky(C.sky) + clouds(r) + `<path fill="#5f7f45" d="${cloud(60, 240, 90, 26, 10, 4)}"/><path fill="#5f7f45" d="${cloud(240, 236, 90, 28, 10, 6)}"/>` + ground(C.green, 262),
      ink: tufts(r, 262) + `<path fill="none" class="fine" d="M20 230q5-4 10 0M90 222q5-4 10 0M200 220q5-4 10 0M260 232q5-4 10 0"/>`
    }),
    hill: (r) => ({
      wash: sky(C.sky) + clouds(r) + `<path fill="#94b264" d="M-20 300C40 300 70 150 150 150S260 300 320 300V380H-20Z"/>` + ground(C.green, 290, 6),
      ink: tufts(r, 290, 8) + `<path fill="none" d="M-20 300C40 300 70 150 150 150S260 300 320 300"/>`
    })
  };

  /* ---------- composing a picture ---------- */
  let uid = 0;
  function place(item) {
    const [name, x, y, s = 1, o = {}] = item;
    const fn = S[name];
    if (!fn) return '';
    const body = fn(o), meta = META[name] || {};
    const tr = `translate(${x} ${y})${o.rot ? ` rotate(${o.rot})` : ''} scale(${o.flip ? -s : s} ${s}) translate(-50 -96)`;
    const shadow = meta.sky || o.noShadow ? '' :
      `<g class="ink-pass"><ellipse class="hatch" cx="${x}" cy="${f(y + s)}" rx="${f(30 * s * (meta.w || 1))}" ry="${f(4.5 * s)}"/></g>`;
    const g = `${shadow}<g transform="${tr}" style="--sw:${(1.7 / s).toFixed(2)}" class="sprite">` +
      `<g class="wash-pass" filter="url(#wash)">${body}</g><g class="ink-pass" filter="url(#ink)">${body}</g></g>`;
    return o.pop ? `<g class="pop">${g}</g>` : g;
  }

  function scene(spec = {}, cls = '') {
    const id = 'v' + (++uid);
    const seed = spec.seed || 7;
    const bgFn = BG[spec.bg || 'day'] || BG.day;
    const bg = bgFn(rng(seed * 31));
    const clip = vignette(150, 180, 140, 168, seed);
    const back = bg ? `<defs><clipPath id="${id}"><path d="${clip}"/></clipPath></defs>
<g class="bg wash-pass" filter="url(#washbg)"><g clip-path="url(#${id})">${bg.wash}</g></g>
<g class="bg ink-pass" style="--sw:1.4" filter="url(#ink)"><g clip-path="url(#${id})">${bg.ink}</g></g>` : '';
    return `<svg class="scene ${cls}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${back}${(spec.art || []).map(place).join('')}</svg>`;
  }

  global.ART = { scene, sprites: S, colors: C };
})(window);
