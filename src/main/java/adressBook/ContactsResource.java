package adressBook;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.Collection;
import java.util.List;

/**
 * Root resource
 */
@Path("adressBook/")
public class ContactsResource {

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String getIt() {
        return "Got it!";
    }

    /**
     * method to return all contacts either from DB or cached
     *
     * @return
     */
    @GET
    @Path("contacts")
    @Produces(MediaType.APPLICATION_JSON)
    public String getContacts() {
        JSONArray array = new JSONArray();
        Collection<Contact> contacts = ContactManager.getInstance().getAllContacts();
        for (Contact contact : contacts) {
            array.add(contact.toJson());
        }

        if (array != null) {
            return array.toJSONString();
        }
        return new JSONArray().toJSONString();
    }

    /**
     * Method to return a single contact by parameter id
     *
     * @param id
     * @return
     */
    @GET
    @Path("contacts/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public String getContact(@PathParam("id") Integer id) {

        Contact contact = ContactManager.getInstance().getContact(id);
        if (contact != null) {
            return contact.toJsonString();
        }
        JSONObject json = new JSONObject();
        json.put("error", "no key with that id");
        return json.toJSONString();
    }

    @POST
    @Path("add")
    @Produces(MediaType.APPLICATION_JSON)
    public String addContact(@FormParam("name") String name, @FormParam("forename") String forename,
            @FormParam("email") String email, @FormParam("work") String work, @FormParam("mobile") String mobile,
            @FormParam("adress") String adress, @FormParam("town") String town, @FormParam("zip") String zip) {

        JSONObject json = new JSONObject();
        if (name != null && forename != null && email != null) {
            Contact contact = new Contact(null, forename, name, email, mobile, work, adress, town, zip);

            Integer completed = ContactManager.getInstance().addContact(contact);

            if (completed > -1) {
                ContactManager.getInstance().refreshCache();
                return contact.toJsonString();
            } else {
                json.put("error", "no key with that id");
            }
        }

        return json.toJSONString();
    }

    @PUT
    @Path("edit")
    @Produces(MediaType.APPLICATION_JSON)
    public String editContact(@FormParam("id") Integer id, @FormParam("name") String name,
            @FormParam("forename") String forename, @FormParam("email") String email, @FormParam("work") String work,
            @FormParam("mobile") String mobile, @FormParam("adress") String adress, @FormParam("town") String town,
            @FormParam("zip") String zip) {

        JSONObject json = new JSONObject();
        if (name != null && forename != null && email != null && id != null) {
            Contact contact = new Contact(id, forename, name, email, mobile, work, adress, town, zip);

            boolean completed = ContactManager.getInstance().updateContact(contact);

            if (completed) {
                return contact.toJsonString();
            } else {
                json.put("task", "error");
            }
        }

        return json.toJSONString();
    }

    @DELETE
    @Path("delete/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public String deleteContact(@PathParam("id") Integer id) {

        JSONObject json = new JSONObject();
        boolean completed = ContactManager.getInstance().deleteContact(id);
        if (completed) {
            json.put("task", "success");
        } else {
            json.put("task", "error");
        }
        return json.toJSONString();
    }

    @DELETE
    @Path("deleteAll")
    @Produces(MediaType.APPLICATION_JSON)
    public String deleteAll() {
        JSONObject json = new JSONObject();
        boolean completed = ContactManager.getInstance().deleteAllContacts();
        if (completed) {
            json.put("task", "success");
        } else {
            json.put("task", "error");
        }
        return json.toJSONString();
    }

    @GET
    @Path("contactSearch")
    @Produces(MediaType.APPLICATION_JSON)
    public String searchContacts(@QueryParam("ss") String searchString) {
        JSONObject json = new JSONObject();
        List<Contact> contacts = ContactManager.getInstance().searchForContact(searchString);
        JSONArray array = new JSONArray();
        if (array != null) {
            for (Contact contact : contacts) {
                array.add(contact.toJson());
            }
            return array.toJSONString();
        }
        return json.toJSONString();
    }
}
