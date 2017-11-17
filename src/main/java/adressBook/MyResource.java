package adressBook;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

/**
 * Root resource (exposed at "myresource" path)
 */
@Path("adressBook/myresource")
public class MyResource {

    /**
     * Method handling HTTP GET requests. The returned object will be sent
     * to the client as "text/plain" media type.
     *
     * @return String that will be returned as a text/plain response.
     */
    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String getIt() {
        return "Got it!";
    }



//
//    @GET
//    @Path("test/{id}")
//    @Produces(MediaType.APPLICATION_JSON)
//    public String getCustomer(@PathParam("id") Integer id) {
//        JSONObject obj = new JSONObject();
//        obj.put("name", "mkyong.com");
//        obj.put("age", new Integer(id));
//
//        JSONArray list = new JSONArray();
//        list.add("msg 1");
//        list.add("msg 2");
//        list.add("msg 3");
//
//        obj.put("messages", list);
//        String obj2 = obj.toJSONString();
//        return obj2;
//    }

    @GET
    @Path("testJson")
    @Produces(MediaType.APPLICATION_JSON)
    public String getCustomer() {
        JSONArray array =new JSONArray();
        Contact test = new Contact();
        test.setId(1);
        test.setForename("Daniel");
        test.setName("R");
        test.setMobile("01764569112");
        test.setEmail("dan@dan.de");
        array.add(test.toJson());
        Contact test2 = new Contact();
        test2.setId(2);
        test2.setForename("Daniela");
        test2.setName("L");
        test2.setWork("+493514569112");
        test2.setEmail("dan@dan.com");
        array.add(test2.toJson());
        return array.toJSONString();
//        return test.toJsonString();
    }

    @GET
    @Path("testJson/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public String getCustomer(@PathParam("id") Integer id) {
        JSONArray array =new JSONArray();
        Contact test = new Contact();
        test.setId(1);
        test.setForename("Daniel");
        test.setName("R");
        test.setMobile("01764569112");
        test.setEmail("dan@dan.de");
//        array.add(test.toJson());
        return test.toJsonString();
//        return test.toJsonString();
    }
}
