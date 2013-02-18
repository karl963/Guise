package guise.valimised.client;
//Testcomm
//More comments
/* long comment to see if it ends up
 * on github
 * if it doesn't
 * then tough luck
 * if it does, however,
 * good stuff
 */
import com.google.gwt.user.client.rpc.RemoteService;
import com.google.gwt.user.client.rpc.RemoteServiceRelativePath;

/**
 * The client side stub for the RPC service.
 */
@RemoteServiceRelativePath("greet")
public interface GreetingService extends RemoteService {
	String greetServer(String name) throws IllegalArgumentException;
}
