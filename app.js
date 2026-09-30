const challenges = [
  {id:'no-alcohol',cat:'habit',type:'LIFESTYLE',num:'01',title:'NO ALCOHOL',desc:'30 өдөр архи, пиво, согтууруулах ундаагүй. Өдөр бүр proof.',difficulty:'HARD',duration:30,goal:'Zero alcohol'},
  {id:'no-bet',cat:'habit',type:'LIFESTYLE',num:'02',title:'NO BET / GAMBLE',desc:'Мөрийтэй тоглоом, betting-ээс 30 өдөр завсарла. Өөртөө хөрөнгө оруул.',difficulty:'HARD',duration:30,goal:'Zero betting'},
  {id:'no-smoking',cat:'habit',type:'LIFESTYLE',num:'03',title:'NO SMOKING',desc:'30 өдөр тамхигүй. Нэг өдөр бүр нэг ялалт.',difficulty:'HARD',duration:30,goal:'Zero smoking'},
  {id:'no-sugar',cat:'habit',type:'LIFESTYLE',num:'04',title:'NO SUGAR',desc:'Нэмсэн сахаргүй 30 өдөр. Ус, уураг, цэвэр хоол.',difficulty:'MEDIUM',duration:30,goal:'No added sugar'},
  {id:'workout',cat:'habit',type:'LIFESTYLE',num:'05',title:'WORKOUT 30',desc:'Өдөр бүр хөдөл. 30 өдөр тасралтгүй өөрийгөө хөгжүүл.',difficulty:'MEDIUM',duration:30,goal:'Move every day'},
  {id:'sw-360',cat:'street',type:'STREET WORKOUT',num:'06',title:'360',desc:'360 эргэлтийг өдөр бүр техникээр давт. Чанар > хурд.',difficulty:'ELITE',duration:30,goal:'Practice 20 min'},
  {id:'sw-540',cat:'street',type:'STREET WORKOUT',num:'07',title:'540',desc:'540 spin-ийн техник, take-off, landing дээр ажилла.',difficulty:'ELITE',duration:30,goal:'Practice 20 min'},
  {id:'sw-720',cat:'street',type:'STREET WORKOUT',num:'08',title:'720',desc:'720 эргэлтийн control-оо хөгжүүл. Алхам бүрээ proof болго.',difficulty:'LEGEND',duration:30,goal:'Practice 25 min'},
  {id:'supra-540',cat:'street',type:'STREET WORKOUT',num:'09',title:'SUPRA 540',desc:'Supra 540-ийн техник дээр 30 өдөр системтэй ажилла.',difficulty:'ELITE',duration:30,goal:'Practice 25 min'},
  {id:'king-540',cat:'street',type:'STREET WORKOUT',num:'10',title:'KING 540',desc:'King 540 challenge. Хүч + coordination + control.',difficulty:'LEGEND',duration:30,goal:'Practice 25 min'},
  {id:'front-planche',cat:'street',type:'STREET WORKOUT',num:'11',title:'FRONT PLANCHE',desc:'Front planche-д шаардлагатай хүч, hold, body line-аа хөгжүүл.',difficulty:'LEGEND',duration:30,goal:'Hold / progress'},
  {id:'hefesto',cat:'street',type:'STREET WORKOUT',num:'12',title:'HEFESTO',desc:'Hefesto-ийн уян хатан байдал, таталт, хяналтыг шаталж хөгжүүл.',difficulty:'LEGEND',duration:30,goal:'Technique practice'},
  {id:'handstand',cat:'street',type:'STREET WORKOUT',num:'13',title:'HANDSTAND',desc:'Өдөр бүр balance practice. Wall → free balance.',difficulty:'ADVANCED',duration:30,goal:'Balance practice'},
  {id:'back-shoulder',cat:'gym',type:'GYM',num:'14',title:'МӨР + НУРУУ',desc:'Өдөр бүр мөр, нурууны workout-оо хийж proof зураг үлдээ.',difficulty:'MEDIUM',duration:30,goal:'4 sets / muscle'},
  {id:'chest-biceps',cat:'gym',type:'GYM',num:'15',title:'ЦЭЭЖ + 2 ТОЛГОЙ',desc:'Цээж + biceps focus. Техник, full range, consistency.',difficulty:'MEDIUM',duration:30,goal:'4 sets / muscle'},
  {id:'legs-triceps',cat:'gym',type:'GYM',num:'16',title:'ХӨЛ + 3 ТОЛГОЙ',desc:'Legs + triceps challenge. Хүчтэй суурь, хүчтэй бие.',difficulty:'HARD',duration:30,goal:'4 sets / muscle'}
];
const quotes=[
 'Өнөөдрийн шийдвэр маргаашийн чамайг бүтээнэ.',
 'Төгс байх хэрэггүй. Тасралтгүй байхад л болно.',
 'Хийсэн нэг өдөр чинь хийж чадаагүй зуун бодлоос илүү.',
 'Өнөөдөр чадсан бол маргааш ч чадна.',
 'Өөрийгөө ялсан өдөр бүр — нэг алхам урагш.'
];
const KEY='hugoChallenge_v2';
let state=JSON.parse(localStorage.getItem(KEY)||'null')||{user:null,activeChallenge:null,starts:{},proofs:{},completed:{},streaks:{}};
let currentFilter='all', selectedProof=null;
const $=s=>document.querySelector(s); const $$=s=>document.querySelectorAll(s);
function save(){localStorage.setItem(KEY,JSON.stringify(state));}
function today(){return new Date().toISOString().slice(0,10)}
function dayDiff(a,b){return Math.floor((new Date(b)-new Date(a))/86400000)}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]))}
function active(){return challenges.find(c=>c.id===state.activeChallenge)}
function renderChallenges(){
  const list=challenges.filter(c=>currentFilter==='all'||c.cat===currentFilter);
  $('#challengeGrid').innerHTML=list.map(c=>`<article class="challenge-card"><div class="glow"></div><div><div class="num">${c.num} <span class="type">/ ${c.type}</span></div><h3>${escapeHtml(c.title)}</h3><p>${escapeHtml(c.desc)}</p></div><div class="card-bottom"><span class="difficulty">${c.difficulty} • ${c.duration} DAYS</span><button data-start="${c.id}">START →</button></div></article>`).join('');
  $$('[data-start]').forEach(b=>b.onclick=()=>openChallenge(b.dataset.start));
}
function openChallenge(id){
 const c=challenges.find(x=>x.id===id); if(!c)return;
 $('#challengeModalContent').innerHTML=`<div class="challenge-hero"><div class="badge">${c.num}</div><div><span class="section-kicker">${c.type}</span><h2>${escapeHtml(c.title)}</h2><p>${escapeHtml(c.desc)}</p></div></div><div class="challenge-details"><div class="detail-box"><span>DURATION</span><strong>${c.duration} days</strong></div><div class="detail-box"><span>DAILY GOAL</span><strong>${escapeHtml(c.goal)}</strong></div><div class="detail-box"><span>DIFFICULTY</span><strong>${c.difficulty}</strong></div></div><div class="modal-actions"><button class="primary-btn wide" id="startChallengeBtn">${state.activeChallenge===c.id?'CONTINUE CHALLENGE':'START THIS CHALLENGE →'}</button></div>`;
 $('#challengeModal').classList.add('open');
 $('#startChallengeBtn').onclick=()=>{startChallenge(id);closeModal('challengeModal');scrollToProof()};
}
function startChallenge(id){
 if(!state.user){openAccount();toast('Эхлээд account үүсгээрэй 👤');return}
 if(state.activeChallenge!==id){state.activeChallenge=id; if(!state.starts[id])state.starts[id]=today();}
 save();renderAll();toast(`${challenges.find(c=>c.id===id).title} эхэллээ. Өнөөдөр Day 1! 🔥`);scrollToProof();
}
function scrollToProof(){setTimeout(()=>document.querySelector('#proof').scrollIntoView({behavior:'smooth'}),150)}
function openAccount(){ $('#accountModal').classList.add('open'); $('#nameInput').focus(); }
function closeModal(id){document.getElementById(id).classList.remove('open')}
function showProof(){
 const c=active(); if(!c){$('#proofDayLabel').textContent='DAY 01';$('#proofNote').textContent='Эхлээд challenge эхлүүлээрэй.';$('#completeBtn').disabled=true;return}
 const start=state.starts[c.id]||today(); const day=Math.min(c.duration,Math.max(1,dayDiff(start,today())+1));
 $('#proofDayLabel').textContent=`DAY ${String(day).padStart(2,'0')}`;
 const key=`${c.id}:${today()}`; const existing=state.proofs[key]; selectedProof=existing||null;
 $('#proofStreak').textContent=calcStreak(c.id); $('#completeBtn').disabled=!state.user;
 if(existing){$('#uploadBox').classList.add('has-image');$('#preview').src=existing.image;$('#proofNote').textContent='Өнөөдрийн proof хадгалагдсан. Маргааш дахин үргэлжлүүлээрэй. 🔥'}else{$('#uploadBox').classList.remove('has-image');$('#preview').removeAttribute('src');$('#proofNote').textContent=state.user?'Зураг upload хийсний дараа Complete дарна.':'Account үүсгээд challenge эхлүүлээрэй.'}
}
function calcStreak(id){
 let n=0, d=new Date(); const completed=state.completed[id]||{}; for(let i=0;i<365;i++){const k=d.toISOString().slice(0,10); if(completed[k]){n++;d.setDate(d.getDate()-1)}else break} return n;
}
function resizeImage(file){return new Promise((resolve,reject)=>{const r=new FileReader();r.onload=()=>{const img=new Image();img.onload=()=>{const max=900, scale=Math.min(1,max/Math.max(img.width,img.height));const cv=document.createElement('canvas');cv.width=Math.round(img.width*scale);cv.height=Math.round(img.height*scale);cv.getContext('2d').drawImage(img,0,0,cv.width,cv.height);resolve(cv.toDataURL('image/jpeg',.72))};img.onerror=reject;img.src=r.result};r.onerror=reject;r.readAsDataURL(file)})}
async function completeToday(){
 if(!state.user){openAccount();return}
 const c=active(); if(!c){toast('Challenge сонгоно уу.');return}
 if(state.proofs[`${c.id}:${today()}`]){toast('Өнөөдөр аль хэдийн баталгаажсан байна. 🔥');return}
 if(!selectedProof){toast('Өнөөдрийн proof зургаа эхлээд upload хийгээрэй 📸');$('#proofInput').click();return}
 const key=`${c.id}:${today()}`; state.proofs[key]={image:selectedProof,date:today()}; state.completed[c.id]??={}; state.completed[c.id][today()]=true; save(); renderAll(); celebrate();
 const msgs=['Чи хийчихлээ! Маргааш ч бас чадна. 🔥','Өнөөдрийн ялалт — чинийх. Дараагийн өдөр рүү!','Consistency wins. Өөрөөрөө бахарх.','One more day. One more win.']; toast(msgs[Math.floor(Math.random()*msgs.length)]);
}
function renderDashboard(){
 const user=state.user; $('#profileName').textContent=user?user.name:'Guest'; $('#profileStatus').textContent=user?'Active HUGO Challenger':'Account үүсгээгүй'; $('#avatar').textContent=user?user.name.charAt(0).toUpperCase():'H';
 const id=state.activeChallenge; $('#dashStreak').textContent=id?calcStreak(id):0; $('#dashCompleted').textContent=id?Object.keys(state.completed[id]||{}).length:0; $('#dashChallenges').textContent=Object.keys(state.starts||{}).length;
 const c=active(); const days=c?c.duration:30; $('#timeline').innerHTML=Array.from({length:days},(_,i)=>{const date=c&&state.starts[c.id]?new Date(state.starts[c.id]):new Date(); if(c)date.setDate(date.getDate()+i); const key=date.toISOString().slice(0,10);const done=c&&(state.completed[c.id]||{})[key];return `<div class="day-dot ${done?'done':''} ${i===0&&!done?'current':''}" title="${key}">${done?'✓':i+1}</div>`}).join('');
}
function renderAll(){renderChallenges();showProof();renderDashboard()}
function celebrate(){const box=$('#confetti');box.innerHTML='';for(let i=0;i<42;i++){const el=document.createElement('i');el.style.left=Math.random()*100+'%';el.style.animationDelay=Math.random()*.35+'s';el.style.transform=`rotate(${Math.random()*180}deg)`;box.appendChild(el)}setTimeout(()=>box.innerHTML='',2200)}
function toast(msg){const t=$('#toast');t.textContent=msg;t.classList.add('show');clearTimeout(window.__toast);window.__toast=setTimeout(()=>t.classList.remove('show'),3000)}
$$('.tab').forEach(t=>t.onclick=()=>{$$('.tab').forEach(x=>x.classList.remove('active'));t.classList.add('active');currentFilter=t.dataset.filter;renderChallenges()});
$('#accountBtn').onclick=openAccount;$('#heroAccountBtn').onclick=openAccount;$('#loginBtn').onclick=()=>state.user?toast(`Сайн байна уу, ${state.user.name}! 🔥`):openAccount;$('#profileBtn').onclick=()=>state.user?toast(`${state.user.name} • ${active()?.title||'Challenge сонгоно уу'}`):openAccount;
$$('[data-close]').forEach(b=>b.onclick=()=>closeModal(b.dataset.close));$$('.modal-backdrop').forEach(m=>m.onclick=e=>{if(e.target===m)m.classList.remove('open')});
$('#accountForm').onsubmit=e=>{e.preventDefault();const name=$('#nameInput').value.trim();if(!name)return;state.user={name,email:$('#emailInput').value.trim()};save();closeModal('accountModal');renderAll();toast(`Welcome ${name}! Challenge-ээ сонгоод эхлээрэй. 🔥`);document.querySelector('#challenges').scrollIntoView({behavior:'smooth'})};
$('#choosePhoto').onclick=()=>$('#proofInput').click();$('#uploadBox').onclick=e=>{if(e.target.closest('button')||$('#uploadBox').classList.contains('has-image'))return;$('#proofInput').click()};
$('#proofInput').onchange=async e=>{const file=e.target.files[0];if(!file)return;try{selectedProof=await resizeImage(file);$('#preview').src=selectedProof;$('#uploadBox').classList.add('has-image');$('#proofNote').textContent='Зураг бэлэн. Одоо Complete дарна. 📸'}catch{toast('Зураг уншиж чадсангүй. Дахин оролдоно уу.')}};
$('#completeBtn').onclick=completeToday;
const demoParticipants=[
 {name:'Anu',challenge:'NO ALCOHOL',day:18,streak:18,avatar:'A',message:'Өнөөдөр ч бас чадлаа 🔥'},
 {name:'Temuulen',challenge:'HANDSTAND',day:12,streak:12,avatar:'T',message:'Balance өдөр бүр сайжирч байна.'},
 {name:'Saraa',challenge:'NO BET / GAMBLE',day:27,streak:27,avatar:'S',message:'27 days. No excuses.'},
 {name:'Bataa',challenge:'FRONT PLANCHE',day:9,streak:9,avatar:'B',message:'Small progress is still progress.'},
 {name:'Namuun',challenge:'ЦЭЭЖ + 2 ТОЛГОЙ',day:21,streak:21,avatar:'N',message:'Consistency over motivation.'},
 {name:'Erden',challenge:'540',day:15,streak:15,avatar:'E',message:'Өнөөдрийн training дууслаа.'}
];
function renderCommunity(){
 const own=state.user&&active()&&Object.keys(state.completed[active().id]||{}).length? [{name:state.user.name,challenge:active().title,day:Object.keys(state.completed[active().id]||{}).length,streak:calcStreak(active().id),avatar:state.user.name.charAt(0).toUpperCase(),message:'Өөрийн proof-оо өдөр бүр үргэлжлүүлж байна 🔥',own:true}]:[];
 const people=[...own,...demoParticipants];
 $('#participantGrid').innerHTML=people.map((p,i)=>`<article class="participant-card ${p.own?'is-own':''}"><div class="participant-top"><div class="mini-avatar">${escapeHtml(p.avatar)}</div><div><strong>${escapeHtml(p.name)}</strong><span>${escapeHtml(p.challenge)}</span></div><b>🔥 ${p.streak}</b></div><div class="participant-photo ${p.own?'own-photo':''}">${p.own&&state.proofs[`${active().id}:${today()}`]?`<img src="${state.proofs[`${active().id}:${today()}`].image}" alt="Proof">`:`<div class="photo-placeholder">DAY ${String(p.day).padStart(2,'0')}<small>PROOF</small></div>`}</div><div class="participant-bottom"><span>DAY ${p.day} / 30</span><button class="cheer-btn" data-cheer="${escapeHtml(p.name)}">♡ УРАМ ӨГӨХ</button></div><p class="participant-message">${escapeHtml(p.message)}</p></article>`).join('');
 $$('.cheer-btn').forEach(b=>b.onclick=()=>{toast(`${b.dataset.cheer}-д урам өглөө. 🔥`);b.textContent='♥ УРАМ ӨГСӨН';});
}
function populateShareChallenges(){ $('#shareChallenge').innerHTML=challenges.map(c=>`<option value="${c.id}">${escapeHtml(c.title)}</option>`).join(''); if(active()) $('#shareChallenge').value=active().id; }
let storyImage=null;
function drawStory(){
 const canvas=$('#storyCanvas'),ctx=canvas.getContext('2d'),file=$('#shareInput').files[0]; const c=challenges.find(x=>x.id===$('#shareChallenge').value)||challenges[0]; const day=Math.max(1,Math.min(30,Number($('#shareDay').value)||1));
 const draw=(img)=>{ctx.fillStyle='#080a0f';ctx.fillRect(0,0,canvas.width,canvas.height); if(img){const scale=Math.max(canvas.width/img.width,canvas.height/img.height);const w=img.width*scale,h=img.height*scale;ctx.drawImage(img,(canvas.width-w)/2,(canvas.height-h)/2,w,h);} ctx.fillStyle='rgba(5,7,10,.54)';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.fillStyle='#f4c95d';ctx.font='900 16px Montserrat,Arial';ctx.fillText('HUGO CHALLENGE',26,48);ctx.fillStyle='#fff';ctx.font='900 46px Montserrat,Arial';ctx.fillText(`DAY ${String(day).padStart(2,'0')}`,26,105);ctx.font='800 20px Montserrat,Arial';wrapText(ctx,c.title,26,145,310,26);ctx.fillStyle='#63e6a6';ctx.font='900 18px Montserrat,Arial';ctx.fillText('✓ SUCCESS',26,canvas.height-105);ctx.fillStyle='#fff';ctx.font='700 13px Montserrat,Arial';ctx.fillText('NO EXCUSES. JUST PROOF.',26,canvas.height-70);ctx.strokeStyle='#f4c95d';ctx.lineWidth=2;ctx.strokeRect(16,16,canvas.width-32,canvas.height-32);storyImage=canvas.toDataURL('image/png');};
 if(file){const r=new FileReader();r.onload=()=>{const img=new Image();img.onload=()=>draw(img);img.src=r.result};r.readAsDataURL(file)}else{draw(null)}
}
function wrapText(ctx,text,x,y,maxWidth,lineHeight){const words=text.split(' ');let line='';for(const w of words){const test=line?line+' '+w:w;if(ctx.measureText(test).width>maxWidth&&line){ctx.fillText(line,x,y);line=w;y+=lineHeight}else line=test}if(line)ctx.fillText(line,x,y)}
async function shareStory(){ if(!storyImage)drawStory(); const blob=await (await fetch(storyImage)).blob();const file=new File([blob],'hugo-story.png',{type:'image/png'}); if(navigator.share&&navigator.canShare&&navigator.canShare({files:[file]})){try{await navigator.share({title:'HUGO Challenge',text:'My HUGO Challenge proof 🔥',files:[file]});return}catch(e){}} const a=document.createElement('a');a.href=storyImage;a.download='hugo-challenge-story.png';a.click();toast('Story зураг бэлэн боллоо. Instagram дээрээ upload хийгээрэй 📲');}
$('#openShareBtn').onclick=()=>{populateShareChallenges();$('#shareModal').classList.add('open');setTimeout(drawStory,50)};$('#shareChallenge').onchange=drawStory;$('#shareDay').oninput=drawStory;$('#shareInput').onchange=drawStory;$('#shareForm').onsubmit=e=>{e.preventDefault();drawStory();toast('HUGO Story frame бэлэн боллоо 🔥');};$('#nativeShareBtn').onclick=shareStory;
$$('.reward-demo').forEach(b=>b.onclick=()=>toast(`${b.dataset.reward}: 30/30 дуусгасны дараа reward хэсгээс claim хийх боломжтой болно. 🎁`));
const oldRenderAll=renderAll; renderAll=function(){oldRenderAll();renderCommunity();};
setInterval(()=>{$('#heroQuote').textContent=quotes[Math.floor(Date.now()/4000)%quotes.length]},4000);
renderAll();
