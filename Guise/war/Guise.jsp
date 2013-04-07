<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.util.List" %>
<%@ page import="java.sql.*" %>
<%@ page import="java.lang.String.*" %>
<%@ page import="com.google.appengine.api.rdbms.AppEngineDriver" %>

<!doctype html>

<html>
  <head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
	
    <link type="text/css" rel="stylesheet" href="stiil.css">

    <title>Guise Election</title>
    
	<script src="jquery-1.9.1.min.js"></script>
	<script src="http://code.jquery.com/jquery-1.4.2.js" type="text/javascript"></script>
	<script type="text/javascript" src="sort.js"></script>
	<script type="text/javascript" src="scriptid.js"></script>

  </head>

  <body>
    <!-- OPTIONAL: include this if you want history support -->
    <iframe src="javascript:''" id="__gwt_historyFrame" tabIndex='-1' style="position:absolute;width:0;height:0;border:0"></iframe>
    
    <!-- RECOMMENDED if your web app will not function without JavaScript enabled -->
    <noscript>
      <div style="width: 22em; position: absolute; left: 50%; margin-left: -11em; color: red; background-color: white; border: 1px solid red; padding: 4px; font-family: sans-serif">
        Your web browser must have JavaScript enabled
        in order for this application to display correctly.
      </div>
    </noscript>
	
	<!-- -------------- -->
	<!-- Veebilehe sisu -->
	<!-- ------------- --->
	
	<div id="Kogu">
	
		<div id="PÃÂ¤is" class="VasakMenuList">
			<a id="Pealeht"><img src="pildid/logo.png" alt="Logo" id="Logo"></a>
		</div>
		
		<div id="PaisTeade">Antud rakendus ei ole mõeldud kasutamiseks reaalsetel valimistel</div>
		
		<div id="TuhiRida"> </div>
		
		<div id="Logimisriba">
			
			<form id="logimine">
				<div id="Tuhi"> </div>
				<div id="Kasutaja"><input id="KASUTAJA" value="Kasutajanimi" type="text" name="username" class="logimisLahter" onFocus="this.className = 'logimisLahter onFocus'" onBlur="this.className = 'logimisLahter onBlur'"></div>
				<div id="Parool"><input id="PAROOL" value="Parool" type="password" name="password" class="logimisLahter" onFocus="this.className = 'logimisLahter onFocus'" onBlur="this.className = 'logimisLahter onBlur'"></div>
				<div id="Nupp"><input type="submit" value="Logi sisse" class="loginNupp" onMouseOver="this.className = 'loginNupp mouseOver'" onMouseOut="this.className = 'loginNupp mouseOut'"  onFocus="this.className = 'loginNupp onFocus'" onBlur="this.className = 'loginNupp onBlur'"></div>
				<div id="loginLoading"><img src='pildid/loader.gif'></div>
				<div id="NuppV"><input type="submit" value="Logi välja" class="loginNupp" onMouseOver="this.className = 'loginNupp mouseOver'" onMouseOut="this.className = 'loginNupp mouseOut'"  onFocus="this.className = 'loginNupp onFocus'" onBlur="this.className = 'loginNupp onBlur'"></div>
				<div id="valedandmed">Valed andmed!</div>
				<div id="Facebook"><img src="pildid/facebook.png" alt="fb"></div>
			</form>
			
		</div>
		
		<div class="tabs">
		<div id="VasakMenu" class="VasakMenuList" >
		
			<!--<li class="tab"><a href="#sisuHääleta"><input type="image" id="HÃ¤Ã¤leta" class="leftMenuButton" src="pildid/Haaleta.png" /></a></li>-->
			<a class="tab" href="#sisuOtsiKandidaati"><input type="image" id="OtsiKandidaati" class="leftMenuButton" src="pildid/OtsiKandidaati.png" /></a>
			<a class="tab" href="#sisuTulemused"><input type="image" id="Tulemused" class="leftMenuButton" src="pildid/Tulemused.png" /></a>
			<a class="tab" href="#sisuMinuKonto"><input type="image" id="MinuKonto" class="leftMenuButton" src="pildid/MinuKonto.png" /></a>
			
		</div>
		
		<div id="sisuPealeht" class="content sisu">

			<h1>Tere tulemast Guise Valimismasinasse!</h1>
			<br><br>
			Kindla kandidaadi leidmiseks ja Hääletamiseks valige "Otsi kandidaati"
			<br><br>
			Tulemuste statistika vaatamiseks valige "Tulemused"
			<br><br>
			Kandideerimiseks ja enda h&#228;&#228;le tühistamiseks valige "Minu konto"
			</p>
			
		</div>
		
		<div id="sisuMinuKonto" class="content sisu">
			
			<div id="Logitud">
			
			<h1>Minu Konto</h1>
			
			<p>
			All saate oma andmeid muuta ja kandideerida. Samuti saate enda tehtud häälevalikut tühistada.
			</p>
			<form Name="Valideerimine" >
			<table class="minukontoLabel">
				<tr class="minukontoTr">
					<th class="minukontoTh">Eesnimi</th>
					<th class="minukontoTh">Perekonnanimi</th>
					<th class="minukontoTh">S&#252;nniaeg</th>
					<th class="minukontoTh">Partei</th>
					<th class="minukontoTh">Piirkond</th>
				</tr>
				<tr>
					<td class="minukontoTd"><input type="text" name="nimi" id="KEESNIMI" class="otsinguLahter" onFocus="this.className= 'otsinguLahterOnFocus'" onBlur="this.className= 'otsinguLahterOnBlur'"></td>

					<td class="minukontoTd"><input type="text" name="perenimi" id="KPERENIMI" class="otsinguLahter" onFocus="this.className= 'otsinguLahterOnFocus'" onBlur="this.className= 'otsinguLahterOnBlur'"></td>

					<td class="minukontoTd"><input type="text" name="sünniaeg" id="KSÜNNIAEG" class="otsinguLahter" onFocus="this.className= 'otsinguLahterOnFocus'" onBlur="this.className= 'otsinguLahterOnBlur'"></td>
				
				
					<td >
					<select id="KPARTEI" class="minukontoBox" name="partei">
						<option value="--Valige--">--Valige--</option>
						<option value="Meeskond">Meeskond</option>
						<option value="Partei">Partei</option>
						<option value="Selts">Selts</option>
						<option value="Yhing">Yhing</option>
					</select>
					</td>
					<!-- <td class="minukontoTd"><input value="Partei" type="text" name="Partei" class="otsinguLahter" onFocus="this.className= 'otsinguLahterOnFocus'" onBlur="this.className= 'otsinguLahterOnBlur'"></td> -->

					<td>
					<select id="KPIIRKOND" class="minukontoBox" name="piirkond">
						<option value="--Valige--">--Valige--</option>
						<option value="Valgamaa">Valgamaa</option>
						<option value="Harjumaa">Harjumaa</option>
						<option value="Saaremaa">Saaremaa</option>
						<option value="Tartumaa">Tartumaa</option>
					</select>
					</td>
					<!-- <td class="minukontoTd"><input value="Piirkond" type="text" name="Piirkond" class="otsinguLahter" onFocus="this.className= 'otsinguLahterOnFocus'" onBlur="this.className= 'otsinguLahterOnBlur'"></td> -->

				</tr>
			</table>
			<table>
				<tr>
					<td class="minukontoNupp"> </td>
					<td class="minukontoNupp"> </td>
					<td class="minukontoNupp"> </td>
					<td class="minukontoNupp"> </td>
					<td class="minukontoNupp"> <input type="button" onClick="Kandideeri(this.form)" value="Kandideeri" class="suurNupp" onMouseOver="this.className = 'kandideeriOver'" onMouseOut="this.className = 'kandideeriOut'" onFocus="this.className = 'kandideeriFocus'" onBlur="this..className = 'kandideeriOut'"/></td>
				</tr>
			</table>
			<p id="Hojatus"> </p>
			<p id="Edukas"> </p>
			</form>
			
			<div id="loadingKonto"><img src='pildid/loader.gif'></div>
			
			<hr class="joon">
			
			<h2>Teie tehtud valik</h2>
			
			<table id="Labels">
					<tr>
						<td class="labels">Piirkond</td>
						<td class="labels">Partei</td>
						<td class="labels">Nimi / ID</td>
					</tr>
			</table>
			
			<form id="tyhistamine">
			<input type="text" id="HPIIRKOND" value="-" class="ListBoxSuurused" disabled />
			
			<input type="text" id="HPARTEI" value="-" class="ListBoxSuurused" disabled />

			<input type="text" id="HNIMI" value="-" class="ListBoxSuurused" disabled />
			
			<input type="submit" value="T&#252;hista" class="Haaleta" onMouseOver="this.className= 'HaaletaOver'" onMouseOut="this.className = 'HaaletaOut'" onFocus="this.className = 'HaaletaFocus'" onBlur="this.className = 'HaaletaOut'" />
			</form>
			
			<br>
			<br>
			</div>
			
			<div id="Logimata">
				<p>Enda andmete kuvamiseks peate olema sisse logitud.</p>
			</div>
			
			
		</div>
		
		<div id="sisuOtsiKandidaati" class="content sisu">
				
			<h1>Kandidaatide otsing</h1>
			
			<p>
			All saate otsida kandidaate piirkonna, partei v&#245;i nime j&#228;rgi.
			</p>
			
			<form id="otsikandidaati">
			<table class="minukontoLabel">
				<tr class="minukontoTr">
					<th class="minukontoTh">Nimi</th>
					<th class="minukontoTh">Partei</th>
					<th class="minukontoTh">Piirkond</th>
					<th class="minukontoTh">ID</th>
					<th class="minukontoTh"> </th>
				</tr>
				<tr>
					<td class="minukontoNupp"><input id="NIMI" type="text" name="Eesnimi" class="otsinguLahter" onFocus="this.className= 'otsinguLahterOnFocus'" onBlur="this.className= 'otsinguLahterOnBlur'"></td>
					<td class="minukontoNupp"><input id="PARTEI" type="text" name="Perekonnanimi" class="otsinguLahter" onFocus="this.className= 'otsinguLahterOnFocus'" onBlur="this.className= 'otsinguLahterOnBlur'"></td>

					<td class="minukontoNupp"><input id="PIIRKOND" type="text" name="SÃÂ¼nniaeg" class="otsinguLahter" onFocus="this.className= 'otsinguLahterOnFocus'" onBlur="this.className= 'otsinguLahterOnBlur'"></td>

					<td class="minukontoNupp"><input id="ID" type="text" name="Partei" class="otsinguLahter" onFocus="this.className= 'otsinguLahterOnFocus'" onBlur="this.className= 'otsinguLahterOnBlur'"></td>

					<td class="minukontoNupp"><button type="submit" value="Otsi" class="suurNupp" onMouseOver="this.className= 'kandideeriOver'" onMouseOut="this.className = 'kandideeriOut'" onFocus="this.className = 'kandideeriFocus'" onBlur="this.className = 'kandideeriOut'">Otsi</button></td>
				</tr>
			</table>
			</form>
			
			<br>
			<div id="OtsingTeadeEdukas"></div>
			<div id="OtsingTeadeHoiatus"></div>
			
			<div class="loading" id="loadingOtsing" ><img src='pildid/loader.gif'></div>
			
			<form id="AnnaHaal">
			<table class="minukontoLabel" id="OtsinguTabel">
				<tr class="minukontoTr">
					<th class="minukontoTh">Nimi</th>
					<th class="minukontoTh">Partei</th>
					<th class="minukontoTh">Piirkond</th>
					<th class="minukontoTh">ID</th>
					<th class="minukontoTh">&emsp;</th>
				</tr>
			</table>
			</form>

		</div>

	<div id="sisuIsikVaade" class="content sisu"> 
	
			<h1>Kandidaadi info</h1><br>

			<table class="isikVaade" id="isikVaade">
				<tr>
					<th>Eesnimi</th>
					<td id="LISAEESNIMI"></td>
				</tr>
				<tr>
					<th>Perenimi</th>
					<td id="LISAPERENIMI"></td>
				</tr>
				<tr>
					<th>Erakonna nimi</th>
					<td id="LISAPARTEI"></td>
				</tr>
				<tr>
					<th>Piirkonna nimi</th>
					<td id="LISAPIIRKOND"></td>
				</tr>
				<tr>
					<th>Valimis nr</th>
					<td id="LISAID"></td>
				</tr>
			</table>
			<input type="button" value="Tagasi" id="TagasiNupp" class="suurNupp" onMouseOver="this.className = 'kandideeriOver'" onMouseOut="this.className = 'kandideeriOut'" onFocus="this.className = 'kandideeriFocus'" onBlur="this.className = 'kandideeriOut'" onclick="goBack()" />

	</div>
		
	<div id="sisuTulemused" class="content sisu">
	
			<h1>Teie valik</h1>
			<p>All saate valida mille järgi tulemusi sorteerida ning neid seejärel vaadata.</p>
				
				<div class="sorteeri">
				
					<input type="button" onClick="annaTulemused('piirkond');" value="Piirkond" id="TulemusPiirkond" class="suurNupp" onMouseOver="this.className = 'kandideeriOver'" onMouseOut="this.className = 'kandideeriOut'" onFocus="this.className = 'kandideeriFocus'" onBlur="this.className = 'kandideeriOut'" />

					<input type="button" onClick="annaTulemused('partei');" value="Partei" id="TulemusPartei" class="suurNupp" onMouseOver="this.className = 'kandideeriOver'" onMouseOut="this.className = 'kandideeriOut'" onFocus="this.className = 'kandideeriFocus'" onBlur="this.className = 'kandideeriOut'" />

					<input type="button" onClick="annaTulemused('kandidaadid');" value="Kandidaadid" id="TulemusKandidaadid" class="suurNupp" onMouseOver="this.className = 'kandideeriOver'" onMouseOut="this.className = 'kandideeriOut'" onFocus="this.className = 'kandideeriFocus'" onBlur="this.className = 'kandideeriOut'" />

					<input type="button" onClick="annaTulemused('riik');" value="Kogu riik" id="TulemusRiik" class="suurNupp" onMouseOver="this.className = 'kandideeriOver'" onMouseOut="this.className = 'kandideeriOut'" onFocus="this.className = 'kandideeriFocus'" onBlur="this.className = 'kandideeriOut'" />

					<input type="button" value="Prindi" id="TulemusPrindi" class="suurNupp" onMouseOver="this.className = 'kandideeriOver'" onMouseOut="this.className = 'kandideeriOut'" onFocus="this.className = 'kandideeriFocus'" onBlur="this.className = 'kandideeriOut'" 
onclick="prindi()"/>

				
				</div>
		
			<br>
			<div id="loadingTulemus"><img src='pildid/loader.gif'></div>
			
			<div id="TulemusedTabel">
				<div id="Tpiir"></div>
				<div id="Tkant"></div>
				<div id="Triik"></div>
				<div id="Tpart"></div>
			</div>
	</div>
		
	<div id="JalusTeade">Rakenduses realiseeritud e-valimiste näide on realiseeritud tehnoloogiate praktiseerimise eesmärgil ning ei ole mõeldud reaalsete e-valimiste korraldamiseks. Kokkulangevused reaalse e-valimiste protsessiga on juhuslikud</div>
		
		<div id="Footer" class="footer">
			Copyright ÃÂ© Guise
		</div>
	
	</div>
	</div>
		
  </body>
</html>
