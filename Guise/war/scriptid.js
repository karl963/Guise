logitud = false;
kandideerinud = false;
haaletanud=false;
facebookiga = false;
eesnimi = "";
partei = "";
perenimi = "";
piirkond = "";
id = "";
TSort_Data = null;
TSort_Initial =  new Array ('0A');
kandidaadid = [];

tegutse = function(m){
	
	var vastus=JSON.parse(m);
	
	if(vastus[0].korras=="fail"){
		document.getElementById('valedandmed').style.display=="block";
	}
	else if(vastus[0].korras=="korras"){
		
		$(document).ready(function(){
			
			$("#loginLoading").show();
			$("#Nupp").hide();
			
			window.logitud = true;
			window.facebookiga = true;
			localStorage.setItem("logitud",true);
			localStorage.setItem("facebookiga",true);
			
			$('#valedandmed').hide();
			$('#Nupp').hide();
			$('#NuppV').show();
			$('#Kasutaja').html("Tere tulemast:");
			$('#Parool').html(vastus[0].eesnimi+" "+vastus[0].perenimi);
			
			$('#KEESNIMI').val(vastus[0].eesnimi);
			$('#KPERENIMI').val(vastus[0].perenimi);
			$('#KSYNNIAEG').val(vastus[0].synniaeg);
			$('#KPARTEI').val(vastus[0].partei);
			$('#KPIIRKOND').val(vastus[0].piirkond);
			
			window.eesnimi = vastus[0].eesnimi;
			window.partei = vastus[0].partei;
			window.perenimi = vastus[0].perenimi;
			window.piirkond = vastus[0].piirkond;
			window.id = vastus[0].id;
			
			localStorage.setItem("eesnimi",vastus[0].eesnimi);
			localStorage.setItem("partei",vastus[0].partei);
			localStorage.setItem("perenimi",vastus[0].perenimi);
			localStorage.setItem("piirkond",vastus[0].piirkond);
			localStorage.setItem("id",vastus[0].id);
			
			if(vastus[0].kandideerinud=="true"){
				window.kandideerinud=true;
				localStorage.setItem("kandideerinud",true);
			}
			if(vastus[0].haaletanud=="true"){
				$('#HPARTEI').val(vastus[0].kandidaatpartei);
				$('#HNIMI').val(vastus[0].kandidaatnimi);
				$('#HPIIRKOND').val(vastus[0].kandidaatpiirkond);
				window.haaletanud=true;
				localStorage.setItem("haaletanud",true);
			}
			
			$('#Logimata').hide();
			$('#Logitud').show();
			$("#loginLoading").hide();
		});
	}
	else{

		document.getElementById("loadingTulemus").style.display="block";
		annaTulemused("partei");
		annaTulemused("piirkond");
		annaTulemused("kandidaadid");
		annaTulemused("riik");
/*
		$.ajax({
			
			$("#OtsinguTabel").hide();
			$("#loadingOtsing").show();
			
		 	var $param = "x x,x,x,x";
		    $.get("CandidateServlet", {values:$param}, function(items) {
		    	
		    	window.kandidaadid = items;
		    	localStorage.setItem("kandidaadid",JSON.stringify(items));
			    $("#OtsinguTabel").show();
				$("#loadingOtsing").hide();
				
			});
		});
*/
	}
};

window.fbAsyncInit = function() {
    FB.init({
      appId      : '104787739720061', // App ID
      channelUrl : 'http://guisevalimismasin.appspot.com/channel.html', // Channel File
      status     : true, // check login status
      cookie     : true, // enable cookies to allow the server to access the session
      xfbml      : true  // parse XFBML
    });

    // Additional initialization code here
    FB.getLoginStatus(function (response) {
    if (response.status === 'connected') {
    } else if (response.status === 'not_authorized') {
        //you must ask permissions to the user
    } else {
    }
});
};

//Load the SDK Asynchronously
(function(d){
    var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement('script'); js.id = id; js.async = true;
    js.src = "//connect.facebook.net/pt_PT/all.js";
    ref.parentNode.insertBefore(js, ref);
}(document));


function logoutFB() {
    FB.logout(function(response) {
        console.log('User is now logged out');
    });
}

