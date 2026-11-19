'use strict';

var FIRST_ROUND_END = Date.parse('2026-11-25T12:00:00+08:00');
var ALL_END = Date.parse('2027-08-25T12:00:00+08:00');
var DAY_MS = 24 * 60 * 60 * 1000;
var HOUR_MS = 60 * 60 * 1000;
var MINUTE_MS = 60 * 1000;
var timerId = null;

var curFacultyIdx = 0;
var curProgramIdx = -1;
var curCategory = 'nonlocal';
var curCurriculum = 'ib';

/* ---- 纯函数（可单独测试） ---- */

function getCountdownMode(nowMs) {
  if (nowMs < FIRST_ROUND_END) {
    return { mode: 'first', target: FIRST_ROUND_END, label: '首轮截止', deadline: '2026.11.25 中午 12:00' };
  }
  if (nowMs < ALL_END) {
    return { mode: 'all', target: ALL_END, label: '全部截止', deadline: '2027.08.25 中午 12:00' };
  }
  return { mode: 'closed', target: ALL_END, label: '申请已截止', deadline: '全部截止 2027.08.25 中午 12:00' };
}

function pad(n) {
  return (n < 10 ? '0' : '') + n;
}

function formatRemaining(diffMs) {
  if (diffMs <= 0) {
    return '已截止';
  }
  var days = Math.floor(diffMs / DAY_MS);
  var rem = diffMs % DAY_MS;
  var hours = Math.floor(rem / HOUR_MS);
  rem = rem % HOUR_MS;
  var minutes = Math.floor(rem / MINUTE_MS);
  var seconds = Math.floor((rem % MINUTE_MS) / 1000);
  return days + '天 ' + pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
}

