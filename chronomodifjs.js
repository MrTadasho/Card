var clockHolder = document.getElementById("clockHolder");
var tileHolder = document.getElementById("tileHolder");
var ClockTile=document.getElementById('clocktile');
var textHolder=document.getElementById('textHolder');

var matiereObj = document.getElementById("form-matiere");
var professeurObj = document.getElementById("form-professeur");
var dureeObj = document.getElementById("form-duree");
var dureeAnticipeObj2=0;
var dureeTiersObj2 = 0;
var dureeDebutObj= document.getElementById('form-duree-deb');
/*var dss = [[ClockTile,null,null,null,null,null,null,null,'',false],[textHolder,null,null,null,null,null,null,null,'',false]];
var selecteds = [false,false];
var lockds = [true,true];
var tileList= [null,null];
var AllTile=[null,null];*/
var dss=[];
var selecteds = [];
var lockds=[];
var tileList=[];
var AllTile=[];

var dsIsRunning = false;
var dsStatusButton = document.getElementById("statusButton");
var IsDeleted=false;

function currentTime() {
  var date = new Date(); /* creating object of Date class */
  var hour = date.getHours();
  var min = date.getMinutes();
  var sec = date.getSeconds();
  hour = updateTime(hour);
  min = updateTime(min);
  sec = updateTime(sec);
  clockHolder.innerText = hour + " : " + min + " : " + sec; /* adding time to the div */
    var t = setTimeout(function(){ currentTime() }, 1000); /* setting timer */
}

function updateTime(k) {
  if(k==00){
	  return("00")
  }
  if (k < 10) {
    return "0" + k;
  }
  else {
    return k;
  }
}

