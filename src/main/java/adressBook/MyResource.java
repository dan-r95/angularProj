package adressBook;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

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

    /**
     * method to return all contacts either from DB or cached
     *
     * @return
     */
    @GET
    @Path("testJson")
    @Produces(MediaType.APPLICATION_JSON)
    public String getContacts() {
        JSONArray array = new JSONArray();
//        Contact test = new Contact();
//        test.setId(1);
//        test.setForename("Daniel");
//        test.setName("R");
//        test.setMobile("01764569112");
//        test.setEmail("dan@dan.de");
//        array.add(test.toJson());
//        Contact test2 = new Contact();
//        test2.setId(2);
//        test2.setForename("Daniela");
//        test2.setName("L");
//        test2.setWork("+493514569112");
//        test2.setEmail("dan@dan.com");
//        array.add(test2.toJson());
//        HashMap<Integer, Contact> contactsById = databaseManager.tryDBConnection();
//        for (Map.Entry<Integer, Contact> entry : contactsById.entrySet()) {
//            System.out.println("Key = " + entry.getKey() + ", Value = " + entry.getValue());
//            array.add(entry.getValue().toJson());
////            array.add(contactsById.values());
//        }

        Collection<Contact> contacts = ContactManager.getInstance().getAllContacts();
        for (Contact contact: contacts){
            array.add(contact.toJson());
        }

        if (array != null) {
            return array.toJSONString();
        }
        return new JSONArray().toJSONString();
//        return test.toJsonString();
    }

    /**
     * Method to return a single contact by parameter id
     *
     * @param id
     * @return
     */
    @GET
    @Path("testJson/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public String getContact(@PathParam("id") Integer id) {
//        JSONArray array = new JSONArray();
//        Contact test = new Contact();
//        test.setId(1);
//        test.setForename("Daniel");
//        test.setName("R");
//        test.setMobile("01764569112");
//        test.setEmail("dan@dan.de");
////        array.add(test.toJson());
//        HashMap<Integer, Contact> contactsById = databaseManager.tryDBConnection();
//        Contact contact = contactsById.get(id);

        Contact contact = ContactManager.getInstance().getContact(id);
        if (contact != null) {
            return contact.toJsonString();
        }
        JSONObject json = new JSONObject();
        json.put("error", "no key with that id");
        return json.toJSONString();
//        return test.toJsonString();
    }

    @POST
    @Path("add")
    @Produces(MediaType.APPLICATION_JSON)
    public String addCustomer(@FormParam("name") String name, @FormParam("forename") String forename, @FormParam("email") String email, @FormParam("work") String work, @FormParam("mobile") String mobile, @FormParam("adress") String adress, @FormParam("town") String town, @FormParam("zip") String zip) {
//        JSONArray array = new JSONArray();
//        Contact test = new Contact();
//        test.setId(1);
//        test.setForename("Daniel");
//        test.setName("R");
//        test.setMobile("01764569112");
//        test.setEmail("dan@dan.de");
////        array.add(test.toJson());
        //nächst mögliche id? per property, die hier hochzählt?, und die letzt höchste beim initialisieren bekommt als wert
        JSONObject json = new JSONObject();
        if (name != null && forename != null && email != null) {
            Contact contact = new Contact(20, forename, name, email, mobile, work, adress, town, zip);


            boolean completed = databaseManager.addEntry(contact);


            if (completed) {
                ContactManager.getInstance().refreshCache();
                return contact.toJsonString();
//                json.put("", "added entry");
            } else {
                json.put("error", "no key with that id");
            }
        }

        return json.toJSONString();
//        return test.toJsonString();
    }
}
