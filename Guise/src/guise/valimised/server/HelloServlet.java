package guise.valimised.server;

import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import com.google.appengine.api.users.User;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;

public class HelloServlet extends HttpServlet
{
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
        throws ServletException, IOException
    {
        String q = req.getParameter("q");
        PrintWriter out = resp.getWriter();
          
          out.println("<html>");
          out.println("<body>");
          out.println("The paramter q was \"" + q + "\".");
          out.println("</body>");
          out.println("</html>");
    }

    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
        throws ServletException, IOException
    {
        String field = req.getParameter("field");
        PrintWriter out = resp.getWriter();

        out.println("<html>");
        out.println("<body>");
        out.println("You entered \"" + field + "\" into the text box.");
        out.println("</body>");
        out.println("</html>");
    }
}