function fmtNum(n) {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function getFeeText(cat, feeCat) {
  if (cat === 'local') {
    return 'HK$' + fmtNum(HKU_DATA.fees.local) + ' / 年（有政府资助）';
  }
  if (feeCat === 'stem') {
    return 'HK$' + fmtNum(HKU_DATA.fees.stem) + ' / 年（STEM）';
  }
  if (feeCat === 'med') {
    return 'HK$' + fmtNum(HKU_DATA.fees.med) + ' / 年（医学 / 牙科）';
  }
  return 'HK$' + fmtNum(HKU_DATA.fees.nonstem) + ' / 年（非 STEM）';
}

function getTotalText(cat, feeCat) {
  if (feeCat !== 'med') {
    return '';
  }
  if (cat === 'local') {
    return '6年总学费 HK$297,000';
  }
  return '6年总学费 HK$3,540,000';
}

function getChg(cur, p) {
  if (cur === 'ib') {
    return p.chgIb;
  }
  if (cur === 'al') {
    return p.chgAl;
  }
  return p.chgSat;
}

function getReq(cur, p) {
  if (cur === 'ib') {
    if (p.ib === null) {
      return { text: '请查官网', rule: '该专业录取要求请查港大官网。' };
    }
    return { text: 'IB ' + p.ib + ' 分', rule: '须完整 IB 文凭（含 CAS、TOK、EE）。' };
  }
  if (cur === 'al') {
    if (p.al === null) {
      return { text: '请查官网', rule: '该专业录取要求请查港大官网。' };
    }
    return { text: p.al, rule: '至少 3 门 A-Level；不计 Critical Thinking、英语/中文相关科目、EPQ、General Studies 等。' };
  }
  if (p.sat === null) {
    return { text: '请查官网', rule: '该专业录取要求请查港大官网。' };
  }
  return { text: p.sat, rule: '至少 3 门 AP，另加 SAT 或再加 2 门 AP；不计英语语言与写作、Research、Seminar。' };
}

/* ---- DOM 工具 ---- */

function el(id) {
  return document.getElementById(id);
}

function curProgram() {
  if (curFacultyIdx < 0 || curProgramIdx < 0) {
    return null;
  }
  return HKU_DATA.faculties[curFacultyIdx].programs[curProgramIdx];
}

/* ---- 倒计时 ---- */

function updateCountdown() {
  var mode = getCountdownMode(Date.now());
  el('cd-mode').textContent = mode.label;
  el('cd-deadline').textContent = mode.deadline;
  if (mode.mode === 'closed') {
    el('cd-big').textContent = '申请已截止';
  } else {
    el('cd-big').textContent = formatRemaining(mode.target - Date.now());
  }
}

function startTimer() {
  if (timerId !== null) {
    return;
  }
  updateCountdown();
  timerId = setInterval(updateCountdown, 1000);
}

function stopTimer() {
  if (timerId !== null) {
    clearInterval(timerId);
    timerId = null;
  }
}

function updateToday() {
  var target = el('today');
  if (!target) {
    return;
  }
  var now = new Date();
  target.textContent = '今天 ' + now.getFullYear() + '年' +
    (now.getMonth() + 1) + '月' + now.getDate() + '日';
}

/* ---- 视图切换 ---- */

function showView(name) {
  var cd = el('view-countdown');
  var pg = el('view-programs');
  var navCd = el('nav-countdown');
  var navPg = el('nav-programs');
  if (name === 'programs') {
    cd.className = 'hidden';
    pg.className = '';
    navCd.className = 'navbtn';
    navPg.className = 'navbtn active';
  } else {
    cd.className = '';
    pg.className = 'hidden';
    navCd.className = 'navbtn active';
    navPg.className = 'navbtn';
  }
}

/* ---- 学院 / 专业 ---- */

function renderChips() {
  var box = el('faculty-chips');
  var html = '';
  for (var i = 0; i < HKU_DATA.faculties.length; i++) {
    var cls = i === curFacultyIdx ? 'chip active' : 'chip';
    html += '<button type="button" class="' + cls + '" data-fi="' + i + '">' +
      HKU_DATA.faculties[i].name + '</button>';
  }
  box.innerHTML = html;
  var btns = box.getElementsByTagName('button');
  for (var j = 0; j < btns.length; j++) {
    btns[j].addEventListener('click', function () {
      selectFaculty(parseInt(this.getAttribute('data-fi'), 10));
    });
  }
}

function renderPrograms() {
  var box = el('program-list');
  var fac = HKU_DATA.faculties[curFacultyIdx];
  var html = '';
  for (var i = 0; i < fac.programs.length; i++) {
    var p = fac.programs[i];
    var cls = i === curProgramIdx ? 'pitem active' : 'pitem';
    html += '<button type="button" class="' + cls + '" data-pi="' + i + '">' +
      '<span class="pname">' + p.name + '</span></button>';
  }
  box.innerHTML = html;
  var btns = box.getElementsByTagName('button');
  for (var j = 0; j < btns.length; j++) {
    btns[j].addEventListener('click', function () {
      selectProgram(parseInt(this.getAttribute('data-pi'), 10));
    });
  }
}

function selectFaculty(i) {
  curFacultyIdx = i;
  curProgramIdx = -1;
  renderChips();
  renderPrograms();
  el('detail').className = 'detail hidden';
}

function selectProgram(i) {
  curProgramIdx = i;
  renderPrograms();
  renderDetail();
  el('detail').className = 'detail';
}

/* ---- 详情 ---- */

function setSegActive(prefix, activeId) {
  var ids = [prefix + '-local', prefix + '-nonlocal'];
  if (prefix === 'cur') {
    ids = ['cur-ib', 'cur-al', 'cur-sat'];
  }
  for (var i = 0; i < ids.length; i++) {
    var b = el(ids[i]);
    if (b) {
      b.className = ids[i] === activeId ? 'segbtn active' : 'segbtn';
    }
  }
}

function updateFee() {
  var p = curProgram();
  if (!p) {
    return;
  }
  el('d-fee').textContent = getFeeText(curCategory, p.fee);
  var total = getTotalText(curCategory, p.fee);
  var totalEl = el('d-total');
  if (total) {
    totalEl.textContent = total;
    totalEl.className = 'feetotal';
  } else {
    totalEl.textContent = '';
    totalEl.className = 'feetotal hidden';
  }
}

function updateReq() {
  var p = curProgram();
  if (!p) {
    return;
  }
  var r = getReq(curCurriculum, p);
  el('d-req').textContent = r.text;
  el('d-rule').textContent = r.rule;
  var chg = getChg(curCurriculum, p);
  var chgEl = el('d-chg');
  if (chg) {
    chgEl.textContent = '2027 年变化：' + chg;
    chgEl.className = 'chg';
  } else {
    chgEl.textContent = '';
    chgEl.className = 'chg hidden';
  }
}

function renderDetail() {
  var p = curProgram();
  if (!p) {
    return;
  }
  var fac = HKU_DATA.faculties[curFacultyIdx];
  el('d-name').textContent = p.name;
  el('d-en').textContent = p.en;
  el('d-faculty').textContent = fac.name;
  setSegActive('cat', curCategory === 'local' ? 'cat-local' : 'cat-nonlocal');
  setSegActive('cur', curCurriculum === 'ib' ? 'cur-ib' : (curCurriculum === 'al' ? 'cur-al' : 'cur-sat'));
  updateFee();
  updateReq();
}

/* ---- 绑定 ---- */

function bindSeg(id, fn) {
  var b = el(id);
  if (b) {
    b.addEventListener('click', fn);
  }
}

bindSeg('nav-countdown', function () { showView('countdown'); });
bindSeg('nav-programs', function () { showView('programs'); });
bindSeg('goto-programs', function () { showView('programs'); });
bindSeg('cat-local', function () { curCategory = 'local'; setSegActive('cat', 'cat-local'); updateFee(); });
bindSeg('cat-nonlocal', function () { curCategory = 'nonlocal'; setSegActive('cat', 'cat-nonlocal'); updateFee(); });
bindSeg('cur-ib', function () { curCurriculum = 'ib'; setSegActive('cur', 'cur-ib'); updateReq(); });
bindSeg('cur-al', function () { curCurriculum = 'al'; setSegActive('cur', 'cur-al'); updateReq(); });
bindSeg('cur-sat', function () { curCurriculum = 'sat'; setSegActive('cur', 'cur-sat'); updateReq(); });

updateToday();
renderChips();
renderPrograms();
startTimer();

if (typeof document.addEventListener === 'function') {
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      stopTimer();
    } else {
      startTimer();
    }
  });
}