$(document).ready(function(){
	
	if(supports_html5_storage()){
		localStorage.setItem("kandidaadid", JSON.stringify(kandidaadid));
		localStorage.setItem("logitud", logitud);
		localStorage.setItem("facebookiga",false);
		localStorage.setItem("kandideerinud", kandideerinud);
		localStorage.setItem("haaletanud", haaletanud);
		localStorage.setItem("eesnimi", eesnimi);
		localStorage.setItem("perenimi", perenimi);
		localStorage.setItem("piirkond", piirkond);
		localStorage.setItem("id", id);
		localStorage.setItem("TSort_Data", TSort_Data);
		localStorage.setItem("TSort_Initial", TSort_Initial);
		
	}
	    
});

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
	window.history.back();
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
	
	$("#OtsingTeadeEdukas").html("");
	$("#OtsingTeadeHoiatus").html("");
	
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

$(document).ready(function(){

	$("#loadingTulemus").show();
	annaTulemused("partei");
	annaTulemused("piirkond");
	annaTulemused("kandidaadid");
	annaTulemused("riik");
	$("#TulemusRiik").attr("class","suurNupp");
	$("#TulemusPiirkond").attr("class","suurNupp");
	$("#TulemusKandidaadid").attr("class","suurNupp");
	$("#TulemusPartei").attr("class","suurNupp");
	
	$('#TulemusRiik').click(function(){
		muudaNupud();
		$("#TulemusRiik").attr("class","valitudTulemus");
		$("#TulemusRiik").attr("onMouseOut","this.className = 'valitudOut'");
		$("#TulemusRiik").attr("onFocus","this.className = 'valitudFocus'");
		$("#TulemusRiik").attr("onMouseOver","this.className = 'valitudOver'");
		$("#TulemusRiik").attr("onBlur","this.className = 'valitudOut'");
			$("#TulemusRiik").attr("class","valitudTulemus");
			peidaTulemus("riik");
	});
	$('#TulemusKandidaadid').click(function(){
		muudaNupud();
		$("#TulemusKandidaadid").attr("class","valitudTulemus");
		$("#TulemusKandidaadid").attr("onMouseOut","this.className = 'valitudOut'");
		$("#TulemusKandidaadid").attr("onFocus","this.className = 'valitudFocus'");
		$("#TulemusKandidaadid").attr("onMouseOver","this.className = 'valitudOver'");
		$("#TulemusKandidaadid").attr("onBlur","this.className = 'valitudOut'");
		   peidaTulemus("kandidaadid");
	});
	$('#TulemusPartei').click(function(){
		muudaNupud();
		$("#TulemusPartei").attr("class","valitudTulemus");
		$("#TulemusPartei").attr("onMouseOut","this.className = 'valitudOut'");
		$("#TulemusPartei").attr("onFocus","this.className = 'valitudFocus'");
		$("#TulemusPartei").attr("onMouseOver","this.className = 'valitudOver'");
		$("#TulemusPartei").attr("onBlur","this.className = 'valitudOut'");
  	   peidaTulemus("partei");
	});
	$('#TulemusPiirkond').click(function(){
		muudaNupud();
		$("#TulemusPiirkond").attr("class","valitudTulemus");
		$("#TulemusPiirkond").attr("onMouseOut","this.className = 'valitudOut'");
		$("#TulemusPiirkond").attr("onFocus","this.className = 'valitudFocus'");
		$("#TulemusPiirkond").attr("onMouseOver","this.className = 'valitudOver'");
		$("#TulemusPiirkond").attr("onBlur","this.className = 'valitudOut'");
		   peidaTulemus("piirkond");
	});
	
});

