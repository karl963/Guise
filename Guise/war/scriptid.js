logitud = false;
kandideerinud = false;
hääletanud=false;
eesnimi = "";
partei = "";
perenimi = "";
piirkond = "";
id = "";

$(".tabs .tab a").live("click", function(e) {
	 
   updateTabs($($(this).attr("href")));
 
});
 
 
 
//Grab hash off URL (default to first tab) and update
 
$(window).bind("hashchange", function(e) {
 
   var anchor = $(location.hash);
 
   if (anchor.length === 0) {
 
      anchor = $(".tabs div:eq(0)");
 
   }
 
   updateTabs(anchor);
 
});
 
 
 
//Pass in the tab and show appropriate contents
 
function updateTabs(tab) {
 
   $(".tabs .tab a")
 
      .removeClass("active")
 
      .filter(function(index) {
 
         return $(this).attr("href") === '#' + tab.attr("id");
 
      }).addClass("active");
 
   $(".tabs .content").hide();
 
   tab.show();
 
}
 
 
 
//Fire the hashchange event when the page first loads
 
$(window).trigger('hashchange');


function goBack(){
	window.history.back()
}

$(document).ready(function(){

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
	$('#isikuVaade').click(function(){
		   peida("isikVaade");
	});
});

function peida(avatud){
	$("#Edukas").html("");
	$("#Hojatus").html("");
	
	$("#sisuMinuKonto").hide();
	$("#sisuTulemused").hide();
	$("#sisuOtsiKandidaati").hide();
	$("#sisuPealeht").hide();
	$("#sisuIsikVaade").hide();
	
	if(avatud=="Pealeht"){
		$("#sisuPealeht").show();
	}
	else if(avatud=="Tulemused"){
		$("#sisuTulemused").show();
	}
	else if(avatud=="OtsiKandidaati"){
		$("#sisuOtsiKandidaati").show();
	}
	else if(avatud=="MinuKonto"){
		$("#sisuMinuKonto").show();
	}
	else if(avatud=="isikVaade"){
		
		$("#sisuIsikVaade").show();
	}
}
		
function loadingTulemused(){
	$("#TulemusedSorteering").hide();
	$("#loading").show();
	setTimeout(function tagasi(){$("#TulemusedSorteering").show();$("#loading").hide();},1000);
}

