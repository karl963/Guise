package guise.valimised.server;

import com.google.gson.Gson;

import java.sql.*;
import java.util.LinkedHashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import javax.servlet.http.*;

public class ValidateServlet extends HttpServlet {
	
	public void doGet(HttpServletRequest req, HttpServletResponse response) throws ServletException, IOException {

		String[] parameetrid = req.getParameter("values").split(",");

		String kasutaja = parameetrid[0];
		String parool = parameetrid[1];
		
		Connection c = null;
		String vastus = "[";
		
		try {
			
			c = DriverManager.getConnection("jdbc:google:rdbms://faceelection:fakeelection/guestbook");
			
			String query = "SELECT * FROM guisekandidaadid WHERE kasutaja='"+ kasutaja +"' AND parool='"+parool+"'";
			ResultSet rs = c.createStatement().executeQuery(query);
			
			Map<String, String> json = new LinkedHashMap<String, String>();
			
			if(rs.next()){ // kui me leidsime inimese
				
				json.put("logitud","true");
				
				if(rs.getBoolean("kandideerinud")){
					json.put("kandideerinud","true");
				}
				else{
					json.put("kandideerinud","false");
				}
				
				Map<String, String> json2 = new LinkedHashMap<String, String>();
				
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
					
					json.put("haaletanud","true");
					kandidaatnimi = rs2.getString("eesnimi")+" "+rs2.getString("perenimi");
					kandidaatpiirkond = rs2.getString("piirkond");
					kandidaatpartei = rs2.getString("partei");
					
				}
				else{
					json.put("haaletanud","false");
				}
				
	            json2.put("kandidaatpiirkond", kandidaatpiirkond);
	            json2.put("kandidaatpartei", kandidaatpartei);
				json2.put("kandidaatnimi", kandidaatnimi);
				
				
				String jsonData = new Gson().toJson(json);
				String jsonData2 = new Gson().toJson(json2);
				vastus+=jsonData;
				vastus+=",";
				vastus+=jsonData2;
			}
			else{
				
				json.put("logitud","false");
				String jsonData = new Gson().toJson(json);
				vastus+=jsonData;
				
			}
			
			
			vastus += "]";

		} catch (Exception e) {
			e.printStackTrace();
	    } finally {
	        if (c != null) {
	        	try {
		            c.close();
		            } catch (SQLException ignore) {
		         }
	        }
	        
	        response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write(vastus);

	    }  
  }
    
    public void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
    		   
    }
}