/*tileHolder.appendChild(ClockTile);
tileHolder.appendChild(textHolder);*/
function createTile() {
	dureeObj.value= formathour(dureeObj.value);
	if(dureeDebutObj.value!=''){
	dureeDebutObj.value = formathour(dureeDebutObj.value);}
	dureeTiersObj2 = addTemps(dureeObj.value.split(":"),getTiers(dureeObj.value.split(":")));
    dureeAnticipeObj2 = addTemps(getTiers(dureeObj.value.split(":")),getTiers(dureeObj.value.split(":"))); 
	dureeAnticipeObj2 = exams(dureeAnticipeObj2);
	dureeAnticipeObj2 = [updateTime(dureeAnticipeObj2[0]),updateTime(dureeAnticipeObj2[1]),updateTime(dureeAnticipeObj2[2])];
	var tile = document.createElement("div");
    tile.className = "card text-black bg-white mb-3 mx-2 col-sm col-xs-12";
	tile.idName = "box";
	tile.style.position="relative";

    var header = document.createElement("div");
    header.className = "card-header d-flex align-items-center";

    header.innerHTML = '<p class="my-1 uptiletext">DSHERE</p><div class="form-check ml-imp-1"><input class="form-check-input" type="checkbox" value="' + (selecteds.length + 1) + '" id="flexCheckDefault" checked onclick="changeselect(this.value);" /></div><div class="form-check ml-imp-1"><input class="form-check-input" type="checkbox" value="' + (selecteds.length + 1) + '" id="flexCheckDefault2" unchecked onclick="changelock(this.value,this);" /></div><input class="form-check-input" type="checkbox" unchecked id="bpl1" onclick="delit(this.value,this)" value="' + (selecteds.length + 1) + '"></input>';
    header.innerHTML = header.innerHTML.replace("DSHERE", matiereObj.value);

    var bodyTile = document.createElement("div");
    bodyTile.className = "card-body";

	var tileStart = document.createElement("div");
	tileStart.className = "card-pairs";
	var tileEnd = document.createElement("div");
	tileEnd.className = "card-pairs";
	var tilePreview = document.createElement("div");
	tilePreview.className = "card-pairs";
	var tileTier = document.createElement("div");
	tileTier.className = "card-pairs";
    var title = document.createElement("h5");
    title.className = "card-title secondtiletext";
    title.innerHTML = professeurObj.value;
	var boutton = document.createElement("button");
	boutton.className ="btn btn-outline-dark";
	boutton.innerHTML="";
	boutton.id="boutonaff";
	boutton.value=selecteds.length;
	boutton.style.display="inline-block";
	boutton.addEventListener('click',function(){});
	var startTime = document.createElement("p");
    	startTime.className = "card-text my-1 texttiletext";
    	startTime.innerHTML = "<i>Heure de début: </i>" + "<b><u>En attente</u></b>";
    	startTime.id = "starttime-" + (selecteds.length + 1);
	startTime.style.display="inline-block";
	startTime.style.marginLeft="10px";
	var boutton2 = document.createElement("button");
	boutton2.className ="btn btn-outline-dark";
	boutton2.value=selecteds.length;
	boutton2.innerHTML="";
	boutton2.id="boutonaff";
	boutton2.style.display="inline-block";
	boutton2.addEventListener('click',function(){});
	var endTime = document.createElement("p");
    endTime.className = "card-text my-1 texttiletext";
    endTime.innerHTML = "<i>Heure de fin: </i>" + "<b><u>En attente (" + dureeObj.value.replace(":", "h") + ")</u></b>";
    endTime.id = "endtime-" + (selecteds.length + 1);
	endTime.style.display="inline-block";
	endTime.style.marginLeft="10px";
	var boutton3 = document.createElement("button");
	boutton3.className ="btn btn-outline-dark";
	boutton3.value=selecteds.length;
	boutton3.innerHTML="";
	boutton3.id="boutonaff";
	boutton3.style.display="inline-block";
	boutton3.addEventListener('click',function(){if(lockds[this.value]==false){tilePreview.remove();AllTile[this.value].shift();testTile(AllTile[this.value],this.value);}});
	var previewEndTime = document.createElement("p");
    previewEndTime.className = "card-text my-1 texttiletext";
    previewEndTime.innerHTML = "<i>Sortie anticipée: </i>" + "<b><u>En attente (" + fusionTemps(dureeAnticipeObj2).replace(":", "h") + ")</u></b>";
    previewEndTime.id = "previewendtime-" + (selecteds.length + 1);
    previewEndTime.style.display="inline-block";
	previewEndTime.style.marginLeft="10px";
	var boutton4 = document.createElement("button");
	boutton4.className ="btn btn-outline-dark";
	boutton4.value=selecteds.length;
	boutton4.innerHTML="";
	boutton4.id="boutonaff";
	boutton4.addEventListener('click',function(){if(lockds[parseInt(this.value)]==false){tileTier.remove();AllTile[parseInt(this.value)].shift();testTile(AllTile[parseInt(this.value)],parseInt(this.value));}});
	boutton4.style.display="inline-block";
	var tiersEndTime = document.createElement("p");
    tiersEndTime.className = "card-text my-1 texttiletext";
    tiersEndTime.innerHTML = "<i>Tiers-temps: </i>" + "<b><u>En attente (" + fusionTemps(dureeTiersObj2).replace(":", "h") + ")</u></b>";
    tiersEndTime.id = "tiersendtime-" + (selecteds.length + 1);
	tiersEndTime.style.display="inline-block";
	tiersEndTime.style.marginLeft="10px";
	var dstp=[];
	for(var i=0;i<nbttsup;i++){
		var n =document.getElementById("form-temps-supp "+nbttsup);
		var res=addTemps(dureeObj.value.split(':'),getTiers(dureeObj.value.split(':'),n));
		var tiersEndTime2 = document.createElement("p");
		tiersEndTime2.className = "card-text my-1 texttiletext";
		tiersEndTime2.innerHTML = "<i>Tiers-temps: </i>" + "<b><u>En attente (" + fusionTemps(res).replace(":", "h") + ")</u></b>";
		tiersEndTime2.id = "tiersendtime-" + (selecteds.length + 1);
		tiersEndTime2.style.display="inline-block";
		tiersEndTime2.style.marginLeft="10px";
		dstp.push([tiersEndTime2,res]);
	}
    tile.appendChild(header);
	bodyTile.appendChild(title);
	tileStart.appendChild(boutton);
    tileStart.appendChild(startTime);
	bodyTile.appendChild(tileStart);
	tileEnd.appendChild(boutton2);
	tileEnd.appendChild(endTime);
    bodyTile.appendChild(tileEnd);
    if (dureeAnticipeObj2[0] >= 1) {
	  tilePreview.append(boutton3);
	  tilePreview.append(previewEndTime);
      bodyTile.appendChild(tilePreview);
	  AllTile.push([1,2]);
    }
    if (dureeAnticipeObj2[0] <= 1 && dureeObj >=1){
          tilePreview.append(boutton3);
	  tilePreview.append(1:00:00);
      bodyTile.appendChild(tilePreview);
	  AllTile.push([1,2]);
    }
	else{
		AllTile.push([1]);
	}
	tileTier.append(boutton4);
	tileTier.append(tiersEndTime);
    bodyTile.appendChild(tileTier);


    tile.appendChild(bodyTile);

    tileHolder.appendChild(tile);
	tileList.push([tile,header,bodyTile,title,startTime,endTime,previewEndTime,tiersEndTime])
    dss.push([tile, dureeObj.value.split(":"), dureeAnticipeObj2, dureeTiersObj2, startTime, endTime, previewEndTime, tiersEndTime,dureeDebutObj.value.split(":"),false])
	selecteds.push(true);
	lockds.push(false);
	dureeObj.value='';
	matiereObj.value='';
	professeurObj.value='';
	dureeDebutObj.value='';
	dureeAnticipeObj2=0;
	dureeTiersObj2 = 0;
	const checkexams = document.getElementById('isExam');
	checkexams.checked=false;
}

