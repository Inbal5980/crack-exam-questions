(function(){
"use strict";
var D=window.DATA, T=D.types, EX=D.ex, SUBJ=D.subj, SK=["soc","psy","eco","pol"], CH=window.CHALLENGE||[], BG=window.BAGRUT||[];
var COL={tzayen:["#2563eb","#eaf1ff","#1e3a8a"],hagder:["#7c3aed","#f1ebff","#4c1d95"],hasber:["#d97706","#fff4e0","#7c3d06"],hadgem:["#059669","#e3f7ee","#064e3b"],hashvaa:["#db2777","#fde8f2","#831843"],tiun:["#dc2626","#fdeaea","#7f1d1d"],amar:["#0d9488","#e0f5f2","#134e4a"]};
var ICO={
 tzayen:'<path d="M3.5 12.2V5.5a2 2 0 0 1 2-2h6.7l8.3 8.3a2 2 0 0 1 0 2.8l-6 6a2 2 0 0 1-2.8 0z"/><circle cx="8.3" cy="8.3" r="1.6"/>',
 hagder:'<path d="M12 6.5C10 5 7 4.5 3.5 5v13c3.5-.5 6.5 0 8.5 1.5 2-1.5 5-2 8.5-1.5V5C17 4.5 14 5 12 6.5z"/><path d="M12 6.5v13"/>',
 hasber:'<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.6 10.8c.7.6 1.1 1.4 1.1 2.2h5c0-.8.4-1.6 1.1-2.2A6 6 0 0 0 12 3z"/><path d="M12 7v3"/>',
 hadgem:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5 21 21"/><path d="M10.5 7.5v6M7.5 10.5h6"/>',
 hashvaa:'<path d="M12 3v18M7 21h10M5 6h14"/><path d="M5 6 2 13a3 3 0 0 0 6 0zM19 6l-3 7a3 3 0 0 0 6 0z"/>',
 tiun:'<rect x="4.5" y="4" width="15" height="17" rx="2.5"/><path d="M9 4V2.8h6V4"/><path d="m8.5 13 2.4 2.4 4.6-4.8"/>',
 amar:'<path d="M4 5h16v10H9l-5 4z"/><path d="M12 12.5s-3-1.8-3-3.6a1.6 1.6 0 0 1 3-.8 1.6 1.6 0 0 1 3 .8c0 1.8-3 3.6-3 3.6z"/>'
};
var SICO={
 soc:'<circle cx="8" cy="8.5" r="3"/><circle cx="16.5" cy="9.5" r="2.5"/><path d="M2.5 19c.6-3.3 2.8-5 5.5-5s4.9 1.7 5.5 5"/><path d="M14 14.6c.8-.4 1.6-.6 2.5-.6 2.3 0 4.2 1.5 4.8 4.5"/>',
 psy:'<path d="M9.5 4.5a3 3 0 0 0-3 2.6A3 3 0 0 0 4.6 12a3 3 0 0 0 1.9 4.9 3 3 0 0 0 5.5 1.3V6a2.5 2.5 0 0 0-2.5-1.5z"/><path d="M14.5 4.5a3 3 0 0 1 3 2.6 3 3 0 0 1 1.9 4.9 3 3 0 0 1-1.9 4.9 3 3 0 0 1-5.5 1.3"/>',
 eco:'<path d="M3.5 20.5h17"/><rect x="5" y="13" width="3" height="5" rx=".8"/><rect x="10.5" y="9" width="3" height="9" rx=".8"/><rect x="16" y="5" width="3" height="13" rx=".8"/>',
 pol:'<path d="M3.5 9 12 4l8.5 5z"/><path d="M5.5 9.5v8M10 9.5v8M14 9.5v8M18.5 9.5v8"/><path d="M3.5 20.5h17"/>'
};
function svg(p,cls){return '<svg class="'+(cls||"ic")+'" viewBox="0 0 24 24" aria-hidden="true">'+p+'</svg>'}
function ico(id,cls){return svg(ICO[id],cls||"ti")}
function sico(k){return svg(SICO[k],"si")}
function cs(id){var c=COL[id];return "--c:"+c[0]+";--t:"+c[1]+";--k:"+c[2]}
var CHEV='<svg class="chev" viewBox="0 0 24 24" aria-hidden="true"><path d="M14.5 6 8.5 12l6 6"/></svg>';
var CHEVR='<svg class="chev" viewBox="0 0 24 24" aria-hidden="true"><path d="M9.5 6l6 6-6 6"/></svg>';
var ARR='<svg class="arr" viewBox="0 0 16 10" aria-hidden="true"><path d="M15 5H2M6 1 2 5l4 4"/></svg>';
var CHECK='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5 10 17 19 7"/></svg>';
var XX='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 6.5l11 11M17.5 6.5l-11 11"/></svg>';
var app=document.getElementById("app");
var KEY="psq-v3", st={};
try{st=JSON.parse(localStorage.getItem(KEY))||{}}catch(e){st={}}
function save(){try{localStorage.setItem(KEY,JSON.stringify(st))}catch(e){}}
function A(s){return String(s).replace(/\{(?:>|&gt;)\}/g,ARR)}
function esc(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}
function typeById(id){for(var i=0;i<T.length;i++)if(T[i].id===id)return T[i];return null}
function exIds(t){var a=[];SK.forEach(function(k){(t.ex[k]||[]).forEach(function(n){a.push(n)})});return a}
var ALL=[];T.forEach(function(t){ALL=ALL.concat(exIds(t))});
function typeOfEx(n){for(var i=0;i<T.length;i++)if(exIds(T[i]).indexOf(n)>=0)return T[i];return null}
var VERBS="ציין|ציינו|הגדר|הגדירו|הסבר|הסבירו|הצג|הציגו|הדגם|הדגימו|השווה|השוו|נמק|נמקו|בסס|בססו|הבא|הביאו|בחר|בחרו|לדעתך|עמדתך";
function hl(s,t){var v=VERBS;if(t&&t.verbs)v=t.verbs.join("|")+"|"+v;
  var re=new RegExp("(^|[^\u05D0-\u05EA])((?:ו|ה)?(?:"+v+"))(?=[^\u05D0-\u05EA]|$)","g");
  return A(esc(s)).replace(re,function(m,p,w){return p+'<mark class="verb">'+w+'</mark>'})}
function setTab(name){[].forEach.call(document.querySelectorAll("[data-tab]"),function(a){var on=a.getAttribute("data-tab")===name;a.classList.toggle("on",on);if(on)a.setAttribute("aria-current","page");else a.removeAttribute("aria-current")})}
function typeNav(cur){
  var n=document.getElementById("typenav");
  n.innerHTML='<div class="tn-in">'+T.map(function(t,i){return '<a href="#/t/'+t.id+'" class="tchip'+(cur===t.id?' on':'')+'" style="'+cs(t.id)+'"'+(cur===t.id?' aria-current="page"':'')+'><span class="tci">'+ico(t.id)+'</span>'+esc(t.name)+'</a>'}).join("")+'</div>';
  var on=n.querySelector(".on");
  if(on){var inr=n.firstChild;var r=on.getBoundingClientRect(),pr=n.getBoundingClientRect();if(r.left<pr.left+8||r.right>pr.right-8){inr.scrollLeft+= (r.left+r.width/2)-(pr.left+pr.width/2)}}
}
function defHTML(t){
  var h='<ul class="def">'+t.def_.map(function(x){return "<li>"+A(x)+"</li>"}).join("")+"</ul>";
  if(t.steps){h+='<ol class="steps">'+t.steps.map(function(s,i){return '<li><span class="sn">'+(i+1)+'</span><div><b class="h">'+A(s[0])+"</b>"+(s[1]?"<ul>"+s[1].map(function(x){return "<li>"+A(x)+"</li>"}).join("")+"</ul>":"")+"</div></li>"}).join("")+"</ol>"}
  return h}
function needBox(t,title){return '<section class="need" style="'+cs(t.id)+'"><h2 class="need-h">'+svg('<path d="M9 4.5h6M9 4.5a1.5 1.5 0 0 0 0 3h6a1.5 1.5 0 0 0 0-3"/><path d="M15 6h2.5a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2H9"/><path d="m8.5 14 2.2 2.2 4.8-4.7"/>',"ic")+(title||'מה נדרש בתשובה?')+'</h2>'+defHTML(t)+'</section>'}
var FAN='<svg class="fan" viewBox="0 0 340 130" aria-hidden="true">'+(function(){var s="",cols=["#2563eb","#7c3aed","#d97706","#059669","#db2777","#dc2626","#0d9488"],ids=["tzayen","hagder","hasber","hadgem","hashvaa","tiun","amar"];
  for(var i=0;i<7;i++){var a=(3-i)*9.5;s+='<g transform="rotate('+a+' 170 330)"><rect x="147" y="26" width="46" height="62" rx="11" fill="'+cols[i]+'"/><rect x="147" y="26" width="46" height="62" rx="11" fill="url(#gl)"/><g transform="translate(158 45)" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'+ICO[ids[i]]+'</g></g>'}
  return '<defs><linearGradient id="gl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".25"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>'+s})()+'</svg>';
function home(){
  setTab("home");typeNav(null);
  var h='<section class="hero"><div class="hero-tx"><p class="kicker">מדעי החברה · הכנה לבגרות</p><h1>פיצוח שאלות<br>בבחינות</h1><p class="sub">מה דורש כל סוג שאלה, ואיך נראית תשובה מלאה. הכל פתוח, עם שאלות ותשובות לדוגמה מבחינות הבגרות.</p>'+
   '<ul class="stats"><li><b>7</b>סוגי שאלות</li><li><b>4</b>מקצועות</li><li><b>31</b>דוגמאות</li><li><b>'+BG.length+'</b>מהבגרות 2022+</li></ul></div>'+FAN+'</section>';
  h+='<div class="sec"><h2>7 סוגי שאלות</h2><span>מהקצר אל המורכב</span></div><div class="types">';
  T.forEach(function(t,i){var n=exIds(t).length;
    h+='<a class="tcard" style="'+cs(t.id)+';--d:'+(i*40)+'ms" href="#/t/'+t.id+'"><span class="tc-ico">'+ico(t.id)+'</span><span class="tc-tx"><small>סוג '+(i+1)+'</small><b>'+esc(t.name)+'</b><span class="tc-short">'+A(esc(t.short))+'</span><span class="tc-meta">'+n+' דוגמאות · '+SK.map(function(k){return sico(k)}).join("")+'</span></span>'+CHEV+'</a>'});
  h+='</div>';
  h+='<div class="feat"><a class="fcard sum" href="#/summary"><span class="fi">'+svg('<rect x="4.5" y="3" width="15" height="18" rx="2.5"/><path d="M8.5 8h7M8.5 12h7M8.5 16h4"/>',"ic")+'</span><span><b>סיכום הגדרות</b><small>כל 7 הסוגים ומה נדרש בכל אחד, בדף אחד</small></span>'+CHEV+'</a>'+
   '<a class="fcard bagr" href="#/bagrut"><span class="fi">'+svg('<path d="M4 7.5 12 4l8 3.5-8 3.5z"/><path d="M7.5 9.2V14c0 1.4 2 2.8 4.5 2.8s4.5-1.4 4.5-2.8V9.2"/><path d="M20 7.5v5"/>',"ic")+'</span><span><b>שאלות מהבגרות 2022 ואילך</b><small>'+BG.length+' שאלות אמיתיות לפי שנה ולפי סוג, עם קישור לשאלון</small></span>'+CHEV+'</a>'+
   '<a class="fcard prac" href="#/practice"><span class="fi">'+svg('<circle cx="12" cy="12" r="8.5"/><path d="M9.6 9.4a2.5 2.5 0 1 1 3.4 2.3c-.6.3-1 .8-1 1.5v.6"/><circle cx="12" cy="16.9" r=".6"/>',"ic")+'</span><span><b>תרגול: איך עונים נכון?</b><small>שאלה אמיתית מהבגרות, בוחרים את הדרך הנכונה לענות</small></span>'+CHEV+'</a></div>';
  h+=credit();
  app.innerHTML=h;
}
function credit(){return '<footer class="credit"><img src="logo.png?v=6" alt="הלוגו של עינבל אריאלי" width="128" height="46" loading="lazy"><b>'+esc(D.credit)+'</b><span>'+esc(D.thanks)+'</span></footer>'}
function tableHTML(tb,num){
  return (tb.caption?'<div class="tcap">'+esc(tb.caption)+'</div>':'')+'<div class="tbl'+(num?'':' stack')+'" tabindex="0" role="region" aria-label="טבלה"><table'+(num?' class="num-t"':'')+'><thead><tr>'+tb.head.map(function(x){return '<th scope="col">'+esc(x)+'</th>'}).join("")+'</tr></thead><tbody>'+
  tb.rows.map(function(r){return "<tr>"+r.map(function(c,i){return i===0?'<th scope="row">'+esc(c)+'</th>':'<td data-l="'+esc(tb.head[i]||"")+'">'+esc(c)+'</td>'}).join("")+"</tr>"}).join("")+'</tbody></table></div>'+(tb.source?'<div class="tsrc">'+esc(tb.source)+'</div>':'')}
function ansHTML(n){
  var e=EX[n], h='<div class="ans"><div class="lb">'+CHECK+'התשובה</div><div class="ans-body">';
  e.a.forEach(function(x){h+=/^<(h4|ol|ul)/.test(x)?A(x):"<p>"+A(x)+"</p>"});
  if(e.table)h+=tableHTML(e.table,false);
  if(e.note)h+='<p class="note">'+esc(e.note)+'</p>';
  h+='</div><button type="button" class="peek" data-peek>'+svg('<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/>',"ic")+'הצגת התשובה</button></div>';
  return h}
function exHTML(n,t,extra){
  var e=EX[n], h='<article class="ex" id="ex'+n+'"><div class="ex-head"><span class="chip subj">'+sico(e.subj)+SUBJ[e.subj]+'</span>'+(e.src?'<span class="chip src">'+esc(e.src)+'</span>':'')+(extra?'<span class="chip extra">דוגמה נוספת</span>':'')+'</div>';
  if(e.stem){h+='<div class="stem"><span class="lb">הפתיח</span><p>'+A(esc(e.stem))+'</p>'+(e.cite?'<div class="cite">'+esc(e.cite)+'</div>':'')+'</div>'}
  h+='<div class="q"><span class="lb">השאלה</span>'+e.q.map(function(x){return "<p>"+hl(x,t)+"</p>"}).join("")+'</div>';
  if(e.qtable)h+=tableHTML(e.qtable,true);
  h+=ansHTML(n)+'</article>';
  return h}
function typePage(id,sub){
  var t=typeById(id);if(!t)return home();
  setTab("home");typeNav(id);
  var idx=T.indexOf(t), prev=T[idx-1], next=T[idx+1];
  var h='<div class="tpage'+(st.hide?' hide-ans':'')+'" style="'+cs(t.id)+'">';
  h+='<section class="thero"><span class="th-ico">'+ico(t.id)+'</span><div><small>סוג שאלה '+(idx+1)+' מתוך 7</small><h1>'+esc(t.name)+'</h1>'+(t.full?'<p class="full">'+esc(t.full)+'</p>':'')+
     '<p class="verbs"><span>מילים בשאלה:</span>'+t.verbs.map(function(v){return '<i>'+esc(v)+'</i>'}).join("")+'</p></div></section>';
  h+=needBox(t);
  h+='<div class="tools"><div class="sjump" role="navigation" aria-label="מעבר למקצוע">'+SK.map(function(k){var c=(t.ex[k]||[]).length;return '<a href="#/t/'+t.id+'/'+k+'" class="schip" data-jump="'+k+'">'+sico(k)+SUBJ[k]+(c>1?'<em>'+c+'</em>':'')+'</a>'}).join("")+(bgOf(t.id).length?'<a href="#/t/'+t.id+'/bagrut" class="schip bgj" data-jump="bagrut">'+svg('<path d="M4 7.5 12 4l8 3.5-8 3.5z"/><path d="M7.5 9.2V14c0 1.4 2 2.8 4.5 2.8s4.5-1.4 4.5-2.8V9.2"/>',"si")+'מהבגרות 2022+<em>'+bgOf(t.id).length+'</em></a>':'')+'</div>'+
     '<label class="switch"><input type="checkbox" id="hideAns"'+(st.hide?' checked':'')+'><span class="sw" aria-hidden="true"></span>הסתר תשובות לתרגול עצמי</label></div>';
  SK.forEach(function(k){var ids=t.ex[k]||[];if(!ids.length)return;
    h+='<section class="sgroup" id="s-'+k+'"><h2 class="sg-h">'+sico(k)+SUBJ[k]+'</h2>';
    ids.forEach(function(n,i){h+=exHTML(n,t,i>0)});h+='</section>'});
  h+=bgSection(t);
  h+='<a class="pracl" href="#/practice/'+t.id+'">'+svg('<circle cx="12" cy="12" r="8.5"/><path d="M9.6 9.4a2.5 2.5 0 1 1 3.4 2.3c-.6.3-1 .8-1 1.5v.6"/><circle cx="12" cy="16.9" r=".6"/>',"ic")+'<span><b>לתרגל שאלות '+esc(t.name)+'</b><small>בוחרים איך נכון לענות</small></span>'+CHEV+'</a>';
  h+='<nav class="pager" aria-label="סוג קודם והבא">'+(prev?'<a class="pg prev" href="#/t/'+prev.id+'" style="'+cs(prev.id)+'">'+CHEVR+'<span><small>הקודם</small>'+esc(prev.name)+'</span></a>':'<span></span>')+
     (next?'<a class="pg next" href="#/t/'+next.id+'" style="'+cs(next.id)+'"><span><small>הבא</small>'+esc(next.name)+'</span>'+CHEV+'</a>':'<a class="pg next" href="#/summary" style="--c:#2b2a6b;--t:#ecebf8;--k:#2b2a6b"><span><small>לסיום</small>סיכום הגדרות</span>'+CHEV+'</a>')+'</nav>';
  h+='</div>';
  app.innerHTML=h;
  var cb=document.getElementById("hideAns");
  cb.addEventListener("change",function(){st.hide=cb.checked;save();var tp=app.querySelector(".tpage");tp.classList.toggle("hide-ans",st.hide);[].forEach.call(app.querySelectorAll(".ans.shown"),function(a){a.classList.remove("shown")})});
  if(sub&&/^\d+$/.test(sub))scrollToEl("ex"+sub);else if(sub)scrollToEl("s-"+sub);
}
function scrollToEl(id){var el=document.getElementById(id);if(el)setTimeout(function(){el.scrollIntoView({block:"start"})},30)}
function summary(){
  setTab("summary");typeNav(null);
  var h='<section class="phead"><h1>סיכום הגדרות</h1><p>מה נדרש בתשובה לכל אחד מ־7 סוגי השאלות.</p></section>';
  h+='<div class="quick" role="table" aria-label="מבט מהיר"><div class="qr qh" role="row"><span role="columnheader">סוג השאלה</span><span role="columnheader">בקצרה</span></div>'+T.map(function(t){return '<a class="qr" role="row" href="#sum-'+t.id+'" data-jumpsum="'+t.id+'" style="'+cs(t.id)+'"><span role="cell" class="qn">'+ico(t.id)+esc(t.name)+'</span><span role="cell">'+A(esc(t.short))+'</span></a>'}).join("")+'</div>';
  h+='<div class="sums">';
  T.forEach(function(t,i){h+='<article class="sumc" id="sum-'+t.id+'" style="'+cs(t.id)+'"><header><span class="th-ico sm">'+ico(t.id)+'</span><div><small>סוג '+(i+1)+'</small><h2>'+esc(t.name)+'</h2>'+(t.full?'<p class="full">'+esc(t.full)+'</p>':'')+'</div></header><p class="short">'+A(esc(t.short))+'</p>'+defHTML(t)+'<a class="more" href="#/t/'+t.id+'">לשאלות ותשובות לדוגמה'+CHEV+'</a></article>'});
  h+='</div>'+credit();
  app.innerHTML=h;
}

/* ---------- bagrut 2022+ ---------- */
var YEARS=(function(){var y={};BG.forEach(function(b){y[b.y]=1});return Object.keys(y).map(Number).sort(function(a,b){return b-a})})();
function bgOf(id){return BG.filter(function(b){return b.t===id})}
var EXT='<svg class="ext" viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4.5h5.5V10M19.5 4.5 11 13M17 13.5v5a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 4 18.5v-10A1.5 1.5 0 0 1 5.5 7h5"/></svg>';
var BULB='<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.6 10.8c.7.5 1.1 1.3 1.1 2.2h5c0-.9.4-1.7 1.1-2.2A6 6 0 0 0 12 3z"/>';
function offHTML(b){
  if(!b.off&&!b.offT)return '<p class="bg-noff">'+svg('<path d="M7 3.5h7l4.5 4.5v12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-15a1 1 0 0 1 1-1z"/><path d="M14 3.5V8h4.5M9 13h6M9 16.5h4"/>',"ic")+'<span>למקצוע הזה לא הבאנו כאן קטע מדגם התשובות. <a href="'+esc(b.ua)+'" target="_blank" rel="noopener">לדגם התשובות הרשמי (PDF)'+EXT+'</a></span></p>';
  var h='<details class="off"><summary>'+CHEV+'<span><b>מתוך דגם התשובות הרשמי</b><small>משרד החינוך · קטע מקוצר</small></span></summary><div class="off-body">';
  (b.off||[]).forEach(function(l){h+='<p>'+esc(l)+'</p>'});
  if(b.offT){var hd=b.offT[0];h+='<div class="otbl">'+b.offT.slice(1).map(function(r){return '<div class="orow"><b>'+esc(r[0])+'</b>'+r.slice(1).map(function(c,i){return '<span><em>'+esc(hd[i+1])+'</em>'+esc(c)+'</span>'}).join("")+'</div>'}).join("")+'</div>'}
  h+='<a class="off-src" href="'+esc(b.ua)+'" target="_blank" rel="noopener">לדגם התשובות המלא (PDF)'+EXT+'</a></div></details>';
  return h}
function bgHTML(b,showType){
  var t=typeById(b.t);
  var h='<article class="bg" data-y="'+b.y+'" data-t="'+b.t+'" style="'+cs(b.t)+'" id="bg-'+b.id+'">';
  h+='<div class="bg-head"><span class="ytag"><b>'+b.y+'</b><small>'+esc(b.hy)+'</small></span><div class="bg-src"><b>'+sico(b.s)+SUBJ[b.s]+' · '+esc(b.moed)+' '+esc(b.hy)+'</b><small>שאלון '+esc(b.sh)+' · שאלה '+esc(b.qn)+'</small></div>'+'</div>';
  if(showType)h=h.replace('<div class="bg-head">','<a class="bg-type" href="#/t/'+t.id+'">'+ico(t.id)+esc(t.name)+'</a><div class="bg-head">');
  if(b.stem)h+='<div class="stem"><span class="lb">הפתיח</span><p>'+esc(b.stem)+'</p></div>';
  h+='<div class="q"><span class="lb">השאלה</span>'+b.q.map(function(x){return "<p>"+hl(x,t)+"</p>"}).join("")+'</div>';
  h+='<div class="hint"><div class="hint-h">'+svg(BULB,"ic")+'<b>מה נדרש כאן?</b><span class="hint-tag">רמז, לא תשובה רשמית</span></div><p>'+esc(b.hint)+'</p></div>';
  h+=offHTML(b);
  h+='<a class="bg-pdf" href="'+esc(b.uq)+'" target="_blank" rel="noopener">'+svg('<path d="M7 3.5h7l4.5 4.5v12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-15a1 1 0 0 1 1-1z"/><path d="M14 3.5V8h4.5"/>',"ic")+'השאלון המקורי (PDF)'+EXT+'</a>';
  h+='</article>';return h}
function yearChips(list,attr){
  var ys=YEARS.filter(function(y){return list.some(function(b){return b.y===y})});
  return '<div class="ychips" role="group" aria-label="סינון לפי שנה"><button type="button" class="ychip on" '+attr+'="all">כל השנים</button>'+ys.map(function(y){return '<button type="button" class="ychip" '+attr+'="'+y+'">'+y+'</button>'}).join("")+'</div>'}
function bgSection(t){
  var list=bgOf(t.id);if(!list.length)return "";
  var h='<section class="bgsec" id="s-bagrut"><div class="bgsec-h"><span class="bgsec-ico">'+svg('<path d="M4 7.5 12 4l8 3.5-8 3.5z"/><path d="M7.5 9.2V14c0 1.4 2 2.8 4.5 2.8s4.5-1.4 4.5-2.8V9.2"/><path d="M20 7.5v5"/>',"ic")+'</span><div><h2>מהבגרות 2022 ואילך</h2><p>'+list.length+' שאלות אמיתיות מבחינות הבגרות שמשתמשות בהוראה "'+esc(t.name)+'"</p></div></div>';
  h+=yearChips(list,"data-by");
  h+='<div class="bglist">'+list.map(function(b){return bgHTML(b,false)}).join("")+'</div>';
  h+='<a class="bgall" href="#/bagrut">'+svg('<rect x="4" y="5" width="16" height="15" rx="2.5"/><path d="M4 9.5h16M8.5 3v4M15.5 3v4"/>',"ic")+'<span><b>כל שאלות הבגרות לפי שנה</b><small>'+BG.length+' שאלות מ־'+YEARS.length+' שנים</small></span>'+CHEV+'</a>';
  return h+'</section>'}
function bagrutPage(f){
  setTab("bagrut");typeNav(null);
  if(f&&!typeById(f))f=null;
  var list=f?bgOf(f):BG;
  var h='<section class="phead"><h1>שאלות מהבגרות 2022 ואילך</h1><p>שאלות אמיתיות מבחינות הבגרות במדעי החברה, לפי שנה. בכל שאלה: מאיזה שאלון היא, רמז למה שנדרש, וקישור לשאלון המקורי.</p></section>';
  h+='<div class="pfilter" role="navigation" aria-label="סינון לפי סוג שאלה"><div class="pf-in"><a href="#/bagrut" class="pchip'+(!f?' on':'')+'">כל הסוגים</a>'+T.map(function(tt){var n=bgOf(tt.id).length;return '<a href="#/bagrut/'+tt.id+'" class="pchip'+(f===tt.id?' on':'')+'" style="'+cs(tt.id)+'">'+esc(tt.name)+' <em>'+n+'</em></a>'}).join("")+'</div></div>';
  h+=yearChips(list,"data-byall");
  YEARS.forEach(function(y){var ys=list.filter(function(b){return b.y===y});if(!ys.length)return;
    h+='<section class="ygroup" data-yg="'+y+'"><h2 class="yg-h"><span>'+y+'</span>'+esc(ys[0].hy)+' · '+(ys.length===1?'שאלה אחת':ys.length+' שאלות')+'</h2>'+ys.map(function(b){return bgHTML(b,true)}).join("")+'</section>'});
  h+='<p class="pnote bgnote">מקור: מאגר בחינות הבגרות ודגמי התשובות של משרד החינוך. ניסוח השאלות הועתק מהשאלונים. ה"רמז" נכתב על פי ההגדרות במדריך הזה, והוא לא חלק מהבחינה או מדגם התשובות.</p>'+credit();
  app.innerHTML=h;
}
function filterYear(btn,attr,scope){
  var v=btn.getAttribute(attr);
  [].forEach.call(btn.parentNode.querySelectorAll(".ychip"),function(c){c.classList.toggle("on",c===btn)});
  [].forEach.call(scope.querySelectorAll(".bg"),function(c){c.hidden=!(v==="all"||c.getAttribute("data-y")===v)});
  [].forEach.call(scope.querySelectorAll(".ygroup"),function(g){g.hidden=!(v==="all"||g.getAttribute("data-yg")===v)});
}
/* ---------- practice ---------- */
function shuffle(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var x=a[i];a[i]=a[j];a[j]=x}return a}
var P=null;
function newPractice(f){
  var pool=CH.filter(function(x){if(!EX[x.id])return false;if(!f)return true;var t=typeOfEx(x.id);return t&&t.id===f});
  P={f:f,items:shuffle(pool),i:0,answered:false};
  P.items.forEach(function(x){x._o=null});
}
function practice(f){
  if(f&&!typeById(f))f=null;
  if(!P||P.f!==(f||null))newPractice(f||null);
  setTab("practice");typeNav(null);
  if(P.i>=P.items.length)newPractice(P.f);
  var x=P.items[P.i], e=EX[x.id], t=typeOfEx(x.id);
  if(!x._o)x._o=shuffle([{t:x.ok,ok:true}].concat(x.no.map(function(s){return{t:s,ok:false}})));
  var h='<div class="pw"><section class="phead"><h1>תרגול: איך עונים נכון?</h1><p>שאלה אמיתית מהבגרות. בוחרים את הדרך הנכונה לענות עליה, ומקבלים הסבר.</p></section>';
  h+='<div class="pfilter" role="navigation" aria-label="תרגול לפי סוג"><div class="pf-in"><a href="#/practice" class="pchip'+(!P.f?' on':'')+'">כל הסוגים</a>'+T.map(function(tt){return '<a href="#/practice/'+tt.id+'" class="pchip'+(P.f===tt.id?' on':'')+'" style="'+cs(tt.id)+'">'+esc(tt.name)+'</a>'}).join("")+'</div></div>';
  h+='<article class="qcard"><div class="qmeta"><span class="fmt '+x.f+'">'+(x.f==="a"?'מה צריכה לכלול התשובה?':'איזו תשובה מלאה?')+'</span><span class="chip subj">'+sico(e.subj)+SUBJ[e.subj]+'</span>'+(e.src?'<span class="chip src">'+esc(e.src)+'</span>':'')+'</div>';
  if(e.stem)h+='<details class="qstem"><summary>'+CHEV+'הפתיח</summary><p>'+A(esc(e.stem))+'</p></details>';
  if(e.qtable)h+='<details class="qstem"><summary>'+CHEV+'הטבלה</summary>'+tableHTML(e.qtable,true)+'</details>';
  h+='<div class="qq">'+e.q.map(function(s){return '<p>'+A(esc(s))+'</p>'}).join("")+'</div>';
  h+='<p class="qask">'+(x.f==="a"?'מה צריכה לכלול תשובה נכונה לשאלה הזאת?':'שלוש תשובות של תלמידים. איזו מהן מלאה ומדויקת?')+'</p>';
  h+='<div class="opts '+x.f+'">'+x._o.map(function(o,i){return '<button type="button" class="opt" data-o="'+i+'"><span class="ol">'+"אבגד"[i]+'</span><span class="ot">'+esc(o.t)+'</span><span class="om" aria-hidden="true"></span></button>'}).join("")+'</div>';
  h+='<div id="qfb" class="qfb" aria-live="polite"></div></article>';
  h+='<p class="pnote">המסיחים וההסברים בתרגול נכתבו על בסיס ההגדרות והתשובות במדריך.</p></div>';
  app.innerHTML=h;P.answered=false;
}
function answer(btn){
  if(P.answered)return;P.answered=true;
  var x=P.items[P.i],o=x._o[+btn.getAttribute("data-o")],t=typeOfEx(x.id);
  [].forEach.call(document.querySelectorAll(".opt"),function(b,i){b.disabled=true;if(x._o[i].ok){b.classList.add("right");b.querySelector(".om").innerHTML=CHECK}});
  if(!o.ok){btn.classList.add("wrong");btn.querySelector(".om").innerHTML=XX}else btn.classList.add("picked");
  var fb=document.getElementById("qfb");
  fb.innerHTML='<div class="fbh '+(o.ok?'ok':'no')+'">'+(o.ok?CHECK+'נכון':XX+'לא בדיוק')+'</div>'+
   '<p class="why"><b>למה?</b> '+esc(x.why)+'</p>'+
   (t?'<a class="fbtype" style="'+cs(t.id)+'" href="#/t/'+t.id+'/'+x.id+'">'+ico(t.id)+'<span><b>'+esc(t.name)+': '+A(esc(t.short))+'</b><small>לשאלה ולתשובה המלאה במדריך</small></span>'+CHEV+'</a>':'')+
   '<button type="button" class="nextbtn" id="qnext">שאלה הבאה'+CHEV+'</button>';
  fb.classList.add("show");
  setTimeout(function(){var r=fb.getBoundingClientRect();if(r.top>window.innerHeight*.6)window.scrollBy({top:r.top-window.innerHeight*.3,behavior:"smooth"})},60);
}
/* ---------- events / routing ---------- */
document.addEventListener("click",function(ev){
  var b=ev.target.closest("[data-peek]");if(b){b.closest(".ans").classList.add("shown");return}
  var o=ev.target.closest(".opt");if(o&&P){answer(o);return}
  if(ev.target.closest("#qnext")){P.i++;practice(P.f);window.scrollTo(0,0);return}
  var yb=ev.target.closest("[data-by]");if(yb){filterYear(yb,"data-by",yb.closest(".bgsec"));return}
  var ya=ev.target.closest("[data-byall]");if(ya){filterYear(ya,"data-byall",app);return}
  var j=ev.target.closest("[data-jump]");if(j){ev.preventDefault();var el=document.getElementById("s-"+j.getAttribute("data-jump"));if(el)el.scrollIntoView({block:"start",behavior:"smooth"});return}
  var js=ev.target.closest("[data-jumpsum]");if(js){ev.preventDefault();var el2=document.getElementById("sum-"+js.getAttribute("data-jumpsum"));if(el2)el2.scrollIntoView({block:"start",behavior:"smooth"});return}
});
var last="";
function route(){
  var hsh=location.hash.replace(/^#\/?/,""), p=hsh.split("/");
  if(hsh.indexOf("sum-")===0)return;
  var key=hsh;
  app.classList.remove("enter");void app.offsetWidth;app.classList.add("enter");
  if(p[0]==="t")typePage(p[1],p[2]);
  else if(p[0]==="summary")summary();
  else if(p[0]==="practice")practice(p[1]||null);
  else if(p[0]==="bagrut")bagrutPage(p[1]||null);
  else home();
  if(!(p[0]==="t"&&p[2]))window.scrollTo(0,0);
  last=key;
  var h1=app.querySelector("h1");document.title=(h1&&p[0]?h1.textContent+" · ":"")+"פיצוח שאלות בבחינות במדעי החברה";
}
window.addEventListener("hashchange",route);
route();
})();
