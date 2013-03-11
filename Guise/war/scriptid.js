
$(document).ready(function(){

	$('#Hääleta').click(function(){
		   peida("Hääleta");
	});
	$('#Tulemused').click(function(){
		   peida("Tulemused");
	});
	$('#Pealeht').click(function(){
		   peida("Pealeht");
	});
	$('#OtsiKandidaati').click(function(){
		   peida("OtsiKandidaati");
	});
	$('#MinuKonto').click(function(){
		   peida("MinuKonto");
	});
});
		
function peida(avatud){
	$("#sisuHääleta").hide();
	$("#sisuMinuKonto").hide();
	$("#sisuTulemused").hide();
	$("#sisuOtsiKandidaati").hide();
	$("#sisuPealeht").hide();
	
	if(avatud=="Pealeht"){
		$("#sisuPealeht").show();
	}
	else if(avatud=="Tulemused"){
		$("#sisuTulemused").show();
	}
	else if(avatud=="OtsiKandidaati"){
		$("#sisuOtsiKandidaati").show();
	}
	else if(avatud=="Hääleta"){
		$("#sisuHääleta").show();
	}
	else if(avatud=="MinuKonto"){
		$("#sisuMinuKonto").show();
	}
}
		
function loadingTulemused(){
	$("#TulemusedSorteering").hide();
	$("#loading").show();
	setTimeout(function tagasi(){$("#TulemusedSorteering").show();$("#loading").hide();},1000);
}
	
function Kandideeri(form){
	if (form.Eesnimi.value=="")
		form.Eesnimi.className  = 'otsinguLahter minuKontoRed';	
		document.getElementById("Hojatus").innerHTML="Palun t&#228;itke punasega m&#228;rgitud v&#228;ljad!";
		document.getElementById("Edukas").innerHTML="wwerewr";	
	if(form.Perekonnanimi.value=="")
		form.Perekonnanimi.className  = 'otsinguLahter minuKontoRed';
		document.getElementById("Hojatus").innerHTML="Palun t&#228;itke punasega m&#228;rgitud v&#228;ljad!";	
		document.getElementById("Edukas").innerHTML="";		
	if (form.Sunniaeg.value=="")
		form.Sunniaeg.className  = 'otsinguLahter minuKontoRed';
		document.getElementById("Hojatus").innerHTML="Palun t&#228;itke punasega m&#228;rgitud v&#228;ljad!";	
		document.getElementById("Edukas").innerHTML="";		
	if (form.ErakonnaValik.value=="ValigeUks")
		form.ErakonnaValik.className  = 'minukontoBox minuKontoRed';
		document.getElementById("Hojatus").innerHTML="Palun t&#228;itke punasega m&#228;rgitud v&#228;ljad!";	
		document.getElementById("Edukas").innerHTML="";					
	if (form.PiirkonnaValik.value=="ValigeUks")
		form.PiirkonnaValik.className  = 'minukontoBox minuKontoRed';
		document.getElementById("Hojatus").innerHTML="Palun t&#228;itke punasega m&#228;rgitud v&#228;ljad!";	
		document.getElementById("Edukas").innerHTML="";		
	if (form.PiirkonnaValik.value!="ValigeUks")
		form.PiirkonnaValik.className  = 'minukontoBox minuKontoNorm';
	if (form.ErakonnaValik.value!="ValigeUks")
		form.ErakonnaValik.className  = 'minukontoBox minuKontoNorm';
	if(form.Eesnimi.value!="" && form.Sunniaeg.value!="" && form.PiirkonnaValik.value!="ValigeUks" && form.ErakonnaValik.value!="ValigeUks" && form.Perekonnanimi.value!=""){
		document.getElementById("Hojatus").innerHTML="";
		document.getElementById("Edukas").innerHTML="T&#228;name kandideerimast!";
	}
}
	
function tyhjendaTabel(){
	var veel = true;
	while(veel){
		try{
			document.getElementById("OtsinguTabel").deleteRow(1);
		}
		catch(err){
			veel=false;
		}
	}
}

function OtsiKandidaati(){
	tyhjendaTabel();
	loadingOtsing();
	getPeople();
}

function loadingOtsing(){
		$("#OtsinguTabel").hide();
		$("#loadingOtsing").show();
		setTimeout(function tagasi(){$("#OtsinguTabel").show();$("#loadingOtsing").hide();},1000);
}
	
function getPeople() {
	$.getJSON('candidates.json', function(data) {
		var items = data;
		lisa(items);
	});
}

function lisa(items){
	var mitu = 0;
	for(var i = 0;i<6;i++){
		if((document.getElementById("ID").value==items.candidates[i].id || document.getElementById("ID").value=="") && (document.getElementById("NIMI").value==items.candidates[i].name || document.getElementById("NIMI").value=="") &&
		(document.getElementById("PIIRKOND").value==items.candidates[i].piirkond || document.getElementById("PIIRKOND").value=="") && (document.getElementById("PARTEI").value==items.candidates[i].partei || document.getElementById("PARTEI").value=="")){
		
		var row = document.getElementById("OtsinguTabel").insertRow(document.getElementById("OtsinguTabel").getElementsByTagName("tr").length);
		var cell1=row.insertCell(0);
		var cell2=row.insertCell(1);
		var cell3=row.insertCell(2);
		var cell4=row.insertCell(3);
		var cell5=row.insertCell(4);
		cell1.innerHTML=items.candidates[i].name+"";
		cell2.innerHTML=items.candidates[i].partei+"";
		cell3.innerHTML=items.candidates[i].piirkond+"";
		cell4.innerHTML=items.candidates[i].id+"";
		cell5.innerHTML="<button class='suurNupp' onMouseOver='this.className= 'kandideeriOver'' onMouseOut='this.className = 'kandideeriOut'' onFocus='this.className = 'kandideeriFocus'' onBlur='this.className = 'kandideeriOut''>H&#228;&#228;leta</button>";
		mitu++;
		}
	}
	if(mitu==0){
		var row = document.getElementById("OtsinguTabel").insertRow(document.getElementById("OtsinguTabel").getElementsByTagName("tr").length);
		var cell1=row.insertCell(0);
		var cell2=row.insertCell(1);
		var cell3=row.insertCell(2);
		var cell4=row.insertCell(3);
		var cell5=row.insertCell(4);
		cell1.innerHTML="0 tulemust";
		cell2.innerHTML="";
		cell3.innerHTML="";
		cell4.innerHTML="";
		cell5.innerHTML="";			
	}
	var listitems = document.getElementById("sisuOtsiKandidaati").getElementsByTagName("td");
	for (var i = 0; i < listitems.length; i++){
		listitems[i].className = "minukontoTd alus";
	}
}

function prindi(){
	aken = window.open("http://guisevalimised.appspot.com");
	aken.document.write("<html><head><meta http-equiv='content-type' content='text/html; charset=UTF-8'><link type='text/css' rel='stylesheet' href='stiil.css'><title>Guise Election</title></head><body>"+document.getElementById('sisuTulemused').innerHTML+"</body></html>");
}

$(document).ready(function(){
	
	$('#Piirkond').click(function(){
		loadingTulemused();
	});
	
});