function muudaNupud(){
	$("#TulemusKandidaadid").attr("class","suurNupp");
	$("#TulemusKandidaadid").attr("onMouseOut","this.className = 'kandideeriOut'");
	$("#TulemusKandidaadid").attr("onFocus","this.className = 'kandideeriFocus'");
	$("#TulemusKandidaadid").attr("onMouseOver","this.className = 'kandideeriOver'");
	$("#TulemusKandidaadid").attr("onBlur","this.className = 'kandideeriOut'");
	
	$("#TulemusPiirkond").attr("class","suurNupp");
	$("#TulemusPiirkond").attr("onMouseOut","this.className = 'kandideeriOut'");
	$("#TulemusPiirkond").attr("onFocus","this.className = 'kandideeriFocus'");
	$("#TulemusPiirkond").attr("onMouseOver","this.className = 'kandideeriOver'");
	$("#TulemusPiirkond").attr("onBlur","this.className = 'kandideeriOut'");
	
	$("#TulemusPartei").attr("class","suurNupp");
	$("#TulemusPartei").attr("onMouseOut","this.className = 'kandideeriOut'");
	$("#TulemusPartei").attr("onFocus","this.className = 'kandideeriFocus'");
	$("#TulemusPartei").attr("onMouseOver","this.className = 'kandideeriOver'");
	$("#TulemusPartei").attr("onBlur","this.className = 'kandideeriOut'");
	
	$("#TulemusRiik").attr("class","suurNupp");
	$("#TulemusRiik").attr("onMouseOut","this.className = 'kandideeriOut'");
	$("#TulemusRiik").attr("onFocus","this.className = 'kandideeriFocus'");
	$("#TulemusRiik").attr("onMouseOver","this.className = 'kandideeriOver'");
	$("#TulemusRiik").attr("onBlur","this.className = 'kandideeriOut'");
}

function peidaTulemus(valiti){
	
	document.getElementById("Triik").style.display="none";
	document.getElementById("Tpart").style.display="none";
	document.getElementById("Tkant").style.display="none";
	document.getElementById("Tpiir").style.display="none";
	
	if(valiti=="riik"){
		
		window.TSort_Data = new Array ('riik', 'i', 'i', 'f');
		document.getElementById("Triik").style.display="block";
		
	}
	else if(valiti=="kandidaadid"){
	
		window.TSort_Data = new Array ('kant', 's', 's', 'i', 's');
		
		document.getElementById("Tkant").style.display="block";
		
	}
	else if(valiti=="partei"){
		
		window.TSort_Data = new Array ('part', 's', 'i');
		
		document.getElementById("Tpart").style.display="block";
		
	}
	else if(valiti=="piirkond"){
		
		window.TSort_Data = new Array ('piir', 's', 'i', 'i', 'f');
		
		document.getElementById("Tpiir").style.display="block";
		
	}
	
	localStorage.setItem("TSort_Data",TSort_Data);
	tsInit();

}

