package adressBook;

import java.util.Collection;
import java.util.HashMap;

public class ContactManager {

    private HashMap<Integer, Contact> cachedContacts = null;

    private static final ContactManager instance = new ContactManager();

    public static ContactManager getInstance() {
        return instance;
    }

    private ContactManager() {
    }

    public Contact getContact(Integer id) {
        if (cachedContacts != null) {
            Contact contact = cachedContacts.get(id);
            if (contact != null) {
                return contact;
            }

        } else {
            cachedContacts = databaseManager.getInstance().tryDBConnection();
            Contact contact = cachedContacts.get(id);
            if (contact != null) {
                return contact;
            }
        }
        return null;
    }


    public Collection<Contact> getAllContacts() {
        if (cachedContacts != null) {
            return cachedContacts.values();  //(Contact[]) .toArray();

        } else {
            cachedContacts = databaseManager.getInstance().tryDBConnection();
            if (cachedContacts != null) {
                return cachedContacts.values();  // (Contact[]) .toArray();
            }
        }
        return null;
    }


    public boolean refreshCache(){
        cachedContacts = databaseManager.getInstance().tryDBConnection();
        if (cachedContacts != null) {
            return true;
        }
        return false;
    }

    public Integer addContact(Contact contact){
        Integer completed= databaseManager.getInstance().addEntry(contact);
        cachedContacts = databaseManager.getInstance().tryDBConnection();
        return completed;
    }


    public boolean updateContact(Contact contact){
        boolean completed= databaseManager.getInstance().updateEntry(contact);
        cachedContacts = databaseManager.getInstance().tryDBConnection();
        return completed;
    }

    public boolean deleteContact(Integer id){
        boolean completed= databaseManager.getInstance().deleteEntry(id);
        cachedContacts = databaseManager.getInstance().tryDBConnection();
        return completed;
    }

    public boolean deleteAllContacts(){
        boolean completed= databaseManager.getInstance().deleteAll();
        cachedContacts = databaseManager.getInstance().tryDBConnection();
        return completed;
    }



}
