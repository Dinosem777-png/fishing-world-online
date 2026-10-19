(()=>{'use strict';
const $=id=>document.getElementById(id);
const FISH=[
{id:'roach',name:'Плотва',emoji:'🐟',min:.12,max:.8,value:8,xp:8,spots:[0,1,2],baits:['worm','bread']},
{id:'crucian',name:'Карась',emoji:'🐠',min:.2,max:1.8,value:14,xp:12,spots:[0,1],baits:['worm','bread','corn']},
{id:'perch',name:'Окунь',emoji:'🐟',min:.15,max:2.2,value:16,xp:14,spots:[0,1,2],baits:['worm','spinner']},
{id:'bream',name:'Лещ',emoji:'🐡',min:.5,max:4.5,value:26,xp:20,spots:[0,1],baits:['worm','corn']},
{id:'pike',name:'Щука',emoji:'🐊',min:1,max:12,value:55,xp:35,spots:[1,2],baits:['spinner','minnow']},
{id:'carp',name:'Карп',emoji:'🐟',min:1,max:16,value:62,xp:38,spots:[0,2],baits:['corn','bread']},
{id:'trout',name:'Форель',emoji:'🐟',min:.4,max:5.5,value:44,xp:30,spots:[2],baits:['spinner','worm']},
{id:'catfish',name:'Сом',emoji:'🦈',min:3,max:35,value:130,xp:65,spots:[1,2],baits:['worm','minnow']},
{id:'gold',name:'Золотой карась',emoji:'✨',min:.4,max:3,value:180,xp:90,spots:[0,1,2],baits:['corn'],rare:true},
{id:'albino',name:'Белый сом',emoji:'🤍',min:8,max:48,value:240,xp:130,spots:[1,2],baits:['minnow','worm'],rare:true},
{id:'sturgeon',name:'Осётр',emoji:'🐉',min:4,max:32,value:210,xp:115,spots:[1,2],baits:['minnow','worm'],rare:true},
{id:'mooncarp',name:'Лунный карп',emoji:'🌙',min:2,max:18,value:260,xp:150,spots:[0,2],baits:['corn'],rare:true},
{id:'legendpike',name:'Легендарная щука',emoji:'🐲',min:12,max:55,value:420,xp:220,spots:[2],baits:['spinner','minnow'],rare:true}
];
const SPOTS=[
{id:0,name:'Тихое озеро',emoji:'🌅',desc:'Спокойный водоём для начинающих рыбаков.',level:1,cost:0,bonus:1,fish:'Карась, плотва, окунь'},
{id:1,name:'Старая река',emoji:'🌿',desc:'Глубокие заводи, лещи и хищная щука.',level:3,cost:180,bonus:1.25,fish:'Лещ, щука, сом'},
{id:2,name:'Лесная заводь',emoji:'🌲',desc:'Чистая вода и шанс поймать редкий трофей.',level:5,cost:450,bonus:1.6,fish:'Форель, карп, сом'}
];
const BAITS=[{id:'worm',name:'Червь',emoji:'🪱',cost:0},{id:'bread',name:'Хлеб',emoji:'🍞',cost:0},{id:'corn',name:'Кукуруза',emoji:'🌽',cost:12},{id:'spinner',name:'Блесна',emoji:'🥄',cost:25},{id:'minnow',name:'Живец',emoji:'🦐',cost:35}];
const GEAR=[
{id:'rod',name:'Удочка',emoji:'🎣',items:[{name:'Бамбуковая',power:1,cost:0,desc:'Простая удочка для первых уловов.'},{name:'Телескопическая',power:1.45,cost:180,desc:'Увереннее справляется с сильной рыбой.'},{name:'Карповая Pro',power:2,cost:520,desc:'Мощная снасть для крупных трофеев.'}]},
{id:'line',name:'Леска',emoji:'🧵',items:[{name:'0.18 мм',power:1,cost:0,desc:'Тонкая леска для небольшой рыбы.'},{name:'0.28 мм',power:1.35,cost:130,desc:'Повышенная прочность.'},{name:'0.40 мм',power:1.8,cost:390,desc:'Для серьёзной борьбы.'}]},
{id:'reel',name:'Катушка',emoji:'⚙️',items:[{name:'Базовая',power:1,cost:0,desc:'Стандартная катушка.'},{name:'Быстрый ход',power:1.25,cost:160,desc:'Помогает быстрее утомлять рыбу.'},{name:'Мороз',power:1.65,cost:420,desc:'Мощная тяга и надёжный механизм.'}]},
{id:'hook',name:'Крючок',emoji:'🪝',items:[{name:'Обычный №8',power:1,cost:0,desc:'Для небольшой рыбы до 3 кг.'},{name:'Усиленный №4',power:1.6,cost:120,desc:'Крепче держит рыбу до 10 кг.'},{name:'Трофейный №1',power:2.4,cost:320,desc:'Для крупной рыбы до 25 кг.'},{name:'Легендарный',power:3.5,cost:750,desc:'Крупнейшие трофеи до 60 кг.'}]}
];
const defaults={coins:250,xp:0,level:1,caught:0,best:0,spot:0,unlocked:[0],gear:{rod:0,line:0,reel:0,hook:0},baits:{worm:10,bread:10,corn:0,spinner:0,minnow:0},selectedBait:'worm',fishCaught:{},history:[],casts:0,questClaimed:false,questProgress:0};
let state=load(),mode='idle',fish=null,fishWeight=0,fishEnergy=0,tension=0,actionTick=0,toastTimer=0,lastFrame=0,particles=[],sceneTime=0;
function load(){try{const raw=JSON.parse(localStorage.getItem('odyssey-save')||'{}');return {...structuredClone(defaults),...raw,gear:{...defaults.gear,...(raw.gear||{})},baits:{...defaults.baits,...(raw.baits||{})},fishCaught:{...(raw.fishCaught||{})},unlocked:Array.isArray(raw.unlocked)?raw.unlocked:[0],history:Array.isArray(raw.history)?raw.history:[]}}catch{return structuredClone(defaults)}}
function save(){localStorage.setItem('odyssey-save',JSON.stringify(state));renderAll()}
function fmt(n){return Number(n).toLocaleString('ru-RU',{maximumFractionDigits:1})}
function notify(msg){const el=$('toast');el.textContent=msg;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),2200)}
function gearPower(){return ['rod','line','reel'].reduce((p,k)=>p*GEAR.find(g=>g.id===k).items[state.gear[k]||0].power,1)}
function hookPower(){return GEAR.find(g=>g.id==='hook').items[state.gear.hook||0].power}
function hookLimit(){return [3,10,25,60][state.gear.hook||0]}
function gainXP(n){state.xp+=n;while(state.xp>=state.level*100){state.xp-=state.level*100;state.level++;state.coins+=state.level*35;notify('Новый уровень '+state.level+'! Бонус: '+state.level*35+' 🪙')}}
function renderHeader(){$('coins').textContent=fmt(state.coins);$('playerLevel').textContent='Уровень '+state.level;$('xpText').textContent=state.xp+' / '+state.level*100;$('xpBar').style.width=(state.xp/(state.level*100)*100)+'%';$('spotName').textContent=SPOTS[state.spot].name}
function renderBaits(){$('baitList').innerHTML=BAITS.map(b=>'<button class="bait '+(state.selectedBait===b.id?'active':'')+'" data-bait="'+b.id+'"><span class="emoji">'+b.emoji+'</span>'+b.name+'<br><small>'+state.baits[b.id]+' шт.</small></button>').join('');$('baitList').querySelectorAll('[data-bait]').forEach(b=>b.onclick=()=>{const id=b.dataset.bait;if(!state.baits[id]){if(state.coins<BAITS.find(x=>x.id===id).cost){notify('Не хватает монет');return}state.coins-=BAITS.find(x=>x.id===id).cost;state.baits[id]+=5}state.selectedBait=id;save()});$('gearSummary').innerHTML=GEAR.map(g=>'<div class="gearbit"><span>'+g.emoji+'</span><small>'+g.name+'</small><b>'+g.items[state.gear[g.id]].name+'</b></div>').join('')}
function renderSpots(){$('spotList').innerHTML=SPOTS.map(s=>{const unlocked=state.unlocked.includes(s.id),can=state.level>=s.level&&state.coins>=s.cost;return '<div class="card spotcard"><div class="spotemoji">'+s.emoji+'</div><div class="itembody"><h3>'+s.name+(state.spot===s.id?' <span class="selectedtag">• ВЫБРАНО</span>':'')+'</h3><p>'+s.desc+'</p><div class="itemmeta">🐟 '+s.fish+' · Уровень '+s.level+'</div></div>'+(unlocked?'<button class="smallbtn" data-spot="'+s.id+'">'+(state.spot===s.id?'Выбрано':'Выбрать')+'</button>':'<button class="smallbtn" data-unlock="'+s.id+'" '+(!can?'disabled':'')+'>'+s.cost+' 🪙</button>')+'</div>'}).join('');$('spotList').querySelectorAll('[data-spot]').forEach(b=>b.onclick=()=>{state.spot=+b.dataset.spot;mode='idle';save();notify('Место рыбалки изменено')});$('spotList').querySelectorAll('[data-unlock]').forEach(b=>b.onclick=()=>{const s=SPOTS[+b.dataset.unlock];if(state.level<s.level||state.coins<s.cost)return;state.coins-=s.cost;state.unlocked.push(s.id);state.spot=s.id;save();notify('Новый водоём открыт!')})}
function renderShop(){$('shopList').innerHTML=GEAR.map(g=>'<div class="section-title"><h2>'+g.emoji+' '+g.name+'</h2></div>'+g.items.map((it,i)=>{const owned=i<=state.gear[g.id],current=i===state.gear[g.id],can=i===state.gear[g.id]+1&&state.coins>=it.cost;return '<div class="card shopitem"><div class="itememoji">'+g.emoji+'</div><div class="itembody"><h3>'+it.name+'</h3><p>'+it.desc+'</p><div class="itemmeta">Мощность ×'+it.power+'</div></div>'+(current?'<span class="selectedtag">НАДЕТО</span>':owned?'<span class="selectedtag">КУПЛЕНО</span>':'<button class="smallbtn" data-buy="'+g.id+'" data-index="'+i+'" '+(!can?'disabled':'')+'>'+it.cost+' 🪙</button>')+'</div>'}).join('')).join('');$('shopList').querySelectorAll('[data-buy]').forEach(b=>b.onclick=()=>{const g=GEAR.find(x=>x.id===b.dataset.buy),i=+b.dataset.index,it=g.items[i];if(i!==state.gear[g.id]+1||state.coins<it.cost)return;state.coins-=it.cost;state.gear[g.id]=i;save();notify('Снасть улучшена!')})}
function renderKeep(){const unique=Object.keys(state.fishCaught).length;$('collectionStats').innerHTML='<div class="statbox"><b>'+state.caught+'</b><span>Всего рыб</span></div><div class="statbox"><b>'+fmt(state.best)+' кг</b><span>Рекорд</span></div><div class="statbox"><b>'+unique+'/'+FISH.length+'</b><span>Виды</span></div>';$('catchList').innerHTML=state.history.length?state.history.slice(0,15).map(h=>'<div class="card catchitem"><div class="itememoji">'+h.emoji+'</div><div class="itembody"><h3>'+h.name+'</h3><p>'+h.spot+' · '+h.time+'</p></div><b>'+fmt(h.weight)+' кг</b></div>').join(''):'<div class="empty">Здесь появится твой первый улов. Пора на рыбалку!</div>';$('fishBook').innerHTML=FISH.map(f=>{const known=!!state.fishCaught[f.id];return '<div class="fishentry '+(known?'':'locked')+'"><div class="fishemoji">'+(known?f.emoji:'❔')+'</div><h3>'+(known?f.name:'Неизвестная рыба')+'</h3><p>'+(known?f.min+'–'+f.max+' кг':'Поймай её, чтобы открыть')+'</p></div>'}).join('')}
function renderTasks(){const goal=5,progress=Math.min(goal,state.questProgress);$('taskCard').innerHTML='<h3>🎯 Первая пятёрка</h3><p>Поймай '+goal+' рыб на любых водоёмах.</p><div class="taskprogress"><i style="width:'+(progress/goal*100)+'%"></i></div><p>'+progress+' / '+goal+' рыб</p>'+(state.questClaimed?'<span class="selectedtag">НАГРАДА ПОЛУЧЕНА ✓</span>':'<button class="btn btn-primary" id="claimTask" '+(progress<goal?'disabled':'')+'>Забрать награду · 100 🪙 + 50 опыта</button>');const b=$('claimTask');if(b)b.onclick=()=>{if(state.questProgress<goal||state.questClaimed)return;state.questClaimed=true;state.coins+=100;gainXP(50);save();notify('Задание выполнено!')};$('recordText').textContent=state.caught?'Самый тяжёлый улов: '+fmt(state.best)+' кг. Всего поймано: '+state.caught+'.':'Поймай первую рыбу, чтобы начать историю рекордов.'}
function renderAll(){renderHeader();renderBaits();renderSpots();renderShop();renderKeep();renderTasks();$('castBtn').disabled=mode==='bite'||mode==='fight';$('reelBtn').disabled=mode!=='bite'&&mode!=='fight'}
function showScreen(name){document.querySelectorAll('.screen').forEach(s=>s.classList.toggle('active',s.id==='screen-'+name));document.querySelectorAll('.navitem').forEach(b=>b.classList.toggle('active',b.dataset.screen===name));if(name==='shop')renderShop();if(name==='spots')renderSpots();if(name==='keep')renderKeep();window.scrollTo({top:0,behavior:'smooth'})}
document.querySelectorAll('[data-screen]').forEach(b=>b.onclick=()=>showScreen(b.dataset.screen));document.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>showScreen(b.dataset.go));
function setStatus(t){$('status').textContent=t}
function cast(){if(mode==='bite'||mode==='fight')return;const result=$('catchResult');if(result)result.classList.remove('visible');const bait=BAITS.find(b=>b.id===state.selectedBait);if(!state.baits[bait.id]){notify('Наживка закончилась! Выбери другую.');return}state.baits[bait.id]--;state.casts++;mode='cast';fish=null;tension=0;$('tension').style.width='0%';$('fishEnergy').style.width='0%';$('tensionNum').textContent='0%';$('fishPower').textContent='—';setStatus('Поплавок на воде… Ждём поклёвку');renderAll();actionTick=0;setTimeout(()=>{if(mode!=='cast')return;let options=FISH.filter(f=>f.spots.includes(state.spot)&&f.baits.includes(bait.id));
options=options.filter(f=>f.min<=hookLimit()*1.15);
fish=chooseFish(options.length?options:FISH.filter(f=>f.spots.includes(state.spot)&&f.min<=hookLimit()*1.15));
const sizeBonus=Math.random()<.09?1.8:1;
const hookFactor=Math.min(1.25,hookPower()/1.4);
fishWeight=+(fish.min+Math.random()*(fish.max-fish.min)*Math.min(1.15,gearPower()/1.8)*hookFactor*sizeBonus).toFixed(2);
fishWeight=Math.min(fishWeight,hookLimit()*(.75+Math.random()*.25));fishEnergy=100;mode='bite';setStatus('🐟 Поклёвка! Быстро нажми «Подсекать / тянуть»!');$('reelBtn').disabled=false;notify('Есть поклёвка!');},1800+Math.random()*3300);save()}
function chooseFish(arr){let pool=arr.map(f=>({f,w:f.rare?1.5:Math.max(1,10/(f.max+1))}));let total=pool.reduce((a,x)=>a+x.w,0),r=Math.random()*total;for(const x of pool){r-=x.w;if(r<=0)return x.f}return arr[0]}
function reel(){
if(mode==='bite'){mode='fight';setStatus('Рыба на крючке! Нажимай коротко, давая леске ослабнуть.');tension=18;updateMeters();return}
if(mode!=='fight')return;
actionTick++;
// Короткие нажатия утомляют рыбу, а рывки иногда ослабляют натяжение.
tension=Math.min(100,tension+5+Math.random()*5);
fishEnergy=Math.max(0,fishEnergy-(10+gearPower()*1.8+Math.random()*5));
if(Math.random()<.62)tension=Math.max(3,tension-(8+Math.random()*10));
if(fishWeight>hookLimit()*.7)tension+=Math.random()*5;
updateMeters();
if(tension>=100){mode='idle';setStatus('💔 Леска порвалась! Ослабь натяжение и улучши леску/крючок.');notify('Рыба сорвалась!');renderAll();return}
if(fishEnergy<=0){landFish();return}
setStatus(tension>72?'⚠️ Ослабь натяжение: дай рыбе немного потянуть!':'Рыба сопротивляется! Продолжай короткими нажатиями.')}
function updateMeters(){$('tension').style.width=tension+'%';$('tensionNum').textContent=Math.round(tension)+'%';$('fishEnergy').style.width=fishEnergy+'%';$('fishPower').textContent=Math.round(fishEnergy)+'%'}
function landFish(){mode='idle';const f=fish,weight=fishWeight;const value=Math.max(1,Math.round(f.value*weight*SPOTS[state.spot].bonus));state.coins+=value;state.caught++;state.best=Math.max(state.best,weight);state.fishCaught[f.id]=(state.fishCaught[f.id]||0)+1;state.questProgress++;gainXP(f.xp);state.history.unshift({name:f.name,emoji:f.emoji,weight,spot:SPOTS[state.spot].name,time:new Date().toLocaleTimeString('ru-RU',{hour:'2-digit',minute:'2-digit'})});state.history=state.history.slice(0,30);setStatus('🎉 '+f.name+' · '+fmt(weight)+' кг! Продано за '+value+' монет.');
const result=$('catchResult');
if(result){result.innerHTML='<div class="catch-illustration">'+f.emoji+'</div><div><strong>'+(f.rare?'✨ РЕДКИЙ УЛОВ!':'🎣 Улов!')+' '+f.name+'</strong><p>'+fmt(weight)+' кг · +'+f.xp+' опыта · '+value+' 🪙</p></div>';result.classList.add('visible')}
notify((f.rare?'✨ РЕДКАЯ РЫБА: ':'Улов: ')+f.name+' · '+fmt(weight)+' кг');renderAll();save()}
$('castBtn').onclick=cast;$('reelBtn').onclick=reel;
const canvas=$('water'),ctx=canvas.getContext('2d');
function draw(t){
const w=canvas.width,h=canvas.height;sceneTime=t*.00035;
const sky=ctx.createLinearGradient(0,0,0,h*.55);sky.addColorStop(0,'#70c8e4');sky.addColorStop(1,'#f4dfb1');ctx.fillStyle=sky;ctx.fillRect(0,0,w,h);
// Солнце с мягким свечением
const sunX=w*.16,sunY=h*.16;
const glow=ctx.createRadialGradient(sunX,sunY,5,sunX,sunY,62);
glow.addColorStop(0,'rgba(255,244,174,.72)');glow.addColorStop(1,'rgba(255,244,174,0)');
ctx.fillStyle=glow;ctx.fillRect(sunX-65,sunY-65,130,130);
ctx.fillStyle='#fff0ad';ctx.beginPath();ctx.arc(sunX,sunY,18,0,Math.PI*2);ctx.fill();
// Медленно плывущие облака
function cloud(x,y,s){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.fillStyle='rgba(255,255,255,.68)';ctx.beginPath();ctx.ellipse(0,5,25,9,0,0,Math.PI*2);ctx.ellipse(-12,0,12,10,0,0,Math.PI*2);ctx.ellipse(2,-5,15,14,0,0,Math.PI*2);ctx.ellipse(16,1,12,9,0,0,Math.PI*2);ctx.fill();ctx.restore()}
cloud(((w*.35+sceneTime*22)%(w+100))-50,h*.13,.78);
cloud(((w*.73+sceneTime*13)%(w+120))-60,h*.22,.58);
// Дальние холмы и берег
ctx.fillStyle='#5c9b75';ctx.beginPath();ctx.moveTo(0,h*.38);ctx.lineTo(w*.12,h*.23);ctx.lineTo(w*.25,h*.34);ctx.lineTo(w*.43,h*.19);ctx.lineTo(w*.58,h*.32);ctx.lineTo(w*.76,h*.21);ctx.lineTo(w,h*.31);ctx.lineTo(w,h*.5);ctx.lineTo(0,h*.5);ctx.fill();
ctx.fillStyle='#28664f';ctx.beginPath();ctx.moveTo(0,h*.41);for(let i=0;i<=w;i+=24)ctx.lineTo(i,h*(.39+Math.sin(i*.023+sceneTime)*.018));ctx.lineTo(w,h*.51);ctx.lineTo(0,h*.51);ctx.fill();
const water=ctx.createLinearGradient(0,h*.43,0,h);water.addColorStop(0,'#49b8c6');water.addColorStop(.45,'#168aa4');water.addColorStop(1,'#073c5a');ctx.fillStyle=water;ctx.fillRect(0,h*.43,w,h*.57);
// Отражения на воде
for(let i=0;i<22;i++){const y=h*.48+i*h*.023,x=((i*83+sceneTime*80)%(w+100))-40;ctx.beginPath();ctx.ellipse(x,y,15+(i%5)*9,2,0,0,Math.PI*2);ctx.strokeStyle='rgba(204,249,239,'+(.12+(i%3)*.04)+')';ctx.lineWidth=2;ctx.stroke()}
// Подводные мультяшные рыбки
function fishShape(x,y,s,color,dir){ctx.save();ctx.translate(x,y);ctx.scale(dir*s,s);ctx.fillStyle=color;ctx.beginPath();ctx.ellipse(0,0,23,12,0,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.moveTo(-18,0);ctx.lineTo(-34,-11);ctx.lineTo(-33,11);ctx.closePath();ctx.fill();ctx.fillStyle='#ffe7a1';ctx.beginPath();ctx.moveTo(2,-10);ctx.lineTo(10,-20);ctx.lineTo(15,-9);ctx.fill();ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(13,-3,4,0,Math.PI*2);ctx.fill();ctx.fillStyle='#132d40';ctx.beginPath();ctx.arc(14,-3,1.8,0,Math.PI*2);ctx.fill();ctx.strokeStyle='#e8ffff';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(15,5);ctx.quadraticCurveTo(19,8,22,4);ctx.stroke();ctx.restore()}
fishShape(w*(.25+Math.sin(t*.00045)*.07),h*.72,1.0,'#f2b84d',1);
fishShape(w*(.43+Math.sin(t*.0003+.9)*.05),h*.84,.72,'#f08a67',-1);
fishShape(w*(.14+Math.sin(t*.00035+2)*.04),h*.9,.58,'#a6e1c2',1);
// Растения под водой
for(let i=0;i<9;i++){const x=i*31+12;ctx.strokeStyle='#1b7567';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(x,h);ctx.quadraticCurveTo(x-9,h*.83,x+Math.sin(t*.001+i)*7,h*.77);ctx.stroke()}
// Деревянный пирс справа
ctx.fillStyle='#6c452b';ctx.beginPath();ctx.moveTo(w*.68,h*.57);ctx.lineTo(w,h*.52);ctx.lineTo(w,h*.83);ctx.lineTo(w*.69,h*.78);ctx.closePath();ctx.fill();
for(let i=0;i<7;i++){const x=w*.69+i*w*.045;ctx.strokeStyle=i%2?'#b17a45':'#c18b50';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(x,h*.57-(x-w*.68)*.16);ctx.lineTo(x,h*.79-(x-w*.68)*.02);ctx.stroke()}
ctx.strokeStyle='#4b3022';ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(w*.73,h*.69);ctx.lineTo(w*.73,h*.88);ctx.moveTo(w*.93,h*.66);ctx.lineTo(w*.93,h*.9);ctx.stroke();
// Рыбак: ботинки, ноги, тело, голова, шляпа и рука
ctx.lineCap='round';ctx.strokeStyle='#263b47';ctx.lineWidth=10;ctx.beginPath();ctx.moveTo(w*.84,h*.64);ctx.lineTo(w*.82,h*.73);ctx.lineTo(w*.85,h*.78);ctx.moveTo(w*.84,h*.64);ctx.lineTo(w*.88,h*.72);ctx.lineTo(w*.9,h*.76);ctx.stroke();
ctx.strokeStyle='#3d75ba';ctx.lineWidth=18;ctx.beginPath();ctx.moveTo(w*.84,h*.53);ctx.lineTo(w*.85,h*.65);ctx.stroke();
ctx.fillStyle='#e9b58a';ctx.beginPath();ctx.arc(w*.83,h*.48,14,0,Math.PI*2);ctx.fill();
ctx.fillStyle='#e5bb58';ctx.beginPath();ctx.ellipse(w*.83,h*.46,18,5,0,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.arc(w*.83,h*.445,12,Math.PI,Math.PI*2);ctx.fill();
ctx.fillStyle='#273747';ctx.beginPath();ctx.arc(w*.837,h*.48,2,0,Math.PI*2);ctx.fill();
ctx.strokeStyle='#e9b58a';ctx.lineWidth=7;ctx.beginPath();ctx.moveTo(w*.84,h*.55);ctx.lineTo(w*.79,h*.57);ctx.lineTo(w*.77,h*.53);ctx.stroke();
// Удочка и леска, направленная от рыбака в озеро
ctx.strokeStyle='#70462b';ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(w*.78,h*.54);ctx.quadraticCurveTo(w*.68,h*.31,w*.54,h*.29);ctx.stroke();
ctx.strokeStyle='#f7f0d6';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(w*.54,h*.29);ctx.quadraticCurveTo(w*.56,h*.45,w*.53,h*.62);ctx.stroke();
// Поплавок и круги поклёвки
if(mode==='cast'||mode==='bite'||mode==='fight'){
const px=w*.53,baseY=h*.625;const dip=mode==='bite'?Math.abs(Math.sin(t*.025))*13:mode==='fight'?Math.sin(t*.018)*7:0;const py=baseY+Math.sin(t*.004)*2+dip;
ctx.fillStyle='#f4f0d7';ctx.beginPath();ctx.ellipse(px,py,5,9,0,0,Math.PI*2);ctx.fill();ctx.fillStyle='#f15e4e';ctx.fillRect(px-4,py-9,8,9);ctx.fillStyle='#fff3c8';ctx.fillRect(px-2,py-15,4,6);
ctx.beginPath();ctx.ellipse(px,py+10,12+Math.sin(t*.006)*4,3,0,0,Math.PI*2);ctx.strokeStyle='rgba(218,255,244,.75)';ctx.lineWidth=2;ctx.stroke();
if(mode==='bite'){
// Брызги вокруг поплавка при поклёвке
for(let i=0;i<6;i++){const a=i*Math.PI/3+t*.008;const r=13+Math.abs(Math.sin(t*.02+i))*12;ctx.fillStyle='rgba(233,255,249,.9)';ctx.beginPath();ctx.arc(px+Math.cos(a)*r,py+Math.sin(a)*r*.55,2.1,0,Math.PI*2);ctx.fill()}
ctx.strokeStyle='rgba(255,236,143,.95)';ctx.lineWidth=3;ctx.beginPath();ctx.ellipse(px,py+12,18+Math.sin(t*.02)*7,6,0,0,Math.PI*2);ctx.stroke();ctx.fillStyle='#fff2a1';ctx.font='bold 22px system-ui';ctx.fillText('!',px+18,py-12)}
if(mode==='fight'){ctx.strokeStyle='rgba(255,255,255,.8)';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(px-9,py+7);ctx.lineTo(px+10,py+13);ctx.stroke()}
}
requestAnimationFrame(draw)}
renderAll();setStatus('Всё готово к рыбалке. Забрасывай!');
if('serviceWorker'in navigator&&location.protocol.startsWith('http'))window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
})();