function annaTulemused(sorteering){
	
	if(window.navigator.onLine){
	
		$.ajax({
		    type: "GET",
		    url: "/TulemusedServlet",
		    data: "&sorteering="+sorteering,
		    success: function(vastus){
		    	
		    	if(vastus.length>0){
			    	var html="";
			    	
			    	if(sorteering=="riik"){
			    		
			    		html="<table id='riik' class='myTable'><thead><tr>" +
			    				"<th>H&#228;&#228;letajaid</th>" +
			    				"<th>H&#228;&#228;letanuid</th>" +
			    				"<th>Protsent</th></tr></thead>"+
			    				"<tr><td>"+vastus[0].haaletajaid+"</td>"+
			    				"<td>"+vastus[0].haaletanuid+"</td>"+
			    				"<td>"+vastus[0].protsent+"</td></tr></table>";
			    		
			    		$("#Triik").html(html);
			    		$("#Triik").hide();
			    		$("#loadingTulemus").hide();
			    		localStorage.setItem("Triik",html);
			    		
			    	}
			    	else if(sorteering=="kandidaadid"){
			    		
			    		html+="<table id='kant' class='myTable'><thead><tr>" +
						"<th>Eesnimi</th>" +
						"<th>Perenimi</th>" +
						"<th>H&#228;&#228;li</th>" +
						"<th>Piirkond</th></tr></thead>";
			    		
			    		for(var i = 0;i<vastus.length;i++){
			    			html+="<tr><td>"+vastus[i].eesnimi+"</td>"+
			    			"<td>"+vastus[i].perenimi+"</td>"+
			    			"<td>"+vastus[i].haali+"</td>"+
			    			"<td>"+vastus[i].piirkond+"</td></tr>";
			    		}
			    		
			    		html+="</table>";
			    		$("#Tkant").html(html);
			    		$("#Tkant").hide();
			    		localStorage.setItem("Tkant",html);
		
			    	}
			    	else if(sorteering=="partei"){
			    		
			    		html+="<table id='part' class='myTable'><thead><tr>" +
						"<th>Partei</th>" +
						"<th>H&#228;&#228;li</th></tr></thead>";
			    		
			    		for(var i = 0;i<vastus.length;i++){
			    			html+="<tr><td>"+vastus[i].partei+"</td>"+
			    			"<td>"+vastus[i].haali+"</td></tr>";
			    		}
			    		
			    		html+="</table>";
			    		$("#Tpart").html(html);
			    		$("#Tpart").hide();
			    		localStorage.setItem("Tpart",html);
			    		
			    	}
			    	else if(sorteering=="piirkond"){
			    		
			    		html+="<table id='piir' class='myTable'><thead><tr>" +
						"<th>Piirkond</th>" +
						"<th>H&#228;&#228;letajaid</th>" +
						"<th>H&#228;&#228;letanuid</th>" +
						"<th>Protsent</th></tr></thead>";
			    		
			    		for(var i = 0;i<vastus.length;i++){
			    			html+="<tr><td>"+vastus[i].piirkond+"</td>"+
			    			"<td>"+vastus[i].haaletajaid+"</td>"+
			    			"<td>"+vastus[i].haaletanuid+"</td>"+
			    			"<td>"+vastus[i].protsent+"</td></tr>";
			    		}
			    		
			    		html+="</table>";
			    		$("#Tpiir").html(html);
			    		$("#Tpiir").hide();
			    		localStorage.setItem("Tpiir",html);
			    		
			    	}
		    	}
		    }
		});

	}
	else{
		document.getElementById("Tpiir").innerHTML=localStorage.getItem("Tpiir");
		document.getElementById("Tkant").innerHTML=localStorage.getItem("Tkant");
		document.getElementById("Tpart").innerHTML=localStorage.getItem("Tpart");
		document.getElementById("Triik").innerHTML=localStorage.getItem("Triik");
	}
	
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
	if (form.synniaeg.value==""){
		form.synniaeg.className  = 'otsinguLahter minuKontoRed';
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
	if(form.nimi.value!="" && form.synniaeg.value!="" && form.piirkond.value!="--Valige--" && form.partei.value!="--Valige--" && form.perenimi.value!=""){

		if((localStorage.getItem("kandideerinud"))=="false"){
			document.getElementById("loadingKonto").style.display = "block";
			$.ajax({
			    type: "POST",
			    url: "/CandidateServlet",
			    data: "&vanaeesnimi="+localStorage.getItem("eesnimi")+"&vanaperenimi="+localStorage.getItem("perenimi")+"&vanapartei="+localStorage.getItem("partei")+"&vanapiirkond="+localStorage.getItem("piirkond")+
			    "&eesnimi="+$('#KEESNIMI').val()+"&perenimi="+$('#KPERENIMI').val()+"&piirkond="+$('#KPIIRKOND').val()+"&partei="+$('#KPARTEI').val(),
			    success: function(vastus){
			        if(vastus=="true"){
			        	
						window.eesnimi = $('#KEESNIMI').val();
						window.partei = $('#KPARTEI').val();
						window.piirkond = $('#KPIIRKOND').val();
						window.perenimi = $('#KPERENIMI').val();
						
						localStorage.setItem("eesnimi", $('#KEESNIMI').val());
						localStorage.setItem("partei", $('#KPARTEI').val());
						localStorage.setItem("piirkond", $('#KPIIRKOND').val());
						localStorage.setItem("perenimi", $('#KPERENIMI').val());
						
			        	$("#Edukas").html("Edukalt kandideeritud!");
			        	$("#Hojatus").html("");
			        	window.kandideerinud=true;
			        	localStorage.setItem("kandideerinud",true);
			        	$("#loadingKonto").hide();
			        }
			        else{
			        	$("#Edukas").html("");
			        	$("#Hojatus").html("Kandideerimine eba&otilde;nnestus!");
			        	$("#loadingKonto").hide();
			        }
			    }
			});
			
		}
		else{
			document.getElementById("Hojatus").innerHTML="";	
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

function lisaVaade(mitmes){

	var tabel = document.getElementById("OtsinguTabel");
	
	var nimed = new Array();
	nimed = tabel.getElementsByTagName("tr")[mitmes].getElementsByTagName("td")[0].textContent.split(" ");

	document.getElementById("LISAEESNIMI").innerHTML=nimed[0];
	document.getElementById("LISAPERENIMI").innerHTML=nimed[1];
	document.getElementById("LISAPARTEI").innerHTML=tabel.getElementsByTagName("tr")[mitmes].getElementsByTagName("td")[1].innerHTML;
	document.getElementById("LISAPIIRKOND").innerHTML=tabel.getElementsByTagName("tr")[mitmes].getElementsByTagName("td")[2].innerHTML;
	document.getElementById("LISAID").innerHTML=tabel.getElementsByTagName("tr")[mitmes].getElementsByTagName("td")[3].innerHTML;

}

function lisa(items){
	tyhjendaTabel();
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
		//var x ="<button onClick='Annahaal("+(i+1)+")' class='suurNupp' onMouseOver='this.className= 'kandideeriOver'' onMouseOut='this.className = 'kandideeriOut'' onFocus='this.className = 'kandideeriFocus'' onBlur='this.className = 'kandideeriOut''>"+H&#228;&#228;leta+"</button>";
		cell5.innerHTML="<button onClick='Annahaal("+(i+1)+")' class='suurNupp' onMouseOver='this.className= 'kandideeriOver'' onMouseOut='this.className = 'kandideeriOut'' onFocus='this.className = 'kandideeriFocus'' onBlur='this.className = 'kandideeriOut''>H&auml;&auml;leta</button>";
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
	aken.document.write("<html><head><meta http-equiv='content-type' content='text/html; charset=UTF-8'><link type='text/css' rel='stylesheet' href='stiil.css'><title>Guise Election</title></head><body>"+document.getElementById('TulemusedTabel').innerHTML+"</body></html>");
}

$(document).ready(function(){
	  $('#NIMI').live('input', function() {
		  if($('#PIIRKOND').val()=="" && $('#ID').val()=="" && $('#PARTEI').val()=="" && $('#NIMI').val()==""){

		  }else{
			  uuendaOtsi();
		  }
	  });
	  $('#PARTEI').live('input', function() {
		  if($('#PIIRKOND').val()=="" && $('#ID').val()=="" && $('#PARTEI').val()=="" && $('#NIMI').val()==""){

		  }else{
			  uuendaOtsi();
		  }
	  });
	  $('#ID').live('input', function() {
		  if($('#PIIRKOND').val()=="" && $('#ID').val()=="" && $('#PARTEI').val()=="" && $('#NIMI').val()==""){

		  }
		  else{
			  uuendaOtsi();
		  }
	  });
	  $('#PIIRKOND').live('input', function() {
		  if($('#PIIRKOND').val()=="" && $('#ID').val()=="" && $('#PARTEI').val()=="" && $('#NIMI').val()==""){

		  }else{
			  uuendaOtsi();
		  }
	  });
});

function uuendaOtsi(){
	
    $("#OtsinguTabel").hide();
	$("#loadingOtsing").show();
	
	$("#OtsingTeadeHoiatus").html("");
	$("#OtsingTeadeEdukas").html("");
	
	var nimi = $("#NIMI").val()+"";
	var id = $("#ID").val()+"";
	var piirkond = $("#PIIRKOND").val()+"";
	var partei = $("#PARTEI").val()+"";
	var ajutine =[];
	
    //if(nimi=="" && id=="" && piirkond=="" && partei==""){
    	
   // }
    //else{
    	
    	var nimed = nimi.split(" ");
    	if(nimed.length<2){
    		nimed=[nimi,""];
    	}
    	
    	var kandid = JSON.parse(localStorage.getItem("kandidaadid"));
    	
		for(var i = 0;i<kandid.length;i++){

			if((kandid[i].id+"").toLowerCase().indexOf(id.toLowerCase())>=0 && (
					(kandid[i].perenimi+"").toLowerCase().indexOf(nimed[0].toLowerCase())>=0 && 
					(kandid[i].nimi+"").toLowerCase().indexOf(nimed[1].toLowerCase())>=0 || 
					(kandid[i].perenimi+"").toLowerCase().indexOf(nimed[1].toLowerCase())>=0  && 
					(kandid[i].nimi+"").toLowerCase().indexOf(nimed[0].toLowerCase())>=0 ) && 
					(kandid[i].piirkond+"").toLowerCase().indexOf(piirkond.toLowerCase())>=0 && 
					(kandid[i].partei+"").toLowerCase().indexOf(partei.toLowerCase())>=0){
				ajutine.push({id: kandid[i].id, piirkond: kandid[i].piirkond, partei: kandid[i].partei, nimi: kandid[i].nimi+" "+kandid[i].perenimi});
			}
			
		}
	//}
	
	lisa(ajutine);
	
    $("#OtsinguTabel").show();
	$("#loadingOtsing").hide();
	
}

$(document).ready(function(){

	if(window.navigator.onLine){
		$("#OtsinguTabel").hide();
		$("#loadingOtsing").show();
		
	 	var $param = "x x,x,x,x";
	    $.get("CandidateServlet", {values:$param}, function(items) {
	    	
	    	window.kandidaadid = items;
	    	localStorage.setItem("kandidaadid",JSON.stringify(items));
		    $("#OtsinguTabel").show();
			$("#loadingOtsing").hide();
			
		});
	}
	else{
		window.kandidaadid = JSON.parse(localStorage.getItem("kandidaadid"));
	}
});

$(document).ready(function(){
	$('#logimine').submit(function(e) {
		
		e.preventDefault(); 
		
		if(localStorage.getItem("logitud")=="true"){ // kui tahab valja logida

			$('#valedandmed').hide();
			$('#Nupp').show();
			$('#NuppV').hide();
			$('#Kasutaja').html("<input id='KASUTAJA' value='Kasutajanimi' type='text' name='username' class='logimisLahter' onFocus='this.className = 'logimisLahter onFocus'' onBlur='this.className = 'logimisLahter onBlur''>");
			$('#Parool').html("<input id='PAROOL' value='Parool' type='password' name='password' class='logimisLahter' onFocus='this.className = 'logimisLahter onFocus'' onBlur='this.className = 'logimisLahter onBlur''>");
			
			window.logitud = false;
			localStorage.setItem("logitud",false);
			
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
			
			localStorage.setItem("eesnimi","");
			localStorage.setItem("perenimi","");
			localStorage.setItem("partei","");
			localStorage.setItem("piirkond","");
			localStorage.setItem("id","");
			
			window.kandideerinud=false;
			window.haaletanud=false;
			
			localStorage.setItem("kandideerinud",false);
			localStorage.setItem("haaletanud",false);
			
			$('#Logimata').show();
			$('#Logitud').hide();
			
			localStorage.setItem("facebookiga",false);
			logoutFB();
			
		}
		else{

			$("#loginLoading").show();
			$("#Nupp").hide();
			
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
						window.facebookiga = false;
						localStorage.setItem("logitud",true);
						localStorage.setItem("facebookiga",false);
						
						$('#valedandmed').hide();
						$('#Nupp').hide();
						$('#NuppV').show();
						$('#Kasutaja').html("Tere tulemast:");
						$('#Parool').html(vastus[1].eesnimi+" "+vastus[1].perenimi);
						
						$('#KEESNIMI').val(vastus[1].eesnimi);
						$('#KPERENIMI').val(vastus[1].perenimi);
						$('#KSYNNIAEG').val(vastus[1].synniaeg);
						$('#KPARTEI').val(vastus[1].partei);
						$('#KPIIRKOND').val(vastus[1].piirkond);
						
						window.eesnimi = vastus[1].eesnimi;
						window.partei = vastus[1].partei;
						window.perenimi = vastus[1].perenimi;
						window.piirkond = vastus[1].piirkond;
						window.id = vastus[1].id;
						
						localStorage.setItem("eesnimi",vastus[1].eesnimi);
						localStorage.setItem("partei",vastus[1].partei);
						localStorage.setItem("perenimi",vastus[1].perenimi);
						localStorage.setItem("piirkond",vastus[1].piirkond);
						localStorage.setItem("id",vastus[1].id);
						
						if(vastus[0].kandideerinud=="true"){
							window.kandideerinud=true;
							localStorage.setItem("kandideerinud",true);
						}
						if(vastus[0].haaletanud=="true"){
							$('#HPARTEI').val(vastus[1].kandidaatpartei);
							$('#HNIMI').val(vastus[1].kandidaatnimi);
							$('#HPIIRKOND').val(vastus[1].kandidaatpiirkond);
							window.haaletanud=true;
							localStorage.setItem("haaletanud",true);
						}
						
						$('#Logimata').hide();
						$('#Logitud').show();
						$("#loginLoading").hide();
					}
					else{
						
						$('#valedandmed').show();
						$("#Nupp").show();
						$("#loginLoading").hide();
						
					}
					
				});
			    
			}
			else{
				$('#valedandmed').show();
				$("#Nupp").show();
				$("#loginLoading").hide();
			}
			
		}
	
	});
});

