package guise.valimised.server;

import com.google.appengine.api.rdbms.AppEngineDriver;

import java.sql.*;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import javax.servlet.http.*;

public class HaaletusServlet extends HttpServlet {
	
	public void doGet(HttpServletRequest req, HttpServletResponse response) throws ServletException, IOException {
		
		Connection c = null;
		String vastus = "false";
		
		try {
			
			String[] parameetrid = req.getParameter("values").split(",");
			String[] nimi = parameetrid[1].split(" ");
			
			c = DriverManager.getConnection("jdbc:google:rdbms://faceelection:fakeelection/guestbook");
			String query = "SELECT id FROM guisekandidaadid WHERE "+"eesnimi='"+nimi[0]+"' AND perenimi='"+nimi[1]+"' AND piirkond='"+parameetrid[3]+"' AND partei='"+parameetrid[2]+"'";

			ResultSet rs = c.createStatement().executeQuery(query);

			if(rs.next()){ // kui meil on kandidaat leitud kellele h‰‰le andnud oleme
				
				int success = 2,success2 = 2;
				
				String statement = "UPDATE guisekandidaadid SET haali=haali-1 WHERE id="+rs.getInt("id");
				PreparedStatement stmt = c.prepareStatement(statement);
				success = stmt.executeUpdate();
				
				if(success==1){
					String[] nimi2 = parameetrid[4].split(" ");
					
					String query2 = "SELECT id FROM guisekandidaadid WHERE "+"eesnimi='"+nimi2[0]+"' AND perenimi='"+nimi2[1]+"' AND piirkond='"+parameetrid[6]+"' AND partei='"+parameetrid[5]+"'";
					ResultSet rs2 = c.createStatement().executeQuery(query2);
					
					if(rs2.next()){
						String statement2 = "UPDATE guisekandidaadid SET antudhaal=NULL WHERE id="+rs2.getInt("id");
						PreparedStatement stmt2 = c.prepareStatement(statement2);
						success2 = stmt2.executeUpdate();
						
						if(success2==1){
							vastus="true";
						}
						
					}
				}
				
			}

		} catch (Exception e) {
			e.printStackTrace();
	    } finally {
	        if (c != null) {
	        	try {
		            c.close();
		            } catch (SQLException ignore) {
		         }
	        }
	        
	        response.setContentType("text/plain");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write(vastus);

	    }  
  }
    
    public void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
    		   
    		  Connection c = null;
    		  String vastus = "false,x";
    		    try {
    		    	
    		      DriverManager.registerDriver(new AppEngineDriver());
    		      c = DriverManager.getConnection("jdbc:google:rdbms://faceelection:fakeelection/guestbook");
    		      
    		      int id,andjaid;
    		      try{
    		    	  id = Integer.valueOf(req.getParameter("id"));
    		      }catch(Exception e){
    		    	  id=99999;
    		      }
    		      try{
    		    	  andjaid = Integer.valueOf(req.getParameter("andjaid"));
    		      }catch(Exception e){
    		    	  andjaid=99999;
    		      }
		    	  String statement ="UPDATE guisekandidaadid SET haali=haali+1 WHERE id="+id;
    		      PreparedStatement stmt = c.prepareStatement(statement);
    		      
    		      int success = 2;
    		      success = stmt.executeUpdate();
    		      
    		      if(success == 1) {
    		    	  
    		    	  int success2 = 2;
    		    	  
    		    	  String statement2 ="UPDATE guisekandidaadid SET antudhaal="+id+" WHERE id="+andjaid;
        		      PreparedStatement stmt2 = c.prepareStatement(statement2);
        		      success2 = stmt2.executeUpdate();
        		      
    		    	  if(success2 == 1){
    		    		  
    		    		  String query = "SELECT eesnimi, perenimi, piirkond, partei FROM guisekandidaadid WHERE "+"id="+id;
    		    		  ResultSet rs = c.createStatement().executeQuery(query);
    		    		  
    		    		  if(rs.next()){
    		    			  
    		    			  vastus="true,"+rs.getString("eesnimi")+" "+rs.getString("perenimi")+","+rs.getString("partei")+","+rs.getString("piirkond");
    		    		  }

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
    		        resp.setContentType("text/plain");
    	            resp.setCharacterEncoding("UTF-8");
    		        resp.getWriter().write(vastus);
    		      } 
    		  }
}