function buttonDS() {

  if (dsIsRunning) {
    pauseDS();
  } else {
    startDS();
  }

}

function startDS() {
  //dsStatusButton.innerHTML = "Mettre en pause le DS";
  //dsIsRunning = true;
  
  for (var i = 0; i < selecteds.length; i++) {
    if (selecteds[i]) {
	  if(lockds[i]==false){
      var a = dss[i][4];

      var date = new Date(); /* creating object of Date class */
      var origindate = new Date();
	  if(dss[i][8]!=''){
		  origindate.setHours(dss[i][8][0]);
		  origindate.setMinutes(dss[i][8][1]);
		  origindate.setSeconds(dss[i][8][2]);
	  }
      var hour = date.getHours();
      var min = date.getMinutes();
      var sec = date.getSeconds();
	  if(dss[i][8]==''){
      hour = updateTime(hour);
      min = updateTime(min);
      sec = updateTime(sec);}
	  else{
	  hour=dss[i][8][0];
	  min=dss[i][8][1];
	  sec=dss[i][8][2];
	  hour = updateTime(hour);
      min = updateTime(min);
      sec = updateTime(sec);
	  }
      a.innerHTML = "<i>Heure de début: </i><b><u>" + hour + ":" + min + ":" + sec + "</u></b>";
	  var date2 = new Date();
	  date2.setHours(hour);
	  date2.setMinutes(min);
	  date2.setSeconds(sec);
      date.setTime(date2.getTime() + (parseInt(dss[i][1][0]) * 60+ parseInt(dss[i][1][1])) * 60 * 1000 + parseInt(dss[i][1][2])*60*10);
      hour = date.getHours();
      min = date.getMinutes();
      sec = date.getSeconds();
      hour = updateTime(hour);
      min = updateTime(min);
      sec = updateTime(sec);
      dss[i][5].innerHTML = "<i>Heure de fin: </i><b><u>" + hour + ":" + min + ":" + sec + "</u></b>";
	  
      date.setTime(origindate.getTime() + (parseInt(dss[i][2][0]) * 60 + parseInt(dss[i][2][1])) * 60 * 1000 + parseInt(dss[i][2][2])*60*10);
      hour = date.getHours();
      min = date.getMinutes();
      sec = date.getSeconds();
      hour = updateTime(hour);
      min = updateTime(min);
      sec = updateTime(sec);
      dss[i][6].innerHTML = "<i>Sortie anticipée: </i><b><u>" + hour + ":" + min + ":" + sec + "</u></b>";

      date.setTime(origindate.getTime() + (parseInt(dss[i][3][0]) * 60 + parseInt(dss[i][3][1])) * 60 * 1000 + parseInt(dss[i][3][2])*60*10);
      hour = date.getHours();
      min = date.getMinutes();
      sec = date.getSeconds();
      hour = updateTime(hour);
      min = updateTime(min);
      sec = updateTime(sec);
      dss[i][7].innerHTML = "<i>Tiers-temps: </i><b><u>" + hour + ":" + min + ":" + sec + "</u></b>";
	  /*for(var i=0;i<nbttsup;i++){
		  date.setTime(origindate.getTime() + (parseInt(dss[i][3][0]) * 60 + parseInt(dss[i][3][1])) * 60 * 1000);
		  hour = date.getHours();
		  min = date.getMinutes();
		  sec = date.getSeconds();
		  hour = updateTime(hour);
		  min = updateTime(min);
		  sec = updateTime(sec);
		  dss[i][7].innerHTML = "<i>Tiers-temps: </i><b><u>" + hour + ":" + min + ":" + sec + "</u></b>";
	  }*/

	  }
    }
  }
}

