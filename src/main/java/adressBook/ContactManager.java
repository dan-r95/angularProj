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
            cachedContacts = databaseManager.tryDBConnection();
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
            cachedContacts = databaseManager.tryDBConnection();
            if (cachedContacts != null) {
                return cachedContacts.values();  // (Contact[]) .toArray();
            }
        }
        return null;
    }


    public boolean refreshCache(){
        cachedContacts = databaseManager.tryDBConnection();
        if (cachedContacts != null) {
            return true;
        }
        return false;
    }

}
