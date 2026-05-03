function setTheme(t) {
  document.documentElement.setAttribute('data-theme', t);
  try { localStorage.setItem('jjvs_theme', t); } catch(e){}
  document.querySelectorAll('.t-tab').forEach(b => {
    b.classList.toggle('active', b.dataset.t === t);
  });
}
try {
  const savedTheme = localStorage.getItem('jjvs_theme') || 'black';
  setTheme(savedTheme);
} catch(e){}

const FBC = {
  apiKey:"AIzaSyC-_lE6oDtZMqGK_JQOx7StGTkzjqU1LQw",
  authDomain:"jjvs-att.firebaseapp.com",
  databaseURL:"https://jjvs-att-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId:"jjvs-att",
  storageBucket:"jjvs-att.firebasestorage.app",
  messagingSenderId:"199163483355",
  appId:"1:199163483355:web:ac66bbb7407acede4ce8fe"
};
const ROOT = "jjvs_v2";
firebase.initializeApp(FBC);
const db = firebase.database();
const ref = p => db.ref(`${ROOT}/${p}`);
const dbGet = p => ref(p).once('value').then(s=>s.val());
const dbSet = (p,v) => ref(p).set(v);
const dbUpd = (p,v) => ref(p).update(v);

// 基底班級（程式預設）— 動態追加自 Firebase
let CLASSES = ["音三莊","演三莊","音二莊","演二樸","音一莊"];
// 基底學生資料（程式預設）— 動態追加自 Firebase
let STUDENTS = [
  {id:"M3-01",name:"毛語程",cls:"音三莊"},{id:"M3-02",name:"林叡成",cls:"音三莊"},
  {id:"M3-03",name:"田宇紘",cls:"音三莊"},{id:"M3-04",name:"吳昆達",cls:"音三莊"},
  {id:"M3-05",name:"吳宥良",cls:"音三莊"},{id:"M3-06",name:"黃崇恩",cls:"音三莊"},
  {id:"M3-07",name:"林宏澤",cls:"音三莊"},{id:"M3-08",name:"金品澔",cls:"音三莊"},
  {id:"M3-09",name:"劉宸昀",cls:"音三莊"},{id:"M3-10",name:"蔡呈樂",cls:"音三莊"},
  {id:"M3-11",name:"蘇瑞吾",cls:"音三莊"},{id:"M3-12",name:"梁之凡",cls:"音三莊"},
  {id:"M3-13",name:"蔡宗佑",cls:"音三莊"},{id:"M3-14",name:"黃穩達",cls:"音三莊"},
  {id:"M3-15",name:"馮康維",cls:"音三莊"},{id:"M3-16",name:"倪秉澤",cls:"音三莊"},
  {id:"M3-17",name:"廖敏君",cls:"音三莊"},{id:"M3-18",name:"劉慶霈",cls:"音三莊"},
  {id:"M3-19",name:"蔡慧琳",cls:"音三莊"},{id:"M3-20",name:"鄭淳融",cls:"音三莊"},
  {id:"M3-21",name:"魏宜宸",cls:"音三莊"},{id:"M3-22",name:"徐婉瑜",cls:"音三莊"},
  {id:"M3-23",name:"安兪臻",cls:"音三莊"},{id:"M3-24",name:"江岑君",cls:"音三莊"},
  {id:"M3-25",name:"池宛昕",cls:"音三莊"},{id:"M3-26",name:"李曉萍",cls:"音三莊"},
  {id:"M3-27",name:"周玄禮",cls:"音三莊"},{id:"M3-28",name:"王以昕",cls:"音三莊"},
  {id:"M3-29",name:"林祐立",cls:"音三莊"},{id:"M3-30",name:"邱詩涵",cls:"音三莊"},
  {id:"M3-31",name:"胡云珊",cls:"音三莊"},{id:"M3-32",name:"蔡逸宣",cls:"音三莊"},
  {id:"M3-33",name:"高慧君",cls:"音三莊"},{id:"M3-34",name:"張路淇",cls:"音三莊"},
  {id:"M3-35",name:"陳芃瑾",cls:"音三莊"},{id:"M3-36",name:"陳雨彤",cls:"音三莊"},
  {id:"M3-37",name:"陳宥安",cls:"音三莊"},{id:"M3-38",name:"陳圓卿",cls:"音三莊"},
  {id:"M3-39",name:"傅克諳",cls:"音三莊"},{id:"M3-40",name:"曾妘湘",cls:"音三莊"},
  {id:"P3-02",name:"王玟茜",cls:"演三莊"},{id:"P3-03",name:"王語舒",cls:"演三莊"},
  {id:"P3-04",name:"姚宥湘",cls:"演三莊"},{id:"P3-05",name:"陳思妤",cls:"演三莊"},
  {id:"P3-06",name:"楊鎔慈",cls:"演三莊"},{id:"P3-09",name:"王偉家",cls:"演三莊"},
  {id:"P3-10",name:"何建伸",cls:"演三莊"},{id:"P3-12",name:"姜榮紳",cls:"演三莊"},
  {id:"P3-13",name:"郭庭傑",cls:"演三莊"},{id:"P3-14",name:"陳泊源",cls:"演三莊"},
  {id:"P3-15",name:"陳軍任",cls:"演三莊"},{id:"P3-16",name:"黃治容",cls:"演三莊"},
  {id:"P3-17",name:"盧宥辰",cls:"演三莊"},{id:"P3-18",name:"謝行知",cls:"演三莊"},
  {id:"M2-01",name:"程冠中",cls:"音二莊"},{id:"M2-02",name:"李安恬",cls:"音二莊"},
  {id:"M2-03",name:"吳芊逸",cls:"音二莊"},{id:"M2-04",name:"林辰欣",cls:"音二莊"},
  {id:"M2-05",name:"林孟蓁",cls:"音二莊"},{id:"M2-06",name:"林采妮",cls:"音二莊"},
  {id:"M2-07",name:"林恩熙",cls:"音二莊"},{id:"M2-08",name:"翁閩彗",cls:"音二莊"},
  {id:"M2-09",name:"陳維妮",cls:"音二莊"},{id:"M2-10",name:"連妤婷",cls:"音二莊"},
  {id:"M2-11",name:"莊珈維",cls:"音二莊"},{id:"M2-12",name:"黎育彤",cls:"音二莊"},
  {id:"M2-13",name:"樊千菲",cls:"音二莊"},{id:"M2-14",name:"蔡佳穎",cls:"音二莊"},
  {id:"M2-15",name:"謝季秉",cls:"音二莊"},{id:"M2-16",name:"陳妍欣",cls:"音二莊"},
  {id:"M2-17",name:"羅筱涵",cls:"音二莊"},{id:"M2-18",name:"蘇奕婷",cls:"音二莊"},
  {id:"M2-19",name:"王璿凱",cls:"音二莊"},{id:"M2-20",name:"吳承昊",cls:"音二莊"},
  {id:"M2-21",name:"張治齊",cls:"音二莊"},{id:"M2-22",name:"李秉軒",cls:"音二莊"},
  {id:"M2-23",name:"林笠",cls:"音二莊"},{id:"M2-24",name:"林允鋐",cls:"音二莊"},
  {id:"M2-25",name:"徐國洲",cls:"音二莊"},{id:"M2-26",name:"張定濂",cls:"音二莊"},
  {id:"M2-27",name:"陳柏睿",cls:"音二莊"},{id:"M2-28",name:"陳翌鈞",cls:"音二莊"},
  {id:"M2-29",name:"黃偉宸",cls:"音二莊"},{id:"M2-30",name:"黃宸約",cls:"音二莊"},
  {id:"M2-31",name:"傅振瑜",cls:"音二莊"},{id:"M2-32",name:"葉恒辰",cls:"音二莊"},
  {id:"M2-33",name:"楊仁杉",cls:"音二莊"},{id:"M2-34",name:"鄭元滿",cls:"音二莊"},
  {id:"M2-35",name:"羅楷勳",cls:"音二莊"},{id:"M2-36",name:"吳昕達",cls:"音二莊"},
  {id:"M2-37",name:"沈榆恩",cls:"音二莊"},{id:"M2-38",name:"紀柔帆",cls:"音二莊"},
  {id:"M2-39",name:"盧宇杰",cls:"音二莊"},{id:"M2-40",name:"江德凱",cls:"音二莊"},
  {id:"M2-41",name:"李奕德",cls:"音二莊"},{id:"M2-42",name:"林品傑",cls:"音二莊"},
  {id:"M2-43",name:"陳元熙",cls:"音二莊"},{id:"M2-44",name:"丁婷婷",cls:"音二莊"},
  {id:"P2-02",name:"簡佳嫻",cls:"演二樸"},{id:"P2-03",name:"黃品妤",cls:"演二樸"},
  {id:"M1-01",name:"任恩予",cls:"音一莊"},{id:"M1-02",name:"李孟臻",cls:"音一莊"},
  {id:"M1-03",name:"潘縈汐",cls:"音一莊"},{id:"M1-04",name:"謝幸芙",cls:"音一莊"},
  {id:"M1-05",name:"李昕柔",cls:"音一莊"},{id:"M1-06",name:"盧丞菲",cls:"音一莊"},
  {id:"M1-07",name:"林欣霈",cls:"音一莊"},{id:"M1-08",name:"林耘瑄",cls:"音一莊"},
  {id:"M1-09",name:"林詩翡",cls:"音一莊"},{id:"M1-10",name:"姜妤捷",cls:"音一莊"},
  {id:"M1-11",name:"張筑琹",cls:"音一莊"},{id:"M1-12",name:"廖聿淓",cls:"音一莊"},
  {id:"M1-13",name:"曾彥瑄",cls:"音一莊"},{id:"M1-14",name:"盧瑗",cls:"音一莊"},
  {id:"M1-15",name:"鍾欣庭",cls:"音一莊"},{id:"M1-16",name:"黃郁晴",cls:"音一莊"},
  {id:"M1-17",name:"詹中愷",cls:"音一莊"},{id:"M1-18",name:"鄭誌浩",cls:"音一莊"},
  {id:"M1-19",name:"謝松煇",cls:"音一莊"},{id:"M1-20",name:"羅子超",cls:"音一莊"},
  {id:"M1-21",name:"羅笠準",cls:"音一莊"},{id:"M1-22",name:"蘇冠綸",cls:"音一莊"},
  {id:"M1-23",name:"蘇祺翔",cls:"音一莊"},{id:"M1-24",name:"劉軒豪",cls:"音一莊"},
  {id:"M1-25",name:"吳泓毅",cls:"音一莊"},{id:"M1-26",name:"李維璟",cls:"音一莊"},
  {id:"M1-27",name:"林孝廷",cls:"音一莊"},{id:"M1-28",name:"林紹謙",cls:"音一莊"},
  {id:"M1-29",name:"胡宇哲",cls:"音一莊"},{id:"M1-30",name:"楊順發",cls:"音一莊"},
  {id:"M1-31",name:"張又禾",cls:"音一莊"},{id:"M1-32",name:"張允磊",cls:"音一莊"},
  {id:"M1-33",name:"黃靖勛",cls:"音一莊"}
];
const MASTER = {name:"蕭旭成", pass:"0902"};
const STATUS = ['未','出','遲','缺','假'];

let me = null;
let curCls = null;
let curStu = null;
let pendAtt = {};
let batchMode = false;
let batchSel = new Set();
let stuBannerOpen = false;

const now = () => new Date().toLocaleString('zh-TW',{hour12:false});
const WEEKDAYS = ['日','一','二','三','四','五','六'];

function getBoltDisplay(bolts) {
  const cur = (bolts||0) % 3;
  const total = bolts||0;
  if (total === 0) return '';
  let s = '';
  for (let i=0;i<3;i++) s += `<span style="font-size:13px;opacity:${i<cur?1:.2}">⚡</span>`;
  if (total >= 3) s += `<span style="font-size:10px;color:var(--red);margin-left:2px">x${Math.floor(total/3)}</span>`;
  return s;
}
const nowWithDay = () => {
  const d = new Date();
  return d.toLocaleString('zh-TW',{hour12:false}) + '（' + WEEKDAYS[d.getDay()] + '）';
};
const dateWithDay = (dateStr) => {
  try {
    const d = dateStr ? new Date(dateStr.replace(/\//g,'-')) : new Date();
    const wd = WEEKDAYS[d.getDay()];
    return isNaN(d)?dateStr+'（？）':dateStr+'（'+wd+'）';
  } catch(e) { return dateStr; }
};
const today = () => new Date().toLocaleDateString('zh-TW');
const byName = n => STUDENTS.find(s=>s.name===n);
const byId = id => STUDENTS.find(s=>s.id===id);
const byCls = c => STUDENTS.filter(s=>s.cls===c);

function toast(msg, type='') {
  const t = document.getElementById('toast');
  t.textContent = msg; t.className = 'on' + (type?' '+type:'');
  clearTimeout(t._t); t._t = setTimeout(()=>t.className='', 3000);
}

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.style.display = 'none');
  const el = document.getElementById(id);
  if (id === 'loginScreen') {
    el.style.display = 'flex';
    el.style.alignItems = 'center';
    el.style.justifyContent = 'center';
  } else {
    el.style.display = 'flex';
    el.style.flexDirection = 'column';
  }
  window.scrollTo(0,0);
}

function switchLTab(t) {
  document.querySelectorAll('.ltab').forEach((b,i)=>b.classList.toggle('on',(t==='teacher'&&i===0)||(t==='student'&&i===1)));
  document.getElementById('teacherForm').style.display = t==='teacher'?'':'none';
  document.getElementById('studentForm').style.display = t==='student'?'':'none';
}

async function doLogin() {
  const name = document.getElementById('lName').value.trim();
  const pass = document.getElementById('lPass').value.trim();
  if (!name||!pass) { toast('請填寫帳號和密碼','err'); return; }
  if (name===MASTER.name && pass===MASTER.pass) {
    me = {name, role:'master', classes:CLASSES};
    saveAuthSession(me);
    enterApp(); return;
  }
  toast('驗證中…');
  try {
    const teachers = await Promise.race([
      dbGet('teachers'),
      new Promise((_,r)=>setTimeout(()=>r(new Error('timeout')),8000))
    ]);
    if (teachers) {
      for (const k of Object.keys(teachers)) {
        const t = teachers[k];
        if (t.name===name && t.pass===pass) {
          me = {name, role:'teacher', classes:t.classes||[]};
          saveAuthSession(me);
          enterApp(); return;
        }
      }
    }
    toast('帳號或密碼錯誤','err');
  } catch(e) {
    toast(e.message==='timeout'?'連線逾時，請確認Firebase規則':'連線失敗：'+e.message,'err');
  }
}

async function doStudentLogin() {
  const name = document.getElementById('sName').value.trim();
  const pass = document.getElementById('sPass').value.trim();
  if (!name||!pass) { toast('請填寫姓名和密碼','err'); return; }
  toast('驗證中…');
  try {
    // 先同步自訂學生資料，確保自訂新增的學生也能登入
    await loadDynamicData();
    const stu = byName(name);
    if (!stu) { toast('查無此學生','err'); return; }
    const data = await dbGet(`students/${stu.id}`);
    const stored = data?.password || '0000';
    if (pass !== stored) { toast('密碼錯誤','err'); return; }
    me = {name, role:'student', stuId:stu.id};
    saveAuthSession(me);
    if (!data?.password || data.password==='0000') {
      openDlg('⚠️ 首次登入，請修改密碼',
        `<div class="dlg-label">新密碼</div><input class="dlg-input" type="password" id="np1" placeholder="新密碼">
         <div class="dlg-label">確認密碼</div><input class="dlg-input" type="password" id="np2" placeholder="再次輸入">`,
        [{label:'確認修改',cls:'ok',fn:async()=>{
          const p1=document.getElementById('np1').value;
          const p2=document.getElementById('np2').value;
          if(!p1){toast('密碼不能為空','err');return false}
          if(p1!==p2){toast('兩次不一致','err');return false}
          await dbUpd(`students/${stu.id}`,{password:p1});
          toast('密碼已更新','ok');
          enterStudentView(stu); return true;
        }}]);
    } else { enterStudentView(stu); }
  } catch(e) { toast('連線失敗','err'); }
}

function teacherChangePw() {
  if (!me) return;
  if (me.role === 'master') {
    toast('最高權限密碼請直接修改程式碼中的 MASTER.pass','err'); return;
  }
  openDlg('🔑 修改教師密碼',
    `<div class="dlg-label">目前密碼</div><input class="dlg-input" type="password" id="tpOld" placeholder="目前密碼">
     <div class="dlg-label">新密碼</div><input class="dlg-input" type="password" id="tpNew1" placeholder="新密碼">
     <div class="dlg-label">確認新密碼</div><input class="dlg-input" type="password" id="tpNew2" placeholder="再次輸入">`,
    [{label:'確認修改',cls:'ok',fn:async()=>{
      const old = document.getElementById('tpOld').value;
      const n1 = document.getElementById('tpNew1').value;
      const n2 = document.getElementById('tpNew2').value;
      if(!n1){toast('新密碼不能為空','err');return false}
      if(n1!==n2){toast('兩次密碼不一致','err');return false}
      const teachers = await dbGet('teachers')||{};
      const entry = Object.entries(teachers).find(([,t])=>t.name===me.name);
      if (!entry){toast('找不到帳號資料','err');return false}
      if (entry[1].pass !== old){toast('目前密碼錯誤','err');return false}
      await db.ref(`${ROOT}/teachers/${entry[0]}/pass`).set(n1);
      toast('密碼已更新','ok'); return true;
    }},{label:'取消',fn:()=>true}]);
}

function saveAuthSession(userData) {
  try { localStorage.setItem('jjvs_session', JSON.stringify(userData)); } catch(e){}
}

async function checkAuthSession() {
  const loader = document.getElementById('globalLoader');
  try {
    const saved = localStorage.getItem('jjvs_session');
    if (!saved) {
      showScreen('loginScreen');
      if (loader) loader.style.display = 'none';
      return;
    }
    const data = JSON.parse(saved);
    me = data;

    await new Promise(resolve => {
      const timeout = setTimeout(resolve, 6000);
      db.ref('.info/connected').once('value', snap => {
        clearTimeout(timeout);
        resolve();
      });
    });

    if (me.role === 'student') {
      // 先同步自訂學生，避免自訂新增的學生 session 恢復失敗
      await loadDynamicData();
      const stu = STUDENTS.find(s => s.id === me.stuId);
      if (stu) {
        _currentStuId = stu.id;
        enterStudentView(stu);
      } else {
        localStorage.removeItem('jjvs_session');
        showScreen('loginScreen');
      }
    } else {
      enterApp();
    }
  } catch(e) {
    console.error('Session restore error:', e);
    localStorage.removeItem('jjvs_session');
    showScreen('loginScreen');
  }
  if (loader) loader.style.display = 'none';
}

async function refreshStuView(stuId) {
  const id = stuId || _currentStuId;
  if (!id) return;
  const stu = byId(id);
  if (!stu) return;
  try {
    const d = (await dbGet(`students/${id}`))||{};
    _renderStuView(stu, d);
    await renderStudentCardExtras(stu, d);
    await _renderStuMsgs(id);
    toast('已重新整理','ok');
  } catch(e) {
    toast('重新整理失敗，請重試','err');
  }
}
function toggleResetZone() {
  const zone = document.getElementById('resetZone');
  const arrow = document.getElementById('resetZoneArrow');
  if (!zone) return;
  const open = zone.style.display === 'none' || zone.style.display === '';
  zone.style.display = open ? 'block' : 'none';
  if (arrow) arrow.textContent = open ? '▼ 點擊收起' : '▶ 點擊展開';
}

function doLogout() {
  if (me?.role !== 'student' && Object.keys(pendAtt).length > 0) {
    if (!confirm('尚有未儲存的點名變更，確定要登出嗎？')) return;
  }
  try { localStorage.removeItem('jjvs_session'); } catch(e){}
  location.reload();
}

function canAccessCardRewardMgmt() {
  return !!me && me.role !== 'student';
}

function enterApp() {
  document.getElementById('curUser').textContent = me.name;
  document.getElementById('tab-teachers').style.display = me.role!=='student'?'':'none';
  const isMaster = me.role === 'master';
  const mgmtTeacherBtn = document.getElementById('mgmtTeacherBtn');
  const mgmtClassBtn = document.getElementById('mgmtClassBtn');
  const mgmtStudentBtn = document.getElementById('mgmtStudentBtn');
  const cardTabBtn = document.getElementById('mgmtCardBtn');
  const rewardTabBtn = document.getElementById('mgmtRewardBtn');
  if (mgmtTeacherBtn) mgmtTeacherBtn.style.display = isMaster ? '' : 'none';
  if (mgmtClassBtn) mgmtClassBtn.style.display = isMaster ? '' : 'none';
  if (mgmtStudentBtn) mgmtStudentBtn.style.display = isMaster ? '' : 'none';
  if (cardTabBtn) cardTabBtn.style.display = canAccessCardRewardMgmt() ? '' : 'none';
  if (rewardTabBtn) rewardTabBtn.style.display = canAccessCardRewardMgmt() ? '' : 'none';
  showScreen('appScreen');
  pendAtt = {};

  // 先立刻建立班級按鈕和點名頁，不等卡片資料
  loadDynamicData().then(() => {
    buildClsBtns('clsBtns', switchCls);
    switchCls(me.classes[0]);
    // 卡片資料在背景載入，失敗不影響主功能
    applyCardTitleOverrides().catch(e=>console.warn('applyCardTitleOverrides:', e));
    loadCustomCardData().catch(e=>console.warn('loadCustomCardData:', e));
  }).catch(e => {
    console.warn('loadDynamicData error:', e);
    // 即使 loadDynamicData 失敗，也要讓點名正常運作
    buildClsBtns('clsBtns', switchCls);
    switchCls(me.classes[0]);
  });
loadAllClassRewards().catch(e => console.warn('loadAllClassRewards:', e));
  startApplyListener();
  startMsgListener();
}

function enterStudentView(stu) {
  document.getElementById('stuUserName').textContent = stu.name;
  _currentStuId = stu.id;
  showScreen('studentScreen');
  loadStuView(stu);
  loadStuMsgs(stu.id);
}

function switchTab(t) {
  document.querySelectorAll('.navtab').forEach(b=>b.classList.remove('on'));
  ['att','apply','exitlog','inbox','report','teachers','piano','cal'].forEach(id=>{
    const key = 'tab'+id.charAt(0).toUpperCase()+id.slice(1);
    const el = document.getElementById(key);
    if (el) el.style.display = 'none';
  });
  const btn = document.getElementById('tab-'+t);
  if (btn) btn.classList.add('on');
  const map = {att:'tabAtt',apply:'tabApply',exitlog:'tabExitLog',inbox:'tabInbox',report:'tabReport',teachers:'tabTeachers',piano:'tabPiano',cal:'tabCal'};
  const content = document.getElementById(map[t]);
  if (content) content.style.display = '';

  if (t==='att') { if (!curCls && me?.classes?.[0]) { buildClsBtns('clsBtns', switchCls); switchCls(me.classes[0]); } else { renderGrid(); } }
  if (t==='report') { buildClsBtns('clsBtnsR', switchClsR); renderRpt(); renderStats(); loadDeductLog(); }
  if (t==='teachers') {
    loadDynamicData().then(()=>{
      if (me?.role === 'master') {
        renderTeachers();
        renderClassMgmt();
        renderStudentMgmt();
      }
      if (canAccessCardRewardMgmt()) {
        renderCardMgmt();
      }
      switchMgmt(me?.role === 'master' ? 'teacher' : 'card');
    });
  }
  if (t==='inbox') renderInbox();
  if (t==='exitlog') loadExitLog();
  if (t==='cal') loadCalendar();
  if (t==='piano') {
    const frame = document.getElementById('pianoFrame');
    if (!frame.src || frame.src === window.location.href) {
      const authData = btoa(encodeURIComponent(JSON.stringify(me)));
      frame.src = `https://jjvsmusic.github.io/musicbooking/?sso=${authData}`;
    }
  }
}

function buildClsBtns(containerId, clickFn) {
  const c = document.getElementById(containerId);
  if (!c) return;
  c.innerHTML = '';
  me.classes.forEach((cls,i) => {
    const b = document.createElement('button');
    b.className = 'clsbtn'+(i===0?' on':'');
    b.textContent = cls;
    b.onclick = () => {
      c.querySelectorAll('.clsbtn').forEach(x=>x.classList.remove('on'));
      b.classList.add('on');
      clickFn(cls);
    };
    c.appendChild(b);
  });
}

function switchCls(cls) { curCls = cls; renderGrid(); }
function switchClsR(cls) { curCls = cls; renderRpt(); }

async function renderGrid() {
  if (!curCls) return;
  const grid = document.getElementById('stuGrid');
  grid.innerHTML = '<div style="padding:20px"><div class="spin"></div></div>';
  const stus = byCls(curCls);
  const td = today();
  const res = await Promise.all(stus.map(s=>dbGet(`students/${s.id}`)));
  const dm = {}; stus.forEach((s,i)=>dm[s.id]=res[i]||{});
  grid.innerHTML = '';
  stus.forEach(s => {
    const d = dm[s.id];
    const att = pendAtt[s.id] || d.attendance?.[td] || '未';
    const pts = d.points||0;
    const medals = d.medals||0;
    const bolts = d.bolts||0;
    const stars = Math.min(pts,10);
    const sel = batchSel.has(s.id);
    const card = document.createElement('div');
    card.className = `scard s${att}${sel?' sel':''}`;
    card.id = `sc-${s.id}`;
    card.innerHTML = `
      <div class="sc-top">
        <div class="sc-num">${s.id}</div>
        <div class="sbadge ${att}" onclick="cycleAtt(event,'${s.id}')">${att}</div>
      </div>
      <div class="sc-name" onclick="handleCardClick(event,'${s.id}')"><span style='font-size:11px;color:var(--tx3);margin-right:3px'>${s.id.split('-')[1]||''}</span>${s.name}</div>
      <div class="sc-pts">
        <div class="sc-stars">${'★'.repeat(stars)}${'☆'.repeat(10-stars)}</div>
        <div class="sc-medals">${medals>0?'🎖️x'+medals:''}</div>
      </div>
      ${bolts>0?`<div class="sc-bolts">${getBoltDisplay(bolts)}</div>`:''}
      <div class="sc-hint">${batchMode?'👆點擊勾選':'名字查詳情 · 狀態點選'}</div>`;
    if (sel) card.classList.add('sel');
    grid.appendChild(card);
  });
}

function handleCardClick(e, id) {
  e.stopPropagation();
  if (batchMode) { toggleSel(id); return; }
  const stu = byId(id);
  if (stu) openDetail(stu);
}

function cycleAtt(e, id) {
  e.stopPropagation();
  showAttMenu(e, id);
}

function showAttMenu(e, id) {
  const old = document.getElementById('attMenu');
  if (old) old.remove();

  const cur = pendAtt[id] || '未';
  const options = [
    {v:'出', label:'✅ 出席', color:'var(--green)'},
    {v:'遲', label:'⏱ 遲到', color:'var(--yellow)'},
    {v:'缺', label:'✗ 缺席', color:'var(--red)'},
    {v:'假', label:'📋 請假', color:'var(--blue)'},
  ];

  const menu = document.createElement('div');
  menu.id = 'attMenu';
  menu.style.cssText = `position:fixed;z-index:999;background:var(--bg2);border:1px solid var(--bdr);border-radius:10px;box-shadow:0 8px 24px rgba(0,0,0,.6);overflow:hidden;min-width:120px`;

  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.style.cssText = `display:block;width:100%;padding:10px 16px;background:${cur===opt.v?'rgba(212,175,55,.15)':'transparent'};border:none;border-bottom:1px solid var(--bdr);color:${opt.color};cursor:pointer;font-size:14px;font-family:inherit;text-align:left;transition:.15s`;
    btn.innerHTML = `${opt.label}${cur===opt.v?' <span style="color:var(--gold)">◀ 目前</span>':''}`;
    btn.onmouseenter = () => btn.style.background = 'rgba(212,175,55,.08)';
    btn.onmouseleave = () => btn.style.background = cur===opt.v?'rgba(212,175,55,.15)':'transparent';
    btn.onclick = (ev) => {
      ev.stopPropagation();
      setAtt(id, opt.v);
      menu.remove();
    };
    menu.appendChild(btn);
  });

  const rect = e.target.getBoundingClientRect();
  const menuW = 140, menuH = 180;
  let top = rect.bottom + 4;
  let left = rect.left;
  if (left + menuW > window.innerWidth) left = window.innerWidth - menuW - 8;
  if (top + menuH > window.innerHeight) top = rect.top - menuH - 4;
  menu.style.top = top + 'px';
  menu.style.left = left + 'px';

  document.body.appendChild(menu);

  setTimeout(() => {
    document.addEventListener('click', function closer() {
      menu.remove();
      document.removeEventListener('click', closer);
    }, {once:true});
  }, 50);
}