function pauseDS() {
  dsStatusButton.innerHTML = "Démarrer le DS";
  dsIsRunning = false;
}

function changeselect(k) {
  selecteds[k - 1] = !selecteds[k - 1];
}
function changelock(k,div){
	lockds[k-1] = !lockds[k-1];
	if(lockds[k-1]){
		div.style.backgroundImage=" url('locked.PNG')";
		div.style.backgroundSize=" 20px 20px";
	}
	else{
		div.style.backgroundImage=" url('unlocked.PNG')";
		div.style.backgroundSize=" 20px 20px";
	}
}

function getTiers(k,n=3){
	var heureTier = k[0];
	var heureTierdef = 0;
	var minTier = k[1];
	var minTierdef = 0;
	var secTier = k[2];
	var secTierdef = 0;
	var ListeHeure = [];
	heureTierdef=Math.floor(heureTier/n);
	minTierdef=Math.floor(minTier/n)+(heureTier%n)*20;
	secTierdef=Math.floor(secTier/n)+(minTier%n)*20;
	ListeHeure.push(updateTime(heureTierdef));
	ListeHeure.push(updateTime(minTierdef));
	ListeHeure.push(updateTime(secTierdef));
	return ListeHeure;
}
function addTemps(k,x){
	var h1=parseInt(k[0]);
	var h2=parseInt(x[0]);
	var m1=parseInt(k[1]);
	var m2=parseInt(x[1]);
	var s1=parseInt(k[2]);
	var s2=parseInt(x[2]);
	var hf=0;
	var mf=0;
	var sf=0;
	hf=h1+h2+Math.floor((m1+m2)/60);
	mf=((m1+m2)%60)+Math.floor((s1+s2)/60);
	sf=((s1+s2)%60);
	return([updateTime(hf),updateTime(mf),updateTime(sf)]);
}
function fusionTemps(k){
	var res=k[0].toString();
	for(var i=1;i<k.length;i++){
		res=res+":"+k[i].toString();
	}
	return(res)
}
function testTile(k,i){/*
	if(k.length==0){
		for(var j=0; j< tileList[i].length;j++){
				tileList[i][j].remove();
			}
		dss[i][8]=true;
	}*/
}
var fontclo = 79
function fontplus(){
	clockHolder.style.fontSize=fontclo+2+'px';
	fontclo+=2;
}
function fontmoins(){
	clockHolder.style.fontSize=fontclo-2+'px';
	fontclo-=2;
}
/*var yd=0;
var yf=0;
var d= document.getElementById('selctpose');
d.addEventListener('mousedown',function(event){
	yd = event.clientY;
});
d.addEventListener('mouseup', function(event) {
  yf = event.clientY;
  move(yd,yf);
});
function move(y1,y2){
	console.log('a');
	var div1=null;
	var n2=null;
	var n1=null;
	var fin=false;
	for(var i=0;i<dss.length;i++){
		if(dss[i][9]==false){
			const myDiv = dss[i][0];
			const rect = myDiv.getBoundingClientRect();
			const bottomY = rect.top + rect.height;
			const topY = rect.top;
			if(y1>=topY && y1<= bottomY){
				div1=myDiv;
				n1=i;
			}
			if(y2>=topY && y2<= bottomY){
				n2=i;
			}
			if(i==dss.length-1){
				if(y2>=bottomY){
					fin=true;
					n2=i;
				}
			}
		}
	}
	if(div1==null){
		return;
	}
	if(n2==null && fin==false){
		return;
	}
	tileHolder.removeChild(div1);
	if(fin){
		tileHolder.appendChild(div1);
		var stock=dss[n1];
		dss.splice(n1,1);
		dss.splice(0,0,stock);
	}
	else{
	tileHolder.insertBefore(div1, tileHolder.childNodes[n2]);
	var stock=dss[n1];
	dss.splice(n1,1);
	dss.splice(n2,0,stock);
	}
}
*/
const colorPicker = document.querySelector('#exampleColorInput');
colorPicker.addEventListener('change', function() {
	console.log(colorPicker.value);
    const selectedColor = colorPicker.value;
	const div=document.getElementById('exampleFormControlTextarea1');
    div.style.color=selectedColor; // Output the selected color to the console
  });