$(document).ready(function(){
	$('#tyhistamine').submit(function(e) {

		e.preventDefault(); 
		
		if(localStorage.getItem("haaletanud")){
			
			if($("#HNIMI").val()=="-"){
				return;
			}
			document.getElementById("loadingKonto").style.display="block";
			
			var $param = "tuhista,"+$("#HNIMI").val()+","+$("#HPARTEI").val()+","+$("#HPIIRKOND").val()+
			","+localStorage.getItem("eesnimi")+" "+localStorage.getItem("perenimi")+","+localStorage.getItem("partei")+","+localStorage.getItem("piirkond");

			$.get("HaaletusServlet", {values:$param}, function(vastus) {
				
				if(vastus=="true"){
					
					$('#HPARTEI').val("-");
					$('#HNIMI').val("-");
					$('#HPIIRKOND').val("-");
					
					$("#Edukas").html("H&auml;&auml;le t&uuml;histamine edukalt l&otilde;pule viidud!");
					$("#loadingKonto").hide();
					window.haaletanud = false;
					localStorage.setItem("haaletanud", false);
				}
				else{
					$("#Hojatus").html("H&auml;&auml;le t&uuml;histamine eba&otilde;nnestus!");
					$("#loadingKonto").hide();
				}
			
			});

		}
	});
});

