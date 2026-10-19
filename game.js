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
{id:'legendpike',name:'Легендарная щука',emoji:'🐲',min:12,max:55,value:420,xp:220,spots:[2,3,4],baits:['spinner','minnow'],rare:true},
{id:'tench',name:'Линь',emoji:'🟢',min:.4,max:6,value:38,xp:28,spots:[0,4],baits:['worm','corn']},
{id:'zander',name:'Судак',emoji:'🐟',min:1,max:14,value:78,xp:48,spots:[1,3],baits:['minnow','spinner']},
{id:'grayling',name:'Хариус',emoji:'🐠',min:.3,max:4.8,value:58,xp:36,spots:[3],baits:['worm','spinner']},
{id:'salmon',name:'Лосось',emoji:'🐟',min:2,max:22,value:115,xp:70,spots:[3],baits:['spinner','minnow'],rare:true},
{id:'eel',name:'Речной угорь',emoji:'🐍',min:.5,max:9,value:72,xp:45,spots:[4],baits:['worm','minnow']},
{id:'mudcarp',name:'Болотный карп',emoji:'🟤',min:1,max:18,value:96,xp:58,spots:[4],baits:['corn','bread'],rare:true},
{id:'cod',name:'Треска',emoji:'🐟',min:1,max:20,value:105,xp:65,spots:[5],baits:['minnow','worm']},
{id:'seabass',name:'Морской окунь',emoji:'🐟',min:.8,max:16,value:118,xp:72,spots:[5],baits:['spinner','minnow']},
{id:'tuna',name:'Голубой тунец',emoji:'🐬',min:8,max:48,value:260,xp:145,spots:[5],baits:['minnow'],rare:true}
];
const SPOTS=[
{id:0,name:'Тихое озеро',emoji:'🌅',desc:'Спокойный водоём для начинающих рыбаков.',level:1,cost:0,bonus:1,fish:'Карась, плотва, окунь'},
{id:1,name:'Старая река',emoji:'🌿',desc:'Глубокие заводи, лещи и хищная щука.',level:3,cost:180,bonus:1.25,fish:'Лещ, щука, сом'},
{id:2,name:'Лесная заводь',emoji:'🌲',desc:'Чистая вода и шанс поймать редкий трофей.',level:5,cost:450,bonus:1.6,fish:'Форель, карп, сом'},
{id:3,name:'Горная река',emoji:'🏞️',desc:'Быстрое течение, сильная рыба и лососёвые.',level:7,cost:900,bonus:1.85,fish:'Хариус, судак, лосось'},
{id:4,name:'Болотные заводи',emoji:'🌾',desc:'Тихие тёмные заводи, где прячутся угри и болотные трофеи.',level:10,cost:1500,bonus:2.1,fish:'Линь, угорь, болотный карп'},
{id:5,name:'Морской берег',emoji:'🌊',desc:'Солёный ветер и шанс на крупный морской улов.',level:14,cost:2800,bonus:2.5,fish:'Треска, морской окунь, тунец'}
];
const BAITS=[{id:'worm',name:'Червь',emoji:'🪱',cost:3,desc:'Универсальная наживка для мирной и речной рыбы.'},{id:'bread',name:'Хлеб',emoji:'🍞',cost:2,desc:'Дешёвая наживка для карася и карпа.'},{id:'corn',name:'Кукуруза',emoji:'🌽',cost:12,desc:'Хороша для карповых и редких карасей.'},{id:'spinner',name:'Блесна',emoji:'🥄',cost:25,desc:'Приманивает активных хищников.'},{id:'minnow',name:'Живец',emoji:'🦐',cost:35,desc:'Для крупной хищной рыбы и морских трофеев.'}];
const GEAR=[
{id:'rod',name:'Удочка',emoji:'🎣',items:[{name:'Бамбуковая',power:1,cost:0,desc:'Простая удочка для первых уловов.'},{name:'Телескопическая',power:1.45,cost:180,desc:'Увереннее справляется с сильной рыбой.'},{name:'Карповая Pro',power:2,cost:520,desc:'Мощная снасть для крупных трофеев.'},{name:'Дальний заброс',power:2.5,cost:1100,desc:'Увеличенная мощность для дальних и глубоких точек.'},{name:'Хищник X',power:3.2,cost:2200,desc:'Жёсткий бланк для сильных хищников.'},{name:'Легенда Carbon',power:4.1,cost:4500,desc:'Премиальная удочка для самых тяжёлых трофеев.'}]},
{id:'line',name:'Леска',emoji:'🧵',items:[{name:'0.18 мм',power:1,cost:0,desc:'Тонкая леска для небольшой рыбы.'},{name:'0.28 мм',power:1.35,cost:130,desc:'Повышенная прочность.'},{name:'0.40 мм',power:1.8,cost:390,desc:'Для серьёзной борьбы.'}]},
{id:'reel',name:'Катушка',emoji:'⚙️',items:[{name:'Базовая',power:1,cost:0,desc:'Стандартная катушка.'},{name:'Быстрый ход',power:1.25,cost:160,desc:'Помогает быстрее утомлять рыбу.'},{name:'Мороз',power:1.65,cost:420,desc:'Мощная тяга и надёжный механизм.'}]},
{id:'hook',name:'Крючок',emoji:'🪝',items:[{name:'Обычный №8',power:1,cost:0,desc:'Для небольшой рыбы до 3 кг.'},{name:'Усиленный №4',power:1.6,cost:120,desc:'Крепче держит рыбу до 10 кг.'},{name:'Трофейный №1',power:2.4,cost:320,desc:'Для крупной рыбы до 25 кг.'},{name:'Легендарный',power:3.5,cost:750,desc:'Крупнейшие трофеи до 60 кг.'}]}
];
const CLOTHES=[{id:0,name:'Повседневная одежда',emoji:'👕',cost:0,power:1,color:'#3d75ba',pants:'#263b47',hat:'#e5bb58',desc:'Базовый комплект для рыбалки.'},{id:1,name:'Ветроустойчивый костюм',emoji:'🧥',cost:180,power:1.08,color:'#3f896d',pants:'#243e39',hat:'#e0bd72',desc:'Удобный костюм: натяжение растёт немного медленнее.'},{id:2,name:'Вейдерсы профи',emoji:'🥾',cost:420,power:1.18,color:'#d18b3d',pants:'#4c4938',hat:'#3f896d',desc:'Устойчивая экипировка: лучше контроль при вываживании.'},{id:3,name:'Трофейный гидрокостюм',emoji:'🦺',cost:850,power:1.32,color:'#7e6ac7',pants:'#26354f',hat:'#f0f0e4',desc:'Премиальный комплект: заметный бонус к контролю лески.'}];
const defaults={coins:250,xp:0,level:1,caught:0,best:0,spot:0,unlocked:[0],clothes:{owned:[0],equipped:0},gear:{rod:0,line:0,reel:0,hook:0},baits:{worm:10,bread:10,corn:0,spinner:0,minnow:0},selectedBait:'worm',castPower:70,fishCaught:{},history:[],casts:0,lineDurability:100,rodDurability:100,reelDurability:100,questClaimed:false,questProgress:0};
let state=load(),mode='idle',fish=null,fishWeight=0,fishEnergy=0,tension=0,actionTick=0,toastTimer=0,lastFrame=0,particles=[],sceneTime=0;
function load(){try{const raw=JSON.parse(localStorage.getItem('odyssey-save')||'{}');return {...structuredClone(defaults),...raw,castPower:Math.max(25,Math.min(100,Number(raw.castPower)||70)),lineDurability:Math.max(0,Math.min(100,Number.isFinite(Number(raw.lineDurability))?Number(raw.lineDurability):100)),rodDurability:Math.max(0,Math.min(100,Number.isFinite(Number(raw.rodDurability))?Number(raw.rodDurability):100)),reelDurability:Math.max(0,Math.min(100,Number.isFinite(Number(raw.reelDurability))?Number(raw.reelDurability):100)),gear:{...defaults.gear,...(raw.gear||{})},clothes:{...defaults.clothes,...(raw.clothes||{}),owned:Array.isArray(raw.clothes&&raw.clothes.owned)?raw.clothes.owned:[0]},baits:{...defaults.baits,...(raw.baits||{})},fishCaught:{...(raw.fishCaught||{})},unlocked:Array.isArray(raw.unlocked)?raw.unlocked:[0],history:Array.isArray(raw.history)?raw.history:[]}}catch{return structuredClone(defaults)}}
function save(){localStorage.setItem('odyssey-save',JSON.stringify(state));renderAll()}
function fmt(n){return Number(n).toLocaleString('ru-RU',{maximumFractionDigits:1})}
function notify(msg){const el=$('toast');el.textContent=msg;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),2200)}
function gearPower(){return ['rod','line','reel'].reduce((p,k)=>p*GEAR.find(g=>g.id===k).items[state.gear[k]||0].power,1)*CLOTHES[state.clothes.equipped||0].power}
function hookPower(){return GEAR.find(g=>g.id==='hook').items[state.gear.hook||0].power}
function tackleStrength(){const rod=GEAR.find(g=>g.id==='rod').items[state.gear.rod||0].power,line=GEAR.find(g=>g.id==='line').items[state.gear.line||0].power,reel=GEAR.find(g=>g.id==='reel').items[state.gear.reel||0].power,hook=hookPower(),clothes=CLOTHES[state.clothes.equipped||0].power;return Math.pow(rod*line*reel*hook*clothes,1/5)}
function hookLimit(){return [3,10,25,60][state.gear.hook||0]}
function gainXP(n){state.xp+=n;while(state.xp>=state.level*100){state.xp-=state.level*100;state.level++;state.coins+=state.level*35;notify('Новый уровень '+state.level+'! Бонус: '+state.level*35+' 🪙')}}
function renderHeader(){$('coins').textContent=fmt(state.coins);$('playerLevel').textContent='Уровень '+state.level;$('xpText').textContent=state.xp+' / '+state.level*100;$('xpBar').style.width=(state.xp/(state.level*100)*100)+'%';$('spotName').textContent=SPOTS[state.spot].name}
function renderBaits(){$('baitList').innerHTML=BAITS.map(b=>'<button class="bait '+(state.selectedBait===b.id?'active':'')+'" data-bait="'+b.id+'"><span class="emoji">'+b.emoji+'</span>'+b.name+'<br><small>'+state.baits[b.id]+' шт.</small></button>').join('');$('baitList').querySelectorAll('[data-bait]').forEach(b=>b.onclick=()=>{const id=b.dataset.bait;if(!state.baits[id]){notify('Эта приманка закончилась. Купи запас в магазине.');showScreen('shop');return}state.selectedBait=id;save()});$('gearSummary').innerHTML=GEAR.map(g=>'<div class="gearbit"><span>'+g.emoji+'</span><small>'+g.name+'</small><b>'+g.items[state.gear[g.id]].name+'</b></div>').join('')}
function renderSpots(){$('spotList').innerHTML=SPOTS.map(s=>{const unlocked=state.unlocked.includes(s.id),can=state.level>=s.level&&state.coins>=s.cost;return '<div class="card spotcard"><div class="spotemoji">'+s.emoji+'</div><div class="itembody"><h3>'+s.name+(state.spot===s.id?' <span class="selectedtag">• ВЫБРАНО</span>':'')+'</h3><p>'+s.desc+'</p><div class="itemmeta">🐟 '+s.fish+' · Уровень '+s.level+'</div></div>'+(unlocked?'<button class="smallbtn" data-spot="'+s.id+'">'+(state.spot===s.id?'Выбрано':'Выбрать')+'</button>':'<button class="smallbtn" data-unlock="'+s.id+'" '+(!can?'disabled':'')+'>'+s.cost+' 🪙</button>')+'</div>'}).join('');$('spotList').querySelectorAll('[data-spot]').forEach(b=>b.onclick=()=>{state.spot=+b.dataset.spot;mode='idle';save();notify('Место рыбалки изменено')});$('spotList').querySelectorAll('[data-unlock]').forEach(b=>b.onclick=()=>{const s=SPOTS[+b.dataset.unlock];if(state.level<s.level||state.coins<s.cost)return;state.coins-=s.cost;state.unlocked.push(s.id);state.spot=s.id;save();notify('Новый водоём открыт!')})}
function renderShop(){$('shopList').innerHTML=GEAR.map(g=>'<div class="section-title"><h2>'+g.emoji+' '+g.name+'</h2></div>'+g.items.map((it,i)=>{const owned=i<=state.gear[g.id],current=i===state.gear[g.id],can=i===state.gear[g.id]+1&&state.coins>=it.cost;return '<div class="card shopitem"><div class="itememoji">'+g.emoji+'</div><div class="itembody"><h3>'+it.name+'</h3><p>'+it.desc+'</p><div class="itemmeta">Мощность ×'+it.power+'</div></div>'+(current?'<span class="selectedtag">НАДЕТО</span>':owned?'<span class="selectedtag">КУПЛЕНО</span>':'<button class="smallbtn" data-buy="'+g.id+'" data-index="'+i+'" '+(!can?'disabled':'')+'>'+it.cost+' 🪙</button>')+'</div>'}).join('')).join('');$('shopList').insertAdjacentHTML('beforeend','<div class="section-title"><h2>🪱 Приманки</h2><span>Покупка пачками по 5 шт.</span></div>'+BAITS.map(b=>'<div class="card shopitem bait-shop-item"><div class="itememoji">'+b.emoji+'</div><div class="itembody"><h3>'+b.name+'</h3><p>'+b.desc+'</p><div class="itemmeta">В запасе: '+state.baits[b.id]+' шт. · '+b.cost+' 🪙 за штуку</div></div><button class="smallbtn" data-buy-bait="'+b.id+'">Купить 5 · '+(b.cost*5)+' 🪙</button></div>').join('')+'<div class="section-title"><h2>👕 Одежда рыбака</h2><span>Внешность + бонусы</span></div>'+CLOTHES.map(c=>{const owned=state.clothes.owned.includes(c.id),equipped=state.clothes.equipped===c.id;return '<div class="card shopitem clothes-item"><div class="itememoji">'+c.emoji+'</div><div class="itembody"><h3>'+c.name+'</h3><p>'+c.desc+'</p><div class="itemmeta">Бонус к вываживанию ×'+c.power+'</div></div>'+(equipped?'<span class="selectedtag">НАДЕТО</span>':owned?'<button class="smallbtn" data-equip-clothes="'+c.id+'">Надеть</button>':'<button class="smallbtn" data-buy-clothes="'+c.id+'" '+(state.coins<c.cost?'disabled':'')+'>'+c.cost+' 🪙</button>')+'</div>'}).join(''));$('shopList').querySelectorAll('[data-buy]').forEach(b=>b.onclick=()=>{const g=GEAR.find(x=>x.id===b.dataset.buy),i=+b.dataset.index,it=g.items[i];if(i!==state.gear[g.id]+1||state.coins<it.cost)return;state.coins-=it.cost;state.gear[g.id]=i;if(g.id==='rod')state.rodDurability=100;if(g.id==='line')state.lineDurability=100;if(g.id==='reel')state.reelDurability=100;save();notify('Снасть улучшена!')});$('shopList').querySelectorAll('[data-buy-bait]').forEach(b=>b.onclick=()=>{const id=b.dataset.buyBait,bait=BAITS.find(x=>x.id===id),price=bait.cost*5;if(state.coins<price){notify('Не хватает монет на эту пачку.');return}state.coins-=price;state.baits[id]=(state.baits[id]||0)+5;save();notify('Куплено 5 шт.: '+bait.name)});$('shopList').querySelectorAll('[data-buy-clothes]').forEach(b=>b.onclick=()=>{const id=+b.dataset.buyClothes,c=CLOTHES[id];if(state.coins<c.cost||state.clothes.owned.includes(id))return;state.coins-=c.cost;state.clothes.owned.push(id);state.clothes.equipped=id;save();notify('Куплен и надет комплект: '+c.name)});$('shopList').querySelectorAll('[data-equip-clothes]').forEach(b=>b.onclick=()=>{state.clothes.equipped=+b.dataset.equipClothes;save();notify('Одежда изменена!')})}
function renderKeep(){const unique=Object.keys(state.fishCaught).length;$('collectionStats').innerHTML='<div class="statbox"><b>'+state.caught+'</b><span>Всего рыб</span></div><div class="statbox"><b>'+fmt(state.best)+' кг</b><span>Рекорд</span></div><div class="statbox"><b>'+unique+'/'+FISH.length+'</b><span>Виды</span></div>';$('catchList').innerHTML=state.history.length?state.history.slice(0,15).map(h=>'<div class="card catchitem"><div class="itememoji">'+h.emoji+'</div><div class="itembody"><h3>'+h.name+'</h3><p>'+h.spot+' · '+h.time+'</p></div><b>'+fmt(h.weight)+' кг</b></div>').join(''):'<div class="empty">Здесь появится твой первый улов. Пора на рыбалку!</div>';$('fishBook').innerHTML=FISH.map(f=>{const known=!!state.fishCaught[f.id];return '<div class="fishentry '+(known?'':'locked')+'"><div class="fishemoji">'+(known?f.emoji:'❔')+'</div><h3>'+(known?f.name:'Неизвестная рыба')+'</h3><p>'+(known?f.min+'–'+f.max+' кг':'Поймай её, чтобы открыть')+'</p></div>'}).join('')}
function renderTasks(){const goal=5,progress=Math.min(goal,state.questProgress);$('taskCard').innerHTML='<h3>🎯 Первая пятёрка</h3><p>Поймай '+goal+' рыб на любых водоёмах.</p><div class="taskprogress"><i style="width:'+(progress/goal*100)+'%"></i></div><p>'+progress+' / '+goal+' рыб</p>'+(state.questClaimed?'<span class="selectedtag">НАГРАДА ПОЛУЧЕНА ✓</span>':'<button class="btn btn-primary" id="claimTask" '+(progress<goal?'disabled':'')+'>Забрать награду · 100 🪙 + 50 опыта</button>');const b=$('claimTask');if(b)b.onclick=()=>{if(state.questProgress<goal||state.questClaimed)return;state.questClaimed=true;state.coins+=100;gainXP(50);save();notify('Задание выполнено!')};$('recordText').textContent=state.caught?'Самый тяжёлый улов: '+fmt(state.best)+' кг. Всего поймано: '+state.caught+'.':'Поймай первую рыбу, чтобы начать историю рекордов.'}
function reelRepairCost(){return 45+(Number(state.gear.reel)||0)*30}
function rodRepairCost(){return 60+(Number(state.gear.rod)||0)*35}
function renderDurability(){const items=[['lineDurability','lineDurabilityNum','line',35],['rodDurability','rodDurabilityNum','rod',rodRepairCost()],['reelDurability','reelDurabilityNum','reel',reelRepairCost()]];for(const [barId,labelId,key,cost] of items){const value=Math.max(0,Math.min(100,Number(state[key+'Durability'])||0));const bar=$(barId),label=$(labelId);if(bar)bar.style.width=value+'%';if(label)label.textContent=Math.round(value)+'%';const repair=$('repair'+key[0].toUpperCase()+key.slice(1)+'Btn');if(repair){repair.disabled=value>=100||state.coins<cost;repair.textContent=value>=100?({line:'🧵 Леска исправна',rod:'🎣 Удочка исправна',reel:'⚙️ Катушка исправна'}[key]):({line:'🧰 Починить леску',rod:'🔧 Починить удочку',reel:'⚙️ Починить катушку'}[key])+' · '+cost+' 🪙'}}}
function renderAll(){renderHeader();renderDurability();renderBaits();renderSpots();renderShop();renderKeep();renderTasks();$('castBtn').disabled=mode==='bite'||mode==='fight'||state.rodDurability<=0;$('reelBtn').disabled=mode!=='bite'&&mode!=='fight'}
function showScreen(name){document.querySelectorAll('.screen').forEach(s=>s.classList.toggle('active',s.id==='screen-'+name));document.querySelectorAll('.navitem').forEach(b=>b.classList.toggle('active',b.dataset.screen===name));if(name==='shop')renderShop();if(name==='spots')renderSpots();if(name==='keep')renderKeep();if(name==='repair')renderDurability();window.scrollTo({top:0,behavior:'smooth'})}
document.querySelectorAll('[data-screen]').forEach(b=>b.onclick=()=>showScreen(b.dataset.screen));document.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>showScreen(b.dataset.go));
function setStatus(t){$('status').textContent=t}
function cast(){if(mode==='bite'||mode==='fight')return;if(state.rodDurability<=0){notify('Удочка сломана! Открой вкладку «Ремонт».');return}const power=Math.max(25,Math.min(100,Number(state.castPower)||70))/100;const result=$('catchResult');if(result)result.classList.remove('visible');const bait=BAITS.find(b=>b.id===state.selectedBait);if(!state.baits[bait.id]){notify('Наживка закончилась! Выбери другую.');return}state.baits[bait.id]--;state.casts++;mode='cast';fish=null;fishDistance=.82;fishSide=0;tension=0;$('tension').style.width='0%';$('fishEnergy').style.width='0%';$('tensionNum').textContent='0%';$('fishPower').textContent='—';setStatus('Заброс на '+Math.round(power*100)+'% мощности… Ждём поклёвку');renderAll();actionTick=0;setTimeout(()=>{if(mode!=='cast')return;let options=FISH.filter(f=>f.spots.includes(state.spot)&&f.baits.includes(bait.id));
options=options.filter(f=>f.min<=hookLimit()*1.15);
fish=chooseFish(options.length?options:FISH.filter(f=>f.spots.includes(state.spot)&&f.min<=hookLimit()*1.15));
const trophyChance=.045+power*.075+Math.min(.035,gearPower()*.008);
const sizeBonus=Math.random()<trophyChance?1.8:1;
const hookFactor=Math.min(1.25,hookPower()/1.4);
const castingReach=.72+power*.48;
fishWeight=+(fish.min+Math.random()*(fish.max-fish.min)*Math.min(1.15,gearPower()/1.8)*hookFactor*sizeBonus*castingReach).toFixed(2);
fishWeight=Math.min(fishWeight,hookLimit()*(.75+Math.random()*.25));fishEnergy=100;mode='bite';setStatus('🐟 Поклёвка! Быстро нажми «Подсекать / тянуть»!');$('reelBtn').disabled=false;notify('Есть поклёвка!');},Math.max(1100,4200-power*2100)+Math.random()*2200);save()}
function chooseFish(arr){let pool=arr.map(f=>({f,w:f.rare?1.5:Math.max(1,10/(f.max+1))}));let total=pool.reduce((a,x)=>a+x.w,0),r=Math.random()*total;for(const x of pool){r-=x.w;if(r<=0)return x.f}return arr[0]}
let reeling=false,lastFightUpdate=0,burst=0,weatherIndex=0,lastWeatherUpdate=0,fishDistance=.82,fishSide=0,fishTurn=1;
function beginFight(){mode='fight';reeling=false;tension=24;fishEnergy=100;burst=0;fishDistance=.82;fishSide=(Math.random()-.5)*.5;fishTurn=Math.random()<.5?-1:1;lastFightUpdate=performance.now();setStatus('Рыба на крючке! Удерживай «Подматывать», отпускай при сильном натяжении.');updateMeters();renderAll()}
function reel(){if(mode==='bite'){if(state.rodDurability<=0){notify('Удочка сломана — открой вкладку «Ремонт».');return}beginFight();return}if(mode!=='fight')return;reeling=true}
function stopActions(){reeling=false}
function updateFight(now){
if(mode!=='fight')return;
const dt=Math.min(.05,Math.max(0,(now-(lastFightUpdate||now))/1000));lastFightUpdate=now;
if(burst<=0&&Math.random()<dt*(.18+fishWeight/45)){burst=1.2+Math.random()*1.3;setStatus('💥 Рыба делает рывок! Отпусти подмотку и сбрось натяжение!')}
if(burst>0)burst=Math.max(0,burst-dt);
const rodPower=GEAR.find(g=>g.id==='rod').items[state.gear.rod||0].power;
const linePower=GEAR.find(g=>g.id==='line').items[state.gear.line||0].power;
const reelPower=GEAR.find(g=>g.id==='reel').items[state.gear.reel||0].power;
const clothesPower=CLOTHES[state.clothes.equipped||0].power;
const hook=hookPower();
const reelCondition=Math.max(.25,state.reelDurability/100);
// Сопротивление рыбы зависит от её веса и всей установленной экипировки.
const fishForce=(.7+fishWeight/14)/Math.pow(tackleStrength(),.72)*(burst>0?2.6:1);
const rodRelief=.7+rodPower*.3;const rodLimit=[5,12,25,38,52,70][state.gear.rod||0];const overload=Math.max(0,fishWeight/rodLimit-0.65);
if(reeling){
tension+=dt*(11+fishForce*8)*(1+overload*.8)/(rodRelief*Math.pow(linePower,.62));
fishEnergy-=dt*(4.2+gearPower()*1.45+reelPower*1.8+hook*.7)*reelCondition*(burst>0?.42:1);
fishDistance=Math.max(.12,fishDistance-dt*(.018+reelPower*.014)*reelCondition*(burst>0?.25:1));
}else{
tension-=dt*(burst>0?18+linePower*3:10+linePower*2);
fishEnergy=Math.min(100,fishEnergy+dt*.35);
fishDistance=Math.min(1,fishDistance+dt*(burst>0?.038:.004));
}
if(burst>0){fishSide+=fishTurn*dt*(.6+fishWeight/35);if(Math.abs(fishSide)>.95){fishTurn*=-1;fishSide=Math.max(-.95,Math.min(.95,fishSide))}}else fishSide*=Math.max(0,1-dt*.8);
tension=Math.max(0,Math.min(100,tension));fishEnergy=Math.max(0,fishEnergy);
if(tension>58){const wear=dt*(tension>85?2.8:tension>72?1.55:.55)*(burst>0?1.5:1);state.lineDurability=Math.max(0,state.lineDurability-wear);state.reelDurability=Math.max(0,state.reelDurability-dt*(tension>85?1.65:tension>72?.85:.3)*(burst>0?1.4:1))}
if(overload>.2&&tension>60){state.rodDurability=Math.max(0,state.rodDurability-dt*(overload*2.5+(burst>0?1.5:0)))}
updateMeters();renderDurability();
if(state.rodDurability<=0){state.rodDurability=0;mode='idle';stopActions();state.lineDurability=Math.max(0,state.lineDurability-8);save();setStatus('💥 Удочка сломалась от перегрузки! Почини её во вкладке «Ремонт».');notify('Удочка сломалась!');renderAll();return}
if(state.lineDurability<=0||tension>=100){state.lineDurability=0;mode='idle';stopActions();save();setStatus('💔 Леска изношена и порвалась! Перейди во вкладку «Ремонт».');notify('Рыба сорвалась — леска порвалась!');renderAll();return}
if(state.reelDurability<=0){state.reelDurability=0;mode='idle';stopActions();save();setStatus('⚙️ Катушка заклинила от нагрузки! Почини её во вкладке «Ремонт».');notify('Катушка сломалась!');renderAll();return}
if(fishEnergy<=0){mode='idle';stopActions();landFish();return}
if(tension>82)setStatus('🚨 Критическое натяжение! Ослабь леску! Прочность: '+Math.round(state.lineDurability)+'%');
else if(tension>65)setStatus('⚠️ Натяжение высокое — отпусти подмотку! Прочность лески: '+Math.round(state.lineDurability)+'%');
else if(overload>.2&&reeling)setStatus('⚠️ Удочка перегружена! Рыба слишком тяжёлая для этого бланка.');
else if(burst>0)setStatus('💥 Рыба рвётся в сторону! Ослабь леску!');
else if(reeling)setStatus('🎣 Подматываешь… следи за натяжением!');
else setStatus('↘️ Кнопка отпущена — леска ослабляется автоматически.');
}
function updateMeters(){$('tension').style.width=tension+'%';$('tensionNum').textContent=Math.round(tension)+'%';$('fishEnergy').style.width=fishEnergy+'%';$('fishPower').textContent=Math.round(fishEnergy)+'%';$('fishEnergy').style.opacity=fishEnergy<25?'.65':'1'}
function landFish(){mode='idle';const f=fish,weight=fishWeight;state.lineDurability=Math.max(0,state.lineDurability-1.5);const value=Math.max(1,Math.round(f.value*weight*SPOTS[state.spot].bonus));state.coins+=value;state.caught++;state.best=Math.max(state.best,weight);state.fishCaught[f.id]=(state.fishCaught[f.id]||0)+1;state.questProgress++;gainXP(f.xp);state.history.unshift({name:f.name,emoji:f.emoji,weight,spot:SPOTS[state.spot].name,time:new Date().toLocaleTimeString('ru-RU',{hour:'2-digit',minute:'2-digit'})});state.history=state.history.slice(0,30);setStatus('🎉 '+f.name+' · '+fmt(weight)+' кг! Продано за '+value+' монет.');
const result=$('catchResult');
if(result){result.innerHTML='<div class="catch-illustration">'+f.emoji+'</div><div><strong>'+(f.rare?'✨ РЕДКИЙ УЛОВ!':'🎣 Улов!')+' '+f.name+'</strong><p>'+fmt(weight)+' кг · +'+f.xp+' опыта · '+value+' 🪙</p></div>';result.classList.add('visible')}
notify((f.rare?'✨ РЕДКАЯ РЫБА: ':'Улов: ')+f.name+' · '+fmt(weight)+' кг');renderAll();save()}
const castPower=$('castPower'),castPowerText=$('castPowerText');
if(castPower){castPower.value=state.castPower;castPowerText.textContent=state.castPower+'%';castPower.addEventListener('input',()=>{state.castPower=+castPower.value;castPowerText.textContent=state.castPower+'%';save()})}
$('castBtn').onclick=cast;
function repairGear(key){const costs={line:35,rod:rodRepairCost(),reel:reelRepairCost()},cost=costs[key],prop=key+'Durability',names={line:'Леска',rod:'Удочка',reel:'Катушка'};if(state[prop]>=100){notify(names[key]+' уже исправна.');return}if(state.coins<cost){notify('Для ремонта нужно '+cost+' монет.');return}state.coins-=cost;state[prop]=100;save();notify(names[key]+' отремонтирована: прочность 100%.')}
const repairLineBtn=$('repairLineBtn'),repairRodBtn=$('repairRodBtn'),repairReelBtn=$('repairReelBtn');
if(repairLineBtn)repairLineBtn.onclick=()=>repairGear('line');
if(repairRodBtn)repairRodBtn.onclick=()=>repairGear('rod');
if(repairReelBtn)repairReelBtn.onclick=()=>repairGear('reel');
const reelBtn=$('reelBtn');
reelBtn.addEventListener('pointerdown',e=>{e.preventDefault();reel()});
['pointerup','pointercancel','pointerleave','lostpointercapture'].forEach(ev=>reelBtn.addEventListener(ev,stopActions));
window.addEventListener('blur',stopActions);
const canvas=$('water'),ctx=canvas.getContext('2d');
function draw(t){
const w=canvas.width,h=canvas.height;sceneTime=t*.00035;
const phase=(t%150000)/150000,night=phase>.72||phase<.08,dusk=!night&&phase>.60;const shoreTop=state.spot===3?'#829f91':state.spot===4?'#7d8756':state.spot===5?'#d1ad88':'#5c9b75',shoreDark=state.spot===3?'#426b68':state.spot===4?'#394d35':state.spot===5?'#7b9d89':'#28664f',waterTop=state.spot===3?'#70c5d0':state.spot===4?'#6a9b7f':state.spot===5?'#59c6d5':'#49b8c6',waterMid=state.spot===3?'#238ca8':state.spot===4?'#36725e':state.spot===5?'#168da8':'#168aa4',waterDeep=state.spot===3?'#0b4a68':state.spot===4?'#183e3d':state.spot===5?'#063e5c':'#073c5a';
const sky=ctx.createLinearGradient(0,0,0,h*.55);
sky.addColorStop(0,night?'#102844':dusk?'#d87967':'#70c8e4');sky.addColorStop(1,night?'#425e79':dusk?'#f0b17c':'#f4dfb1');ctx.fillStyle=sky;ctx.fillRect(0,0,w,h);
if(t-lastWeatherUpdate>1200){lastWeatherUpdate=t;const weather=['☀️ Ясно','🌤️ Лёгкий ветер','🌦️ Морось'];weatherIndex=Math.floor(t/28000)%weather.length;$('weather').textContent=night?'🌙 Ночь':dusk?'🌇 Закат':weather[weatherIndex]}
if(night){ctx.fillStyle='rgba(240,246,255,.8)';for(let i=0;i<18;i++){const sx=(i*97+31)%w,sy=(i*47+19)%(h*.35);ctx.beginPath();ctx.arc(sx,sy,1+(i%3)*.35,0,Math.PI*2);ctx.fill()}}
// Солнце с мягким свечением
const sunX=w*.16,sunY=h*.16;
const glow=ctx.createRadialGradient(sunX,sunY,5,sunX,sunY,62);
glow.addColorStop(0,'rgba(255,244,174,.72)');glow.addColorStop(1,'rgba(255,244,174,0)');
ctx.fillStyle=glow;ctx.fillRect(sunX-65,sunY-65,130,130);
ctx.fillStyle=night?'#e5edf9':dusk?'#ffad6e':'#fff0ad';ctx.beginPath();ctx.arc(sunX,sunY,18,0,Math.PI*2);ctx.fill();
// Медленно плывущие облака
function cloud(x,y,s){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.fillStyle='rgba(255,255,255,.68)';ctx.beginPath();ctx.ellipse(0,5,25,9,0,0,Math.PI*2);ctx.ellipse(-12,0,12,10,0,0,Math.PI*2);ctx.ellipse(2,-5,15,14,0,0,Math.PI*2);ctx.ellipse(16,1,12,9,0,0,Math.PI*2);ctx.fill();ctx.restore()}
cloud(((w*.35+sceneTime*22)%(w+100))-50,h*.13,.78);
cloud(((w*.73+sceneTime*13)%(w+120))-60,h*.22,.58);
// Дальние холмы и берег
ctx.fillStyle=shoreTop;ctx.beginPath();ctx.moveTo(0,h*.38);ctx.lineTo(w*.12,h*.23);ctx.lineTo(w*.25,h*.34);ctx.lineTo(w*.43,h*.19);ctx.lineTo(w*.58,h*.32);ctx.lineTo(w*.76,h*.21);ctx.lineTo(w,h*.31);ctx.lineTo(w,h*.5);ctx.lineTo(0,h*.5);ctx.fill();
ctx.fillStyle=shoreDark;ctx.beginPath();ctx.moveTo(0,h*.41);for(let i=0;i<=w;i+=24)ctx.lineTo(i,h*(.39+Math.sin(i*.023+sceneTime)*.018));ctx.lineTo(w,h*.51);ctx.lineTo(0,h*.51);ctx.fill();
const water=ctx.createLinearGradient(0,h*.43,0,h);water.addColorStop(0,waterTop);water.addColorStop(.45,waterMid);water.addColorStop(1,waterDeep);ctx.fillStyle=water;ctx.fillRect(0,h*.43,w,h*.57);
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
// Рыбак: анимация дыхания, ног, рук и одежды из гардероба
const outfit=CLOTHES[state.clothes.equipped||0],walk=Math.sin(t*.006)*(mode==='fight'?2.4:1.1),breath=Math.sin(t*.003)*1.5,lean=mode==='fight'?Math.min(.035,tension/2600):0;
ctx.lineCap='round';ctx.strokeStyle=outfit.pants;ctx.lineWidth=10;ctx.beginPath();ctx.moveTo(w*.84,h*.64);ctx.lineTo(w*(.82+walk*.002),h*.73);ctx.lineTo(w*(.85+walk*.003),h*.78);ctx.moveTo(w*.84,h*.64);ctx.lineTo(w*(.88-walk*.002),h*.72);ctx.lineTo(w*(.9-walk*.003),h*.76);ctx.stroke();
ctx.fillStyle='#172a34';ctx.beginPath();ctx.ellipse(w*(.85+walk*.002),h*.785,9,3,0,0,Math.PI*2);ctx.ellipse(w*(.9-walk*.003),h*.765,9,3,0,0,Math.PI*2);ctx.fill();
ctx.strokeStyle=outfit.color;ctx.lineWidth=18;ctx.beginPath();ctx.moveTo(w*.84,h*(.53+lean)+breath*.001);ctx.lineTo(w*.85,h*.65);ctx.stroke();
ctx.strokeStyle='#d6e3e3';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(w*.84,h*.55);ctx.lineTo(w*.85,h*.63);ctx.stroke();
ctx.fillStyle='#e9b58a';ctx.beginPath();ctx.arc(w*.83,h*(.48+lean),14,0,Math.PI*2);ctx.fill();
ctx.fillStyle=outfit.hat;ctx.beginPath();ctx.ellipse(w*.83,h*.46,18,5,0,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.arc(w*.83,h*.445,12,Math.PI,Math.PI*2);ctx.fill();
ctx.fillStyle='#273747';ctx.beginPath();ctx.arc(w*.837,h*.48,2,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.arc(w*.824,h*.477,1.4,0,Math.PI*2);ctx.fill();
ctx.strokeStyle='#e9b58a';ctx.lineWidth=7;ctx.beginPath();ctx.moveTo(w*.84,h*.55);ctx.lineTo(w*(.79+Math.sin(t*.008)*.004),h*(.57+lean));ctx.lineTo(w*.77,h*(.53+lean));ctx.stroke();
ctx.strokeStyle=outfit.color;ctx.lineWidth=8;ctx.beginPath();ctx.moveTo(w*.84,h*.55);ctx.lineTo(w*.805,h*.565);ctx.stroke();
// Удочка и леска, направленная от рыбака в озеро
const castFlex=(Number(state.castPower||70)-70),rodBend=mode==='fight'?Math.min(.17,tension/900+fishWeight/360):mode==='bite'?.012:0;
ctx.strokeStyle='#70462b';ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(w*.78,h*.54);ctx.quadraticCurveTo(w*(.68-castFlex*.0006),h*(.31-castFlex*.0009+rodBend),w*.54,h*(.29-castFlex*.0007+rodBend*.72));ctx.stroke();
ctx.strokeStyle='#f7f0d6';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(w*.54,h*.29);ctx.quadraticCurveTo(w*.56,h*.45,w*.53,h*.62);ctx.stroke();
// Поплавок и круги поклёвки
if(mode==='cast'||mode==='bite'||mode==='fight'){
const px=w*(.53+(mode==='fight'?Math.sin(t*.0028)*(fishWeight/500):0)),baseY=h*.625;const dip=mode==='bite'?Math.abs(Math.sin(t*.025))*13:mode==='fight'?Math.sin(t*.018)*7+tension*.12:0;const py=baseY+Math.sin(t*.004)*2+dip;
ctx.fillStyle='#f4f0d7';ctx.beginPath();ctx.ellipse(px,py,5,9,0,0,Math.PI*2);ctx.fill();ctx.fillStyle='#f15e4e';ctx.fillRect(px-4,py-9,8,9);ctx.fillStyle='#fff3c8';ctx.fillRect(px-2,py-15,4,6);
ctx.beginPath();ctx.ellipse(px,py+10,12+Math.sin(t*.006)*4,3,0,0,Math.PI*2);ctx.strokeStyle='rgba(218,255,244,.75)';ctx.lineWidth=2;ctx.stroke();
if(mode==='bite'){
// Брызги вокруг поплавка при поклёвке
for(let i=0;i<6;i++){const a=i*Math.PI/3+t*.008;const r=13+Math.abs(Math.sin(t*.02+i))*12;ctx.fillStyle='rgba(233,255,249,.9)';ctx.beginPath();ctx.arc(px+Math.cos(a)*r,py+Math.sin(a)*r*.55,2.1,0,Math.PI*2);ctx.fill()}
ctx.strokeStyle='rgba(255,236,143,.95)';ctx.lineWidth=3;ctx.beginPath();ctx.ellipse(px,py+12,18+Math.sin(t*.02)*7,6,0,0,Math.PI*2);ctx.stroke();ctx.fillStyle='#fff2a1';ctx.font='bold 22px system-ui';ctx.fillText('!',px+18,py-12)}
if(mode==='fight'){
ctx.strokeStyle='rgba(255,255,255,.8)';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(px-9,py+7);ctx.lineTo(px+10,py+13);ctx.stroke();
const fishX=w*(.78-fishDistance*.35)+fishSide*32+Math.sin(t*.004)*(5+fishWeight*.3),fishY=h*(.62+fishDistance*.22)+Math.sin(t*.009)*4;
ctx.strokeStyle='rgba(246,255,241,.55)';ctx.lineWidth=1.3;ctx.beginPath();ctx.moveTo(px,py+8);ctx.quadraticCurveTo((px+fishX)*.5,py+24,fishX,fishY);ctx.stroke();
ctx.save();ctx.translate(fishX,fishY);ctx.rotate(Math.sin(t*.01)*.18+fishSide*.16);ctx.fillStyle=fish&&fish.rare?'#f5d4ff':'#f2b84d';ctx.beginPath();ctx.ellipse(0,0,Math.min(32,10+fishWeight*.48),7,0,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.moveTo(-8,0);ctx.lineTo(-17,-7);ctx.lineTo(-17,7);ctx.closePath();ctx.fill();ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(7,-2,2.3,0,Math.PI*2);ctx.fill();ctx.restore();
if(burst>0){ctx.fillStyle='#fff0a0';ctx.font='bold 17px system-ui';ctx.fillText('!',fishX+12,fishY-10);
const jump=Math.abs(Math.sin((1.3-burst)*Math.PI/1.3))*Math.min(48,20+fishWeight*1.5);
if(burst>0.35){ctx.save();ctx.translate(fishX+Math.sin(t*.01)*15, h*.64-jump);ctx.rotate(Math.sin(t*.02)*.45);ctx.fillStyle=fish&&fish.rare?'#f5d4ff':'#f2b84d';ctx.beginPath();ctx.ellipse(0,0,Math.min(35,11+fishWeight*.52),8,0,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.moveTo(-8,0);ctx.lineTo(-19,-8);ctx.lineTo(-19,8);ctx.closePath();ctx.fill();ctx.restore();ctx.fillStyle='rgba(225,255,255,.85)';for(let j=0;j<4;j++){ctx.beginPath();ctx.arc(fishX-8+j*5,h*.64-3-(j%2)*6,2,0,Math.PI*2);ctx.fill()}}
}
}
}
requestAnimationFrame(draw)}
function gameLoop(now){updateFight(now);requestAnimationFrame(gameLoop)}
requestAnimationFrame(gameLoop);
requestAnimationFrame(draw);
renderAll();setStatus('Всё готово к рыбалке. Забрасывай!');
if('serviceWorker'in navigator&&location.protocol.startsWith('http'))window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
})();