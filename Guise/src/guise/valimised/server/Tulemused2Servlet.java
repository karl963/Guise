package guise.valimised.server;


import java.sql.*;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import javax.servlet.http.*;

public class Tulemused2Servlet extends HttpServlet {
	
	public void doGet(HttpServletRequest req, HttpServletResponse response) throws ServletException, IOException {
		
		String sorteering = req.getParameter("piirkond");

		Connection c = null;
		String vastus = "-";
		
		try {
			
			c = DriverManager.getConnection("jdbc:google:rdbms://faceelection:fakeelection/guestbook");
			
			String query="SELECT partei,COUNT(haali) as arv FROM guisekandidaadid WHERE piirkond='"+sorteering+"' GROUP BY partei";
			ResultSet rs = c.createStatement().executeQuery(query);
			
			Map<String,Integer> map = new HashMap<String,Integer>();
			String[] list = new String[200];
			
			int k = 0;

			while(rs.next()){
			
				map.put(rs.getString("partei"),rs.getInt("arv"));
				list[k] = rs.getString("partei");
				k++;

			}
			
			double total = 1.0;
			double arv = 0.0;
			String suurim = "--";
			
			for(int i = 0;i<list.length;i++){
				if(list[i]==null){
					break;
				}
				if(map.get(list[i]) > arv){
					suurim=list[i];
					arv = (double)map.get(list[i]);
				}
				total+=map.get(list[i]);
			}
			
			double tulemus = arv/total*100;

			vastus = suurim+" "+Math.round(tulemus)+"%";

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
    
}