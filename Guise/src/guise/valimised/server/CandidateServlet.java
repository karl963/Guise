package guise.valimised.server;

import com.google.appengine.api.rdbms.AppEngineDriver;

import java.sql.*;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.http.*;
import java.util.LinkedHashMap;
import java.util.Map;

import com.google.gson.Gson;

public class CandidateServlet extends HttpServlet {
	
	public void doGet(HttpServletRequest req, HttpServletResponse response) throws ServletException, IOException {

		String[] parameetrid = req.getParameter("values").split(",");

		String[] nimed;
		if(parameetrid[0].split(" ").length==1){
			nimed = new String[2];
			nimed[0] = parameetrid[0].split(" ")[0];
			nimed[1] = "N";
		}
		else{
			nimed = parameetrid[0].split(" ");
		}
				
		Connection c = null;
		String full = "[";
		
		try {
			
			c = DriverManager.getConnection("jdbc:google:rdbms://faceelection:fakeelection/guestbook");
			String query = "SELECT * FROM guisekandidaadid ";
			boolean esimene = true;
			
			if(!nimed[0].equals("N")){
				if(esimene){
					query += "WHERE eesnimi LIKE '" + nimed[0] + "%'";
					esimene=false;
				}
				else{
					query += "AND eesnimi LIKE '" + nimed[0] + "%'";
				}
			}
			else{
				if(esimene){
					query += "WHERE eesnimi LIKE '" + "" + "%'";
					esimene=false;
				}
				else{
					query += "AND eesnimi LIKE '" + "" + "%'";
				}
			}
			if(!nimed[1].equals("N")){
				if(esimene){
					query += "WHERE perenimi LIKE '" + nimed[1] + "%'";
					esimene=false;
				}
				else{
					query += "AND perenimi LIKE '" + nimed[1] + "%'";
				}
			}
			if(!parameetrid[1].equals("N")){
				if(esimene){
					query += "WHERE id LIKE '" + parameetrid[1] + "%'";
					esimene=false;
				}
				else{
					query += "AND id LIKE '" + parameetrid[1] + "%'";
				}
			}
			if(!parameetrid[2].equals("N")){
				if(esimene){
					query += "WHERE piirkond LIKE '" + parameetrid[2] + "%'";
					esimene=false;
				}
				else{
					query += "AND piirkond LIKE '" + parameetrid[2] + "%'";
				}
			}
			if(!parameetrid[3].equals("N")){
				if(esimene){
					query += "WHERE partei LIKE '" + parameetrid[3] + "%'";
					esimene=false;
				}
				else{
					query += "AND partei LIKE '" + parameetrid[3] + "%'";
				}
			}

			ResultSet rs = c.createStatement().executeQuery(query);

			while (rs.next()){

			    String nimi = rs.getString("eesnimi") + " " + rs.getString("perenimi");
			    String partei = rs.getString("partei");
			    String piirkond = rs.getString("piirkond");
			    String id = String.valueOf(rs.getInt("id"));
			    
			    Map<String, String> json = new LinkedHashMap<String, String>();
			    
	            json.put("nimi", nimi);
	            json.put("id", id);
	            json.put("piirkond", piirkond);
	            json.put("partei", partei);

	            String jsonData = new Gson().toJson(json);

	            if (full.length() != 1) {
	            	full += ", ";
	            }
	            
	            full += jsonData;

			}
			
			full += "]";

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
            response.getWriter().write(full);

	    }  
  }
    
    public void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
    		   
    		  Connection c = null;
    		  String vastus="false";
    		  
    		    try {
    		    
    		      DriverManager.registerDriver(new AppEngineDriver());
    		      c = DriverManager.getConnection("jdbc:google:rdbms://faceelection:fakeelection/guestbook");
    		      
    		      String nimi = req.getParameter("vanaeesnimi");
    		      String perenimi = req.getParameter("vanaperenimi");
    		      String partei = req.getParameter("vanapartei");
    		      String piirkond = req.getParameter("vanapiirkond");
    		      
    		      String uusnimi = req.getParameter("nimi");
    		      String uusperenimi = req.getParameter("perenimi");
    		      String uuspiirkond = req.getParameter("piirkond");
    		      String uuspartei = req.getParameter("partei");

    		      if (uusnimi == "" || uusperenimi=="" || uuspartei=="--Valige--" || uuspiirkond=="--Valige--") {

    		      }
    		      else {

    		    	  String statement ="UPDATE guisekandidaadid SET kandideerinud=1, eesnimi='"+uusnimi+"', perenimi='"+uusperenimi+"', piirkond='"+uuspiirkond+
    		    			  "', partei='"+uuspartei+"' WHERE eesnimi='"+nimi+
    		    			  "' AND perenimi='"+perenimi+"' AND partei='"+partei+"' AND piirkond='"+piirkond+"'";

	    		      PreparedStatement stmt = c.prepareStatement(statement);
	    		      
	    		      int success = 2;
	    		      success = stmt.executeUpdate();
	    		      
	    		      if(success == 1) {
	    		        vastus="true";
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
    		        
    		        resp.getWriter().write(vastus);
    		      }

    		  }
}