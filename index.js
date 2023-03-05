var clockHolder = document.getElementById("clockHolder");
var tileHolder = document.getElementById("tileHolder");
var textHolder = document.getElementById('exampleFormControlTextarea1');
var clockHolder2= document.getElementById('clockHolder2');

var matiereObj = document.getElementById("form-matiere");
var groupeObj = document.getElementById("form-groupe");
var professeurObj = document.getElementById("form-professeur");
var dureeObj = document.getElementById("form-duree");
var dureeAnticipeObj = document.getElementById("form-duree-anticipe")
var dureeTiersObj = document.getElementById("form-duree-tiers")
var debutObj = document.getElementById('form-debut');

var dss = [[clockHolder2,null,null,null,null,null,null,null,null,[0]],[textHolder,null,null,null,null,null,null,null,null,[0]]];
var selecteds = [false,false];
var lockds = [false,false];
var deleteds = [false,false];

var dsIsRunning = false;
var dsStatusButton = document.getElementById("statusButton")

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
  if (k < 10) {
    return "0" + k;
  }
  else {
    return k;
  }
}

function createTile() {
	var L=[0,1,2,3];
	var dureeTiersObj = addTemps(dureeObj.value.split(':'),getTiers(dureeObj.value.split(':')));
	var dureeAnticipeObj =addTemps(getTiers(dureeObj.value.split(':')),getTiers(dureeObj.value.split(':')));
    var tile = document.createElement("div");
    tile.className = "card text-black bg-white mb-3 mx-2 col-sm col-xs-12";

    var header = document.createElement("div");
    header.className = "card-header d-flex align-items-center";
    

    header.innerHTML = '<p class="my-1 uptiletext">DSHERE</p><div class="form-check ml-imp-1"><input class="form-check-input" type="checkbox" value="' + (selecteds.length + 1) + '" id="flexCheckDefault" checked onclick="changeselect(this.value);" /></div>';
    header.innerHTML = header.innerHTML.replace("DSHERE", matiereObj.value);
	var header2 = document.createElement("div");
	header2.innerHTML = '<p class="my-1 uptiletext"></p><div class="form-check ml-imp-1"><input class="form-check-input" type="checkbox" value="' + (selecteds.length + 1) + '" id="flexCheckDefault" unchecked onclick="changelock(this.value);" /></div>';
	header2.style.backgroundColor="none";
	header.appendChild(header2);
    var bodyTile = document.createElement("div");
    bodyTile.className = "card-body";

    var title = document.createElement("h5");
    title.className = "card-title secondtiletext";
    title.innerHTML = professeurObj.value;
	var divstart = document.createElement('div');
	var bouton1 = document.createElement('button');
	bouton1.addEventListener('click',function(){var k=parseInt(this.id);if (!lockds[k]){dss[k][9].splice(0,1);this.parentNode.remove();verifdiv(k);}});
	bouton1.style.display='inline-block';
	bouton1.style.height="20px";
	bouton1.id=dss.length;
    var startTime = document.createElement("p");
    startTime.className = "card-text my-1 texttiletext";
    startTime.innerHTML = "<i>Heure de début: </i>" + "<b><u>En attente</u></b>";
    startTime.id = "starttime-" + (selecteds.length + 1);
	startTime.style.display='inline-block';
	divstart.appendChild(bouton1);
	divstart.appendChild(startTime);
	var divend = document.createElement('div');
	var bouton2 = document.createElement('button');
	bouton2.addEventListener('click',function(){var k=parseInt(this.id);if (!lockds[k]){dss[k][9].splice(0,1);this.parentNode.remove();verifdiv(k);}});
	bouton2.style.display='inline-block';
	bouton2.style.height="20px";
	bouton2.id=dss.length;
    var endTime = document.createElement("p");
    endTime.className = "card-text my-1 texttiletext";
    endTime.innerHTML = "<i>Heure de fin: </i>" + "<b><u>En attente (" + dureeObj.value.replace(":", "h") + ")</u></b>";
    endTime.id = "endtime-" + (selecteds.length + 1);
	endTime.style.display='inline-block';
	divend.appendChild(bouton2);
	divend.appendChild(endTime);
	var divpreview = document.createElement('div');
	var bouton3 = document.createElement('button');
	bouton3.addEventListener('click',function(){var k=parseInt(this.id);if (!lockds[k]){dss[k][9].splice(0,1);this.parentNode.remove();verifdiv(k);}});
	bouton3.style.display='inline-block';
	bouton3.style.height="20px";
	bouton3.id=dss.length;
    var previewEndTime = document.createElement("p");
    previewEndTime.className = "card-text my-1 texttiletext";
    previewEndTime.innerHTML = "<i>Sortie anticipée: </i>" + "<b><u>En attente (" + dureeAnticipeObj[0].toString()+"h"+dureeAnticipeObj[1].toString()+":"+dureeAnticipeObj[2].toString() + ")</u></b>";
    previewEndTime.id = "previewendtime-" + (selecteds.length + 1);
	previewEndTime.style.display='inline-block';
	divpreview.appendChild(bouton3);
	divpreview.appendChild(previewEndTime);
	var divtiers = document.createElement('div');
	var bouton4 = document.createElement('button');
	bouton4.addEventListener('click',function(){var k=parseInt(this.id);if (!lockds[k]){dss[k][9].splice(0,1);this.parentNode.remove();verifdiv(k);}});
	bouton4.style.display='inline-block';
	bouton4.style.height="20px";
	bouton4.id=dss.length;
    var tiersEndTime = document.createElement("p");
    tiersEndTime.className = "card-text my-1 texttiletext";
    tiersEndTime.innerHTML = "<i>Tiers-temps: </i>" + "<b><u>En attente (" + dureeTiersObj[0].toString()+"h"+dureeTiersObj[1].toString()+":"+dureeTiersObj[2].toString() + ")</u></b>";
    tiersEndTime.id = "tiersendtime-" + (selecteds.length + 1);
	tiersEndTime.style.display='inline-block';
	divtiers.appendChild(bouton4);
	divtiers.appendChild(tiersEndTime);

    tile.appendChild(header);

    bodyTile.appendChild(title);
    bodyTile.appendChild(divstart);
    bodyTile.appendChild(divend);
    if (dureeAnticipeObj.value != "") {
      bodyTile.appendChild(divpreview);
    }
    if (dureeTiersObj.value != "") {
      bodyTile.appendChild(divtiers);
    } 

    tile.appendChild(bodyTile);

    tileHolder.appendChild(tile);
    dss.push([tile, dureeObj.value.split(":"), dureeAnticipeObj, dureeTiersObj, startTime, endTime, previewEndTime, tiersEndTime,debutObj.value.split(":"),L])
	selecteds.push(true);
	lockds.push(false);
	deleteds.push(false);

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
		if(!lockds[i]){
      var a = dss[i][4];

      var date = new Date(); /* creating object of Date class */
      var origindate = new Date();
	  if(dss[i][8]!=""){
		  origindate.setHours(dss[i][8][0]);
		  origindate.setMinutes(dss[i][8][1]);
		origindate.setSeconds(dss[i][8][2]);
	  }
      var hour = origindate.getHours();
      var min = origindate.getMinutes();
      var sec = origindate.getSeconds();
      hour = updateTime(hour);
      min = updateTime(min);
      sec = updateTime(sec);
      a.innerHTML = "<i>Heure de début: </i><b><u>" + hour + ":" + min + ":" + sec + "</u></b>";

      date.setTime(origindate.getTime() + (parseInt(dss[i][1][0]) * 60 + parseInt(dss[i][1][1])) * 60 * 1000);
      hour = date.getHours();
      min = date.getMinutes();
      sec = date.getSeconds();
      hour = updateTime(hour);
      min = updateTime(min);
      sec = updateTime(sec);
      dss[i][5].innerHTML = "<i>Heure de fin: </i><b><u>" + hour + ":" + min + ":" + sec + "</u></b>";

      date.setTime(origindate.getTime() + (parseInt(dss[i][2][0]) * 60 + parseInt(dss[i][2][1])) * 60 * 1000);
      hour = date.getHours();
      min = date.getMinutes();
      sec = date.getSeconds();
      hour = updateTime(hour);
      min = updateTime(min);
      sec = updateTime(sec);
      dss[i][6].innerHTML = "<i>Sortie anticipée: </i><b><u>" + hour + ":" + min + ":" + sec + "</u></b>";

      date.setTime(origindate.getTime() + (parseInt(dss[i][3][0]) * 60 + parseInt(dss[i][3][1])) * 60 * 1000);
      hour = date.getHours();
      min = date.getMinutes();
      sec = date.getSeconds();
      hour = updateTime(hour);
      min = updateTime(min);
      sec = updateTime(sec);
      dss[i][7].innerHTML = "<i>Tiers-temps: </i><b><u>" + hour + ":" + min + ":" + sec + "</u></b>";
	 
	 
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
function changelock(k) {
  lockds[k - 1] = !lockds[k - 1];
}
function getTiers(k,n=3){
	var hourf=(Math.floor(k[0]/n));
	var minf=(Math.floor(k[1]/n)+(k[0]%n)*(60/n));
	var secf=(Math.floor(k[2]/n)+(k[1]/n)*(60/n));
	var L=[hourf,minf,secf];
	return L;
	}
function addTemps(k,j){
	var hourf=parseInt(k[0])+parseInt(j[0]);
	var minsf=parseInt(k[1])+parseInt(j[1]);
	var secsf=parseInt(k[2])+parseInt(j[2]);
	var L=[hourf,minsf,secsf];
	return L;
}
function removeds(){
	for (var i = 0; i < selecteds.length; i++) {
    if (selecteds[i]) {
		if(!lockds[i]){
			deleteds[i]=true;
			dss[i][0]==null;
		}
	}
	}
}
var y1=null;
var y2=null;
var divselectmove = document.getElementById("SelectMove");
divselectmove.addEventListener("mousedown",function(event){
	y1=event.clientY;
});
divselectmove.addEventListener("mouseup",function(event){
	const y2 = event.clientY;
	let div1 = null;
	let div2 = null;
	let n1 = null;
	let n2 = null;
	for (let i = 0; i < dss.length; i++) {
		if (!deleteds[i]) {
			const box = dss[i][0];
			const rect = box.getBoundingClientRect();
			const topdiv = rect.top;
			const bottom = rect.top + rect.height;
			if (y1 >= topdiv && y1 <= bottom) {
				div1 = dss[i][0];
				n1 = i;
			}
			if (y2 >= topdiv && y2 <= bottom) {
				div2 = dss[i][0];
				n2 = i ;
			}
		}
	}
	if (div1 == null || div2 == null) {
		return;
	} else {
		if (n2 == dss.length-1) {
			tileHolder.insertBefore(div1, null);
			dss.splice(dss.length, 0, dss[n1]);
			if(n2>n1){
			dss.splice(n1, 1);}else{dss.splice(n1+1,1);}
	    } 
		else {
			tileHolder.insertBefore(div1, dss[n2][0]);
			dss.splice(n2, 0, dss[n1]);
			if(n2>n1){
			dss.splice(n1, 1);}else{dss.splice(n1+1,1);}
		}
	}
});
function verifdiv(k){
	if(dss[k][9].length==0){
		dss[k][0].remove();
		deleteds[k]=true;
	}
}
var ftsize=80
function clockplus(){
	clockHolder.style.fontSize=ftsize+2+"px";
	ftsize+=2;
}
function clockmoins(){
	clockHolder.style.fontSize=ftsize-2+"px";
	ftsize-=2
}
var k=1;
var j=1;
function ShowSetting(mybutton){
	const L1=["visible","hidden"];
	const L2 = ["360px","30px"];
	const clockplus = document.getElementById('clockplus');
	const clockmoins = document.getElementById('clockmoins');
	const L3 = [clockplus,clockmoins,boutonplus,statusButton,statusButton2,SelectMove,setting,statusButton4];
	for(let i=0;i<=7;i++){
		if(i==6 && k==0){
		}
		else{
			L3[i].style.visibility=L1[k];
		}
	}
	mybutton.style.position="relative";
	mybutton.style.left=L2[k];
	k=(k+1)%2
}
function Set(){
	const L1=["visible","hidden"];
	const setting= document.getElementById('setting');
	setting.style.visibility=L1[j];
	j=(j+1)%2;
}
currentTime();
//createTile();