function setAtt(id, att) {
  pendAtt[id] = att;
  const card = document.getElementById(`sc-${id}`);
  if (card) {
    card.className = `scard s${att}${batchSel.has(id)?' sel':''}`;
    const badge = card.querySelector('.sbadge');
    if (badge) { badge.className=`sbadge ${att}`; badge.textContent=att; }
  }
  if (att==='遲') {
    const stu = byId(id);
    const stuName = stu?.name || id;
    openDlg(`⏱ ${stuName} 遲到`,
      `<div class="dlg-msg">是否同時扣除 1 點？</div>`,
      [{label:'是，扣1點',cls:'ok',fn:async()=>{ await autoDeductLate(id); return true; }},
       {label:'否，只記遲到',fn:()=>true}]
    );
  }
}

async function autoDeductLate(id) {
  const d = await dbGet(`students/${id}`);
  const pts = Math.max(0,(d?.points||0)-1);
  const lk = Date.now()+'';
  const stu = byId(id);
  await dbUpd(`students/${id}`,{
    points:pts,
    [`log/${lk}`]:{time:now(),action:'遲到自動扣點',reason:'遲到扣1點',teacher:me.name,delta:-1}
  });
  await sendNotifToStudent(id, stu?.name||id, '遲到自動扣1點', 'notice');
  toast(`${byId(id)?.name} 遲到，自動扣1點`);
}

async function saveAtt() {
  if (!curCls) { toast('請先選班級','err'); return; }
  const td = today();
  const upd = {};
  let count = 0;
  for (const [id,att] of Object.entries(pendAtt)) {
    if (byId(id)?.cls!==curCls) continue;
    upd[`${ROOT}/students/${id}/attendance/${td}`] = att;
    count++;
  }
  if (!count) { toast('無變更需儲存'); return; }
  await db.ref('/').update(upd);
  byCls(curCls).forEach(s=>{ delete pendAtt[s.id]; });
  toast(`已儲存 ${count} 筆點名記錄`,'ok');
  renderGrid();
}

function setAllAtt(att) {
  byCls(curCls).forEach(s=>{ pendAtt[s.id]=att; });
  renderGrid();
}

function toggleBatch() {
  batchMode = !batchMode;
  batchSel.clear();
  const btn = document.getElementById('batchBtn');
  const bar = document.getElementById('batchBar');
  btn.textContent = batchMode?'✕ 退出批次':'☑️ 批次加點';
  btn.className = batchMode?'btn g':'btn';
  bar.classList.toggle('on', batchMode);
  if (batchMode) toast('批次模式：點名字勾選學生');
  updBatchCnt();
  renderGrid();
}

function toggleSel(id) {
  if (batchSel.has(id)) batchSel.delete(id); else batchSel.add(id);
  updBatchCnt();
  const card = document.getElementById(`sc-${id}`);
  if (card) card.classList.toggle('sel', batchSel.has(id));
}

function updBatchCnt() { document.getElementById('batchCnt').textContent = batchSel.size; }
function selectAll() { byCls(curCls).forEach(s=>batchSel.add(s.id)); updBatchCnt(); renderGrid(); }
function clearSel() { batchSel.clear(); updBatchCnt(); renderGrid(); }

function batchSetAtt(att) {
  if (!batchSel.size) { toast('請先勾選學生','err'); return; }
  batchSel.forEach(id => {
    pendAtt[id] = att;
    const card = document.getElementById(`sc-${id}`);
    if (card) {
      card.className = `scard s${att} sel`;
      const badge = card.querySelector('.sbadge');
      if (badge) { badge.className=`sbadge ${att}`; badge.textContent=att; }
    }
  });
  toast(`已批次設定 ${batchSel.size} 人為「${att}」`);
  if (att==='遲') {
    openDlg('⏱ 批次遲到確認',`<div class="dlg-msg">已標記 ${batchSel.size} 人遲到。<br>是否同時自動扣1點？</div>`,
      [{label:'是，自動扣點',cls:'ok',fn:async()=>{
        for(const id of batchSel){ await autoDeductLate(id); }
        toast('批次遲到扣點完成','ok'); return true;
      }},{label:'否，只改狀態',fn:()=>true}]);
  }
}
async function batchPts(delta) {
  if (!batchSel.size) { toast('請先勾選學生','err'); return; }
  openDlg(delta>0?`⭐ 批次+1點（${batchSel.size}人）`:`－ 批次扣1點（${batchSel.size}人）`,
    `<div class="dlg-label">原因</div><input class="dlg-input" type="text" id="bReason" placeholder="請輸入原因">`,
    [{label:'確認',cls:'ok',fn:async()=>{
      const reason = document.getElementById('bReason').value.trim();
      if (!reason){toast('請填寫原因','err');return false}
      const upd = {};
      for (const id of batchSel) {
        const d = await dbGet(`students/${id}`);
        const pts = Math.max(0,(d?.points||0)+delta);
        const lk = Date.now()+'_'+id;
        upd[`${ROOT}/students/${id}/points`] = pts;
        upd[`${ROOT}/students/${id}/log/${lk}`] = {time:now(),action:delta>0?'批次加點':'批次扣點',reason,teacher:me.name,delta};
        const stu = byId(id);
        if (stu) upd[`${ROOT}/stuMsgs/${id}/${lk}`] = {from:me.name,content:`${delta>0?'獲得':'扣除'}1點 — ${reason}`,type:'notice',time:now(),read:false};
      }
      await db.ref('/').update(upd);
      toast(`${batchSel.size}人${delta>0?'加':'扣'}點完成`,'ok');
      renderGrid(); return true;
    }},{label:'取消',fn:()=>true}]);
}

async function batchMedal() {
  if (!batchSel.size) { toast('請先勾選學生','err'); return; }
  openDlg(`🎖️ 批次發金牌（${batchSel.size}人）`,
    `<div class="dlg-label">原因</div><input class="dlg-input" type="text" id="bmR" placeholder="請輸入原因">`,
    [{label:'確認',cls:'ok',fn:async()=>{
      const reason = document.getElementById('bmR').value.trim();
      if (!reason){toast('請填寫原因','err');return false}
      const upd = {};
      for (const id of batchSel) {
        const d = await dbGet(`students/${id}`);
        const medals = (d?.medals||0)+1;
        const lk = Date.now()+'_'+id;
        upd[`${ROOT}/students/${id}/medals`] = medals;
        upd[`${ROOT}/students/${id}/log/${lk}`] = {time:now(),action:'批次加金牌',reason,teacher:me.name,delta:0};
        upd[`${ROOT}/stuMsgs/${id}/${lk}`] = {from:me.name,content:`獲得金牌🎖️ — ${reason}`,type:'notice',time:now(),read:false};
      }
      await db.ref('/').update(upd);
      toast(`已發${batchSel.size}枚金牌`,'ok'); renderGrid(); return true;
    }},{label:'取消',fn:()=>true}]);
}

async function batchAddTask() {
  if (!batchSel.size) { toast('請先勾選學生','err'); return; }
  openDlg(`📝 批次新增任務（${batchSel.size}人）`,
    `<div class="dlg-label">任務名稱</div><input class="dlg-input" type="text" id="btName" placeholder="例：抄寫樂理第三章">
     <div class="dlg-label">總次數 / 行數</div><input class="dlg-input" type="number" id="btTotal" placeholder="例：50" min="1">
     <div class="dlg-label">類型</div>
     <select class="dlg-input" id="btType" style="width:100%;margin-bottom:12px">
       <option value="">一般任務</option>
       <option value="copy">📝 罰抄</option>
     </select>`,
    [{label:'新增',cls:'ok',fn:async()=>{
      const name = document.getElementById('btName').value.trim();
      const total = parseInt(document.getElementById('btTotal').value);
      const type = document.getElementById('btType').value;
      if(!name||!total||total<1){toast('請填寫完整','err');return false}
      const prefix = type==='copy'?'📝罰抄：':'';
      const upd = {};
      for (const id of batchSel) {
        const k = Date.now()+'_'+id;
        upd[`${ROOT}/students/${id}/tasks/${k}`] = {name:prefix+name, total, done:0, type:type||'task'};
        upd[`${ROOT}/stuMsgs/${id}/${k}`] = {from:me.name, content:`新增任務：${prefix+name}（共${total}次）`, type:'punishment', time:now(), read:false};
      }
      await db.ref('/').update(upd);
      toast(`已為 ${batchSel.size} 人新增任務`,'ok');
      return true;
    }},{label:'取消',fn:()=>true}]);
}

async function openDetail(stu) {
  curStu = stu;
  const d = (await dbGet(`students/${stu.id}`))||{};
  const td = today();
  document.getElementById('dpName').textContent = stu.name;
  document.getElementById('dpCls').textContent = stu.cls+' · '+stu.id;
  document.getElementById('dpPw').textContent = d.password||'0000';
  const att = d.attendance?.[td]||'未';
  const attColor = {出:'var(--green)',遲:'var(--yellow)',缺:'var(--red)',假:'var(--blue)'}[att]||'var(--tx2)';
  document.getElementById('dpStatus').innerHTML = `<span style="color:${attColor}">${att}</span>`;
  const attH = d.attendance||{};
  const days = Object.keys(attH).sort().slice(-21);
  const sum = {出:0,遲:0,缺:0,假:0};
  days.forEach(day=>{ if(sum[attH[day]]!==undefined) sum[attH[day]]++; });
  document.getElementById('dpAttHist').innerHTML = `
    <div class="att-sum">
      <div class="att-si" style="color:var(--green)">出席 ${sum['出']}</div>
      <div class="att-si" style="color:var(--yellow)">遲到 ${sum['遲']}</div>
      <div class="att-si" style="color:var(--red)">缺席 ${sum['缺']}</div>
      <div class="att-si" style="color:var(--blue)">請假 ${sum['假']}</div>
    </div>
    <div class="att-hgrid">${days.map(day=>{
      const v=attH[day]||'未';
      const sd=day.replace(/^\d+\//,'').replace('/','/');
      return `<div class="att-day s${v}"><div class="dl">${sd}</div><div class="dv">${v}</div></div>`;
    }).join('')}</div>`;
  const pts = d.points||0;
  document.getElementById('dpPtsNum').textContent = pts;
  document.getElementById('redeemBtn').disabled = pts<5;
  const pg = document.getElementById('dpPtsGrid');
  pg.innerHTML = '';
  for(let i=0;i<10;i++){
    const c=document.createElement('div');
    c.className='pc '+(i<pts?'on':'off');
    c.textContent=i<pts?'⭐':'';
    pg.appendChild(c);
  }
  const medals = d.medals||0;
  document.getElementById('dpMedalsN').textContent = medals;
  const mr = document.getElementById('dpMedals');
  mr.innerHTML = medals>0
    ? Array(Math.min(medals,12)).fill(0).map(()=>`<div class="mcoin">🏅</div>`).join('')+(medals>12?`<span style="color:var(--gold);font-size:18px;align-self:center">+${medals-12}</span>`:'')
    : '<span style="color:var(--tx3);font-size:13px;font-style:italic">尚無金牌</span>';
  renderBolts(d.bolts||0);
  renderTasks(d.tasks||{});
  renderLog(d.log||{});
  _updateDetailBondMedal(d);
  document.getElementById('detailPanel').classList.add('open');
}

function closeDetail() {
  document.getElementById('detailPanel').classList.remove('open');
  curStu = null;
}

function renderBolts(bolts) {
  const disp = document.getElementById('dpBoltDisplay');
  const pen  = document.getElementById('dpBoltPenalty');
  if (!disp) return;
  const cur = bolts % 3;
  const penalties = Math.floor(bolts / 3);

  let html = '<div style="display:flex;gap:8px;margin-bottom:6px">';
  for (let i=0;i<3;i++) {
    html += `<div style="flex:1;height:36px;border-radius:8px;border:2px solid ${i<cur?'var(--yellow)':'var(--bdr)'};background:${i<cur?'rgba(241,196,15,.2)':'transparent'};display:flex;align-items:center;justify-content:center;font-size:20px;transition:.2s">${i<cur?'⚡':'　'}</div>`;
  }
  html += '</div>';
  html += `<div style="font-size:12px;color:var(--tx2)">累計 <b style="color:var(--yellow)">${bolts}</b> 個閃電 · <b style="color:${penalties>0?'var(--red)':'var(--tx2)'}">${penalties}</b> 次懲罰已觸發</div>`;
  disp.innerHTML = html;

  if (penalties > 0) {
    pen.style.display = 'block';
    pen.innerHTML = `
      <div style="margin-bottom:8px">⚠️ 已累積 <b>${penalties}</b> 次懲罰（每3個閃電觸發一次）</div>
      <button class="btn d" onclick="resetBolts()" style="width:100%;padding:8px;font-size:13px;border-width:2px;font-weight:bold">
        🗑️ 閃電歸零（請先確認已完成處罰）
      </button>`;
  } else {
    pen.style.display = 'none';
  }
}

async function chgBolt(delta) {
  if (!curStu) return;
  if (delta > 0) {
    openDlg('⚡ 新增閃電警告',
      `<div class="dlg-msg" style="color:var(--red);margin-bottom:10px;font-size:13px">注意：若該生有點數(⭐)，將自動先扣除 1 點。</div>
       <div class="dlg-label">原因</div><input class="dlg-input" type="text" id="boltReason" placeholder="請輸入原因">`,
      [{label:'確認新增',cls:'ok',fn:async()=>{
        const reason = document.getElementById('boltReason').value.trim();
        if(!reason){toast('請填寫原因','err');return false;}

        const d = await dbGet(`students/${curStu.id}`);
        const curBolts = (d?.bolts||0) + 1;
        const curPts = typeof d?.points === 'number' ? d.points : parseInt(d?.points)||0;
        let deductMsg = '';
        const lk = Date.now()+'';

        // 先單獨寫 bolts
        await dbUpd(`students/${curStu.id}`, {
          bolts: curBolts,
          [`log/${lk}_bolt`]: {time:now(), action:'⚡ 新增閃電警告', reason, teacher:me.name, delta:0}
        });

        // 若有星星，再單獨扣點
        if (curPts > 0) {
          const newPts = curPts - 1;
          await dbUpd(`students/${curStu.id}`, {
            points: newPts,
            [`log/${lk}_pt`]: {time:now(), action:'⚡ 閃電自動扣點', reason:'新增閃電，自動扣除1顆星星', teacher:me.name, delta:-1}
          });
          deductMsg = `，星星 ${curPts} → ${newPts}`;
        }

        const newPen = Math.floor(curBolts/3);
        const oldPen = Math.floor((curBolts-1)/3);

        if (newPen > oldPen) {
          await sendNotifToStudent(curStu.id, curStu.name, `⚡ 閃電達 ${curBolts} 個，觸發懲罰！原因：${reason}`, 'punishment');
          toast(`⚠️ 累積 ${newPen} 次懲罰${deductMsg}！`, 'err');
        } else {
          await sendNotifToStudent(curStu.id, curStu.name, `⚡ 新增閃電警告！原因：${reason}`, 'punishment');
          toast(`閃電已新增${deductMsg || '（目前無星星可扣）'}`);
        }
        openDetail(curStu); return true;
      }},{label:'取消',fn:()=>true}]
    );
  } else {
    const d = await dbGet(`students/${curStu.id}`);
    const curBolts = Math.max(0, (d?.bolts||0) - 1);
    await dbUpd(`students/${curStu.id}`, {
      bolts: curBolts,
      [`log/${Date.now()}`]: {time:now(), action:'移除閃電', reason:'老師手動移除', teacher:me.name, delta:0}
    });
    toast('閃電已移除');
    openDetail(curStu);
  }
}

async function resetBolts() {
  if (!curStu) return;
  openDlg('🗑️ 閃電歸零確認',
    `<div class="dlg-msg" style="color:var(--red);margin-bottom:10px">請確認該生已完成處罰再進行歸零。</div>
     <div class="dlg-label">歸零原因（必填）</div>
     <input class="dlg-input" type="text" id="resetBoltReason" placeholder="例：已完成處罰任務、已與家長聯繫...">`,
    [{label:'確認歸零',cls:'del',fn:async()=>{
      const reason = document.getElementById('resetBoltReason').value.trim();
      if(!reason){toast('請填寫歸零原因','err');return false;}
      const lk = Date.now()+'';
      await dbUpd(`students/${curStu.id}`, {
        bolts: 0,
        [`log/${lk}`]: {time:now(), action:'閃電歸零', reason, teacher:me.name, delta:0}
      });
      await sendNotifToStudent(curStu.id, curStu.name, `閃電已歸零 — ${reason}`, 'notice');
      toast('閃電已歸零','ok');
      openDetail(curStu); return true;
    }},{label:'取消',fn:()=>true}]
  );
}

function renderTasks(tasks) {
  const c = document.getElementById('dpTasks');
  const ents = Object.entries(tasks);
  if (!ents.length) { c.innerHTML='<div style="color:var(--tx3);font-size:13px">暫無任務</div>'; return; }
  c.innerHTML = ents.map(([k,t])=>{
    const pct = Math.min(100,Math.round((t.done/t.total)/0.01));
    return `<div class="task-item">
      <div class="task-hd">
        <div style="font-size:14px">${t.name}</div>
        <div class="row"><span style="font-size:12px;color:var(--tx2)">${t.done}/${t.total}</span>
          <button class="btn s" onclick="incrTask('${k}')" style="padding:2px 7px;font-size:11px">+1</button>
          <button class="btn d" onclick="delTask('${k}')" style="padding:2px 7px;font-size:11px">✕</button>
        </div>
      </div>
      <div class="task-bar"><div class="task-fill" style="width:${pct}%"></div></div>
    </div>`;
  }).join('');
}

function renderLog(log) {
  const c = document.getElementById('dpLog');
  // 取 key 前13位數字作為時間戳比較，處理 _pt / _bolt 等後綴
  const ents = Object.entries(log)
    .sort((a, b) => {
      const ta = parseInt(a[0]) || 0;
      const tb = parseInt(b[0]) || 0;
      return tb - ta;
    })
    .slice(0, 60);
  if (!ents.length) { c.innerHTML='<div style="color:var(--tx3);font-size:13px">尚無記錄</div>'; return; }
  c.innerHTML = ents.map(([,e])=>{
    const isExit = e.action?.includes('外出');
    const cls = isExit?'med':e.delta>0?'add':e.delta<0?'sub':e.action?.includes('牌')?'med':'';
    const icon = isExit?'🚪 ':'';
    return `<div class="log-item ${cls}" style="${isExit?'border-left-color:var(--blue)':''}">
      <div class="log-t">${e.time||''} · ${e.teacher||''}</div>
      <div>${icon}${e.action||''}${e.reason?' — '+e.reason:''}</div>
    </div>`;
  }).join('');
}

async function chgPts(delta) {
  if (!curStu) return;
  openDlg(delta>0?'＋ 加點':'－ 扣點',
    `<div class="dlg-label">原因</div><input class="dlg-input" type="text" id="pR" placeholder="原因">
     ${delta<0?'<div style="font-size:12px;color:var(--yellow);padding:6px 8px;background:rgba(241,196,15,.08);border-radius:6px;margin-bottom:10px">⭐ 若有點數，將優先扣除點數（星星）</div>':''}`,
    [{label:'確認',cls:'ok',fn:async()=>{
      const reason=document.getElementById('pR').value.trim();
      if(!reason){toast('請填寫原因','err');return false}
      const d=await dbGet(`students/${curStu.id}`);
      const pts=Math.max(0,(d?.points||0)+delta);
      const lk=Date.now()+'';
      await dbUpd(`students/${curStu.id}`,{points:pts,[`log/${lk}`]:{time:now(),action:delta>0?'加點':'扣點',reason,teacher:me.name,delta}});
      await sendNotifToStudent(curStu.id, curStu.name, `${delta>0?'獲得':'扣除'}1點 — ${reason}`, 'notice');
      toast(`已${delta>0?'加':'扣'}1點`,'ok');
      openDetail(curStu); return true;
    }},{label:'取消',fn:()=>true}]);
}

async function redeemMedal() {
  if (!curStu) return;
  const d=await dbGet(`students/${curStu.id}`);
  if ((d?.points||0)<5){toast('點數不足5點','err');return}
  openDlg('🎖️ 兌換金牌',
    `<div class="dlg-msg">確認扣除5點，兌換1枚金牌？<br>剩餘點數：${(d.points||0)-5}點</div>`,
    [{label:'確認兌換',cls:'ok',fn:async()=>{
      const pts=(d.points||0)-5, medals=(d.medals||0)+1, lk=Date.now()+'';
      await dbUpd(`students/${curStu.id}`,{points:pts,medals,[`log/${lk}`]:{time:now(),action:'兌換金牌',reason:'集滿5點兌換',teacher:me.name,delta:-5}});
      toast('金牌兌換成功🎖️','ok'); openDetail(curStu); return true;
    }},{label:'取消',fn:()=>true}]);
}

async function chgMedal(delta) {
  if (!curStu) return;
  openDlg(delta>0?'＋ 加金牌':'－ 扣金牌',
    `<div class="dlg-label">原因</div><input class="dlg-input" type="text" id="mR" placeholder="原因">`,
    [{label:'確認',cls:'ok',fn:async()=>{
      const reason=document.getElementById('mR').value.trim();
      if(!reason){toast('請填寫原因','err');return false}
      const d=await dbGet(`students/${curStu.id}`);
      const medals=Math.max(0,(d?.medals||0)+delta), lk=Date.now()+'';
      await dbUpd(`students/${curStu.id}`,{medals,[`log/${lk}`]:{time:now(),action:delta>0?'加金牌':'扣金牌',reason,teacher:me.name,delta}});
      toast(`已${delta>0?'新增':'扣除'}金牌`,'ok'); openDetail(curStu); return true;
    }},{label:'取消',fn:()=>true}]);
}

function openAddTask() {
  if (!curStu) return;
  openDlg('📝 新增處罰任務',
    `<div class="dlg-label">任務名稱</div><input class="dlg-input" type="text" id="tName" placeholder="例：抄寫樂理50題">
     <div class="dlg-label">總次數</div><input class="dlg-input" type="number" id="tTotal" placeholder="例：50" min="1">`,
    [{label:'新增',cls:'ok',fn:async()=>{
      const name=document.getElementById('tName').value.trim();
      const total=parseInt(document.getElementById('tTotal').value);
      if(!name||!total||total<1){toast('請填寫完整','err');return false}
      const k=Date.now()+'';
      await dbUpd(`students/${curStu.id}`,{[`tasks/${k}`]:{name,total,done:0}});
      toast('任務已新增'); openDetail(curStu); return true;
    }},{label:'取消',fn:()=>true}]);
}

function openAddCopy() {
  if (!curStu) return;
  openDlg('📝 新增罰抄任務',
    `<div class="dlg-label">罰抄內容</div><input class="dlg-input" type="text" id="cpName" placeholder="例：抄寫第三章樂理">
     <div class="dlg-label">罰抄字數 / 行數</div><input class="dlg-input" type="number" id="cpTotal" placeholder="例：100" min="1">`,
    [{label:'新增罰抄',cls:'ok',fn:async()=>{
      const name=document.getElementById('cpName').value.trim();
      const total=parseInt(document.getElementById('cpTotal').value);
      if(!name||!total||total<1){toast('請填寫完整','err');return false}
      const k=Date.now()+'';
      await dbUpd(`students/${curStu.id}`,{[`tasks/${k}`]:{name:'📝罰抄：'+name,total,done:0,type:'copy'}});
      await sendNotifToStudent(curStu.id,curStu.name,`新增罰抄任務：${name}（共${total}行）`,'punishment');
      toast('罰抄任務已新增'); openDetail(curStu); return true;
    }},{label:'取消',fn:()=>true}]);
}
async function incrTask(k) {
  if (!curStu) return;
  const d=await dbGet(`students/${curStu.id}/tasks/${k}`);
  if(!d) return;
  const done=Math.min(d.total,(d.done||0)+1);
  await dbUpd(`students/${curStu.id}/tasks/${k}`,{done});
  if(done>=d.total) toast('任務完成！🎉','ok');
  openDetail(curStu);
}

async function delTask(k) {
  if (!curStu) return;
  openDlg('⚠️ 確認刪除任務','<div class="dlg-msg">確認要刪除此任務？</div>',
    [{label:'刪除',cls:'del',fn:async()=>{
      await db.ref(`${ROOT}/students/${curStu.id}/tasks/${k}`).remove();
      toast('已刪除'); openDetail(curStu); return true;
    }},{label:'取消',fn:()=>true}]);
}

async function resetPts() {
  if (!curStu) return;
  openDlg('⚠️ 重置點數',`<div class="dlg-msg">確認將「${curStu.name}」點數歸零？</div>`,
    [{label:'確認',cls:'del',fn:async()=>{ await dbUpd(`students/${curStu.id}`,{points:0}); toast('點數已重置'); openDetail(curStu); return true; }},{label:'取消',fn:()=>true}]);
}
async function resetMedals() {
  if (!curStu) return;
  openDlg('⚠️ 重置金牌',`<div class="dlg-msg">確認將「${curStu.name}」金牌歸零？</div>`,
    [{label:'確認',cls:'del',fn:async()=>{ await dbUpd(`students/${curStu.id}`,{medals:0}); toast('金牌已重置'); openDetail(curStu); return true; }},{label:'取消',fn:()=>true}]);
}
async function resetAll() {
  if (!curStu) return;
  openDlg('🗑️ 清除全部資料',`<div class="dlg-msg" style="color:var(--red)">確認清除「${curStu.name}」所有資料？<br><b>此操作不可復原！</b></div>`,
    [{label:'確認清除',cls:'del',fn:async()=>{ await dbSet(`students/${curStu.id}`,{password:(await dbGet(`students/${curStu.id}`))?.password||'0000'}); toast('已清除'); openDetail(curStu); renderGrid(); return true; }},{label:'取消',fn:()=>true}]);
}
async function resetPw() {
  if (!curStu) return;
  openDlg('🔑 重置密碼',`<div class="dlg-msg">確認將「${curStu.name}」密碼重置為 <b>0000</b>？</div>`,
    [{label:'確認重置',cls:'del',fn:async()=>{ await dbUpd(`students/${curStu.id}`,{password:'0000'}); toast('密碼已重置為 0000','ok'); openDetail(curStu); return true; }},{label:'取消',fn:()=>true}]);
}
async function resetClsDlg() {
  if (!curCls) { toast('請先選班級','err'); return; }
  openDlg(`⚠️ 重置 ${curCls}`,
    `<div class="dlg-msg" style="color:var(--red)">確認重置「${curCls}」所有學生的點數、金牌、任務、日誌？<br><b>此操作不可復原！</b></div>
     <div style="margin-top:8px;font-size:13px;color:var(--tx2)">
       <label><input type="checkbox" id="rAtt" style="margin-right:6px">同時清除出勤記錄</label>
     </div>`,
    [{label:'確認重置',cls:'del',fn:async()=>{
      const clearAtt = document.getElementById('rAtt')?.checked;
      const stus = byCls(curCls);
      const upd = {};
      stus.forEach(s=>{
        upd[`${ROOT}/students/${s.id}/points`] = 0;
        upd[`${ROOT}/students/${s.id}/medals`] = 0;
        upd[`${ROOT}/students/${s.id}/tasks`] = null;
        upd[`${ROOT}/students/${s.id}/log`] = null;
        if (clearAtt) upd[`${ROOT}/students/${s.id}/attendance`] = null;
      });
      await db.ref('/').update(upd);
      toast(`${curCls} 已重置`,'ok'); renderGrid(); return true;
    }},{label:'取消',fn:()=>true}]);
}
async function resetAllDlg() {
  openDlg('⚠️ 全校資料重置',
    `<div class="dlg-msg" style="color:var(--red);margin-bottom:12px">確認重置<b>所有學生</b>的資料？<br><b>此操作完全不可復原！</b></div>
     <div style="font-size:13px;color:var(--tx2)">
       <label style="display:block;margin-bottom:6px"><input type="checkbox" id="ra1" checked style="margin-right:6px"> 清除點數與金牌</label>
       <label style="display:block;margin-bottom:6px"><input type="checkbox" id="ra2" checked style="margin-right:6px"> 清除任務與罰抄</label>
       <label style="display:block;margin-bottom:6px"><input type="checkbox" id="ra3" checked style="margin-right:6px"> 清除異動日誌</label>
       <label style="display:block;margin-bottom:6px"><input type="checkbox" id="ra4" style="margin-right:6px"> 清除出勤記錄</label>
       <label style="display:block"><input type="checkbox" id="ra5" style="margin-right:6px"> 清除所有訊息</label>
     </div>`,
    [{label:'確認全部重置',cls:'del',fn:async()=>{
      const p = document.getElementById('ra1')?.checked;
      const t = document.getElementById('ra2')?.checked;
      const l = document.getElementById('ra3')?.checked;
      const a = document.getElementById('ra4')?.checked;
      const m = document.getElementById('ra5')?.checked;
      const upd={};
      STUDENTS.forEach(s=>{
        if(p){ upd[`${ROOT}/students/${s.id}/points`]=0; upd[`${ROOT}/students/${s.id}/medals`]=0; }
        if(t) upd[`${ROOT}/students/${s.id}/tasks`]=null;
        if(l) upd[`${ROOT}/students/${s.id}/log`]=null;
        if(a) upd[`${ROOT}/students/${s.id}/attendance`]=null;
        if(m){ upd[`${ROOT}/stuMsgs/${s.id}`]=null; }
      });
      if(m) upd[`${ROOT}/messages`]=null;
      await db.ref('/').update(upd);
      toast('全校資料已重置','ok'); renderGrid(); return true;
    }},{label:'取消',fn:()=>true}]);
}