const textfontsize = document.getElementById('form-police');
textfontsize.addEventListener('change',function(){
	const div=document.getElementById('exampleFormControlTextarea1');
	div.style.fontSize=this.value+'px';
});
const sizefamily=document.getElementById('form-family');
sizefamily.addEventListener('change',function(){
	const div=document.getElementById('exampleFormControlTextarea1');
div.style.fontFamily=this.value;});
var bold=false;
var under=false;
var ital=false;
var shdpe=false;
function gras(){
	const div=document.getElementById('exampleFormControlTextarea1');
	if(!bold){
	div.style.fontWeight="bold";
	bold=true;}
	else{
		div.style.fontWeight="normal";
	bold=false;
	}
}
function sous(){
	const div=document.getElementById('exampleFormControlTextarea1');
	if(!under){
	div.style.textDecoration="underline";
	under=true;}
	else{
	div.style.textDecoration="none";
	under=false;
	}
}
function itali(){
	const div=document.getElementById('exampleFormControlTextarea1');
	if(!ital){
	div.style.fontStyle = 'italic';
	ital=true;}
	else{
	div.style.fontStyle="normal";
	ital=false;
	}
}
function shodepe2(){
	if(shdpe){
		shdpe=false;
		const div = document.getElementById('changecolor');
		div.style.visibility='hidden';
	}
	else{
		shdpe=true;
		const div = document.getElementById('changecolor');
		div.style.visibility='visible';
	}
}
var isHide=false;
function hideall(){
	var but = document.getElementById('hide');
	try{
		var lis = [bplus,bmns,shodepe,bpl,statusButton,changecolor,flexCheckDefault,flexCheckDefault2,bpl1,boutonaff,fullscreen];
	}
	catch(error){
		var lis = [bplus,bmns,shodepe,bpl,statusButton,changecolor,fullscreen];
	}
	for(var i=0;i<lis.length;i++){
		if(isHide){
			if(i==9){
				for(var j=0;j<lis[i].length;j++){
					lis[i][j].style.visibility='visible';
					var divtext = lis[i][j].nextSibling;
					divtext.style.marginLeft='10px';
				}
			}
			else if(i==6 || i==7 || i== 8){
				console.log(lis[i]);
                                if(lis[i].length>0){
				for(var j=0;j<lis[i].length;j++){
					lis[i][j].style.visibility='visible';
				}}
                                else{
                                        lis[i].style.visibility='visible';
                                }
			}
			else if(i!=5){
				lis[i].style.visibility='visible';
				but.style.left="320px";
				but.innerHTML ="Masquer";
				but.style.width="100px";
			}
			else{
				if(shdpe){
					lis[i].style.visibility='visible';
					but.innerHTML ="Masquer";
					but.style.width="100px";
				}
			}
		}
		else{
			if(i==9){
				for(var j=0;j<lis[i].length;j++){
					lis[i][j].style.visibility='hidden';
					var divtext = lis[i][j].nextSibling;
					divtext.style.marginLeft="-25px";
				}
			}
			else if(i==6 || i==7 || i== 8){
				console.log(lis[i]);
                                if(lis[i].length>0){
				for(var j=0;j<lis[i].length;j++){
					lis[i][j].style.visibility='hidden';
				}}
                                else{
                                        lis[i].style.visibility='hidden';
                                }
			}
			else{
				lis[i].style.visibility='hidden';
				but.style.left="20px";
				but.innerHTML ="";
				but.style.width="10px";
			}
	}
	}
	isHide=!isHide;
}
var nbttsup = "0";
function asktempssup(){/*
	var div = document.createElement('div'); 
	div.style.display="flex";
	div.style.marginTop="15px";
	var spana = document.createElement('span');
	spana.className="input-group-text";
	spana.id="basic-addon1";
	spana.innerHTML="Temps supplémentaire";
	var inputa = document.createElement('input');
	inputa.type="text";
	inputa.className="form-control";
	inputa.placeholder="Temps supplémentaire";
	inputa.id="form-temps-supp "+nbttsup;
	inputa.setAttribute('aria-describedby', 'basic-addon1');
	inputa.setAttribute('aria-label', 'Temps supplémentaire');
	div.appendChild(spana);
	div.appendChild(inputa);
	var divparent = document.getElementById('container');
	divparent.appendChild(div);
	alert(inputa.id);
	nbttsup=(parseInt(nbttsup)+1).toString();
*/}
function formathour(k){
	if(k.includes('h')){
		if(k.split('h')[1]==''){
			k= k.replace('h','');
		}
		else{
			k= k.replace('h',':');
		}
	}
	else{
	k= k.replace('h',':');
	}
	while(k.split(':').length<3){
		k=k+":00"
	}
	return k;
}
function delit(div,check){
	check.checked=false;
	if(!lockds[div-1]){
		dss[div-1][0].remove();
	}
}/*
var affmenu = false;
const menu = document.getElementById('menu');
const menumodifier = document.getElementById('menumodifier');
const listmenu =[menumodifier]
function deroule(){
	for(var i=0;i<listmenu.length;i++){
		listmenu[i].style.visibility='hidden';
	}
	if(!affmenu){
		menu.style.visibility="visible";
		menu.classList.add('slide-in-left');
		affmenu=true;
	}
	else{
		menu.style.visibility="hidden";
		menu.classList.remove('slide-in-left');
		affmenu=false;
	}
}
function modifier(){
	const menumodifier = document.getElementById('menumodifier');
	deroule()
	menumodifier.style.visibility='visible';
}*/
function exams(k){
	const checkexams = document.getElementById('isExam');
	if (checkexams.checked){
		k=[01,00,00];
	}
	return k;
}
var fullscreenButton = document.getElementById("fullscreen");

fullscreenButton.addEventListener("click", function() {
  const divfullscreen = document.getElementById('fullscreen');
  if (document.fullscreenElement) {
    divfullscreen.style.backgroundImage=" url('fullscreenon.png')";
    divfullscreen.style.backgroundSize=" 30px 30px";
    document.exitFullscreen();
    } else {
    divfullscreen.style.backgroundImage=" url('fullscreenof.png')";
    divfullscreen.style.backgroundSize=" 30px 30px";
    document.documentElement.requestFullscreen();
    }
});

currentTime();
//createTile();
