package guise.valimised.server;

import java.io.FileReader;
import java.io.IOException;
import java.nio.CharBuffer;
import java.util.HashMap;
import java.util.Random;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.api.channel.ChannelFailureException;
import com.google.appengine.api.channel.ChannelMessage;
import com.google.appengine.api.channel.ChannelService;
import com.google.appengine.api.channel.ChannelServiceFactory;
import com.google.appengine.api.users.User;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;

public class ChannelServlet extends HttpServlet {

    public void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {    
        
    	ChannelService channelService = ChannelServiceFactory.getChannelService();
		String channelKey = "key";
    	String token = channelService.createChannel(channelKey);
        
        FileReader reader = new FileReader("guise.jsp");
        CharBuffer buffer = CharBuffer.allocate(99999);
        reader.read(buffer);
        String index = new String(buffer.array());

        index = index.replaceAll("\\{\\{ token \\}\\}", token);
        resp.setContentType("text/html");
        resp.getWriter().write(index);
      }
	
	  
	 

	  
}