let _allExitData = {};
let _exitLogFilter = 'all';
let _exitLogCls = 'all';

async function loadExitLog() {
  const el = document.getElementById('exitLogList');
  if (!el) return;
  el.innerHTML = '<div class="spin"></div>';
  _allExitData = (await dbGet('exitApply'))||{};
  _renderExitLog();
}

function filterExitLog(mode) {
  _exitLogFilter = mode;
  ['all','approved','pending','rejected'].forEach(m=>{
    const btn = document.getElementById('el'+m.charAt(0).toUpperCase()+m.slice(1));
    if (btn) {
      btn.style.borderColor = m===mode?'var(--gold)':'';
      btn.style.color = m===mode?'var(--gold)':'';
    }
  });
  _renderExitLog();
}

function filterExitCls(cls) {
  _exitLogCls = cls;
  ['all','音三莊','演三莊','音二莊','演二樸','音一莊'].forEach(m=>{
    const btn = document.getElementById('elCls_'+m);
    if (btn) {
      btn.style.borderColor = m===cls ? 'var(--gold)' : '';
      btn.style.color = m===cls ? 'var(--gold)' : '';
    }
  });
  _renderExitLog();
}

function _renderExitLog() {
  const el = document.getElementById('exitLogList');
  if (!el) return;
  let entries = Object.entries(_allExitData).sort((a,b)=>b[0]-a[0]);
  if (_exitLogFilter !== 'all') entries = entries.filter(([,a])=>a.status===_exitLogFilter);
  if (_exitLogCls !== 'all') entries = entries.filter(([,a])=>a.studentClass===_exitLogCls);
  if (!entries.length) { el.innerHTML='<div class="empty">尚無記錄</div>'; return; }

  const statusColor = {approved:'var(--green)',rejected:'var(--red)',pending:'var(--yellow)'};
  const statusLabel = {approved:'✅ 已核可',rejected:'✕ 已拒絕',pending:'⏳ 待審核'};

  el.innerHTML = entries.map(([k,a])=>`
    <div style="background:var(--bg1);border:1px solid ${a.status==='approved'?'rgba(46,204,113,.3)':a.status==='rejected'?'rgba(231,76,60,.3)':'var(--bdr)'};border-radius:var(--r);padding:14px 16px;margin-bottom:10px">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px;gap:8px">
        <div>
          <span style="font-size:16px;font-weight:bold">${a.studentName}</span>
          <span style="font-size:12px;color:var(--tx2);margin-left:8px">${a.studentClass||''}</span>
        </div>
        <span style="font-size:13px;color:${statusColor[a.status]||'var(--tx2)'};font-weight:bold;white-space:nowrap">${statusLabel[a.status]||a.status}</span>
      </div>
      <div style="font-size:13px;margin-bottom:4px">📝 原因：${a.reason||'—'}</div>
      ${a.outTime?`<div style="font-size:13px;color:var(--blue);margin-bottom:4px">🕐 預計外出：${a.outTime}${a.retTime&&a.retTime!=='未填'?' → 返回：'+a.retTime:''}</div>`:''}
      ${a.contact&&a.contact!=='未填'?`<div style="font-size:12px;color:var(--tx2);margin-bottom:4px">📞 聯絡：${a.contact}</div>`:''}
      <div style="font-size:11px;color:var(--tx3);margin-top:6px;display:flex;gap:16px;flex-wrap:wrap">
        <span>申請時間：${dateWithDay(a.applyTime||a.time||'—')}</span>
        ${a.approvedBy?`<span>核可老師：${a.approvedBy}</span>`:''}
        ${a.approvedTime?`<span>核可時間：${dateWithDay(a.approvedTime)}</span>`:''}
        ${a.rejectedBy?`<span>拒絕老師：${a.rejectedBy}</span>`:''}
      </div>
    </div>`).join('');
}

function startApplyListener() {
  ref('exitApply').on('value', snap => {
    const data = snap.val()||{};
    const pend = Object.values(data).filter(a=>a.status==='pending');
    const badge = document.getElementById('applyBadge');
    badge.textContent = pend.length;
    badge.style.display = pend.length?'':'none';
    document.getElementById('teacherNotifDot').classList.toggle('on', pend.length>0 || document.getElementById('inboxBadge').style.display!=='none');
    renderApplyList(data);
  });
}

function renderApplyList(data) {
  const c = document.getElementById('applyList');
  const pend = Object.entries(data).filter(([,a])=>a.status==='pending');
  if (!pend.length) { c.innerHTML='<div class="empty">目前無待審核申請 ✓</div>'; return; }
  c.innerHTML = pend.map(([k,a])=>`
    <div class="apply-item">
      <div class="ai-info">
        <div class="ai-name">${a.studentName} <span style="font-size:12px;color:var(--tx2)">${a.studentClass}</span></div>
        <div class="ai-reason" style="background:rgba(212,175,55,.07);padding:4px 8px;border-radius:4px;margin:3px 0">📝 ${a.reason||'（未填原因）'}</div>
        <div style="font-size:12px;color:var(--blue);margin:2px 0">🕐 外出：${a.outTime||'未填'} ${a.retTime&&a.retTime!=='未填'?' → 返回：'+a.retTime:''}</div>
        <div class="ai-time">申請：${a.applyTime||a.time}${a.contact&&a.contact!=='未填'?' · 聯絡：'+a.contact:''}</div>
      </div>
      <div style="display:flex;flex-direction:column;gap:4px">
        <button class="btn s" onclick="approveExit('${k}','${a.studentName}')">✅ 核可</button>
        <button class="btn d" onclick="rejectExit('${k}')">✕ 拒絕</button>
      </div>
    </div>`).join('');
}

async function approveExit(k, name) {
  const applyData = await dbGet(`exitApply/${k}`);
  const t = now();
  await dbUpd(`exitApply/${k}`,{status:'approved',approvedBy:me.name,approvedTime:t});
  const stu = byName(name);
  if (stu) {
    const lk = Date.now()+'';
    await dbUpd(`students/${stu.id}`,{
      [`log/${lk}`]:{time:t, action:'第八節外出核可', reason:applyData?.reason||'', teacher:me.name, delta:0}
    });
    await sendNotifToStudent(stu.id, name, '第八節外出申請已核可 ✅', 'notice');
  }
  toast(`已核可 ${name} 外出`,'ok');
}

async function rejectExit(k) {
  const applyData = await dbGet(`exitApply/${k}`);
  await dbUpd(`exitApply/${k}`,{status:'rejected', rejectedBy:me.name, rejectedTime:now()});
  const stu = byName(applyData?.studentName||'');
  if (stu) {
    const lk = Date.now()+'';
    await dbUpd(`students/${stu.id}`,{
      [`log/${lk}`]:{time:now(), action:'第八節外出申請被拒', reason:applyData?.reason||'', teacher:me.name, delta:0}
    });
    await sendNotifToStudent(stu.id, applyData?.studentName||'', '第八節外出申請未獲核可', 'notice');
  }
  toast('已拒絕申請');
}

function openApplyExit() {
  openDlg('🚪 申請第八節外出',
    `<div class="dlg-label">外出原因（必填）</div><textarea class="dlg-input" id="exitR" rows="2" placeholder="請填寫外出原因..."></textarea>
     <div class="dlg-label" style="margin-top:4px">預計外出時間（必填）</div>
     <input class="dlg-input" type="text" id="exitOutTime" placeholder="例：17:30 或 放學後30分鐘">
     <div class="dlg-label" style="margin-top:4px">預計返回時間（選填）</div>
     <input class="dlg-input" type="text" id="exitRetTime" placeholder="例：18:00">
     <div class="dlg-label" style="margin-top:4px">聯絡方式（選填）</div>
     <input class="dlg-input" type="text" id="exitContact" placeholder="家長電話或自身聯絡方式">`,
    [{label:'送出申請',cls:'ok',fn:async()=>{
      const reason=document.getElementById('exitR').value.trim();
      const outTime=document.getElementById('exitOutTime').value.trim();
      const retTime=document.getElementById('exitRetTime').value.trim();
      const contact=document.getElementById('exitContact').value.trim();
      if(!reason){toast('請填寫原因','err');return false}
      if(!outTime){toast('請填寫預計外出時間','err');return false}
      const stu=byName(me.name);
      const k=Date.now()+'';
      await dbSet(`exitApply/${k}`,{
        studentName:me.name, studentId:stu?.id||'', studentClass:stu?.cls||'',
        reason, outTime, retTime:retTime||'未填', contact:contact||'未填',
        applyTime:now(), time:now(), status:'pending'
      });
      toast('申請已送出，請等待審核');
      listenMyApproval(k,me.name);
      return true;
    }},{label:'取消',fn:()=>true}]);
}

function listenMyApproval(k, name) {
  ref(`exitApply/${k}`).on('value', snap => {
    const d=snap.val();
    if (d?.status==='approved') {
      ref(`exitApply/${k}`).off();
      showExitPass(name, d.approvedBy, d.approvedTime, d.applyTime||d.time, d.outTime||'', d.retTime||'');
    }
  });
}

function showExitPass(name, teacher, time, applyTime, outTime, retTime) {
  document.getElementById('epName').textContent = name;
  document.getElementById('epApplyTime').textContent = '申請時間：'+dateWithDay(applyTime||time||'—');
  document.getElementById('epPlanTime').textContent = '預計外出：'+(outTime||'未填')+(retTime&&retTime!=='未填'?' → 返回：'+retTime:'');
  document.getElementById('epDate').textContent = '核可時間：'+dateWithDay(time||'—');
  document.getElementById('epTeacher').textContent = '核可老師：'+(teacher||'—');
  document.getElementById('epOutTime').textContent = '憑證展示時間：'+nowWithDay();
  document.getElementById('exitPass').classList.add('on');
}

async function sendNotifToStudent(stuId, stuName, content, type='notice') {
  const k = Date.now()+'_auto';
  await db.ref(`${ROOT}/stuMsgs/${stuId}/${k}`).set({
    from: me?.name||'系統', content, type, time: now(), read: false
  });
}

function startMsgListener() {
  ref('messages').on('value', snap => {
    renderInbox(snap.val()||{});
  });
}

let inboxFilterMode = 'all';
function inboxFilter(mode) {
  inboxFilterMode = mode;
  ['all','unread','punishment'].forEach(m=>{
    const btn = document.getElementById('inboxTab'+m.charAt(0).toUpperCase()+m.slice(1));
    if(btn) { btn.style.borderColor=m===mode?'var(--gold)':''; btn.style.color=m===mode?'var(--gold)':''; }
  });
  renderInbox();
}

async function renderInbox(data) {
  if (!data) data = await dbGet('messages')||{};
  const c = document.getElementById('inboxList');
  if (!c) return;
  let ents = Object.entries(data).sort((a,b)=>b[0]-a[0]);
  if (inboxFilterMode==='unread') ents=ents.filter(([,m])=>!m.read);
  if (inboxFilterMode==='punishment') ents=ents.filter(([,m])=>m.type==='punishment');
  if (!ents.length) { c.innerHTML='<div class="empty">尚無訊息</div>'; return; }
  let unread = 0;
  c.innerHTML = ents.map(([k,m])=>{
    if (!m.read) unread++;
    const typeLabel = {notice:'📢通知',punishment:'⚠️處罰',deduct:'🔴扣分'}[m.type]||'📢通知';
    const typeClass = m.type==='punishment'?'punish':m.type==='deduct'?'unread':'';
    return `<div class="msg-item ${typeClass}" style="border-left:3px solid ${m.read?'var(--bdr)':m.type==='punishment'?'var(--yellow)':m.type==='deduct'?'var(--red)':'var(--blue)'}">
      <div class="msg-hd">
        <div class="msg-to">發給：<b>${m.to}</b> <span class="msg-tag notice">${typeLabel}</span></div>
        <div style="display:flex;gap:6px;align-items:center;flex-shrink:0">
          <div class="msg-time">${m.time}</div>
          <button class="btn d" onclick="delMsg('${k}')" style="padding:2px 7px;font-size:10px">刪</button>
        </div>
      </div>
      <div class="msg-body">${m.content}</div>
      <div style="font-size:11px;color:var(--tx3)">發送者：${m.from} · <span style="color:${m.read?'var(--green)':'var(--red)'}">${m.read?'✅已讀':'🔴未讀'}</span></div>
    </div>`;
  }).join('');
  const ib = document.getElementById('inboxBadge');
  ib.textContent = unread; ib.style.display = unread?'':'none';
  document.getElementById('teacherNotifDot')?.classList.toggle('on', unread>0 || document.getElementById('applyBadge').style.display!=='none');
}

async function delMsg(k) {
  await db.ref(`${ROOT}/messages/${k}`).remove();
  toast('訊息已刪除');
}

function openSendMsg() {
  const clsOpts = CLASSES.map(cls=>`<option value="cls:${cls}">📢 ${cls} 全班</option>`).join('');
  const stuOpts = CLASSES.map(cls=>
    `<optgroup label="${cls}">`+
    byCls(cls).map(s=>`<option value="stu:${s.id}:${s.name}">${s.id.split('-')[1]||''} ${s.name}</option>`).join('')+
    `</optgroup>`
  ).join('');
  openDlg('✉️ 發送訊息',
    `<div class="dlg-label">發送對象</div>
     <select class="dlg-input" id="msgTo" style="width:100%;margin-bottom:12px">
       <option value="all">🌐 全校廣播（所有班級）</option>
       ${clsOpts}
       <optgroup label="─ 個別學生 ─">${stuOpts}</optgroup>
     </select>
     <div class="dlg-label">類型</div>
     <select class="dlg-input" id="msgType" style="width:100%;margin-bottom:12px">
       <option value="notice">📢 一般通知</option>
       <option value="punishment">⚠️ 處罰通知</option>
       <option value="deduct">🔴 扣分通知</option>
     </select>
     <div class="dlg-label">訊息內容</div>
     <textarea class="dlg-input" id="msgContent" rows="3" placeholder="請輸入訊息內容..."></textarea>`,
    [{label:'發送',cls:'ok',fn:async()=>{
      const target = document.getElementById('msgTo').value;
      const type = document.getElementById('msgType').value;
      const content = document.getElementById('msgContent').value.trim();
      if (!content){toast('請填寫內容','err');return false}
      const k = Date.now()+'';
      let toName, toIds;
      if (target === 'all') {
        toName='全校'; toIds=STUDENTS.map(s=>s.id);
      } else if (target.startsWith('cls:')) {
        const cls=target.slice(4); toName=cls+'全班'; toIds=byCls(cls).map(s=>s.id);
      } else {
        const parts=target.split(':'); toName=parts[2]; toIds=[parts[1]];
      }
      const upd = {};
      upd[`${ROOT}/messages/${k}`] = {from:me.name, to:toName, content, type, time:now(), read:false};
      toIds.forEach(id=>{ upd[`${ROOT}/stuMsgs/${id}/${k}`] = {from:me.name, content, type, time:now(), read:false}; });
      await db.ref('/').update(upd);
      toast(`已發送給 ${toName}（${toIds.length}人）`,'ok');
      return true;
    }},{label:'取消',fn:()=>true}]);
}

let _currentStuId = null;

async function loadStuMsgs(stuId) {
  _currentStuId = stuId;
  await _renderStuMsgs(stuId);
}

async function _renderStuMsgs(stuId) {
  const data = (await dbGet(`stuMsgs/${stuId}`))||{};
  const all = Object.entries(data).sort((a,b)=>b[0].localeCompare(a[0]));
  const unread = all.filter(([,m])=>!m.read);

  const dot = document.getElementById('stuNotifDot');
  if (dot) dot.classList.toggle('on', unread.length>0);

  const list = document.getElementById('stuBannerList');
  if (!list) return;

  if (all.length === 0) {
    list.innerHTML = '<div style="color:var(--tx3);font-size:13px;padding:8px 0">目前無任何訊息</div>';
    return;
  }

  const rows = all.slice(0,30).map(([k,m]) => {
    const isRead = m.read === true;
    const opacity = isRead ? '0.6' : '1';
    const borderColor = isRead ? 'var(--bdr)'
      : (m.type==='punishment'||m.type==='deduct') ? 'var(--yellow)' : 'var(--blue)';
    const typeLabel = m.type==='punishment' ? '⚠️ 處罰通知'
      : m.type==='deduct' ? '🔴 扣分' : '📢 通知';
    const readBtn = !isRead
      ? `<button class="btn s" onclick="markRead('${stuId}','${k}')" style="font-size:11px;padding:2px 10px;margin-top:4px">✓ 已讀</button>`
      : '<span style="font-size:11px;color:var(--green)">✅ 已讀</span>';
    return `<div class="stu-msg-item" style="opacity:${opacity};border-left:3px solid ${borderColor}">
      <div class="stu-msg-from">${typeLabel} · ${m.from||'系統'} · ${m.time||''}</div>
      <div style="font-size:14px;margin:4px 0;color:var(--tx)">${m.content||''}</div>
      ${readBtn}
    </div>`;
  });
  list.innerHTML = rows.join('');
}

function toggleStuBanner() {
  stuBannerOpen = !stuBannerOpen;
  const banner = document.getElementById('stuBanner');
  if (!banner) return;
  if (stuBannerOpen) {
    banner.style.setProperty('display', 'block', 'important');
    if (_currentStuId) _renderStuMsgs(_currentStuId);
  } else {
    banner.style.setProperty('display', 'none', 'important');
  }
}

async function markRead(stuId, k) {
  try {
    await db.ref(`${ROOT}/stuMsgs/${stuId}/${k}`).update({read:true});
    try { await db.ref(`${ROOT}/messages/${k}`).update({read:true}); } catch(e){}
    toast('已標記為已讀','ok');
    await _renderStuMsgs(stuId);
  } catch(e) {
    toast('請重試','err');
  }
}

async function stuRedeemMedal(stuId, pts) {
  if (pts < 5) { toast('點數不足5點','err'); return; }
  openDlg('🎖️ 兌換金牌',
    `<div class="dlg-msg">確認扣除5點，兌換1枚金牌？<br>兌換後剩餘：${pts-5}點</div>`,
    [{label:'確認兌換',cls:'ok',fn:async()=>{
      const d = await dbGet(`students/${stuId}`);
      const newPts = (d?.points||0)-5, newMedals = (d?.medals||0)+1;
      const lk = Date.now()+'';
      await dbUpd(`students/${stuId}`,{points:newPts,medals:newMedals,
        [`log/${lk}`]:{time:now(),action:'學生兌換金牌',reason:'集滿5點自行兌換',teacher:'學生',delta:-5}});
      toast('金牌兌換成功🎖️','ok');
      const stu = byId(stuId); if(stu) loadStuView(stu);
      return true;
    }},{label:'取消',fn:()=>true}]);
}

function stuChangePw(stuId) {
  openDlg('🔑 修改密碼',
    `<div class="dlg-label">目前密碼</div><input class="dlg-input" type="password" id="cpOld" placeholder="目前密碼">
     <div class="dlg-label">新密碼</div><input class="dlg-input" type="password" id="cpNew1" placeholder="新密碼">
     <div class="dlg-label">確認新密碼</div><input class="dlg-input" type="password" id="cpNew2" placeholder="再次輸入">`,
    [{label:'確認修改',cls:'ok',fn:async()=>{
      const old = document.getElementById('cpOld').value;
      const n1 = document.getElementById('cpNew1').value;
      const n2 = document.getElementById('cpNew2').value;
      const d = await dbGet(`students/${stuId}`);
      const stored = d?.password||'0000';
      if (old !== stored) { toast('目前密碼錯誤','err'); return false; }
      if (!n1) { toast('新密碼不能為空','err'); return false; }
      if (n1 !== n2) { toast('兩次密碼不一致','err'); return false; }
      await dbUpd(`students/${stuId}`,{password:n1});
      toast('密碼已更新','ok'); return true;
    }},{label:'取消',fn:()=>true}]);
}

let _stuViewListener = null;

async function loadStuView(stu) {
  if (_stuViewListener) {
    ref(`students/${_stuViewListener}`).off('value');
  }
  _stuViewListener = stu.id;
  ref(`students/${stu.id}`).on('value', async snap => {
    const data = snap.val()||{};
    _renderStuView(stu, data);
    await renderStudentCardExtras(stu, data);
  });
  listenMyApprovalStu(stu.name);
}

async function getCardCollectionLeaderboard(classes, limit) {
  const classList = Array.isArray(classes) ? classes : [classes];
  const studentMap = new Map();
  classList.filter(Boolean).forEach(cls => {
    byCls(cls).forEach(stu => studentMap.set(stu.id, stu));
  });
  const stus = [...studentMap.values()];
  const inventories = await Promise.all(stus.map(s => dbGet(`students/${s.id}/inventory`)));
  const ranked = stus.map((stu, idx) => {
    const inv = inventories[idx] || {};
    const counts = Object.values(inv).map(v => Number(v)||0);
    const uniqueCards = counts.filter(v => v > 0).length;
    const totalCards = counts.reduce((sum, v) => sum + v, 0);
    return {...stu, uniqueCards, totalCards};
  }).sort((a,b) => b.uniqueCards - a.uniqueCards || b.totalCards - a.totalCards || a.id.localeCompare(b.id));
  const finalRanked = ranked.map((row, index) => ({...row, rank:index + 1}));
  return typeof limit === 'number' ? finalRanked.slice(0, limit) : finalRanked;
}

async function renderStudentCardExtras(stu, d) {
  const featuredEl = document.getElementById('stuFeaturedCardSection');
  const rankingEl = document.getElementById('stuCollectionRanking');
  const rewardEl = document.getElementById('stuRewardGuide');
  const inv = d?.inventory || {};
  const featuredCard = CARD_DB.find(card => card.id === d?.featuredCardId && (inv[card.id]||0) > 0);

  if (featuredEl) {
    featuredEl.innerHTML = featuredCard ? `
      <div style="display:flex;gap:12px;align-items:center;background:linear-gradient(135deg,rgba(212,175,55,.12),rgba(0,0,0,.2));border:1px solid rgba(212,175,55,.3);border-radius:14px;padding:12px">
        <img src="${getCardImageSrc(featuredCard)}" alt="${featuredCard.name}" style="width:82px;height:112px;object-fit:cover;border-radius:10px;border:1px solid rgba(212,175,55,.35);background:var(--bg2)" onerror="this.style.display='none'">
        <div style="min-width:0;flex:1">
          <div style="font-size:11px;color:var(--gold);letter-spacing:1px;margin-bottom:4px">看板星卡</div>
          <div style="font-size:20px;font-weight:bold">${featuredCard.name}</div>
          <div style="font-size:13px;color:var(--tx2);margin:4px 0">${featuredCard.title}</div>
          <div style="font-size:12px;color:var(--tx3);line-height:1.6">「${featuredCard.quote||'—'}」</div>
          <div style="font-size:11px;color:var(--gold);margin-top:6px">${featuredCard.rarity} · 持有 ${inv[featuredCard.id]||1} 張</div>
        </div>
      </div>` : `
      <div style="font-size:13px;color:var(--tx3);padding:10px 12px;border:1px dashed var(--bdr);border-radius:12px">
        目前尚未設定看板星卡，前往卡簿即可指定。
      </div>`;
  }

  if (rankingEl) {
    const ranking = await getCardCollectionLeaderboard(stu.cls);
    const myRank = ranking.findIndex(row => row.id === stu.id) + 1;
    const topRows = ranking.slice(0, 5).map(row => `
      <div style="display:flex;align-items:center;gap:10px;padding:7px 0;border-bottom:1px solid rgba(212,175,55,.08)">
        <div style="width:28px;text-align:center;font-weight:bold;color:${row.id===stu.id?'var(--gold)':'var(--tx2)'}">${row.rank}</div>
        <div style="flex:1;min-width:0">
          <div style="font-size:13px;font-weight:${row.id===stu.id?'bold':'normal'}">${row.name}</div>
          <div style="font-size:11px;color:var(--tx3)">${row.uniqueCards} 種 · ${row.totalCards} 張</div>
        </div>
      </div>`).join('') || '<div style="font-size:13px;color:var(--tx3)">目前還沒有任何卡片收藏紀錄。</div>';
    rankingEl.innerHTML = `
      <div style="font-size:12px;color:var(--tx2);margin-bottom:8px">班級排名：<b style="color:var(--gold)">第 ${myRank||'-'} 名</b></div>
      <div>${topRows}</div>`;
  }

  if (rewardEl) {
    await loadAllClassRewards();
    const owner = getRewardOwnerLabel(stu.cls);
    const rows = ['legend','diamond','gold','silver','bronze'].map(tier => {
      const reward = getClassReward(stu.cls, tier);
      const info = TIER_INFO[tier];
      const mode = '系統直接發放數位兌換';
      return `<div style="display:flex;align-items:center;gap:10px;padding:7px 0;border-bottom:1px solid rgba(212,175,55,.08)">
        <div class="badge-circle ${info.tierClass}" style="width:30px;height:30px;font-size:14px;flex-shrink:0">${info.emoji}</div>
        <div style="flex:1;min-width:0">
          <div style="font-size:12px;font-weight:bold">${info.name}</div>
          <div style="font-size:11px;color:var(--tx2)">${reward}</div>
          <div style="font-size:10px;color:var(--tx3)">${mode}</div>
        </div>
      </div>`;
    }).join('');
    rewardEl.innerHTML = `
      <div style="font-size:12px;color:var(--tx2);margin-bottom:8px">${stu.cls} 兌換說明：由老師設定項目（實體獎品／免死金牌／點數）與數量，點數與免死金牌系統自動發放。</div>
      <div>${rows}</div>`;
  }
}

function openStuPiano() {
  const overlay = document.getElementById('stuPianoOverlay');
  const frame = document.getElementById('stuPianoFrame');
  overlay.style.display = 'flex';
  if (!frame.src || frame.src === window.location.href) {
    const authData = btoa(encodeURIComponent(JSON.stringify(me)));
    frame.src = `https://jjvsmusic.github.io/musicbooking/?sso=${authData}`;
  }
}

// ════════════════════════════════════════════════
// 學生行事曆 Overlay 開關
// ════════════════════════════════════════════════
async function openStuCal() {
  document.getElementById('stuCalOverlay').classList.add('on');
  await loadAndRefreshStuCal();
}

function closeStuCal() {
  document.getElementById('stuCalOverlay').classList.remove('on');
}