function Annahaal(mitmes){

	if(localStorage.getItem("logitud")){
		
		if(localStorage.getItem("haaletanud")=="true"){
			document.getElementById("OtsingTeadeHoiatus").innerHTML="Te olete juba h&auml;&auml;letanud!";
			document.getElementById("OtsingTeadeEdukas").innerHTML="";
		}
		else{
			document.getElementById("loadingOtsing").style.display="block";
			var tabel = document.getElementById("OtsinguTabel");
		
			var id = tabel.getElementsByTagName("tr")[mitmes].getElementsByTagName("td")[3].innerHTML;

			$.ajax({
			    type: "POST",
			    url: "/HaaletusServlet",
			    data: "&id="+id+"&andjaid="+window.id,
			    success: function(vastus){
			    	var $list=vastus.split(",");
			        if($list[0]=="true"){
			        	
						$('#HPARTEI').val($list[2]);
						$('#HNIMI').val($list[1]);
						$('#HPIIRKOND').val($list[3]);
						
			    		$("#OtsingTeadeEdukas").html("H&auml;&auml;l edukalt antud!");
			        	$("#OtsingTeadeHoiatus").html("");
			    		window.haaletanud=true;
			    		localStorage.setItem("haaletanud",true);
			    		$("#loadingOtsing").hide();
			        }
			        else{
			        	$("#OtsingTeadeEdukas").html("");
			        	$("#OtsingTeadeHoiatus").html("H&auml;&auml;le andmine eba&otilde;nnestus!");
			        	$("#loadingOtsing").hide();
			        }
			    }
			});
		}
	}
	else{
		document.getElementById("OtsingTeadeHoiatus").innerHTML="H&auml;&auml;letamiseks logige sisse!";
		document.getElementById("OtsingTeadeEdukas").innerHTML="";
	}
}

function supports_html5_storage() {
	 try {
	    return 'localStorage' in window && window['localStorage'] !== null;
	 } catch (e) {
	    return false;
	 }
}