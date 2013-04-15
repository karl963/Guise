package guise.valimised.server;

import com.google.appengine.api.channel.ChannelMessage;
import com.google.appengine.api.channel.ChannelService;
import com.google.appengine.api.channel.ChannelServiceFactory;
import com.google.appengine.api.rdbms.AppEngineDriver;
import com.google.gson.Gson;

import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.sql.*;
import java.util.LinkedHashMap;
import java.util.Map;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

import javax.servlet.http.*;

import org.json.JSONException;
import org.json.JSONObject;


public class FacebookServlet extends HttpServlet {
	
	public void service(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {            
		
		RequestDispatcher disp=req.getRequestDispatcher("/Guise.jsp");
        disp.forward(req, res);
        String code = req.getParameter("code");

        String token = null;

        try {
            String g = "https://graph.facebook.com/oauth/access_token?client_id=104787739720061&redirect_uri=" + URLEncoder.encode("http://guisevalimismasin.appspot.com/FacebookServlet", "UTF-8") + "&client_secret=9ce684e41f7d1c281c5690ce1c6c4c78&code=" + code;

            URL u = new URL(g);

            URLConnection c = u.openConnection();

            BufferedReader in = new BufferedReader(new InputStreamReader(c.getInputStream()));

            String inputLine;

            StringBuffer b = new StringBuffer();

            while ((inputLine = in.readLine()) != null)

                b.append(inputLine + "\n");            

            in.close();

            token = b.toString();

            if (token.startsWith("{"))

                throw new Exception("error on requesting token: " + token + " with code: " + code);

        } catch (Exception e) {}

        String graph = null;

        try {

            String g = "https://graph.facebook.com/me?" + token;

            URL u = new URL(g);

            URLConnection c = u.openConnection();

            BufferedReader in = new BufferedReader(new InputStreamReader(c.getInputStream()));

            String inputLine;

            StringBuffer b = new StringBuffer();
            

            while ((inputLine = in.readLine()) != null)

                b.append(inputLine + "\n");            

            in.close();

            graph = b.toString();
    		

        } catch (Exception e) {}

        String facebookId="0";
        String firstName="fakename";
        String lastName="fakename";
        String birthday="1-1-1111";

        try {

           JSONObject json = new JSONObject(graph);

           facebookId = json.getString("id");
           firstName = json.getString("first_name");
           lastName = json.getString("last_name");
           birthday = json.getString("user_birthday");
            
       
        } catch (JSONException e) {}
        
        Connection c = null;
        String vastus= "[";
        
        try{
        	
		    DriverManager.registerDriver(new AppEngineDriver());
		    c = DriverManager.getConnection("jdbc:google:rdbms://faceelection:fakeelection/guestbook");
		    
			String query = "SELECT * FROM guisekandidaadid WHERE "+"id="+facebookId;
			ResultSet rs = c.createStatement().executeQuery(query);
	        
	        if(rs.next()){
				
				Map<String, String> json2 = new LinkedHashMap<String, String>();
					
					json2.put("korras", "korras");
					json2.put("logitud","true");
					
					if(rs.getBoolean("kandideerinud")){
						json2.put("kandideerinud","true");
					}
					else{
						json2.put("kandideerinud","false");
					}
					
				    String eesnimi = rs.getString("eesnimi");
				    String perenimi = rs.getString("perenimi");
				    String partei = rs.getString("partei");
				    String piirkond = rs.getString("piirkond");
				    String id = String.valueOf(rs.getInt("id"));
				    String sunniaeg = rs.getString("synniaeg");
				    String haal = String.valueOf(rs.getString("antudhaal"));
				    
		            json2.put("eesnimi", eesnimi);
		            json2.put("perenimi", perenimi);
		            json2.put("id", id);
		            json2.put("synniaeg", sunniaeg);
		            json2.put("piirkond", piirkond);
		            json2.put("partei", partei);
					json2.put("haal", haal);
					
					String query2 = "SELECT partei, piirkond, eesnimi, perenimi FROM guisekandidaadid WHERE id="+ rs.getInt("antudhaal");
					ResultSet rs2 = c.createStatement().executeQuery(query2);
					String kandidaatnimi = " ",kandidaatpiirkond = " ",kandidaatpartei = " ";
					
					if(rs2.next()){ // kui ta on haal andnud
						
						json2.put("haaletanud","true");
						kandidaatnimi = rs2.getString("eesnimi")+" "+rs2.getString("perenimi");
						kandidaatpiirkond = rs2.getString("piirkond");
						kandidaatpartei = rs2.getString("partei");
						
					}
					else{
						json2.put("haaletanud","false");
					}
					
		            json2.put("kandidaatpiirkond", kandidaatpiirkond);
		            json2.put("kandidaatpartei", kandidaatpartei);
					json2.put("kandidaatnimi", kandidaatnimi);
					
					
					String jsonData2 = new Gson().toJson(json2);
					vastus+=jsonData2;

				vastus += "]";
	        }
	        else{

  		    	
  		      DriverManager.registerDriver(new AppEngineDriver());
  		      c = DriverManager.getConnection("jdbc:google:rdbms://faceelection:fakeelection/guestbook");
  		      
  	    	  String statement ="INSERT INTO guisekandidaadid(id, eesnimi, perenimi, synniaeg, kandideerinud) VALUES ("+facebookId+",'"+firstName+"','"+lastName+"','"+birthday+"',0)";
  		      PreparedStatement stmt = c.prepareStatement(statement);
  		      
  		      int success = 2;
  		      success = stmt.executeUpdate();
  		      
  		      if(success == 1) {
  				
  				if(rs.next()){ // kui me leidsime inimese
  					
  					Map<String, String> json2 = new LinkedHashMap<String, String>();
  					
  				    String eesnimi = firstName;
  				    String perenimi = lastName;
  				    String partei = rs.getString("-");
  				    String piirkond = rs.getString("-");
  				    String id = facebookId;
  				    String sunniaeg = birthday;
  				    
  				    json2.put("korras", "korras");
  		            json2.put("eesnimi", eesnimi);
  		            json2.put("perenimi", perenimi);
  		            json2.put("id", id);
  		            json2.put("synniaeg", sunniaeg);
  		            json2.put("piirkond", piirkond);
  		            json2.put("partei", partei);

  					json2.put("haaletanud","false");
  					json2.put("kandideerinud","false");
  					
  					String jsonData2 = new Gson().toJson(json2);
  					vastus+=jsonData2;
  				}
  				
  				
  				vastus += "]";
  		    	  
     		     ChannelService channelService = ChannelServiceFactory.getChannelService();
     		     channelService.sendMessage(new ChannelMessage("key", vastus));
  		    	  
  		      }
  		      else if(success==0){
  		    	  
  		    	Map<String, String> json2 = new LinkedHashMap<String, String>();
  		    	
				String jsonData2 = new Gson().toJson(json2);
				json2.put("korras", "fail");
				vastus+=jsonData2;
				vastus += "]";
					
      		     ChannelService channelService = ChannelServiceFactory.getChannelService();
      		     channelService.sendMessage(new ChannelMessage("key", vastus));
  		      }
	        }
  		      
	    } catch (SQLException e) {
	        e.printStackTrace();
	    } finally {
	        if (c != null) 
	          try {
	            c.close();
	            } catch (SQLException ignore) {
	         }
	      } 
        
   		
	}
    
}