async function loadAndRefreshStuCal() {
  const imgEl = document.getElementById('stuCalImg');
  const emptyEl = document.getElementById('stuCalEmpty');
  const titleEl = document.getElementById('stuCalTitle');
  const semEl = document.getElementById('stuCalSemester');

  imgEl.style.display = 'none';
  if (emptyEl) emptyEl.style.display = '';
  if (semEl) semEl.textContent = '載入中…';

  try {
    const calData = await dbGet('calendar') || {};
    if (calData.imageBase64) {
      imgEl.src = calData.imageBase64;
      imgEl.style.display = 'block';
      if (emptyEl) emptyEl.style.display = 'none';
    } else {
      imgEl.style.display = 'none';
      if (emptyEl) { emptyEl.style.display = ''; emptyEl.textContent = '行事曆尚未上傳'; }
    }
    if (calData.semester) {
      titleEl.textContent = '📅 ' + calData.semester;
      if (semEl) semEl.textContent = calData.updatedAt ? '更新時間：' + calData.updatedAt : '';
    } else {
      titleEl.textContent = '📅 學期行事曆';
      if (semEl) semEl.textContent = '';
    }
  } catch(e) {
    if (emptyEl) { emptyEl.style.display = ''; emptyEl.textContent = '載入失敗，請重試'; }
    if (semEl) semEl.textContent = '';
  }
}

function _renderStuView(stu, d) {
  const el = document.getElementById('stuCard');
  if (!el) return;
  const td = today();
  const att = d.attendance?.[td]||'未點名';
  const pts = d.points||0, medals = d.medals||0, packTickets = Number(d.packTickets||0);
  const tasks = d.tasks||{};
  const log = d.log||{};
  const attColor = {出:'var(--green)',遲:'var(--yellow)',缺:'var(--red)',假:'var(--blue)'}[att]||'var(--tx2)';
  const taskEntries = Object.entries(tasks);

  const tasksHtml = taskEntries.length === 0
    ? '<div style="color:var(--tx3);font-size:13px;padding:6px 0">目前無任務 ✓</div>'
    : taskEntries.map(([k,t])=>{
        const pct = Math.min(100, Math.round(((t.done||0)/t.total)/0.01));
        const done = t.done||0;
        const isDone = done >= t.total;
        return `<div style="background:var(--bg2);border:1px solid ${isDone?'var(--green)':'var(--bdr)'};border-radius:8px;padding:10px 12px;margin-bottom:8px">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
            <div style="font-size:14px;font-weight:bold">${t.name}</div>
            <div style="display:flex;align-items:center;gap:8px">
              <span style="font-size:12px;color:${isDone?'var(--green)':'var(--tx2)'}">${done}/${t.total}${isDone?' ✅':''}</span>
              ${isDone ? `<button class="btn d" onclick="stuDelTask('${stu.id}','${k}')" style="font-size:11px;padding:1px 8px">刪除</button>` : ''}
            </div>
          </div>
          <div style="height:5px;background:var(--bg);border-radius:3px;overflow:hidden">
            <div style="height:100%;width:${pct}%;background:${isDone?'var(--green)':'var(--gold)'};transition:width .3s"></div>
          </div>
          ${isDone ? '<div style="font-size:11px;color:var(--green);margin-top:4px">任務完成！可點刪除清除記錄</div>' : ''}
        </div>`;
      }).join('');

  const logHtml = Object.entries(log)
    .sort((a, b) => (parseInt(b[0])||0) - (parseInt(a[0])||0))
    .slice(0, 10).map(([,e])=>`
    <div class="log-item ${e.delta>0?'add':e.delta<0?'sub':''}">
      <div class="log-t">${e.time||''}</div>
      <div>${e.action||''}${e.reason?' — '+e.reason:''}</div>
    </div>`).join('') || '<div style="color:var(--tx3);font-size:13px">尚無記錄</div>';

  el.innerHTML = `
    <div style="background:var(--bg1);border:1px solid var(--bdr);border-radius:18px;padding:24px;box-shadow:0 0 20px rgba(212,175,55,.1)">
      <div style="text-align:center;margin-bottom:16px">
        <div style="font-size:12px;color:var(--tx2)">${stu.cls} · ${stu.id}</div>
        <div style="font-size:32px;font-weight:bold;color:var(--gold);margin:6px 0">${stu.name}</div>
        <div style="font-size:15px;color:var(--tx2)">今日出勤：<span style="color:${attColor};font-weight:bold;font-size:18px">${att}</span></div>
        <button class="btn" onclick="refreshStuView()" style="margin-top:8px;font-size:11px;padding:3px 12px">🔄 重新整理</button>
      </div>

      <div class="dp-sec-t">🌟 看板星卡</div>
      <div id="stuFeaturedCardSection" style="margin-bottom:14px"></div>

      <div class="dp-sec-t">🏆 卡片收藏排行榜</div>
      <div id="stuCollectionRanking" style="margin-bottom:14px"></div>

      <div class="dp-sec-t">🎁 勳章兌換說明</div>
      <div id="stuRewardGuide" style="margin-bottom:14px"></div>

      <hr class="sep">

      <div class="dp-sec-t">⭐ 點數集點卡</div>
      <div class="pts-card" style="margin-bottom:10px">
        <div class="pts-grid">${Array(10).fill(0).map((_,i)=>`<div class="pc ${i<pts?'on':'off'}">${i<pts?'⭐':''}</div>`).join('')}</div>
        <div class="pts-info">目前：<b>${pts}</b> 點</div>
      </div>
      <div style="font-size:12px;color:var(--tx2);margin-bottom:10px">🎴 卡包券：<b style="color:var(--gold)">${packTickets}</b> 包</div>
      <button class="btn g" onclick="stuRedeemMedal('${stu.id}',${pts})" ${pts<5?'disabled style="opacity:.5;cursor:not-allowed"':''} style="width:100%;padding:10px;font-size:14px;margin-bottom:4px">
        🎖️ ${pts>=5?'兌換金牌（扣5點）':'點數不足（需滿5點）'}
      </button>

      <hr class="sep">

      <div class="dp-sec-t">🎖️ 金牌庫存</div>
      <div class="medals-row" style="margin-bottom:6px">${medals>0
        ? Array(Math.min(medals,10)).fill(0).map(()=>`<div class="mcoin">🏅</div>`).join('')+(medals>10?`<span style="color:var(--gold);font-size:16px;align-self:center">+${medals-10}</span>`:'')
        : '<span style="color:var(--tx3);font-size:13px">尚無金牌</span>'}</div>
      <div style="font-size:13px;color:var(--tx2);margin-bottom:4px">共 <b style="color:var(--gold)">${medals}</b> 枚</div>

      <hr class="sep">
      <div class="dp-sec-t">⚡ 閃電警告</div>
      ${(()=>{const b=d.bolts||0,cur=b%3,pen=Math.floor(b/3);if(!b)return'<div style="font-size:13px;color:var(--tx3);padding:4px 0">目前無警告 ✓</div>';let bar='<div style="display:flex;gap:6px;margin-bottom:6px">';for(let i=0;i<3;i++)bar+=`<div style="flex:1;height:28px;border-radius:6px;border:2px solid ${i<cur?'var(--yellow)':'var(--bdr)'};background:${i<cur?'rgba(241,196,15,.15)':'transparent'};display:flex;align-items:center;justify-content:center">${i<cur?'⚡':''}</div>`;return bar+'</div>'+(pen>0?`<div style="font-size:12px;color:var(--red);padding:5px 8px;background:rgba(231,76,60,.1);border-radius:6px">⚠️ 已觸發 ${pen} 次懲罰</div>`:`<div style="font-size:12px;color:var(--tx2)">⚡ ${cur}/3，集滿3個觸發懲罰</div>`);})()}
      <hr class="sep">
      <div class="dp-sec-t">📝 待完成任務（罰抄）</div>
      ${tasksHtml}

      <hr class="sep">

      <div class="dp-sec-t" style="margin-bottom:8px">🔑 帳號設定</div>
      <button class="btn" onclick="stuChangePw('${stu.id}')" style="width:100%;padding:9px;font-size:13px">🔑 修改我的密碼</button>

      <hr class="sep">

      <div class="dp-sec-t">📜 最近記錄</div>
      ${logHtml}
    </div>`;
}

