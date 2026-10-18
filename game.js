const $=id=>document.getElementById(id);
const saveKey="fishingV3";
const fish=[
 {id:"crucian",name:"Карась",e:"🐟",min:.2,max:2.5,str:18,price:18,xp:22,rarity:"Обычная"},
 {id:"perch",name:"Окунь",e:"🐠",min:.2,max:3.8,str:28,price:25,xp:30,rarity:"Обычная"},
 {id:"pike",name:"Щука",e:"🐊",min:1.5,max:12,str:48,price:65,xp:65,rarity:"Редкая"},
 {id:"zander",name:"Судак",e:"🐟",min:1,max:10,str:55,price:75,xp:72,rarity:"Редкая"},
 {id:"carp",name:"Карп",e:"🐡",min:1.5,max:18,str:70,price:95,xp:90,rarity:"Эпическая"},
 {id:"catfish",name:"Сом",e:"🦈",min:4,max:35,str:100,price:180,xp:150,rarity:"Легендарная"},
 {id:"sturgeon",name:"Осётр",e:"🐟",min:6,max:48,str:125,price:260,xp:220,rarity:"Мифическая"}
];
const rods=[
 ["Удочка новичка",30,0,1],["River Pro",48,60,2],["Carp Hunter",70,160,4],["Titan Master",94,420,7],["Ocean X",120,900,10]
], lines=[
 ["Леска 0.18",20,0,1],["Леска 0.28",38,50,2],["Леска 0.40",60,140,4],["Steel Core",86,350,7],["Titan Line",112,800,10]
], reels=[
 ["Катушка Start",18,0,1],["Swift 2000",34,80,2],["Power 4000",55,190,4],["Dragon 6000",78,450,7],["Monster 9000",105,900,10]
], baits=[
 ["Червь",1.05,0],["Кукуруза",1.18,35],["Живец",1.35,120],["Пиявка",1.52,250],["Золотая блесна",1.72,600]
];
const spots=[
 {name:"Тихое озеро",level:1,price:0,fish:["crucian","perch","carp"]},
 {name:"Щучья заводь",level:2,price:180,fish:["perch","pike","zander","carp"]},
 {name:"Старый карьер",level:4,price:450,fish:["pike","zander","carp","catfish"]},
 {name:"Глубокий омут",level:7,price:900,fish:["zander","carp","catfish","sturgeon"]}
];
let S=JSON.parse(localStorage.getItem(saveKey)||"null")||{
 level:1,xp:0,coins:250,rep:0,rod:0,line:0,reel:0,bait:0,spot:0,best:0,catches:0,
 discovered:[],quests:{weight:0,count:0,rare:0},cup:0
};
let phase="idle", fishNow=null, energy=0,tension=0, timer=null, tick=null, bob=0;
function persist(){localStorage.setItem(saveKey,JSON.stringify(S))}
function need(){return 100+(S.level-1)*70}
function power(){return rods[S.rod][1]+lines[S.line][1]+reels[S.reel][1]}
function fillSelect(el,data,index){$(el).innerHTML=data.map((x,i)=>`<option value="${i}">${x[0]} — сила ${x[1]}${x[2]?` • 🪙${x[2]}`:""}</option>`).join("");$(el).value=index}
function setup(){
 fillSelect("rod",rods,S.rod);fillSelect("line",lines,S.line);fillSelect("reelSel",reels,S.reel);
 $("bait").innerHTML=baits.map((x,i)=>`<option value="${i}">${x[0]} ×${x[1]}${x[2]?` • 🪙${x[2]}`:""}</option>`).join("");$("bait").value=S.bait;
 ["rod","line","reelSel","bait"].forEach(id=>$(id).onchange=()=>buyGear(id));
 renderSpots();renderBook();renderQuests();renderAll();draw();
}
function buyGear(id){
 let [arr,key]=id==="rod"? [rods,"rod"]:id==="line"?[lines,"line"]:id==="reelSel"?[reels,"reel"]:[baits,"bait"];
 let i=+$(id).value,x=arr[i],price=id==="bait"?x[2]:x[2];
 if(S.level < (id==="bait"?1:x[3])){alert("Нужен более высокий уровень.");$(id).value=S[key];return}
 if(i!==S[key] && price>S.coins){alert("Не хватает монет.");$(id).value=S[key];return}
 if(i!==S[key]){S.coins-=price;S[key]=i;log(`Куплено: ${x[0]}`);persist();renderAll()}
}
function renderSpots(){
 $("spots").innerHTML=spots.map((s,i)=>`<div class="spot ${i===S.spot?"active":""}" onclick="chooseSpot(${i})"><b>${s.name}</b><small>Уровень ${s.level} • 🪙 ${s.price}</small></div>`).join("");
}
window.chooseSpot=i=>{
 let s=spots[i];if(S.level<s.level){log("Эта локация пока закрыта.");return}
 if(i!==S.spot){if(S.coins<s.price){log("Не хватает монет для новой локации.");return}S.coins-=s.price;S.spot=i;log(`Открыта локация: ${s.name}`);persist();renderAll();renderSpots()}
}
function renderBook(){
 $("fishbook").innerHTML=fish.map(f=>`<div class="fish"><div class="emoji">${f.e}</div><b>${f.name}</b><small>${f.rarity}<br>${f.min}–${f.max} кг</small></div>`).join("")
}
function renderQuests(){
 let q=[
  ["Поймай 5 рыб",S.quests.count,5,80],
  ["Общий вес улова 15 кг",S.quests.weight,15,150],
  ["Поймай редкую или лучше",S.quests.rare,1,120]
 ];
 $("quests").innerHTML=q.map((x,i)=>`<div class="quest"><div class="qtop"><b>${x[0]}</b><span class="${x[1]>=x[2]?"done":""}">${Math.min(x[1],x[2])}/${x[2]}</span></div><small>${x[1]>=x[2]?"✅ Выполнено":"Награда: 🪙 "+x[3]}</small></div>`).join("")
}
function renderAll(){
 $("coins").textContent=Math.floor(S.coins);$("level").textContent=S.level;$("xp").textContent=`${S.xp} / ${need()}`;
 $("xpbar").style.width=Math.min(100,S.xp/need()*100)+"%";$("best").textContent=S.best.toFixed(2)+" кг";
 $("caught").textContent=S.catches;$("rep").textContent=S.rep;$("power").textContent=power();
 $("spotName").textContent=spots[S.spot].name;$("cupBest").textContent=S.cup.toFixed(2)+" кг";
 renderSpots();renderQuests();leaderboard()
}
function leaderboard(){
 let rows=[["IceFisher","41.82"],["RiverKing","38.40"],["BigHook","34.11"],["DeepHunter","29.87"],["Ты",S.cup.toFixed(2)]].sort((a,b)=>+b[1]-+a[1]);
 $("leaderboard").innerHTML=rows.map((r,i)=>`<div class="leader"><span>${i+1}. ${r[0]}</span><b>${r[1]} кг</b></div>`).join("")
}
function log(t){let d=document.createElement("div");d.className="log";d.textContent=new Date().toLocaleTimeString()+" — "+t;$("log").prepend(d);while($("log").children.length>8)$("log").lastChild.remove()}
function xpAdd(n){
 S.xp+=n;
 while(S.xp>=need()){S.xp-=need();S.level++;S.coins+=100;S.rep+=2;log(`Новый уровень: ${S.level}! +100 монет`)}
}
function pickFish(){
 let pool=spots[S.spot].fish.map(id=>fish.find(f=>f.id===id));
 let bonus=S.level>=7?.12:S.level>=4?.06:0;
 if(Math.random()<.08+bonus&&!pool.some(f=>f.id==="catfish"))pool.push(fish.find(f=>f.id==="catfish"));
 return pool[Math.floor(Math.random()*pool.length)]
}
function cast(){
 if(phase!=="idle")return;
 phase="waiting";$("cast").disabled=true;$("reel").disabled=true;$("status").textContent="🎯 Заброс... Ждём поклёвку";
 let wait=1800+Math.random()*4200;timer=setTimeout(()=>bite(),wait)
}
function bite(){
 phase="fight";fishNow=pickFish();energy=100;tension=15;bob=0;$("reel").disabled=false;
 $("status").textContent=`‼️ Поклёвка! ${fishNow.e} ${fishNow.name} — начинай вываживание!`;
 tick=setInterval(fightTick,120)
}
function fightTick(){
 if(phase!=="fight")return;
 bob+=.2;tension+=fishNow.str/420;energy=Math.min(100,energy+fishNow.str/900);
 $("tension").style.width=Math.min(100,tension)+"%";$("energy").style.width=Math.max(0,energy)+"%";
 if(tension>=100){finish(false);return}if(energy<=0){finish(true)}
}
function reel(){
 if(phase!=="fight")return;
 let p=power(),efficiency=.9+p/170;tension+=3.5+fishNow.str/45;energy-=2.2*efficiency;
 if(tension>88){energy+=3.5;$("status").textContent="⚠️ Слишком сильная натяжка — отпусти!"}
 else $("status").textContent="🎣 Вываживание... не дай леске порваться!";
}
$("cast").onclick=cast;$("reel").onclick=reel;
function finish(win){
 clearInterval(tick);clearTimeout(timer);phase="idle";$("cast").disabled=false;$("reel").disabled=true;
 if(!win){$("status").textContent="💥 Леска не выдержала — рыба ушла.";log("Срыв рыбы из-за слишком высокой натяжки.");return}
 let bait=baits[S.bait][1],gear=Math.min(1.35,.72+power()/330),w=fishNow.min+Math.random()*(fishNow.max-fishNow.min)*bait*gear;w=Math.min(fishNow.max,w);
 let money=Math.round(w*fishNow.price),gain=Math.round(fishNow.xp*(.65+w/fishNow.max*.75));
 S.coins+=money;S.catches++;S.rep+=fishNow.rarity==="Обычная"?1:fishNow.rarity==="Редкая"?2:4;S.best=Math.max(S.best,w);S.cup=Math.max(S.cup,w);S.discovered.includes(fishNow.id)||S.discovered.push(fishNow.id);
 S.quests.count++;S.quests.weight+=w;if(fishNow.rarity!=="Обычная")S.quests.rare=1;xpAdd(gain);persist();renderAll();
 $("status").textContent=`🎉 ${fishNow.e} ${fishNow.name} пойман! ${w.toFixed(2)} кг • +🪙${money} • +⭐${gain} XP`;log(`Пойман ${fishNow.name}: ${w.toFixed(2)} кг.`)
}
function weather(){let ws=[["☀️","Ясно"],["🌧️","Дождь"],["🌫️","Туман"],["⛈️","Гроза"],["❄️","Снег"]];let w=ws[Math.floor(Date.now()/180000)%ws.length];$("weather").textContent=w[0]+" "+w[1]}
function clock(){let d=new Date(),m=String(d.getMinutes()).padStart(2,"0");$("time").textContent=String(d.getHours()).padStart(2,"0")+":"+m}
const c=$("water"),ctx=c.getContext("2d");
function draw(){
 let t=Date.now()/900;ctx.clearRect(0,0,c.width,c.height);let g=ctx.createLinearGradient(0,0,0,c.height);g.addColorStop(0,"#128fb1");g.addColorStop(1,"#063e62");ctx.fillStyle=g;ctx.fillRect(0,0,c.width,c.height);ctx.strokeStyle="#75d8ed55";ctx.lineWidth=2;
 for(let y=55;y<340;y+=34){ctx.beginPath();for(let x=0;x<=900;x+=12){let yy=y+Math.sin(x/48+t)*3;ctx.lineTo(x,yy)}ctx.stroke()}
 let bx=450+Math.sin(t/1.5)*120,by=105+Math.sin(t*1.8)*5;ctx.fillStyle="#f2f5f5";ctx.fillRect(bx-5,by,10,46);ctx.fillStyle="#ef5555";ctx.beginPath();ctx.arc(bx,by,9,0,Math.PI*2);ctx.fill();
 if(phase==="fight"){ctx.strokeStyle="#ffffffaa";ctx.beginPath();ctx.moveTo(bx,by+45);ctx.lineTo(bx+Math.sin(t)*40,310);ctx.stroke()}requestAnimationFrame(draw)
}
weather();clock();setInterval(weather,5000);setInterval(clock,1000);setup();log("Fishing World Online 3.0 загружен.");