function Kandideeri(form){

	if (form.nimi.value==""){
		form.nimi.className  = 'otsinguLahter minuKontoRed';	
		document.getElementById("Hojatus").innerHTML="Palun t&#228;itke punasega m&#228;rgitud v&#228;ljad!";
		document.getElementById("Edukas").innerHTML="";
	}
	if(form.perenimi.value==""){
		form.perenimi.className  = 'otsinguLahter minuKontoRed';
		document.getElementById("Hojatus").innerHTML="Palun t&#228;itke punasega m&#228;rgitud v&#228;ljad!";	
		document.getElementById("Edukas").innerHTML="";		
	}
	if (form.sünniaeg.value==""){
		form.sünniaeg.className  = 'otsinguLahter minuKontoRed';
		document.getElementById("Hojatus").innerHTML="Palun t&#228;itke punasega m&#228;rgitud v&#228;ljad!";	
		document.getElementById("Edukas").innerHTML="";
	}
	if (form.partei.value=="--Valige--"){
		form.partei.className  = 'minukontoBox minuKontoRed';
		document.getElementById("Hojatus").innerHTML="Palun t&#228;itke punasega m&#228;rgitud v&#228;ljad!";	
		document.getElementById("Edukas").innerHTML="";					
	}
	if (form.piirkond.value=="--Valige--"){
		form.piirkond.className  = 'minukontoBox minuKontoRed';
		document.getElementById("Hojatus").innerHTML="Palun t&#228;itke punasega m&#228;rgitud v&#228;ljad!";	
		document.getElementById("Edukas").innerHTML="";	
	}
	if (form.piirkond.value!="--Valige--"){
		form.piirkond.className  = 'minukontoBox minuKontoNorm';
	}
	if (form.partei.value!="--Valige--"){
		form.partei.className  = 'minukontoBox minuKontoNorm';
	}
	if(form.nimi.value!="" && form.sünniaeg.value!="" && form.piirkond.value!="--Valige--" && form.partei.value!="--Valige--" && form.perenimi.value!=""){
		if(!window.kandideerinud){ 
		}
		else{
			document.getElementById("Edukas").innerHTML="Te olete juba kandideerinud!";	
		}
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
}

function loadingOtsing(){
		$("#OtsinguTabel").hide();
		$("#loadingOtsing").show();
		setTimeout(function tagasi(){$("#OtsinguTabel").show();$("#loadingOtsing").hide();},1000);
}

function lisaVaade(mitmes){

	var tabel = document.getElementById("OtsinguTabel");
	
	var nimed = new Array();
	nimed = tabel.rows[mitmes].cells[0].innerText.split(" ");

	document.getElementById("LISAEESNIMI").innerHTML=nimed[0];
	document.getElementById("LISAPERENIMI").innerHTML=nimed[1];
	document.getElementById("LISAPARTEI").innerHTML=tabel.rows[mitmes].cells[1].innerText;
	document.getElementById("LISAPIIRKOND").innerHTML=tabel.rows[mitmes].cells[2].innerText;
	document.getElementById("LISAID").innerHTML=tabel.rows[mitmes].cells[3].innerText;
}

function lisa(items){
	var mitu = 0;

	for(var i = 0;i<items.length;i++){

		var row = document.getElementById("OtsinguTabel").insertRow(document.getElementById("OtsinguTabel").getElementsByTagName("tr").length);
		var cell1=row.insertCell(0);
		var cell2=row.insertCell(1);
		var cell3=row.insertCell(2);
		var cell4=row.insertCell(3);
		var cell5=row.insertCell(4);
		cell1.innerHTML="<a href='#sisuIsikVaade' id='isikuVaade' class='isikuLink' onClick='lisaVaade("+(i+1)+");' >"+items[i].nimi+"</a>";
		cell2.innerHTML=items[i].partei+"";
		cell3.innerHTML=items[i].piirkond+"";
		cell4.innerHTML=items[i].id+"";
		//var x ="<button onClick='Annahääl("+(i+1)+")' class='suurNupp' onMouseOver='this.className= 'kandideeriOver'' onMouseOut='this.className = 'kandideeriOut'' onFocus='this.className = 'kandideeriFocus'' onBlur='this.className = 'kandideeriOut''>"H&#228;&#228;leta"</button>";
		cell5.innerHTML="<button onClick='Annahääl("+(i+1)+")' class='suurNupp' onMouseOver='this.className= 'kandideeriOver'' onMouseOut='this.className = 'kandideeriOut'' onFocus='this.className = 'kandideeriFocus'' onBlur='this.className = 'kandideeriOut''>H&#228;&#228;leta</button>";
		mitu++;

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
	
	$("#loadingOtsing").hide();
    $("#OtsinguTabel").show();

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

$(document).ready(function(){
	$('#otsikandidaati').submit(function(e) {

		e.preventDefault(); 
		
		var nimi = $("#NIMI").val();
		var id = $("#ID").val();
		var piirkond = $("#PIIRKOND").val();
		var partei = $("#PARTEI").val();
		
		var parameetrid = new Array();
		
		if(nimi == ""){
			nimi = "N N"
		}
		if(id == ""){
			id = "N"
		}
		if(piirkond == ""){
			piirkond = "N"
		}
		if(partei == ""){
			partei = "N"
		}
		
		parameetrid[0] = nimi;
		parameetrid[1] = id;
		parameetrid[2] = piirkond;
		parameetrid[3] = partei;
		
	    var $param = nimi + "," + id + "," + piirkond + "," + partei;
	    
	    tyhjendaTabel();
	    
	    $("#OtsinguTabel").hide();
		$("#loadingOtsing").show();

	    $.get("CandidateServlet", {values:$param}, function(items) {
	    	
			lisa(items);
			
		});
		
	});
});

$(document).ready(function(){
	$('#logimine').submit(function(e) {
		
		e.preventDefault(); 
		
		if(window.logitud==true){ // kui tahab välja logida
			
			$('#valedandmed').hide();
			$('#Nupp').show();
			$('#NuppV').hide();
			$('#Kasutaja').html("<input id='KASUTAJA' value='Kasutajanimi' type='text' name='username' class='logimisLahter' onFocus='this.className = 'logimisLahter onFocus'' onBlur='this.className = 'logimisLahter onBlur''>");
			$('#Parool').html("<input id='PAROOL' value='Parool' type='password' name='password' class='logimisLahter' onFocus='this.className = 'logimisLahter onFocus'' onBlur='this.className = 'logimisLahter onBlur''>");
			
			window.logitud = false;
			
			$('#KEESNIMI').val("");
			$('#KPERENIMI').val("");
			$('#KSÜNNIAEG').val("");
			$('#KPARTEI').val("");
			$('#KPIIRKOND').val("");
			$('#HPARTEI').val("-");
			$('#HNIMI').val("-");
			$('#HPIIRKOND').val("-");
			window.eesnimi = "";
			window.partei = "";
			window.perenimi = "";
			window.piirkond = "";
			window.id="";
			
			window.kandideerinud=false;
			window.hääletanud=false;
			
			$('#Logimata').show();
			$('#Logitud').hide();
			
		}
		else{
			
			var kasutaja = $("#KASUTAJA").val();
			var parool = $("#PAROOL").val();
		
			if(kasutaja!="" && parool!=""){
				
				var parameetrid = new Array();
				parameetrid[0] = kasutaja;
				parameetrid[1] = parool;
				var $param = kasutaja + "," + parool;

			    $.get("ValidateServlet", {values:$param}, function(vastus) {
			    	
					if(vastus[0].logitud=="true"){ // edukas login
						
						window.logitud = true;

						$('#valedandmed').hide();
						$('#Nupp').hide();
						$('#NuppV').show();
						$('#Kasutaja').html("");
						$('#Parool').html(vastus[1].eesnimi+" "+vastus[1].perenimi);
						
						$('#KEESNIMI').val(vastus[1].eesnimi);
						$('#KPERENIMI').val(vastus[1].perenimi);
						$('#KSÜNNIAEG').val(vastus[1].sünniaeg);
						$('#KPARTEI').val(vastus[1].partei);
						$('#KPIIRKOND').val(vastus[1].piirkond);
						
						window.eesnimi = vastus[1].eesnimi;
						window.partei = vastus[1].partei;
						window.perenimi = vastus[1].perenimi;
						window.piirkond = vastus[1].piirkond;
						window.id = vastus[1].id;
						
						if(vastus[0].kandideerinud=="true"){
							window.kandideerinud=true;
						}
						if(vastus[0].hääletanud=="true"){
							$('#HPARTEI').val(vastus[1].kandidaatpartei);
							$('#HNIMI').val(vastus[1].kandidaatnimi);
							$('#HPIIRKOND').val(vastus[1].kandidaatpiirkond);
							window.hääletanud=true;
						}
						
						$('#Logimata').hide();
						$('#Logitud').show();

					}
					else{
						
						$('#valedandmed').show();
						
					}
					
				});
			    
			}
			else{
				$('#valedandmed').show();
			}
		}
		
	});
});

$(document).ready(function(){
	$('#tyhistamine').submit(function(e) {
		
		e.preventDefault(); 
		
		if(window.hääletanud){
			
			var $param = "tühista,"+$("#HNIMI").val()+","+$("#HPARTEI").val()+","+$("#HPIIRKOND").val()+
			","+window.eesnimi+" "+window.perenimi+","+window.partei+","+window.piirkond;
					
			$.get("HääletusServlet", {values:$param}, function(vastus) {
				
				if(vastus=="true"){
					
					$('#HPARTEI').val("-");
					$('#HNIMI').val("-");
					$('#HPIIRKOND').val("-");
					
					$("#Edukas").html("Hääle tühistamine edukalt lõpule viidud!");
					window.hääletanud = false;
				}
				else{
					$("#Hojatus").html("Hääle tühistamine ebaõnnestus!");
				}
			
			});

		}
	});
});

function Annahääl(mitmes){
	
	if(window.logitud){
		
		if(window.hääletanud){
			alert("Te olete juba hääletanud!");
		}
		else{
			var tabel = document.getElementById("OtsinguTabel");
		
			var id = tabel.rows[mitmes].cells[3].innerText;
			
			$.ajax({
			    type: "POST",
			    url: "/HääletusServlet",
			    data: "&id="+id+"&andjaid="+window.id,
			    success: function(vastus){
			    	var $list=vastus.split(",");
			        if($list[0]=="true"){
			        	
						$('#HPARTEI').val($list[2]);
						$('#HNIMI').val($list[1]);
						$('#HPIIRKOND').val($list[3]);
						
			    		alert("Hääl edukalt antud!");
			    		window.hääletanud=true;
			        }
			        else{
			        	alert("Hääle andmine ebaõnnestus!");
			        }
			    }
			});
		}
	}
	else{
		alert("Hääletamiseks logige sisse!");
	}
}