function listenMyApprovalStu(name) {
  ref('exitApply').on('value', snap=>{
    const data = snap.val()||{};
    const td = today();
    const myApps = Object.entries(data)
      .filter(([,a])=>a.studentName===name)
      .sort((a,b)=>b[0]-a[0]);

    const area = document.getElementById('stuPassArea');
    if (!area) return;

    const approvedToday = myApps.find(([,a])=>a.status==='approved' && (a.approvedTime||'').startsWith(td.replace(/\//g,'/')));

    const histHtml = myApps.slice(0,10).map(([,a])=>{
      const statusColor = {approved:'var(--green)',rejected:'var(--red)',pending:'var(--yellow)'}[a.status]||'var(--tx2)';
      const statusLabel = {approved:'✅ 已核可',rejected:'✕ 已拒絕',pending:'⏳ 待審核'}[a.status]||a.status;
      return `<div style="background:var(--bg1);border:1px solid var(--bdr);border-radius:8px;padding:10px 12px;margin-bottom:6px">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">
          <span style="font-size:12px;color:var(--tx2)">申請：${a.applyTime||a.time}</span>
          <span style="font-size:12px;color:${statusColor};font-weight:bold">${statusLabel}</span>
        </div>
        <div style="font-size:13px">原因：${a.reason||'—'}</div>
        ${a.outTime?`<div style="font-size:12px;color:var(--blue)">🕐 外出：${a.outTime}${a.retTime&&a.retTime!=='未填'?' → 返回：'+a.retTime:''}</div>`:''}
        ${a.approvedBy?`<div style="font-size:11px;color:var(--tx3);margin-top:2px">核可老師：${a.approvedBy} · ${a.approvedTime||''}</div>`:''}
        ${a.status==='rejected'?'<div style="font-size:11px;color:var(--red);margin-top:2px">申請未通過</div>':''}
      </div>`;
    }).join('') || '<div style="color:var(--tx3);font-size:13px">尚無申請記錄</div>';

    const ap = approvedToday?.[1];
    area.innerHTML = `
      ${ap ? `<button class="btn g" onclick="showExitPass('${name}','${ap.approvedBy||''}','${ap.approvedTime||''}','${ap.applyTime||ap.time||''}','${ap.outTime||''}','${ap.retTime||''}')" style="width:100%;padding:12px;font-size:14px;margin-bottom:12px">📋 顯示外出憑證</button>` : ''}
      <div style="background:var(--bg1);border:1px solid var(--bdr);border-radius:13px;padding:16px;margin-bottom:10px">
        <div class="dp-sec-t" style="margin-bottom:10px">📋 第八節外出申請記錄</div>
        ${histHtml}
      </div>`;
  });
}

async function stuDelTask(stuId, taskKey) {
  openDlg('🗑️ 刪除已完成任務',
    '<div class="dlg-msg">確認刪除這項已完成的任務記錄？</div>',
    [{label:'確認刪除',cls:'del',fn:async()=>{
      await db.ref(`${ROOT}/students/${stuId}/tasks/${taskKey}`).remove();
      toast('任務記錄已刪除','ok');
      const stu = byId(stuId);
      if (stu) loadStuView(stu);
      return true;
    }},{label:'取消',fn:()=>true}]);
}

// ════════════════════════════════════════════════
// 行事曆功能（教師上傳端）
// ════════════════════════════════════════════════
async function loadCalendar() {
  const calData = await dbGet('calendar') || {};
  const imgEl = document.getElementById('calImg');
  const emptyEl = document.getElementById('calEmptyMsg');
  const delBtn = document.getElementById('calDelBtn');
  const titleEl = document.getElementById('calDisplayTitle');
  const labelEl = document.getElementById('calSemesterLabel');

  if (calData.imageBase64) {
    imgEl.src = calData.imageBase64;
    imgEl.style.display = 'block';
    emptyEl.style.display = 'none';
    delBtn.style.display = '';
  } else {
    imgEl.style.display = 'none';
    emptyEl.style.display = '';
    delBtn.style.display = 'none';
  }
  if (calData.semester) {
    titleEl.textContent = '📅 ' + calData.semester;
    labelEl.value = calData.semester;
  } else {
    titleEl.textContent = '📅 行事曆';
    labelEl.value = '';
  }
}

async function handleCalUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  if (file.size > 4 * 1024 * 1024) { toast('圖片過大，請壓縮後再上傳（上限4MB）','err'); return; }
  const status = document.getElementById('calUploadStatus');
  status.textContent = '上傳中…';
  try {
    const base64 = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = e => resolve(e.target.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
    const semester = document.getElementById('calSemesterLabel').value.trim() || '學期行事曆';
    await dbUpd('calendar', { imageBase64: base64, semester, updatedBy: me.name, updatedAt: now() });
    toast('行事曆已上傳','ok');
    status.textContent = '';
    loadCalendar();
    event.target.value = '';
  } catch(e) {
    toast('上傳失敗：'+e.message,'err');
    status.textContent = '';
  }
}

async function saveCalMeta() {
  const semester = document.getElementById('calSemesterLabel').value.trim();
  if (!semester) { toast('請填寫學期名稱','err'); return; }
  await dbUpd('calendar', { semester, updatedBy: me.name, updatedAt: now() });
  toast('學期名稱已儲存','ok');
  document.getElementById('calDisplayTitle').textContent = '📅 ' + semester;
}

async function deleteCalendar() {
  openDlg('🗑️ 刪除行事曆', '<div class="dlg-msg">確認刪除目前的行事曆圖片？</div>',
    [{label:'確認刪除',cls:'del',fn:async()=>{
      await dbSet('calendar', {semester:'', imageBase64:'', updatedBy:me.name, updatedAt:now()});
      toast('行事曆已刪除','ok');
      loadCalendar();
      return true;
    }},{label:'取消',fn:()=>true}]);
}

async function renderTeachers() {
  const c = document.getElementById('teacherList');
  c.innerHTML = '<div class="spin"></div>';
  const teachers = await dbGet('teachers')||{};
  c.innerHTML = `<div class="titem"><div class="ti-name">${MASTER.name} <span style="background:var(--gold);color:#000;font-size:11px;padding:2px 8px;border-radius:10px;margin-left:6px">最高權限</span></div><div class="ti-cls">管轄所有班級</div></div>`;
  Object.entries(teachers).forEach(([k,t])=>{
    const d=document.createElement('div');
    d.className='titem';
    d.innerHTML=`<div><div class="ti-name">${t.name} ${t.role==='piano_only'?'<span style="font-size:10px;padding:1px 6px;border-radius:8px;background:rgba(201,168,76,.15);color:#c9a84c">專任老師</span>':''}</div><div class="ti-cls">${t.role==='piano_only'?'僅限琴房預約':'班級：'+(t.classes||[]).join('、')||'無'}</div><div class="ti-pw">密碼：${t.pass}</div></div><button class="btn d" onclick="delTeacher('${k}','${t.name}')">刪除</button>`;
    c.appendChild(d);
  });
}

function openAddTeacher() {
  openDlg('⚙️ 新增教師帳號',
    `<div class="dlg-label">姓名（即帳號）</div><input class="dlg-input" type="text" id="tN" placeholder="教師姓名">
     <div class="dlg-label">密碼</div><input class="dlg-input" type="password" id="tP" placeholder="密碼">
     <div class="dlg-label">角色類型</div>
     <select class="dlg-input" id="tRole" style="margin-bottom:10px">
       <option value="teacher">教師（可使用教務+琴房）</option>
       <option value="piano_only">專任老師（僅限琴房預約）</option>
     </select>
     <div id="tClassWrap"><div class="dlg-label">管轄班級（教師才需填）</div>${CLASSES.map(c=>`<label style="display:block;margin-bottom:6px;font-size:14px;cursor:pointer"><input type="checkbox" value="${c}" style="margin-right:6px"> ${c}</label>`).join('')}</div>`,
    [{label:'新增',cls:'ok',fn:async()=>{
      const name=document.getElementById('tN').value.trim();
      const pass=document.getElementById('tP').value.trim();
      const roleVal=document.getElementById('tRole')?.value||'teacher';
      const classes=roleVal==='piano_only'?[]:[...document.querySelectorAll('#dlgBody input[type=checkbox]:checked')].map(c=>c.value);
      if(!name||!pass){toast('請填寫完整','err');return false}
      await dbSet(`teachers/${Date.now()}`,{name,pass,classes,role:roleVal});
      toast('教師帳號已新增','ok'); renderTeachers(); return true;
    }},{label:'取消',fn:()=>true}]);
}

async function delTeacher(k, name) {
  openDlg('⚠️ 確認刪除',`<div class="dlg-msg">確認要刪除「${name}」的帳號？</div>`,
    [{label:'刪除',cls:'del',fn:async()=>{ await db.ref(`${ROOT}/teachers/${k}`).remove(); toast('已刪除'); renderTeachers(); return true; }},{label:'取消',fn:()=>true}]);
}

async function loadDeductLog() {
  const el = document.getElementById('deductLog');
  if (!el) return;
  el.innerHTML = '<div class="spin"></div>';
  const stus = me.classes.flatMap(c=>byCls(c));
  const all = [];
  for (const s of stus) {
    const log = await dbGet(`students/${s.id}/log`) || {};
    Object.values(log).forEach(e => {
      if ((e.delta||0) < 0) all.push({...e, studentName:s.name, studentId:s.id, cls:s.cls});
    });
  }
  all.sort((a,b)=>(b.time||'').localeCompare(a.time||''));
  const recent = all.slice(0,40);
  if (!recent.length) { el.innerHTML='<div class="empty">尚無扣分記錄</div>'; return; }
  el.innerHTML = recent.map(e=>`
    <div class="log-item sub" style="background:var(--bg1);padding:8px 12px;border-radius:6px;margin-bottom:5px">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <span style="font-weight:bold">${e.studentName} <span style="font-size:11px;color:var(--tx3)">${e.cls}</span></span>
        <span style="color:var(--red);font-weight:bold">${e.delta}點</span>
      </div>
      <div class="log-t">${e.time||''} · ${e.teacher||''}</div>
      <div style="font-size:13px">${e.action||''}${e.reason?' — '+e.reason:''}</div>
    </div>`).join('');
}
async function renderStats() {
  const td=today();
  const stus=me.classes.flatMap(c=>byCls(c));
  const res=await Promise.all(stus.map(s=>dbGet(`students/${s.id}/attendance/${td}`)));
  const sum={出:0,遲:0,缺:0,假:0};
  res.forEach(r=>{ if(sum[r]!==undefined) sum[r]++; });
  document.getElementById('statGrid').innerHTML=`
    <div class="statcard"><div class="stat-n" style="color:var(--green)">${sum['出']}</div><div class="stat-l">出席</div></div>
    <div class="statcard"><div class="stat-n" style="color:var(--yellow)">${sum['遲']}</div><div class="stat-l">遲到</div></div>
    <div class="statcard"><div class="stat-n" style="color:var(--red)">${sum['缺']}</div><div class="stat-l">缺席</div></div>
    <div class="statcard"><div class="stat-n" style="color:var(--blue)">${sum['假']}</div><div class="stat-l">請假</div></div>`;
}

async function renderRpt() {
  if (!curCls) curCls=me.classes[0];
  const grid=document.getElementById('rptGrid');
  grid.innerHTML='<div class="spin"></div>';
  const stus=byCls(curCls);
  const res=await Promise.all(stus.map(s=>dbGet(`students/${s.id}`)));
  const ranking = await getCardCollectionLeaderboard(curCls, 10);
  grid.innerHTML='';

  const leaderboardCard = document.createElement('div');
  leaderboardCard.className = 'scard';
  leaderboardCard.style.gridColumn = '1 / -1';
  leaderboardCard.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:10px;flex-wrap:wrap">
      <div>
        <div style="font-size:15px;font-weight:bold;color:var(--gold)">🏆 ${curCls} 卡片收藏排行榜</div>
        <div style="font-size:12px;color:var(--tx3)">依收藏卡種數優先，其次比較總張數</div>
      </div>
      <div style="font-size:12px;color:var(--tx2)">共 ${ranking.length} 名上榜</div>
    </div>
    ${ranking.length ? ranking.map(row => `
      <div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid rgba(212,175,55,.08)">
        <div style="width:32px;text-align:center;font-weight:bold;color:${row.rank===1?'var(--gold)':'var(--tx2)'}">${row.rank}</div>
        <div style="flex:1;min-width:0">
          <div style="font-size:14px;font-weight:bold">${row.name} <span style="font-size:11px;color:var(--tx3)">${row.id}</span></div>
          <div style="font-size:11px;color:var(--tx3)">${row.uniqueCards} 種收藏 · ${row.totalCards} 張總數</div>
        </div>
      </div>`).join('') : '<div style="font-size:13px;color:var(--tx3)">目前尚無卡片收藏資料。</div>'}`;
  grid.appendChild(leaderboardCard);

  stus.forEach((s,i)=>{
    const d=res[i]||{};
    const card=document.createElement('div');
    card.className='scard';
    card.style.cursor='pointer';
    card.innerHTML=`<div class="sc-top"><div class="sc-num">${s.id}</div><div style="font-size:12px;color:var(--tx3)">⭐${d.points||0} 🎖️${d.medals||0}</div></div>
      <div class="sc-name" style="cursor:default"><span style="font-size:11px;color:var(--tx3);margin-right:3px">${s.id.split('-')[1]||''}</span>${s.name}</div>
      <div style="font-size:12px;color:var(--tx2);margin-top:3px">${Object.keys(d.tasks||{}).length}任務 · ${Object.keys(d.log||{}).length}筆記錄</div>`;
    card.onclick=()=>openDetail(s,d);
    grid.appendChild(card);
  });
}

async function exportXlsx() {
  toast('生成 Excel...');
  const wb=XLSX.utils.book_new(), td=today();
  for (const cls of me.classes) {
    const stus=byCls(cls);
    const res=await Promise.all(stus.map(s=>dbGet(`students/${s.id}`)));
    const rows=[['學號','姓名','班級','點數','金牌','今日出勤']];
    stus.forEach((s,i)=>{ const d=res[i]||{}; rows.push([s.id,s.name,s.cls,d.points||0,d.medals||0,d.attendance?.[td]||'未']); });
    XLSX.utils.book_append_sheet(wb,XLSX.utils.aoa_to_sheet(rows),cls);
  }
  XLSX.writeFile(wb,`莊敬音樂科_${td}.xlsx`);
  toast('Excel 已下載','ok');
}

async function exportPdf() {
  toast('生成 PDF...');
  const {jsPDF}=window.jspdf;
  const doc=new jsPDF({orientation:'landscape'});
  const td=today();
  doc.setFontSize(14); doc.text('莊敬高職音樂科 教務報表',14,14);
  doc.setFontSize(10); doc.text(`日期：${td}`,14,21);
  let y=28;
  for (const cls of me.classes) {
    const stus=byCls(cls);
    const res=await Promise.all(stus.map(s=>dbGet(`students/${s.id}`)));
    doc.autoTable({startY:y,head:[[cls,'姓名','點數','金牌','今日']],body:stus.map((s,i)=>{const d=res[i]||{};return[s.id,s.name,d.points||0,d.medals||0,d.attendance?.[td]||'未'];}),styles:{fontSize:9},headStyles:{fillColor:[180,145,30]}});
    y=doc.lastAutoTable.finalY+8;
    if(y>180){doc.addPage();y=20;}
  }
  doc.save(`莊敬音樂科_${td}.pdf`);
  toast('PDF 已下載','ok');
}

function openDlg(title, bodyHtml, actions) {
  document.getElementById('dlgTitle').textContent = title;
  document.getElementById('dlgBody').innerHTML = bodyHtml;
  const acts = document.getElementById('dlgActs');
  acts.innerHTML = '';
  actions.forEach(a=>{
    const b=document.createElement('button');
    b.className='dlg-btn '+(a.cls||'');
    b.textContent=a.label;
    b.onclick=async()=>{ const r=await a.fn(); if(r!==false) closeDlg(); };
    acts.appendChild(b);
  });
  document.getElementById('dlgOverlay').classList.add('on');
  setTimeout(()=>{const f=document.querySelector('#dlgBody .dlg-input');if(f)f.focus();},100);
}

function closeDlg() { document.getElementById('dlgOverlay').classList.remove('on'); }

window.addEventListener('beforeunload', (e) => {
  if (me && me.role !== 'student' && Object.keys(pendAtt).length > 0) {
    e.preventDefault();
    e.returnValue = '您有未儲存的點名變更，離開將會遺失。';
  }
});

window.addEventListener('load', () => {
  db.ref('.info/connected').on('value', s=>{
    console.log(s.val()?'✅ Firebase 已連線':'⚠️ Firebase 離線');
  });
  if (typeof checkAuthSession === 'function') {
    checkAuthSession();
  } else {
    showScreen('loginScreen');
    const loader = document.getElementById('globalLoader');
    if (loader) loader.style.display = 'none';
  }
});

// ════════════════════════════════════════════════════════════════
// 動態班級 / 學生管理
// ════════════════════════════════════════════════════════════════

const BASE_CLASSES  = ["音三莊","演三莊","音二莊","演二樸","音一莊"];

// 從 Firebase 讀取自訂班級與學生，合併到全域變數
async function loadDynamicData() {
  try {
    // 自訂班級
    const extraCls = (await dbGet('customClasses')) || {};
    const extraClsNames = Object.values(extraCls).map(c=>c.name).filter(Boolean);
    CLASSES = [...BASE_CLASSES, ...extraClsNames.filter(n=>!BASE_CLASSES.includes(n))];

    // 自訂學生
    const extraStus = (await dbGet('customStudents')) || {};
    const extraStuArr = Object.entries(extraStus).map(([k,s])=>({...s, _fbKey:k}));
    // Remove existing custom students then re-add
    const baseIds = STUDENTS.filter(s=>!s._fbKey).map(s=>s.id);
    const basePart = STUDENTS.filter(s=>!s._fbKey);
    STUDENTS = [...basePart, ...extraStuArr.filter(s=>!baseIds.includes(s.id))];

    await loadCustomCardData();
    await applyCardTitleOverrides();
  } catch(e) {
    console.warn('loadDynamicData error:', e);
  }
}

// ── 管理子分頁切換 ──
let _mgmtStuCls = 'all';

function switchMgmt(tab) {
  ['teacher','class','student','card','reward'].forEach(t => {
    const btn   = document.getElementById(`mgmt${t.charAt(0).toUpperCase()+t.slice(1)}Btn`);
    const panel = document.getElementById(`mgmt${t.charAt(0).toUpperCase()+t.slice(1)}Panel`);
    const active = t === tab;
    if (btn) {
      btn.style.background  = active ? 'var(--gold)' : 'transparent';
      btn.style.color       = active ? '#000' : 'var(--tx2)';
      btn.style.fontWeight  = active ? 'bold' : 'normal';
    }
    if (panel) panel.style.display = active ? '' : 'none';
  });
  if (tab === 'class')   renderClassMgmt();
  if (tab === 'student') renderStudentMgmt();
  if (tab === 'card')    renderCardMgmt();
  if (tab === 'reward')  initRewardPanel();
}

// ══════════════
// 班級管理
// ══════════════
async function renderClassMgmt() {
  const c = document.getElementById('classList');
  if (!c) return;
  c.innerHTML = '';

  // Built-in classes
  BASE_CLASSES.forEach(cls => {
    const count = STUDENTS.filter(s=>s.cls===cls).length;
    const div = document.createElement('div');
    div.className = 'titem';
    div.innerHTML = `
      <div>
        <div class="ti-name">${cls} <span style="font-size:11px;padding:1px 7px;border-radius:8px;background:rgba(212,175,55,.15);color:var(--gold);margin-left:6px">內建</span></div>
        <div class="ti-cls">共 ${count} 位學生</div>
      </div>
      <button class="btn" onclick="switchMgmt('student');filterStuMgmt('${cls}')" style="font-size:11px">查看學生</button>`;
    c.appendChild(div);
  });

  // Custom classes
  const extraCls = (await dbGet('customClasses')) || {};
  Object.entries(extraCls).forEach(([k, cls]) => {
    const count = STUDENTS.filter(s=>s.cls===cls.name).length;
    const div = document.createElement('div');
    div.className = 'titem';
    div.innerHTML = `
      <div>
        <div class="ti-name">${cls.name}</div>
        <div class="ti-cls">共 ${count} 位學生 · 新增時間：${cls.createdAt||'—'}</div>
      </div>
      <div style="display:flex;gap:6px">
        <button class="btn" onclick="switchMgmt('student');filterStuMgmt('${cls.name}')" style="font-size:11px">查看學生</button>
        <button class="btn d" onclick="delClass('${k}','${cls.name}')">刪除</button>
      </div>`;
    c.appendChild(div);
  });

  if (!Object.keys(extraCls).length && !c.children.length) {
    c.innerHTML = '<div class="empty">尚無自訂班級</div>';
  }
}

function openAddClass() {
  openDlg('🏫 新增班級',
    `<div class="dlg-label">班級名稱</div>
     <input class="dlg-input" type="text" id="newClsName" placeholder="例：音樂實驗班、弦樂三甲">`,
    [{label:'新增',cls:'ok',fn:async()=>{
      const name = document.getElementById('newClsName').value.trim();
      if (!name) { toast('請填寫班級名稱','err'); return false; }
      if (CLASSES.includes(name)) { toast('班級名稱已存在','err'); return false; }
      const k = 'cls_'+Date.now();
      await dbSet(`customClasses/${k}`, {name, createdBy:me.name, createdAt:now()});
      toast(`班級「${name}」已新增`,'ok');
      await loadDynamicData();
      renderClassMgmt();
      return true;
    }},{label:'取消',fn:()=>true}]);
}

async function delClass(k, name) {
  const stuCount = STUDENTS.filter(s=>s.cls===name).length;
  openDlg(`🗑️ 刪除班級「${name}」`,
    `<div class="dlg-msg" style="color:var(--red)">確認刪除班級「${name}」？${stuCount>0?`<br><b>⚠️ 該班級尚有 ${stuCount} 位學生，請先移除或轉班。</b>`:''}</div>`,
    [{label:'確認刪除',cls:'del',fn:async()=>{
      if (stuCount > 0) { toast('請先移除該班級的所有學生','err'); return false; }
      await db.ref(`${ROOT}/customClasses/${k}`).remove();
      toast(`班級「${name}」已刪除`,'ok');
      await loadDynamicData();
      renderClassMgmt();
      buildClsBtns('clsBtns', switchCls);
      return true;
    }},{label:'取消',fn:()=>true}]);
}

// ══════════════
// 學生管理
// ══════════════
function filterStuMgmt(cls) {
  _mgmtStuCls = cls;
  document.querySelectorAll('#stuMgmtClsFilter .cls-filter-btn').forEach(b=>{
    b.style.background = b.dataset.cls===cls ? 'var(--gold)' : 'transparent';
    b.style.color = b.dataset.cls===cls ? '#000' : 'var(--tx2)';
  });
  renderStudentMgmt();
}

function renderStudentMgmt() {
  // Build class filter buttons
  const filterBar = document.getElementById('stuMgmtClsFilter');
  if (filterBar && !filterBar.children.length) {
    const allBtn = document.createElement('button');
    allBtn.className = 'btn cls-filter-btn';
    allBtn.dataset.cls = 'all';
    allBtn.textContent = '全部';
    allBtn.style.cssText = 'background:var(--gold);color:#000;font-weight:bold';
    allBtn.onclick = () => filterStuMgmt('all');
    filterBar.appendChild(allBtn);
    CLASSES.forEach(cls => {
      const b = document.createElement('button');
      b.className = 'btn cls-filter-btn';
      b.dataset.cls = cls;
      b.textContent = cls;
      b.onclick = () => filterStuMgmt(cls);
      filterBar.appendChild(b);
    });
  } else if (filterBar) {
    // Refresh filter buttons for new classes
    const existing = [...filterBar.querySelectorAll('.cls-filter-btn')].map(b=>b.dataset.cls);
    CLASSES.filter(c=>!existing.includes(c)).forEach(cls=>{
      const b = document.createElement('button');
      b.className = 'btn cls-filter-btn';
      b.dataset.cls = cls;
      b.textContent = cls;
      b.onclick = () => filterStuMgmt(cls);
      filterBar.appendChild(b);
    });
    filterBar.querySelectorAll('.cls-filter-btn').forEach(b=>{
      b.style.background = b.dataset.cls===_mgmtStuCls ? 'var(--gold)' : 'transparent';
      b.style.color = b.dataset.cls===_mgmtStuCls ? '#000' : 'var(--tx2)';
      b.style.fontWeight = b.dataset.cls===_mgmtStuCls ? 'bold' : 'normal';
    });
  }

  const list = document.getElementById('studentMgmtList');
  if (!list) return;

  const q = (document.getElementById('stuMgmtSearch')?.value||'').trim().toLowerCase();
  let stus = STUDENTS;
  if (_mgmtStuCls !== 'all') stus = stus.filter(s=>s.cls===_mgmtStuCls);
  if (q) stus = stus.filter(s=>s.name.toLowerCase().includes(q)||s.id.toLowerCase().includes(q));

  if (!stus.length) { list.innerHTML='<div class="empty">沒有符合的學生</div>'; return; }

  list.innerHTML = `
    <div style="font-size:12px;color:var(--tx3);margin-bottom:8px">共 ${stus.length} 位學生</div>
    ${stus.map(s=>`
      <div class="titem" style="margin-bottom:6px">
        <div>
          <div class="ti-name">${s.name} <span style="font-size:11px;color:var(--tx3)">${s.id}</span>
            ${s._fbKey?'<span style="font-size:10px;padding:1px 6px;border-radius:8px;background:rgba(46,204,113,.15);color:var(--green);margin-left:4px">自訂</span>':''}
          </div>
          <div class="ti-cls">${s.cls}</div>
        </div>
        <div style="display:flex;gap:6px;flex-wrap:wrap">
          <button class="btn" onclick="openEditStudent('${s.id}')" style="font-size:11px">✏️ 編輯</button>
          ${s._fbKey?`<button class="btn d" onclick="delStudent('${s._fbKey}','${s.name}')" style="font-size:11px">🗑️ 刪除</button>`:''}
        </div>
      </div>`).join('')}`;
}

function openAddStudent() {
  const clsOpts = CLASSES.map(c=>`<option value="${c}">${c}</option>`).join('');
  openDlg('🧑‍🎓 新增學生',
    `<div class="dlg-label">姓名</div>
     <input class="dlg-input" type="text" id="nStuName" placeholder="學生姓名">
     <div class="dlg-label">學號（唯一識別，例：M4-01）</div>
     <input class="dlg-input" type="text" id="nStuId" placeholder="例：M4-01">
     <div class="dlg-label">班級</div>
     <select class="dlg-input" id="nStuCls" style="width:100%;margin-bottom:12px">${clsOpts}</select>
     <div class="dlg-label">初始密碼（留空則為 0000）</div>
     <input class="dlg-input" type="text" id="nStuPw" placeholder="0000">`,
    [{label:'新增',cls:'ok',fn:async()=>{
      const name = document.getElementById('nStuName').value.trim();
      const id   = document.getElementById('nStuId').value.trim().toUpperCase();
      const cls  = document.getElementById('nStuCls').value;
      const pw   = document.getElementById('nStuPw').value.trim() || '0000';
      if (!name||!id) { toast('請填寫姓名與學號','err'); return false; }
      if (STUDENTS.find(s=>s.id===id)) { toast('此學號已存在','err'); return false; }
      if (STUDENTS.find(s=>s.name===name&&s.cls===cls)) { toast('同班已有同名學生','err'); return false; }
      const fbKey = 'stu_'+Date.now();
      // Write to custom students
      await dbSet(`customStudents/${fbKey}`, {id, name, cls, _fbKey:fbKey, createdBy:me.name, createdAt:now()});
      // Initialize student data with password
      await dbUpd(`students/${id}`, {password:pw});
      toast(`學生「${name}」已新增`,'ok');
      await loadDynamicData();
      renderStudentMgmt();
      buildClsBtns('clsBtns', switchCls);
      buildClsBtns('clsBtnsR', switchClsR);
      return true;
    }},{label:'取消',fn:()=>true}]);
}

function openEditStudent(stuId) {
  const stu = STUDENTS.find(s=>s.id===stuId);
  if (!stu) return;
  const clsOpts = CLASSES.map(c=>`<option value="${c}"${c===stu.cls?' selected':''}>${c}</option>`).join('');
  openDlg(`✏️ 編輯學生「${stu.name}」`,
    `<div class="dlg-label">姓名</div>
     <input class="dlg-input" type="text" id="eStuName" value="${stu.name}" ${stu._fbKey?'':'readonly style="opacity:.5"'}>
     <div class="dlg-label">學號</div>
     <input class="dlg-input" type="text" id="eStuId" value="${stu.id}" readonly style="opacity:.5">
     <div class="dlg-label">班級${stu._fbKey?'':' （內建學生班級不可修改）'}</div>
     <select class="dlg-input" id="eStuCls" style="width:100%;margin-bottom:12px" ${stu._fbKey?'':'disabled'}>${clsOpts}</select>
     <div class="dlg-label" style="margin-top:4px">重置密碼（留空不變）</div>
     <input class="dlg-input" type="text" id="eStuPw" placeholder="留空=不修改">`,
    [{label:'儲存',cls:'ok',fn:async()=>{
      const pw = document.getElementById('eStuPw').value.trim();
      const upd = {};
      if (stu._fbKey) {
        const newName = document.getElementById('eStuName').value.trim();
        const newCls  = document.getElementById('eStuCls').value;
        if (!newName) { toast('姓名不能為空','err'); return false; }
        upd[`${ROOT}/customStudents/${stu._fbKey}/name`] = newName;
        upd[`${ROOT}/customStudents/${stu._fbKey}/cls`]  = newCls;
        await db.ref('/').update(upd);
      }
      if (pw) await dbUpd(`students/${stu.id}`, {password:pw});
      toast('學生資料已更新','ok');
      await loadDynamicData();
      renderStudentMgmt();
      return true;
    }},{label:'取消',fn:()=>true}]);
}

async function delStudent(fbKey, name) {
  openDlg(`🗑️ 刪除學生「${name}」`,
    `<div class="dlg-msg" style="color:var(--red)">確認刪除學生「${name}」？<br>
     <label style="font-size:13px;color:var(--tx2);display:block;margin-top:10px">
       <input type="checkbox" id="delStuData" style="margin-right:6px"> 同時清除該生所有成績資料
     </label></div>`,
    [{label:'確認刪除',cls:'del',fn:async()=>{
      const clearData = document.getElementById('delStuData')?.checked;
      const stu = STUDENTS.find(s=>s._fbKey===fbKey);
      await db.ref(`${ROOT}/customStudents/${fbKey}`).remove();
      if (clearData && stu) {
        await db.ref(`${ROOT}/students/${stu.id}`).remove();
        await db.ref(`${ROOT}/stuMsgs/${stu.id}`).remove();
      }
      toast(`學生「${name}」已刪除`,'ok');
      await loadDynamicData();
      renderStudentMgmt();
      buildClsBtns('clsBtns', switchCls);
      buildClsBtns('clsBtnsR', switchClsR);
      return true;
    }},{label:'取消',fn:()=>true}]);
}

// ════════════════════════════════════════════════════════════════
// 抽卡系統
// ════════════════════════════════════════════════════════════════

const CARD_DB = [
  {id:'C01',name:'旭成',rarity:'R',   img:'CARDS/旭成R.jpg',             title:'班級巡堂員', quote:'先把基本動作做好。'},
  {id:'C02',name:'倩宇',rarity:'R',   img:'CARDS/倩宇R_結果.jpg',       title:'法國號導師', quote:'先把嘴型站穩，再談音量。'},
  {id:'C03',name:'倩宇',rarity:'SR',  img:'CARDS/倩宇SR_結果.jpg',      title:'銅管首席', quote:'每一個進拍點都要更乾淨。'},
  {id:'C04',name:'倩宇',rarity:'SSR', img:'CARDS/倩宇SSR_結果.jpg',     title:'法國號聲部統籌', quote:'音色一致，合奏才會亮。'},
  {id:'C05',name:'賴惠文',rarity:'SR',  img:'CARDS/校長SR_結果.jpg',      title:'親民校長', quote:'把秩序做好，學習才會穩。'},
  {id:'C06',name:'賴惠文',rarity:'SSR', img:'CARDS/校長SSR_結果.jpg',     title:'校務總籌', quote:'團隊一穩，聲音就會站起來。'},
  {id:'C07',name:'賴惠文',rarity:'UR',  img:'CARDS/校長UR_結果.jpg',      title:'莊敬大家長', quote:'今天的標準，要比昨天更整齊。'},
  {id:'C08',name:'國霖',rarity:'SR',  img:'CARDS/國霖SR_結果.jpg',      title:'單簧管大師', quote:'音準站穩，整段就會發光。'},
  {id:'C09',name:'康榮',rarity:'SSR', img:'CARDS/康榮SSR_結果.jpg',     title:'音樂總監', quote:'你們的聲音，要有同一個方向。'},
  {id:'C10',name:'曉萱',rarity:'R',   img:'CARDS/曉萱R_結果.jpg',       title:'低音管導師', quote:'低音穩住，全團才有地板。'},
  {id:'C11',name:'曉萱',rarity:'SR',  img:'CARDS/曉萱SR_結果.jpg',      title:'低音管精靈', quote:'低音不是背景，是支撐。'},
  {id:'C12',name:'旭成',rarity:'SR',  img:'CARDS/旭成SR_結果_結果.jpg', title:'班級經營講師', quote:'上課不要看手機。'},
  {id:'C13',name:'國霖',rarity:'SSR', img:'CARDS/國霖SR_結果.jpg',      title:'木管聲部統籌', quote:'音色先站穩，技巧自然跟上。'},
  {id:'C14',name:'康榮',rarity:'SR',  img:'CARDS/康榮SSR_結果.jpg',     title:'合奏協調', quote:'每個聲部都要知道自己的位置。'},
  {id:'C15',name:'曉萱',rarity:'SSR', img:'CARDS/曉萱SR_結果.jpg',      title:'低音域守護者', quote:'低音站穩，樂團才會穩。'},
  {id:'C16',name:'旭成',rarity:'SSR', img:'CARDS/旭成ssr2.jpg',         title:'學務協調長', quote:'規矩站穩，班級就會穩。'},
  {id:'C17',name:'師丈',rarity:'SR',  img:'CARDS/師丈SR.jpg',            title:'校務後援', quote:'有需要幫忙就先把流程理清楚。'},
  {id:'C18',name:'華翊',rarity:'SR',  img:'CARDS/華翊R.jpg',             title:'英文老師｜音二莊導師', quote:'語言是看世界的另一種節奏。'},
  {id:'C19',name:'辛巴',rarity:'R',   img:'CARDS/辛巴.jpg',              title:'校長與師丈的狗', quote:'今天也要巡邏辦公室。'},
  {id:'C20',name:'槓龜',rarity:'R',   img:'CARDS/槓龜.jpg',              title:'音二莊限定卡', quote:'沒中獎也是一種回憶。'},
];
// ════════════════════════════════════════════════════════════════
// 班級專屬獎品設定
// ════════════════════════════════════════════════════════════════
let classRewardsCache = {};

const DEFAULT_CLASS_REWARDS = {
  bronze:  '點數3點',
  silver:  '免死金牌1面',
  gold:    '免死金牌2面',
  diamond: '泡麵1份',
  legend:  '飲料1杯',
};

const CLASS_REWARD_TEACHERS = {
  '音一莊':'國霖',
  '音三莊':'旭成',
  '演三莊':'曉萱',
  '音二莊':'華翊',
  '演二樸':'班導師',
};

function getRewardOwnerLabel(clsName) {
  return CLASS_REWARD_TEACHERS[clsName] || '班導師';
}

function isTopTierReward(tier) {
  return false;
}

async function loadAllClassRewards() {
  try {
    const data = await dbGet('classRewards') || {};
    classRewardsCache = data;
  } catch(e) {
    console.warn('loadAllClassRewards error:', e);
    classRewardsCache = {};
  }
}

function getClassReward(clsName, tier) {
  const clsData = classRewardsCache[clsName.replace(/\//g,'_')] || {};
  return formatRewardConfig(toRewardConfig(clsData[tier] || DEFAULT_CLASS_REWARDS[tier], tier));
}

function parseQtyToken(text) {
  const s = String(text || '');
  const num = s.match(/([1-5])/);
  if (num) return Number(num[1]);
  const zh = s.match(/[一二兩三四五]/);
  if (!zh) return 1;
  const map = { '一':1, '二':2, '兩':2, '三':3, '四':4, '五':5 };
  return map[zh[0]] || 1;
}

function normalizeRewardConfig(cfg, tier) {
  const type = (cfg?.type === 'medal' || cfg?.type === 'physical' || cfg?.type === 'points') ? cfg.type : 'points';
  const qty = Math.max(1, Math.min(5, Number(cfg?.qty || 1) || 1));
  const item = cfg?.item === 'drink' ? 'drink' : 'noodle';
  if (type !== 'physical') return { type, qty };
  return { type, qty, item };
}

function formatRewardConfig(cfg) {
  const c = normalizeRewardConfig(cfg || {});
  if (c.type === 'points') return `點數${c.qty}點`;
  if (c.type === 'medal') return `免死金牌${c.qty}面`;
  return c.item === 'drink' ? `飲料${c.qty}杯` : `泡麵${c.qty}份`;
}

function toRewardConfig(raw, tier) {
  if (raw && typeof raw === 'object' && !Array.isArray(raw)) {
    return normalizeRewardConfig(raw, tier);
  }
  const text = String(raw || '').trim();
  if (!text) return toRewardConfig(DEFAULT_CLASS_REWARDS[tier] || '', tier);
  if (/(免死金牌|金牌)/.test(text)) {
    return normalizeRewardConfig({ type:'medal', qty:parseQtyToken(text) }, tier);
  }
  if (/點數|點/.test(text)) {
    return normalizeRewardConfig({ type:'points', qty:parseQtyToken(text) }, tier);
  }
  if (/泡麵|麵/.test(text)) {
    return normalizeRewardConfig({ type:'physical', item:'noodle', qty:parseQtyToken(text) }, tier);
  }
  if (/飲料|手搖|奶茶/.test(text)) {
    return normalizeRewardConfig({ type:'physical', item:'drink', qty:parseQtyToken(text) }, tier);
  }
  return normalizeRewardConfig({ type:'points', qty:1 }, tier);
}

function onRewardTypeChange(tier) {
  const typeEl = document.getElementById(`reward_type_${tier}`);
  const itemEl = document.getElementById(`reward_item_${tier}`);
  if (!typeEl || !itemEl) return;
  itemEl.style.display = typeEl.value === 'physical' ? '' : 'none';
}
// ── 自訂卡片/羈絆（必須在 generateDynamicBonds 之前宣告）──
let _customCards = [];
let _customBonds = [];

const CARD_IMAGE_ROOTS = [
  'C:/Users/pigjo/Desktop/CARDS',
  'C:/Users/pigjo/Desktop/CARD',
  'C:/Users/pigjo/Downloads/CARDS',
];

function resolveCardImagePath(img) {
  if (!img) return '';
  const normalized = img.replace(/\\/g, '/').trim();
  if (/^(https?:|data:)/i.test(normalized)) return normalized;
  const isLocalFile = location.protocol === 'file:';
  const toRepoCardPath = (pathLike) => {
    const m = pathLike.match(/(?:^|\/)(?:CARD|CARDS)\/([^/?#]+)$/i);
    return m ? ('CARDS/' + decodeURIComponent(m[1])) : '';
  };
  if (/^file:\/\/\//i.test(normalized)) {
    if (isLocalFile) return normalized;
    const mapped = toRepoCardPath(normalized);
    return mapped || '';
  }
  if (/^[A-Za-z]:\//.test(normalized)) {
    const mapped = toRepoCardPath(normalized);
    return mapped || (isLocalFile ? encodeURI('file:///' + normalized) : '');
  }
  if (normalized.startsWith('CARDS/')) {
    return isLocalFile
      ? encodeURI('file:///' + CARD_IMAGE_ROOTS[0] + '/' + normalized.replace(/^CARDS\//, ''))
      : normalized;
  }
  if (normalized.startsWith('CARD/')) {
    return isLocalFile
      ? encodeURI('file:///' + CARD_IMAGE_ROOTS[1] + '/' + normalized.replace(/^CARD\//, ''))
      : normalized.replace(/^CARD\//, 'CARDS/');
  }
  return normalized;
}

function getCardImageSrc(card) {
  return resolveCardImagePath(card?.img || '');
}

// ── 稀有度機率（總和 100） ──
const RARITY_WEIGHT = {UR:2, SSR:13, SR:40, R:45};

// ── 動態生成羈絆清單 ──
let DYNAMIC_BONDS = [];

function generateDynamicBonds() {
  const bonds = [];
  const rewardText = {
    bronze: `系統數位兌換：${DEFAULT_CLASS_REWARDS.bronze}`,
    silver: `系統數位兌換：${DEFAULT_CLASS_REWARDS.silver}`,
    gold: `系統數位兌換：${DEFAULT_CLASS_REWARDS.gold}`,
    diamond: '需找老師兌換：藍鑽徽章',
    legend: '需找老師兌換：傳說徽章',
  };
  const pushBond = bond => {
    const allExist = (bond.needs||[]).every(id => CARD_DB.some(c => c.id === id));
    if (!allExist) return;
    bonds.push({
      ...bond,
      reward: bond.reward || rewardText[bond.tier] || '待設定',
    });
  };

  const specialistBondMeta = {
    '旭成': { id:'BOND_XUCHENG_TRACK', name:'行政節奏統籌', emoji:'🗂️', tier:'gold', desc:'集齊旭成老師的全部卡片，完成班級經營與行政節奏配置。' },
    '倩宇': { id:'BOND_QIANYU_TRACK', name:'法國號聲部全修', emoji:'🎺', tier:'gold', desc:'集齊倩宇老師的全部卡片，完成法國號教學線。' },
    '賴惠文': { id:'BOND_PRINCIPAL_TRACK', name:'校務核心全修', emoji:'🎻', tier:'legend', desc:'集齊賴惠文校長的全部卡片，完成校務主線配置。' },
    '國霖': { id:'BOND_GUOLIN_TRACK', name:'單簧管聲線全修', emoji:'🎶', tier:'gold', desc:'集齊王國霖老師的全部卡片，完成單簧管聲線鍛鍊。' },
    '康榮': { id:'BOND_KANGRONG_TRACK', name:'合奏指揮全修', emoji:'🎼', tier:'gold', desc:'集齊康榮老師的全部卡片，完成合奏指揮主線。' },
    '曉萱': { id:'BOND_XIAOXUAN_TRACK', name:'低音管聲域全修', emoji:'🪵', tier:'gold', desc:'集齊曉萱老師的全部卡片，完成低音管聲域培養。' },
    '華翊': { id:'BOND_HUAYI_TRACK', name:'語言教學核心', emoji:'📚', tier:'silver', desc:'華翊老師穩定英文教學節奏，打造音二莊語文力。' },
    '辛巴': { id:'BOND_SIMBA_TRACK', name:'校園療癒巡邏', emoji:'🐶', tier:'silver', desc:'辛巴出勤，校園氣氛與士氣同步提升。' },
  };

  Object.entries(specialistBondMeta).forEach(([name, meta]) => {
    const cards = CARD_DB.filter(c => c.name === name);
    if (cards.length < 1) return;
    pushBond({
      ...meta,
      needs: cards.map(c => c.id),
    });
  });

  [
    { id:'BOND_CLASSROOM_STARTER', name:'教室暖身組', emoji:'🧩', tier:'bronze', needs:['C01','C02'], desc:'旭成與倩宇的基礎搭配，完成日常課堂暖身。' },
    { id:'BOND_FOUNDATION_STEP', name:'基礎起手式', emoji:'🪜', tier:'bronze', needs:['C10','C11'], desc:'曉萱 R 與 SR 的基礎連線，建立低音域起手節奏。' },
    { id:'BOND_ROOKIE_WOODWIND', name:'木管新手連線', emoji:'🎐', tier:'bronze', needs:['C08','C10'], desc:'國霖與曉萱的入門卡組，建立木管基礎穩定度。' },
    { id:'BOND_DAILY_DISCIPLINE', name:'日常秩序組', emoji:'📝', tier:'bronze', needs:['C01','C05'], desc:'旭成與賴惠文共同維持班級日常秩序。' },
    { id:'BOND_CAMPUS_HELPERS', name:'校園支援小隊', emoji:'🧰', tier:'bronze', needs:['C12','C17'], desc:'旭成 SR 與師丈協作，補齊校園日常支援。' },
    { id:'BOND_SUPPORT_PAIR', name:'教學支援雙人組', emoji:'🤝', tier:'silver', needs:['C10','C14'], desc:'曉萱與康榮形成日常教學支援組合。' },
    { id:'BOND_CLASS_OPERATIONS', name:'班務協作線', emoji:'🗂️', tier:'silver', needs:['C01','C14'], desc:'旭成與康榮串接班務管理與合奏協調。' },
    { id:'BOND_ADMIN_DUO', name:'行政雙雄', emoji:'🏛️', tier:'gold', needs:['C16','C09'], desc:'旭成與康榮組成行政與音樂執行雙核心。' },
    { id:'BOND_POWER_COUPLE', name:'夫妻檔', emoji:'💍', tier:'diamond', needs:['C07','C17'], desc:'賴惠文校長與師丈同時到位，形成校務後援與行政協調的夫妻組合。' },
    { id:'BOND_BRASS_CHAIN', name:'銅管教學鏈', emoji:'🎺', tier:'silver', needs:['C02','C03','C04'], desc:'由倩宇老師串起法國號入門到聲部統籌的完整教學線。' },
    { id:'BOND_LOW_REGISTER_GUARDIANS', name:'低音域守護者', emoji:'🧱', tier:'gold', needs:['C10','C11','C15'], desc:'曉萱老師從基礎到高階，完整守住樂團低音域。' },
    { id:'BOND_WOODWIND_AXIS', name:'木管低音軸線', emoji:'🎷', tier:'silver', needs:['C13','C15'], desc:'國霖與曉萱共同構成木管聲部的中低音支撐。' },
    { id:'BOND_STAGE_COMMAND', name:'合奏指揮中樞', emoji:'🎼', tier:'diamond', needs:['C06','C09','C13'], desc:'賴惠文、康榮與國霖形成校務、指揮與木管統籌的核心中樞。' },
    { id:'BOND_CAMPUS_ROUTINE', name:'校園教學主軸', emoji:'🏫', tier:'silver', needs:['C12','C05','C10'], desc:'由旭成、賴惠文與曉萱構成日常教學與行政支撐。' },
    { id:'BOND_CONDUCTING_TEAM', name:'合奏運作小組', emoji:'🎙️', tier:'silver', needs:['C09','C14'], desc:'康榮的兩張卡片組成合奏運作與協調小組。' },
    { id:'BOND_HOMEROOM_CORE', name:'班級經營核心', emoji:'📘', tier:'gold', needs:['C01','C12','C16'], desc:'集齊旭成的 R、SR、SSR 三張卡，完成班級經營完整線。' },
    { id:'BOND_ADMIN_SUPPORT', name:'行政後援組', emoji:'🧾', tier:'silver', needs:['C17','C16'], desc:'師丈與旭成共同維持行政後援與班級秩序。' },
    { id:'BOND_ENSEMBLE_CORE', name:'管樂教學核心', emoji:'🎵', tier:'gold', needs:['C04','C13','C15'], desc:'倩宇、國霖、曉萱組成完整的管樂教學核心。' },
    { id:'BOND_GRAND_REUNION', name:'莊敬大團圓', emoji:'🌟', tier:'legend', needs:['C16','C04','C07','C13','C09','C15','C17'], desc:'集齊所有老師最高階卡片各一張，完成莊敬音樂科終極陣容。' },
    { id:'BOND_MENTOR_TRIANGLE', name:'三莊導師聯盟', emoji:'🏫', tier:'gold', needs:['C16','C13','C18'], desc:'旭成（音三莊）、國霖（音一莊）、華翊（音二莊）導師連線完成。' },
    { id:'BOND_LANGUAGE_AXIS', name:'語文雙核', emoji:'🈶', tier:'silver', needs:['C16','C18'], desc:'國文老師旭成與英文老師華翊形成語文教學雙核心。' },
    { id:'BOND_SIMBA_PRINCIPAL', name:'校長與辛巴', emoji:'🐾', tier:'silver', needs:['C19','C07'], desc:'辛巴與校長同框，校務室幸福指數上升。' },
    { id:'BOND_SIMBA_SHIZHANG', name:'師丈與辛巴', emoji:'🧸', tier:'silver', needs:['C19','C17'], desc:'師丈與辛巴組成校園後援療癒組。' },
    { id:'BOND_SIMBA_FAMILY', name:'辛巴全家福', emoji:'👨‍👩‍👧‍👦', tier:'diamond', needs:['C19','C07','C17'], desc:'辛巴、校長、師丈三人同時到位，觸發校園最強療癒羈絆。' },
  ].forEach(pushBond);

  if (typeof _customBonds !== 'undefined') {
    _customBonds.forEach(b => {
      const allExist = (b.needs||[]).every(id => CARD_DB.some(c=>c.id===id));
      if (allExist && !bonds.some(x=>x.id===b.id)) bonds.push(b);
    });
  }

  const tierOrder = { bronze:1, silver:2, gold:3, diamond:4, legend:5 };
  const getTierForSort = (bond) => {
    const t = (bond && typeof bond.tier === 'string') ? bond.tier : '';
    return tierOrder[t] ? t : 'gold';
  };
  DYNAMIC_BONDS = bonds.sort((a, b) => {
    const ta = tierOrder[getTierForSort(a)] || 99;
    const tb = tierOrder[getTierForSort(b)] || 99;
    if (ta !== tb) return ta - tb;
    return (a.name || '').localeCompare((b.name || ''), 'zh-Hant');
  });
  return DYNAMIC_BONDS;
}
// 在卡庫載入後立即生成
generateDynamicBonds();

let isOpening = false;
let _pendingCard = null;

// ══════════════════════════════════════════════════════════════
// 保底機制（Pity System）：連續未抽中 SSR/UR 達 7 次強制給出
// Firebase 路徑：students/{id}/pityCount
// ══════════════════════════════════════════════════════════════
const PITY_THRESHOLD = 7;

// 更新保底進度條 UI
function _updatePityUI(count) {
  const fill = document.getElementById('pityFill');
  const text = document.getElementById('pityText');
  if (!fill || !text) return;
  const pct = Math.min(100, (count / PITY_THRESHOLD) * 100);
  fill.style.width = pct + '%';
  fill.className = 'pity-fill' + (count >= 8 ? ' danger' : '');
  text.textContent = count + ' / ' + PITY_THRESHOLD;
}

// ── 抽卡邏輯：動態卡池 + 保底機制 ──
const CLASS_LOCKED_CARD_IDS = {
  '音二莊': ['C20'],
};

function filterPoolByClass(pool, stuClass) {
  if (!Array.isArray(pool) || !pool.length) return pool || [];
  const onlyForCls = CLASS_LOCKED_CARD_IDS['音二莊'] || [];
  if (stuClass === '音二莊') return pool;
  return pool.filter(card => !onlyForCls.includes(card.id));
}

function drawCard(pityCount, stuClass) {
  // 達到保底門檻：強制 SSR（從所有 SSR+UR 中隨機）
  if (pityCount >= PITY_THRESHOLD) {
    let pool = filterPoolByClass(CARD_DB.filter(c => c.rarity === 'SSR' || c.rarity === 'UR'), stuClass);
    if (!pool.length) pool = CARD_DB;
    return { card: pool[Math.floor(Math.random() * pool.length)], pityTriggered: true };
  }

  const roll = Math.random() * 100;
  const thUR  = RARITY_WEIGHT.UR;
  const thSSR = thUR + RARITY_WEIGHT.SSR;
  const thSR  = thSSR + RARITY_WEIGHT.SR;

  let rarity;
  if      (roll < thUR)  rarity = 'UR';
  else if (roll < thSSR) rarity = 'SSR';
  else if (roll < thSR)  rarity = 'SR';
  else                   rarity = 'R';

  let pool = filterPoolByClass(CARD_DB.filter(c => c.rarity === rarity), stuClass);
  if (!pool.length && rarity === 'UR')  pool = filterPoolByClass(CARD_DB.filter(c => c.rarity === 'SSR'), stuClass);
  if (!pool.length && rarity === 'SSR') pool = filterPoolByClass(CARD_DB.filter(c => c.rarity === 'SR'), stuClass);
  if (!pool.length && rarity === 'SR')  pool = filterPoolByClass(CARD_DB.filter(c => c.rarity === 'R'), stuClass);
  if (!pool.length) pool = filterPoolByClass(CARD_DB, stuClass);
  return { card: pool[Math.floor(Math.random() * pool.length)], pityTriggered: false };
}

// ── 重置卡包狀態 ──
function _resetPackState() {
  isOpening = false;
  _pendingCard = null;
  const box = document.getElementById('packBox');
  if (box) { box.classList.remove('shaking'); box.style.pointerEvents = ''; }
}

async function openCardPack() {
  if (!_currentStuId) { toast('請先以學生帳號登入', 'err'); return; }
  await loadCustomCardData();
  await applyCardTitleOverrides();
  _resetPackState();
  dbGet('students/' + _currentStuId).then(function(d) {
    _updatePityUI(Number(d?.pityCount) || 0);
    const label = document.getElementById('packCostLabel');
    if (label) {
      const tickets = Number(d?.packTickets || 0);
      label.textContent = tickets > 0
        ? `今日可用卡包 ${tickets} 包，將優先消耗卡包`
        : '消耗 1 顆 ⭐ 開啟卡包';
    }
  });
  document.getElementById('packWrap').style.display = 'flex';
  document.getElementById('cardRevealWrap').classList.remove('on');
  document.getElementById('cardOverlay').classList.add('on');
}

function closeCardOverlay() {
  if (isOpening) return;
  _resetPackState();
  document.getElementById('cardOverlay').classList.remove('on');
}

async function triggerPackOpen() {
  if (isOpening) return;
  if (!_currentStuId) return;

  const box = document.getElementById('packBox');
  box.style.pointerEvents = 'none';

  try {
    // 抽卡開關
    const sysEnabled = await Promise.race([
      dbGet('cardSystemEnabled'),
      new Promise(r => setTimeout(() => r(null), 2000))
    ]);
    if (sysEnabled === false) {
      toast('🔒 抽卡系統目前已關閉，請等待老師開放', 'err');
      box.style.pointerEvents = '';
      return;
    }

    // 讀取點數 + 卡包券 + 保底計數
    const d = await dbGet('students/' + _currentStuId);
    const pts = Number(d && d.points != null ? d.points : 0);
    const packTickets = Number(d && d.packTickets != null ? d.packTickets : 0);
    const usePackTicket = packTickets > 0;
    if (!usePackTicket && pts < 1) {
      toast('⭐ 點數不足（目前 ' + pts + ' 點），無法開卡包', 'err');
      box.style.pointerEvents = '';
      return;
    }

    const currentPity = Number(d.pityCount) || 0;

    isOpening = true;
    box.classList.add('shaking');

    // 抽卡（含保底判斷）
    const stuClass = byId(_currentStuId)?.cls || '';
    const { card, pityTriggered } = drawCard(currentPity, stuClass);
    _pendingCard = card;

    // 計算新保底計數
    const isHighRarity = (card.rarity === 'SSR' || card.rarity === 'UR');
    const newPity = isHighRarity ? 0 : currentPity + 1;

    const lk = Date.now() + '';
    const logReason = pityTriggered
      ? '【保底觸發】抽到 ' + card.rarity + ' ' + card.name
      : '抽到 ' + card.rarity + ' ' + card.name;

    await dbUpd('students/' + _currentStuId, {
      points: usePackTicket ? pts : (pts - 1),
      packTickets: usePackTicket ? (packTickets - 1) : packTickets,
      pityCount: newPity,
      ['log/' + lk]: {
        time: now(),
        action: '開啟卡包',
        reason: `${usePackTicket ? '使用卡包券' : '消耗 1 點數'} · ${logReason}`,
        teacher: '系統',
        delta: usePackTicket ? 0 : -1
      }
    });

    // 更新進度條 UI（顯示抽後的保底值）
    _updatePityUI(newPity);

    setTimeout(function() {
      document.getElementById('packWrap').style.display = 'none';
      revealCard(card, pityTriggered);
    }, 1400);

  } catch(e) {
    console.error('triggerPackOpen error:', e);
    toast('抽卡失敗，請重試', 'err');
    _resetPackState();
  }
}

function revealCard(card, pityTriggered) {
  var rarityColors = { R: '#3498DB', SR: '#9B59B6', SSR: '#D4AF37', UR: '#FF6B6B' };
  var rarityGlow   = { R: '', SR: '', SSR: '✨ SSR ✨', UR: '🌟 UR 🌟' };

  // 重置動畫：移除再加回 card-3d 強制重播 pop-in
  var card3d = document.getElementById('card3d');
  var inner  = document.getElementById('cardInner');
  card3d.className = '';
  void card3d.offsetWidth; // reflow
  card3d.className = 'card-3d rarity-' + card.rarity;

  document.getElementById('cardRevealImg').src = getCardImageSrc(card);
  document.getElementById('cardRevealBadge').textContent = card.rarity;
  document.getElementById('cardRevealName').textContent = card.name;
  document.getElementById('cardRevealTitle').textContent = card.title;

  var glowText = rarityGlow[card.rarity] || card.rarity;
  if (pityTriggered) glowText = '🌈 保底！' + glowText;
  document.getElementById('cardRevealRarity').textContent = glowText;
  document.getElementById('cardRevealRarity').style.color = rarityColors[card.rarity] || '#fff';

  var msg = pityTriggered ? `🌈 第${PITY_THRESHOLD}抽保底觸發！` :
            card.rarity === 'UR'  ? '🎉 恭喜！超稀有 UR 卡！' :
            card.rarity === 'SSR' ? '✨ 太棒了！SSR 稀有卡！' :
            card.rarity === 'SR'  ? `👍 SR 卡，不錯喔！${card.quote ? '「'+card.quote+'」' : ''}` :
            (card.quote ? `「${card.quote}」` : '');
  document.getElementById('cardRevealMsg').textContent = msg;
  document.getElementById('cardRevealWrap').classList.add('on');
}

async function collectCard() {
  if (!_pendingCard || !_currentStuId) {
    _resetPackState();
    document.getElementById('cardOverlay').classList.remove('on');
    return;
  }
  var card = _pendingCard;
  try {
    var invPath = 'students/' + _currentStuId + '/inventory/' + card.id;
    var cur = (await dbGet(invPath)) || 0;
    await dbSet(invPath, cur + 1);
    // 寫入 NEW 標記
    await dbSet('students/' + _currentStuId + '/newCards/' + card.id, Date.now());
    toast('已收下 ' + card.rarity + ' ' + card.name + '！', 'ok');
  } catch(e) {
    toast('儲存失敗，請重試', 'err');
  } finally {
    _resetPackState();
    document.getElementById('cardOverlay').classList.remove('on');
    var stu = byId(_currentStuId);
    if (stu) {
      dbGet('students/' + _currentStuId).then(function(d) {
        _renderStuView(stu, d || {});
      });
    }
  }
}

// 清除某張卡的 NEW 標記
async function clearNewCard(cardId) {
  if (!_currentStuId) return;
  await db.ref(ROOT + '/students/' + _currentStuId + '/newCards/' + cardId).remove();
  // 移除 DOM 上的 NEW 標籤
  var badge = document.getElementById('new-badge-' + cardId);
  if (badge) {
    badge.style.animation = 'none';
    badge.style.opacity = '0';
    badge.style.transform = 'scale(0)';
    badge.style.transition = 'all .2s';
    setTimeout(function() { if (badge.parentNode) badge.parentNode.removeChild(badge); }, 200);
  }
}
// ── 卡片放大預覽 ──
function openCardZoom(card, count, isNew) {
  const rarityBadgeBg = {
    R:   'rgba(52,152,219,.85)',
    SR:  'rgba(155,89,182,.85)',
    SSR: 'rgba(212,175,55,.92)',
    UR:  'linear-gradient(135deg,#ff6b6b,#ffd700)',
  };
  const rarityBadgeColor = { R:'#fff', SR:'#fff', SSR:'#000', UR:'#000' };

  // 卡片圖片
  document.getElementById('zoomCardImg').src = getCardImageSrc(card);

  // 稀有度徽章
  const badge = document.getElementById('zoomCardBadge');
  badge.textContent = card.rarity;
  badge.style.background = rarityBadgeBg[card.rarity] || 'rgba(100,100,100,.8)';
  badge.style.color = rarityBadgeColor[card.rarity] || '#fff';

  // NEW 標記
  document.getElementById('zoomCardNew').style.display = isNew ? '' : 'none';

  // 資訊列
  document.getElementById('zoomCharName').textContent = card.name;
  document.getElementById('zoomCharTitle').textContent = card.quote ? `${card.title}｜「${card.quote}」` : card.title;
  document.getElementById('zoomCountBadge').textContent =
    count > 1 ? `擁有 ${count} 張` : '擁有 1 張';

  // 設定 rarity class 給光暈效果
  const wrap = document.getElementById('zoomCardWrap');
  wrap.className = 'zoom-card-wrap rarity-' + card.rarity;

  // 強制重播 pop-in 動畫
  void wrap.offsetWidth;
  wrap.style.animation = 'none';
  void wrap.offsetWidth;
  wrap.style.animation = '';

  document.getElementById('cardZoomOverlay').classList.add('on');
}

function closeCardZoom() {
  document.getElementById('cardZoomOverlay').classList.remove('on');
}




// ── 背包 ──
async function openBag() {
  if (!_currentStuId) { toast('請先登入','err'); return; }
  await loadCustomCardData();
  await applyCardTitleOverrides();
  generateDynamicBonds(); // 每次開啟重新計算，確保卡庫更新後同步
  document.getElementById('bagOverlay').classList.add('on');
  await renderBag();
}

function closeBag() {
  document.getElementById('bagOverlay').classList.remove('on');
}

// 判斷稀有度連線羈絆是否達成（任意N張不同）
function checkRarityBond(bond, inv) {
  if (!bond.rarityPool) return false;
  const pool = CARD_DB.filter(c => c.rarity === bond.rarityPool);
  const have = pool.filter(c => (inv[c.id]||0) >= 1);
  return have.length >= bond.rarityCount;
}

// 取得稀有度連線羈絆消耗的卡片（前N張已擁有的）
function getRarityBondCards(bond, inv) {
  const pool = CARD_DB.filter(c => c.rarity === bond.rarityPool);
  return pool.filter(c => (inv[c.id]||0) >= 1).slice(0, bond.rarityCount);
}

async function renderBag() {
  const inv = (await dbGet(`students/${_currentStuId}/inventory`)) || {};
  const totalCards = Object.values(inv).reduce((a,b)=>a+(b||0),0);
  const stuData = await dbGet(`students/${_currentStuId}`);
  const bondMedals = stuData?.bondMedals || 0;
  const featuredCardId = stuData?.featuredCardId || '';
  document.getElementById('bagSubtitle').textContent = `收藏 ${totalCards} 張卡片 · 大型羈絆徽章 ${bondMedals} 枚`;
  const medalCountEl = document.getElementById('bagMedalCount');
  const medalBtn = document.getElementById('bagMedalRedeemBtn');
  const allBadgesData = stuData?.unredeemedBadges || {};
  const oldClaimed    = stuData?.claimedBonds || {};
  const digitalRewards = Object.values(stuData?.digitalRewards || {});

  const oldEntries = Object.entries(oldClaimed)
    .filter(([bondId]) => !allBadgesData[bondId])
    .map(([bondId, claimedAt]) => {
      const bond = DYNAMIC_BONDS.find(b=>b.id===bondId);
      if (!bond) return null;
      const tier = getBondTier(bond);
      if (!isManualBondTier(tier)) return null;
      return [bondId, {
        bondId, bondName: bond.name, tier,
        tierName: (TIER_INFO[tier]||TIER_INFO.bronze).name,
        claimedAt: typeof claimedAt === 'string' ? claimedAt : new Date(claimedAt).toLocaleString('zh-TW'),
        redeemed: false, _legacy: true
      }];
    }).filter(Boolean);

  const allEntries = [...Object.entries(allBadgesData), ...oldEntries]
    .filter(([,b]) => isManualBondTier(b.tier));
  const pendingBadges  = allEntries.filter(([,b])=>!b.redeemed);
  const redeemedBadges = allEntries.filter(([,b])=> b.redeemed);
  const pendingCount = pendingBadges.length;
  const readyDigitalBonds = DYNAMIC_BONDS.filter(bond => {
    const rewardCfg = getBondRewardConfig(bond);
    if (rewardCfg.mode !== 'digital') return false;
    const isRarityType = !!bond.rarityPool;
    const canRedeem = isRarityType ? checkRarityBond(bond, inv)
                                   : bond.needs.every(id => (inv[id]||0) >= 1);
    return canRedeem;
  });
  const readyDigitalCount = readyDigitalBonds.length;

  if (medalCountEl) {
    medalCountEl.textContent = `（待老師核銷 ${pendingCount} 枚／可直接兌換 ${readyDigitalCount} 項）`;
  }
  if (medalBtn) {
    medalBtn.disabled = pendingCount < 1 && readyDigitalCount < 1;
    medalBtn.textContent = (pendingCount > 0 || readyDigitalCount > 0)
      ? '查看徽章 / 直接兌換'
      : '目前無可處理項目';
  }

  const badgeCol = document.getElementById('bagBadgeCollection');
  const iconMap = {bronze:'🏅',silver:'🪙',gold:'⭐',diamond:'💠',legend:'👑'};
  if (badgeCol) {
    if (!allEntries.length) {
      badgeCol.innerHTML = '<div style="font-size:12px;color:rgba(200,150,255,.5);padding:8px 0">尚未獲得任何需要老師核銷的羈絆徽章</div>';
    } else {
      let bHtml = '';
      if (pendingBadges.length) {
        bHtml += '<div style="font-size:10px;color:#c89eff;margin-bottom:4px">⏳ 待核銷</div><div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:8px">';
        pendingBadges.forEach(([,b]) => {
          const info = TIER_INFO[b.tier]||TIER_INFO.bronze;
          bHtml += `<div class="badge-tile ${info.tierClass}" style="min-width:68px;max-width:78px;padding:6px 4px">
            <div class="badge-circle" style="width:44px;height:44px;font-size:18px">${iconMap[b.tier]||'🏵️'}</div>
            <div class="badge-name" style="font-size:9px">${b.bondName}</div>
            <div class="badge-tier" style="font-size:9px">${info.name}</div>
          </div>`;
        });
        bHtml += '</div>';
      }
      if (redeemedBadges.length) {
        bHtml += '<div style="font-size:10px;color:var(--green);margin-bottom:4px">✅ 已核銷</div><div style="display:flex;flex-wrap:wrap;gap:6px">';
        redeemedBadges.forEach(([,b]) => {
          const info = TIER_INFO[b.tier]||TIER_INFO.bronze;
          bHtml += `<div class="badge-tile ${info.tierClass}" style="min-width:68px;max-width:78px;padding:6px 4px;opacity:.4">
            <div class="badge-circle" style="width:44px;height:44px;font-size:18px">${iconMap[b.tier]||'🏵️'}</div>
            <div class="badge-name" style="font-size:9px">${b.bondName}</div>
            <div class="badge-tier" style="font-size:9px">${info.name}</div>
          </div>`;
        });
        bHtml += '</div>';
      }
      badgeCol.innerHTML = bHtml;
    }
  }

  let digitalBox = document.getElementById('bagDigitalRewardBox');
  if (!digitalBox) {
    digitalBox = document.createElement('div');
    digitalBox.id = 'bagDigitalRewardBox';
    digitalBox.style.marginBottom = '12px';
    const medalShowcase = document.getElementById('bagMedalShowcase');
    if (medalShowcase && medalShowcase.parentNode) {
      medalShowcase.parentNode.insertBefore(digitalBox, medalShowcase.nextSibling);
    }
  }
  if (digitalBox) {
    const couponBook = Object.values(stuData?.couponBook || {});
    const couponCards = couponBook
      .sort((a,b)=>(b.issuedAt||'').localeCompare(a.issuedAt||''))
      .slice(0,8)
      .map(item => `<div style="background:var(--bg1);border:1px solid var(--bdr);border-radius:10px;padding:8px">
          <img src="${item.couponImage || ''}" alt="${item.couponLabel || '優惠券'}" style="width:100%;height:110px;object-fit:cover;border-radius:8px;border:1px solid rgba(255,255,255,.08);margin-bottom:8px;background:rgba(255,255,255,.03)" onerror="this.style.display='none'">
          <div style="font-size:12px;font-weight:bold">${item.couponLabel || '優惠券'}</div>
          <div style="font-size:10px;color:var(--tx3)">${item.issuedAt || ''} · ${item.used ? '已使用' : '可兌換'}</div>
        </div>`).join('');
    digitalBox.innerHTML = `
      <div style="font-size:13px;font-weight:bold;color:var(--gold);margin:10px 0 6px">🎟️ 學生優惠券收藏本</div>
      ${couponCards
        ? `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:8px;margin-bottom:10px">${couponCards}</div>`
        : '<div style="font-size:12px;color:var(--tx3);padding:8px 0">目前尚無優惠券</div>'}
      <div style="font-size:13px;font-weight:bold;color:var(--gold);margin:10px 0 6px">🌐 系統數位兌換紀錄</div>
      ${digitalRewards.length ? digitalRewards
        .sort((a,b)=>(b.claimedAt||'').localeCompare(a.claimedAt||''))
        .slice(0,8)
        .map(item => `<div style="background:var(--bg1);border:1px solid var(--bdr);border-radius:8px;padding:8px 10px;margin-bottom:6px">
            <div style="font-size:12px;font-weight:bold">${item.rewardLabel||'數位獎勵'}</div>
            <div style="font-size:11px;color:var(--tx2)">${item.bondName||''}</div>
            <div style="font-size:10px;color:var(--tx3)">${item.claimedAt||''} · 系統直接兌換</div>
          </div>`).join('')
        : '<div style="font-size:12px;color:var(--tx3);padding:8px 0">目前尚無系統數位兌換紀錄</div>'}`;
  }

  const newCards = stuData?.newCards || {};

  const grid = document.getElementById('bagCardGrid');
  grid.innerHTML = '';
  CARD_DB.forEach(card => {
    const count = inv[card.id] || 0;
    const isNew = !!newCards[card.id];
    const isFeatured = featuredCardId === card.id && count > 0;
    const div = document.createElement('div');
    div.className = 'card-thumb' + (count===0 ? ' empty-slot' : '');
    div.style.position = 'relative';
    if (isFeatured) {
      div.style.boxShadow = '0 0 0 2px var(--gold), 0 0 18px rgba(212,175,55,.35)';
    }
    if (count > 0) {
      div.innerHTML = `
        <img src="${getCardImageSrc(card)}" alt="${card.name}" onerror="this.parentNode.classList.add('empty-slot');this.remove()">
        <div class="ct-rarity ct-rarity-${card.rarity}">${card.rarity}</div>
        <div class="ct-name">${card.name}</div>
        ${count>1 ? `<div class="ct-count">×${count}</div>` : ''}
        ${isNew ? `<div class="card-new-badge" id="new-badge-${card.id}">NEW</div>` : ''}
        ${isFeatured ? `<div style="position:absolute;left:6px;bottom:28px;font-size:10px;padding:2px 7px;border-radius:12px;background:var(--gold);color:#000;font-weight:bold">看板星卡</div>` : ''}`;
      div.style.cursor = 'pointer';
      div.addEventListener('click', function() {
        if (isNew) clearNewCard(card.id);
        openCardZoom(card, count, isNew);
      });
      const btn = document.createElement('button');
      btn.className = 'btn';
      btn.textContent = isFeatured ? '目前看板' : '設為看板';
      btn.style.position = 'absolute';
      btn.style.left = '6px';
      btn.style.right = '6px';
      btn.style.bottom = '6px';
      btn.style.padding = '4px 6px';
      btn.style.fontSize = '10px';
      btn.style.background = isFeatured ? 'var(--gold)' : 'rgba(0,0,0,.45)';
      btn.style.color = isFeatured ? '#000' : '#fff';
      btn.style.borderColor = isFeatured ? 'var(--gold)' : 'rgba(255,255,255,.2)';
      btn.disabled = isFeatured;
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        if (!isFeatured) setFeaturedCard(card.id);
      });
      div.appendChild(btn);
    } else {
      div.innerHTML = '🂠';
      div.title = '尚未獲得';
    }
    grid.appendChild(div);
  });

  const bondList = document.getElementById('bagBondList');
  const tierLegendHtml = `
    <div style="display:flex;flex-wrap:wrap;gap:6px;margin:0 0 8px;padding:8px;border:1px solid var(--bdr);border-radius:10px;background:rgba(0,0,0,.16)">
      <span style="font-size:11px;color:var(--tx2);margin-right:4px;align-self:center">勳章圖示：</span>
      <span class="badge-circle badge-bronze" style="width:22px;height:22px;font-size:12px;animation:none">🥉</span><span style="font-size:11px;color:var(--tx2);align-self:center">銅牌</span>
      <span class="badge-circle badge-silver" style="width:22px;height:22px;font-size:12px;animation:none">🥈</span><span style="font-size:11px;color:var(--tx2);align-self:center">銀牌</span>
      <span class="badge-circle badge-gold" style="width:22px;height:22px;font-size:12px;animation:none">🥇</span><span style="font-size:11px;color:var(--tx2);align-self:center">金牌</span>
      <span class="badge-circle badge-diamond" style="width:22px;height:22px;font-size:12px;animation:none">💠</span><span style="font-size:11px;color:var(--tx2);align-self:center">藍鑽</span>
      <span class="badge-circle badge-legend" style="width:22px;height:22px;font-size:12px;animation:none">🏆</span><span style="font-size:11px;color:var(--tx2);align-self:center">傳說</span>
    </div>`;
  bondList.innerHTML = '';
  const claimedBonds      = (await dbGet(`students/${_currentStuId}/claimedBonds`)) || {};
  const claimedBondCounts = (await dbGet(`students/${_currentStuId}/claimedBondCounts`)) || {};
  const unredeemedBadges  = (await dbGet(`students/${_currentStuId}/unredeemedBadges`)) || {};
  bondList.insertAdjacentHTML('beforeend', tierLegendHtml);

  for (const bond of DYNAMIC_BONDS) {
    const isRarityType = !!bond.rarityPool;
    const canRedeem    = isRarityType ? checkRarityBond(bond, inv)
                                      : bond.needs.every(id => (inv[id]||0) >= 1);
    const claimCount = Number(claimedBondCounts[bond.id] || 0) || (claimedBonds[bond.id] ? 1 : 0);
    const lastClaimed = claimedBonds[bond.id] || (unredeemedBadges[bond.id] ? unredeemedBadges[bond.id].claimedAt : null);
    const rewardCfg = getBondRewardConfig(bond);

    let chipsHtml = '';
    if (isRarityType) {
      const pool = CARD_DB.filter(c => c.rarity === bond.rarityPool);
      const haveCount = pool.filter(c => (inv[c.id]||0) >= 1).length;
      chipsHtml = `<span class="bond-card-chip${haveCount>=bond.rarityCount?' have':''}">
        ${bond.rarityPool} 卡：${haveCount}/${bond.rarityCount} 張 ${haveCount>=bond.rarityCount?'✓':''}
      </span>`;
    } else {
      chipsHtml = bond.needs.map(id => {
        const c = CARD_DB.find(x=>x.id===id);
        if (!c) return '';
        const have = (inv[c.id]||0) >= 1;
        return `<span class="bond-card-chip${have?' have':''}">${c.rarity} ${c.name}${have?' ✓':''}</span>`;
      }).join('');
    }

    const div = document.createElement('div');
    div.className = 'bond-item' + (canRedeem ? ' bond-ready' : '');
    div.innerHTML = `
      <div class="bond-title">${bond.emoji} ${bond.name}</div>
      <div style="font-size:11px;color:var(--tx3);margin-bottom:6px">${bond.desc||''}</div>
      <div class="bond-cards">${chipsHtml}</div>
      ${(()=>{
        const tier = getBondTier(bond);
        const info = TIER_INFO[tier];
        const iconMap = {bronze:'🏅',silver:'🪙',gold:'⭐',diamond:'💠',legend:'👑'};
        return `<div style="display:flex;align-items:center;gap:8px;margin:6px 0;padding:8px 10px;border-radius:8px;background:rgba(0,0,0,.2)">
          <div class="badge-circle ${info.tierClass}" style="width:36px;height:36px;font-size:16px;animation:none;flex-shrink:0">${iconMap[tier]}</div>
          <div>
            <div style="font-size:12px;font-weight:bold" class="${info.tierClass.replace('badge-','badge-')} badge-name">${bond.name} · ${info.name}</div>
            <div style="font-size:11px;color:var(--tx3)">${getBondModeText(bond)}</div>
          </div>
        </div>`;
      })()}
      ${claimCount>0
        ? `<div style="font-size:12px;color:var(--tx3);margin-top:4px">📊 已兌換 <b style="color:var(--gold)">${claimCount}</b> 次${lastClaimed?` · 最近：${lastClaimed}`:''}</div>`
        : ''
      }
      ${canRedeem
        ? `<button class="btn g" onclick="redeemBond('${bond.id}')" style="width:100%;padding:9px;margin-top:6px">${rewardCfg.mode==='digital'?'⚡ 立即兌換（可重複）':'🏵️ 建立兌換徽章'}</button>`
        : `<div style="font-size:12px;color:var(--tx3);margin-top:4px">🔒 尚未集齊所需卡片</div>`
      }`;
    bondList.appendChild(div);
  }
}

async function setFeaturedCard(cardId) {
  if (!_currentStuId) return;
  const inv = (await dbGet(`students/${_currentStuId}/inventory`)) || {};
  if ((inv[cardId]||0) < 1) {
    toast('尚未持有這張卡片', 'err');
    return;
  }
  await dbSet(`students/${_currentStuId}/featuredCardId`, cardId);
  toast('已設為看板星卡', 'ok');
  await renderBag();
}

async function redeemBond(bondId) {
  if (!_currentStuId) return;
  const bond = DYNAMIC_BONDS.find(b => b.id === bondId);
  if (!bond) return;

  const rewardCfg = getBondRewardConfig(bond);
  const bondTier  = getBondTier(bond);
  const tierInfo  = TIER_INFO[bondTier];
  const iconMap2  = {bronze:'🏅',silver:'🪙',gold:'⭐',diamond:'💠',legend:'👑'};

  openDlg(`🔗 兌換羈絆「${bond.name}」`,
    `<div class="dlg-msg" style="text-align:center">
      <div style="font-size:13px;color:var(--tx2);margin-bottom:12px">${bond.desc||''}</div>
      <div style="display:flex;align-items:center;justify-content:center;gap:12px;background:linear-gradient(135deg,#1a0a2e,#2d1357);border:1px solid #7b2ff7;border-radius:12px;padding:14px;margin-bottom:10px">
        <div class="badge-circle ${tierInfo.tierClass}" style="width:52px;height:52px;font-size:22px">
          ${iconMap2[bondTier]}
        </div>
        <div style="text-align:left">
          <div style="font-size:14px;font-weight:bold;color:#e0c0ff">${bond.name}</div>
          <div style="font-size:12px;color:#a080d0">${tierInfo.name}</div>
          <div style="font-size:13px;color:#c89eff;margin-top:2px">${rewardCfg.label}</div>
        </div>
      </div>
      <div style="font-size:12px;color:var(--tx3)">${rewardCfg.mode==='digital'
        ? '消耗所需卡片各一張後，系統會立刻登記數位兌換獎勵，不需要找老師。'
        : '消耗所需卡片各一張後，系統會建立待核銷徽章，請出示畫面給老師。'}</div>
     </div>`,
    [{label:rewardCfg.mode==='digital' ? '確認兌換' : '確認建立徽章', cls:'ok', fn: async () => {
      const inv = (await dbGet(`students/${_currentStuId}/inventory`)) || {};
      const isRarityType = !!bond.rarityPool;
      const ok = isRarityType ? checkRarityBond(bond, inv)
                              : bond.needs.every(id => (inv[id]||0) >= 1);
      if (!ok) { toast('卡片不足，無法兌換','err'); return false; }

      const upd = {};
      const lk  = Date.now()+'';
      const t   = now();
      const d   = await dbGet(`students/${_currentStuId}`) || {};
      const stuName = byId(_currentStuId)?.name || '';

      if (isRarityType) {
        getRarityBondCards(bond, inv).forEach(c => {
          upd[`${ROOT}/students/${_currentStuId}/inventory/${c.id}`] = Math.max(0,(inv[c.id]||0)-1);
        });
      } else {
        bond.needs.forEach(id => {
          upd[`${ROOT}/students/${_currentStuId}/inventory/${id}`] = Math.max(0,(inv[id]||0)-1);
        });
      }

      const prevClaimCount = Number(d?.claimedBondCounts?.[bondId] || 0) || (d?.claimedBonds?.[bondId] ? 1 : 0);
      const claimCount = prevClaimCount + 1;
      upd[`${ROOT}/students/${_currentStuId}/claimedBonds/${bondId}`] = t;
      upd[`${ROOT}/students/${_currentStuId}/claimedBondCounts/${bondId}`] = claimCount;

      if (rewardCfg.mode === 'digital') {
        const classRewardLabel = getClassReward(byId(_currentStuId)?.cls || '', bondTier);
        const parsedReward = parseDigitalReward(classRewardLabel);
        const nextPoints = (d?.points||0) + (parsedReward.points || 0);
        const nextPacks = Number(d?.packTickets||0) + (parsedReward.packs || 0);
        const nextMedals = Number(d?.medals||0) + (parsedReward.medals || 0);
        const couponType = parsedReward.couponType;
        const couponQty = Math.max(1, Number(parsedReward.couponQty || 1));
        const couponLabel = couponType === 'starbucks' ? `星巴克${couponQty}杯兌換券`
          : couponType === 'noodle' ? `泡麵${couponQty}份兌換券`
          : couponType === 'drink' ? `飲料${couponQty}杯兌換券`
          : '';
        const couponImage = couponType ? COUPON_IMAGE_MAP[couponType] : '';
        const rewardKey = `${bondId}_${Date.now()}`;
        upd[`${ROOT}/students/${_currentStuId}/digitalRewards/${rewardKey}`] = {
          bondId,
          bondName: bond.name,
          tier: bondTier,
          claimCount,
          rewardLabel: classRewardLabel,
          claimedAt: t,
          redeemState: 'issued',
          couponType,
          couponQty,
          couponLabel,
          couponImage
        };
        if (parsedReward.points) upd[`${ROOT}/students/${_currentStuId}/points`] = nextPoints;
        if (parsedReward.packs) upd[`${ROOT}/students/${_currentStuId}/packTickets`] = nextPacks;
        if (parsedReward.medals) upd[`${ROOT}/students/${_currentStuId}/medals`] = nextMedals;
        if (couponType) {
          upd[`${ROOT}/students/${_currentStuId}/couponBook/${bondId}_${couponType}_${Date.now()}`] = {
            couponType,
            couponQty,
            couponLabel,
            couponImage,
            sourceBondId: bondId,
            sourceBondName: bond.name,
            issuedAt: t,
            used: false
          };
        }
        upd[`${ROOT}/students/${_currentStuId}/log/${lk}`] = {
          time:t,
          action:'羈絆兌換',
          reason:`「${bond.name}」發放數位兌換獎勵：${classRewardLabel}`,
          teacher:'系統',
          delta: 0
        };

        await db.ref('/').update(upd);
        await sendNotifToStudent(_currentStuId, stuName,
          `${bond.emoji} 羈絆「${bond.name}」兌換成功！
系統已發放數位兌換獎勵：${classRewardLabel}`, 'notice');

        toast(classRewardLabel, 'ok');
      } else {
        const medalCount = getBondMedalCount(bond);
        upd[`${ROOT}/students/${_currentStuId}/unredeemedBadges/${bondId}`] = {
          bondId, bondName: bond.name, tier: bondTier,
          tierName: tierInfo.name, medalCount, claimedAt: t,
          redeemed: false
        };
        upd[`${ROOT}/students/${_currentStuId}/bondMedals`] = (d?.bondMedals||0) + medalCount;
        upd[`${ROOT}/students/${_currentStuId}/log/${lk}`] = {
          time:t,
          action:'羈絆兌換',
          reason:`「${bond.name}」建立 ${tierInfo.name}，需找老師核銷`,
          teacher:'系統',
          delta:0
        };

        await db.ref('/').update(upd);
        await sendNotifToStudent(_currentStuId, stuName,
          `${bond.emoji} 羈絆「${bond.name}」兌換成功！
已建立 ${tierInfo.name}，請出示畫面給老師核銷。`, 'notice');

        toast(`已建立 ${tierInfo.name}`, 'ok');
      }

      await renderBag();
      return true;
    }}, {label:'取消', fn:()=>true}]
  );
}

// ════════════════════════════════════════════════════════════════
// 卡片管理系統（master 限定）
// ════════════════════════════════════════════════════════════════

// ── 自訂卡片資料庫（Firebase 儲存，合併進 CARD_DB）──
// _customCards / _customBonds declared earlier (above CARD_DB)

async function loadCustomCardData() {
  const cc = (await dbGet('customCards')) || {};
  _customCards = Object.entries(cc).map(([k,v])=>({
    ...v,
    quote: v.quote || '請多多指教。',
    _fbKey:k
  }));
  const cb = (await dbGet('customBonds')) || {};
  _customBonds = Object.entries(cb).map(([k,v])=>({...v, _fbKey:k}));
  // 合併自訂卡片到 CARD_DB（避免重複）
  const baseIds = CARD_DB.filter(c=>!c._fbKey).map(c=>c.id);
  CARD_DB.splice(0, CARD_DB.length,
    ...CARD_DB.filter(c=>!c._fbKey),
    ..._customCards.filter(c=>!baseIds.includes(c.id))
  );
  generateDynamicBonds();
}

// ── 抽卡開關 ──
async function setCardSystemEnabled(enabled) {
  await dbSet('cardSystemEnabled', enabled);
  toast(enabled ? '✅ 抽卡系統已開放' : '🔒 抽卡系統已關閉', enabled ? 'ok' : 'err');
  renderCardMgmt();
}

// ── 渲染卡片管理面板 ──
async function renderCardMgmt() {
  // 更新開關狀態顯示
  const enabled = await dbGet('cardSystemEnabled');
  const statusEl = document.getElementById('cardSwitchStatus');
  if (statusEl) {
    statusEl.textContent = enabled === false ? '🔒 目前關閉' : '✅ 目前開放';
    statusEl.style.color = enabled === false ? 'var(--red)' : 'var(--green)';
    statusEl.style.fontWeight = 'bold';
  }

  await loadCustomCardData();
  await applyCardTitleOverrides();

  // 卡片列表
  const list = document.getElementById('cardMgmtList');
  if (!list) return;
  list.innerHTML = '';
  CARD_DB.forEach(card => {
    const isCustom = !!card._fbKey;
    const div = document.createElement('div');
    div.className = 'titem';
    div.style.marginBottom = '6px';
    div.innerHTML = `
      <div style="display:flex;align-items:center;gap:10px;flex:1;min-width:0">
        <div style="width:36px;height:50px;border-radius:6px;overflow:hidden;border:1px solid var(--bdr);flex-shrink:0;background:var(--bg2)">
          <img src="${getCardImageSrc(card)}" style="width:100%;height:100%;object-fit:cover" onerror="this.style.display='none'">
        </div>
        <div style="min-width:0">
          <div class="ti-name" style="font-size:13px">${card.name}
            <span class="ct-rarity ct-rarity-${card.rarity}" style="font-size:10px;padding:1px 6px;border-radius:8px;margin-left:4px">${card.rarity}</span>
            ${isCustom?'<span style="font-size:10px;padding:1px 5px;border-radius:6px;background:rgba(46,204,113,.15);color:var(--green);margin-left:3px">自訂</span>':''}
          </div>
          <div class="ti-cls" style="font-size:11px">${card.title} · ${card.id}</div>
          <div style="font-size:11px;color:var(--tx3);margin-top:2px">「${card.quote||'—'}」</div>
        </div>
      </div>
      <div style="display:flex;gap:5px;flex-shrink:0">
        <button class="btn" onclick="openEditCardDlg('${card.id}')" style="font-size:11px;padding:3px 9px">✏️</button>
        ${isCustom?`<button class="btn d" onclick="delCard('${card._fbKey}','${card.name}')" style="font-size:11px;padding:3px 9px">🗑️</button>`:''}
      </div>`;
    list.appendChild(div);
  });

  // 自訂羈絆列表
  const bondList = document.getElementById('bondMgmtList');
  if (!bondList) return;
  bondList.innerHTML = '';
  if (!_customBonds.length) {
    bondList.innerHTML = '<div class="empty" style="padding:20px">尚無自訂羈絆</div>';
    return;
  }
  _customBonds.forEach(bond => {
    const div = document.createElement('div');
    div.className = 'titem';
    div.style.marginBottom = '6px';
    div.innerHTML = `
      <div style="flex:1">
        <div class="ti-name">${bond.emoji||'🔗'} ${bond.name}</div>
        <div class="ti-cls">需求：${(bond.needs||[]).join('、')} → ${bond.reward}</div>
        <div style="font-size:11px;color:var(--tx3)">${bond.desc||''}</div>
      </div>
      <div style="display:flex;gap:5px;flex-shrink:0">
        <button class="btn d" onclick="delCustomBond('${bond._fbKey}','${bond.name}')" style="font-size:11px;padding:3px 9px">🗑️</button>
      </div>`;
    bondList.appendChild(div);
  });
}

// ── 新增卡片 ──
function openAddCardDlg() {
  openDlg('🃏 新增卡片',
    `<div class="dlg-label">卡片 ID（唯一，例：C12）</div>
     <input class="dlg-input" type="text" id="ncId" placeholder="C12">
     <div class="dlg-label">角色名稱</div>
     <input class="dlg-input" type="text" id="ncName" placeholder="例：國霖">
     <div class="dlg-label">稱號</div>
     <input class="dlg-input" type="text" id="ncTitle" placeholder="例：音樂守護者">
     <div class="dlg-label">角色台詞</div>
     <input class="dlg-input" type="text" id="ncQuote" placeholder="例：先把聲音站穩">
     <div class="dlg-label">稀有度</div>
     <select class="dlg-input" id="ncRarity" style="width:100%;margin-bottom:10px">
       <option value="R">R</option>
       <option value="SR" selected>SR</option>
       <option value="SSR">SSR</option>
       <option value="UR">UR</option>
     </select>
     <div class="dlg-label">圖片路徑（相對路徑，例：CARDS/國霖SR2_結果.jpg）</div>
     <input class="dlg-input" type="text" id="ncImg" placeholder="CARDS/xxx_結果.jpg">`,
    [{label:'新增',cls:'ok',fn:async()=>{
      const id    = document.getElementById('ncId').value.trim().toUpperCase();
      const name  = document.getElementById('ncName').value.trim();
      const title = document.getElementById('ncTitle').value.trim();
      const quote = document.getElementById('ncQuote').value.trim();
      const rar   = document.getElementById('ncRarity').value;
      const img   = document.getElementById('ncImg').value.trim();
      if (!id||!name||!title||!img) { toast('請填寫所有欄位','err'); return false; }
      if (CARD_DB.some(c=>c.id===id)) { toast('此 ID 已存在','err'); return false; }
      const fbKey = 'card_'+Date.now();
      await dbSet(`customCards/${fbKey}`, {id, name, title, quote, rarity:rar, img, _fbKey:fbKey});
      toast(`卡片「${name}」已新增`,'ok');
      await loadCustomCardData();
      renderCardMgmt();
      return true;
    }},{label:'取消',fn:()=>true}]);
}

// ── 編輯卡片（包含內建卡片的稱號） ──
function openEditCardDlg(cardId) {
  const card = CARD_DB.find(c=>c.id===cardId);
  if (!card) return;
  const isCustom = !!card._fbKey;
  openDlg(`✏️ 編輯「${card.name}」`,
    `<div class="dlg-label">卡片 ID</div>
     <input class="dlg-input" value="${card.id}" readonly style="opacity:.5">
     <div class="dlg-label">角色名稱${isCustom?'':' （內建卡，唯讀）'}</div>
     <input class="dlg-input" type="text" id="ecName" value="${card.name}" ${isCustom?'':'readonly style="opacity:.5"'}>
     <div class="dlg-label">稱號</div>
     <input class="dlg-input" type="text" id="ecTitle" value="${card.title}">
     <div class="dlg-label">角色台詞${isCustom?'':' （內建卡，唯讀）'}</div>
     <input class="dlg-input" type="text" id="ecQuote" value="${card.quote||''}" ${isCustom?'':'readonly style="opacity:.5"'}>
     <div class="dlg-label">稀有度${isCustom?'':' （內建卡，唯讀）'}</div>
     <select class="dlg-input" id="ecRarity" style="width:100%;margin-bottom:10px" ${isCustom?'':'disabled'}>
       <option value="R" ${card.rarity==='R'?'selected':''}>R</option>
       <option value="SR" ${card.rarity==='SR'?'selected':''}>SR</option>
       <option value="SSR" ${card.rarity==='SSR'?'selected':''}>SSR</option>
       <option value="UR" ${card.rarity==='UR'?'selected':''}>UR</option>
     </select>
     <div class="dlg-label">圖片路徑</div>
     <input class="dlg-input" type="text" id="ecImg" value="${card.img}" ${isCustom?'':'readonly style="opacity:.5"'}>`,
    [{label:'儲存',cls:'ok',fn:async()=>{
      const newTitle = document.getElementById('ecTitle').value.trim();
      if (!newTitle) { toast('稱號不能為空','err'); return false; }
      if (isCustom) {
        const newName  = document.getElementById('ecName').value.trim();
        const newQuote = document.getElementById('ecQuote').value.trim();
        const newRar   = document.getElementById('ecRarity').value;
        const newImg   = document.getElementById('ecImg').value.trim();
        await dbUpd(`customCards/${card._fbKey}`, {name:newName, title:newTitle, quote:newQuote, rarity:newRar, img:newImg});
      } else {
        // 內建卡：只能修改稱號，存入 Firebase 覆蓋表
        await dbSet(`cardTitleOverride/${card.id}`, newTitle);
        // 同步到記憶體
        card.title = newTitle;
      }
      toast('已儲存','ok');
      await loadCustomCardData();
      renderCardMgmt();
      return true;
    }},{label:'取消',fn:()=>true}]);
}

async function delCard(fbKey, name) {
  openDlg(`🗑️ 刪除卡片「${name}」`,
    '<div class="dlg-msg" style="color:var(--red)">確認刪除此卡片？學生背包中的此卡不受影響。</div>',
    [{label:'確認刪除',cls:'del',fn:async()=>{
      await db.ref(`${ROOT}/customCards/${fbKey}`).remove();
      toast(`卡片「${name}」已刪除`,'ok');
      await loadCustomCardData();
      renderCardMgmt();
      return true;
    }},{label:'取消',fn:()=>true}]);
}

// ── 新增自訂羈絆 ──
function openAddBondDlg() {
  const cardOpts = CARD_DB.map(c=>`<option value="${c.id}">${c.id} ${c.name}(${c.rarity})</option>`).join('');
  const rewardOpts = [
    {v:'starbucks',l:'星巴克一杯☕（最高）'},
    {v:'noodle',   l:'一度贊泡麵🍜'},
    {v:'drink',    l:'任選手搖飲🧋'},
    {v:'tissue',   l:'衛生紙一包🧻'},
    {v:'medals3',  l:'金牌三面🥇🥇🥇'},
    {v:'medals2',  l:'金牌兩面🥇🥇'},
    {v:'medals1',  l:'金牌一面🥇'},
  ].map(o=>`<option value="${o.v}">${o.l}</option>`).join('');

  openDlg('🔗 新增自訂羈絆',
    `<div class="dlg-label">羈絆名稱</div>
     <input class="dlg-input" type="text" id="nbName" placeholder="例：木管雙傑">
     <div class="dlg-label">Emoji 圖示</div>
     <input class="dlg-input" type="text" id="nbEmoji" placeholder="例：🎷" maxlength="4">
     <div class="dlg-label">說明文字</div>
     <input class="dlg-input" type="text" id="nbDesc" placeholder="例：集齊兩位木管老師">
     <div class="dlg-label">所需卡片 ID（用逗號分隔，例：C08,C10）</div>
     <input class="dlg-input" type="text" id="nbNeeds" placeholder="C08,C10">
     <div class="dlg-label">獎勵類型</div>
     <select class="dlg-input" id="nbReward" style="width:100%;margin-bottom:10px">${rewardOpts}</select>`,
    [{label:'新增',cls:'ok',fn:async()=>{
      const name   = document.getElementById('nbName').value.trim();
      const emoji  = document.getElementById('nbEmoji').value.trim() || '🔗';
      const desc   = document.getElementById('nbDesc').value.trim();
      const needsRaw = document.getElementById('nbNeeds').value.trim();
      const rewardType = document.getElementById('nbReward').value;
      if (!name||!needsRaw) { toast('請填寫名稱與所需卡片','err'); return false; }
      const needs = needsRaw.split(',').map(s=>s.trim().toUpperCase()).filter(Boolean);
      const invalid = needs.filter(id=>!CARD_DB.some(c=>c.id===id));
      if (invalid.length) { toast(`找不到卡片 ID：${invalid.join(',')}`, 'err'); return false; }
      const rewardLabels = {starbucks:'星巴克一杯☕',noodle:'一度贊泡麵🍜',drink:'任選手搖飲🧋',tissue:'衛生紙一包🧻',medals3:'金牌三面🥇🥇🥇',medals2:'金牌兩面🥇🥇',medals1:'金牌一面🥇'};
      const fbKey = 'bond_'+Date.now();
      const bondObj = {id:`BOND_CUSTOM_${fbKey}`, name, emoji, desc, needs, reward:rewardLabels[rewardType]||rewardType, rewardType, _fbKey:fbKey};
      await dbSet(`customBonds/${fbKey}`, bondObj);
      toast(`羈絆「${name}」已新增`,'ok');
      await loadCustomCardData();
      generateDynamicBonds();
      renderCardMgmt();
      return true;
    }},{label:'取消',fn:()=>true}]);
}

async function delCustomBond(fbKey, name) {
  openDlg(`🗑️ 刪除羈絆「${name}」`,
    '<div class="dlg-msg" style="color:var(--red)">確認刪除此羈絆？已兌換的記錄不受影響。</div>',
    [{label:'確認刪除',cls:'del',fn:async()=>{
      await db.ref(`${ROOT}/customBonds/${fbKey}`).remove();
      toast(`羈絆「${name}」已刪除`,'ok');
      await loadCustomCardData();
      generateDynamicBonds();
      renderCardMgmt();
      return true;
    }},{label:'取消',fn:()=>true}]);
}

// ── 啟動時套用內建卡片稱號覆蓋 ──
async function applyCardTitleOverrides() {
  const overrides = (await dbGet('cardTitleOverride')) || {};
  Object.entries(overrides).forEach(([id, title]) => {
    const card = CARD_DB.find(c=>c.id===id);
    if (card) card.title = title;
  });
}



// ════════════════════════════════════════════════════════════════
// 羈絆徽章工具函數
// ════════════════════════════════════════════════════════════════

// 各羈絆的 tier 對照表
const BOND_TIER_MAP = {
  BOND_XUCHENG_TRACK:'gold',
  BOND_QIANYU_TRACK:'gold',
  BOND_PRINCIPAL_TRACK:'legend',
  BOND_GUOLIN_TRACK:'gold',
  BOND_KANGRONG_TRACK:'gold',
  BOND_XIAOXUAN_TRACK:'gold',
  BOND_ADMIN_DUO:'gold',
  BOND_POWER_COUPLE:'diamond',
  BOND_BRASS_CHAIN:'silver',
  BOND_LOW_REGISTER_GUARDIANS:'gold',
  BOND_WOODWIND_AXIS:'silver',
  BOND_STAGE_COMMAND:'diamond',
  BOND_CAMPUS_ROUTINE:'silver',
  BOND_CONDUCTING_TEAM:'silver',
  BOND_HOMEROOM_CORE:'gold',
  BOND_ADMIN_SUPPORT:'silver',
  BOND_ENSEMBLE_CORE:'gold',
  BOND_GRAND_REUNION:'legend',
};

function getBondTier(bond) {
  if (!bond) return 'bronze';
  if (bond.tier && TIER_INFO[bond.tier]) return bond.tier;
  if (bond.fixedTier && TIER_INFO[bond.fixedTier]) return bond.fixedTier;
  if (Array.isArray(bond.needs) && bond.needs.length) {
    const rarityWeights = { R:1, SR:2.5, SSR:4.5, UR:8 };
    const cards = bond.needs.map(id => CARD_DB.find(c => c.id === id)).filter(Boolean);
    const score = cards.reduce((sum, card) => sum + (rarityWeights[card.rarity] || 1), 0)
      + Math.max(0, cards.length - 1) * 0.8
      + (cards.some(card => card.rarity === 'UR') ? 2.5 : 0)
      + (cards.filter(card => card.rarity === 'SSR').length >= 2 ? 1.5 : 0);
    if (score >= 16) return 'legend';
    if (score >= 11) return 'diamond';
    if (score >= 7.5) return 'gold';
    if (score >= 4.5) return 'silver';
    return 'bronze';
  }
  const rewardTypeTierMap = {
    medals1:'bronze',
    medals2:'silver',
    medals3:'gold',
    tissue:'silver',
    drink:'diamond',
    noodle:'legend',
    starbucks:'legend',
  };
  if (bond.rewardType && rewardTypeTierMap[bond.rewardType]) return rewardTypeTierMap[bond.rewardType];
  return BOND_TIER_MAP[bond.id] || 'bronze';
}

const TIER_INFO = {
  bronze:  { name:'銅牌羈絆', emoji:'🥉', medals:1, tierClass:'badge-bronze' },
  silver:  { name:'銀牌羈絆', emoji:'🥈', medals:1, tierClass:'badge-silver' },
  gold:    { name:'金牌羈絆', emoji:'🥇', medals:2, tierClass:'badge-gold'   },
  diamond: { name:'藍鑽徽章', emoji:'💠', medals:2, tierClass:'badge-diamond' },
  legend:  { name:'傳說徽章', emoji:'🏆', medals:3, tierClass:'badge-legend'  },
};

function isManualBondTier(tier) {
  return false;
}

function getBondRewardConfig(bond) {
  const tier = getBondTier(bond);
  const autoRewardMap = {
    bronze: { mode:'digital', points:0, medals:0, label:DEFAULT_CLASS_REWARDS.bronze },
    silver: { mode:'digital', points:0, medals:0, label:DEFAULT_CLASS_REWARDS.silver },
    gold: { mode:'digital', points:0, medals:0, label:DEFAULT_CLASS_REWARDS.gold },
    diamond: { mode:'digital', points:0, medals:0, label:DEFAULT_CLASS_REWARDS.diamond },
    legend: { mode:'digital', points:0, medals:0, label:DEFAULT_CLASS_REWARDS.legend },
  };
  return { tier, ...(autoRewardMap[tier] || autoRewardMap.bronze) };
}

function getBondModeText(bond) {
  const rewardCfg = getBondRewardConfig(bond);
  return rewardCfg.mode === 'digital'
    ? `此獎項為系統數位兌換：依班級設定發放`
    : `此獎項需找老師兌換：${rewardCfg.label}`;
}

function parseDigitalReward(label) {
  const text = String(label || '').trim();
  const qty = parseQtyToken(text);
  const pointMatch = text.match(/(\d+)\s*點/);
  const packMatch = text.match(/(\d+)\s*連抽卡包|(\d+)\s*包卡包|(\d+)\s*抽卡包/);
  const medalMatch = text.match(/(\d+)\s*面?\s*(?:免死)?金牌|(?:免死)?金牌\s*(\d+)\s*面?/);
  const points = pointMatch ? Number(pointMatch[1]) : 0;
  const packs = packMatch ? Number(packMatch[1] || packMatch[2] || packMatch[3] || 0) : 0;
  const medals = medalMatch ? Number(medalMatch[1] || medalMatch[2] || 0) : (/(免死金牌|金牌)/.test(text) ? qty : 0);
  const couponType = /星巴克/.test(text) ? 'starbucks'
    : /(泡麵|一度讚|一度贊|noodle)/i.test(text) ? 'noodle'
    : /(飲料|手搖|drink)/i.test(text) ? 'drink'
    : '';
  const couponQty = couponType ? qty : 0;
  return { text, points, packs, medals, couponType, couponQty };
}

const COUPON_IMAGE_MAP = {
  starbucks: 'CARDS/星巴克一杯.webp',
  noodle: 'CARDS/泡麵.jpg',
  drink: '',
};

// 產生徽章 HTML（顯示羈絆名稱 + 等級名稱，外觀依 tier）
function renderBadgeHTML(bond, count) {
  const tier = getBondTier(bond);
  const info = TIER_INFO[tier];
  const badgeName = bond.name;        // 羈絆名稱
  const tierName  = info.name;        // 徽章等級名稱

  // 每種 tier 的圖示（用文字+emoji模擬）
  const iconMap = {
    bronze:  '🏅',
    silver:  '🪙',
    gold:    '⭐',
    diamond: '💠',
    legend:  '👑',
  };

  let badgesHtml = '';
  for (let i = 0; i < (count||1); i++) {
    badgesHtml += `
      <div class="badge-tile ${info.tierClass}" title="${badgeName}·${tierName}">
        <div class="badge-circle">${iconMap[tier]}</div>
        <div class="badge-name">${badgeName}</div>
        <div class="badge-tier">${tierName}</div>
      </div>`;
  }
  return badgesHtml;
}

// 取得羈絆的勳章數量（依 tier）
function getBondMedalCount(bond) {
  const tier = getBondTier(bond);
  if (!isManualBondTier(tier)) return 0;
  return TIER_INFO[tier]?.medals || 1;
}

// ════════════════════════════════════════════════════════════════
// 羈絆勳章系統
// ════════════════════════════════════════════════════════════════

// 學生端：找老師兌獎對話框
async function openMedalRedeemDlg() {
  if (!_currentStuId) return;
  generateDynamicBonds();
  const inv = (await dbGet(`students/${_currentStuId}/inventory`)) || {};
  const d = await dbGet(`students/${_currentStuId}`);
  const newBadges2 = d?.unredeemedBadges || {};
  const oldClaimed2 = d?.claimedBonds || {};
  const allBadges2 = {...newBadges2};
  Object.entries(oldClaimed2).forEach(([bondId, claimedAt]) => {
    if (allBadges2[bondId]) return;
    const bond2 = DYNAMIC_BONDS.find(b=>b.id===bondId);
    if (!bond2) return;
    const tier2 = getBondTier(bond2);
    if (!isManualBondTier(tier2)) return;
    allBadges2[bondId] = {bondId, bondName:bond2.name, tier:tier2, tierName:(TIER_INFO[tier2]||TIER_INFO.bronze).name, redeemed:false};
  });
  const badges = allBadges2;
  const pending = Object.entries(badges).filter(([,b])=>!b.redeemed && isManualBondTier(b.tier));
  const readyDigital = DYNAMIC_BONDS.filter(bond => {
    const rewardCfg = getBondRewardConfig(bond);
    if (rewardCfg.mode !== 'digital') return false;
    const isRarityType = !!bond.rarityPool;
    const canRedeem = isRarityType ? checkRarityBond(bond, inv)
                                   : bond.needs.every(id => (inv[id]||0) >= 1);
    return canRedeem;
  });
  const iconMap = {bronze:'🏅',silver:'🪙',gold:'⭐',diamond:'💠',legend:'👑'};

  const directHtml = readyDigital.length ? readyDigital.map((bond) => {
    const tier = getBondTier(bond);
    const info = TIER_INFO[tier] || TIER_INFO.bronze;
    return `<div style="display:flex;align-items:center;justify-content:space-between;gap:10px;padding:8px 10px;background:rgba(46,204,113,.08);border:1px solid rgba(46,204,113,.28);border-radius:10px;margin-bottom:6px">
      <div style="display:flex;align-items:center;gap:10px;min-width:0">
        <span style="font-size:22px">${iconMap[tier]||'🏵️'}</span>
        <div style="min-width:0">
          <div style="font-size:13px;font-weight:bold;color:#b9f3cf;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${bond.name}</div>
          <div style="font-size:11px;color:#8fd8aa">${info.name} · 系統可直接兌換</div>
        </div>
      </div>
      <button class="btn g" style="padding:6px 10px;font-size:12px;white-space:nowrap" onclick="closeDlg();redeemBond('${bond.id}')">立即兌換</button>
    </div>`;
  }).join('') : '<div style="color:var(--tx3);font-size:13px;text-align:center;padding:12px 0">目前沒有可直接兌換的羈絆</div>';

  const badgesHtml = pending.length ? pending.map(([,b]) => {
    const info = TIER_INFO[b.tier] || TIER_INFO.bronze;
    return `<div style="display:flex;align-items:center;gap:10px;padding:8px 10px;background:rgba(123,47,247,.1);border:1px solid rgba(123,47,247,.3);border-radius:10px;margin-bottom:6px">
      <span style="font-size:22px">${iconMap[b.tier]||'🏵️'}</span>
      <div>
        <div style="font-size:13px;font-weight:bold;color:#e0c0ff">${b.bondName}</div>
        <div style="font-size:11px;color:#a080d0">${info.name}</div>
      </div>
    </div>`;
  }).join('') : '<div style="color:var(--tx3);font-size:13px;text-align:center;padding:12px 0">目前沒有待老師核銷的藍鑽或傳說徽章</div>';

  openDlg('🏵️ 羈絆徽章中心',
    `<div style="text-align:center;margin-bottom:10px">
       <div style="font-size:13px;color:var(--tx2);line-height:1.6">可直接兌換與待老師核銷項目都整理在這裡</div>
     </div>
     <div style="font-size:12px;color:#8fd8aa;margin-bottom:6px">⚡ 可直接兌換</div>
     <div>${directHtml}</div>
     <div style="font-size:12px;color:#c89eff;margin:10px 0 6px">⏳ 待老師核銷</div>
     <div>${badgesHtml}</div>`,
    [{label:'關閉',fn:()=>true}]
  );
}

// 老師端：加減羈絆勳章
async function chgBondMedal(delta) {
  if (!curStu) return;
  if (delta > 0) {
    openDlg('🏵️ 手動增加羈絆勳章',
      `<div class="dlg-label">增加枚數</div>
       <input class="dlg-input" type="number" id="bmDelta" value="1" min="1" max="10">
       <div class="dlg-label">原因</div>
       <input class="dlg-input" type="text" id="bmReason" placeholder="例：活動獎勵">`,
      [{label:'確認', cls:'ok', fn: async () => {
        const n = parseInt(document.getElementById('bmDelta').value) || 1;
        const reason = document.getElementById('bmReason').value.trim() || '老師手動增加';
        const d = await dbGet(`students/${curStu.id}`);
        const lk = Date.now()+'';
        await dbUpd(`students/${curStu.id}`, {
          bondMedals: (d?.bondMedals||0) + n,
          [`log/${lk}`]: {time:now(), action:`增加羈絆勳章 +${n}`, reason, teacher:me.name, delta:0}
        });
        toast(`已增加 ${n} 枚羈絆勳章`, 'ok');
        openDetail(curStu); return true;
      }}, {label:'取消', fn:()=>true}]);
  } else {
    const d = await dbGet(`students/${curStu.id}`);
    const cur = d?.bondMedals || 0;
    if (cur < 1) { toast('勳章數量不足', 'err'); return; }
    openDlg('🏵️ 扣除羈絆勳章',
      `<div class="dlg-label">扣除枚數（現有 ${cur} 枚）</div>
       <input class="dlg-input" type="number" id="bmDeltaS" value="1" min="1" max="${cur}">`,
      [{label:'確認', cls:'del', fn: async () => {
        const n = Math.min(parseInt(document.getElementById('bmDeltaS').value)||1, cur);
        const lk = Date.now()+'';
        await dbUpd(`students/${curStu.id}`, {
          bondMedals: cur - n,
          [`log/${lk}`]: {time:now(), action:`扣除羈絆勳章 -${n}`, reason:'老師手動扣除', teacher:me.name, delta:0}
        });
        toast(`已扣除 ${n} 枚羈絆勳章`, 'ok');
        openDetail(curStu); return true;
      }}, {label:'取消', fn:()=>true}]);
  }
}

// 老師端：核銷兌獎（消耗勳章 + 記錄獎品）
// 老師直接點徽章核銷
async function teacherRedeemSingleBadge(stuId, stuName, bondId, badgeInfo) {
  const iconMap  = { bronze:'🏅', silver:'🪙', gold:'⭐', diamond:'💠', legend:'👑' };
  const icon     = iconMap[badgeInfo.tier] || '🏵️';
  const info     = TIER_INFO[badgeInfo.tier] || TIER_INFO.bronze;
  // 自動查詢學生班級對應的獎品
  const stuObj   = byId(stuId);
  const stuCls   = stuObj?.cls || curStu?.cls || '';
  const autoPrize = getClassReward(stuCls, badgeInfo.tier);

  openDlg(`🎁 核銷徽章 — ${stuName}`,
    `<div style="display:flex;align-items:center;gap:14px;padding:12px;background:linear-gradient(135deg,#1a0a2e,#2d1357);border:1px solid #7b2ff7;border-radius:12px;margin-bottom:14px">
       <div class="badge-circle ${info.tierClass}" style="width:52px;height:52px;font-size:22px;flex-shrink:0">${icon}</div>
       <div>
         <div style="font-size:15px;font-weight:bold;color:#e0c0ff">${badgeInfo.bondName}</div>
         <div style="font-size:12px;color:#a080d0">${info.name}</div>
         <div style="font-size:11px;color:rgba(200,150,255,.6);margin-top:2px">兌換於 ${(badgeInfo.claimedAt||'').slice(0,10)||'—'}</div>
       </div>
     </div>
     <div style="background:rgba(212,175,55,.1);border:2px solid var(--gold);border-radius:10px;padding:14px;margin-bottom:10px">
       <div style="font-size:11px;color:var(--gold);letter-spacing:1px;margin-bottom:6px">🎁 ${stuCls} 班級專屬獎品（系統自動帶入）</div>
       <div style="font-size:18px;font-weight:bold;color:var(--tx)">${autoPrize}</div>
       ${stuCls ? '' : '<div style="font-size:11px;color:var(--tx3);margin-top:4px">⚠️ 查無班級資訊，已使用預設獎品</div>'}
     </div>
     <div style="font-size:11px;color:var(--tx3);text-align:center">確認核銷後，系統將自動通知學生並記錄</div>`,
    [{label:'確認核銷', cls:'ok', fn: async () => {
      const lk = Date.now()+'';
      const t  = now();
      await db.ref(`${ROOT}/students/${stuId}/unredeemedBadges/${bondId}`).update({
        redeemed: true, redeemedAt: t, redeemedBy: me.name, prize: autoPrize
      });
      await dbUpd(`students/${stuId}`, {
        [`log/${lk}`]: {
          time: t,
          action: `🏵️ 徽章核銷 ${info.name}「${badgeInfo.bondName}」`,
          reason: `獎品：${autoPrize}（${me.name} 老師核銷）`,
          teacher: me.name, delta: 0
        }
      });
      await db.ref(`${ROOT}/stuMsgs/${stuId}/${lk}_msg`).set({
        from: me.name,
        content: `🏵️ ${me.name} 老師已核銷你的「${badgeInfo.bondName}」${info.name}，班級專屬獎品：${autoPrize}！`,
        type: 'notice', time: t, read: false
      });
      toast('✅ 核銷成功！', 'ok');
      openDetail(curStu);
      return true;
    }}, {label:'取消', fn:()=>true}]
  );
}
async function teacherRedeemBondMedal() {
  if (!curStu) return;
  const d = await dbGet(`students/${curStu.id}`);
  const badges = d?.unredeemedBadges || {};
  const pending = Object.entries(badges).filter(([,b])=>!b.redeemed);
  if (!pending.length) { toast(`${curStu.name} 目前沒有待核銷徽章`, 'err'); return; }
  // 直接刷新 detail panel 的徽章區（已有按鈕可直接點）
  toast('請點擊下方的徽章進行核銷', 'ok');
}

// openDetail 加載勳章數量（在 openDetail 函數末尾呼叫）
function _updateDetailBondMedal(d) {
  const badgeArea = document.getElementById('dpBadgeArea');
  if (!badgeArea || !curStu) return;

  // 合併新（unredeemedBadges）和舊（claimedBonds）格式
  const newBadges = d?.unredeemedBadges || {};
  const oldClaimed = d?.claimedBonds || {};
  const allBadges = {...newBadges};
  // 補入舊格式（尚未遷移到 unredeemedBadges 的）
  Object.entries(oldClaimed).forEach(([bondId, claimedAt]) => {
    if (allBadges[bondId]) return; // 新格式已有，跳過
    const bond = DYNAMIC_BONDS.find(b=>b.id===bondId);
    if (!bond) return;
    const tier = getBondTier(bond);
    allBadges[bondId] = {
      bondId, bondName: bond.name, tier,
      tierName: (TIER_INFO[tier]||TIER_INFO.bronze).name,
      claimedAt: typeof claimedAt==='string' ? claimedAt : '',
      redeemed: false, _legacy: true
    };
  });

  const entries = Object.entries(allBadges);
  const pending  = entries.filter(([,b])=>!b.redeemed);
  const redeemed = entries.filter(([,b])=> b.redeemed);

  // 更新數字（待核銷數）
  const el = document.getElementById('dpBondMedalN');
  if (el) el.textContent = pending.length;

  const iconMap = {bronze:'🏅',silver:'🪙',gold:'⭐',diamond:'💠',legend:'👑'};

  if (!entries.length) {
    badgeArea.innerHTML = '<div style="font-size:12px;color:var(--tx3);font-style:italic;padding:4px 0">尚無徽章記錄</div>';
    return;
  }

  let html = '';

  // 待核銷徽章（可點擊核銷）
  if (pending.length) {
    html += '<div style="font-size:10px;color:#c89eff;letter-spacing:1px;margin-bottom:6px">⏳ 待核銷</div>';
    html += '<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px">';
    pending.forEach(([bondId, b]) => {
      const info = TIER_INFO[b.tier] || TIER_INFO.bronze;
      const icon = iconMap[b.tier] || '🏵️';
      html += `<div onclick="teacherRedeemSingleBadge('${curStu.id}','${curStu.name}','${bondId}',${JSON.stringify(b).replace(/"/g,"'")})"
        class="badge-tile ${info.tierClass}"
        style="min-width:68px;max-width:80px;padding:7px 5px;cursor:pointer;position:relative;border:2px solid #7b2ff7"
        title="點擊核銷「${b.bondName}」">
        <div class="badge-circle" style="width:46px;height:46px;font-size:19px">${icon}</div>
        <div class="badge-name" style="font-size:9px">${b.bondName}</div>
        <div class="badge-tier" style="font-size:9px">${info.name}</div>
        <div style="position:absolute;top:-8px;right:-8px;background:#7b2ff7;color:#fff;font-size:9px;padding:2px 5px;border-radius:8px;font-weight:bold">核銷</div>
      </div>`;
    });
    html += '</div>';
  }

  // 已核銷徽章（灰色，顯示核銷資訊）
  if (redeemed.length) {
    html += '<div style="font-size:10px;color:var(--green);letter-spacing:1px;margin-bottom:6px">✅ 已核銷</div>';
    html += '<div style="display:flex;flex-wrap:wrap;gap:6px">';
    redeemed.forEach(([bondId, b]) => {
      const info = TIER_INFO[b.tier] || TIER_INFO.bronze;
      const icon = iconMap[b.tier] || '🏵️';
      html += `<div class="badge-tile ${info.tierClass}"
        style="min-width:68px;max-width:80px;padding:7px 5px;opacity:.45;position:relative"
        title="已核銷：${b.prize||''}（${b.redeemedBy||''}）">
        <div class="badge-circle" style="width:46px;height:46px;font-size:19px">${icon}</div>
        <div class="badge-name" style="font-size:9px">${b.bondName}</div>
        <div class="badge-tier" style="font-size:9px">${info.name}</div>
        <div style="position:absolute;top:-6px;right:-6px;background:var(--green);color:#fff;font-size:9px;padding:2px 5px;border-radius:8px">✓</div>
      </div>`;
    });
    html += '</div>';
  }

  badgeArea.innerHTML = html;
}

// 老師端：從「報表」頁查看全班勳章（加在 renderRpt 末尾呼叫）
async function renderBondMedalRanking(cls) {
  const stus = byCls(cls || curCls);
  const results = await Promise.all(stus.map(s => dbGet(`students/${s.id}/bondMedals`)));
  const ranked = stus.map((s,i) => ({...s, medals: results[i]||0}))
    .filter(s => s.medals > 0)
    .sort((a,b) => b.medals - a.medals);
  return ranked;
}


// 報表頁：勳章核銷面板
function openBondMedalPanel() {
  const panel = document.getElementById('bondMedalPanel');
  if (!panel) return;
  panel.style.display = '';
  loadBondMedalPanel();
}

async function loadBondMedalPanel() {
  const list = document.getElementById('bondMedalList');
  if (!list) return;
  list.innerHTML = '<div class="spin"></div>';

  const allStus = me.classes.flatMap(c => byCls(c));
  const results = await Promise.all(allStus.map(s => dbGet(`students/${s.id}/bondMedals`)));
  const withMedals = allStus
    .map((s,i) => ({...s, bondMedals: results[i]||0}))
    .filter(s => s.bondMedals > 0)
    .sort((a,b) => b.bondMedals - a.bondMedals);

  if (!withMedals.length) {
    list.innerHTML = '<div class="empty" style="padding:20px">目前沒有學生持有羈絆勳章</div>';
    return;
  }

  // 合併讀取 unredeemedBadges（新）和 claimedBonds（舊）
  const allNewData = await Promise.all(allStus.map(s => dbGet(`students/${s.id}/unredeemedBadges`)));
  const allOldData = await Promise.all(allStus.map(s => dbGet(`students/${s.id}/claimedBonds`)));
  const withBadges = allStus
    .map((s,i) => {
      const newB = allNewData[i] || {};
      const oldB = allOldData[i] || {};
      const merged = {...newB};
      Object.entries(oldB).forEach(([bondId, claimedAt]) => {
        if (merged[bondId]) return;
        const bond = DYNAMIC_BONDS.find(b=>b.id===bondId);
        if (!bond) return;
        const tier = getBondTier(bond);
        if (!isManualBondTier(tier)) return;
        merged[bondId] = {bondId, bondName:bond.name, tier, tierName:(TIER_INFO[tier]||TIER_INFO.bronze).name, claimedAt:'', redeemed:false, _legacy:true};
      });
      return {...s, badges: merged};
    })
    .map(s => ({...s, pending: Object.entries(s.badges).filter(([,b])=>!b.redeemed)}))
    .filter(s => s.pending.length > 0)
    .sort((a,b) => b.pending.length - a.pending.length);

  if (!withBadges.length) {
    list.innerHTML = '<div class="empty" style="padding:20px">目前沒有學生有待核銷徽章</div>';
    return;
  }

  const iconMap = {bronze:'🏅',silver:'🪙',gold:'⭐',diamond:'💠',legend:'👑'};

  list.innerHTML = withBadges.map(s => {
    const badgesHtml = s.pending.map(([bondId, b]) => {
      const info = TIER_INFO[b.tier] || TIER_INFO.bronze;
      const icon = iconMap[b.tier] || '🏵️';
      return `<div onclick="quickRedeemBadge('${s.id}','${s.name}','${bondId}',${JSON.stringify(b).replace(/"/g,"'")})"
        class="badge-tile ${info.tierClass}"
        style="min-width:64px;max-width:76px;padding:6px 4px;cursor:pointer;border:2px solid #7b2ff7;position:relative"
        title="核銷「${b.bondName}」${info.name}">
        <div class="badge-circle" style="width:42px;height:42px;font-size:17px">${icon}</div>
        <div class="badge-name" style="font-size:8px">${b.bondName}</div>
        <div class="badge-tier" style="font-size:8px">${info.name}</div>
        <div style="position:absolute;top:-7px;right:-7px;background:#7b2ff7;color:#fff;font-size:8px;padding:1px 5px;border-radius:6px;font-weight:bold">點擊核銷</div>
      </div>`;
    }).join('');
    return `<div class="medal-redeem-item has-medals" style="flex-direction:column;align-items:flex-start">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;width:100%">
        <div class="mri-info">
          <div class="mri-name">${s.name}</div>
          <div class="mri-cls">${s.cls} · ${s.id}</div>
        </div>
        <div class="mri-count">待核銷 ${s.pending.length} 枚</div>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:6px">${badgesHtml}</div>
    </div>`;
  }).join('');
  return; // early return, skip old code
  // (legacy placeholder below — unreachable)
  withMedals.map(s => `
    <div class="medal-redeem-item has-medals">
      <div class="mri-info">
        <div class="mri-name">${s.name}</div>
        <div class="mri-cls">${s.cls} · ${s.id}</div>
      </div>
      <div style="display:flex;align-items:center;gap:8px">
        <span style="font-size:20px">🏵️</span>
        <span class="mri-count">× ${s.bondMedals}</span>
        <button class="btn g" onclick="quickRedeemMedal('${s.id}','${s.name}',${s.bondMedals})"
          style="font-size:11px;padding:4px 10px;border-color:#7b2ff7;background:linear-gradient(135deg,#7b2ff7,#b06fff)">
          核銷兌獎
        </button>
      </div>
    </div>`).join('');
}

  async function quickRedeemBadge(stuId, stuName, bondId, badgeInfo) {
  const iconMap  = { bronze:'🏅', silver:'🪙', gold:'⭐', diamond:'💠', legend:'👑' };
  const icon     = iconMap[badgeInfo.tier] || '🏵️';
  const info     = TIER_INFO[badgeInfo.tier] || TIER_INFO.bronze;
  // 自動查詢學生班級對應的獎品
  const stuObj   = byId(stuId);
  const stuCls   = stuObj?.cls || '';
  const autoPrize = getClassReward(stuCls, badgeInfo.tier);

  openDlg(`🎁 核銷徽章 — ${stuName}`,
    `<div style="display:flex;align-items:center;gap:14px;padding:12px;background:linear-gradient(135deg,#1a0a2e,#2d1357);border:1px solid #7b2ff7;border-radius:12px;margin-bottom:14px">
       <div class="badge-circle ${info.tierClass}" style="width:52px;height:52px;font-size:22px;flex-shrink:0">${icon}</div>
       <div>
         <div style="font-size:15px;font-weight:bold;color:#e0c0ff">${badgeInfo.bondName}</div>
         <div style="font-size:13px;color:#a080d0">${info.name}</div>
       </div>
     </div>
     <div style="background:rgba(212,175,55,.1);border:2px solid var(--gold);border-radius:10px;padding:14px;margin-bottom:10px">
       <div style="font-size:11px;color:var(--gold);letter-spacing:1px;margin-bottom:6px">🎁 ${stuCls} 班級專屬獎品（系統自動帶入）</div>
       <div style="font-size:18px;font-weight:bold;color:var(--tx)">${autoPrize}</div>
     </div>
     <div style="font-size:11px;color:var(--tx3);text-align:center">確認後將通知學生並記錄</div>`,
    [{label:'確認核銷', cls:'ok', fn: async () => {
      const lk = Date.now()+'';
      const t  = now();
      await db.ref(`${ROOT}/students/${stuId}/unredeemedBadges/${bondId}`).update({
        redeemed: true, redeemedAt: t, redeemedBy: me.name, prize: autoPrize
      });
      await dbUpd(`students/${stuId}`, {
        [`log/${lk}`]: {
          time: t,
          action: `🏵️ 徽章核銷 ${info.name}「${badgeInfo.bondName}」`,
          reason: `獎品：${autoPrize}（${me.name} 老師核銷）`,
          teacher: me.name, delta: 0
        }
      });
      await db.ref(`${ROOT}/stuMsgs/${stuId}/${lk}_msg`).set({
        from: me.name,
        content: `🏵️ ${me.name} 老師已核銷你的「${badgeInfo.bondName}」${info.name}，班級專屬獎品：${autoPrize}！`,
        type: 'notice', time: t, read: false
      });
      toast('✅ 核銷成功！', 'ok');
      loadBondMedalPanel();
      return true;
    }}, {label:'取消', fn:()=>true}]
  );
}
// ════════════════════════════════════════════════════════════════
// 班級專屬獎品設定功能
// ════════════════════════════════════════════════════════════════

function initRewardPanel() {
  // 填入班級選單
  const sel = document.getElementById('rewardClsSelect');
  if (!sel) return;
  sel.innerHTML = CLASSES.map(c => `<option value="${c}">${c}</option>`).join('');
  loadClassRewards();
  renderRewardPreview();
}

async function loadClassRewards() {
  const sel = document.getElementById('rewardClsSelect');
  if (!sel) return;
  const cls = sel.value;
  if (!cls) return;
  const key = cls.replace(/\//g,'_');
  // 先嘗試從快取讀，若無則從 Firebase 讀
  let data = classRewardsCache[key];
  if (!data) {
    data = await dbGet(`classRewards/${key}`) || {};
    classRewardsCache[key] = data;
  }
  const tiers = ['bronze','silver','gold','diamond','legend'];
  tiers.forEach(tier => {
    const cfg = toRewardConfig(data[tier] || DEFAULT_CLASS_REWARDS[tier], tier);
    const typeEl = document.getElementById(`reward_type_${tier}`);
    const qtyEl = document.getElementById(`reward_qty_${tier}`);
    const itemEl = document.getElementById(`reward_item_${tier}`);
    if (!typeEl || !qtyEl || !itemEl) return;
    typeEl.value = cfg.type;
    qtyEl.value = String(cfg.qty);
    itemEl.value = cfg.item || 'noodle';
    onRewardTypeChange(tier);
  });
}

async function saveClassRewards() {
  const sel = document.getElementById('rewardClsSelect');
  if (!sel || !sel.value) { toast('請選擇班級','err'); return; }
  const cls = sel.value;
  const key = cls.replace(/\//g,'_');
  const tiers = ['bronze','silver','gold','diamond','legend'];
  const payload = {};
  tiers.forEach(tier => {
    const typeEl = document.getElementById(`reward_type_${tier}`);
    const qtyEl = document.getElementById(`reward_qty_${tier}`);
    const itemEl = document.getElementById(`reward_item_${tier}`);
    const cfg = normalizeRewardConfig({
      type: typeEl?.value || 'points',
      qty: Number(qtyEl?.value || 1),
      item: itemEl?.value || 'noodle',
    }, tier);
    payload[tier] = cfg;
  });
  try {
    await dbSet(`classRewards/${key}`, payload);
    classRewardsCache[key] = payload;
    toast(`「${cls}」獎品已儲存`, 'ok');
    renderRewardPreview();
  } catch(e) {
    toast('儲存失敗：' + e.message, 'err');
  }
}

async function renderRewardPreview() {
  const el = document.getElementById('rewardPreviewList');
  if (!el) return;
  el.innerHTML = '<div class="spin"></div>';
  await loadAllClassRewards();
  const iconMap = { bronze:'🏅', silver:'🪙', gold:'⭐', diamond:'💠', legend:'👑' };
  const tierLabel = { bronze:'銅牌', silver:'銀牌', gold:'金牌', diamond:'藍鑽', legend:'傳說' };
  let html = '';
  CLASSES.forEach(cls => {
    const key = cls.replace(/\//g,'_');
    const data = classRewardsCache[key] || {};
    const hasCustom = ['bronze','silver','gold','diamond','legend'].some(tier => {
      const current = formatRewardConfig(toRewardConfig(data[tier] || DEFAULT_CLASS_REWARDS[tier], tier));
      const defaults = formatRewardConfig(toRewardConfig(DEFAULT_CLASS_REWARDS[tier], tier));
      return current !== defaults;
    });
    html += `<div style="background:var(--bg2);border:1px solid var(--bdr);border-radius:var(--r2);padding:12px 14px;margin-bottom:8px">
      <div style="font-size:13px;font-weight:bold;color:var(--gold);margin-bottom:8px">
        ${cls} ${hasCustom ? '<span style="font-size:10px;padding:1px 7px;border-radius:8px;background:rgba(46,204,113,.15);color:var(--green);margin-left:6px">已自訂</span>' : '<span style="font-size:10px;color:var(--tx3);margin-left:6px">（使用預設）</span>'}
      </div>
      <div style="font-size:11px;color:var(--tx3);margin-bottom:8px">系統直接發放（班級設定可覆蓋）</div>
      <div style="display:flex;flex-wrap:wrap;gap:6px">
        ${['bronze','silver','gold','diamond','legend'].map(tier => {
          const reward = formatRewardConfig(toRewardConfig(data[tier] || DEFAULT_CLASS_REWARDS[tier], tier));
          const custom = reward !== formatRewardConfig(toRewardConfig(DEFAULT_CLASS_REWARDS[tier], tier));
          return `<div style="flex:1;min-width:120px;background:var(--bg1);border:1px solid ${custom?'rgba(46,204,113,.3)':'var(--bdr)'};border-radius:6px;padding:7px 10px">
            <div style="font-size:10px;color:var(--tx3);margin-bottom:2px">${iconMap[tier]} ${tierLabel[tier]}</div>
            <div style="font-size:12px;color:${custom?'var(--green)':'var(--tx2)'}">${reward}</div>
            <div style="font-size:10px;color:var(--tx3);margin-top:2px">系統直發</div>
          </div>`;
        }).join('')}
      </div>
    </div>`;
  });
  el.innerHTML = html || '<div class="empty" style="padding:20px">尚無資料</div>';
}
  
window.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeCardZoom();
    closeBag();
    if (!isOpening) closeCardOverlay();
  }
});
