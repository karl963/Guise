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

public class TulemusedServlet extends HttpServlet {
	
	public void doGet(HttpServletRequest req, HttpServletResponse response) throws ServletException, IOException {

		String sorteering = req.getParameter("sorteering");

		Connection c = null;
		String vastus = "[";
		
		try {
			
			c = DriverManager.getConnection("jdbc:google:rdbms://faceelection:fakeelection/guestbook");
			
			
			String query="";
			ResultSet rs;
			
			if(sorteering.equals("kandidaadid")){
				query="SELECT * FROM guisekandid";
			}
			else if(sorteering.equals("riik")){
				query="SELECT * FROM guiseriik";
			}
			else if(sorteering.equals("partei")){
				query="SELECT * FROM guiseparteid";
			}
			else if(sorteering.equals("piirkond")){
				query="SELECT * FROM guisepiirkond";
			}
			
			rs = c.createStatement().executeQuery(query);
			Map<String, String> json = new LinkedHashMap<String, String>();
			
			if(sorteering.equals("kandidaadid")){

				while(rs.next()){
					
					String eesnimi = rs.getString("eesnimi");
					String perenimi = rs.getString("perenimi");
					String haali = rs.getString("haali");
					String piirkond = rs.getString("piirkond");
					
		            json.put("eesnimi", eesnimi);
		            json.put("perenimi", perenimi);
		            json.put("haali", haali);
		            json.put("piirkond", piirkond);
		            
					String jsonData = new Gson().toJson(json);
					
		            if (vastus.length() != 1) {
		            	vastus += ", ";
		            }
		            
		            vastus += jsonData;
				}
				
			}
			else if(sorteering.equals("riik")){
				
				while(rs.next()){
					
					String haaletajaid = rs.getString("haaletajaid");
					String haaletanuid = rs.getString("haaletanuid");
					String protsent = rs.getString("protsent");
					
		            json.put("haaletajaid", haaletajaid);
		            json.put("haaletanuid", haaletanuid);
		            json.put("protsent", protsent);
		            
					String jsonData = new Gson().toJson(json);
					
		            if (vastus.length() != 1) {
		            	vastus += ", ";
		            }
		            
		            vastus += jsonData;
				}
				
			}
			else if(sorteering.equals("partei")){
				
				while(rs.next()){
					
					String partei = rs.getString("partei");
					String haali = rs.getString("haali");
					
		            json.put("partei", partei);
		            json.put("haali", haali);
		            
					String jsonData = new Gson().toJson(json);
					
		            if (vastus.length() != 1) {
		            	vastus += ", ";
		            }
		            
		            vastus += jsonData;
				}
				
			}
			else if(sorteering.equals("piirkond")){

				while(rs.next()){

					String piirkond = rs.getString("piirkond");
					String haaletajaid = rs.getString("haaletajaid");
					String haaletanuid = rs.getString("haaletanuid");
					String protsent = rs.getString("protsent");

		            json.put("piirkond", piirkond);
		            json.put("haaletajaid", haaletajaid);
		            json.put("haaletanuid", haaletanuid);
		            json.put("protsent", protsent);
		            
					String jsonData = new Gson().toJson(json);
					
		            if (vastus.length() != 1) {
		            	vastus += ", ";
		            }
		            
		            vastus += jsonData;
				}
				
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